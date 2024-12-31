import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';

export default defineConfig({
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			manifestFilename: 'manifest.webmanifest',
			strategies: 'injectManifest',
			filename: 'service-worker.ts',
			injectManifest: {
				globPatterns: [
					'client/**/*.{js,css,ico,png,svg,webp,webmanifest,ttf,woff,woff2}',
					'prerendered/**/*.{html,json}'
				]
			},
			kit: {
				includeVersionFile: true
			}
		})
	]
});
