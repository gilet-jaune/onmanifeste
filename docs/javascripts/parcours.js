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
      urgent: 'Urgence ? Numéros et legal teams sur la page SOS.',
      results: 'Ce qui peut vous aider',
      call: 'Appeler',
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
      urgent: 'Emergency? Numbers and legal teams on the SOS page.',
      results: 'What can help',
      call: 'Call',
      error: 'Unable to load the guided search. The full list is still available below.',
      sentence: (p, n) => `I am ${p} and I want to ${n}.`,
    },
  }[lang];

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

  function go(params, push = true) {
    const qs = new URLSearchParams(params).toString();
    const url = qs ? `?${qs}` : window.location.pathname;
    if (push) history.pushState(params, '', url);
    else history.replaceState(params, '', url);
    render();
  }

  // Filterable list of choices: typing narrows it down, Enter picks the first match.
  function picker({ placeholder, items, labelOf, keywordsOf, onPick, emptyHint }) {
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
        const hay = normalize(`${labelOf(item)} ${keywordsOf(item).join(' ')}`);
        return terms.every((t) => hay.includes(t));
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
    draw();
    return { node: el('div', { class: 'parcours__picker' }, input, list, status), input };
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
        el('h3', {}, el('a', { href: res.url, target: '_blank', rel: 'noopener' }, res.name)),
        el('p', {}, loc(res.description)),
        res.phone
          ? el(
              'a',
              { class: 'parcours__call', href: `tel:${res.phone.replace(/\s/g, '')}` },
              `📞 ${T.call} ${res.phone}`,
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
    return el(
      'article',
      { class: `parcours__result parcours__result--${kind}` },
      el('h3', {}, el('a', { href }, loc(r.label))),
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

  function render() {
    const params = new URLSearchParams(window.location.search);
    const profile = data.find((p) => p.id === params.get('je'));
    const need = profile?.needs.find((n) => n.id === params.get('veux'));

    const view = el('div', { class: 'parcours__view' });

    if (!profile) {
      const p = picker({
        placeholder: T.typeIam,
        items: data,
        labelOf: (x) => loc(x.label),
        keywordsOf: (x) => x.keywords || [],
        onPick: (x) => go({ je: x.id }),
        emptyHint: directoryLink,
      });
      view.append(
        el('h2', { class: 'parcours__step' }, T.iam.replace('…', ''), ' ', rotator(data, p.input)),
        p.node,
      );
      root.replaceChildren(view);
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

    if (!need) {
      const p = picker({
        placeholder: T.typeWant,
        items: profile.needs,
        labelOf: (x) => loc(x.label),
        keywordsOf: () => [],
        onPick: (x) => go({ je: profile.id, veux: x.id }),
        emptyHint: directoryLink,
      });
      view.append(crumb, el('h2', { class: 'parcours__step' }, T.iwant), p.node);
      root.replaceChildren(view);
      p.input.focus({ preventScroll: true });
      return;
    }

    const others = profile.needs.filter((n) => n.id !== need.id);
    view.append(
      el('p', { class: 'parcours__sentence' }, T.sentence(loc(profile.label), loc(need.label))),
      need.urgent
        ? el(
            'p',
            { class: 'parcours__urgent', role: 'alert' },
            el('a', { href: '../sos/' }, T.urgent),
          )
        : null,
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
  ])
    .then(([parcours, registry]) => {
      data = parcours.parcours;
      resources = new Map(registry.resources.map((r) => [r.id, r]));
      window.addEventListener('popstate', render);
      render();
    })
    .catch((err) => {
      root.prepend(el('p', { class: 'parcours__status' }, T.error));
      console.error('[parcours]', err);
    });
})();
