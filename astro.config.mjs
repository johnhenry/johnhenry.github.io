import { defineConfig } from "astro/config"; // @ts-check

import sitemap from "@astrojs/sitemap";

const SITE_CANONICAL_URL =
  process.env.PUBLIC_SITE_CANONICAL_URL || "https://johnhenry.github.io/";
const SITE_LIB_URL =
  process.env.PUBLIC_SITE_LIB_URL || "http://localhost:3001/";

/** @type {import('astro').AstroUserConfig} */

// https://astro.build/config
export default defineConfig({
  site: SITE_CANONICAL_URL,
  integrations: [sitemap()],
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
