import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
// @ts-check

/** @type {import('astro').AstroUserConfig} */

// https://astro.build/config
export default defineConfig({
  integrations: [solid()],
  vite: {
    plugins: []
  }
});