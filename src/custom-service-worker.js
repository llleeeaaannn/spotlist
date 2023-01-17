// Always use 'spotlist-cache-v' format for Cache Name
const CACHE_NAME = "spotlist-cache-v5";

// Add fonts
const CACHE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json"
]

// Cache assets in CACHE_ASSETS on SW installation
self.addEventListener('install', event => {

  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('SW: Caching Assets');
        cache.addAll(CACHE_ASSETS);
      }
    )
    // .then(() => self.skipWaiting())
  );
});

// Remove old caches on SW activation
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('SW: Deleted old caches');
            caches.delete(cache);
          }
        })
      )
    })
  )
})

// Respond with cached asset if available, otherwise fetch from network
self.addEventListener('fetch', event => {
  console.log('Fetching')
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
})
