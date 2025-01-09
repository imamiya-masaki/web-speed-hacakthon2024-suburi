/// <reference types="@types/serviceworker" />

const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
  '/client.global.js',
  '/assets/css/heroimage.css',
  '/assets/css/reset.css',
  '/assets/cyber-toon.svg',
  '/assets/heroimage-2-512.webp',
  '/client.css',
];

self.addEventListener('install', (ev: ExtendableEvent) => {
  ev.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // すぐに新しいバージョンのSWを有効化
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    // 現在のキャッシュ名と異なるものは削除する
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );

  // クライアントがこの Service Worker をすぐに利用できるように
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event: FetchEvent) => {
  // リクエストに対してキャッシュにあるか確認し、なければネットワークへ
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});