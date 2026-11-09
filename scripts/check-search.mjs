// Runs the REAL search worker of the built site (site/) on typical queries, with and without the
// layer in docs/javascripts/search-filter.js (accent folding, synonyms, "every word first"), and
// fails if an expectation is not met. Needs `npm test` (or `mkdocs build`) first.
//
//   node scripts/check-search.mjs            # check + table
//   node scripts/check-search.mjs --verbose  # also list the top pages of each query
import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import vm from 'node:vm';

const require = createRequire(import.meta.url);
const tools = require('../docs/javascripts/search-filter.js');
const VERBOSE = process.argv.includes('--verbose');

const SITE = 'site';
const workersDir = path.resolve(SITE, 'assets/javascripts/workers');
const workerFile = readdirSync(workersDir).find((f) => /^search\..*\.min\.js$/.test(f));
if (!workerFile) {
  console.error('❌ site/ not built: run `npm test` first.');
  process.exit(1);
}
const index = JSON.parse(readFileSync(path.join(SITE, 'search/search_index.json'), 'utf8'));
const synonyms = tools.buildSynonyms(
  JSON.parse(readFileSync('docs/data/search-synonyms.json', 'utf8')),
);
const frDocs = index.docs.filter((d) => !d.location.startsWith('en/'));

// --- the worker, as a browser would run it ------------------------------------------------------
function startWorker() {
  let handler;
  let resolveNext;
  const sandbox = {
    console,
    postMessage: (m) => resolveNext && resolveNext(m),
    addEventListener: (type, fn) => {
      if (type === 'message') handler = fn;
    },
    importScripts: (...urls) =>
      urls.forEach((u) =>
        vm.runInContext(readFileSync(path.resolve(workersDir, u), 'utf8'), sandbox),
      ),
  };
  sandbox.self = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(path.join(workersDir, workerFile), 'utf8'), sandbox);
  return (msg) =>
    new Promise((resolve) => {
      resolveNext = resolve;
      handler({ data: msg });
    });
}

async function plainWorker() {
  const send = startWorker();
  const config = structuredClone(index.config);
  config.fields.tags.boost = tools.TAG_BOOST;
  await send({
    type: 0,
    data: { config, docs: structuredClone(frDocs), options: { suggest: false } },
  });
  return async (q) => (await send({ type: 2, data: q })).data.items;
}

let enhancedOriginals;
async function enhancedWorker() {
  const send = startWorker();
  const config = structuredClone(index.config);
  config.fields.tags.boost = tools.TAG_BOOST;
  const originals = new Map();
  const docs = tools.prepareDocs(structuredClone(frDocs), originals);
  enhancedOriginals = originals;
  await send({ type: 0, data: { config, docs, options: { suggest: false } } });
  return async (q) => {
    const { query, groups } = tools.expandQuery(q, synonyms);
    const items = (await send({ type: 2, data: query })).data.items;
    const restored = items.map((g) =>
      g.map((d) => tools.normalizeTerms(tools.restoreDoc(d, originals), groups)),
    );
    return tools.rank(restored, groups);
  };
}

const before = await plainWorker();
const after = await enhancedWorker();
const pageOf = (group) => group.find((d) => !d.location.includes('#')) ?? group[0];
const pages = (items) => items.map((g) => g[0].location.split('#')[0] || '(accueil)');

// --- expectations -------------------------------------------------------------------------------
const failures = [];
const expect = (ok, message) => {
  if (!ok) failures.push(message);
};

const queries = [
  'règles',
  'regles',
  'sérum',
  'serum',
  'serum physiologique',
  'téléphone',
  'telephone',
  'lycéen',
  'lyceen',
  'éborgné',
  'eborgne',
  'interpellé',
  'interpelle',
  'garde à vue',
  'garde a vue',
  'flashball',
  'lbd',
  'flic',
  'gaz enceinte',
  'femme gaz',
  'avocat mineur',
  'filmer police',
  'droit de manifester',
  'coeur du cortege',
  'cœur du cortège',
  "l'avocat",
  'identite',
  'identité',
  'oeil',
];
const rows = [];
const cache = {};
for (const q of queries) {
  const b = await before(q);
  const a = await after(q);
  cache[q] = { b, a };
  rows.push([q, pages(b).length, pages(a).length]);
  if (VERBOSE) {
    console.log(`\n"${q}"`);
    pages(a)
      .slice(0, 6)
      .forEach((p, i) =>
        console.log(`   ${i + 1}. ${p}  [${pageOf(a[i]).title.replace(/<[^>]+>/g, '')}]`),
      );
  }
}
console.log('\nTop 4, before → after (several words):');
for (const q of [
  'gaz enceinte',
  'femme gaz',
  'avocat mineur',
  'filmer police',
  'droit de manifester',
]) {
  console.log(`  "${q}"`);
  const b = pages(cache[q].b);
  const a = pages(cache[q].a);
  for (let i = 0; i < 4; i++) console.log(`     ${String(b[i] ?? '').padEnd(34)} → ${a[i] ?? ''}`);
}
console.log('\nPages found (before → after):');
rows.forEach(([q, b, a]) =>
  console.log(`  ${q.padEnd(22)} ${String(b).padStart(3)} → ${String(a).padStart(3)}`),
);

const n = (q) => pages(cache[q].a).length;
const top = (q, k = 6) => pages(cache[q].a).slice(0, k);

// 1. Accents do not matter.
for (const [x, y] of [
  ['règles', 'regles'],
  ['sérum', 'serum'],
  ['téléphone', 'telephone'],
  ['lycéen', 'lyceen'],
  ['éborgné', 'eborgne'],
  ['interpellé', 'interpelle'],
  ['garde à vue', 'garde a vue'],
  ['identité', 'identite'],
]) {
  expect(n(y) > 0, `"${y}" finds nothing`);
  expect(n(y) === n(x), `"${x}" (${n(x)}) and "${y}" (${n(y)}) should find the same pages`);
}
// 2. Apostrophes: "l'avocat" finds lawyer pages; "serum physiologique" finds the ID-check guide.
expect(n("l'avocat") >= n('avocat mineur') / 4, `"l'avocat" finds too little (${n("l'avocat")})`);
expect(
  top('serum physiologique', 8).some((p) => p.includes('controle-fouille')),
  '"serum physiologique" should find controle-fouille',
);
// 3. Synonyms.
expect(
  top('flashball').some((p) => p.includes('armes-police')),
  '"flashball" should find armes-police',
);
expect(
  top('flic', 8).some(
    (p) => p.includes('filmer') || p.includes('armes-police') || p.includes('controle'),
  ),
  '"flic" should find police guides',
);
// 4. œ.
expect(
  top('coeur du cortege', 3).some((p) => p.includes('hors-du-coeur-du-cortege')),
  '"coeur du cortege" should find hors-du-coeur-du-cortege',
);
// 5. Filler words: "droit de manifester" no longer matches thousands of words through "de*".
expect(
  top('droit de manifester', 3).some((p) => p.includes('droit-de-manifester')),
  '"droit de manifester" should rank droit-de-manifester in the top 3',
);
// 6. Every word first: pages with a passage matching every typed word are listed before the others.
for (const q of [
  'gaz enceinte',
  'avocat mineur',
  'filmer police',
  'femme gaz',
  'droit de manifester',
]) {
  const { groups } = tools.expandQuery(q, synonyms);
  const flags = cache[q].a.map((g) =>
    g.some((d) => {
      const seen = tools.matchedTerms(d);
      return groups.every((alts) => alts.some((a) => seen[a]));
    }),
  );
  const firstPartial = flags.indexOf(false);
  expect(flags[0], `first result of "${q}" should match every word`);
  expect(
    firstPartial === -1 || !flags.slice(firstPartial).includes(true),
    `"${q}": a page matching every word comes after one that does not`,
  );
}
// 7. Display keeps accents and highlights.
const sample = cache['serum'].a
  .flat()
  .find((d) => /<mark>/.test(d.text || '') || /<mark>/.test(d.title || ''));
expect(
  sample && /[éèêàâîôùç]/.test(`${sample.title}${sample.text}`),
  'results should keep their accents',
);
expect(
  !cache['regles'].a.flat().some((d) => /regles|ecole/.test(plainText(d.title))),
  'titles must not come back folded',
);
function plainText(s) {
  return String(s).replace(/<[^>]+>/g, '');
}
// 7b. Restored texts: no word invented (zero tolerance), almost none left without its accent.
{
  const words = (s) =>
    String(s)
      .replace(/<[^>]*>/g, ' ')
      .split(/[^\p{L}\p{N}]+/u)
      .filter(Boolean);
  let checked = 0;
  const unrestored = [];
  const invented = [];
  for (const q of queries) {
    for (const d of cache[q].a.flat()) {
      const o = enhancedOriginals.get(d.location);
      if (!o || typeof d.text !== 'string') continue;
      const known = new Set([...words(o.text), ...words(o.title)]);
      const foldedKnown = new Set([...known].map((w) => tools.fold(w)));
      checked++;
      for (const w of [...words(d.text), ...words(d.title)]) {
        if (known.has(w)) continue;
        (foldedKnown.has(w) ? unrestored : invented).push(w);
      }
    }
  }
  expect(
    invented.length === 0,
    `restoration invented words: ${[...new Set(invented)].slice(0, 8).join(', ')}`,
  );
  expect(
    unrestored.length <= checked / 500,
    `${unrestored.length} words left without accent in ${checked} texts: ${[...new Set(unrestored)].slice(0, 8).join(', ')}`,
  );
}
// 7c. A word counts as found when one of its variants is ("coeur" typed, "cœur" matched).
{
  const first = cache['coeur du cortege'].a[0].find((d) => d.terms && d.terms.cœur);
  expect(
    first && first.terms.coeur === true,
    '"coeur" should not be listed as not found when "cœur" matched',
  );
}
// 7d. "œ" typed or not, and only the typed word is listed as not found.
expect(
  n('cœur du cortège') === n('coeur du cortege'),
  `"cœur du cortège" (${n('cœur du cortège')}) and "coeur du cortege" (${n('coeur du cortege')}) should find the same pages`,
);
{
  const missing = cache['coeur du cortege'].a[0].find((d) => d.terms && d.terms.coeur === false);
  expect(
    !missing || !('cœur' in missing.terms),
    'a variant of a missing word should not be listed',
  );
}
// 9. Filter by kind of page: the counts are those of the whole list, and filtering keeps exactly that.
expect(
  tools.kindOf('en/guides/filmer/#pendant') === 'guides',
  'kindOf: an English guide section is a guide',
);
expect(tools.kindOf('histoire/') === 'comprendre', 'kindOf: history is "comprendre"');
expect(
  tools.kindOf('') === null && tools.kindOf('parcours/') === null,
  'kindOf: home and parcours have no kind',
);
for (const q of ['avocat', 'garde à vue', 'gaz', 'police', 'manifester']) {
  const items = await after(q);
  const counts = tools.countKinds(items);
  expect(
    counts.all === items.length,
    `"${q}": counts.all (${counts.all}) differs from the list (${items.length})`,
  );
  expect(
    tools.KINDS.reduce((sum, k) => sum + counts[k], 0) <= counts.all,
    `"${q}": the kinds add up to more than the list`,
  );
  for (const kind of tools.KINDS) {
    const kept = tools.filterKind(items, kind);
    expect(
      kept.length === counts[kind],
      `"${q}": filter ${kind} keeps ${kept.length}, counted ${counts[kind]}`,
    );
    expect(
      kept.every((g) => tools.kindOf(g[0].location) === kind),
      `"${q}": filter ${kind} keeps a page of another kind`,
    );
  }
  expect(
    tools.filterKind(items, '').length === items.length,
    `"${q}": no filter should keep everything`,
  );
}
{
  const counts = tools.countKinds(await after('avocat'));
  expect(
    counts.guides > 0 && counts.annuaire > 0,
    `"avocat" should have guides (${counts.guides}) and directory entries (${counts.annuaire})`,
  );
  console.log(
    `\nKinds for "avocat": all ${counts.all}, guides ${counts.guides}, annuaire ${counts.annuaire}, comprendre ${counts.comprendre}`,
  );
}
// 8. Structural tags are not indexed: "guides" or "schéma" no longer match everything through tags.
const guidesPages = pages(await after('guides'));
expect(guidesPages.length < 60, `"guides" still matches ${guidesPages.length} pages`);

if (failures.length) {
  console.error(`\n❌ ${failures.length} expectation(s) failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log('\n✅ search checks passed');
