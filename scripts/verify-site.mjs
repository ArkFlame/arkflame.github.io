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
const MIN_PRODUCT_PAGES = 45;

const REQUIRED_FILES = [
  "index.html",
  "about/index.html",
  "plugins/index.html",
  "plugins/security/index.html",
  "plugins/performance/index.html",
  "plugins/network/index.html",
  "plugins/gameplay/index.html",
  "plugins/smp/index.html",
  "404.html",
  "CNAME",
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
];

const FORBIDDEN_PATTERNS = [
  'href="#"',
  "data:image",
  'id="iso"',
  "<canvas",
  "<polygon",
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
  "plugins/index.html",
  "plugins/security/index.html",
  "plugins/performance/index.html",
  "plugins/network/index.html",
  "plugins/gameplay/index.html",
  "plugins/smp/index.html",
  "404.html",
];

// Markers asserted against the RENDERED TEXT of dist/index.html. Typography may
// legally wrap part of the phrase in an inline element (e.g. an accent span), which
// splits it across tags in the raw markup, so a raw substring match would be wrong.
const HOME_TEXT_MARKERS = [
  "We make Minecraft plugins.",
  "Five problems, one studio",
  "Supported Minecraft ecosystem",
  "Our plugins support legacy to modern versions from 1.8 to 1.21. Folia is compatible in most plugins.",
];

// Markers asserted against the RAW markup of dist/index.html: routes and absolute
// URLs live in href attributes, so matching rendered text would be the wrong axis.
const HOME_MARKUP_MARKERS = [
  "/plugins/",
  "https://linsaftw.arkflame.com/",
  "https://papermc.io/software/paper/",
  "https://papermc.io/software/folia/",
  "https://papermc.io/software/velocity/",
  "https://www.spigotmc.org/wiki/bungeecord/",
];
const FORBIDDEN_HOME_MARKUP_MARKERS = [
  'data-accent="network"',
  'class="cs af-section"',
  "Disciplines",
  "Packet handling",
  "Concurrency",
  "Products span legacy and modern Minecraft environments. Verify compatibility on each product page.",
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

  // Product slugs are derived from the built HTML catalog, never from the TS data source.
  const slugs = new Set();
  const catalog = html.get("plugins/index.html");
  if (catalog === undefined) throw new Error("missing required dist file: dist/plugins/index.html");
  for (const match of catalog.matchAll(/href=["']\/plugins\/([a-z0-9][a-z0-9-]*)\/["']/g)) {
    if (!CATEGORY_SLUGS.includes(match[1])) slugs.add(match[1]);
  }
  const productSlugs = [...slugs].sort();

  await check("PRODUCT PAGE COVERAGE", () => {
    if (productSlugs.length < MIN_PRODUCT_PAGES) {
      throw new Error(
        `product catalog discovery found only ${productSlugs.length} product slugs in ` +
          `dist/plugins/index.html, expected at least ${MIN_PRODUCT_PAGES}`,
      );
    }
    for (const slug of productSlugs) requireFile(`plugins/${slug}/index.html`);
    return `${productSlugs.length} product pages (>= ${MIN_PRODUCT_PAGES})`;
  });

  await check("CANONICAL ORIGIN", () => {
    const routes = [...CANONICAL_ROUTES, `plugins/${productSlugs[0]}/index.html`];
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
