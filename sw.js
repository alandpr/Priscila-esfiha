self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
    // ESSENCIAL: Este escutador de 'fetch' é o requisito obrigatório que o Chrome e o Brave 
    // exigem para ativar o botão de "Instalar aplicativo" na tela.
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
