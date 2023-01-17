const CACHE_NAME = "cache-v1";

const CACHE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json"
]

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(CACHE_ASSETS);
      }
    )
    // .then(() => self.skipWaiting())
  );
});
