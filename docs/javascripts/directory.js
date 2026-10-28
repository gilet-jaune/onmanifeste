/*
  Resource directory: turns the statically rendered list in [data-resource-directory]
  (overrides/partials/resource-cards.html) into a live search over docs/data/resources.json.

  - Situations: one-tap shortcuts ("I am in custody", "I am a parent"…) that match any of their
    tags or categories.
  - Search: accent-insensitive, synonyms ("gav" -> garde-a-vue), one-typo tolerance on longer
    words, results ranked (name > tag > category > description), matches highlighted.
  - Tags: most used first, with result counts; tags with no result are hidden.
  - State is mirrored in the URL (?situation=…&q=…&category=…&tags=a,b) so views can be shared.
*/

// Resolve the JSON relative to this script so it works under any base path / language prefix.
const DIRECTORY_DATA_URL = new URL('../data/resources.json', document.currentScript.src);

const DIRECTORY_I18N = {
  fr: {
    situations: 'Votre situation',
    search: 'Rechercher : avocat, GAV, lacrymo, Signal…',
    searchLabel: 'Rechercher dans l’annuaire',
    all: 'Toutes les catégories',
    results: (n) => `${n} résultat${n > 1 ? 's' : ''}`,
    empty: 'Aucune ressource ne correspond. Essayez un autre mot ou une situation :',
    clear: 'Réinitialiser',
    error: 'Impossible de charger le référentiel. La liste ci-dessous reste consultable.',
    checked: 'Vérifié le',
    checkedUnconfirmed: 'Vérification du',
    sources: 'Sources :',
    unconfirmed: 'Non confirmé',
    moreTags: (n) => `Tous les tags (${n})`,
    lessTags: 'Moins de tags',
  },
  en: {
    situations: 'Your situation',
    search: 'Search: lawyer, custody, tear gas, Signal…',
    searchLabel: 'Search the directory',
    all: 'All categories',
    results: (n) => `${n} result${n > 1 ? 's' : ''}`,
    empty: 'No resource matches. Try another word or a situation:',
    clear: 'Reset',
    error: 'Unable to load the directory. The list below is still available.',
    checked: 'Checked on',
    checkedUnconfirmed: 'Check on',
    sources: 'Sources:',
    unconfirmed: 'Unconfirmed',
    moreTags: (n) => `All tags (${n})`,
    lessTags: 'Fewer tags',
  },
};

const TOP_TAGS = 14;
const WEIGHTS = { name: 8, tag: 5, category: 3, description: 1 };

// Lowercase and strip accents so "securite" matches "Sécurité".
const normalize = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const words = (s) =>
  normalize(s)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

// True when a and b differ by one insertion, deletion, substitution or adjacent swap.
function withinOneEdit(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false;
  if (a.length === b.length) {
    // Two swapped neighbouring letters count as one typo ("signla" -> "signal").
    const k = [...a].findIndex((c, idx) => c !== b[idx]);
    if (k !== -1 && a[k] === b[k + 1] && a[k + 1] === b[k] && a.slice(k + 2) === b.slice(k + 2)) {
      return true;
    }
  }
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else {
      i++;
      j++;
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === null || v === false) continue;
    if (k === 'class') node.className = v;
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v === true ? '' : v);
  }
  node.append(...children);
  return node;
}

// Wraps the parts of `text` matching any query term in <mark>.
function highlight(text, terms) {
  if (!terms.length) return [text];
  const norm = normalize(text); // same length as text for Latin scripts (NFD + strip marks)
  const ranges = [];
  for (const term of terms) {
    let at = norm.indexOf(term);
    while (at !== -1) {
      ranges.push([at, at + term.length]);
      at = norm.indexOf(term, at + term.length);
    }
  }
  if (!ranges.length || norm.length !== text.length) return [text];
  ranges.sort((a, b) => a[0] - b[0]);
  const out = [];
  let cursor = 0;
  for (const [start, end] of ranges) {
    if (start < cursor) continue;
    out.push(text.slice(cursor, start), el('mark', {}, text.slice(start, end)));
    cursor = end;
  }
  out.push(text.slice(cursor));
  return out;
}

async function initDirectory(root) {
  const lang = (document.documentElement.lang || 'fr').slice(0, 2);
  const t = DIRECTORY_I18N[lang] || DIRECTORY_I18N.fr;
  const loc = (obj) => (obj && (obj[lang] || obj.fr)) || '';

  let data;
  try {
    const res = await fetch(DIRECTORY_DATA_URL);
    if (!res.ok) throw new Error(res.statusText);
    data = await res.json();
  } catch (err) {
    // The static list rendered at build time stays in place.
    root.prepend(el('p', { class: 'directory__empty' }, t.error));
    console.error('[directory]', err);
    return;
  }

  const synonyms = data.synonyms || {};
  const situations = data.situations || [];
  const resources = data.resources.map((r, order) => {
    const categoryLabels = Object.values(data.categories[r.category] || {}).join(' ');
    const fields = {
      name: normalize(`${r.name} ${r.phone || ''}`),
      tag: normalize(r.tags.join(' ')),
      category: normalize(`${r.category} ${categoryLabels}`),
      description: normalize(loc(r.description)),
    };
    const vocabulary = new Set(Object.values(fields).flatMap(words));
    return { ...r, order, fields, vocabulary };
  });

  const params = new URLSearchParams(window.location.search);
  const state = {
    situation: params.get('situation') || '',
    q: params.get('q') || '',
    category: params.get('category') || '',
    tags: new Set((params.get('tags') || '').split(',').filter(Boolean)),
    showAllTags: false,
  };

  // Each query term becomes a list of alternatives: itself, its synonyms, and close spellings.
  function expandQuery(query) {
    const normalized = normalize(query).trim();
    let rest = ` ${normalized} `;
    const groups = [];
    // Multi-word synonyms first ("garde a vue", "sans reseau").
    for (const key of Object.keys(synonyms).filter((k) => k.includes(' '))) {
      if (rest.includes(` ${key} `)) {
        groups.push({ display: key.split(' '), alternatives: [key, ...synonyms[key]] });
        rest = rest.replace(` ${key} `, ' ');
      }
    }
    for (const term of rest.split(/\s+/).filter(Boolean)) {
      groups.push({ display: [term], alternatives: [term, ...(synonyms[term] || [])] });
    }
    return groups;
  }

  function scoreFor(r, groups) {
    let total = 0;
    for (const group of groups) {
      let best = 0;
      for (const alt of group.alternatives) {
        const needle = normalize(alt);
        for (const [field, weight] of Object.entries(WEIGHTS)) {
          if (r.fields[field].includes(needle)) best = Math.max(best, weight);
        }
      }
      // One typo allowed on words of 5+ letters ("signla" -> signal).
      if (!best && group.alternatives[0].length >= 5) {
        const term = group.alternatives[0];
        if ([...r.vocabulary].some((w) => w.length >= 4 && withinOneEdit(term, w))) best = 0.5;
      }
      if (!best) return 0; // every term must match
      total += best;
    }
    return total;
  }

  function situationMatches(r) {
    const s = situations.find((x) => x.id === state.situation);
    if (!s) return true;
    return (
      (s.tags || []).some((tag) => r.tags.includes(tag)) ||
      (s.categories || []).includes(r.category)
    );
  }

  // --- Controls ------------------------------------------------------------
  const situationBar = el('div', {
    class: 'directory__situations',
    role: 'group',
    'aria-label': t.situations,
  });
  const situationButtons = new Map();
  for (const s of situations) {
    const btn = el(
      'button',
      {
        type: 'button',
        class: 'directory__situation',
        onclick: () => {
          state.situation = state.situation === s.id ? '' : s.id;
          render();
        },
      },
      loc(s.label),
    );
    situationButtons.set(s.id, btn);
    situationBar.append(btn);
  }

  const input = el('input', {
    type: 'search',
    class: 'directory__search',
    placeholder: t.search,
    'aria-label': t.searchLabel,
    enterkeyhint: 'search',
    autocomplete: 'off',
  });
  input.value = state.q;

  const select = el('select', { class: 'directory__category', 'aria-label': t.all });
  select.append(el('option', { value: '' }, t.all));
  for (const [key, label] of Object.entries(data.categories)) {
    select.append(el('option', { value: key }, loc(label)));
  }
  select.value = state.category;

  const clear = el('button', { type: 'button', class: 'directory__clear' }, t.clear);
  const tagBar = el('div', { class: 'directory__tags' });
  const count = el('p', { class: 'directory__count', role: 'status', 'aria-live': 'polite' });
  const list = el('div', { class: 'directory__list' });

  const tagUsage = new Map();
  resources.forEach((r) =>
    r.tags.forEach((tag) => tagUsage.set(tag, (tagUsage.get(tag) || 0) + 1)),
  );
  const allTags = [...tagUsage.keys()].sort();
  const topTags = new Set(
    [...tagUsage.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, TOP_TAGS)
      .map(([tag]) => tag),
  );
  const tagButtons = new Map();
  for (const tag of allTags) {
    const label = el('span', {}, `#${tag}`);
    const badge = el('span', { class: 'directory__tag-count' });
    const btn = el('button', { type: 'button', class: 'directory__tag' }, label, badge);
    btn.addEventListener('click', () => toggleTag(tag));
    tagButtons.set(tag, { btn, badge });
    tagBar.append(btn);
  }
  const tagsToggle = el('button', { type: 'button', class: 'directory__tags-toggle' });
  tagsToggle.addEventListener('click', () => {
    state.showAllTags = !state.showAllTags;
    render();
  });
  tagBar.append(tagsToggle);

  function toggleTag(tag) {
    state.tags.has(tag) ? state.tags.delete(tag) : state.tags.add(tag);
    render();
  }

  function reset() {
    Object.assign(state, { situation: '', q: '', category: '' });
    state.tags.clear();
    input.value = '';
    select.value = '';
    render();
  }

  function syncUrl() {
    const p = new URLSearchParams();
    if (state.situation) p.set('situation', state.situation);
    if (state.q) p.set('q', state.q);
    if (state.category) p.set('category', state.category);
    if (state.tags.size) p.set('tags', [...state.tags].join(','));
    const qs = p.toString();
    history.replaceState(
      null,
      '',
      `${qs ? `?${qs}` : window.location.pathname}${window.location.hash}`,
    );
  }

  function cardFor(r, terms) {
    return el(
      'article',
      { class: 'directory__card', id: r.id },
      el(
        'h3',
        { id: `ressource-${r.id}` },
        el('a', { href: r.url, target: '_blank', rel: 'noopener' }, ...highlight(r.name, terms)),
      ),
      el('span', { class: 'directory__badge' }, loc(data.categories[r.category])),
      r.check.result === 'unconfirmed'
        ? el(
            'span',
            { class: 'directory__unconfirmed', title: r.check.note },
            `⚠ ${t.unconfirmed}`,
          )
        : '',
      el('p', {}, ...highlight(loc(r.description), terms)),
      r.phone
        ? el(
            'p',
            { class: 'directory__phone' },
            '📞 ',
            el('a', { href: `tel:${r.phone.replace(/\s/g, '')}` }, r.phone),
          )
        : '',
      r.sources?.length
        ? el(
            'p',
            { class: 'directory__sources' },
            `${t.sources} `,
            ...r.sources.flatMap((source, i) => [
              i ? ', ' : '',
              el('a', { href: source.url, target: '_blank', rel: 'noopener' }, source.title),
            ]),
          )
        : '',
      el(
        'p',
        { class: 'directory__checked' },
        `${r.check.result === 'unconfirmed' ? t.checkedUnconfirmed : t.checked} `,
        el(
          'time',
          { datetime: r.check.date },
          new Date(`${r.check.date}T00:00:00`).toLocaleDateString(lang, { dateStyle: 'medium' }),
        ),
      ),
      el(
        'div',
        { class: 'directory__card-tags' },
        ...r.tags.map((tag) =>
          el(
            'button',
            {
              type: 'button',
              class: `directory__tag${state.tags.has(tag) ? ' is-active' : ''}`,
              'aria-pressed': String(state.tags.has(tag)),
              onclick: () => toggleTag(tag),
            },
            `#${tag}`,
          ),
        ),
      ),
    );
  }

  function render() {
    const groups = expandQuery(state.q);
    const terms = groups.flatMap((g) => g.display);

    // Everything except tags, so tag counts show how many results each tag would leave.
    const base = resources
      .map((r) => ({ r, score: groups.length ? scoreFor(r, groups) : 1 }))
      .filter(
        ({ r, score }) =>
          score > 0 && situationMatches(r) && (!state.category || r.category === state.category),
      );
    const matches = base
      .filter(({ r }) => [...state.tags].every((tag) => r.tags.includes(tag)))
      .sort((a, b) => b.score - a.score || a.r.order - b.r.order)
      .map(({ r }) => r);

    for (const [id, btn] of situationButtons) {
      btn.classList.toggle('is-active', state.situation === id);
      btn.setAttribute('aria-pressed', String(state.situation === id));
    }

    for (const [tag, { btn, badge }] of tagButtons) {
      const active = state.tags.has(tag);
      const n = matches.filter((r) => r.tags.includes(tag)).length;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
      badge.textContent = String(n);
      // Selected tags always stay visible; others hide when collapsed or leading nowhere.
      btn.hidden = !active && (n === 0 || (!state.showAllTags && !topTags.has(tag)));
    }
    tagsToggle.textContent = state.showAllTags ? t.lessTags : t.moreTags(allTags.length);
    tagsToggle.setAttribute('aria-expanded', String(state.showAllTags));

    count.textContent = t.results(matches.length);
    list.replaceChildren(
      ...(matches.length
        ? matches.map((r) => cardFor(r, terms))
        : [
            el(
              'div',
              { class: 'directory__empty' },
              el('p', {}, t.empty),
              el(
                'div',
                { class: 'directory__suggestions' },
                ...situations.map((s) =>
                  el(
                    'button',
                    {
                      type: 'button',
                      class: 'directory__situation',
                      onclick: () => {
                        Object.assign(state, { situation: s.id, q: '', category: '' });
                        state.tags.clear();
                        input.value = '';
                        select.value = '';
                        render();
                      },
                    },
                    loc(s.label),
                  ),
                ),
                el(
                  'button',
                  { type: 'button', class: 'directory__clear', onclick: reset },
                  t.clear,
                ),
              ),
            ),
          ]),
    );
    syncUrl();
  }

  input.addEventListener('input', () => {
    state.q = input.value;
    render();
  });
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && input.value) {
      event.preventDefault();
      event.stopPropagation(); // keep Material's own Escape handling out of it
      state.q = '';
      input.value = '';
      render();
    }
  });
  select.addEventListener('change', () => {
    state.category = select.value;
    render();
  });
  clear.addEventListener('click', reset);

  root.replaceChildren(
    situationBar,
    el('div', { class: 'directory__controls' }, input, select, clear),
    tagBar,
    count,
    list,
  );
  render();

  // Arriving from the site search (#ressource-signal) or a shared card link (#signal).
  const target = decodeURIComponent(window.location.hash.slice(1)).replace(/^ressource-/, '');
  const card = target && document.getElementById(target);
  if (card) {
    card.classList.add('is-target');
    card.scrollIntoView({ block: 'center' });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-resource-directory]').forEach(initDirectory);
});
