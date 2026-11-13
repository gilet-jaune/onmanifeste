/* 
  Custom JavaScript for Anchor Copy-to-Clipboard & Resource Contact Card
*/

const EXTRA_RESOURCES_URL = new URL('../data/resources.json', document.currentScript.src);
const EXTRA_SITE_ROOT_URL = new URL('../', document.currentScript.src);

document.addEventListener('DOMContentLoaded', function () {
  // Select all permalinks
  const headerLinks = document.querySelectorAll('.headerlink');

  headerLinks.forEach((link) => {
    // Set initial tooltip text & clear native title to prevent clashing
    link.setAttribute('data-tooltip', 'Copy Link');
    link.removeAttribute('title');

    link.addEventListener('click', function (e) {
      // Prevent full page reload/jump if we want custom behavior
      e.preventDefault();

      // Construct the absolute URL
      const url = window.location.origin + window.location.pathname + link.getAttribute('href');

      // Copy to Clipboard
      navigator.clipboard.writeText(url).then(() => {
        // Visual Feedback: Show the success state
        link.classList.add('copied');

        // Restore the original state after a short delay
        setTimeout(() => {
          link.classList.remove('copied');
        }, 1200);

        // Update URL hash without standard "jumping" reload
        window.history.replaceState(null, null, link.getAttribute('href'));

        // Smooth scroll to the target manually
        const targetId = decodeURIComponent(link.getAttribute('href').substring(1));
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });

  // --- Interactive Tag Search ---
  const tags = document.querySelectorAll('.md-tag');
  const searchInput = document.querySelector('.md-search__input');

  tags.forEach((tag) => {
    tag.addEventListener('click', function (e) {
      e.preventDefault();
      const tagName = tag.textContent.trim();

      if (searchInput) {
        // Populate search input and trigger event
        searchInput.value = tagName;
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));

        // Open search bar if it's hidden/mobile
        const searchLabel = document.querySelector('label[for="__search"]');
        if (searchLabel) searchLabel.click();

        // Ensure the input has focus
        searchInput.focus();
      }
    });
  });

  // --- Mermaid Diagram Interactivity (Zoom, Fullscreen, Uncollapse) ---
  const SVG_ZOOM_IN = `<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/></svg>`;
  const SVG_ZOOM_OUT = `<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"/></svg>`;
  const SVG_FULLSCREEN = `<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>`;
  const SVG_FULLSCREEN_EXIT = `<svg viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>`;

  function injectMermaidControls() {
    document.querySelectorAll('.mermaid').forEach((block) => {
      if (block.parentElement && block.parentElement.classList.contains('mermaid-wrapper')) {
        return;
      }

      const wrapper = document.createElement('div');
      wrapper.className = 'mermaid-wrapper';
      block.parentNode.insertBefore(wrapper, block);
      wrapper.appendChild(block);

      const controls = document.createElement('div');
      controls.className = 'mermaid-controls';
      controls.style.display = 'none'; // Initially Hidden until Expanded

      const btnOut = document.createElement('button');
      btnOut.className = 'mermaid-btn m-out';
      btnOut.title = 'Zoom Out';
      btnOut.innerHTML = SVG_ZOOM_OUT;

      const btnIn = document.createElement('button');
      btnIn.className = 'mermaid-btn m-in';
      btnIn.title = 'Zoom In';
      btnIn.innerHTML = SVG_ZOOM_IN;

      const btnFill = document.createElement('button');
      btnFill.className = 'mermaid-btn m-fill';
      btnFill.title = 'Fullscreen';
      btnFill.innerHTML = SVG_FULLSCREEN;

      controls.appendChild(btnOut);
      controls.appendChild(btnIn);
      controls.appendChild(btnFill);
      wrapper.appendChild(controls);

      const uncollapse = document.createElement('div');
      uncollapse.className = 'mermaid-uncollapse';
      const uncolLabel = document.createElement('span');
      uncolLabel.textContent = 'Uncollapse Details';
      uncollapse.appendChild(uncolLabel);
      wrapper.appendChild(uncollapse);
    });
  }

  injectMermaidControls();
  const observer = new MutationObserver(() => injectMermaidControls());
  observer.observe(document.body, { childList: true, subtree: true });

  function getMermaidSvg(wrapper) {
    if (!wrapper) return null;
    const block = wrapper.querySelector('.mermaid');
    if (!block) return null;
    if (block.tagName.toLowerCase() === 'svg') return block;
    return (
      block.querySelector('svg') ||
      (block.shadowRoot && block.shadowRoot.querySelector('svg')) ||
      block.querySelector('.mermaid svg')
    );
  }

  // Interaction Definitions
  document.body.addEventListener('click', async function (e) {
    const wrapper = e.target.closest('.mermaid-wrapper');
    if (!wrapper) return;

    const btnOut = e.target.closest('.mermaid-btn.m-out');
    const btnIn = e.target.closest('.mermaid-btn.m-in');
    const btnFill = e.target.closest('.mermaid-btn.m-fill');
    const uncollapse = e.target.closest('.mermaid-uncollapse');

    const mermaidBlock = wrapper.querySelector('.mermaid');
    if (!mermaidBlock) return;

    const performZoom = (zoomFactor, cx, cy) => {
      const zoomOld = parseFloat(mermaidBlock.getAttribute('data-zoom')) || 1.0;
      const txOld = parseFloat(mermaidBlock.getAttribute('data-tx')) || 0;
      const tyOld = parseFloat(mermaidBlock.getAttribute('data-ty')) || 0;

      let zoomNew = zoomOld * zoomFactor;
      zoomNew = Math.min(5.0, Math.max(0.2, zoomNew)); // Hard cap at 0.2 min, 5.0 max

      // Calculate continuous offset mapped from the container's interaction point
      const txNew = cx - (cx - txOld) * (zoomNew / zoomOld);
      const tyNew = cy - (cy - tyOld) * (zoomNew / zoomOld);

      mermaidBlock.setAttribute('data-zoom', zoomNew);
      mermaidBlock.setAttribute('data-tx', txNew);
      mermaidBlock.setAttribute('data-ty', tyNew);
      mermaidBlock.style.transform = `translate(${txNew}px, ${tyNew}px) scale(${zoomNew})`;

      if (zoomNew > 1.0) {
        mermaidBlock.classList.add('expanded');
        wrapper.classList.add('is-expanded');
        wrapper.querySelector('.mermaid-controls').style.display = 'flex';
      }
    };

    if (btnIn || btnOut) {
      e.preventDefault();
      e.stopPropagation();
      const zoomFactor = btnIn ? 1.25 : 0.8; // Multiplicative scale for smoothness!

      let centerX, centerY;
      if (wrapper.classList.contains('fullscreen')) {
        centerX = window.innerWidth / 2;
        centerY = window.innerHeight / 2;
      } else {
        const rect = wrapper.getBoundingClientRect(); // Map to wrapper bounds!
        centerX = rect.width / 2;
        centerY = rect.height / 2;
      }
      performZoom(zoomFactor, centerX, centerY);
    } else if (btnFill) {
      e.preventDefault();
      e.stopPropagation();
      const isActive = wrapper.classList.contains('fullscreen');

      // Close all fullscreens and Restore their inline state
      document.querySelectorAll('.mermaid-wrapper.fullscreen').forEach((w) => {
        w.classList.remove('fullscreen');
        const mb = w.querySelector('.mermaid');
        const fBtn = w.querySelector('.mermaid-btn.m-fill');
        if (fBtn) {
          fBtn.innerHTML = SVG_FULLSCREEN;
          fBtn.title = 'Fullscreen';
        }

        if (mb) {
          const tx = mb.getAttribute('data-pre-tx') || 0;
          const ty = mb.getAttribute('data-pre-ty') || 0;
          const zoom = mb.getAttribute('data-pre-zoom') || 1.0;
          const wasExpanded = mb.getAttribute('data-pre-expanded') === 'true';

          mb.setAttribute('data-tx', tx);
          mb.setAttribute('data-ty', ty);
          mb.setAttribute('data-zoom', zoom);

          if (wasExpanded || parseFloat(zoom) > 1.0) {
            mb.classList.add('expanded');
            w.classList.add('is-expanded');
            const label = w.querySelector('.mermaid-uncollapse span');
            if (label) label.textContent = 'Collapse Diagram';

            if (parseFloat(zoom) > 1.0) {
              const controls = w.querySelector('.mermaid-controls');
              if (controls) controls.style.display = 'flex';
            }

            setTimeout(() => {
              mb.style.transform = `translate(${tx}px, ${ty}px) scale(${zoom})`;
            }, 50);
          } else {
            mb.classList.remove('expanded');
            w.classList.remove('is-expanded');
            mb.style.transform = '';
          }
        }
      });
      document.body.style.overflow = '';

      if (!isActive) {
        wrapper.classList.add('fullscreen');
        document.body.style.overflow = 'hidden';
        btnFill.innerHTML = SVG_FULLSCREEN_EXIT;
        btnFill.title = 'Exit Fullscreen';
        wrapper.querySelector('.mermaid-controls').style.display = 'flex';

        // Save inline state
        mermaidBlock.setAttribute('data-pre-tx', mermaidBlock.getAttribute('data-tx') || 0);
        mermaidBlock.setAttribute('data-pre-ty', mermaidBlock.getAttribute('data-ty') || 0);
        mermaidBlock.setAttribute('data-pre-zoom', mermaidBlock.getAttribute('data-zoom') || 1.0);
        mermaidBlock.setAttribute('data-pre-expanded', mermaidBlock.classList.contains('expanded'));

        // Reset to native layout so MkDocs can naturally draw it without transform crashes
        mermaidBlock.setAttribute('data-tx', 0);
        mermaidBlock.setAttribute('data-ty', 0);
        mermaidBlock.setAttribute('data-zoom', 1.0);
        mermaidBlock.style.transform = '';
      }
    } else if (uncollapse) {
      e.preventDefault();
      e.stopPropagation();
      const isExpanded = mermaidBlock.classList.contains('expanded');
      const label = uncollapse.querySelector('span');

      if (isExpanded) {
        mermaidBlock.classList.remove('expanded');
        wrapper.classList.remove('is-expanded');
        wrapper.querySelector('.mermaid-controls').style.display = 'none';
        label.textContent = 'Uncollapse Details';

        mermaidBlock.setAttribute('data-zoom', 1.0);
        mermaidBlock.setAttribute('data-tx', 0);
        mermaidBlock.setAttribute('data-ty', 0);
        mermaidBlock.style.transform = '';

        const rect = mermaidBlock.getBoundingClientRect();
        if (rect.top < 0) window.scrollBy({ top: rect.top - 100, behavior: 'smooth' });
      } else {
        mermaidBlock.classList.add('expanded');
        wrapper.classList.add('is-expanded');
        wrapper.querySelector('.mermaid-controls').style.display = 'flex';
        label.textContent = 'Collapse Diagram';
      }
    }
  });

  // --- Wheel Zoom Support (Cursor Relative) ---
  document.body.addEventListener(
    'wheel',
    function (e) {
      const path = e.composedPath();
      const wrapper = path.find((el) => el.classList && el.classList.contains('mermaid-wrapper'));
      if (!wrapper || !e.ctrlKey) return;

      e.preventDefault();
      const mermaidBlock = wrapper.querySelector('.mermaid');
      if (!mermaidBlock) return;

      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9; // Smooth multiplicative scaling

      const zoomOld = parseFloat(mermaidBlock.getAttribute('data-zoom')) || 1.0;
      const txOld = parseFloat(mermaidBlock.getAttribute('data-tx')) || 0;
      const tyOld = parseFloat(mermaidBlock.getAttribute('data-ty')) || 0;

      // Exact mouse location relative to the container bounds, not the transformed diagram!
      const rect = wrapper.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      let zoomNew = zoomOld * zoomFactor;
      zoomNew = Math.min(5.0, Math.max(0.2, zoomNew));

      const txNew = cx - (cx - txOld) * (zoomNew / zoomOld);
      const tyNew = cy - (cy - tyOld) * (zoomNew / zoomOld);

      mermaidBlock.setAttribute('data-zoom', zoomNew);
      mermaidBlock.setAttribute('data-tx', txNew);
      mermaidBlock.setAttribute('data-ty', tyNew);

      mermaidBlock.style.transform = `translate(${txNew}px, ${tyNew}px) scale(${zoomNew})`;

      if (zoomNew > 1.0) {
        mermaidBlock.classList.add('expanded');
        wrapper.classList.add('is-expanded');
      }
    },
    { passive: false },
  );

  // --- Global Drag-to-Pan (Transform Based) ---
  let isDragging = false;
  let dragStartPos = { tx: 0, ty: 0, x: 0, y: 0 };
  let draggedBlock = null;

  document.body.addEventListener('mousedown', function (e) {
    const actualTarget = e.composedPath()[0];
    const wrapper = actualTarget.closest('.mermaid-wrapper');
    if (!wrapper) return;

    const mermaidBlock = wrapper.querySelector('.mermaid');
    if (!mermaidBlock) return;

    // --- RESTRICTION: Only drag if expanded ---
    if (!mermaidBlock.classList.contains('expanded') && !wrapper.classList.contains('fullscreen'))
      return;

    // Ignore controls
    if (actualTarget.closest('.mermaid-btn') || actualTarget.closest('.mermaid-uncollapse')) return;

    isDragging = true;
    draggedBlock = mermaidBlock;
    mermaidBlock.style.transition = 'none';
    mermaidBlock.style.cursor = 'grabbing';

    dragStartPos = {
      tx: parseFloat(mermaidBlock.getAttribute('data-tx')) || 0,
      ty: parseFloat(mermaidBlock.getAttribute('data-ty')) || 0,
      x: e.clientX,
      y: e.clientY,
    };
  });

  document.body.addEventListener('mousemove', function (e) {
    if (!isDragging || !draggedBlock) return;
    e.preventDefault();

    const dx = e.clientX - dragStartPos.x;
    const dy = e.clientY - dragStartPos.y;

    const newTx = dragStartPos.tx + dx;
    const newTy = dragStartPos.ty + dy;

    draggedBlock.setAttribute('data-tx', newTx);
    draggedBlock.setAttribute('data-ty', newTy);

    const zoom = parseFloat(draggedBlock.getAttribute('data-zoom')) || 1.0;
    draggedBlock.style.transform = `translate(${newTx}px, ${newTy}px) scale(${zoom})`;
  });

  const stopDrag = function () {
    if (isDragging && draggedBlock) {
      isDragging = false;
      draggedBlock.style.transition = 'transform 0.15s ease-out';
      draggedBlock.style.removeProperty('cursor');
      draggedBlock = null;
    }
  };

  document.body.addEventListener('mouseup', stopDrag);
  document.body.addEventListener('mouseleave', stopDrag);

  // --- Resource Contact Card (<dialog closedby="any">) ----------------------
  const lang = (document.documentElement.lang || 'fr').slice(0, 2) === 'en' ? 'en' : 'fr';
  const CARD_I18N = {
    fr: {
      close: 'Fermer',
      officialSite: 'Accéder au site officiel ↗',
      call: 'Appeler le',
      viewInDirectory: "Voir dans l'annuaire",
      socials: 'Réseaux sociaux',
      sources: 'Articles de presse & sources',
      stores: 'Applications',
    },
    en: {
      close: 'Close',
      officialSite: 'Open official website ↗',
      call: 'Call',
      viewInDirectory: 'View in directory',
      socials: 'Social media',
      sources: 'Press articles & sources',
      stores: 'Apps',
    },
  }[lang];

  const CARD_STORES = { android: 'Google Play', fdroid: 'F-Droid', ios: 'App Store' };
  const CARD_SOCIALS = {
    bluesky: 'Bluesky',
    mastodon: 'Mastodon',
    x: 'X (Twitter)',
    instagram: 'Instagram',
    facebook: 'Facebook',
    tiktok: 'TikTok',
    youtube: 'YouTube',
    peertube: 'PeerTube',
    linkedin: 'LinkedIn',
    github: 'GitHub',
  };

  let registryPromise = null;
  function loadRegistry() {
    if (!registryPromise) {
      registryPromise = fetch(EXTRA_RESOURCES_URL).then((r) => {
        if (!r.ok) throw new Error(r.statusText);
        return r.json();
      });
    }
    return registryPromise;
  }

  function cardEl(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === undefined || v === null || v === false) continue;
      if (k === 'class') node.className = v;
      else node.setAttribute(k, v === true ? '' : v);
    }
    node.append(...children.filter((c) => c !== null && c !== undefined && c !== ''));
    return node;
  }

  let contactDialog = null;
  function ensureContactDialog() {
    if (contactDialog) return contactDialog;
    contactDialog = cardEl('dialog', {
      class: 'contact-card',
      closedby: 'any',
      'aria-labelledby': 'contact-card-title',
    });
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      contactDialog.addEventListener('click', (event) => {
        if (event.target !== contactDialog) return;
        const rect = contactDialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        contactDialog.close();
      });
    }
    document.body.appendChild(contactDialog);
    return contactDialog;
  }

  function openContactCard(r, categories, checkLevels) {
    const loc = (obj) => (obj && (obj[lang] || obj.fr)) || '';
    const dialog = ensureContactDialog();
    const annuaireUrl = new URL(lang === 'en' ? 'en/annuaire/' : 'annuaire/', EXTRA_SITE_ROOT_URL)
      .href;
    const onDirectoryPage = Boolean(document.querySelector('[data-resource-directory]'));

    const socialKeys = r.socials ? Object.keys(CARD_SOCIALS).filter((k) => r.socials[k]) : [];
    const storeKeys = r.stores ? Object.keys(CARD_STORES).filter((k) => r.stores[k]) : [];

    // Optional sections are null when absent: drop them, or the DOM would print "null".
    const sections = [
      cardEl(
        'div',
        { class: 'contact-card__header' },
        cardEl('span', { class: 'directory__badge' }, loc(categories[r.category])),
        cardEl(
          'form',
          { method: 'dialog', class: 'contact-card__close-form' },
          cardEl(
            'button',
            {
              type: 'submit',
              value: 'close',
              class: 'contact-card__close',
              autofocus: true,
              'aria-label': CARD_I18N.close,
              title: CARD_I18N.close,
            },
            '×',
          ),
        ),
      ),
      cardEl('h2', { id: 'contact-card-title', class: 'contact-card__title' }, r.name),
      r.check?.result === 'unconfirmed'
        ? cardEl(
            'p',
            { class: 'directory__unconfirmed', title: r.check.note },
            `⚠ ${checkLevels.unconfirmed[lang]}${r.check.note ? ` — ${r.check.note}` : ''}`,
          )
        : null,
      cardEl('p', { class: 'contact-card__desc' }, loc(r.description)),
      cardEl(
        'div',
        { class: 'contact-card__actions' },
        cardEl(
          'a',
          {
            class: 'contact-card__btn contact-card__btn--primary',
            href: r.url,
            target: '_blank',
            rel: 'noopener',
          },
          `🌐 ${CARD_I18N.officialSite}`,
        ),
        r.phone
          ? cardEl(
              'a',
              {
                class: 'contact-card__btn contact-card__btn--phone',
                href: `tel:${r.phone.replace(/\s/g, '')}`,
              },
              `📞 ${CARD_I18N.call} ${r.phone}`,
            )
          : null,
        !onDirectoryPage
          ? cardEl(
              'a',
              {
                class: 'contact-card__btn',
                href: `${annuaireUrl}#${r.id}`,
              },
              `🔍 ${CARD_I18N.viewInDirectory}`,
            )
          : null,
      ),
      socialKeys.length
        ? cardEl(
            'div',
            { class: 'contact-card__section' },
            cardEl('h3', { class: 'contact-card__heading' }, `💬 ${CARD_I18N.socials}`),
            cardEl(
              'div',
              { class: 'contact-card__chips' },
              ...socialKeys.map((k) =>
                cardEl(
                  'a',
                  {
                    class: 'contact-card__chip',
                    href: r.socials[k],
                    target: '_blank',
                    rel: 'noopener',
                  },
                  `${CARD_SOCIALS[k]} ↗`,
                ),
              ),
            ),
          )
        : null,
      storeKeys.length
        ? cardEl(
            'div',
            { class: 'contact-card__section' },
            cardEl('h3', { class: 'contact-card__heading' }, `📲 ${CARD_I18N.stores}`),
            cardEl(
              'div',
              { class: 'contact-card__chips' },
              ...storeKeys.map((k) =>
                cardEl(
                  'a',
                  {
                    class: 'contact-card__chip',
                    href: r.stores[k],
                    target: '_blank',
                    rel: 'noopener',
                  },
                  `${CARD_STORES[k]} ↗`,
                ),
              ),
            ),
          )
        : null,
      r.sources?.length
        ? cardEl(
            'div',
            { class: 'contact-card__section' },
            cardEl('h3', { class: 'contact-card__heading' }, `📰 ${CARD_I18N.sources}`),
            cardEl(
              'ul',
              { class: 'contact-card__sources' },
              ...r.sources.map((src) =>
                cardEl(
                  'li',
                  {},
                  cardEl(
                    'a',
                    { href: src.url, target: '_blank', rel: 'noopener' },
                    `${src.title} ↗`,
                  ),
                ),
              ),
            ),
          )
        : null,
      r.check
        ? cardEl(
            'p',
            { class: 'contact-card__checked' },
            ...window.apCheck.line(checkLevels, r.check, lang),
          )
        : null,
    ];
    dialog.replaceChildren(...sections.filter(Boolean));

    dialog.showModal();
  }

  document.body.addEventListener('click', async function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    const trigger = e.target.closest('[data-resource-card]');
    if (!trigger) return;
    const resourceId = trigger.getAttribute('data-resource-card');
    if (!resourceId) return;

    e.preventDefault();
    try {
      const [data, checkLevels] = await Promise.all([loadRegistry(), window.apCheck.load()]);
      const resource = (data.resources || []).find((r) => r.id === resourceId);
      if (!resource) {
        if (trigger.href) window.open(trigger.href, '_blank', 'noopener');
        return;
      }
      openContactCard(resource, data.categories || {}, checkLevels);
    } catch {
      if (trigger.href) window.open(trigger.href, '_blank', 'noopener');
    }
  });
});

/*
  Timeline filters (overrides/partials/history-timeline.html). Without JavaScript the filter block
  stays hidden and every event is visible. With it: a "Filter" button (with the number of active
  values) opens a panel of chips in up to three groups (theme, nature, who it concerns). A panel with
  many chips starts closed, a small one stays open. Active values are listed under the bar, each one
  removable. Inside a group an event matches ANY selected value; between groups it must match EVERY
  group used. Each chip shows how many events it would give with the other groups' selection and is
  disabled at zero. The selection is kept in the URL (#kind=a,b&nature=c&actor=d) so a filtered view
  can be shared; only the first timeline of a page reads or writes the hash.
*/
document.addEventListener('DOMContentLoaded', function () {
  const GROUPS = [
    { attr: 'data-kind', key: 'kind', data: 'data-kinds' },
    { attr: 'data-nature', key: 'nature', data: 'data-natures' },
    { attr: 'data-actor', key: 'actor', data: 'data-actors' },
  ];
  const fr = document.documentElement.lang !== 'en';
  // A panel with more chips than this starts closed behind the "Filter" button.
  const COLLAPSE_ABOVE = 8;
  const plural = (n, one, many) => (n > 1 ? many : one);

  const readHash = () => {
    const out = { kind: [], nature: [], actor: [] };
    if (
      !/^#(kind|nature|actor)=[a-z0-9,-]*(&(kind|nature|actor)=[a-z0-9,-]*){0,2}$/.test(
        location.hash,
      )
    )
      return out;
    new URLSearchParams(location.hash.slice(1)).forEach((value, key) => {
      if (key in out) out[key] = value.split(',').filter(Boolean);
    });
    return out;
  };
  const writeHash = (selected) => {
    const parts = GROUPS.filter((g) => selected[g.key].length).map(
      (g) => `${g.key}=${selected[g.key].join(',')}`,
    );
    history.replaceState(
      null,
      '',
      location.pathname + location.search + (parts.length ? `#${parts.join('&')}` : ''),
    );
  };

  document.querySelectorAll('[data-timeline-filters]').forEach((filters, index) => {
    const list = filters.parentElement.querySelector('ol.timeline');
    if (!list) return;
    const q = (selector) => filters.querySelector(selector);
    const toggle = q('[data-filters-toggle]');
    const badge = q('[data-filters-badge]');
    const clear = q('[data-filters-clear]');
    const count = q('[data-filters-count]');
    const summary = q('[data-filters-summary]');
    const panel = q('[data-filters-panel]');
    const apply = q('[data-filters-apply]');
    const applyN = q('[data-filters-n]');

    const items = [...list.querySelectorAll(':scope > li:not(.timeline__period)')];
    items.forEach((li) => {
      li.filterValues = {};
      GROUPS.forEach((g) => {
        li.filterValues[g.key] = (li.getAttribute(g.data) || '').split(' ').filter(Boolean);
      });
    });

    const chips = {};
    const selected = {};
    const fromHash = index === 0 ? readHash() : { kind: [], nature: [], actor: [] };
    GROUPS.forEach((g) => {
      chips[g.key] = [...panel.querySelectorAll(`[${g.attr}]`)];
      chips[g.key].forEach((chip) => {
        chip.dataset.label = chip.textContent.trim();
        const n = document.createElement('span');
        n.className = 'timeline-filters__n';
        chip.append(n);
      });
      const known = chips[g.key].map((c) => c.getAttribute(g.attr));
      selected[g.key] = fromHash[g.key].filter((k) => known.includes(k));
    });
    const chipTotal = GROUPS.reduce((sum, g) => sum + chips[g.key].length, 0);
    const collapsible = chipTotal > COLLAPSE_ABOVE;

    const panelId = `timeline-filters-panel-${index}`;
    panel.id = panelId;
    toggle.setAttribute('aria-controls', panelId);
    toggle.hidden = !collapsible;
    apply.hidden = !collapsible;
    panel.hidden = collapsible;
    toggle.setAttribute('aria-expanded', String(!collapsible));
    filters.hidden = false;

    const total = () => GROUPS.reduce((sum, g) => sum + selected[g.key].length, 0);
    // Does the event match the selection of every group but `skip` (used for the chip counts)?
    const matches = (li, skip) =>
      GROUPS.every(
        (g) =>
          g.key === skip ||
          !selected[g.key].length ||
          li.filterValues[g.key].some((v) => selected[g.key].includes(v)),
      );

    const renderSummary = () => {
      summary.replaceChildren();
      GROUPS.forEach((g) =>
        selected[g.key].forEach((value) => {
          const chip = chips[g.key].find((c) => c.getAttribute(g.attr) === value);
          const li = document.createElement('li');
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'timeline-filters__tag';
          button.dataset.remove = `${g.key}:${value}`;
          button.setAttribute(
            'aria-label',
            `${fr ? 'Retirer le filtre' : 'Remove filter'} : ${chip.dataset.label}`,
          );
          button.textContent = `${chip.dataset.label} ×`;
          li.append(button);
          summary.append(li);
        }),
      );
      // The summary only matters while the panel is closed: open, the pressed chips say it all.
      summary.hidden = !total() || !panel.hidden;
    };

    const update = () => {
      let heading = null;
      let headingHasMatch = false;
      let shown = 0;
      const closeHeading = () => {
        if (heading) heading.hidden = !headingHasMatch;
      };
      list.querySelectorAll(':scope > li').forEach((li) => {
        if (li.classList.contains('timeline__group')) return;
        if (li.classList.contains('timeline__period')) {
          closeHeading();
          heading = li;
          headingHasMatch = false;
          return;
        }
        const match = matches(li, null);
        li.hidden = !match;
        if (match) {
          headingHasMatch = true;
          shown += 1;
        }
      });
      closeHeading();

      GROUPS.forEach((g) =>
        chips[g.key].forEach((chip) => {
          const value = chip.getAttribute(g.attr);
          const on = selected[g.key].includes(value);
          const n = items.filter(
            (li) => matches(li, g.key) && li.filterValues[g.key].includes(value),
          ).length;
          chip.setAttribute('aria-pressed', String(on));
          chip.disabled = n === 0 && !on;
          chip.querySelector('.timeline-filters__n').textContent = String(n);
          chip.setAttribute(
            'aria-label',
            `${chip.dataset.label}, ${n} ${fr ? plural(n, 'événement', 'événements') : plural(n, 'event', 'events')}`,
          );
        }),
      );

      const active = total();
      list.classList.toggle('timeline--filtering', active > 0);
      badge.hidden = !active;
      badge.textContent = String(active);
      toggle.setAttribute(
        'aria-label',
        active
          ? fr
            ? `Filtrer, ${active} filtre${active > 1 ? 's' : ''} actif${active > 1 ? 's' : ''}`
            : `Filter, ${active} active filter${active > 1 ? 's' : ''}`
          : fr
            ? 'Filtrer'
            : 'Filter',
      );
      clear.hidden = !active;
      count.textContent = active
        ? fr
          ? `${shown} événement${shown > 1 ? 's' : ''} sur ${items.length}`
          : `${shown} of ${items.length} events`
        : '';
      applyN.textContent = String(active ? shown : items.length);
      renderSummary();
    };

    const setSelection = (key, value) => {
      selected[key] = selected[key].includes(value)
        ? selected[key].filter((k) => k !== value)
        : [...selected[key], value];
    };
    const persist = () => {
      if (index === 0 && /^(#(kind|nature|actor)=.*)?$/.test(location.hash)) writeHash(selected);
    };
    const setOpen = (open) => {
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      renderSummary();
    };

    toggle.addEventListener('click', () => setOpen(panel.hidden));
    apply.addEventListener('click', () => {
      setOpen(false);
      toggle.focus();
      filters.scrollIntoView({ block: 'start' });
    });
    clear.addEventListener('click', () => {
      GROUPS.forEach((g) => (selected[g.key] = []));
      update();
      persist();
    });
    panel.addEventListener('click', (e) => {
      const chip = e.target.closest('button[data-kind], button[data-nature], button[data-actor]');
      if (!chip) return;
      const g = GROUPS.find((x) => chip.hasAttribute(x.attr));
      setSelection(g.key, chip.getAttribute(g.attr));
      update();
      persist();
    });
    summary.addEventListener('click', (e) => {
      const tag = e.target.closest('[data-remove]');
      if (!tag) return;
      const [key, value] = tag.dataset.remove.split(':');
      setSelection(key, value);
      update();
      persist();
      (summary.querySelector('button') || toggle).focus();
    });
    filters.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && collapsible && !panel.hidden) {
        setOpen(false);
        toggle.focus();
      }
    });

    update();
  });
});

/*
  Timeline groups (overrides/partials/history-timeline.html). On the full timeline the major events keep
  their dot and their card; the other events between two major ones (inside one period) are folded into a
  group. A group is one row on the spine: its node (two chevrons) and a label open and close it. Without
  JavaScript nothing is folded. While a filter is active every matching event stays visible, and a link to
  an event (#evt-...) opens the group it belongs to.
*/
document.addEventListener('DOMContentLoaded', function () {
  const fr = document.documentElement.lang !== 'en';
  const MIN_EVENTS = 40; // a short timeline is shown whole
  const MIN_GROUP = 2; // a lone minor event stays visible rather than hide behind a row

  // Two stacked chevrons: pointing away from each other = unfold, toward each other = fold.
  const foldIcon = (kind) => {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.setAttribute('class', `timeline__fold-icon timeline__fold-icon--${kind}`);
    const path = document.createElementNS(ns, 'path');
    path.setAttribute(
      'd',
      kind === 'more'
        ? 'M12 5.83 15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z'
        : 'M7.41 18.59 8.83 20 12 16.83 15.17 20l1.41-1.41L12 15 7.41 18.59zm9.18-13.18L15.17 4 12 7.17 8.83 4 7.41 5.41 12 10l4.59-4.59z',
    );
    svg.append(path);
    return svg;
  };
  const yearOf = (li) => (li.querySelector('time')?.getAttribute('datetime') || '').slice(0, 4);
  const mainKinds = (items) => {
    const counts = new Map();
    items.forEach((li) => {
      const name = (li.querySelector('.timeline__kind')?.textContent || '').split(' · ')[0].trim();
      if (name) counts.set(name, (counts.get(name) || 0) + 1);
    });
    return [...counts.entries()].sort((x, y) => y[1] - x[1]);
  };

  document.querySelectorAll('ol.timeline[data-timeline-detail]').forEach((list) => {
    const events = [...list.querySelectorAll(':scope > li.timeline__event')];
    if (events.length < MIN_EVENTS || !events.some((li) => li.hasAttribute('data-major'))) return;
    list.classList.add('timeline--foldable');

    // Runs of minor events, cut by a major event, by a period heading or by a change of century.
    const runs = [];
    let run = [];
    const flush = () => {
      if (run.length >= MIN_GROUP) runs.push(run);
      run = [];
    };
    const centuryOf = (li) => Math.floor(Number(yearOf(li)) / 100);
    [...list.children].forEach((li) => {
      if (li.classList.contains('timeline__event') && !li.hasAttribute('data-major')) {
        if (run.length && centuryOf(run[0]) !== centuryOf(li)) flush();
        run.push(li);
      } else flush();
    });
    flush();

    const groups = runs.map((items) => {
      const n = items.length;
      const noun = fr ? `événement${n > 1 ? 's' : ''}` : `event${n > 1 ? 's' : ''}`;
      const first = yearOf(items[0]);
      const last = yearOf(items[n - 1]);
      const row = document.createElement('li');
      row.className = 'timeline__group';
      const date = document.createElement('span');
      date.className = 'timeline__date';
      date.textContent = first === last ? first : `${first} – ${last}`;
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'timeline__group-toggle';
      const node = document.createElement('span');
      node.className = 'timeline__group-node';
      node.append(foldIcon('more'), foldIcon('less'));
      const text = document.createElement('span');
      text.className = 'timeline__group-text';
      const label = document.createElement('span');
      label.className = 'timeline__group-label';
      const kinds = mainKinds(items)
        .slice(0, 3)
        .map(([name, c]) => `${name} (${c})`);
      const themes = document.createElement('span');
      themes.className = 'timeline__kind';
      themes.textContent = kinds.join(' · ');
      text.append(label, themes);
      toggle.append(node, text);
      row.append(date, toggle);
      items[0].before(row);
      const group = { row, items, toggle, label, n, noun };
      toggle.addEventListener('click', () =>
        setFolded(group, toggle.getAttribute('aria-expanded') === 'true'),
      );
      return group;
    });

    function setFolded(group, folded) {
      group.items.forEach((li) => li.classList.toggle('timeline__event--folded', folded));
      group.toggle.setAttribute('aria-expanded', String(!folded));
      group.row.classList.toggle('timeline__group--open', !folded);
      group.label.textContent = folded
        ? fr
          ? `${group.n} autres ${group.noun}`
          : `${group.n} other ${group.noun}`
        : fr
          ? `Replier les ${group.n} ${group.noun}`
          : `Fold the ${group.n} ${group.noun}`;
    }
    groups.forEach((group) => setFolded(group, true));

    // A link to an event opens the group it belongs to.
    const revealForHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!id) return;
      const target = document.getElementById(id);
      if (!target || !list.contains(target)) return;
      const group = groups.find((g) => g.items.includes(target));
      if (!group || group.toggle.getAttribute('aria-expanded') === 'true') return;
      setFolded(group, false);
      target.scrollIntoView({ block: 'start' });
    };
    revealForHash();
    window.addEventListener('hashchange', revealForHash);
  });
});

/*
  Timeline cards (overrides/partials/history-timeline.html): once this script has run, a card keeps
  a short text (CSS folds it to three lines, or the summary when there is one) and gets a
  "Details and sources" button. The button opens one shared <dialog> with the full text, the links,
  the sources and the verification line of the event. Without JavaScript, everything stays on the page.
*/
document.addEventListener('DOMContentLoaded', function () {
  const lists = document.querySelectorAll('ol.timeline[data-timeline-detail]');
  if (!lists.length || typeof HTMLDialogElement === 'undefined') return;
  const fr = document.documentElement.lang !== 'en';
  const label = fr ? 'Détail et sources' : 'Details and sources';

  const dialog = document.createElement('dialog');
  dialog.className = 'timeline-dialog';
  const inner = document.createElement('div');
  inner.className = 'timeline-dialog__inner';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'timeline-dialog__close';
  close.setAttribute('aria-label', fr ? 'Fermer' : 'Close');
  close.textContent = '×';
  const content = document.createElement('div');
  content.className = 'timeline-dialog__content';
  inner.append(close, content);
  dialog.append(inner);
  document.body.append(dialog);

  let opener = null;

  // Cuts a long description into short paragraphs (about three sentences each), without
  // splitting after an abbreviation such as "M." or "art.".
  function paragraphs(text) {
    const sentences = [];
    const re = /([.!?…»])\s+(?=[A-ZÀÂÄÉÈÊËÎÏÔÖÛÜÇ«“"(])/g;
    let start = 0;
    let m;
    while ((m = re.exec(text))) {
      const end = m.index + 1;
      const last = text.slice(start, end).trim().split(/\s+/).pop();
      if (/^(?:M|Mme|MM|Mmes|Dr|St|Ste|art|al|n|p|vs|cf|env)\.$/i.test(last)) continue;
      sentences.push(text.slice(start, end).trim());
      start = m.index + m[0].length;
    }
    sentences.push(text.slice(start).trim());
    const out = [];
    let cur = '';
    sentences.forEach((s) => {
      if (cur && cur.length + s.length + 1 > 440) {
        out.push(cur);
        cur = s;
      } else cur = cur ? `${cur} ${s}` : s;
    });
    if (cur) out.push(cur);
    return out;
  }

  // The sources of the card (one inline paragraph) become a titled list in the dialog.
  function sourcesSection(li) {
    const node = li.querySelector('.timeline__sources');
    const links = node ? [...node.querySelectorAll('a')] : [];
    if (!links.length) return null;
    const section = document.createElement('section');
    section.className = 'timeline-dialog__sources';
    const h = document.createElement('h3');
    h.textContent = fr ? 'Sources' : 'Sources';
    const ul = document.createElement('ul');
    links.forEach((a) => {
      const item = document.createElement('li');
      item.append(a.cloneNode(true));
      ul.append(item);
    });
    section.append(h, ul);
    return section;
  }
  const clone = (root, selector) => {
    const node = root.querySelector(selector);
    return node ? node.cloneNode(true) : null;
  };

  function open(li, trigger) {
    opener = trigger;
    const title = li.querySelector('.timeline__title');
    const heading = document.createElement('h2');
    heading.className = 'timeline__title';
    heading.id = 'timeline-dialog-title';
    heading.append(...[...title.childNodes].map((n) => n.cloneNode(true)));
    dialog.setAttribute('aria-labelledby', heading.id);
    const full = li.querySelector('.timeline__full p') || li.querySelector('.timeline__desc');
    const text = document.createDocumentFragment();
    paragraphs(full.textContent.trim()).forEach((chunk) => {
      const p = document.createElement('p');
      p.textContent = chunk;
      text.append(p);
    });
    content.replaceChildren(
      ...[
        clone(li, '.timeline__date'),
        clone(li, '.timeline__kind'),
        clone(li, '.timeline__nature'),
        clone(li, '.timeline__actor'),
        heading,
        text,
        clone(li, '.timeline__gains'),
        clone(li, '.timeline__links'),
        sourcesSection(li),
        clone(li, '.directory__unconfirmed'),
        clone(li, '.victims__checked'),
      ].filter(Boolean),
    );
    dialog.showModal();
    dialog.scrollTop = 0;
  }

  lists.forEach((list) => {
    list.classList.add('timeline--enhanced');
    list.querySelectorAll(':scope > li.timeline__event').forEach((li) => {
      const desc = li.querySelector('.timeline__desc');
      if (!desc || !li.querySelector('.timeline__title')) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'timeline__open';
      button.textContent = label;
      button.setAttribute('aria-haspopup', 'dialog');
      const name = li.querySelector('.timeline__title a');
      if (name) button.setAttribute('aria-label', `${label} : ${name.textContent.trim()}`);
      button.addEventListener('click', () => open(li, button));
      (li.querySelector('.timeline__full') || desc).after(button);
    });
  });

  close.addEventListener('click', () => dialog.close());
  // A click on the backdrop (outside the inner box) closes the dialog; a link to another event
  // on the page closes it too, so the jump is visible.
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
    const link = e.target.closest('a[href^="#"]');
    if (link) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (opener) opener.focus();
  });
});

/*
  Site search → guided search: a result pointing to the parcours page itself (not to a profile)
  carries the typed words, so docs/javascripts/parcours.js can prefill its picker with them.
*/
document.addEventListener(
  'click',
  function (e) {
    const link = e.target.closest('.md-search-result a[href]');
    if (!link) return;
    const url = new URL(link.href, window.location.href);
    if (!/\/parcours\/$/.test(url.pathname) || url.hash) return;
    const query = document.querySelector('.md-search__input')?.value.trim();
    if (!query) return;
    url.searchParams.delete('h');
    url.searchParams.set('q', query);
    link.href = url.toString();
  },
  true,
);

/*
  Share links ("Pourquoi nous rejoindre ?", persuasion guide): shows the full, readable address of
  each short link (hooks/short_links.py) and adds "copy the message" / "share" buttons. Without
  JavaScript the short link still works.
*/
document.addEventListener('DOMContentLoaded', function () {
  const fr = document.documentElement.lang !== 'en';
  const L = fr
    ? { copy: 'Copier le message', copied: 'Copié !', share: 'Partager…' }
    : { copy: 'Copy the message', copied: 'Copied!', share: 'Share…' };
  const absolute = (link) => new URL(link.getAttribute('href'), window.location.href).href;
  const showAddress = (link) => (link.textContent = absolute(link).replace(/^https?:\/\//, ''));

  document.querySelectorAll('[data-share]').forEach((box) => {
    const link = box.querySelector('a.rallier__short');
    if (!link) return;
    showAddress(link);
    // Read at click time: the picker below can change the link.
    const message = () => box.getAttribute('data-message');

    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'rallier__share-btn';
    copy.textContent = L.copy;
    copy.addEventListener('click', () => {
      navigator.clipboard?.writeText(`${message()} ${absolute(link)}`).then(() => {
        copy.textContent = L.copied;
        setTimeout(() => (copy.textContent = L.copy), 1500);
      });
    });
    box.append(' ', copy);

    if (navigator.share) {
      const share = document.createElement('button');
      share.type = 'button';
      share.className = 'rallier__share-btn';
      share.textContent = L.share;
      share.addEventListener('click', () =>
        navigator.share({ text: message(), url: absolute(link) }).catch(() => {}),
      );
      box.append(' ', share);
    }
  });

  /*
    "Envoyer à un·e [profil]" picker: while nobody touches it, it cycles through the profiles
    (not with prefers-reduced-motion); choosing one stops it and updates the link below.
  */
  document.querySelectorAll('[data-share-picker]').forEach((picker) => {
    const select = picker.querySelector('select');
    const link = picker.querySelector('a.rallier__short');
    if (!select || !link) return;
    const update = () => {
      link.setAttribute('href', select.selectedOptions[0].getAttribute('data-href'));
      showAddress(link);
    };
    let timer = null;
    const stop = () => clearInterval(timer);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timer = setInterval(() => {
        if (!select.isConnected) return stop();
        select.selectedIndex = (select.selectedIndex + 1) % select.options.length;
        update();
      }, 2500);
    }
    for (const evt of ['focus', 'pointerdown', 'change', 'keydown'])
      select.addEventListener(evt, stop);
    picker.addEventListener('click', stop);
    select.addEventListener('change', update);
  });
});

/*
  "Vous êtes [prof…]" on "Pourquoi nous rejoindre ?": cycles through the profile chips like the
  guided search rotator, pauses on hover or focus, and jumps to the profile shown when clicked.
  Does not move with prefers-reduced-motion.
*/
document.addEventListener('DOMContentLoaded', function () {
  const line = document.querySelector('[data-rallier-rotator]');
  const chips = [...document.querySelectorAll('.rallier__pick a.timeline-filters__chip')];
  if (!line || !chips.length) return;
  const link = line.querySelector('a');
  line.hidden = false;
  let i = 0;
  let paused = false;
  const show = () => {
    link.textContent = `${chips[i].textContent.trim()}…`;
    link.setAttribute('href', chips[i].getAttribute('href'));
  };
  for (const evt of ['mouseenter', 'focus']) link.addEventListener(evt, () => (paused = true));
  for (const evt of ['mouseleave', 'blur']) link.addEventListener(evt, () => (paused = false));
  show();
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  setInterval(() => {
    if (paused) return;
    i = (i + 1) % chips.length;
    show();
  }, 2500);
});

// Wide tables in guides (4 columns or more) become stacked cards on small screens:
// each cell gets its column header as a label (styles in extra.css, .table--cards).
document.addEventListener('DOMContentLoaded', function () {
  if (!/\/guides\//.test(window.location.pathname)) return;
  for (const table of document.querySelectorAll('.md-content table')) {
    const headers = [...table.querySelectorAll('thead th')].map((th) => th.textContent.trim());
    if (headers.length < 4) continue;
    table.classList.add('table--cards');
    for (const row of table.querySelectorAll('tbody tr')) {
      [...row.children].forEach((cell, i) => {
        cell.setAttribute('data-label', headers[i] || '');
        if (cell.textContent.trim() === '—') cell.setAttribute('data-empty', '');
      });
    }
  }

  // Open the matching tab when the URL hash points to an element inside a .tabbed-block.
  const activateTabForHash = () => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    const block = target.closest('.tabbed-block');
    const set = block && block.closest('.tabbed-set');
    if (!block || !block.parentElement || !set) return;
    const index = [...block.parentElement.children].indexOf(block);
    const input = set.querySelectorAll(':scope > input[type="radio"]')[index];
    if (input && !input.checked) {
      input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      set.scrollIntoView({ block: 'start' });
    }
  };
  activateTabForHash();
  window.addEventListener('hashchange', activateTabForHash);
});

/*
  Phone navigation (overrides/main.html).
  - The header hamburger opens the site menu; the page's table of contents is the pill (toc-pager.js).
  - The bar's "More" button opens a sheet with the other main pages (a native <dialog>).
  - The bar hides while the on-screen keyboard is up.
*/
document.addEventListener('click', function (e) {
  const sheet = document.querySelector('.ap-more:not(.ap-toc-sheet)');
  if (!sheet) return;
  if (e.target.closest('[data-ap-more-open]')) {
    if (!sheet.open) sheet.showModal();
  } else if (e.target.closest('[data-ap-more-close]') || e.target === sheet) {
    // a tap on the backdrop targets the dialog itself
    sheet.close();
  }
});

if (window.visualViewport) {
  const root = document.documentElement;
  const viewport = window.visualViewport;
  const update = function () {
    // A keyboard shrinks the visual viewport a lot without any zoom; pinch-zoom changes the scale.
    root.classList.toggle(
      'ap-keyboard',
      viewport.scale <= 1.05 && window.innerHeight - viewport.height > 140,
    );
  };
  viewport.addEventListener('resize', update);
}
