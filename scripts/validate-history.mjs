// Validates docs/data/history.json (required fields, known kinds, ISO dates, chronological order,
// and a `check` {date, result, by} like the other registries).
import { existsSync, readFileSync } from 'node:fs';

const FILE = 'docs/data/history.json';
const TODAY = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date());
const errors = [];
const warnings = [];
const STALE_DAYS = 365; // same threshold as resources.json and the weekly maintenance report
const data = JSON.parse(readFileSync(FILE, 'utf8'));
const kinds = Object.keys(data.kinds ?? {});
const sources = JSON.parse(readFileSync('docs/data/sources.json', 'utf8')).sources;

let previous = '';
const ids = new Set();
(data.events ?? []).forEach((e, i) => {
  const at = `events[${i}] (${e.id ?? e.title?.fr ?? '?'})`;
  for (const field of ['id', 'date', 'title', 'kind', 'url', 'description', 'check']) {
    if (e[field] === undefined) errors.push(`${at}: missing "${field}"`);
  }
  if (e.date && (!/^\d{4}-\d{2}-\d{2}$/.test(e.date) || Number.isNaN(Date.parse(e.date)))) {
    errors.push(`${at}: date must be YYYY-MM-DD`);
  }
  if (e.date && e.date < previous) errors.push(`${at}: events must be in chronological order`);
  previous = e.date ?? previous;
  if (e.id) {
    if (!/^\d{4}-[a-z0-9]+(-[a-z0-9]+)*$/.test(e.id)) errors.push(`${at}: id must be "YYYY-slug"`);
    else if (e.date && !e.id.startsWith(e.date.slice(0, 4)))
      errors.push(`${at}: id must start with the year`);
    if (ids.has(e.id)) errors.push(`${at}: duplicate id`);
    ids.add(e.id);
  }
  if (e.title && (!e.title.fr || !e.title.en)) errors.push(`${at}: title needs fr and en`);
  if (e.kind && !kinds.includes(e.kind)) errors.push(`${at}: unknown kind "${e.kind}"`);
  if (e.url && !e.url.startsWith('https://')) errors.push(`${at}: url must use https`);
  if (!e.description?.fr) errors.push(`${at}: missing French description`);
  (e.evidence ?? []).forEach((id) => {
    if (!sources[id])
      errors.push(`${at}: unknown evidence source "${id}" (add it to docs/data/sources.json)`);
  });
  if (e.check) {
    const { date, result, by, note } = e.check;
    if ((Date.now() - Date.parse(`${date}T00:00:00Z`)) / 86_400_000 > STALE_DAYS)
      warnings.push(`${at}: not checked for more than ${STALE_DAYS} days (${date})`);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date ?? '') ||
      Number.isNaN(Date.parse(`${date}T00:00:00Z`)) ||
      date > TODAY
    )
      errors.push(`${at}: check.date must be a past YYYY-MM-DD date`);
    if (!['confirmed', 'unconfirmed'].includes(result)) errors.push(`${at}: invalid check.result`);
    if (result === 'unconfirmed' && !note) errors.push(`${at}: unconfirmed check needs a note`);
    if (!['ai', 'volunteer', 'lawyer', 'medical', 'historian'].includes(by))
      errors.push(`${at}: invalid check.by`);
  }
  if (
    e.end !== undefined &&
    (!/^\d{4}(-\d{2}(-\d{2})?)?$/.test(e.end) || e.end < e.date.slice(0, e.end.length))
  )
    errors.push(`${at}: end must be YYYY[-MM[-DD]] and not before date`);
  (e.guides ?? []).forEach((slug) => {
    if (!existsSync(`docs/guides/${slug}.md`)) errors.push(`${at}: unknown guide "${slug}"`);
  });
  if (e.debunked && (!e.debunked.claim?.fr || !e.debunked.fact?.fr)) {
    errors.push(`${at}: debunked needs claim.fr and fact.fr`);
  }
  if (e.debunked && !e.evidence?.length) errors.push(`${at}: debunked statements need evidence`);
  if (e.gains !== undefined) {
    if (!e.gains.fr) errors.push(`${at}: gains needs a French text`);
    if (e.gains.source && !e.gains.source.startsWith('https://'))
      errors.push(`${at}: gains.source must use https`);
  }
});

const allIds = new Set((data.events ?? []).map((e) => e.id));
(data.events ?? []).forEach((e) => {
  (e.related ?? []).forEach((id) => {
    if (!allIds.has(id)) errors.push(`events (${e.id}): unknown related event "${id}"`);
    if (id === e.id) errors.push(`events (${e.id}): an event cannot be related to itself`);
  });
});

if (errors.length) {
  console.error(`❌ ${FILE}: ${errors.length} error(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
if (warnings.length)
  console.warn(`⚠️ ${FILE}: ${warnings.length} warning(s)\n- ${warnings.join('\n- ')}`);
console.log(`✅ ${FILE}: ${data.events.length} events valid`);
