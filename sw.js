// Service Worker — 让 App 离线也能打开
var CACHE = 'jizhang-v1';
var FILES = [
  '.',
  'index.html',
  'manifest.json',
  'icon.svg'
];

// 安装时：把关键文件缓存起来
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(FILES);
    })
  );
});

// 请求时：优先从缓存拿，没缓存才联网
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).then(function(response) {
        return caches.open(CACHE).then(function(cache) {
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});
