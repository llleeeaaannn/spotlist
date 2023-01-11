const CACHE_NAME = "version-1";

const urls = [
  'index.html',
  'static/js/main.dc762096.js',
  'static/css/main.09b63fcd.css'
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

const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  return fetch(request);
};

self.addEventListener('fetch', (event) => {
  console.log('Intercepted FETCH');
  event.respondWith(cacheFirst(event.request));
});

// self.addEventListener('fetch', (event) => {
//   console.log('Fetch Intercepted');
//   event.respondWith(
//     (async function () {
//       const response = await caches.match(event.request);
//       console.log(response);
//       return response || fetch(event.request);
//     })
//   )
// });
