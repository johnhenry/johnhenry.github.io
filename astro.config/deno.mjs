import { defineConfig } from "astro/config";
import { SITE_CANONICAL_URL } from "./SETTINGS.mjs";

import deno from "@astrojs/deno";

import sitemap from "@astrojs/sitemap";
// @ts-check

/** @type {import('astro').AstroUserConfig} */

export default defineConfig({
  site: SITE_CANONICAL_URL,
  integrations: [sitemap()],
  vite: {
    plugins: [],
  },
  adapter: deno(),
  outDir: "./dist/deno",
});
