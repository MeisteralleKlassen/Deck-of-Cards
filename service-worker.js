const cacheName = "deck-of-cards-v1";
const assets = [
  "/Deck-of-Cards/",
  "/Deck-of-Cards/index.html",
  "/Deck-of-Cards/style.css",
  "/Deck-of-Cards/script.js",
  "/Deck-of-Cards/manifest.json",
  "/Deck-of-Cards/figures/icon-192x192.png",
  "/Deck-of-Cards/figures/icon-512x512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
