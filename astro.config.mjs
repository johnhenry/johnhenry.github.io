import { defineConfig } from "astro/config"; // @ts-check
// import { SITE_CANONICAL_URL } from "./src/SETTINGS.mjs";

/** @type {import('astro').AstroUserConfig} */

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://johnhenry.github.io/",
  integrations: [sitemap()],
  vite: {
    plugins: [],
  },
  outDir: "./dist/static",
});
