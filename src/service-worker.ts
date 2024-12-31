/// <reference lib="WebWorker" />
/// <reference types="@sveltejs/kit" />

import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
declare let self: ServiceWorkerGlobalScope;

const manifest = self.__WB_MANIFEST;
console.log(manifest);

cleanupOutdatedCaches();
precacheAndRoute(manifest, { ignoreURLParametersMatching: [/.*/] });

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

registerRoute(/.*/, new StaleWhileRevalidate());
