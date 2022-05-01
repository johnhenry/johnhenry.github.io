import { defineConfig } from "astro/config"; // @ts-check
// import { SITE_CANONICAL_URL } from "./src/SETTINGS.mjs";
import { SITE_LIB_URL, SITE_CANONICAL_URL } from "./astro.config/SETTINGS.mjs";

/** @type {import('astro').AstroUserConfig} */

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: SITE_CANONICAL_URL,
  integrations: [sitemap()],
  vite: {
    plugins: [],
  },
  outDir: "./dist/static",
  vite: {
    server: {
      proxy: {
        "/lib": {
          target: SITE_LIB_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/lib/, ""),
        },
      },
    },
  },
});
