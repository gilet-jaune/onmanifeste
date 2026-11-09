/*
  Site search, between Material and its Lunr worker. Offline, no request but one small JSON file.

  1. One language at a time. mkdocs-static-i18n bundles every localized document into one
     search_index.json: only the documents of the active language are indexed and queried.
  2. Accent-blind search. The index keeps accents ("sérum", "règles") and people often type without
     them ("serum", "regles"). The indexed copy of each document is folded (é → e, l'avocat →
     l avocat) with the SAME length as the original, so Lunr's match positions still fit; the
     results are then given back their original text, marks included.
  3. Synonyms (docs/data/search-synonyms.json: "flashball" also finds LBD pages) and no French
     filler words in the query ("garde a vue", "droit de manifester").
  4. Pages with a passage matching every typed word come first, then the others.
  5. Structural tags ("guides", "annuaire"…) are not indexed: they matched everything.
  6. Counts per kind of page (guides, directory, "understand" files) and a filter on them, applied to
     the whole result list before Material shows it (it only renders ten at a time).

  The pure functions are exported for scripts/check-search.mjs (Node), which runs the real worker.
*/
(function () {
  'use strict';

  const IN_BROWSER = typeof window !== 'undefined' && typeof document !== 'undefined';

  // ---------------------------------------------------------------------------------------------
  // Pure helpers
  // ---------------------------------------------------------------------------------------------

  // Material weighs a tag match 1,000,000 against 1,000 for a title, so a page merely tagged "téléphone"
  // beat the guide titled "Téléphone". Tags stay a strong signal, but only twice a title match.
  const TAG_BOOST = 2000;

  // Tags that describe where a page lives, not what it is about: indexed, they matched everything.
  const STRUCTURAL_TAGS = new Set([
    'guides',
    'annuaire',
    'schema',
    'parcours',
    'accueil',
    'mentions legales',
    // English pages
    'directory',
    'flowchart',
    'guided search',
    'home',
    'legal notice',
  ]);

  // Filler words nobody searches for: with the wildcard Material adds to every term, "de*" or "a*"
  // would match thousands of words. "sans" and "pas" stay: they carry meaning ("sans réseau").
  const FILLER = new Set(
    'le la les un une des du de d l a au aux et ou en ce se sa ses que qui dans sur par pour est y c j m n s t qu on'.split(
      ' ',
    ),
  );

  // Same length as the input: é → e. Anything that does not decompose to base + mark is left alone.
  const ACCENTED = /[À-ɏḀ-ỿ]/g;
  const foldChar = (c) => {
    const d = c.normalize('NFD');
    return d.length > 1 ? d[0] : c;
  };
  // Apostrophes and the middle dot become spaces (one character each): "l'avocat" → "l avocat",
  // "interpellé·e" → "interpelle e". Without it, "avocat" never matched "l'avocat".
  const fold = (s) =>
    typeof s === 'string' ? s.replace(ACCENTED, foldChar).replace(/[’'ʼ·]/g, ' ') : s;

  const foldTag = (t) => fold(t).toLowerCase();

  function indexTags(tags) {
    if (!Array.isArray(tags)) return tags;
    return tags.filter((t) => !STRUCTURAL_TAGS.has(foldTag(t))).map(fold);
  }

  // word → list of the other words of its group.
  function buildSynonyms(data) {
    const map = new Map();
    for (const group of (data && data.groups) || []) {
      for (const word of group) {
        map.set(
          word,
          group.filter((w) => w !== word),
        );
      }
    }
    return map;
  }

  /*
    The text typed → { query, groups }. `query` is what the worker gets (Lunr syntax: Material adds
    the trailing * to each term); `groups` lists, for each typed word, the words that count as a
    match for it (itself and its synonyms), to rank pages that match every word first.
  */
  function expandQuery(raw, synonyms) {
    const parts = [];
    const groups = [];
    const keep = [];
    for (const piece of String(raw).split(/("[^"]*")/)) {
      if (/^"[^"]*"$/.test(piece)) {
        const phrase = fold(piece);
        parts.push(phrase);
        piece
          .slice(1, -1)
          .split(/\s+/)
          .filter(Boolean)
          .forEach((w) => groups.push([foldTag(w).replace(/[^a-z0-9]/g, '')]));
        continue;
      }
      for (const word of piece.split(/\s+/).filter(Boolean)) {
        // Lunr operators and fields (+word, -word, word~1, title:word): folded, otherwise untouched.
        if (/^[+\-]|[~^]\d*$|:|\*/.test(word)) {
          parts.push(fold(word));
          groups.push([foldTag(word).replace(/[^a-z0-9]/g, '')]);
          continue;
        }
        for (const w of foldTag(word).split(/\s+/).filter(Boolean)) {
          const alternatives = [w];
          // coeur ↔ cœur: texts and visitors use either.
          if (w.includes('oe')) alternatives.push(w.replace(/oe/g, 'œ'));
          if (w.includes('œ')) alternatives.push(w.replace(/œ/g, 'oe'));
          if (w.includes('ae')) alternatives.push(w.replace(/ae/g, 'æ'));
          if (w.includes('æ')) alternatives.push(w.replace(/æ/g, 'ae'));
          for (const s of (synonyms && synonyms.get(w)) || []) alternatives.push(s);
          if (FILLER.has(w)) {
            keep.push(alternatives);
            continue;
          }
          groups.push(alternatives);
          parts.push(alternatives.join(' '));
        }
      }
    }
    // Only filler words typed ("de la"): search them as they are rather than nothing.
    if (!parts.length && keep.length) {
      keep.forEach((a) => {
        groups.push(a);
        parts.push(a.join(' '));
      });
    }
    return { query: parts.join(' '), groups };
  }

  // Words, tags and spaces of an HTML text.
  const tokenize = (str) =>
    [...String(str).matchAll(/<[^>]*>|[^\s<]+|\s+/g)].map((m) => ({
      t: m[0],
      s: m.index,
      e: m.index + m[0].length,
    }));
  const isSpace = (t) => /^\s/.test(t);

  /*
    `marked` is the folded text as Material returns it: <mark> tags inserted, whole blocks left out
    (an excerpt), some spaces between tags dropped. Give it the original characters back. The words
    of `marked` are a subsequence of the words of the folded text: each one is matched to its place
    there (preferring the place where the next two words also match), then written with the
    original spelling. A word that cannot be placed stays as it is, never guessed.
    `cache` keeps the folded text's words between calls.
  */
  function unfold(marked, folded, original, cache = {}) {
    if (typeof marked !== 'string' || folded === original) return marked;
    // Only the words of the text anchor the match: tags repeat too much to tell places apart.
    const isWord = (t) => !isSpace(t) && !t.startsWith('<');
    if (!cache.words) cache.words = tokenize(folded).filter((x) => isWord(x.t));
    const words = cache.words;
    const parts = [];
    for (const piece of marked.split(/(<\/?mark[^>]*>)/)) {
      if (/^<\/?mark/.test(piece)) parts.push({ k: 'mark', text: piece });
      else if (piece) {
        tokenize(piece).forEach((x) =>
          parts.push({ k: isSpace(x.t) ? 'space' : isWord(x.t) ? 'word' : 'tag', text: x.t }),
        );
      }
    }
    const typed = parts.filter((x) => x.k === 'word');
    let from = 0;
    typed.forEach((word, n) => {
      word.at = -1;
      const context = typed.slice(n + 1, n + 4);
      let first = -1;
      let sure = false;
      const limit = Math.min(words.length, from + 1500);
      for (let x = from; x < limit; x++) {
        if (words[x].t !== word.text) continue;
        if (first < 0) first = x;
        if (context.every((c, d) => words[x + 1 + d] && words[x + 1 + d].t === c.text)) {
          first = x;
          sure = true;
          break;
        }
      }
      if (first >= 0) {
        word.at = first;
        // A short word found without its neighbours may be a lookalike elsewhere: use it, but do
        // not let it move the search forward.
        if (sure || word.text.length > 4) from = first + 1;
      }
    });
    let out = '';
    let previous = null;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (part.k === 'word') {
        out += part.at >= 0 ? original.slice(words[part.at].s, words[part.at].e) : part.text;
        previous = part;
      } else if (part.k === 'space') {
        // "l'avocat" was folded to "l avocat": the apostrophe or dot goes back where the folded
        // text had its one-character gap.
        const next = parts.slice(i + 1).find((x) => x.k === 'word');
        let text = part.text;
        if (previous && next && previous.at >= 0 && next.at === previous.at + 1 && text === ' ') {
          const a = words[previous.at].e;
          const b = words[next.at].s;
          if (b - a === 1 && folded[a] === ' ' && original[a] !== ' ') text = original[a];
        }
        out += text;
      } else {
        out += part.text;
      }
    }
    return out;
  }

  const plain = (s) => String(s).replace(/<\/?mark[^>]*>/g, '');

  function restoreDoc(doc, originals) {
    const o = originals.get(doc.location);
    if (!o) return doc;
    const out = { ...doc };
    if (typeof doc.title === 'string') {
      out.title = unfold(doc.title, o.foldedTitle, o.title, o.titleCache);
    }
    if (typeof doc.text === 'string') {
      out.text = unfold(doc.text, o.foldedText, o.text, o.textCache);
    }
    if (Array.isArray(doc.tags)) {
      out.tags = doc.tags.map((t) => {
        const original = o.tagsByFolded.get(plain(t));
        return original === undefined ? t : unfold(t, plain(t), original);
      });
    }
    return out;
  }

  // Material lists, under a result, the typed words it did not find. A word counts as found when any
  // of its variants (accent, synonym, œ) was: "coeur" typed, "cœur" matched.
  function normalizeTerms(doc, groups) {
    if (!doc || !doc.terms || !Array.isArray(groups)) return doc;
    const bare = (k) => k.replace(/\*$/, '');
    const hit = new Set(
      Object.entries(doc.terms)
        .filter(([, v]) => v)
        .map(([k]) => bare(k)),
    );
    const terms = { ...doc.terms };
    for (const key of Object.keys(terms)) {
      const group = groups.find((alts) => alts.includes(bare(key)));
      if (!group) continue;
      if (group.some((a) => hit.has(a))) terms[key] = true;
      // Not found: list only the word typed, not its internal variants.
      else if (bare(key) !== group[0]) delete terms[key];
    }
    return { ...doc, terms };
  }

  // Terms Lunr says were matched in one passage: { word: true }.
  function matchedTerms(doc) {
    const seen = {};
    for (const [term, hit] of Object.entries((doc && doc.terms) || {})) {
      if (hit) seen[term.replace(/\*$/, '')] = true;
    }
    return seen;
  }

  // Pages with one passage that has every typed word come first (each in its own order), then the
  // others. Counting the words spread over a whole page would favour the long list pages (the
  // directory, the profiles) that contain everything somewhere.
  function rank(items, groups) {
    if (!Array.isArray(groups) || groups.length < 2) return items;
    const complete = [];
    const partial = [];
    for (const group of items) {
      const all = group.some((doc) => {
        const seen = matchedTerms(doc);
        return groups.every((alts) => alts.some((a) => seen[a]));
      });
      (all ? complete : partial).push(group);
    }
    return complete.length && partial.length ? [...complete, ...partial] : items;
  }

  function prepareDocs(docs, originals) {
    originals.clear();
    return docs.map((doc) => {
      const folded = {
        ...doc,
        title: fold(doc.title),
        text: fold(doc.text),
        tags: indexTags(doc.tags),
      };
      originals.set(doc.location, {
        title: doc.title,
        text: doc.text,
        foldedTitle: folded.title,
        foldedText: folded.text,
        titleCache: {},
        textCache: {},
        tagsByFolded: new Map((doc.tags || []).map((t) => [fold(t), t])),
      });
      return folded;
    });
  }

  // The kinds of page the filter offers, from the first folder of the page address.
  const KINDS = ['guides', 'annuaire', 'comprendre'];
  const KIND_OF_FOLDER = {
    guides: 'guides',
    annuaire: 'annuaire',
    comprendre: 'comprendre',
    histoire: 'comprendre',
    confiance: 'comprendre',
    repressions: 'comprendre',
    victimes: 'comprendre',
    'securite-libertes': 'comprendre',
  };
  const kindOf = (location) =>
    KIND_OF_FOLDER[String(location).replace(/^en\//, '').split(/[/#]/)[0]] || null;
  const pageKind = (group) => kindOf((group[0] || {}).location);

  // { all, guides, annuaire, comprendre }: pages found, and how many of each kind.
  function countKinds(items) {
    const counts = { all: items.length };
    KINDS.forEach((k) => (counts[k] = 0));
    items.forEach((group) => {
      const kind = pageKind(group);
      if (kind) counts[kind]++;
    });
    return counts;
  }

  const filterKind = (items, kind) => (kind ? items.filter((g) => pageKind(g) === kind) : items);

  const tools = {
    fold,
    indexTags,
    buildSynonyms,
    expandQuery,
    unfold,
    restoreDoc,
    normalizeTerms,
    rank,
    matchedTerms,
    prepareDocs,
    kindOf,
    countKinds,
    filterKind,
    KINDS,
    TAG_BOOST,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = tools;
  if (!IN_BROWSER) return;

  // ---------------------------------------------------------------------------------------------
  // Browser wiring
  // ---------------------------------------------------------------------------------------------

  const SCRIPT = document.currentScript;
  let synonyms = new Map();
  if (SCRIPT && window.fetch) {
    fetch(new URL('../data/search-synonyms.json', SCRIPT.src))
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) synonyms = buildSynonyms(data);
      })
      .catch(() => undefined);
  }

  function isCurrentLangEn() {
    return (
      (document.documentElement && document.documentElement.lang === 'en') ||
      window.location.pathname.includes('/en/')
    );
  }

  function softenTags(config) {
    if (config && config.fields && config.fields.tags) config.fields.tags.boost = TAG_BOOST;
  }

  function filterDocs(docs) {
    if (!Array.isArray(docs)) return docs;
    const isEn = isCurrentLangEn();
    return docs.filter(function (doc) {
      if (!doc || typeof doc.location !== 'string') return true;
      const isDocEn = doc.location.startsWith('en/');
      return isEn ? isDocEn : !isDocEn;
    });
  }

  // The filter chips (docs/javascripts/search-snippet.js) read and set this. A new query clears the
  // filter; choosing a chip sends the same query again and the worker's answer is filtered.
  const filterState = { kind: '', raw: '', counts: null, resend: null };
  const announce = () =>
    document.dispatchEvent(
      new CustomEvent('ap-search', {
        detail: { kind: filterState.kind, counts: filterState.counts, query: filterState.raw },
      }),
    );
  window.apSearch = {
    get kind() {
      return filterState.kind;
    },
    get counts() {
      return filterState.counts;
    },
    setKind(kind) {
      filterState.kind = KINDS.includes(kind) ? kind : '';
      if (filterState.resend) filterState.resend();
      announce();
    },
  };

  const originals = new Map();

  // Intercept Web Worker setup message (online / standard mode)
  if (window.Worker) {
    const NativeWorker = window.Worker;
    window.Worker = function (scriptURL, options) {
      const worker =
        options !== undefined ? new NativeWorker(scriptURL, options) : new NativeWorker(scriptURL);
      const origPostMessage = worker.postMessage.bind(worker);
      // One entry per query sent, answered in the same order: the words it was made of.
      const pending = [];

      worker.postMessage = function (msg, transfer) {
        try {
          if (msg && msg.type === 0 && msg.data && Array.isArray(msg.data.docs)) {
            msg.data.docs = prepareDocs(filterDocs(msg.data.docs), originals);
            softenTags(msg.data.config);
          } else if (msg && msg.type === 2 && typeof msg.data === 'string') {
            if (msg.data !== filterState.raw) filterState.kind = '';
            filterState.raw = msg.data;
            const { query, groups } = expandQuery(msg.data, synonyms);
            pending.push(groups);
            msg = { ...msg, data: query };
          }
        } catch (_e) {
          // Never break the search: fall back to Material's own behaviour.
        }
        return transfer !== undefined ? origPostMessage(msg, transfer) : origPostMessage(msg);
      };

      // The same query again (a chip was chosen): the answer comes back through `transform`.
      filterState.resend = () => {
        const { query, groups } = expandQuery(filterState.raw, synonyms);
        pending.push(groups);
        origPostMessage({ type: 2, data: query });
      };

      const results = new WeakMap();
      const transform = (event) => {
        const d = event && event.data;
        if (!d || d.type !== 3 || !d.data || !Array.isArray(d.data.items)) return event;
        if (results.has(event)) return results.get(event);
        let next = event;
        try {
          const groups = pending.shift();
          const restored = d.data.items.map((group) =>
            group.map((doc) => normalizeTerms(restoreDoc(doc, originals), groups)),
          );
          const ranked = rank(restored, groups);
          filterState.counts = countKinds(ranked);
          const items = filterKind(ranked, filterState.kind);
          // A plain object, not a copy of the MessageEvent: Material only reads `data`.
          next = {
            type: event.type,
            target: event.target,
            currentTarget: event.currentTarget,
            data: { ...d, data: { ...d.data, items } },
          };
        } catch (_e) {
          next = event;
        }
        results.set(event, next);
        announce();
        return next;
      };

      const origAdd = worker.addEventListener.bind(worker);
      const wrappers = new Map();
      worker.addEventListener = function (type, listener, opts) {
        if (type !== 'message' || typeof listener !== 'function') {
          return origAdd(type, listener, opts);
        }
        const wrapped = function (event) {
          return listener.call(this, transform(event));
        };
        wrappers.set(listener, wrapped);
        return origAdd(type, wrapped, opts);
      };
      const origRemove = worker.removeEventListener.bind(worker);
      worker.removeEventListener = function (type, listener, opts) {
        return origRemove(type, wrappers.get(listener) || listener, opts);
      };
      return worker;
    };
    window.Worker.prototype = NativeWorker.prototype;
  }

  // Intercept offline search index (__index global in search_index.js for file:// protocol)
  try {
    let internalIndex;
    Object.defineProperty(window, '__index', {
      configurable: true,
      enumerable: true,
      get: function () {
        return internalIndex;
      },
      set: function (val) {
        if (val && Array.isArray(val.docs)) {
          val.docs = filterDocs(val.docs);
          softenTags(val.config);
        }
        internalIndex = val;
      },
    });
  } catch (_e) {
    // Ignore if not configurable
  }
})();
