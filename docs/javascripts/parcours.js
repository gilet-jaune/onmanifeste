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
  const PARCOURS_URL = new URL('../data/parcours.json', script.src);
  const RESOURCES_URL = new URL('../data/resources.json', script.src);
  // Built by hooks/guide_digest.py: key points of every guide section, shown in the results.
  const DIGEST_URL = new URL('../data/guides-digest.json', script.src);

  const lang = (document.documentElement.lang || 'fr').slice(0, 2) === 'en' ? 'en' : 'fr';
  const T = {
    fr: {
      iam: 'Je suis…',
      iwant: '… et je veux…',
      typeIam: 'Tapez ou choisissez : nassé·e, blessé·e, en garde à vue…',
      pick: 'Choisir cette situation',
      typeWant: 'Tapez ou choisissez ce que vous voulez faire',
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
      error: 'Impossible de charger le parcours. La liste complète reste disponible ci-dessous.',
      sentence: (p, n) => `Je suis ${p} et je veux ${n}.`,
    },
    en: {
      iam: 'I am…',
      iwant: '… and I want to…',
      typeIam: 'Type or choose: kettled, injured, in custody…',
      pick: 'Choose this situation',
      typeWant: 'Type or choose what you want to do',
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
      error: 'Unable to load the guided search. The full list is still available below.',
      sentence: (p, n) => `I am ${p} and I want to ${n}.`,
    },
  }[lang];

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

  function go(params, push = true) {
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

    function draw() {
      const found = matches();
      list.replaceChildren(
        ...found.map((item) =>
          el(
            'button',
            {
              type: 'button',
              class: 'parcours__choice',
              role: 'listitem',
              onclick: () => onPick(item),
            },
            labelOf(item),
          ),
        ),
      );
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
    return el('a', { href: `../annuaire/?q=${encodeURIComponent(q)}` }, T.searchDirectory(q));
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
      );
    }
    let href;
    if (r.guide) href = `../guides/${r.guide}/`;
    else if (r.page) href = `../${r.page}/`;
    else if (r.directory) href = `../annuaire/?${new URLSearchParams(r.directory)}`;
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
  function rotator(profiles, input) {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let i = 0;
    let paused = false;
    const btn = el('button', { type: 'button', class: 'parcours__rotator', title: T.pick }, '');
    const show = () => {
      btn.textContent = `${loc(profiles[i].label)}…`;
      btn.dataset.profile = profiles[i].id;
    };
    btn.addEventListener('click', () => go({ je: btn.dataset.profile }));
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
        i = (i + 1) % profiles.length;
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
      el('a', { href: '../sos/' }, `${T.allNumbers} →`),
    );
  }

  // One need: its sentence, urgent numbers and result cards.
  function needBlock(profile, need, heading = 'h2') {
    return el(
      'section',
      { class: 'parcours__need' },
      el(heading, { class: 'parcours__step' }, `… ${loc(need.label)}`),
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

    const view = el('div', { class: 'parcours__view' });

    if (!profile) {
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
      });
      append(
        view,
        el('h2', { class: 'parcours__step' }, T.iam.replace('…', ''), ' ', rotator(data, p.input)),
        p.node,
      );
      root.replaceChildren(view);
      const found = query ? p.matches().filter((x) => !x.need) : [];
      if (found.length === 1) go({ je: found[0].id }, false);
      return;
    }

    const crumb = el(
      'p',
      { class: 'parcours__crumb' },
      el('span', {}, `${T.iam.replace('…', '')} `),
      el('strong', {}, loc(profile.label)),
      ' ',
      el('button', { type: 'button', class: 'parcours__link', onclick: () => go({}) }, T.change),
    );

    if (!need && profile.needs.length <= 3) {
      append(
        view,
        crumb,
        ...profile.needs.map((n) => needBlock(profile, n)),
        el('button', { type: 'button', class: 'parcours__link', onclick: () => go({}) }, T.restart),
      );
      root.replaceChildren(view);
      return;
    }

    if (!need) {
      const p = picker({
        placeholder: T.typeWant,
        items: profile.needs,
        labelOf: (x) => loc(x.label),
        keywordsOf: (x) => x.keywords || [],
        onPick: (x) => go({ je: profile.id, veux: x.id }),
        emptyHint: directoryLink,
      });
      append(view, crumb, el('h2', { class: 'parcours__step' }, T.iwant), p.node);
      root.replaceChildren(view);
      p.input.focus({ preventScroll: true });
      return;
    }

    const others = profile.needs.filter((n) => n.id !== need.id);
    append(
      view,
      el('p', { class: 'parcours__sentence' }, T.sentence(loc(profile.label), loc(need.label))),
      need.urgent ? urgentBlock() : null,
      el('h2', { class: 'parcours__step' }, T.results),
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
  ])
    .then(([parcours, registry, guides]) => {
      data = parcours.parcours;
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
