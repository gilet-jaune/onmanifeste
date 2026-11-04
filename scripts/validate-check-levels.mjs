// Validates docs/data/check-levels.json (who checked and when, shown on every surface) and fails if a
// surface goes back to hard-coding its own wording instead of reading that file.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const FILE = 'docs/data/check-levels.json';
const errors = [];
const levels = JSON.parse(readFileSync(FILE, 'utf8')).check_levels;
for (const lang of ['fr', 'en']) {
  for (const by of ['ai', 'volunteer', 'lawyer', 'medical', 'historian'])
    if (!levels.by?.[by]?.[lang]) errors.push(`by.${by}.${lang} is missing`);
  for (const key of ['ai_pending', 'unconfirmed', 'date_format'])
    if (!levels[key]?.[lang]) errors.push(`${key}.${lang} is missing`);
  if (levels.months?.[lang]?.length !== 12) errors.push(`months.${lang} needs 12 entries`);
}

// Wording that must live in the JSON file only.
const HARD_CODED =
  /Vérifié le|Checked on|Sourcé le|Sourced on|non relu par un humain|not reviewed by a human/;
const ALLOWED = new Set([FILE]);
const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
const surfaces = [
  ...walk('overrides'),
  ...walk('docs/javascripts'),
  ...walk('hooks').filter((f) => f.endsWith('.py')),
].filter((f) => /\.(html|js|py)$/.test(f));
for (const file of surfaces) {
  if (ALLOWED.has(file)) continue;
  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      if (HARD_CODED.test(line) && !/^\s*(\/\/|\*|\/\*|#)/.test(line))
        errors.push(
          `${file}:${i + 1}: hard-coded check wording, read docs/data/check-levels.json instead`,
        );
    });
}

if (errors.length) {
  console.error(`❌ ${FILE}: ${errors.length} error(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`✅ ${FILE}: labels complete, no surface hard-codes its own wording`);
