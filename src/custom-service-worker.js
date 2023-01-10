const CACHE_NAME = "version-1";

const urls = [
  'index.html',
  'static/js/main.c40bf133.js',
  'static/css/main.3465aa8e.css'
];

self.addEventListener('install', (event) => {
  console.log('Installed');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urls);
      })
  )
});

self.addEventListener('fetch', (event) => {
  // Intercept fetch and check cache for files, if in cache serve them if not fetch from network
});
