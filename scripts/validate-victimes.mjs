// Validates docs/data/victimes.json: chronological entries, known perpetrator, toll and description in
// French, and evidence ids that exist in docs/data/sources.json (every entry must be documented).
import { readFileSync } from 'node:fs';

const FILE = 'docs/data/victimes.json';
const errors = [];
const data = JSON.parse(readFileSync(FILE, 'utf8')).victimes;
const sources = JSON.parse(readFileSync('docs/data/sources.json', 'utf8')).sources;
const by = Object.keys(data.by ?? {});

let previous = '';
(data.victims ?? []).forEach((v, i) => {
  const at = `victims[${i}] (${v.title ?? '?'})`;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v.date ?? '')) errors.push(`${at}: date must be YYYY-MM-DD`);
  if (v.date < previous) errors.push(`${at}: entries must be in chronological order`);
  previous = v.date ?? previous;
  if (!by.includes(v.by)) errors.push(`${at}: unknown 'by' "${v.by}"`);
  if (!v.toll?.fr || !v.description?.fr) errors.push(`${at}: needs toll.fr and description.fr`);
  if (!v.evidence?.length) errors.push(`${at}: every entry needs evidence`);
  (v.evidence ?? []).forEach((id) => sources[id] || errors.push(`${at}: unknown evidence "${id}"`));
});
(data.censuses ?? []).forEach((c, i) => {
  if (!c.url?.startsWith('https://') || !c.description?.fr)
    errors.push(`censuses[${i}]: needs https url and description.fr`);
  (c.evidence ?? []).forEach(
    (id) => sources[id] || errors.push(`censuses[${i}]: unknown evidence "${id}"`),
  );
});

if (errors.length) {
  console.error(`❌ ${FILE}: ${errors.length} error(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(
  `✅ ${FILE}: ${data.victims.length} documented entries, ${data.censuses.length} censuses`,
);
