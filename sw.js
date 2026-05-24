const CACHE_NAME = 'esfihas-v1.4';
const assets = ['./', 'index.html', 'manifest.json'];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});
