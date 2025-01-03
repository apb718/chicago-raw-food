import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite'
import * as fs from "node:fs";

export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte',
		})
	],
	server: {
		https: {
			key: fs.readFileSync('certs/localhost-key.pem'),
			cert: fs.readFileSync('certs/localhost.pem'),
		},
		proxy: {}
	}
});
