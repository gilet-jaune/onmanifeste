// Validates docs/data/victimes.json: chronological entries, known perpetrator, toll and description in
// French, evidence ids that exist in docs/data/sources.json (every entry must be documented), an
// optional judicial outcome (`justice`: status, date, text, evidence) and a `check`.
import { readFileSync } from 'node:fs';

const FILE = 'docs/data/victimes.json';
const TODAY = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date());
const errors = [];
const warnings = [];
const STALE_DAYS = 365; // same threshold as resources.json and the weekly maintenance report
const data = JSON.parse(readFileSync(FILE, 'utf8')).victimes;
const sources = JSON.parse(readFileSync('docs/data/sources.json', 'utf8')).sources;
const resourceIds = new Set(
  (JSON.parse(readFileSync('docs/data/resources.json', 'utf8')).resources ?? []).map((r) => r.id),
);
const by = Object.keys(data.by ?? {});

// Same `check` rule as resources.json: date of the last human check, confirmed or unconfirmed + note.
function validateCheck(at, check) {
  if (!check) return errors.push(`${at}: missing "check"`);
  if ((Date.now() - Date.parse(`${check.date}T00:00:00Z`)) / 86_400_000 > STALE_DAYS)
    warnings.push(`${at}: not checked for more than ${STALE_DAYS} days (${check.date})`);
  const date = new Date(`${check.date}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(check.date ?? '') || Number.isNaN(date.getTime()))
    errors.push(`${at}: check.date must be a YYYY-MM-DD date`);
  else if (check.date > TODAY) errors.push(`${at}: check.date is in the future`);
  if (!['confirmed', 'unconfirmed'].includes(check.result))
    errors.push(`${at}: check.result must be "confirmed" or "unconfirmed"`);
  if (!['ai', 'volunteer', 'lawyer', 'medical', 'historian'].includes(check.by))
    errors.push(`${at}: check.by must be ai, volunteer, lawyer, medical or historian`);
  if (check.result === 'unconfirmed' && !check.note)
    errors.push(`${at}: unconfirmed check needs a note`);
}

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
  validateCheck(at, v.check);
  if (v.justice) {
    const { status, date, text, evidence } = v.justice;
    if (!Object.keys(data.justice ?? {}).includes(status))
      errors.push(`${at}: unknown justice.status "${status}"`);
    if (date !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(date))
      errors.push(`${at}: justice.date must be YYYY-MM-DD`);
    if (!text?.fr) errors.push(`${at}: justice needs text.fr`);
    if (!evidence?.length) errors.push(`${at}: justice needs evidence`);
    (evidence ?? []).forEach(
      (id) => sources[id] || errors.push(`${at}: unknown justice evidence "${id}"`),
    );
  }
});
(data.censuses ?? []).forEach((c, i) => {
  if (!c.url?.startsWith('https://') || !c.description?.fr)
    errors.push(`censuses[${i}]: needs https url and description.fr`);
  if (c.resource && !resourceIds.has(c.resource))
    errors.push(`censuses[${i}]: unknown resource "${c.resource}"`);
  validateCheck(`censuses[${i}]`, c.check);
  (c.evidence ?? []).forEach(
    (id) => sources[id] || errors.push(`censuses[${i}]: unknown evidence "${id}"`),
  );
});

if (errors.length) {
  console.error(`❌ ${FILE}: ${errors.length} error(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
if (warnings.length)
  console.warn(`⚠️ ${FILE}: ${warnings.length} warning(s)\n- ${warnings.join('\n- ')}`);
console.log(
  `✅ ${FILE}: ${data.victims.length} documented entries, ${data.censuses.length} censuses`,
);
