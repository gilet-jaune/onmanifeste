/*
  Service worker: makes the site available offline.

  - VERSION and PRECACHE are injected at build time by hooks/pwa.py (hash of the built site).
  - Core pages (SOS, pocket card, guided search, directory, guides, understand overview) are
    precached on first visit; long reference pages (histoire/, repressions/, victimes/) are
    cached on demand once visited.
  - Project meta pages and build-only data (ONLINE_ONLY, injected by hooks/pwa.py) are never cached.
  - Pages and the resources registry: network-first (fresh when online, cached copy offline).
  - Other assets: cache-first from the versioned cache.
  - A new deploy installs in the background and waits; the page offers an "update" button
    (SKIP_WAITING). The "reinstall" button in the page clears every cache and unregisters.
*/
const VERSION = '__PWA_VERSION__';
const PRECACHE = ['__PWA_PRECACHE__'];
const ONLINE_ONLY = ['__PWA_ONLINE_ONLY__'];
const CACHE = `onproteste-${VERSION}`;
const NETWORK_FIRST = /(\/|\.html|(resources|parcours)\.json)$/;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        cache.addAll(PRECACHE.map((path) => new URL(path, self.registration.scope))),
      ),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith('onproteste-') && key !== CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
  if (event.data === 'GET_VERSION') event.source.postMessage({ type: 'VERSION', version: VERSION });
});

const OFFLINE_PAGE = {
  fr: [
    'Disponible en ligne uniquement',
    'Cette page n’est pas enregistrée pour une lecture hors ligne. Reconnectez-vous pour la consulter.',
    'Retour à l’accueil',
  ],
  en: [
    'Available online only',
    'This page is not saved for offline reading. Reconnect to view it.',
    'Back to home',
  ],
};

function offlineResponse(url) {
  const lang = url.pathname.includes('/en/') ? 'en' : 'fr';
  const [title, text, back] = OFFLINE_PAGE[lang];
  const home = new URL(lang === 'en' ? 'en/' : './', self.registration.scope).href;
  return new Response(
    `<!doctype html><html lang="${lang}"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><body style="font-family:sans-serif;max-width:32rem;margin:3rem auto;padding:0 1rem"><h1>${title}</h1><p>${text}</p><p><a href="${home}">${back}</a></p></body></html>`,
    { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
  );
}

async function networkFirst(request, url) {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (err) {
    // ignoreSearch: shared directory links (?tags=...) still resolve offline
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    if (request.mode === 'navigate') return offlineResponse(url);
    throw err;
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request, { ignoreSearch: true });
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) (await caches.open(CACHE)).put(request, response.clone());
  return response;
}

// Path relative to the scope, without the "en/" language prefix.
function scopedPath(url) {
  const scope = new URL(self.registration.scope).pathname;
  const path = url.pathname.startsWith(scope) ? url.pathname.slice(scope.length) : url.pathname;
  return path.startsWith('en/') ? path.slice(3) : path;
}

// Online only: straight to the network, a short explanation page when offline.
async function onlineOnly(request, url) {
  try {
    return await fetch(request);
  } catch (err) {
    if (request.mode !== 'navigate') throw err;
    return offlineResponse(url);
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (ONLINE_ONLY.some((prefix) => scopedPath(url).startsWith(prefix))) {
    event.respondWith(onlineOnly(request, url));
    return;
  }
  const isPage = request.mode === 'navigate' || NETWORK_FIRST.test(url.pathname);
  event.respondWith(isPage ? networkFirst(request, url) : cacheFirst(request));
});
