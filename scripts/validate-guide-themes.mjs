// Validates docs/data/guide-themes.json (filter on the guides page): every guide has at least one
// known theme, no theme is unused, every theme has FR and EN labels, and no unknown guide is listed.
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const FILE = 'docs/data/guide-themes.json';
const errors = [];
const { themes, guides } = JSON.parse(readFileSync(FILE, 'utf8')).guide_themes;
const ids = new Set(themes.map((t) => t.id));
themes.forEach((t) => {
  if (!/^[a-z0-9-]+$/.test(t.id ?? '')) errors.push(`theme ${t.id}: id must be lowercase-dashed`);
  if (!t.label?.fr || !t.label?.en) errors.push(`theme ${t.id}: needs fr and en labels`);
});
const slugs = readdirSync('docs/guides')
  .filter((f) => f.endsWith('.md') && !f.endsWith('.en.md') && f !== 'index.md')
  .map((f) => f.replace(/\.md$/, ''));
for (const slug of slugs) {
  const list = guides[slug];
  if (!list?.length) errors.push(`guide ${slug}: needs at least one theme`);
  else list.forEach((id) => !ids.has(id) && errors.push(`guide ${slug}: unknown theme "${id}"`));
}
for (const slug of Object.keys(guides))
  if (!existsSync(`docs/guides/${slug}.md`)) errors.push(`guide ${slug}: no such guide`);
const used = new Set(Object.values(guides).flat());
themes.forEach((t) => !used.has(t.id) && errors.push(`theme ${t.id}: no guide uses it`));

if (errors.length) {
  console.error(`❌ ${FILE}: ${errors.length} error(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`✅ ${FILE}: ${themes.length} themes, ${slugs.length} guides themed`);
