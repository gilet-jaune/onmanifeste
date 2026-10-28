// Generates the resource list in README.md from docs/data/resources.json (single source of truth).
// Usage: node scripts/generate-readme.mjs          -> rewrite README.md
//        node scripts/generate-readme.mjs --check  -> exit 1 if README.md is out of date (CI)
import { readFileSync, writeFileSync } from 'node:fs';
import * as prettier from 'prettier';

const README = 'README.md';
const START = '<!-- resources:start -->';
const END = '<!-- resources:end -->';

const { categories, resources } = JSON.parse(readFileSync('docs/data/resources.json', 'utf8'));

// Same anchor algorithm as GitHub: lowercase, drop punctuation, spaces to dashes.
const anchor = (text) =>
  text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s/g, '-');

const sections = Object.entries(categories)
  .map(([key, label]) => ({ title: label.fr, items: resources.filter((r) => r.category === key) }))
  .filter((section) => section.items.length);

const block = [
  START,
  '<!-- Generated from docs/data/resources.json by `npm run readme`. Do not edit by hand. -->',
  '',
  '## Contents',
  '',
  ...sections.map((s) => `- [${s.title}](#${anchor(s.title)})`),
  '- [Contribuer](#contribuer)',
  '',
  ...sections.flatMap((s) => [
    `## ${s.title}`,
    '',
    ...s.items.map((r) => {
      const phone = r.phone ? ` Tél. : ${r.phone}.` : '';
      const unconfirmed = r.check.result === 'unconfirmed' ? ' ⚠️ _Non confirmé._' : '';
      return `- [${r.name}](${r.url}) - ${r.description.fr}${phone}${unconfirmed}`;
    }),
    '',
  ]),
  END,
].join('\n');

const current = readFileSync(README, 'utf8');
const start = current.indexOf(START);
const end = current.indexOf(END);
if (start === -1 || end === -1) {
  console.error(`❌ ${README}: missing ${START} / ${END} markers`);
  process.exit(1);
}

const options = { ...(await prettier.resolveConfig(README)), filepath: README };
const next = await prettier.format(
  current.slice(0, start) + block + current.slice(end + END.length),
  options,
);

if (process.argv.includes('--check')) {
  if (next !== current) {
    console.error(`❌ ${README} is out of date: run \`npm run readme\``);
    process.exit(1);
  }
  console.log(`✅ ${README}: resource list up to date (${resources.length} resources)`);
} else {
  writeFileSync(README, next);
  console.log(`✅ ${README}: ${resources.length} resources written`);
}
