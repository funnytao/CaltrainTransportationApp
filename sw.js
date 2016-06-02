this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/css/style.min.css',
        '/js/all.min.js',
        '/js/googlemap.js',
        '/css/bootstrap.min.css',
        '/logo.png',
        'https://funnytao.github.io/caltrain/caltrain/stops.json',
        'https://funnytao.github.io/caltrain/caltrain/stop_time.json',
        'https://funnytao.github.io/caltrain/caltrain/trips.json',
        'https://funnytao.github.io/caltrain/caltrain/stop_list.json'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
 var requestUrl = new URL(event.request.url);

 if (requestUrl.origin === location.origin) {
   if (requestUrl.pathname === '/') {
     event.respondWith(caches.match('/'));
     return;
   }
 }

 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});
