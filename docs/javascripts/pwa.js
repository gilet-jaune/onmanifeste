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

async function pwaInit() {
  const panel = document.querySelector('[data-pwa-panel]');
  if (!('serviceWorker' in navigator)) {
    if (panel) panel.textContent = pwaT.unsupported;
    return;
  }

  const registration = await navigator.serviceWorker.register(PWA_SW_URL);
  if (!panel) return;

  const status = document.createElement('span');
  status.className = 'pwa-panel__status';
  const actions = document.createElement('span');
  actions.className = 'pwa-panel__actions';
  panel.replaceChildren(status, actions);

  const updateBtn = pwaButton(pwaT.update, () => {
    registration.waiting?.postMessage('SKIP_WAITING');
  });
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
const PWA_BANNER_SNOOZE_DAYS = 30;
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
  const banner = document.querySelector('[data-pwa-banner]');
  // Emergency pages (SOS, pocket card) keep the first screen for the numbers.
  const isEmergencyPage = Boolean(document.querySelector('.sos__numbers'));
  if (
    !banner ||
    isEmergencyPage ||
    pwaIsInstalled() ||
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
      if (outcome === 'accepted') pwaHideBanner(false);
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
  actions.append(pwaButton(pwaT.later, () => pwaHideBanner(true)));

  banner.replaceChildren(text, actions);
  banner.hidden = false;
}

// Chrome / Edge / Android fire this when the app is installable: keep it for our own button.
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  pwaInstallPrompt = event;
  pwaRenderBanner();
});

window.addEventListener('appinstalled', () => {
  pwaHideBanner(false);
  navigator.storage?.persist?.();
});

// Print buttons (pocket card): no inline handlers, so the Content-Security-Policy stays strict.
document.addEventListener('click', (event) => {
  if (event.target.closest('[data-action="print"]')) window.print();
});

window.addEventListener('load', () => {
  pwaRenderBanner();
  // Installed apps ask for persistent storage so the offline copy is not evicted.
  if (pwaIsInstalled()) navigator.storage?.persist?.();
  pwaInit().catch((err) => console.error('[pwa]', err));
});
