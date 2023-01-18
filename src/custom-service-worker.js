// Always use 'spotlist-cache-v' format for Cache Name
const CACHE_NAME = "spotlist-cache-v9";

// Add fonts
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json"
]

let CACHE_ASSETS = STATIC_ASSETS.concat(JSON.parse('["/static/css/main.bb03239a.css","/static/js/main.7000985f.js","/static/media/GTUltra-Regular.41205ca9d5907eb1575a.woff","/static/media/GTUltraFine-Ultra.cfa83d6cf4a2315cd1a9.woff","/index.html"]'));

CACHE_ASSETS = new Set(CACHE_ASSETS);

CACHE_ASSETS = Array.from(CACHE_ASSETS);

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
  console.log(`Fetching: ${event.request.url}`)
  event.respondWith((async () => {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await fetch(event.request);

    if (!response || response.status !== 200) {
      return response;
    }

    return response;
  }))
})
