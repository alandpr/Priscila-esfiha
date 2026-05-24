const CACHE_NAME = 'esfihas-v2.0';
// Deixamos apenas o essencial no cache inicial
const assets = ['./', 'index.html', 'manifest.json'];

self.addEventListener('install', event => {
  self.skipWaiting(); // Força a atualização imediata
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim()); // Toma o controle do navegador na hora
  // Destrói QUALQUER cache antigo que não seja o v2.0
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

// A SUA IDEIA AQUI: Prioriza a Internet. Se falhar (offline), puxa do Cache.
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
