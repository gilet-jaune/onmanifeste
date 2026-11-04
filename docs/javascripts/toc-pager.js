/*
  Phone table of contents (overrides/main.html has the markup in <template id="ap-toc-template">):
  a floating pill "‹ section 3/7 ›" above the SOS button. The title follows the section being read,
  the arrows jump to the previous or next section, a tap on the title opens the full list in a sheet.
  Phones only, pages with at least 3 sections, never on the tool pages. Offline, no request.
*/
(function () {
  'use strict';

  const PHONE = window.matchMedia('(max-width: 44.9375em)');
  const SKIP = /(?:^|\/)(parcours|sos|annuaire|parametres)\/$/;
  const MIN_SECTIONS = 3;
  const FOLD_KEY = 'ap-toc-folded';
  let state = null;

  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const headerHeight = () =>
    (document.querySelector('.md-header') || { offsetHeight: 56 }).offsetHeight;
  // A heading counts as "reached" once it is under the header.
  const reachedLine = () => headerHeight() + 24;

  function titleOf(heading) {
    const copy = heading.cloneNode(true);
    copy.querySelectorAll('.headerlink').forEach((n) => n.remove());
    return copy.textContent.trim();
  }

  function readFolded() {
    try {
      return localStorage.getItem(FOLD_KEY) === '1';
    } catch (e) {
      return false;
    }
  }
  function writeFolded(folded) {
    try {
      localStorage.setItem(FOLD_KEY, folded ? '1' : '0');
    } catch (e) {
      /* a convenience only */
    }
  }

  function teardown() {
    if (!state) return;
    window.removeEventListener('scroll', state.schedule);
    state.pill.remove();
    state.sheet.remove();
    state = null;
  }

  function init() {
    teardown();
    const template = document.getElementById('ap-toc-template');
    if (!template || !PHONE.matches || SKIP.test(window.location.pathname)) return;
    const inner = document.querySelector('.md-content__inner');
    if (!inner) return;
    const headings = [...inner.querySelectorAll('h2[id], h3[id]')].filter(
      (h) => h.getClientRects().length > 0,
    );
    const sections = headings.filter((h) => h.tagName === 'H2');
    if (sections.length < MIN_SECTIONS) return;

    const fragment = template.content.cloneNode(true);
    const pill = fragment.querySelector('.ap-toc');
    const sheet = fragment.querySelector('.ap-toc-sheet');
    const text = pill.querySelector('.ap-toc__text');
    const counts = pill.querySelectorAll('.ap-toc__count');
    const prev = pill.querySelector('[data-ap-toc-step="-1"]');
    const next = pill.querySelector('[data-ap-toc-step="1"]');
    const list = sheet.querySelector('[data-ap-toc-list]');
    const h1 = inner.querySelector('h1');
    const pageTitle = (h1 && titleOf(h1)) || document.title;

    headings.forEach((heading, i) => {
      const li = document.createElement('li');
      li.dataset.level = heading.tagName === 'H3' ? '3' : '2';
      const a = document.createElement('a');
      a.href = `#${heading.id}`;
      a.dataset.index = String(i);
      a.setAttribute('aria-current', 'false');
      a.textContent = titleOf(heading);
      li.append(a);
      list.append(li);
    });
    const links = [...list.querySelectorAll('a')];

    if (readFolded()) pill.classList.add('is-folded');
    const host = document.querySelector('.fab-stack');
    if (host) host.prepend(pill);
    else document.body.append(pill);
    document.body.append(sheet);

    const reached = (items) => {
      let index = -1;
      items.forEach((h, i) => {
        if (h.getBoundingClientRect().top <= reachedLine()) index = i;
      });
      return index;
    };

    function update() {
      const s = reached(sections);
      text.textContent = s < 0 ? pageTitle : titleOf(sections[s]);
      counts.forEach((c) => {
        c.textContent = `${s + 1}/${sections.length}`;
      });
      prev.disabled = s < 0;
      next.disabled = s >= sections.length - 1;
      const h = reached(headings);
      links.forEach((a, i) => a.setAttribute('aria-current', i === h ? 'true' : 'false'));
    }

    function go(heading) {
      heading.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
      try {
        history.replaceState(null, '', `#${heading.id}`);
      } catch (e) {
        /* not essential */
      }
    }

    let ticking = false;
    const schedule = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    };
    window.addEventListener('scroll', schedule, { passive: true });

    pill.addEventListener('click', (e) => {
      const step = e.target.closest('[data-ap-toc-step]');
      if (step) {
        const dir = Number(step.dataset.apTocStep);
        const s = reached(sections);
        // "Previous" first goes back to the start of the current section, then to the one before.
        const deepInside = s >= 0 && sections[s].getBoundingClientRect().top < -24;
        const target = dir < 0 && deepInside ? s : s + dir;
        if (target >= 0 && target < sections.length) go(sections[target]);
      } else if (e.target.closest('[data-ap-toc-open]')) {
        sheet.showModal();
      } else if (e.target.closest('[data-ap-toc-fold]')) {
        writeFolded(pill.classList.toggle('is-folded'));
      }
    });

    sheet.addEventListener('click', (e) => {
      if (e.target === sheet || e.target.closest('[data-ap-toc-close]')) sheet.close();
      const a = e.target.closest('a[data-index]');
      if (!a) return;
      e.preventDefault();
      sheet.close();
      go(headings[Number(a.dataset.index)]);
    });

    state = { pill, sheet, schedule };
    update();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  if (window.document$ && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(init);
  }
  // Crossing the phone breakpoint (rotation, resize) adds or removes the pill.
  PHONE.addEventListener('change', init);
})();
