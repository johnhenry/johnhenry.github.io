import { defineConfig } from "astro/config";
import deno from "@astrojs/deno";

// @ts-check

/** @type {import('astro').AstroUserConfig} */

export default defineConfig({
  integrations: [],
  vite: {
    plugins: [],
  },
  adapter: deno(),
});
