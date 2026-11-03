/*
  PWA controls: registers the service worker and fills the footer panel
  ([data-pwa-panel]) with the offline status, an update button and a reinstall button.
*/

// Resolve relative to this script so it works under any base path / language prefix.
const PWA_SW_URL = new URL('../sw.js', document.currentScript.src);

const PWA_I18N = {
  fr: {
    ready: 'Disponible hors ligne',
    installing: 'Préparation du mode hors ligne…',
    unsupported: 'Mode hors ligne non pris en charge par ce navigateur',
    version: 'version',
    check: 'Vérifier les mises à jour',
    checking: 'Vérification…',
    upToDate: 'À jour',
    update: 'Installer la mise à jour',
    reinstall: 'Réinstaller',
    confirm: 'Supprimer la copie hors ligne et tout retélécharger ?',
    bannerText:
      'Ce site reste consultable sans réseau. Installez-le pour l’ouvrir depuis l’écran d’accueil et éviter que le navigateur n’efface la copie hors ligne.',
    bannerReady: 'Copie hors ligne prête.',
    bannerPreparing: 'Préparation de la copie hors ligne…',
    install: 'Installer l’application',
    iosHint: 'Sur iPhone/iPad : bouton Partager, puis « Sur l’écran d’accueil ».',
    genericHint: 'Menu du navigateur, puis « Installer » ou « Ajouter à l’écran d’accueil ».',
    later: 'Plus tard',
    done: 'C’est déjà fait',
    installedMsg: 'Application ajoutée ✓ Vous pouvez l’ouvrir depuis votre écran d’accueil.',
    doneMsg: 'C’est noté ✓ Ce message ne s’affichera plus.',
    close: 'Fermer',
    updateTitle: 'Nouvelle version disponible.',
    updateAvailable:
      'Guides et corrections à jour. La mise à jour ne supprime rien et ne demande aucune réinstallation.',
    updateNow: 'Mettre à jour',
    updatedMsg: 'Mise à jour effectuée ✓ Vous avez la dernière version.',
    statusReady: 'Prêt hors ligne',
    statusReadyDesc: 'Copie hors ligne prête : consultable sans réseau',
    statusOffline: 'Hors ligne actif',
    statusOfflineDesc: 'Mode hors ligne actif : les guides restent disponibles',
    statusPreparing: 'Préparation…',
    statusPreparingDesc: 'Enregistrement de la copie hors ligne…',
    toastReady:
      '✓ Disponible hors ligne : guides et ressources sont enregistrés dans votre navigateur.',
    toastOffline: 'Mode hors ligne actif : vous pouvez naviguer sans connexion.',
  },
  en: {
    ready: 'Available offline',
    installing: 'Preparing offline mode…',
    unsupported: 'Offline mode is not supported by this browser',
    version: 'version',
    check: 'Check for updates',
    checking: 'Checking…',
    upToDate: 'Up to date',
    update: 'Install update',
    reinstall: 'Reinstall',
    confirm: 'Delete the offline copy and download everything again?',
    bannerText:
      'This site works without a network. Install it to open it from your home screen and keep the browser from deleting the offline copy.',
    bannerReady: 'Offline copy ready.',
    bannerPreparing: 'Preparing the offline copy…',
    install: 'Install the app',
    iosHint: 'On iPhone/iPad: Share button, then “Add to Home Screen”.',
    genericHint: 'Browser menu, then “Install” or “Add to Home Screen”.',
    later: 'Later',
    done: 'Already done',
    installedMsg: 'App added ✓ You can open it from your home screen.',
    doneMsg: 'Noted ✓ This message will not appear again.',
    close: 'Close',
    updateTitle: 'New version available.',
    updateAvailable:
      'Up-to-date guides and fixes. Updating deletes nothing and does not require reinstalling.',
    updateNow: 'Update',
    updatedMsg: 'Update done ✓ You have the latest version.',
    statusReady: 'Ready offline',
    statusReadyDesc: 'Offline copy ready: readable without network',
    statusOffline: 'Offline mode',
    statusOfflineDesc: 'Offline mode active: guides remain accessible',
    statusPreparing: 'Preparing…',
    statusPreparingDesc: 'Saving offline copy…',
    toastReady: '✓ Available offline: guides and resources are saved in your browser.',
    toastOffline: 'Offline mode active: you can browse without a connection.',
  },
};

const pwaLang = (document.documentElement.lang || 'fr').slice(0, 2);
const pwaT = PWA_I18N[pwaLang] || PWA_I18N.fr;

function pwaButton(label, onClick) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'pwa-panel__btn';
  btn.textContent = label;
  btn.addEventListener('click', onClick);
  return btn;
}

async function pwaReinstall() {
  if (!window.confirm(pwaT.confirm)) return;
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((r) => r.unregister()));
  const keys = await caches.keys();
  await Promise.all(
    keys.filter((k) => k.startsWith('awesome-protest-')).map((k) => caches.delete(k)),
  );
  // Reload from the network; the fresh page registers and precaches the latest version.
  window.location.reload();
}

const PWA_UPDATED_KEY = 'awesome-protest:updated';
let pwaUpdateShown = false;

// A new version was published and installed in the background: it waits for the go-ahead. Taking
// it over reloads the page once; nothing is deleted and the app is not reinstalled.
function pwaApplyUpdate(registration) {
  try {
    sessionStorage.setItem(PWA_UPDATED_KEY, '1');
  } catch {
    /* no confirmation after the reload */
  }
  registration.waiting?.postMessage('SKIP_WAITING');
}

function pwaShowUpdateBanner(registration) {
  const banner = document.querySelector('[data-pwa-banner]');
  const isEmergencyPage = Boolean(document.querySelector('.sos__numbers'));
  if (!banner || isEmergencyPage || pwaUpdateShown || !registration.waiting) return;
  if (!navigator.serviceWorker.controller) return; // first install, not an update
  pwaUpdateShown = true;
  const text = document.createElement('p');
  text.className = 'pwa-banner__text';
  const status = document.createElement('strong');
  status.className = 'pwa-banner__status';
  status.textContent = pwaT.updateTitle;
  text.append(status, ' ', pwaT.updateAvailable);
  const actions = document.createElement('div');
  actions.className = 'pwa-banner__actions';
  const apply = pwaButton(pwaT.updateNow, () => pwaApplyUpdate(registration));
  apply.classList.add('pwa-banner__install');
  actions.append(
    apply,
    pwaButton(pwaT.later, () => {
      pwaUpdateShown = false;
      pwaHideBanner(false);
    }),
  );
  banner.setAttribute('aria-label', pwaT.updateNow);
  banner.replaceChildren(text, actions);
  banner.hidden = false;
}

function pwaUpdateStatusBadge(registration) {
  const badge = document.querySelector('[data-pwa-status]');
  if (!badge) return;

  const isOnline = navigator.onLine !== false;
  const isReady = Boolean(
    navigator.serviceWorker && (navigator.serviceWorker.controller || registration?.active),
  );

  badge.hidden = false;

  if (!isOnline) {
    badge.className = 'md-header__option pwa-status pwa-status--offline';
    badge.setAttribute('title', pwaT.statusOfflineDesc);
    badge.setAttribute('aria-label', pwaT.statusOfflineDesc);
    const label = badge.querySelector('.pwa-status__label');
    if (label) label.textContent = pwaT.statusOffline;
    return;
  }

  if (isReady) {
    badge.className = 'md-header__option pwa-status pwa-status--ready';
    badge.setAttribute('title', pwaT.statusReadyDesc);
    badge.setAttribute('aria-label', pwaT.statusReadyDesc);
    const label = badge.querySelector('.pwa-status__label');
    if (label) label.textContent = pwaT.statusReady;
  } else {
    badge.className = 'md-header__option pwa-status pwa-status--preparing';
    badge.setAttribute('title', pwaT.statusPreparingDesc);
    badge.setAttribute('aria-label', pwaT.statusPreparingDesc);
    const label = badge.querySelector('.pwa-status__label');
    if (label) label.textContent = pwaT.statusPreparing;
  }
}

function pwaInitStatusBadge(registration) {
  const badge = document.querySelector('[data-pwa-status]');
  if (!badge) return;

  pwaUpdateStatusBadge(registration);

  window.addEventListener('online', () => pwaUpdateStatusBadge(registration));
  window.addEventListener('offline', () => pwaUpdateStatusBadge(registration));

  badge.addEventListener('click', () => {
    const isOnline = navigator.onLine !== false;
    pwaToast(isOnline ? pwaT.toastReady : pwaT.toastOffline);
  });
}

async function pwaInit() {
  const panel = document.querySelector('[data-pwa-panel]');
  const badge = document.querySelector('[data-pwa-status]');
  if (!('serviceWorker' in navigator)) {
    if (panel) panel.textContent = pwaT.unsupported;
    if (badge) badge.hidden = true;
    return;
  }

  // The first takeover (first visit) must not reload the page; later ones are real updates.
  let controlled = Boolean(navigator.serviceWorker.controller);
  const registration = await navigator.serviceWorker.register(PWA_SW_URL);

  pwaInitStatusBadge(registration);

  // A previous "Update" ended in a reload: say that it worked.
  try {
    if (sessionStorage.getItem(PWA_UPDATED_KEY)) {
      sessionStorage.removeItem(PWA_UPDATED_KEY);
      pwaToast(pwaT.updatedMsg);
    }
  } catch {
    /* storage blocked */
  }
  pwaShowUpdateBanner(registration);
  registration.addEventListener('updatefound', () => {
    registration.installing?.addEventListener('statechange', () =>
      pwaShowUpdateBanner(registration),
    );
  });
  // A long-open app never reloads: look for a new version when it comes back to the foreground.
  let lastCheck = Date.now();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible' || Date.now() - lastCheck < 3_600_000) return;
    lastCheck = Date.now();
    registration.update().catch(() => {});
  });

  navigator.serviceWorker.ready.then(() => pwaUpdateStatusBadge(registration));

  if (!panel) return;

  const status = document.createElement('span');
  status.className = 'pwa-panel__status';
  const actions = document.createElement('span');
  actions.className = 'pwa-panel__actions';
  panel.replaceChildren(status, actions);

  const updateBtn = pwaButton(pwaT.update, () => pwaApplyUpdate(registration));
  const checkBtn = pwaButton(pwaT.check, async () => {
    checkBtn.textContent = pwaT.checking;
    await registration.update().catch(() => {});
    if (!registration.installing && !registration.waiting) checkBtn.textContent = pwaT.upToDate;
    setTimeout(() => (checkBtn.textContent = pwaT.check), 2000);
  });
  const reinstallBtn = pwaButton(pwaT.reinstall, pwaReinstall);

  function render() {
    const waiting = Boolean(registration.waiting);
    const active = navigator.serviceWorker.controller || registration.active;
    status.textContent = active ? `✓ ${pwaT.ready}` : pwaT.installing;
    actions.replaceChildren(...(waiting ? [updateBtn] : [checkBtn]), reinstallBtn);
    panel.classList.toggle('has-update', waiting);
    if (active) navigator.serviceWorker.controller?.postMessage('GET_VERSION');
    pwaUpdateStatusBadge(registration);
  }

  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data?.type === 'VERSION')
      status.textContent = `✓ ${pwaT.ready} · ${pwaT.version} ${event.data.version}`;
  });

  registration.addEventListener('updatefound', () => {
    registration.installing?.addEventListener('statechange', render);
  });

  // The new worker took over (after "Install update"): reload once to use the new files.
  let reloading = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!controlled) {
      controlled = true;
      return;
    }
    if (reloading) return;
    reloading = true;
    window.location.reload();
  });

  await navigator.serviceWorker.ready;
  render();
}

// --- Install banner -------------------------------------------------------
// Offline works after the first visit even without installing; installing adds a home-screen
// entry and protects the cache from eviction (e.g. Safari clears non-installed site data after
// 7 days without a visit). The banner says so and offers the right install path per browser.

const PWA_BANNER_KEY = 'awesome-protest:install-banner-dismissed';
const PWA_DONE_KEY = 'awesome-protest:install-done';
const PWA_VIEWS_KEY = 'awesome-protest:page-views';
const PWA_BANNER_SNOOZE_DAYS = 14;
const PWA_BANNER_DELAY_MS = 30_000; // on a first page view, wait before suggesting anything
let pwaInstallPrompt = null;

const pwaIsInstalled = () =>
  window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
const pwaIsIos = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

function pwaBannerSnoozed() {
  try {
    const at = Number(localStorage.getItem(PWA_BANNER_KEY));
    return at && Date.now() - at < PWA_BANNER_SNOOZE_DAYS * 86_400_000;
  } catch {
    return false; // storage blocked: show the banner, it can still be closed for this page
  }
}

// Counts page views in this tab, so the card appears from the second page (or after a delay).
function pwaPageViews() {
  try {
    const views = Number(sessionStorage.getItem(PWA_VIEWS_KEY) || 0) + 1;
    sessionStorage.setItem(PWA_VIEWS_KEY, String(views));
    return views;
  } catch {
    return 1;
  }
}

// The app was added (by our button, the browser's own menu, or "already done"): remember it for
// good, so the card never comes back, and say so instead of just vanishing.
function pwaAlreadyDone() {
  try {
    return localStorage.getItem(PWA_DONE_KEY) === '1';
  } catch {
    return false;
  }
}

function pwaRememberDone() {
  try {
    localStorage.setItem(PWA_DONE_KEY, '1');
  } catch {
    /* per-page only */
  }
}

// A short message in the banner area, closing by itself (confirmations: installed, updated).
function pwaToast(message) {
  const banner = document.querySelector('[data-pwa-banner]');
  if (!banner) return;
  const text = document.createElement('p');
  text.className = 'pwa-banner__text';
  text.setAttribute('role', 'status');
  text.textContent = message;
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'pwa-banner__close';
  close.setAttribute('aria-label', pwaT.close);
  close.textContent = '×';
  close.addEventListener('click', () => pwaHideBanner(false));
  banner.setAttribute('aria-label', message);
  banner.replaceChildren(close, text);
  banner.hidden = false;
  setTimeout(() => pwaHideBanner(false), 8000);
}

function pwaConfirmDone(message) {
  pwaRememberDone();
  pwaToast(message);
}

function pwaHideBanner(snooze) {
  document.querySelectorAll('[data-pwa-banner]').forEach((b) => (b.hidden = true));
  if (!snooze) return;
  try {
    localStorage.setItem(PWA_BANNER_KEY, String(Date.now()));
  } catch {
    /* per-page dismissal only */
  }
}

function pwaRenderBanner() {
  if (pwaUpdateShown) return; // a new version to install comes first
  const banner = document.querySelector('[data-pwa-banner]');
  // Emergency pages (SOS, pocket card) keep the first screen for the numbers.
  const isEmergencyPage = Boolean(document.querySelector('.sos__numbers, [data-parcours]'));
  if (pwaIsInstalled()) pwaRememberDone(); // opened as an app: no card in the browser tab either
  if (
    !banner ||
    isEmergencyPage ||
    pwaIsInstalled() ||
    pwaAlreadyDone() ||
    pwaBannerSnoozed() ||
    !('serviceWorker' in navigator)
  ) {
    if (banner) banner.hidden = true;
    return;
  }

  const status = document.createElement('strong');
  status.className = 'pwa-banner__status';
  status.textContent = navigator.serviceWorker.controller ? pwaT.bannerReady : pwaT.bannerPreparing;
  navigator.serviceWorker.ready.then(() => (status.textContent = pwaT.bannerReady));

  const text = document.createElement('p');
  text.className = 'pwa-banner__text';
  text.append(status, ' ', pwaT.bannerText);

  const actions = document.createElement('div');
  actions.className = 'pwa-banner__actions';
  if (pwaInstallPrompt) {
    const install = pwaButton(pwaT.install, async () => {
      pwaInstallPrompt.prompt();
      const { outcome } = await pwaInstallPrompt.userChoice;
      pwaInstallPrompt = null;
      if (outcome === 'accepted') pwaConfirmDone(pwaT.installedMsg);
      else pwaRenderBanner();
    });
    install.classList.add('pwa-banner__install');
    actions.append(install);
  } else {
    const hint = document.createElement('span');
    hint.className = 'pwa-banner__hint';
    hint.textContent = pwaIsIos() ? pwaT.iosHint : pwaT.genericHint;
    actions.append(hint);
  }
  actions.append(pwaButton(pwaT.done, () => pwaConfirmDone(pwaT.doneMsg)));
  actions.append(pwaButton(pwaT.later, () => pwaHideBanner(true)));

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'pwa-banner__close';
  close.setAttribute('aria-label', pwaT.later);
  close.textContent = '×';
  close.addEventListener('click', () => pwaHideBanner(true));

  banner.setAttribute('aria-label', pwaT.install);
  banner.replaceChildren(close, text, actions);
  banner.hidden = false;
}

// Suggest installing now and then: from the second page view, or after a while on the first one.
function pwaScheduleBanner() {
  if (pwaPageViews() >= 2) pwaRenderBanner();
  else setTimeout(pwaRenderBanner, PWA_BANNER_DELAY_MS);
}

// Chrome / Edge / Android fire this when the app is installable: keep it for our own button.
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  pwaInstallPrompt = event;
  // Only refresh a card that is already shown; don't pop it up earlier than scheduled.
  if (!document.querySelector('[data-pwa-banner]')?.hidden) pwaRenderBanner();
});

window.addEventListener('appinstalled', () => {
  pwaConfirmDone(pwaT.installedMsg);
  navigator.storage?.persist?.();
});

// Print buttons (pocket card): no inline handlers, so the Content-Security-Policy stays strict.
document.addEventListener('click', (event) => {
  if (event.target.closest('[data-action="print"]')) window.print();
});

// A print button under the title of each guide page (not the guides index).
function addGuidePrintButton() {
  if (document.querySelector('.guide-print')) return;
  const h1 = document.querySelector('.md-content__inner h1');
  if (!h1 || !/\/guides\/[^/]+\/?$/.test(location.pathname)) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'md-button pocket__print guide-print';
  button.dataset.action = 'print';
  button.textContent =
    document.documentElement.lang === 'en' ? 'Print this page' : 'Imprimer cette page';
  h1.after(button);
}
addGuidePrintButton();
if (window.document$ && typeof window.document$.subscribe === 'function') {
  window.document$.subscribe(addGuidePrintButton);
}

// Printing: open collapsed blocks so the paper copy has all the text, then restore them.
let printReopened = [];
window.addEventListener('beforeprint', () => {
  printReopened = [...document.querySelectorAll('details:not([open])')];
  printReopened.forEach((el) => el.setAttribute('open', ''));
});
window.addEventListener('afterprint', () => {
  printReopened.forEach((el) => el.removeAttribute('open'));
  printReopened = [];
});

window.addEventListener('load', () => {
  pwaScheduleBanner();
  // Installed apps ask for persistent storage so the offline copy is not evicted.
  if (pwaIsInstalled()) navigator.storage?.persist?.();
  pwaInit().catch((err) => console.error('[pwa]', err));
});
