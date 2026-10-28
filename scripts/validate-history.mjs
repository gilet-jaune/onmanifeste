// Validates docs/data/history.json (required fields, known kinds, ISO dates, chronological order).
import { readFileSync } from 'node:fs';

const FILE = 'docs/data/history.json';
const errors = [];
const data = JSON.parse(readFileSync(FILE, 'utf8'));
const kinds = Object.keys(data.kinds ?? {});

let previous = '';
(data.events ?? []).forEach((e, i) => {
  const at = `events[${i}] (${e.title ?? '?'})`;
  for (const field of ['date', 'title', 'kind', 'url', 'description']) {
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
});

if (errors.length) {
  console.error(`❌ ${FILE}: ${errors.length} error(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`✅ ${FILE}: ${data.events.length} events valid`);
