var assetsCache = 'meetup-pwa-assets-v1.0.1';
var dataCache = 'meetup-pwa-data-v1.0.1';

var staticFiles = [
    /\/assets\/icon\d{2,3}\.png/gi,
    /\/app\/(.*)\/(.*)\.js/gi,
    /\/bower_components\/(.*)\/(.*)\.min\.(js|css)/gi,
    /\/bower_components\/material\-design\-icons\/iconfont\/(.*)/gi,
    /\/bower_components\/angular\-indexedDB\/src\/indexeddb\.js/gi
];

function isStaticFile(event){
    return staticFiles.some((regex, index) => {
        return regex.test(event.request.url);
    });
}

function serveStaticFile(event){
    event.respondWith(
        caches.open(assetsCache).then((cache) => {
            return cache.match(event.request.url).then((response) => {
                if (response) return response;
                return fetch(event.request).then(function(networkResponse){
                    cache.put(event.request.url, networkResponse.clone());
                    return networkResponse;
                });
            })
        })
    );
}
self.addEventListener('fetch', function (event) {
    if (isStaticFile(event)){
        serveStaticFile(event);
        return;
    }
    event.respondWith(fetch(event.request));
});

self.addEventListener('message', function(event){
    console.log('message!', event);
});

self.addEventListener('unhandledRejection', function(ev){
    console.log('Error!');
    console.log(ev);
});

self.addEventListener('push', function(event){
    console.log('Push message:', event);

    event.waitUntil(
        self.registration.showNotification('Push Notification', {
            body: 'Olha que legal! Funciona mesmo!!!',
            icon: "app/assets/icon96.png"
        })
    );
});

self.addEventListener('notificationclick', function(event){
    event.notification.close();
});