import { defineConfig } from "astro/config";

import deno from "@astrojs/deno";

import sitemap from "@astrojs/sitemap";
// @ts-check

/** @type {import('astro').AstroUserConfig} */

export default defineConfig({
  site: "https://johnhenry.github.io/",
  integrations: [sitemap()],
  vite: {
    plugins: [],
  },
  adapter: deno(),
  outDir: "./dist/deno",
});
