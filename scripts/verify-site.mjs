#!/usr/bin/env node
/**
 * Post-build release gate for the static ArkFlame site.
 *
 * HARD CONSTRAINT: zero third-party dependencies. Only node:fs, node:fs/promises,
 * node:path and node:url are imported. The TypeScript data authority is NEVER
 * imported or transpiled (that would need a TS loader); product slugs are derived
 * from the built HTML instead. No network access is performed.
 *
 * Usage: node scripts/verify-site.mjs [distDir]
 *   distDir defaults to <repoRoot>/dist where repoRoot is the parent of scripts/.
 */

import { readdir, readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
const DIST = path.resolve(REPO_ROOT, process.argv[2] ?? "dist");
const ORIGIN = "https://arkflame.com";

const CATEGORY_SLUGS = ["security", "performance", "network", "gameplay", "smp"];
const MIN_PRODUCT_PAGES = 51;
const MIN_DOCS = 8;
const MIN_GUIDES = 8;
const PRIORITY_PRODUCTS = [
  "exploitfixer",
  "fairplay",
  "flamecord",
  "veloflame",
  "authme-premium",
  "redstonelimiter",
];

const REQUIRED_FILES = [
  "index.html",
  "about/index.html",
  "global-dom-optimizer/index.html",
  "global-dom-optimizer/privacy/index.html",
  "downloads/global-dom-optimizer-0.0.6.zip",
  "plugins/index.html",
  "plugins/security/index.html",
  "plugins/performance/index.html",
  "plugins/network/index.html",
  "plugins/gameplay/index.html",
  "plugins/smp/index.html",
  "docs/index.html",
  "docs/exploitfixer/index.html",
  "docs/fairplay/index.html",
  "docs/flamecord/index.html",
  "docs/authme-premium/index.html",
  "docs/redstonelimiter/index.html",
  "guides/index.html",
  "guides/folia-compatibility/index.html",
  "guides/exploitfixer-packet-abuse/index.html",
  "404.html",
  "CNAME",
  ".nojekyll",
  "robots.txt",
  "sitemap-index.xml",
  "sitemap-0.xml",
  "assets/img/products/flamecord.webp",
  "assets/img/products/exploitfixer.webp",
  "assets/img/products/fairplay.webp",
  "assets/img/linsaftw-profile.webp",
  "assets/img/arkflame-logo.webp",
  "assets/img/og-image.webp",
  "assets/img/vendor/bukkit.webp",
  "assets/img/vendor/spigot.webp",
  "assets/img/vendor/papermc.webp",
  "assets/img/vendor/folia.webp",
  "assets/img/vendor/bungeecord.webp",
  "assets/img/vendor/velocity.webp",
  "fonts/outfit-400.woff2",
  "fonts/rajdhani-700.woff2",
  "fonts/OFL-Outfit.txt",
  "fonts/OFL-Rajdhani.txt",
];

const FORBIDDEN_PATTERNS = [
  'href="#"',
  "data:image",
  'id="iso"',
  "<canvas",
  "<polygon",
  "af-marquee",
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "cdn.jsdelivr.net",
  "Source-reviewed",
  "source-backed",
  "Source-backed",
  "Evidence and limits",
  "Not runtime-verified",
  "Not yet verified",
  "limits we could not verify",
  "Our plugins support legacy to modern versions",
  "Folia is compatible in most plugins",
  "product-icons/smp-combat.svg",
  "product-icons/smp-harvest.svg",
  "product-icons/smp-lifesteal.svg",
  "product-icons/smp-menus.svg",
  "product-icons/smp-punishments.svg",
  "product-icons/smp-regions.svg",
];

const CANONICAL_ROUTES = [
  "index.html",
  "about/index.html",
  "global-dom-optimizer/index.html",
  "global-dom-optimizer/privacy/index.html",
  "plugins/index.html",
  "plugins/security/index.html",
  "plugins/performance/index.html",
  "plugins/network/index.html",
  "plugins/gameplay/index.html",
  "plugins/smp/index.html",
  "docs/index.html",
  "guides/index.html",
  "404.html",
];

// Markers asserted against the RENDERED TEXT of dist/index.html. Typography may
// legally wrap part of the phrase in an inline element (e.g. an accent span), which
// splits it across tags in the raw markup, so a raw substring match would be wrong.
const HOME_TEXT_MARKERS = [
  "We make Minecraft plugins.",
  "Start with these.",
  "Stop abuse before it reaches gameplay.",
  "Cap the work that costs tick time.",
  "Harden the proxy layer.",
  "Build the survival loop.",
  "Read the documentation.",
  "Supports all popular platforms.",
];

// Markers asserted against the RAW markup of dist/index.html: routes and absolute
// URLs live in href attributes, so matching rendered text would be the wrong axis.
const HOME_MARKUP_MARKERS = [
  "/plugins/",
  "/plugins/security/",
  "/plugins/performance/",
  "/plugins/network/",
  "/plugins/smp/",
  "/docs/",
  "/guides/",
  "https://linsaftw.arkflame.com/",
  "https://builtbybit.com/creators/linsaftw.152552/",
];
const FORBIDDEN_HOME_MARKUP_MARKERS = [
  'data-accent="network"',
  'class="cs af-section"',
  "Five problems, one studio",
  "Supported Minecraft ecosystem",
  "Our plugins support legacy to modern versions from 1.8 to 1.21.",
  "Folia is compatible in most plugins.",
  "source-backed",
  "product-specific",
  "Disciplines",
  "Packet handling",
  "Concurrency",
];

let greenChecks = 0;

/** Run one invariant group and print its own green line. The first throw aborts the run. */
async function check(name, fn) {
  const detail = await fn();
  greenChecks += 1;
  console.log(`PASS  ${name}${detail ? ` — ${detail}` : ""}`);
}

/** Recursively collect every .html file under root as dist-relative POSIX paths. */
async function collectHtml(root, rel = "") {
  const entries = await readdir(path.join(root, rel), { withFileTypes: true });
  const found = [];
  for (const entry of entries) {
    const nextRel = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) found.push(...(await collectHtml(root, nextRel)));
    else if (entry.isFile() && entry.name.endsWith(".html")) found.push(nextRel);
  }
  return found;
}

/**
 * Reduce an HTML string to its comparable VISIBLE TEXT.
 *
 * Strips <script>/<style> blocks (their contents are never rendered), then all
 * remaining tags, decodes the basic named/numeric entities, and collapses
 * whitespace runs to a single space. This makes content assertions typography-
 * aware: a phrase split across inline markup (e.g. `We make <span>Minecraft</span>
 * plugins.`) still compares equal to the plain rendered sentence.
 *
 * &amp; is decoded LAST so that an escaped entity such as `&amp;lt;` does not
 * become a real `<` and get treated as a tag.
 */
function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function requireFile(rel) {
  if (!existsSync(path.join(DIST, rel))) {
    throw new Error(`missing required dist file: dist/${rel} (expected at ${path.join(DIST, rel)})`);
  }
}

/** Read a dist-relative file, failing with the exact path when it is missing. */
async function readDist(rel) {
  const abs = path.join(DIST, rel);
  try {
    return await readFile(abs, "utf8");
  } catch (cause) {
    const code = cause && typeof cause === "object" ? cause.code : undefined;
    throw new Error(`missing required dist file: dist/${rel} (${code ?? "read error"} at ${abs})`);
  }
}

async function main() {
  const info = await stat(DIST).catch(() => null);
  if (!info?.isDirectory()) {
    throw new Error(`missing dist directory: ${DIST} — run the build before verify`);
  }
  console.log(`dist   ${DIST}`);

  const htmlFiles = (await collectHtml(DIST)).sort();
  if (htmlFiles.length === 0) throw new Error(`no .html files found under ${DIST}`);

  // Read every page once up front; later checks read from this map.
  const html = new Map();
  for (const rel of htmlFiles) html.set(rel, await readFile(path.join(DIST, rel), "utf8"));

  /** Shared helper: assert the single-canonical-per-route invariant for one page. */
  function assertCanonical(rel) {
    const body = html.get(rel);
    if (body === undefined) throw new Error(`missing required dist file: dist/${rel} for canonical check`);
    const hrefs = [...body.matchAll(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/g)].map((m) => m[1]);
    if (hrefs.length !== 1) {
      throw new Error(`dist/${rel} must contain exactly one <link rel="canonical"> tag, found ${hrefs.length}`);
    }
    const href = hrefs[0];
    if (!href.startsWith(`${ORIGIN}/`)) {
      throw new Error(`dist/${rel} canonical href must start with ${ORIGIN}/, got ${JSON.stringify(href)}`);
    }
    if (rel === "404.html" && href === `${ORIGIN}/`) {
      throw new Error(`dist/404.html canonical href must name the 404 route, got ${JSON.stringify(href)}`);
    }
    return href;
  }

  check("HTML FILES COLLECTED", () => `${html.size} files`);

  await check("REQUIRED FILES EXIST", () => {
    for (const rel of REQUIRED_FILES) requireFile(rel);
    return `${REQUIRED_FILES.length} entries`;
  });

  await check("CNAME IS arkflame.com", async () => {
    const cname = (await readDist("CNAME")).trim();
    if (cname !== "arkflame.com") {
      throw new Error(`dist/CNAME must equal "arkflame.com", got ${JSON.stringify(cname)}`);
    }
    return cname;
  });

  await check("ROBOTS SITEMAP ABSOLUTE URL", async () => {
    const robots = await readDist("robots.txt");
    if (!robots.includes(`${ORIGIN}/sitemap-index.xml`)) {
      throw new Error(`dist/robots.txt must contain the absolute sitemap URL ${ORIGIN}/sitemap-index.xml`);
    }
    return `${ORIGIN}/sitemap-index.xml`;
  });

  await check("HOME CONTENT MARKERS", () => {
    const home = html.get("index.html");
    if (home === undefined) throw new Error("missing required dist file: dist/index.html");
    const rendered = visibleText(home);
    for (const needle of HOME_TEXT_MARKERS) {
      if (!rendered.includes(needle)) {
        throw new Error(`dist/index.html is missing required visible text ${JSON.stringify(needle)}`);
      }
    }
    for (const needle of HOME_MARKUP_MARKERS) {
      if (!home.includes(needle)) {
        throw new Error(`dist/index.html is missing required substring ${JSON.stringify(needle)}`);
      }
    }
    for (const needle of FORBIDDEN_HOME_MARKUP_MARKERS) {
      if (home.includes(needle)) {
        throw new Error(`dist/index.html contains forbidden stale homepage markup ${JSON.stringify(needle)}`);
      }
    }
    return `${HOME_TEXT_MARKERS.length} text + ${HOME_MARKUP_MARKERS.length} markup markers; ${FORBIDDEN_HOME_MARKUP_MARKERS.length} stale markers rejected`;
  });

  await check("FORBIDDEN PATTERNS ABSENT", () => {
    for (const [rel, body] of html) {
      for (const pattern of FORBIDDEN_PATTERNS) {
        if (body.includes(pattern)) {
          throw new Error(`forbidden pattern ${JSON.stringify(pattern)} found in dist/${rel}`);
        }
      }
    }
    return `${FORBIDDEN_PATTERNS.length} patterns across ${html.size} files`;
  });

  await check("SITEMAP ORIGIN", async () => {
    const sitemapIndex = await readDist("sitemap-index.xml");
    if (!sitemapIndex.includes(ORIGIN)) {
      throw new Error(`dist/sitemap-index.xml must reference the origin ${ORIGIN}`);
    }
    return ORIGIN;
  });

  await check("DOM OPTIMIZER PRODUCT, PRIVACY AND SITEMAP", async () => {
    const product = html.get("global-dom-optimizer/index.html") ?? "";
    const privacy = html.get("global-dom-optimizer/privacy/index.html") ?? "";
    const sitemap = await readDist("sitemap-0.xml");
    for (const expected of ["Global DOM Optimizer", "content-visibility", "/downloads/global-dom-optimizer-0.0.6.zip", "/global-dom-optimizer/privacy/"]) {
      if (!product.includes(expected)) throw new Error(`product page missing ${expected}`);
    }
    for (const expected of ["Global DOM Optimizer", "chrome.storage.local", "Limited Use", "ArkFlame Studios"]) {
      if (!privacy.includes(expected)) throw new Error(`privacy page missing ${expected}`);
    }
    for (const route of ["global-dom-optimizer/", "global-dom-optimizer/privacy/"]) {
      const url = `${ORIGIN}/${route}`;
      if (!sitemap.includes(`<loc>${url}</loc>`)) throw new Error(`sitemap missing ${url}`);
    }
    return "product route, privacy disclosures, assets and sitemap URLs";
  });

  // Product slugs are derived from the built HTML catalog, never from the TS data source.
  const slugs = new Set();
  const catalog = html.get("plugins/index.html");
  if (catalog === undefined) throw new Error("missing required dist file: dist/plugins/index.html");
  for (const match of catalog.matchAll(/href=["']\/plugins\/([a-z0-9][a-z0-9-]*)\/["']/g)) {
    if (!CATEGORY_SLUGS.includes(match[1])) slugs.add(match[1]);
  }
  const productSlugs = [...slugs].sort();

  const docsRoutes = htmlFiles.filter(
    (rel) => /^docs\/[a-z0-9][a-z0-9-]*\/index\.html$/.test(rel),
  );
  const guidesRoutes = htmlFiles.filter(
    (rel) => /^guides\/[a-z0-9][a-z0-9-]*\/index\.html$/.test(rel),
  );

  await check("PRODUCT PAGE COVERAGE", () => {
    if (productSlugs.length !== MIN_PRODUCT_PAGES) {
      throw new Error(
        `product catalog discovery found ${productSlugs.length} product slugs in ` +
          `dist/plugins/index.html, expected exactly ${MIN_PRODUCT_PAGES}`,
      );
    }
    for (const slug of productSlugs) {
      const body = html.get(`plugins/${slug}/index.html`) ?? "";
      const h1 = [...body.matchAll(/<h1\b/g)].length;
      if (h1 !== 1) throw new Error(`dist/plugins/${slug}/index.html must have exactly one h1, found ${h1}`);
      if (!body.includes("builtbybit.com/resources/")) {
        throw new Error(`dist/plugins/${slug}/index.html has no BuiltByBit CTA`);
      }
      if (!body.includes('id="compatibility"')) {
        throw new Error(`dist/plugins/${slug}/index.html has no compatibility section`);
      }
    }
    return `${productSlugs.length} product pages with h1, store CTA and compatibility`;
  });

  await check("HOMEPAGE DISCOVERY RAILS", () => {
    const home = html.get("index.html") ?? "";
    const rails = [...home.matchAll(/class="af-rail af-section"/g)].length;
    const allTiles = [...home.matchAll(/class="af-rail__all"/g)].length;
    const productLinks = [...home.matchAll(/href="\/plugins\/[a-z0-9-]+\/"/g)].length;
    if (rails !== 5) throw new Error(`dist/index.html must render 5 discovery rails, found ${rails}`);
    if (allTiles !== 5) throw new Error(`dist/index.html must render one View all tile per rail, found ${allTiles}`);
    if (productLinks < 20) throw new Error(`dist/index.html only links ${productLinks} product routes`);
    if (home.includes("af-marquee")) throw new Error("dist/index.html still contains the autoplay marquee");
    return `${rails} rails, ${allTiles} View-all tiles, ${productLinks} product links, no autoplay`;
  });

  await check("CATALOG CONTROLS AND FULL INVENTORY", () => {
    const body = catalog;
    for (const needle of ['data-catalog-sort', 'data-catalog-filters', 'data-catalog-list', 'id="catalog-search"']) {
      if (!body.includes(needle)) throw new Error(`dist/plugins/index.html is missing ${needle}`);
    }
    const cards = [...body.matchAll(/data-product="[a-z0-9-]+"/g)].length;
    if (cards !== MIN_PRODUCT_PAGES) {
      throw new Error(`dist/plugins/index.html renders ${cards} product cards, expected ${MIN_PRODUCT_PAGES}`);
    }
    return `${cards} cards, search + category + sort controls`;
  });

  await check("DOCUMENTATION ROUTES", async () => {
    if (docsRoutes.length < MIN_DOCS) {
      throw new Error(`found ${docsRoutes.length} docs routes, expected at least ${MIN_DOCS}`);
    }
    const sitemap = await readDist("sitemap-0.xml");
    for (const rel of docsRoutes) {
      const body = html.get(rel) ?? "";
      const h1 = [...body.matchAll(/<h1\b/g)].length;
      if (h1 !== 1) throw new Error(`dist/${rel} must have exactly one h1, found ${h1}`);
      if (!body.includes('class="af-prose"')) throw new Error(`dist/${rel} is missing documentation prose`);
      const route = rel.replace(/index\.html$/, "");
      if (!sitemap.includes(`<loc>${ORIGIN}/${route}</loc>`)) {
        throw new Error(`sitemap missing docs route ${ORIGIN}/${route}`);
      }
    }
    return `${docsRoutes.length} docs routes with h1, prose and sitemap entries`;
  });

  await check("GUIDE ROUTES", async () => {
    if (guidesRoutes.length < MIN_GUIDES) {
      throw new Error(`found ${guidesRoutes.length} guide routes, expected at least ${MIN_GUIDES}`);
    }
    const sitemap = await readDist("sitemap-0.xml");
    for (const rel of guidesRoutes) {
      const body = html.get(rel) ?? "";
      const h1 = [...body.matchAll(/<h1\b/g)].length;
      if (h1 !== 1) throw new Error(`dist/${rel} must have exactly one h1, found ${h1}`);
      if (!body.includes('class="af-prose"')) throw new Error(`dist/${rel} is missing article prose`);
      const route = rel.replace(/index\.html$/, "");
      if (!sitemap.includes(`<loc>${ORIGIN}/${route}</loc>`)) {
        throw new Error(`sitemap missing guide route ${ORIGIN}/${route}`);
      }
    }
    return `${guidesRoutes.length} guide routes with h1, prose and sitemap entries`;
  });

  await check("PRIORITY PRODUCT DOCS AND CTAS", () => {
    for (const slug of PRIORITY_PRODUCTS) {
      const body = html.get(`plugins/${slug}/index.html`);
      if (body === undefined) throw new Error(`missing priority product page ${slug}`);
      if (!body.includes(`/docs/${slug}/`)) throw new Error(`${slug} product page does not link its docs`);
      if (!body.includes("builtbybit.com/resources/")) throw new Error(`${slug} product page has no BuiltByBit CTA`);
      if (!body.includes('id="compatibility"')) throw new Error(`${slug} product page has no compatibility section`);
      if (body.includes("scope labels for")) throw new Error(`${slug} still renders the old scope-tags sentence`);
    }
    return `${PRIORITY_PRODUCTS.length} priority products with docs, store CTA and compatibility`;
  });

  await check("INTERNAL LINKS RESOLVE", () => {
    let checked = 0;
    const missing = [];
    for (const [rel, body] of html) {
      for (const match of body.matchAll(/<a\b[^>]*href=["']([^"']+)["']/g)) {
        const raw = match[1];
        if (!raw.startsWith("/") || raw.startsWith("//")) continue;
        const clean = raw.split("#")[0].split("?")[0];
        if (clean === "") continue;
        let target = clean.replace(/^\//, "");
        if (clean.endsWith("/")) target += "index.html";
        if (!existsSync(path.join(DIST, target))) missing.push(`${rel} -> ${raw}`);
        checked += 1;
      }
    }
    if (missing.length > 0) {
      throw new Error(`broken internal links:\n  ${missing.slice(0, 12).join("\n  ")}`);
    }
    return `${checked} internal hrefs resolve to dist files`;
  });

  await check("PRODUCT STRUCTURED DATA HAS NO FAKE COMMERCE", () => {
    const banned = new Set(["aggregaterating", "review", "offers", "price", "ratingvalue", "reviewcount"]);
    let blocks = 0;
    for (const slug of productSlugs) {
      const body = html.get(`plugins/${slug}/index.html`) ?? "";
      for (const match of body.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
        let parsed;
        try {
          parsed = JSON.parse(match[1]);
        } catch {
          throw new Error(`${slug} has invalid JSON-LD`);
        }
        blocks += 1;
        const stack = [parsed];
        while (stack.length > 0) {
          const node = stack.pop();
          if (Array.isArray(node)) {
            stack.push(...node);
          } else if (node !== null && typeof node === "object") {
            for (const [key, value] of Object.entries(node)) {
              if (banned.has(key.toLowerCase())) {
                throw new Error(`${slug} JSON-LD contains disallowed ${key}`);
              }
              stack.push(value);
            }
          }
        }
      }
    }
    return `${productSlugs.length} product pages, ${blocks} JSON-LD blocks, no ratings/offers`;
  });

  await check("JSON-LD PARSES ON EVERY PAGE", () => {
    let blocks = 0;
    for (const [rel, body] of html) {
      for (const match of body.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
        try {
          JSON.parse(match[1]);
        } catch {
          throw new Error(`dist/${rel} contains invalid JSON-LD`);
        }
        blocks += 1;
      }
    }
    return `${blocks} structured-data blocks parse`;
  });

  await check("UNIQUE PAGE TITLES", () => {
    const seen = new Map();
    for (const [rel, body] of html) {
      if (rel === "404.html") continue;
      const title = body.match(/<title>([^<]+)<\/title>/)?.[1]?.trim();
      if (title === undefined) throw new Error(`dist/${rel} has no title`);
      if (seen.has(title)) throw new Error(`duplicate title "${title}" in ${seen.get(title)} and ${rel}`);
      seen.set(title, rel);
    }
    return `${seen.size} unique titles`;
  });

  await check("SEO HEAD PER PAGE", () => {
    for (const [rel, body] of html) {
      if (rel === "404.html") continue;
      const titles = [...body.matchAll(/<title>([^<]+)<\/title>/g)];
      if (titles.length !== 1) throw new Error(`dist/${rel} must have exactly one <title>`);
      if (titles[0][1].trim().length < 12) throw new Error(`dist/${rel} title is too short`);
      const description = body.match(
        /<meta\s+name=["']description["']\s+content=(?:"([^"]*)"|'([^']*)')/,
      );
      if (description === null || (description[1] ?? description[2] ?? "").trim().length < 40) {
        throw new Error(`dist/${rel} is missing a useful meta description`);
      }
    }
    return `${html.size - 1} indexable pages have title + description`;
  });

  await check("CANONICAL ORIGIN", () => {
    const routes = [
      ...CANONICAL_ROUTES,
      ...docsRoutes,
      ...guidesRoutes,
      `plugins/${productSlugs[0]}/index.html`,
    ];
    for (const rel of routes) assertCanonical(rel);
    return `${routes.length} routes pinned to ${ORIGIN}`;
  });

  console.log(
    `VERIFY PASS — ${html.size} HTML files checked, ${productSlugs.length} product pages, ${greenChecks} checks green.`,
  );
}

try {
  await main();
} catch (error) {
  console.error(`VERIFY FAIL — ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
