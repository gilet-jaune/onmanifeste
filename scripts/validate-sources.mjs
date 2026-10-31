// Validates docs/data/sources.json and every footnote citation ([^id]) used in docs/**/*.md:
// each cited id must exist in the registry, each source needs FR/EN titles, an https URL and a check.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const FILE = 'docs/data/sources.json';
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const STALE_DAYS = 365;
const errors = [];
const warnings = [];
const { sources } = JSON.parse(readFileSync(FILE, 'utf8'));

for (const [id, s] of Object.entries(sources)) {
  const at = `sources.${id}`;
  if (!SLUG.test(id)) errors.push(`${at}: invalid id`);
  if (!s.title?.fr || !s.title?.en) errors.push(`${at}: needs fr and en titles`);
  const urls = typeof s.url === 'string' ? [s.url] : [s.url?.fr, s.url?.en];
  if (urls.some((u) => !u?.startsWith('https://'))) errors.push(`${at}: url(s) must use https`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s.check?.date ?? ''))
    errors.push(`${at}: check.date must be YYYY-MM-DD`);
  else if ((Date.now() - Date.parse(`${s.check.date}T00:00:00Z`)) / 86_400_000 > STALE_DAYS) {
    warnings.push(`${at}: not checked for more than ${STALE_DAYS} days`);
  }
  if (!['confirmed', 'unconfirmed'].includes(s.check?.result))
    errors.push(`${at}: invalid check.result`);
  if (!['ai', 'volunteer', 'lawyer', 'medical', 'historian'].includes(s.check?.by))
    errors.push(`${at}: invalid check.by`);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : path.endsWith('.md') ? [path] : [];
  });
const used = new Set();
for (const file of walk('docs')) {
  const prose = readFileSync(file, 'utf8')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`\n]*`/g, '');
  for (const [, id] of prose.matchAll(/\[\^([a-z0-9]+(?:-[a-z0-9]+)*)\](?!:)/g)) {
    used.add(id);
    if (!sources[id]) errors.push(`${file}: unknown source [^${id}]`);
  }
}
const victims = JSON.parse(readFileSync('docs/data/victimes.json', 'utf8')).victimes;
for (const v of [...victims.victims, ...victims.censuses])
  [...(v.evidence ?? []), ...(v.justice?.evidence ?? [])].forEach((id) => used.add(id));
for (const e of JSON.parse(readFileSync('docs/data/history.json', 'utf8')).events) {
  (e.evidence ?? []).forEach((id) => used.add(id));
}
for (const p of JSON.parse(readFileSync('docs/data/rallier.json', 'utf8')).rallier.profiles) {
  [...p.stakes, ...(p.objections ?? [])].forEach((x) =>
    (x.sources ?? []).forEach((id) => used.add(id)),
  );
}
for (const id of Object.keys(sources))
  if (!used.has(id)) warnings.push(`sources.${id}: never cited`);

if (warnings.length) console.warn(`⚠️  ${warnings.length} warning(s)\n- ${warnings.join('\n- ')}`);
if (errors.length) {
  console.error(`❌ ${FILE}: ${errors.length} error(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(
  `✅ ${FILE}: ${Object.keys(sources).length} sources, ${used.size} cited, all citations resolve`,
);
