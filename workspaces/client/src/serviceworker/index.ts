/// <reference types="@types/serviceworker" />
import PQueue from 'p-queue';

import { jitter } from './jitter';
import { transformJpegXLToBmp } from './transformJpegXLToBmp';

// ServiceWorker が負荷で落ちないように並列リクエスト数を制限する
const queue = new PQueue({
  concurrency: 5,
});

self.addEventListener('install', (ev: ExtendableEvent) => {
  ev.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (ev: ExtendableEvent) => {
  ev.waitUntil(self.clients.claim());
});
