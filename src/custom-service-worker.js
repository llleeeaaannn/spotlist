const CACHE_NAME = "version-1";

const urls = [
  'index.html',
  'static/js/main.js',
  'static/css/styles.css'
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
