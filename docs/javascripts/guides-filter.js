/*
  Guides page: filter the cards by text and by theme, offline (no request, no index).
  Themes come from docs/data/guide-themes.json, rendered into #guide-themes by the page.
*/
(function () {
  'use strict';

  const STRINGS = {
    fr: {
      label: 'Chercher un guide',
      placeholder: 'garde à vue, téléphone, filmer…',
      themes: 'Thèmes',
      all: 'Tout afficher',
      count: (n, total) => `${n} guide${n > 1 ? 's' : ''} sur ${total}`,
      none: 'Aucun guide ne correspond. Essayez un autre mot, la recherche en haut de la page, ou « Je suis… et je veux… ».',
      parcours: 'Je suis… et je veux…',
    },
    en: {
      label: 'Find a guide',
      placeholder: 'custody, phone, filming…',
      themes: 'Themes',
      all: 'Show all',
      count: (n, total) => `${n} of ${total} guides`,
      none: 'No guide matches. Try another word, the search at the top of the page, or "I am… and I want to…".',
      parcours: 'I am… and I want to…',
    },
  };

  const normalise = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  function slugOf(card) {
    const link = card.querySelector('a[href]');
    if (!link) return null;
    const parts = new URL(link.getAttribute('href'), location.href).pathname.split('/');
    return parts.filter(Boolean).pop() || null;
  }

  function init() {
    const holder = document.getElementById('guide-themes');
    const mount = document.querySelector('[data-guides-filter]');
    if (!holder || !mount) return;
    let data;
    try {
      data = JSON.parse(holder.dataset.themes);
    } catch (e) {
      return;
    }
    const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
    const t = STRINGS[lang];
    const cards = [...document.querySelectorAll('article .grid.cards > ul > li')].map((li) => ({
      li,
      slug: slugOf(li),
      text: normalise(li.textContent || ''),
    }));
    if (!cards.length) return;

    const form = document.createElement('div');
    form.className = 'guides-filter';
    const label = document.createElement('label');
    label.className = 'guides-filter__label';
    label.htmlFor = 'guides-filter-input';
    label.textContent = t.label;
    const input = document.createElement('input');
    input.type = 'search';
    input.id = 'guides-filter-input';
    input.className = 'guides-filter__input';
    input.placeholder = t.placeholder;
    input.autocomplete = 'off';
    input.setAttribute('autocapitalize', 'off');
    const chips = document.createElement('div');
    chips.className = 'guides-filter__chips';
    chips.setAttribute('role', 'group');
    chips.setAttribute('aria-label', t.themes);
    const status = document.createElement('p');
    status.className = 'guides-filter__status';
    status.setAttribute('role', 'status');
    const reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'guides-filter__reset';
    reset.textContent = t.all;
    reset.hidden = true;
    form.append(label, input, chips, status, reset);
    mount.replaceWith(form);

    let theme = null;
    const buttons = data.themes.map((th) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'guides-filter__chip';
      b.textContent = th.label[lang] || th.label.fr;
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', () => {
        theme = theme === th.id ? null : th.id;
        apply();
      });
      chips.append(b);
      return { b, id: th.id };
    });

    const sections = [...document.querySelectorAll('article h2')].map((h2) => {
      const grid = [];
      for (let n = h2.nextElementSibling; n && n.tagName !== 'H2'; n = n.nextElementSibling) {
        if (n.matches('.grid.cards')) grid.push(n);
      }
      return { h2, grid };
    });

    function apply() {
      const q = normalise(input.value.trim());
      let shown = 0;
      cards.forEach((c) => {
        const themed = !theme || (data.guides[c.slug] || []).includes(theme);
        const matched = !q || c.text.includes(q);
        c.li.hidden = !(themed && matched);
        if (!c.li.hidden) shown += 1;
      });
      sections.forEach(({ h2, grid }) => {
        if (!grid.length) return;
        const any = grid.some((g) => g.querySelector(':scope > ul > li:not([hidden])'));
        h2.hidden = !any;
        grid.forEach((g) => {
          g.hidden = !any;
        });
      });
      buttons.forEach(({ b, id }) => b.setAttribute('aria-pressed', String(id === theme)));
      const filtering = Boolean(q || theme);
      reset.hidden = !filtering;
      status.textContent = '';
      if (!shown) {
        status.append(t.none + ' ');
        const link = document.createElement('a');
        link.href = new URL('../parcours/', location.href).href;
        link.textContent = t.parcours;
        status.append(link);
      } else if (filtering) {
        status.textContent = t.count(shown, cards.length);
      }
    }

    input.addEventListener('input', apply);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        input.value = '';
        apply();
      }
    });
    reset.addEventListener('click', () => {
      input.value = '';
      theme = null;
      apply();
      input.focus();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  // Material swaps pages without reload (instant navigation): run again on each page view.
  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(init);
  }
})();
