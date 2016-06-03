importScripts('serviceworker-cache-polyfill.js');

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      console.log('cache');
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

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       return response || new Response("Nothing in the cache for this request");
//     })
//   );
// });

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have 2 stream.
            var responseToCache = response.clone();

            caches.open('v1')
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
//
// self.addEventListener('fetch', function(event) {
//  var requestUrl = new URL(event.request.url);
//
//  if (requestUrl.origin === location.origin) {
//    if (requestUrl.pathname === '/') {
//      event.respondWith(caches.match('/'));
//      return;
//    }
//  }
//
//  event.respondWith(
//    caches.match(event.request).then(function(response) {
//      return response || fetch(event.request);
//    })
//  );
// });
