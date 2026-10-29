// Validates docs/data/rallier.json ("Pourquoi nous rejoindre ?"): unique profile ids, French and
// English texts, every source in docs/data/sources.json, every linked guide or page existing.
import { existsSync, readFileSync } from 'node:fs';

const FILE = 'docs/data/rallier.json';
const errors = [];
const { profiles } = JSON.parse(readFileSync(FILE, 'utf8')).rallier;
const sources = JSON.parse(readFileSync('docs/data/sources.json', 'utf8')).sources;
const ids = new Set();
const bilingual = (o, at) => {
  if (!o?.fr || !o?.en) errors.push(`${at}: needs fr and en`);
};
const checkItem = (x, at) => {
  (x.sources ?? []).forEach((id) => {
    if (!sources[id]) errors.push(`${at}: unknown source "${id}"`);
  });
  if (!x.sources?.length && !x.link) errors.push(`${at}: needs sources or a link`);
  if (x.link) {
    const base = x.link.guide ? `docs/guides/${x.link.guide}` : `docs/${x.link.page}/index`;
    if (!existsSync(`${base}.md`)) errors.push(`${at}: unknown guide or page "${base}"`);
    bilingual(x.link.label, `${at}.link.label`);
    if (x.link.anchor) bilingual(x.link.anchor, `${at}.link.anchor`);
  }
};

profiles.forEach((p, i) => {
  const at = `profiles[${i}] (${p.id})`;
  if (!/^[a-z0-9-]+$/.test(p.id ?? '')) errors.push(`${at}: id must be lowercase-dashed`);
  if (ids.has(p.id)) errors.push(`${at}: duplicate id`);
  ids.add(p.id);
  bilingual(p.label, `${at}.label`);
  bilingual(p.step, `${at}.step`);
  if (!p.stakes?.length) errors.push(`${at}: needs at least one stake`);
  (p.stakes ?? []).forEach((s, j) => {
    bilingual(s.text, `${at}.stakes[${j}]`);
    checkItem(s, `${at}.stakes[${j}]`);
  });
  (p.objections ?? []).forEach((o, j) => {
    bilingual(o.question, `${at}.objections[${j}].question`);
    bilingual(o.answer, `${at}.objections[${j}].answer`);
    checkItem(o, `${at}.objections[${j}]`);
  });
});

if (errors.length) {
  console.error(`❌ ${FILE}: ${errors.length} error(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`✅ ${FILE}: ${profiles.length} profiles valid`);
