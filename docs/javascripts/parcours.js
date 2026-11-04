/*
  Guided search ("Je suis… / et je veux…"): a two-step decision tree over docs/data/parcours.json.
  Step 1 picks who you are (typed or chosen), step 2 what you want; the result lists guide
  sections, directory resources and shortcuts. State lives in the URL (?je=…&veux=…), the
  browser back button steps back, and everything works offline (data is precached).
*/
(() => {
  const root = document.querySelector('[data-parcours]');
  if (!root) return;

  const script = document.currentScript;
  // Another decision tree can reuse this script: data-src names its file in data/, data-key its
  // top-level key, and data-iam, data-iwant, data-type-iam, data-type-want, data-pick, data-need-of
  // replace the step wording.
  // Embedded in a guide (data-embed): relative links start from data-up, the guide's own table of
  // contents is left alone and headings are one level lower.
  const EMBED = root.dataset.embed !== undefined;
  const UP = root.dataset.up || '../';
  const H = EMBED ? 'h3' : 'h2';
  const PARCOURS_URL = new URL(`../data/${root.dataset.src || 'parcours.json'}`, script.src);
  const DATA_KEY = root.dataset.key || 'parcours';
  const RESOURCES_URL = new URL('../data/resources.json', script.src);
  // Built by hooks/guide_digest.py: key points of every guide section, shown in the results.
  const DIGEST_URL = new URL('../data/guides-digest.json', script.src);

  const lang = (document.documentElement.lang || 'fr').slice(0, 2) === 'en' ? 'en' : 'fr';
  const T = {
    fr: {
      iam: 'Je suis…',
      iwant: '… et je veux…',
      typeIam: 'Tapez quelques mots',
      step: (n) => `Étape ${n} sur 2`,
      hintIam: 'Touchez une situation ci-dessous, ou tapez quelques mots.',
      hintWant: 'Touchez ce que vous voulez faire, ou tapez quelques mots.',
      pick: 'Choisir cette situation',
      typeWant: 'Tapez quelques mots',
      change: 'Changer',
      restart: 'Recommencer',
      other: 'Autre besoin',
      none: 'Rien ne correspond.',
      searchDirectory: (q) => `Chercher « ${q} » dans l'annuaire`,
      results: 'Ce qui peut vous aider',
      badge: { guide: 'Guide', page: 'Page', directory: 'Annuaire' },
      inGuide: 'Guide',
      readGuide: 'Lire le guide',
      readSection: 'Lire la section',
      emergency: 'En urgence',
      allNumbers: 'Tous les numéros et legal teams',
      needOf: (p) => `si vous êtes ${p}`,
      call: 'Appeler',
      install: 'Installer :',
      socials: 'Réseaux :',
      sources: 'Sources :',
      tocTitle: 'Table des matières',
      error: 'Impossible de charger le parcours. La liste complète reste disponible ci-dessous.',
    },
    en: {
      iam: 'I am…',
      iwant: '… and I want to…',
      typeIam: 'Type a few words',
      step: (n) => `Step ${n} of 2`,
      hintIam: 'Tap a situation below, or type a few words.',
      hintWant: 'Tap what you want to do, or type a few words.',
      pick: 'Choose this situation',
      typeWant: 'Type a few words',
      change: 'Change',
      restart: 'Start again',
      other: 'Something else',
      none: 'Nothing matches.',
      searchDirectory: (q) => `Search "${q}" in the directory`,
      results: 'What can help',
      badge: { guide: 'Guide', page: 'Page', directory: 'Directory' },
      inGuide: 'Guide',
      readGuide: 'Read the guide',
      readSection: 'Read the section',
      emergency: 'In an emergency',
      allNumbers: 'All numbers and legal teams',
      needOf: (p) => `if you are ${p}`,
      call: 'Call',
      install: 'Install:',
      socials: 'Social:',
      sources: 'Sources:',
      tocTitle: 'Table of contents',
      error: 'Unable to load the guided search. The full list is still available below.',
    },
  }[lang];
  const fill = (tpl) => (p, n) => tpl.replace('{p}', p).replace('{n}', n);
  for (const key of ['iam', 'iwant', 'typeIam', 'typeWant', 'pick']) {
    if (root.dataset[key]) T[key] = root.dataset[key];
  }
  if (root.dataset.needOf) T.needOf = fill(root.dataset.needOf);

  const STORE_LABELS = { android: 'Google Play', fdroid: 'F-Droid', ios: 'App Store' };
  const SOCIAL_LABELS = {
    bluesky: 'Bluesky',
    mastodon: 'Mastodon',
    x: 'X',
    instagram: 'Instagram',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    youtube: 'YouTube',
    peertube: 'PeerTube',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  };

  const normalize = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const loc = (o) => (o && (o[lang] || o.fr)) || '';

  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === undefined || v === null || v === false) continue;
      if (k === 'class') node.className = v;
      else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    }
    node.append(...children.filter((c) => c !== null && c !== undefined && c !== ''));
    return node;
  }

  let data;
  let resources;
  let checkLevels;
  let profileGroups = null;
  let categories = {};
  let emergency = [];
  let digest = {};

  // Trusted build output (hooks/guide_digest.py keeps only <strong> and <em>).
  const rich = (htmlText) => {
    const span = document.createElement('span');
    span.innerHTML = htmlText;
    return span;
  };

  // Like node.append(), but skips absent optional children (null…) instead of printing "null".
  const append = (node, ...children) =>
    node.append(
      ...children.filter((c) => c !== null && c !== undefined && c !== false && c !== ''),
    );

  // After a click, bring the next step to the top; not on first load or when going back.
  let scrollToStep = false;
  let rendered = false;

  function go(params, push = true) {
    scrollToStep = push;
    const qs = new URLSearchParams(params).toString();
    const url = qs ? `?${qs}` : window.location.pathname;
    if (push) history.pushState(params, '', url);
    else history.replaceState(params, '', url);
    render();
  }

  // Filterable list of choices: typing narrows it down, Enter picks the first match.
  function picker({
    placeholder,
    items,
    labelOf,
    keywordsOf,
    onPick,
    emptyHint,
    initial = '',
    onlyWhenTyped = () => false,
    groups = null,
    groupOf = () => null,
  }) {
    const input = el('input', {
      type: 'search',
      class: 'parcours__input',
      placeholder,
      'aria-label': placeholder,
      autocomplete: 'off',
      enterkeyhint: 'go',
    });
    const list = el('div', { class: 'parcours__choices', role: 'list' });
    const status = el('p', { class: 'parcours__status', role: 'status', 'aria-live': 'polite' });

    function matches() {
      const terms = normalize(input.value).split(/\s+/).filter(Boolean);
      return items.filter((item) => {
        if (!terms.length && onlyWhenTyped(item)) return false;
        const hay = normalize(`${labelOf(item)} ${keywordsOf(item).join(' ')}`).replace(
          /[^a-z0-9]+/g,
          ' ',
        );
        // Match at word starts only ("peur" must not match "developpeur").
        return terms.every((t) => ` ${hay}`.includes(` ${t}`));
      });
    }

    const choiceButton = (item) =>
      el(
        'button',
        {
          type: 'button',
          class: 'parcours__choice',
          role: 'listitem',
          onclick: () => onPick(item),
        },
        labelOf(item),
      );

    // Nothing typed: the choices are grouped (the first group open, the others folded). As soon as
    // something is typed, a flat list of every match across all groups replaces them.
    function groupedChoices() {
      return groups.map((g) => {
        const own = items.filter((item) => !onlyWhenTyped(item) && groupOf(item) === g.id);
        const details = el(
          'details',
          { class: 'parcours__group' },
          el('summary', { class: 'parcours__group-title' }, `${loc(g.label)} (${own.length})`),
          el('div', { class: 'parcours__choices', role: 'list' }, ...own.map(choiceButton)),
        );
        details.open = Boolean(g.open);
        return details;
      });
    }

    function draw() {
      const found = matches();
      const typed = input.value.trim() !== '';
      list.classList.toggle('parcours__choices--grouped', Boolean(groups) && !typed);
      list.replaceChildren(...(groups && !typed ? groupedChoices() : found.map(choiceButton)));
      status.replaceChildren();
      if (!found.length && input.value.trim()) {
        status.append(T.none, ' ', emptyHint(input.value.trim()));
      }
    }

    input.addEventListener('input', draw);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const first = matches()[0];
        if (first) onPick(first);
      }
    });
    input.value = initial;
    draw();
    return { node: el('div', { class: 'parcours__picker' }, input, list, status), input, matches };
  }

  function directoryLink(q) {
    return el('a', { href: `${UP}annuaire/?q=${encodeURIComponent(q)}` }, T.searchDirectory(q));
  }

  function resultNode(r) {
    if (r.resource) {
      const res = resources.get(r.resource);
      if (!res) return null;
      return el(
        'article',
        { class: 'parcours__result parcours__result--resource' },
        categories[res.category]
          ? el('span', { class: 'parcours__badge' }, loc(categories[res.category]))
          : null,
        el(
          'h3',
          {},
          el(
            'a',
            { href: res.url, 'data-resource-card': res.id, target: '_blank', rel: 'noopener' },
            res.name,
          ),
        ),
        el('p', {}, loc(res.description)),
        res.phone
          ? el(
              'a',
              { class: 'parcours__call', href: `tel:${res.phone.replace(/\s/g, '')}` },
              `📞 ${T.call} ${res.phone}`,
            )
          : null,
        res.stores
          ? el(
              'p',
              { class: 'directory__stores' },
              `${T.install} `,
              ...Object.keys(STORE_LABELS)
                .filter((store) => res.stores[store])
                .flatMap((store, i) => [
                  i ? ' · ' : '',
                  el(
                    'a',
                    { href: res.stores[store], target: '_blank', rel: 'noopener' },
                    STORE_LABELS[store],
                  ),
                ]),
            )
          : null,
        res.socials
          ? el(
              'p',
              { class: 'directory__socials' },
              `${T.socials} `,
              ...Object.keys(SOCIAL_LABELS)
                .filter((social) => res.socials[social])
                .flatMap((social, i) => [
                  i ? ' · ' : '',
                  el(
                    'a',
                    { href: res.socials[social], target: '_blank', rel: 'noopener' },
                    SOCIAL_LABELS[social],
                  ),
                ]),
            )
          : null,
        res.sources?.length
          ? el(
              'p',
              { class: 'directory__sources' },
              `${T.sources} `,
              ...res.sources.flatMap((source, i) => [
                i ? ', ' : '',
                el('a', { href: source.url, target: '_blank', rel: 'noopener' }, source.title),
              ]),
            )
          : null,
        res.check?.result === 'unconfirmed'
          ? el(
              'p',
              { class: 'directory__unconfirmed', title: res.check.note },
              `⚠ ${checkLevels.unconfirmed[lang]}`,
            )
          : null,
        res.check
          ? el(
              'p',
              { class: 'directory__checked' },
              ...window.apCheck.line(checkLevels, res.check, lang),
            )
          : null,
      );
    }
    let href;
    if (r.guide) href = `${UP}guides/${r.guide}/`;
    else if (r.page) href = `${UP}${r.page}/`;
    else if (r.directory) href = `${UP}annuaire/?${new URLSearchParams(r.directory)}`;
    if (r.anchor && loc(r.anchor)) href += `#${loc(r.anchor)}`;
    const kind = r.guide ? 'guide' : r.page ? 'page' : 'directory';
    const guide = r.guide ? (digest[lang] || {})[r.guide] : null;
    const section = guide && r.anchor ? guide.sections[loc(r.anchor)] : null;
    const points = section?.points?.length ? section.points : guide?.essentiel || [];
    return el(
      'article',
      { class: `parcours__result parcours__result--${kind}` },
      el('span', { class: 'parcours__badge' }, T.badge[kind]),
      el('h3', {}, el('a', { href }, loc(r.label))),
      guide && guide.title !== loc(r.label)
        ? el('p', { class: 'parcours__from' }, `${T.inGuide} : ${guide.title}`)
        : null,
      points.length
        ? el('ul', { class: 'parcours__points' }, ...points.map((pt) => el('li', {}, rich(pt))))
        : null,
      guide
        ? el('a', { class: 'parcours__more', href }, `${section ? T.readSection : T.readGuide} →`)
        : null,
    );
  }

  // "Je suis [nassé·e]": cycles through the profiles; clicking picks the one shown. Stops while the
  // person types or hovers, and does not move at all with prefers-reduced-motion.
  let rotatorTimer;
  function rotator(items, input, pick) {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let i = 0;
    let paused = false;
    const btn = el('button', { type: 'button', class: 'parcours__rotator', title: T.pick }, '');
    const show = () => {
      btn.textContent = `${loc(items[i].label)}…`;
      btn.dataset.id = items[i].id;
    };
    btn.addEventListener('click', () => pick(btn.dataset.id));
    for (const evt of ['mouseenter', 'focus']) btn.addEventListener(evt, () => (paused = true));
    for (const evt of ['mouseleave', 'blur']) btn.addEventListener(evt, () => (paused = false));
    input.addEventListener('input', () => {
      paused = input.value.trim() !== '';
    });
    show();
    clearInterval(rotatorTimer);
    if (!still) {
      rotatorTimer = setInterval(() => {
        if (paused || !btn.isConnected) return;
        i = (i + 1) % items.length;
        show();
      }, 2500);
    }
    return btn;
  }

  // Emergency numbers one tap away (first three of resources.json "emergency"), then the SOS page.
  function urgentBlock() {
    return el(
      'div',
      { class: 'parcours__urgent', role: 'alert' },
      el('strong', {}, `${T.emergency} : `),
      ...emergency
        .slice(0, 3)
        .flatMap((n) => [
          el(
            'a',
            { class: 'parcours__call', href: `tel:${n.number}` },
            `📞 ${n.number} · ${loc(n.label)}`,
          ),
          ' ',
        ]),
      el('a', { href: `${UP}sos/` }, `${T.allNumbers} →`),
    );
  }

  let tocObserver = null;

  function syncToc(items) {
    if (EMBED) return;
    if (tocObserver) {
      tocObserver.disconnect();
      tocObserver = null;
    }
    const sidebar = document.querySelector('.md-sidebar--secondary');
    if (!sidebar) return;
    if (!items || !items.length) {
      sidebar.setAttribute('hidden', '');
      return;
    }
    const nav = sidebar.querySelector('nav');
    if (!nav) return;
    sidebar.removeAttribute('hidden');
    const links = items.map((it, idx) =>
      el(
        'li',
        { class: 'md-nav__item' },
        el(
          'a',
          {
            class: `md-nav__link${idx === 0 ? ' md-nav__link--active' : ''}`,
            href: `#${it.id}`,
            onclick: (e) => {
              const target = document.getElementById(it.id);
              if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.pushState(null, '', `#${it.id}`);
                nav.querySelectorAll('.md-nav__link').forEach((l) => {
                  l.classList.toggle(
                    'md-nav__link--active',
                    l.getAttribute('href') === `#${it.id}`,
                  );
                });
              }
            },
          },
          el('span', { class: 'md-ellipsis' }, it.label),
        ),
      ),
    );
    nav.replaceChildren(
      el(
        'label',
        { class: 'md-nav__title', for: '__toc' },
        el('span', { class: 'md-nav__icon md-icon' }),
        T.tocTitle,
      ),
      el(
        'ul',
        { class: 'md-nav__list', 'data-md-component': 'toc', 'data-md-scrollfix': '' },
        ...links,
      ),
    );

    if (typeof IntersectionObserver !== 'undefined') {
      tocObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries.filter((e) => e.isIntersecting);
          if (visible.length) {
            const first = visible[0].target.id;
            nav.querySelectorAll('.md-nav__link').forEach((l) => {
              l.classList.toggle('md-nav__link--active', l.getAttribute('href') === `#${first}`);
            });
          }
        },
        { rootMargin: '-10% 0px -70% 0px' },
      );
      requestAnimationFrame(() => {
        items.forEach((it) => {
          const target = document.getElementById(it.id);
          if (target && tocObserver) tocObserver.observe(target);
        });
      });
    }
  }

  // One need: the chosen situation and need, urgent numbers and result cards.
  function needBlock(profile, need, heading = H, saysWant = false) {
    const needId = `besoin-${need.id}`;
    return el(
      'section',
      { class: 'parcours__need', id: needId },
      el(
        heading,
        { class: 'parcours__step' },
        saysWant ? `${T.iwant.replace(/…$/, '')} ${loc(need.label)}` : `… ${loc(need.label)}`,
      ),
      need.urgent ? urgentBlock() : null,
      el('div', { class: 'parcours__results' }, ...need.results.map(resultNode).filter(Boolean)),
    );
  }

  function render() {
    const params = new URLSearchParams(window.location.search);
    // Site search links to a profile heading of the static tree (#je-<id>).
    const fromHash = window.location.hash.startsWith('#je-')
      ? decodeURIComponent(window.location.hash.slice(4))
      : null;
    const profile = data.find((p) => p.id === (params.get('je') || fromHash));
    const need = profile?.needs.find((n) => n.id === params.get('veux'));
    // Embedded in a guide: a link or a search hit for a profile lands on the selector.
    if (EMBED && profile && !rendered) root.scrollIntoView({ block: 'start' });
    rendered = true;

    const view = el('div', { class: 'parcours__view' });

    if (!profile) {
      syncToc(null);
      // Coming from the site search: prefill with the searched words; one match opens it directly.
      const query = (params.get('q') || params.get('h') || '').trim();
      // Typing also finds needs across profiles ("avocat" → "trouver ou payer un avocat").
      const needItems = data.flatMap((pr) => pr.needs.map((n) => ({ need: n, profile: pr })));
      const p = picker({
        initial: query,
        placeholder: T.typeIam,
        items: [...data, ...needItems],
        labelOf: (x) =>
          x.need ? `… ${loc(x.need.label)} (${T.needOf(loc(x.profile.label))})` : loc(x.label),
        keywordsOf: (x) => (x.need ? x.need.keywords || [] : x.keywords || []),
        onlyWhenTyped: (x) => Boolean(x.need),
        onPick: (x) => go(x.need ? { je: x.profile.id, veux: x.need.id } : { je: x.id }),
        emptyHint: directoryLink,
        groups: profileGroups,
        groupOf: (x) => x.group,
      });
      append(
        view,
        el('p', { class: 'parcours__stepno' }, T.step(1)),
        el(
          H,
          { class: 'parcours__step' },
          T.iam.replace('…', ''),
          ' ',
          rotator(data, p.input, (id) => go({ je: id })),
        ),
        el('p', { class: 'parcours__hint' }, T.hintIam),
        p.node,
      );
      root.replaceChildren(view);
      const found = query ? p.matches().filter((x) => !x.need) : [];
      if (found.length === 1) go({ je: found[0].id }, false);
      return;
    }

    const crumb = el(
      H,
      { class: 'parcours__step' },
      T.iam.replace('…', ''),
      ' ',
      el('span', { class: 'parcours__chosen' }, loc(profile.label)),
      ' ',
      el('button', { type: 'button', class: 'parcours__link', onclick: () => go({}) }, T.change),
    );

    if (!need && profile.needs.length <= 3) {
      syncToc(
        profile.needs.map((n) => ({
          id: `besoin-${n.id}`,
          label: loc(n.label),
        })),
      );
      const several = profile.needs.length > 1;
      append(
        view,
        crumb,
        // Few needs are all shown, but "I want…" stays visible and each need can be picked on its own.
        several ? el(H, { class: 'parcours__step' }, T.iwant) : null,
        several ? el('p', { class: 'parcours__hint' }, T.hintWant) : null,
        several
          ? el(
              'div',
              { class: 'parcours__choices', role: 'list' },
              ...profile.needs.map((n) =>
                el(
                  'button',
                  {
                    type: 'button',
                    class: 'parcours__choice',
                    role: 'listitem',
                    onclick: () => go({ je: profile.id, veux: n.id }),
                  },
                  loc(n.label),
                ),
              ),
            )
          : null,
        ...profile.needs.map((n) => needBlock(profile, n, H, !several)),
        el('button', { type: 'button', class: 'parcours__link', onclick: () => go({}) }, T.restart),
      );
      root.replaceChildren(view);
      return;
    }

    if (!need) {
      syncToc(null);
      const p = picker({
        placeholder: T.typeWant,
        items: profile.needs,
        labelOf: (x) => loc(x.label),
        keywordsOf: (x) => x.keywords || [],
        onPick: (x) => go({ je: profile.id, veux: x.id }),
        emptyHint: directoryLink,
      });
      append(
        view,
        crumb,
        el('p', { class: 'parcours__stepno' }, T.step(2)),
        el(
          H,
          { class: 'parcours__step' },
          T.iwant.replace(/…$/, ''),
          ' ',
          rotator(profile.needs, p.input, (id) => go({ je: profile.id, veux: id })),
        ),
        el('p', { class: 'parcours__hint' }, T.hintWant),
        p.node,
      );
      root.replaceChildren(view);
      p.input.focus({ preventScroll: true });
      if (scrollToStep) crumb.scrollIntoView({ block: 'start' });
      return;
    }

    const others = profile.needs.filter((n) => n.id !== need.id);
    syncToc(null);
    append(
      view,
      crumb,
      el(
        H,
        { class: 'parcours__step' },
        T.iwant.replace(/…$/, ''),
        ' ',
        el('span', { class: 'parcours__chosen' }, loc(need.label)),
        ' ',
        el(
          'button',
          { type: 'button', class: 'parcours__link', onclick: () => go({ je: profile.id }) },
          T.change,
        ),
      ),
      need.urgent ? urgentBlock() : null,
      el(H, { class: 'parcours__step' }, T.results),
      el('div', { class: 'parcours__results' }, ...need.results.map(resultNode).filter(Boolean)),
      others.length
        ? el(
            'div',
            { class: 'parcours__others' },
            el('span', {}, `${T.other} : `),
            ...others.map((n) =>
              el(
                'button',
                {
                  type: 'button',
                  class: 'parcours__choice',
                  onclick: () => go({ je: profile.id, veux: n.id }),
                },
                loc(n.label),
              ),
            ),
          )
        : null,
      el('button', { type: 'button', class: 'parcours__link', onclick: () => go({}) }, T.restart),
    );
    root.replaceChildren(view);
  }

  Promise.all([
    fetch(PARCOURS_URL).then((r) => r.json()),
    fetch(RESOURCES_URL).then((r) => r.json()),
    // Optional: without the digest, guide results fall back to a plain link.
    fetch(DIGEST_URL)
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({})),
    window.apCheck.load(),
  ])
    .then(([parcours, registry, guides, levels]) => {
      data = parcours[DATA_KEY];
      profileGroups = parcours.parcours_groups || null;
      checkLevels = levels;
      resources = new Map(registry.resources.map((r) => [r.id, r]));
      categories = registry.categories || {};
      emergency = registry.emergency || [];
      digest = guides;
      window.addEventListener('popstate', render);
      window.addEventListener('hashchange', render);
      render();
    })
    .catch((err) => {
      root.prepend(el('p', { class: 'parcours__status' }, T.error));
      console.error('[parcours]', err);
    });
})();
