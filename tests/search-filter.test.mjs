// Unit tests for the pure helpers of docs/javascripts/search-filter.js (accent folding, query
// expansion, giving the original text back, ranking, counting by kind of page).
// Run: npm run test:unit. The real Lunr worker is exercised by scripts/check-search.mjs.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { describe, it } from 'node:test';

const require = createRequire(import.meta.url);
const t = require('../docs/javascripts/search-filter.js');

const synonyms = t.buildSynonyms({
  groups: [
    ['flashball', 'lbd'],
    ['flic', 'policier', 'cop'],
  ],
});

describe('fold', () => {
  it('removes accents without changing the length', () => {
    const text = 'Sérum physiologique, éborgné, règles, çà';
    const out = t.fold(text);
    assert.equal(out, 'Serum physiologique, eborgne, regles, ca');
    assert.equal(out.length, text.length);
  });
  it('turns apostrophes and the middle dot into one space each', () => {
    assert.equal(t.fold("l'avocat"), 'l avocat');
    assert.equal(t.fold('l’avocat'), 'l avocat');
    assert.equal(t.fold('interpellé·e'), 'interpelle e');
  });
  it('leaves ligatures and non-strings alone', () => {
    assert.equal(t.fold('cœur'), 'cœur');
    assert.equal(t.fold(undefined), undefined);
    assert.deepEqual(t.fold(['é']), ['é']);
  });
});

describe('indexTags', () => {
  it('drops structural tags and folds the others', () => {
    assert.deepEqual(t.indexTags(['guides', 'Téléphone', 'Annuaire', 'sérum']), [
      'Telephone',
      'serum',
    ]);
  });
  it('returns non-arrays unchanged', () => {
    assert.equal(t.indexTags(undefined), undefined);
  });
});

describe('buildSynonyms', () => {
  it('links every word of a group to the others', () => {
    assert.deepEqual(synonyms.get('flashball'), ['lbd']);
    assert.deepEqual(synonyms.get('policier'), ['flic', 'cop']);
    assert.equal(synonyms.get('inconnu'), undefined);
  });
  it('accepts missing data', () => {
    assert.equal(t.buildSynonyms(undefined).size, 0);
  });
});

describe('expandQuery', () => {
  it('folds accents and lowercases', () => {
    const { query, groups } = t.expandQuery('Sérum', synonyms);
    assert.equal(query, 'serum');
    assert.deepEqual(groups, [['serum']]);
  });
  it('drops filler words but keeps the meaningful ones', () => {
    assert.equal(t.expandQuery('droit de manifester', synonyms).query, 'droit manifester');
    assert.equal(t.expandQuery('garde à vue', synonyms).query, 'garde vue');
    assert.equal(t.expandQuery("l'avocat", synonyms).query, 'avocat');
  });
  it('searches filler words as typed when nothing else is left', () => {
    assert.equal(t.expandQuery('de la', synonyms).query, 'de la');
  });
  it('adds synonyms to the same group', () => {
    const { query, groups } = t.expandQuery('flashball', synonyms);
    assert.equal(query, 'flashball lbd');
    assert.deepEqual(groups, [['flashball', 'lbd']]);
  });
  it('treats coeur and cœur as the same word', () => {
    assert.deepEqual(t.expandQuery('coeur', synonyms).groups, [['coeur', 'cœur']]);
    assert.deepEqual(t.expandQuery('cœur', synonyms).groups, [['cœur', 'coeur']]);
  });
  it('keeps a quoted phrase together and Lunr operators untouched', () => {
    assert.equal(t.expandQuery('"garde à vue"', synonyms).query, '"garde a vue"');
    assert.equal(t.expandQuery('+avocat -mineur', synonyms).query, '+avocat -mineur');
    assert.equal(t.expandQuery('title:Téléphone', synonyms).query, 'title:Telephone');
  });
  it('gives one group per typed word', () => {
    assert.equal(t.expandQuery('avocat mineur', synonyms).groups.length, 2);
  });
  it('copes with an empty query', () => {
    assert.deepEqual(t.expandQuery('', synonyms), { query: '', groups: [] });
    assert.deepEqual(t.expandQuery('   ', synonyms), { query: '', groups: [] });
  });
});

describe('unfold', () => {
  const original = "Le sérum physiologique de l'avocat éborgné.";
  const folded = t.fold(original);

  it('gives the accents back inside marks', () => {
    const marked = 'Le <mark>serum</mark> physiologique de l avocat eborgne.';
    assert.equal(
      t.unfold(marked, folded, original),
      "Le <mark>sérum</mark> physiologique de l'avocat éborgné.",
    );
  });
  it('restores a dropped apostrophe', () => {
    assert.equal(t.unfold('de l avocat', folded, original), "de l'avocat");
  });
  it('works on an excerpt (words missing at the start)', () => {
    assert.equal(
      t.unfold('physiologique de l avocat eborgne.', folded, original),
      "physiologique de l'avocat éborgné.",
    );
  });
  it('leaves a word it cannot place as it is', () => {
    assert.equal(t.unfold('serum inconnu', folded, original), 'sérum inconnu');
  });
  it('returns non-strings and untouched texts as they are', () => {
    assert.equal(t.unfold(undefined, folded, original), undefined);
    assert.equal(t.unfold('abc', 'abc', 'abc'), 'abc');
  });
  it('reuses the cache between calls', () => {
    const cache = {};
    t.unfold('serum', folded, original, cache);
    assert.ok(Array.isArray(cache.words));
    assert.equal(t.unfold('eborgne.', folded, original, cache), 'éborgné.');
  });
  // Regression: looking for the next word inside the loop made long pages take seconds.
  it('stays fast on a very long text with many marks', () => {
    const long = "Le sérum de l'élève éborgné ".repeat(6000);
    const longFolded = t.fold(long);
    const marked = longFolded.replace(/serum/g, '<mark>serum</mark>');
    const start = performance.now();
    const out = t.unfold(marked, longFolded, long);
    const elapsed = performance.now() - start;
    assert.ok(out.startsWith("Le <mark>sérum</mark> de l'élève éborgné"));
    assert.ok(elapsed < 1500, `took ${Math.round(elapsed)} ms`);
  });
});

describe('prepareDocs and restoreDoc', () => {
  it('folds the indexed copy and gives the original back', () => {
    const originals = new Map();
    const docs = t.prepareDocs(
      [
        {
          location: 'guides/a/',
          title: 'Sérum',
          text: "Le sérum de l'avocat",
          tags: ['guides', 'Téléphone'],
        },
      ],
      originals,
    );
    assert.equal(docs[0].title, 'Serum');
    assert.equal(docs[0].text, 'Le serum de l avocat');
    assert.deepEqual(docs[0].tags, ['Telephone']);
    const restored = t.restoreDoc(
      {
        location: 'guides/a/',
        title: '<mark>Serum</mark>',
        text: 'Le <mark>serum</mark> de l avocat',
        tags: ['Telephone'],
      },
      originals,
    );
    assert.equal(restored.title, '<mark>Sérum</mark>');
    assert.equal(restored.text, "Le <mark>sérum</mark> de l'avocat");
    assert.deepEqual(restored.tags, ['Téléphone']);
  });
  it('leaves an unknown document alone', () => {
    const doc = { location: 'x/', title: 'Serum' };
    assert.equal(t.restoreDoc(doc, new Map()), doc);
  });
});

describe('matchedTerms, normalizeTerms and rank', () => {
  it('reports the terms Lunr matched, without the wildcard', () => {
    assert.deepEqual(t.matchedTerms({ terms: { 'avocat*': true, mineur: false } }), {
      avocat: true,
    });
    assert.deepEqual(t.matchedTerms(undefined), {});
  });
  it('counts a typed word as found when any of its variants was', () => {
    const groups = [['coeur', 'cœur']];
    const doc = t.normalizeTerms({ terms: { coeur: false, cœur: true } }, groups);
    assert.equal(doc.terms.coeur, true);
  });
  it('lists only the typed word when no variant was found', () => {
    const groups = [['flashball', 'lbd']];
    const doc = t.normalizeTerms({ terms: { flashball: false, lbd: false } }, groups);
    assert.deepEqual(Object.keys(doc.terms), ['flashball']);
  });
  it('puts pages with one passage holding every word first', () => {
    const groups = [['avocat'], ['mineur']];
    const spread = [
      { location: 'a/', terms: { avocat: true } },
      { location: 'a/#x', terms: { mineur: true } },
    ];
    const whole = [{ location: 'b/', terms: { avocat: true, mineur: true } }];
    assert.deepEqual(t.rank([spread, whole], groups), [whole, spread]);
  });
  it('keeps the order for a single word or when nothing separates the pages', () => {
    const a = [{ location: 'a/', terms: { avocat: true } }];
    const b = [{ location: 'b/', terms: { avocat: true } }];
    assert.deepEqual(t.rank([a, b], [['avocat']]), [a, b]);
    assert.deepEqual(t.rank([a, b], [['avocat'], ['mineur']]), [a, b]);
  });
});

describe('kinds of page', () => {
  it('derives the kind from the first folder, in either language', () => {
    assert.equal(t.kindOf('guides/telephone/#x'), 'guides');
    assert.equal(t.kindOf('en/guides/telephone/'), 'guides');
    assert.equal(t.kindOf('annuaire/'), 'annuaire');
    assert.equal(t.kindOf('histoire/'), 'comprendre');
    assert.equal(t.kindOf('dette-privatisations/'), 'comprendre');
    assert.equal(t.kindOf('carte/'), null);
  });
  const items = [
    [{ location: 'guides/a/' }],
    [{ location: 'guides/b/' }],
    [{ location: 'annuaire/' }],
    [{ location: 'histoire/' }],
    [{ location: 'carte/' }],
  ];
  it('counts the results by kind', () => {
    assert.deepEqual(t.countKinds(items), { all: 5, guides: 2, annuaire: 1, comprendre: 1 });
  });
  it('filters by kind, or returns everything', () => {
    assert.equal(t.filterKind(items, 'guides').length, 2);
    assert.equal(t.filterKind(items, '').length, 5);
  });
});
