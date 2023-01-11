const CACHE_NAME = "version-1";

const urls = [
  'index.html',
  'static/js/main.dc762096.js',
  'static/css/main.09b63fcd.css'
  '/static/media/GTUltra-Regular.41205ca9d5907eb1575a.woff'
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
