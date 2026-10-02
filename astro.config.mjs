// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // The live address. Used for the sitemap and social share previews.
  site: "https://plushcutaudio.com",
  output: "static",
  integrations: [sitemap()],
  // Old addresses that should forward to new ones
  redirects: {
    "/portfolio": "/projects",
  },
});
