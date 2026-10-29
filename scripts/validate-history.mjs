// Validates docs/data/history.json (required fields, known kinds, ISO dates, chronological order,
// and a `check` {date, result, by} like the other registries).
import { readFileSync } from 'node:fs';

const FILE = 'docs/data/history.json';
const TODAY = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date());
const errors = [];
const data = JSON.parse(readFileSync(FILE, 'utf8'));
const kinds = Object.keys(data.kinds ?? {});
const sources = JSON.parse(readFileSync('docs/data/sources.json', 'utf8')).sources;

let previous = '';
(data.events ?? []).forEach((e, i) => {
  const at = `events[${i}] (${e.title ?? '?'})`;
  for (const field of ['date', 'title', 'kind', 'url', 'description', 'check']) {
    if (e[field] === undefined) errors.push(`${at}: missing "${field}"`);
  }
  if (e.date && (!/^\d{4}-\d{2}-\d{2}$/.test(e.date) || Number.isNaN(Date.parse(e.date)))) {
    errors.push(`${at}: date must be YYYY-MM-DD`);
  }
  if (e.date && e.date < previous) errors.push(`${at}: events must be in chronological order`);
  previous = e.date ?? previous;
  if (e.kind && !kinds.includes(e.kind)) errors.push(`${at}: unknown kind "${e.kind}"`);
  if (e.url && !e.url.startsWith('https://')) errors.push(`${at}: url must use https`);
  if (!e.description?.fr) errors.push(`${at}: missing French description`);
  (e.evidence ?? []).forEach((id) => {
    if (!sources[id])
      errors.push(`${at}: unknown evidence source "${id}" (add it to docs/data/sources.json)`);
  });
  if (e.check) {
    const { date, result, by, note } = e.check;
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

if (errors.length) {
  console.error(`❌ ${FILE}: ${errors.length} error(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`✅ ${FILE}: ${data.events.length} events valid`);
