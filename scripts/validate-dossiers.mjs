// Validates docs/data/dossiers.json (cards of the Comprendre hub and lists of its section pages): every
// item has French and English text and points to an existing page.
import { existsSync, readFileSync } from 'node:fs';

const FILE = 'docs/data/dossiers.json';
const { dossiers: sections } = JSON.parse(readFileSync(FILE, 'utf8'));
const errors = [];
const seen = new Set();

for (const [id, section] of Object.entries(sections)) {
  if (!existsSync(`docs/comprendre/${id}/index.md`))
    errors.push(`${id}: no page docs/comprendre/${id}/index.md`);
  for (const l of ['fr', 'en']) if (!section.title?.[l]) errors.push(`${id}: missing title.${l}`);
  for (const it of section.items ?? []) {
    const at = `${id}/${it.page}`;
    if (!existsSync(`docs/${it.page}`)) errors.push(`${at}: page not found`);
    if (seen.has(it.page)) errors.push(`${at}: listed twice`);
    seen.add(it.page);
    if (!it.icon) errors.push(`${at}: missing icon`);
    for (const f of ['title', 'blurb', 'cta'])
      for (const l of ['fr', 'en']) if (!it[f]?.[l]) errors.push(`${at}: missing ${f}.${l}`);
  }
}

if (errors.length) {
  console.error(`❌ ${FILE}: ${errors.length} error(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`✅ ${FILE}: ${seen.size} dossiers in ${Object.keys(sections).length} sections`);
