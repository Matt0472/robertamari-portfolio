// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { excludedPages } from './src/lib/indexing.ts';

// Public address of the site: change it here once the domain is bought,
// or set SITE_URL in the Cloudflare build (CODE-13).
const SITE_URL = process.env.SITE_URL ?? 'https://robertamari.it';

// Sub-folder the site is served from: "/" on its own domain, "/<repository>" for the GitHub Pages
// preview (set by the workflow in .github/workflows/pages.yml). Internal links use src/lib/paths.ts.
const BASE_PATH = process.env.BASE_PATH ?? '/';
const basePrefix = BASE_PATH.replace(/\/$/, '');

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  integrations: [
    sitemap({
      filter: (page) =>
        !excludedPages.includes(new URL(page).pathname.slice(basePrefix.length).replace(/\/$/, '')),
    }),
  ],
  build: {
    format: 'directory',
  },
  // With "class", a class passed to a child component (<Icon class="...">) receives the parent's styles.
  scopedStyleStrategy: 'class',
});
