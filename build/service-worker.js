const CACHE_NAME = "version-1";

const urlsToCache = [
  'index.html',
  'static/js/main.js',
  'static/css/main.css'
];

// Install SW
self.addEventListener('install', (event) => {
  console.log('HECK TESTING');
  console.log('Installed');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  )
});
