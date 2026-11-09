// Validates docs/data/search-synonyms.json (site search synonyms): groups of lowercase, unaccented
// single words, at least two per group, no word in two groups (no chains of meaning).
import { readFileSync } from 'node:fs';

const FILE = 'docs/data/search-synonyms.json';
const errors = [];
const { groups } = JSON.parse(readFileSync(FILE, 'utf8'));
const seen = new Map();

if (!Array.isArray(groups) || !groups.length) errors.push('"groups" must be a non-empty list');

(groups ?? []).forEach((group, i) => {
  const at = `groups[${i}]`;
  if (!Array.isArray(group) || group.length < 2) {
    errors.push(`${at}: needs at least two words`);
    return;
  }
  if (group.length > 12) errors.push(`${at}: ${group.length} words, keep groups short (12 max)`);
  group.forEach((word) => {
    if (typeof word !== 'string' || !/^[a-z0-9]+$/.test(word)) {
      errors.push(`${at}: "${word}" must be one lowercase word without accent or space`);
    }
    if (seen.has(word)) errors.push(`${at}: "${word}" is already in groups[${seen.get(word)}]`);
    seen.set(word, i);
  });
});

if (errors.length) {
  console.error(`❌ ${FILE}: ${errors.length} error(s)\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`✅ ${FILE}: ${groups.length} groups, ${seen.size} words`);
