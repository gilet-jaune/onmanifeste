/*
  Service worker: makes the whole site available offline.

  - VERSION and PRECACHE are injected at build time by hooks/pwa.py (hash of the built site).
  - Pages and the resources registry: network-first (fresh when online, cached copy offline).
  - Other assets: cache-first from the versioned cache.
  - A new deploy installs in the background and waits; the page offers an "update" button
    (SKIP_WAITING). The "reinstall" button in the page clears every cache and unregisters.
*/
const VERSION = '__PWA_VERSION__';
const PRECACHE = ['__PWA_PRECACHE__'];
const CACHE = `awesome-protest-${VERSION}`;
const NETWORK_FIRST = /(\/|\.html|resources\.json)$/;

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
            .filter((key) => key.startsWith('awesome-protest-') && key !== CACHE)
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

async function networkFirst(request) {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (err) {
    // ignoreSearch: shared directory links (?tags=...) still resolve offline
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    if (request.mode === 'navigate') {
      const home = await cache.match(new URL('./', self.registration.scope));
      if (home) return home;
    }
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

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  const isPage = request.mode === 'navigate' || NETWORK_FIRST.test(url.pathname);
  event.respondWith(isPage ? networkFirst(request) : cacheFirst(request));
});
