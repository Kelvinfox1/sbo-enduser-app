const staticCatche = 'site-static-v9'
const dynamicCache = 'site-dynamic-v9'
const assetss = [
  '/',
  '/index.html',
  `./pages/questionnair.html`,
  `./pages/notification.html`,
  `./pages/help.html`,
  `./pages/contact.html`,
  `./js/auth.js`,
  `./js/authstate.js`,
  `./js/example.js`,
  `./js/index.js`,
  `./js/location.js`,
  `./js/materialize.js`,
  `./js/materialize.min.js`,
  `./js/ui.js`,
  `./images/Login – 1.png`,
  `./images/sbologo.png`,
  `./images/Ui Kit - Dashboard – 1.png`,
  `./css/materialize.css`,
  `./css/materialize.min.css`,
  `./css/styles.css`,
  `https://fonts.googleapis.com/icon?family=Material+Icons`,
  `https://code.jquery.com/jquery-3.2.1.min.js`,
]

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size))
      }
    })
  })
}

// install event
self.addEventListener('install', (evt) => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCatche).then((cache) => {
      console.log('caching shell assetss')
      cache.addAll(assetss)
    })
  )
})

// activate event
self.addEventListener('activate', (evt) => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then((keys) => {
      //console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCatche && key !== dynamicCache)
          .map((key) => caches.delete(key))
      )
    })
  )
})

// fetch events
self.addEventListener('fetch', (evt) => {
  if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {
    evt.respondWith(
      caches
        .match(evt.request)
        .then((cacheRes) => {
          return (
            cacheRes ||
            fetch(evt.request).then((fetchRes) => {
              return caches.open(dynamicCache).then((cache) => {
                cache.put(evt.request.url, fetchRes.clone())
                // check cached items size
                limitCacheSize(dynamicCache, 15)
                return fetchRes
              })
            })
          )
        })
        .catch(() => {
          if (evt.request.url.indexOf('.html') > -1) {
            return caches.match('/pages/fallback.html')
          }
        })
    )
  }
})
