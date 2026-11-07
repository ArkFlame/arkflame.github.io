import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const SITE_URL = 'https://arkflame.com';

/** Maps each guide and doc URL to its frontmatter `updated` date (YYYY-MM-DD). */
function updatedDates(dir, prefix) {
  return Object.fromEntries(
    readdirSync(dir)
      .filter((file) => file.endsWith('.md'))
      .map((file) => {
        const date = readFileSync(join(dir, file), 'utf8').match(/^updated:\s*(\d{4}-\d{2}-\d{2})/m);
        return [`${SITE_URL}${prefix}${basename(file, '.md')}/`, date?.[1]];
      })
      .filter(([, date]) => date !== undefined),
  );
}

const LASTMOD = {
  ...updatedDates('src/content/guides', '/guides/'),
  ...updatedDates('src/content/docs', '/docs/'),
};

export default defineConfig({
  site: 'https://arkflame.com',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  integrations: [
    sitemap({
      serialize(item) {
        const lastmod = LASTMOD[item.url];
        if (lastmod !== undefined) {
          return { ...item, lastmod, changefreq: 'monthly', priority: 0.7 };
        }
        if (item.url === `${SITE_URL}/`) return { ...item, changefreq: 'weekly', priority: 1.0 };
        if (item.url.includes('/plugins/')) return { ...item, changefreq: 'monthly', priority: 0.8 };
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
