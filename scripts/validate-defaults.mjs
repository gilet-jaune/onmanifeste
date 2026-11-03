// Validates docs/data/defaults.json (default wording of the Signal guide's tunable thresholds):
// French and English everywhere, every default used by a page or a schema, every use pointing at a
// known default, and no threshold left hard-coded in the Signal pages (it would drift from the file).
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const FILE = 'docs/data/defaults.json';
const errors = [];
const { defaults } = JSON.parse(readFileSync(FILE, 'utf8'));
const ids = new Set(Object.keys(defaults));
const lowerFirst = (s) => s.charAt(0).toLowerCase() + s.slice(1);

for (const [id, value] of Object.entries(defaults)) {
  if (!/^[a-z][a-z0-9_]*$/.test(id))
    errors.push(`default "${id}": id must be lowercase with underscores`);
  for (const lang of ['fr', 'en']) {
    if (!value?.[lang]) errors.push(`default "${id}": needs a "${lang}" text`);
  }
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return walk(path);
    return /\.(md|json)$/.test(name) ? [path] : [];
  });

const used = new Set();
const callRe = /\{\{\s*default\(\s*["']([A-Za-z_]+)["']\s*\)\s*\}\}/g;
const tokenRe = /\[\[([A-Za-z_]+)\]\]/g;
for (const file of walk('docs')) {
  if (file.replaceAll('\\', '/') === FILE) continue;
  const text = readFileSync(file, 'utf8');
  for (const re of [callRe, tokenRe]) {
    for (const m of text.matchAll(re)) {
      const id = lowerFirst(m[1]);
      used.add(id);
      if (!ids.has(id)) errors.push(`${file}: default "${m[1]}" is not in ${FILE}`);
    }
  }
}
for (const id of ids) if (!used.has(id)) errors.push(`default "${id}" is not used by any page`);

// Thresholds that must come from the file, not be typed again in the Signal pages and schemas.
const HARD = [/\b(deux|2|trois|3|two|three)\s+actions?\b/i, /\b24\s?(h|heures|hours)\b/i];
const KEEP = /dernières 24 heures|last 24 hours/i;
const scanned = walk('docs').filter((f) => {
  const p = f.replaceAll('\\', '/');
  return (
    /docs\/guides\/(signal-|groupes-signal)/.test(p) ||
    /docs\/fiches\/signal/.test(p) ||
    p === 'docs/data/routes.json'
  );
});
for (const file of scanned) {
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      const clean = line.replace(KEEP, '');
      if (HARD.some((re) => re.test(clean)))
        errors.push(
          `${file}:${i + 1}: a threshold is typed in the page; use {{ default("…") }} (${FILE})`,
        );
    });
}

if (errors.length) {
  console.error(`❌ ${FILE}: ${errors.length} error(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(
  `✅ ${FILE}: ${ids.size} defaults, texts in French and English, all used, none typed twice`,
);
