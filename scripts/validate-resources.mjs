// Validates docs/data/resources.json (structure, unique ids, known categories, tag format).
// Dependency-free so it runs in CI before the MkDocs build.
import { readFileSync } from 'node:fs';

const FILE = 'docs/data/resources.json';
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const STALE_DAYS = 365;
const TODAY = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date());
const errors = [];
const warnings = [];

const data = JSON.parse(readFileSync(FILE, 'utf8'));
const categories = Object.keys(data.categories ?? {});
const ids = new Set();

for (const [key, label] of Object.entries(data.categories ?? {})) {
  if (!SLUG.test(key)) errors.push(`category "${key}": invalid slug`);
  if (!label?.fr) errors.push(`category "${key}": missing "fr" label`);
}

(data.emergency ?? []).forEach((e, i) => {
  const at = `emergency[${i}] (${e.number ?? '?'})`;
  if (!/^[0-9]+$/.test(e.number ?? '')) errors.push(`${at}: number must be digits only`);
  if (!e.label?.fr || !e.detail?.fr) errors.push(`${at}: missing French label or detail`);
});
if (data.emergency?.length && !data.emergency_source?.url?.startsWith('https://')) {
  errors.push('emergency_source: needs an https url');
}

const allTags = new Set((data.resources ?? []).flatMap((r) => r.tags ?? []));

(data.situations ?? []).forEach((s, i) => {
  const at = `situations[${i}] (${s.id ?? '?'})`;
  if (!s.id || !SLUG.test(s.id)) errors.push(`${at}: invalid id`);
  if (!s.label?.fr) errors.push(`${at}: missing French label`);
  if (!s.tags?.length && !s.categories?.length) errors.push(`${at}: needs tags or categories`);
  (s.tags ?? [])
    .filter((t) => !allTags.has(t))
    .forEach((t) => errors.push(`${at}: unused tag "${t}"`));
  (s.categories ?? [])
    .filter((c) => !categories.includes(c))
    .forEach((c) => errors.push(`${at}: unknown category "${c}"`));
});

for (const [word, targets] of Object.entries(data.synonyms ?? {})) {
  if (
    word !==
    word
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  ) {
    errors.push(`synonyms["${word}"]: key must be lowercase without accents`);
  }
  if (!Array.isArray(targets) || !targets.length) errors.push(`synonyms["${word}"]: needs targets`);
}

// Official store pages only (see `stores` in the schema).
const STORES = {
  android: 'https://play.google.com/store/apps/details?id=',
  fdroid: 'https://f-droid.org/packages/',
  ios: 'https://apps.apple.com/',
};

// Official social media / repository links (see `socials` in the schema).
const SOCIALS = {
  bluesky: /^https:\/\/bsky\.app\/profile\//,
  mastodon: /^https:\/\//,
  x: /^https:\/\/(x|twitter)\.com\//,
  instagram: /^https:\/\/(www\.)?instagram\.com\//,
  facebook: /^https:\/\/(www\.)?facebook\.com\//,
  tiktok: /^https:\/\/(www\.)?tiktok\.com\/@/,
  youtube: /^https:\/\/(www\.)?youtube\.com\//,
  peertube: /^https:\/\//,
  github: /^https:\/\/(github\.com|codeberg\.org|framagit\.org|gitlab\.com)\//,
};

(data.resources ?? []).forEach((r, i) => {
  const at = `resources[${i}] (${r.id ?? '?'})`;
  for (const field of ['id', 'name', 'url', 'category', 'tags', 'description', 'check']) {
    if (r[field] === undefined) errors.push(`${at}: missing "${field}"`);
  }
  if (r.id && !SLUG.test(r.id)) errors.push(`${at}: invalid id`);
  if (ids.has(r.id)) errors.push(`${at}: duplicate id`);
  ids.add(r.id);
  if (r.url && !r.url.startsWith('https://')) errors.push(`${at}: url must use https`);
  if (r.phone !== undefined && !/^\+?[0-9 ]+$/.test(r.phone)) errors.push(`${at}: invalid phone`);
  if (r.category && !categories.includes(r.category)) {
    errors.push(`${at}: unknown category "${r.category}"`);
  }
  if (!Array.isArray(r.tags) || r.tags.length === 0) errors.push(`${at}: tags must be non-empty`);
  else {
    r.tags.filter((t) => !SLUG.test(t)).forEach((t) => errors.push(`${at}: invalid tag "${t}"`));
    if (new Set(r.tags).size !== r.tags.length) errors.push(`${at}: duplicate tags`);
  }
  if (!r.description?.fr) errors.push(`${at}: missing French description`);
  else if (!/^[A-Z0-9]/.test(r.description.fr)) {
    errors.push(
      `${at}: description.fr must start with an ASCII uppercase letter or digit (required by awesome-lint)`,
    );
  }
  (r.sources ?? []).forEach((source, j) => {
    if (!source?.title || !source?.url?.startsWith('https://')) {
      errors.push(`${at}: sources[${j}] needs a title and an https url`);
    }
  });
  Object.entries(r.stores ?? {}).forEach(([store, url]) => {
    if (!STORES[store]) errors.push(`${at}: unknown store "${store}"`);
    else if (!url?.startsWith(STORES[store]))
      errors.push(`${at}: stores.${store} must start with ${STORES[store]}`);
  });
  Object.entries(r.socials ?? {}).forEach(([social, url]) => {
    if (!SOCIALS[social]) errors.push(`${at}: unknown social "${social}"`);
    else if (!SOCIALS[social].test(url ?? ''))
      errors.push(`${at}: socials.${social} has invalid url "${url}"`);
  });
  if (r.check !== undefined) {
    const { date: checked, result, note } = r.check;
    const date = new Date(`${checked}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(checked ?? '') || Number.isNaN(date.getTime())) {
      errors.push(`${at}: check.date must be a YYYY-MM-DD date`);
    } else if (checked > TODAY) {
      errors.push(`${at}: check.date is in the future`);
    } else if ((Date.now() - date) / 86_400_000 > STALE_DAYS) {
      warnings.push(`${at}: not checked for more than ${STALE_DAYS} days (${checked})`);
    }
    if (!['confirmed', 'unconfirmed'].includes(result)) {
      errors.push(`${at}: check.result must be "confirmed" or "unconfirmed"`);
    }
    if (result === 'unconfirmed' && !note) errors.push(`${at}: unconfirmed check needs a note`);
    if (!['ai', 'volunteer', 'lawyer', 'medical', 'historian'].includes(r.check.by))
      errors.push(`${at}: check.by must be ai, volunteer, lawyer, medical or historian`);
    if (result === 'unconfirmed' && r.phone) {
      errors.push(`${at}: unconfirmed resources must not list a phone`);
    }
  }
});

if (warnings.length)
  console.warn(`⚠️  ${warnings.length} stale resource(s)\n- ${warnings.join('\n- ')}`);
if (errors.length) {
  console.error(`❌ ${FILE}: ${errors.length} error(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`✅ ${FILE}: ${ids.size} resources valid`);
