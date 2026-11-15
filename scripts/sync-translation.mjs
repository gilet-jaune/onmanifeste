// Record that an English page is in step with its French original.
//
//   npm run sync:en -- guides/filmer            one page (also: docs/guides/filmer.md, …en.md)
//   npm run sync:en -- guides/filmer guides/roles
//   npm run sync:en -- --all                    every page (use only to initialise or after a bulk review)
//
// Run it after you have updated (or checked) the English page: it writes `source_hash` and
// `source_sections` in the page.en.md front matter and removes the legacy `source_commit`.
// Editing the translation and declaring it in step are two separate gestures on purpose.
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { withFingerprint } from './lib/translation-hash.mjs';

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : path.endsWith('.en.md') ? [path] : [];
  });

/** Accepts guides/filmer, guides/filmer.md, docs/guides/filmer.md or docs/guides/filmer.en.md. */
const toEnglishPage = (arg) => {
  let path = arg.replaceAll('\\', '/').replace(/^\.?\//, '');
  if (!path.startsWith('docs/')) path = `docs/${path}`;
  path = path.replace(/\.en\.md$/, '').replace(/\.md$/, '');
  return `${path}.en.md`;
};

const args = process.argv.slice(2);
if (!args.length) {
  console.error('usage: npm run sync:en -- <page…> | --all');
  process.exit(2);
}
const targets = args.includes('--all') ? walk('docs') : args.map(toEnglishPage);
let changed = 0;
for (const english of targets) {
  const fr = english.replace(/\.en\.md$/, '.md');
  if (!existsSync(english) || !existsSync(fr)) {
    console.error(`skip ${english}: missing page or French original`);
    process.exitCode = 1;
    continue;
  }
  const before = readFileSync(english, 'utf8');
  const after = withFingerprint(before, readFileSync(fr, 'utf8'));
  if (after !== before) {
    writeFileSync(english, after);
    changed += 1;
  }
}
console.log(`sync:en: ${changed} page(s) updated, ${targets.length - changed} already in step`);
