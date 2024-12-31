/// <reference lib="WebWorker" />
/// <reference types="@sveltejs/kit" />

import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
declare let self: ServiceWorkerGlobalScope;

const manifest = self.__WB_MANIFEST;

// Can't navigate to /dependent route without this
// manifest.forEach((entry) => {
// 	if (typeof entry === 'object' && entry.url.endsWith('__data.json')) {
// 		entry.url = entry.url.replace(/^prerendered\/dependencies\//, '');
// 	}
// });

cleanupOutdatedCaches();
precacheAndRoute(manifest, { ignoreURLParametersMatching: [/.*/] });

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
