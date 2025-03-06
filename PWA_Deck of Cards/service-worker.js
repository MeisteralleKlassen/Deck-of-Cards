// service-worker.js


self.addEventListener('install', (event) => {
  console.log('Service Worker installiert');
  event.waitUntil(
      caches.open('my-cache').then(async (cache) => {
          try {
              await cache.addAll([
                  '/',
                  '/Deck of Cards/index.html',
                  '/Deck of Cards/styles.css',
                  '/Deck of Cards/script.js',
                  '/Deck of Cards/figures/bg1.png',
              ]);
              console.log('Alle Ressourcen zwischengespeichert.');
          } catch (error) {
              console.error('Caching fehlgeschlagen:', error);
          }
      })
  );
});
  
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Wenn es eine gecachte Antwort gibt, diese verwenden, sonst aus dem Netzwerk laden
      return cachedResponse || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker aktiviert');
});
  