/*
  Review page: a reviewer opens each source, gives a verdict, and exports a batch file (JSON) that the
  maintainer applies with `npm run review:apply` (scripts/apply-reviews.mjs). Everything stays in the
  browser: drafts live in localStorage, nothing is sent anywhere. Batch format: see that script.
*/
(function () {
  'use strict';

  const DATA = document.currentScript ? new URL('../data/', document.currentScript.src) : null;
  const STORE = 'ap-relire-v1';
  const PAGE = 40;

  const STRINGS = {
    fr: {
      reviewer: 'Pseudonyme',
      reviewerHelp:
        'Un pseudonyme suffit. Si vous donnez votre vrai nom, il pourra apparaître publiquement dans les crédits : ne le faites que si vous le souhaitez.',
      claimed: 'Votre qualité',
      levels: {
        volunteer: 'Bénévole (sans qualité particulière)',
        lawyer: 'Avocat·e / juriste',
        medical: 'Soignant·e (médecin, infirmier·ère…)',
        historian: 'Historien·ne',
      },
      claimedHelp:
        'Cette qualité est déclarative : elle n’est reconnue qu’après vérification par le mainteneur.',
      kind: 'Type',
      kinds: { sources: 'Sources', resources: 'Annuaire', history: 'Repères historiques' },
      onlyAi: 'Seulement ce qui n’a pas encore été relu par un humain',
      search: 'Chercher',
      open: 'Ouvrir la source',
      verdicts: { confirmed: 'Confirmé', error: 'Erreur', outdated: 'Périmé' },
      clear: 'Effacer',
      comment: 'Ce qui ne va pas (obligatoire)',
      more: 'Afficher la suite',
      none: 'Rien à afficher avec ces filtres.',
      count: (n, total) =>
        `${n} avis enregistré${n > 1 ? 's' : ''} · ${total} entrée${total > 1 ? 's' : ''} affichée${total > 1 ? 's' : ''}`,
      download: 'Télécharger mon lot (.json)',
      copy: 'Copier le lot',
      copied: 'Lot copié.',
      reset: 'Tout effacer',
      confirmReset: 'Effacer tous vos avis enregistrés sur cet appareil ?',
      needReviewer: 'Indiquez un pseudonyme.',
      needReviews: 'Aucun avis à exporter.',
      needComment: 'Un commentaire est obligatoire pour « Erreur » et « Périmé » :',
      by: 'Dernier contrôle',
    },
    en: {
      reviewer: 'Pseudonym',
      reviewerHelp:
        'A pseudonym is enough. If you give your real name, it may appear publicly in the credits: only do so if you want to.',
      claimed: 'Your role',
      levels: {
        volunteer: 'Volunteer (no particular qualification)',
        lawyer: 'Lawyer / legal professional',
        medical: 'Health professional (doctor, nurse…)',
        historian: 'Historian',
      },
      claimedHelp:
        'This role is self-declared: it is only recognised after the maintainer checks it.',
      kind: 'Type',
      kinds: { sources: 'Sources', resources: 'Directory', history: 'Historical landmarks' },
      onlyAi: 'Only what has not been reviewed by a human yet',
      search: 'Search',
      open: 'Open the source',
      verdicts: { confirmed: 'Confirmed', error: 'Error', outdated: 'Outdated' },
      clear: 'Clear',
      comment: 'What is wrong (required)',
      more: 'Show more',
      none: 'Nothing to show with these filters.',
      count: (n, total) =>
        `${n} saved review${n > 1 ? 's' : ''} · ${total} entr${total > 1 ? 'ies' : 'y'} shown`,
      download: 'Download my batch (.json)',
      copy: 'Copy the batch',
      copied: 'Batch copied.',
      reset: 'Clear everything',
      confirmReset: 'Clear all the reviews saved on this device?',
      needReviewer: 'Enter a pseudonym.',
      needReviews: 'No review to export.',
      needComment: 'A comment is required for “Error” and “Outdated”:',
      by: 'Last check',
    },
  };

  const normalise = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const loc = (v, lang) => (v && typeof v === 'object' ? v[lang] || v.fr : v) || '';

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORE)) || {};
    } catch (e) {
      return {};
    }
  }
  function save(state) {
    try {
      localStorage.setItem(STORE, JSON.stringify(state));
    } catch (e) {
      /* drafts are a convenience only */
    }
  }

  const el = (tag, props, ...kids) => {
    const n = Object.assign(document.createElement(tag), props || {});
    n.append(...kids);
    return n;
  };

  async function fetchEntries(lang) {
    const get = (name) => fetch(new URL(`${name}.json`, DATA)).then((r) => r.json());
    const [sources, resources, history] = await Promise.all([
      get('sources'),
      get('resources'),
      get('history'),
    ]);
    const url = (u) => loc(u, lang);
    return {
      sources: Object.entries(sources.sources).map(([id, s]) => ({
        id,
        title: loc(s.title, lang),
        url: url(s.url),
        check: s.check,
      })),
      resources: resources.resources.map((r) => ({
        id: r.id,
        title: r.name,
        url: r.url,
        check: r.check,
      })),
      history: history.events.map((e) => ({
        id: e.id,
        title: loc(e.title, lang),
        url: e.url,
        check: e.check,
      })),
    };
  }

  async function init() {
    const mount = document.querySelector('[data-relire]');
    if (!mount || mount.dataset.ready || !DATA) return;
    mount.dataset.ready = '1';
    const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
    const t = STRINGS[lang];
    let entries;
    try {
      entries = await fetchEntries(lang);
    } catch (e) {
      mount.textContent = 'Offline / hors ligne.';
      return;
    }
    const state = Object.assign({ reviewer: '', claimed: 'volunteer', reviews: {} }, load());

    // --- identity
    const reviewer = el('input', {
      type: 'text',
      id: 'relire-reviewer',
      value: state.reviewer,
      autocomplete: 'off',
      maxLength: 60,
    });
    const claimed = el(
      'select',
      { id: 'relire-claimed' },
      ...Object.entries(t.levels).map(([v, l]) =>
        el('option', { value: v, textContent: l, selected: v === state.claimed }),
      ),
    );
    const identity = el(
      'div',
      { className: 'relire__identity' },
      el('label', { htmlFor: 'relire-reviewer', textContent: t.reviewer }),
      reviewer,
      el('p', { className: 'relire__help', textContent: t.reviewerHelp }),
      el('label', { htmlFor: 'relire-claimed', textContent: t.claimed }),
      claimed,
      el('p', { className: 'relire__help', textContent: t.claimedHelp }),
    );

    // --- filters
    const kind = el(
      'select',
      { id: 'relire-kind' },
      ...Object.entries(t.kinds).map(([v, l]) => el('option', { value: v, textContent: l })),
    );
    const only = el('input', { type: 'checkbox', id: 'relire-only', checked: true });
    const search = el('input', { type: 'search', id: 'relire-search', autocomplete: 'off' });
    const filters = el(
      'div',
      { className: 'relire__filters' },
      el('label', { htmlFor: 'relire-kind', textContent: t.kind }),
      kind,
      el('label', { htmlFor: 'relire-search', textContent: t.search }),
      search,
      el('label', { className: 'relire__check' }, only, ` ${t.onlyAi}`),
    );

    const list = el('ol', { className: 'relire__list' });
    const more = el('button', { type: 'button', className: 'relire__btn', textContent: t.more });
    const status = el('p', { className: 'relire__status', role: 'status' });
    const message = el('p', { className: 'relire__status', role: 'alert' });
    const download = el('button', {
      type: 'button',
      className: 'relire__btn relire__btn--main',
      textContent: t.download,
    });
    const copy = el('button', { type: 'button', className: 'relire__btn', textContent: t.copy });
    const reset = el('button', { type: 'button', className: 'relire__btn', textContent: t.reset });
    mount.replaceChildren(
      identity,
      filters,
      list,
      more,
      status,
      el('div', { className: 'relire__actions' }, download, copy, reset),
      message,
    );

    const key = (k, id) => `${k}/${id}`;
    let shown = PAGE;
    let rows = [];

    function persist() {
      state.reviewer = reviewer.value.trim();
      state.claimed = claimed.value;
      save(state);
      const n = Object.keys(state.reviews).length;
      status.textContent = t.count(n, rows.length);
    }

    function row(k, e) {
      const id = key(k, e.id);
      const review = state.reviews[id];
      const comment = el('textarea', {
        rows: 2,
        maxLength: 300,
        placeholder: t.comment,
        value: review?.comment || '',
        hidden: !review || review.verdict === 'confirmed',
      });
      comment.setAttribute('aria-label', t.comment);
      comment.addEventListener('input', () => {
        state.reviews[id].comment = comment.value;
        persist();
      });
      const group = el('div', { className: 'relire__verdicts', role: 'group' });
      Object.entries(t.verdicts).forEach(([v, label]) => {
        const b = el('button', {
          type: 'button',
          className: 'relire__verdict',
          textContent: label,
        });
        b.setAttribute('aria-pressed', String(review?.verdict === v));
        b.addEventListener('click', () => {
          state.reviews[id] = { verdict: v, comment: comment.value };
          [...group.children].forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
          comment.hidden = v === 'confirmed';
          persist();
        });
        group.append(b);
      });
      const clear = el('button', {
        type: 'button',
        className: 'relire__verdict relire__verdict--clear',
        textContent: t.clear,
      });
      clear.addEventListener('click', () => {
        delete state.reviews[id];
        [...group.children].forEach((c) => c.setAttribute('aria-pressed', 'false'));
        comment.hidden = true;
        persist();
      });
      group.append(clear);
      const link = el('a', {
        href: e.url,
        target: '_blank',
        rel: 'noopener noreferrer',
        textContent: t.open,
      });
      return el(
        'li',
        { className: 'relire__item' },
        el('strong', { textContent: e.title }),
        ' · ',
        link,
        el('small', {
          className: 'relire__meta',
          textContent: ` ${t.by} : ${e.check.date}, ${e.check.by}`,
        }),
        group,
        comment,
      );
    }

    function render() {
      const q = normalise(search.value.trim());
      rows = entries[kind.value].filter(
        (e) => (!only.checked || e.check.by === 'ai') && (!q || normalise(e.title).includes(q)),
      );
      list.replaceChildren(...rows.slice(0, shown).map((e) => row(kind.value, e)));
      more.hidden = rows.length <= shown;
      if (!rows.length) list.replaceChildren(el('li', { textContent: t.none }));
      persist();
    }

    function batch() {
      message.textContent = '';
      if (!reviewer.value.trim()) return (message.textContent = t.needReviewer), null;
      const reviews = Object.entries(state.reviews).map(([id, r]) => {
        const [file, ...rest] = id.split('/');
        return {
          file,
          id: rest.join('/'),
          verdict: r.verdict,
          ...(r.verdict !== 'confirmed' ? { comment: (r.comment || '').trim() } : {}),
        };
      });
      if (!reviews.length) return (message.textContent = t.needReviews), null;
      const bad = reviews.find((r) => r.verdict !== 'confirmed' && !r.comment);
      if (bad) return (message.textContent = `${t.needComment} ${bad.file}/${bad.id}`), null;
      const d = new Date();
      const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      return { version: 1, reviewer: reviewer.value.trim(), claimed: claimed.value, date, reviews };
    }

    download.addEventListener('click', () => {
      const b = batch();
      if (!b) return;
      const url = URL.createObjectURL(
        new Blob([`${JSON.stringify(b, null, 2)}\n`], { type: 'application/json' }),
      );
      const a = el('a', { href: url, download: `relecture-${b.date}.json` });
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    copy.addEventListener('click', async () => {
      const b = batch();
      if (!b) return;
      try {
        await navigator.clipboard.writeText(JSON.stringify(b, null, 2));
        message.textContent = t.copied;
      } catch (e) {
        message.textContent = JSON.stringify(b);
      }
    });
    reset.addEventListener('click', () => {
      if (!window.confirm(t.confirmReset)) return;
      state.reviews = {};
      render();
    });
    more.addEventListener('click', () => {
      shown += PAGE;
      render();
    });
    [kind, only].forEach((n) => n.addEventListener('change', () => ((shown = PAGE), render())));
    search.addEventListener('input', () => ((shown = PAGE), render()));
    [reviewer, claimed].forEach((n) => n.addEventListener('input', persist));
    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(init);
  }
})();
