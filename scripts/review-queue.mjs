// Lists the pages waiting for a professional review (review: juridique | medical, review_status:
// pending), most-used first: how many guided-search results point to the page, how many sources it
// cites, and its length. Usage: node scripts/review-queue.mjs [--md]  (npm run review:queue)
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : path.endsWith('.md') ? [path] : [];
  });
const parcours = ['docs/data/parcours.json', 'docs/data/parcours-signal.json']
  .map((f) => readFileSync(f, 'utf8'))
  .join('\n');

const rows = [];
for (const file of walk('docs').filter((f) => !f.endsWith('.en.md'))) {
  const text = readFileSync(file, 'utf8');
  const fm = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
  const kind = fm.match(/^review:\s*(\w+)/m)?.[1];
  const status = fm.match(/^review_status:\s*(\w+)/m)?.[1];
  if (!kind || status !== 'pending') continue;
  const slug = file
    .replace(/^docs\//, '')
    .replace(/\.md$/, '')
    .replace(/\/index$/, '');
  const guide = slug.startsWith('guides/') ? slug.slice(7) : null;
  const uses = guide ? (parcours.match(new RegExp(`"guide": "${guide}"`, 'g')) ?? []).length : 0;
  const notes = new Set([...text.matchAll(/\[\^([a-z0-9-]+)\](?!:)/g)].map((m) => m[1])).size;
  const body = text.replace(/^---\n[\s\S]*?\n---/, '');
  const words = body.split(/\s+/).filter(Boolean).length;
  rows.push({ page: slug, kind, uses, notes, words });
}
rows.sort((a, b) => b.uses - a.uses || b.notes - a.notes || a.page.localeCompare(b.page));

if (process.argv.includes('--md')) {
  console.log('| Page | Relecture | Renvois depuis les parcours | Sources citées | Mots |');
  console.log('| --- | --- | ---: | ---: | ---: |');
  rows.forEach((r) =>
    console.log(`| \`${r.page}\` | ${r.kind} | ${r.uses} | ${r.notes} | ${r.words} |`),
  );
} else {
  console.log(`${rows.length} page(s) waiting for review`);
  rows.forEach((r) =>
    console.log(
      `${r.kind.padEnd(9)} ${String(r.uses).padStart(3)} uses ${String(r.notes).padStart(3)} sources ${String(r.words).padStart(5)} words  ${r.page}`,
    ),
  );
}
