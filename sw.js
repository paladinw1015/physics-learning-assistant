// Service Worker — 离线缓存
var CACHE = 'physics-helper-v1';
var FILES = [
  '.',
  'index.html',
  'manifest.json',
  'js/data.js',
  'js/imported_questions.js',
  'js/boost_questions.js',
  'js/items.js',
  'js/storage.js',
  'js/gamification.js',
  'js/rewards.js',
  'js/diagnosis.js',
  'js/practice.js',
  'js/boss.js',
  'js/ui.js',
  'js/app.js'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(FILES);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(resp) {
      return resp || fetch(e.request).then(function(response) {
        return caches.open(CACHE).then(function(cache) {
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
