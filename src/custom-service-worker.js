// Always use 'spotlist-cache-v' format for Cache Name
const CACHE_NAME = "spotlist-cache-v1";

const CACHE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json"
]

self.addEventListener('install', event => {
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

// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(response => response || fetch(event.request))
//   );
// })
