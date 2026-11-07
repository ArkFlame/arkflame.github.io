# ArkFlame Studios — arkflame.com

Production static site for ArkFlame Studios: the company hub and catalogue for the studio's Minecraft server software. Astro static output, deployed to GitHub Pages at `arkflame.com`.

## Stack

- Astro 7.3.4 (`output: 'static'`)
- Tailwind CSS 4.3.3 via `@tailwindcss/vite` 4.3.3
- daisyUI 5.7.38 primitives only
- `@astrojs/sitemap` 3.7.4
- TypeScript (`astro/tsconfigs/strict`)
- Self-hosted Outfit and Rajdhani (SIL Open Font License 1.1)
- Node 24 in CI, npm

## Commands

```bash
npm ci                  # exact dependencies from package-lock.json
npm run dev             # local development server
npm run build           # emit static output to dist/
npm run verify          # post-build release gate
npm run check           # build + verify
npm run preview         # serve dist/
```

`verify` inspects generated HTML, so always run it after a fresh build. It checks URLs, canonical tags, structured data, the 52-product catalogue, docs/guide routes, internal links, sitemap coverage and that `store-stats.ts` has one entry per product.

## Routes

| Route | Source |
| --- | --- |
| `/` | `src/pages/index.astro` |
| `/plugins/` | catalogue with search, category filter and sort |
| `/plugins/<category>/` | `src/pages/plugins/[slug].astro` category branch |
| `/plugins/<product>/` | same route, product branch |
| `/docs/` and `/docs/<product>/` | Astro content collection `docs` |
| `/guides/` and `/guides/<slug>/` | Astro content collection `guides` |
| `/global-dom-optimizer/` | browser extension page |
| `/global-dom-optimizer/privacy/` | extension privacy policy |
| `/about/` | studio and founder background |
| `/404.html` | not-found page |

`public/CNAME`, `public/.nojekyll`, the extension download and the privacy route are release-critical. Keep them unchanged.

## Data and content authority

- `src/data/products.ts` — the only product identity authority. 52 records with slug, name, category, summary, tags, optional artwork, official URL, store URL and the editorial `featured` flag.
- `src/data/store-stats.ts` — dated BuiltByBit snapshot (`STATS_AS_OF`) keyed by product slug: price, free flag, rating, rating count, purchases, downloads. Every product has an entry; use `{}` to omit fields the store does not show. `formatPrice()` formats prices.
- `src/data/product-details.ts` — keyed rich copy: a two-sentence description, source-backed highlights and optional compatibility. It validates at import time that every product has exactly one entry and that no orphan entries exist.
- `src/data/categories.ts` — five category routes and their copy.
- `src/data/site.ts` — company, platform names and shared constants.
- `src/data/artwork.ts` — measured intrinsic dimensions of the shipped WebP artwork.

Rules:

- Add or remove a product only in `src/data/products.ts`, then update `src/data/product-details.ts`; the integrity guards fail the build otherwise.
- Compatibility may only come from the product repository or an explicit public listing claim. `runtimeVerified: false` stays false unless the plugin was actually exercised on that runtime.
- Price, rating, rating count, purchase count and download count may appear only as the dated snapshot in `src/data/store-stats.ts`, sourced from the public BuiltByBit creator page `https://builtbybit.com/creators/linsaftw.152552/`. Refresh it by re-reading the store and updating `STATS_AS_OF`. Never invent a value; omit a field the store does not show. Do not add sales ranks or benchmarks.
- `featured` is editorial, not a popularity metric. Do not label it "Popular" or "Trending".
- Tags are product scope, not a compatibility matrix.

## Documentation and guides

`src/content.config.ts` defines two collections:

- `docs` — one entry per plugin with enough repository evidence. It carries `plugin`, `category`, `updated`, `runtimeVerified` and an evidence note. The route is `/docs/<filename>/`.
- `guides` — task-led articles with an author, related product slugs and topics. The route is `/guides/<filename>/`.

Only publish commands, permissions, config keys, versions and dependencies that exist in the source repository or its public listing. Mark declarations separately from runtime-tested facts. Do not publish secrets, bridge tokens, customer data or proprietary source code.

## Project structure

```text
astro.config.mjs                  site URL, static output, sitemap, Tailwind
src/styles/global.css             tokens, layout utilities, prose styles
src/styles/fonts.css              self-hosted font faces
src/data/                         products, details, categories, artwork, site constants
src/layouts/BaseLayout.astro      document shell, SEO, OG/Twitter, JSON-LD
src/components/                   header, footer, product cards/rails/catalog/page, article shell
src/content/docs/                 plugin quick starts
src/content/guides/               technical articles
src/pages/                        home, catalog, dynamic product/category, docs, guides, extension, about, 404
public/                           CNAME, robots.txt, .nojekyll, manifest, artwork, fonts, extension ZIP
scripts/verify-site.mjs           post-build release gate
.github/workflows/deploy.yml      GitHub Pages deployment
```

## Fonts

Outfit and Rajdhani are self-hosted from `public/fonts/` as Latin-subset WOFF2 files. Both are licensed under the SIL Open Font License 1.1; the license texts are shipped alongside the files. The layout preloads the body and display faces, so no third-party font request blocks rendering.

## Deployment

GitHub Pages, `master` branch, `withastro/action` builds the site and `deploy-pages` publishes it. The build must remain static: no server endpoints, no live scraping, no authenticated API calls. The custom domain is `arkflame.com` (`public/CNAME`).

## Supporting sources

The plugin documentation was reviewed read-only against the local repositories under `ArkFlame/` and `Smarts-Hub/` on 30 October 2026. Where a repository was missing, private or incomplete, the site keeps a truthful listing-level page and records the gap in the product page instead of inventing a manual.
