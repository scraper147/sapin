/* Caisse Agri-Garden – fonctionnement hors ligne.
   Avec réseau : on prend la dernière version publiée (et on la garde en cache).
   Sans réseau : on sert la version en cache.
   catalogue.json n'est pas pré-chargé : il est publié par l'app Admin (hors paquet de l'app) et mis en cache
   à la première lecture réussie. */
// Préfixe propre à CETTE caisse : plusieurs caisses partagent l'adresse <compte>.github.io,
// il ne faut jamais toucher aux caches des autres.
var PREFIX = 'caisse-agri-garden-';
var CACHE = PREFIX + 'v13';
var FILES = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(FILES.map(function (f) { return fetch(f, { cache: 'no-store' }).then(function (r) { if (r.ok) return c.put(f, r); }); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf(PREFIX) === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(new Promise(function (resolve) {
    var done = false;
    function fromCache() {
      if (done) return; done = true;
      // On ne cherche que dans le cache de cette caisse
      caches.open(CACHE).then(function (c) {
        return c.match(e.request, { ignoreSearch: true }).then(function (r) { return r || c.match('./index.html'); });
      }).then(resolve);
    }
    var timer = setTimeout(fromCache, 3000); // réseau trop lent : on n'attend pas
    fetch(e.request, { cache: 'no-store' }).then(function (res) {
      if (res && res.ok) { var copy = res.clone(), u = new URL(e.request.url); caches.open(CACHE).then(function (c) { c.put(u.origin + u.pathname, copy); }); }
      clearTimeout(timer);
      if (!done) { done = true; resolve(res); }
    }).catch(function () { clearTimeout(timer); fromCache(); });
  }));
});
