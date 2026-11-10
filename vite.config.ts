import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	server: {
		port: 3000,
	},
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		tailwindcss(),
		cloudflare({ viteEnvironment: { name: "ssr" } }),
		tanstackStart({
			server: {
				entry: "./server.ts",
			},
		}),
		viteReact(),
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (
						id.includes("node_modules/framer-motion") ||
						id.includes("node_modules/motion-dom") ||
						id.includes("node_modules/motion-utils")
					) {
						return "motion";
					}
					if (
						id.includes("node_modules/react/") ||
						id.includes("node_modules/react-dom/") ||
						id.includes("node_modules/scheduler/")
					) {
						return "react-vendor";
					}
				},
			},
		},
	},
});
