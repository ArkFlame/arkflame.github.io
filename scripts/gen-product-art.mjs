#!/usr/bin/env node
// Generates branded fallback artwork for products that lack real artwork.
// Idempotent: products whose <slug>.webp already exists are skipped.
// Usage: node scripts/gen-product-art.mjs
import { readFile, writeFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PRODUCTS_TS = path.join(ROOT, "src/data/products.ts");
const ART_TS = path.join(ROOT, "src/data/artwork.ts");
const OUT_DIR = path.join(ROOT, "public/assets/img/products");
const W = 1200;
const H = 720;
const FONT = "Outfit, Rajdhani, 'DejaVu Sans', Arial, sans-serif";

const THEMES = {
  security: { a: "#1a6fe6", b: "#38d5ff", label: "Security" },
  performance: { a: "#f59e0b", b: "#fde047", label: "Performance" },
  network: { a: "#7c3aed", b: "#38d5ff", label: "Network" },
  gameplay: { a: "#ec4899", b: "#f97316", label: "Gameplay" },
  smp: { a: "#10b981", b: "#a3e635", label: "SMP" },
};

const exists = (file) => access(file).then(() => true, () => false);

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function wrap(name, max) {
  const lines = [];
  let cur = "";
  for (const word of name.split(/\s+/)) {
    const next = cur ? `${cur} ${word}` : word;
    if (next.length > max && cur) {
      lines.push(cur);
      cur = word;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function grid() {
  const parts = [];
  for (let x = 60; x < W; x += 60) parts.push(`M${x} 0V${H}`);
  for (let y = 60; y < H; y += 60) parts.push(`M0 ${y}H${W}`);
  return `<path d="${parts.join("")}"/>`;
}

// Geometric motif per category, placed in the right-hand column (x 780-1120).
function motif(category, t) {
  const ac = "url(#ac)";
  switch (category) {
    case "security":
      return `<path d="M950 230 L1100 285 V400 C1100 480 1040 530 950 560 C860 530 800 480 800 400 V285 Z" fill="none" stroke="${ac}" stroke-width="10" stroke-linejoin="round"/>
<path d="M885 395 L935 445 L1020 345" fill="none" stroke="${t.b}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>`;
    case "performance": {
      const hs = [120, 190, 150, 260, 320];
      return hs
        .map((h, i) => `<rect x="${800 + i * 66}" y="${560 - h}" width="46" height="${h}" rx="8" fill="${ac}"/>`)
        .join("");
    }
    case "network": {
      const pts = [-90, -30, 30, 90, 150, 210].map((deg) => {
        const r = (deg * Math.PI) / 180;
        return [Math.round(950 + 150 * Math.cos(r)), Math.round(390 + 150 * Math.sin(r))];
      });
      const spokes = pts.map(([x, y]) => `<line x1="950" y1="390" x2="${x}" y2="${y}" stroke="${t.b}" stroke-opacity="0.6" stroke-width="4"/>`).join("");
      const nodes = pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="22" fill="${t.b}"/>`).join("");
      return `${spokes}${nodes}<circle cx="950" cy="390" r="34" fill="${ac}"/>`;
    }
    case "gameplay":
      return `<polygon points="950,230 1100,315 950,400 800,315" fill="${ac}"/>
<polygon points="800,315 950,400 950,560 800,475" fill="${t.a}" fill-opacity="0.55"/>
<polygon points="950,400 1100,315 1100,475 950,560" fill="${t.b}" fill-opacity="0.3"/>`;
    case "smp": {
      const cells = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const x = 800 + c * 112;
          const y = 240 + r * 112;
          const center = r === 1 && c === 1;
          cells.push(
            center
              ? `<rect x="${x}" y="${y}" width="96" height="96" rx="16" fill="${ac}"/>`
              : `<rect x="${x + 2}" y="${y + 2}" width="92" height="92" rx="16" fill="none" stroke="${t.b}" stroke-opacity="0.55" stroke-width="4"/>`,
          );
        }
      }
      return cells.join("");
    }
    default:
      throw new Error(`unknown category: ${category}`);
  }
}

function svgFor(product) {
  const t = THEMES[product.category];
  if (!t) throw new Error(`no theme for category ${product.category}`);
  const lines = wrap(product.name, 13);
  const longest = Math.max(...lines.map((l) => l.length));
  const fs = Math.min(92, Math.floor(680 / (longest * 0.62)));
  const lh = Math.round(fs * 1.08);
  const top = 400 - ((lines.length - 1) * lh) / 2 + fs * 0.35;
  const tspans = lines
    .map((l, i) => `<tspan x="80" y="${Math.round(top + i * lh)}">${esc(l)}</tspan>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0a1020"/><stop offset="1" stop-color="#050810"/></linearGradient>
<linearGradient id="ac" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${t.a}"/><stop offset="1" stop-color="${t.b}"/></linearGradient>
<radialGradient id="glow" cx="0.78" cy="0.42" r="0.6"><stop offset="0" stop-color="${t.a}" stop-opacity="0.45"/><stop offset="1" stop-color="${t.a}" stop-opacity="0"/></radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
<g stroke="#1b2a47" stroke-opacity="0.45" stroke-width="1" fill="none">${grid()}</g>
<rect width="${W}" height="6" fill="url(#ac)"/>
<text x="80" y="128" font-family="${FONT}" font-size="26" font-weight="700" letter-spacing="6" fill="${t.b}">${esc(t.label.toUpperCase())}</text>
<rect x="80" y="150" width="64" height="6" rx="3" fill="url(#ac)"/>
<text font-family="${FONT}" font-size="${fs}" font-weight="800" fill="#e6eefc">${tspans}</text>
${motif(product.category, t)}
<text x="80" y="650" font-family="${FONT}" font-size="22" font-weight="700" letter-spacing="8" fill="#7f95b8">ARKFLAME</text>
</svg>`;
}

async function renderProduct(product) {
  const svg = Buffer.from(svgFor(product));
  const base = sharp(svg).resize(W, H).webp({ quality: 82, effort: 6 });
  const full = path.join(OUT_DIR, `${product.slug}.webp`);
  const variants = [
    [full, await base.toBuffer()],
    [path.join(OUT_DIR, `${product.slug}-720.webp`), await sharp(svg).resize(720, 432).webp({ quality: 82, effort: 6 }).toBuffer()],
    [path.join(OUT_DIR, `${product.slug}-480.webp`), await sharp(svg).resize(480, 288).webp({ quality: 80, effort: 6 }).toBuffer()],
  ];
  for (const [file, buf] of variants) {
    await writeFile(file, buf);
  }
  const small = variants[2][1].length;
  if (small > 12 * 1024) console.warn(`WARN ${product.slug}-480.webp is ${small} bytes (>12KB)`);
  return variants.map(([f]) => f);
}

async function updateArtwork(sizes) {
  let src = await readFile(ART_TS, "utf8");
  const start = src.indexOf("export const ARTWORK_SIZE");
  if (start < 0) throw new Error("ARTWORK_SIZE not found in artwork.ts");
  const close = src.indexOf("\n};", start);
  if (close < 0) throw new Error("ARTWORK_SIZE closing brace not found");
  const lines = [];
  for (const [slug, { width, height }] of sizes) {
    const present = new RegExp(`^\\s*"?${slug}"?:`, "m").test(src);
    if (present) continue;
    const key = slug.includes("-") ? `"${slug}"` : slug;
    lines.push(`  ${key}: { width: ${width}, height: ${height} },`);
  }
  if (lines.length === 0) return 0;
  src = src.slice(0, close) + "\n" + lines.join("\n") + src.slice(close);
  await writeFile(ART_TS, src);
  return lines.length;
}

const source = await readFile(PRODUCTS_TS, "utf8");
const re = /slug:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*category:\s*"([^"]+)"/g;
const products = [...source.matchAll(re)].map((m) => ({ slug: m[1], name: m[2], category: m[3] }));
if (products.length === 0) throw new Error("no products parsed from products.ts");

// A slug already has artwork if it has a measured ARTWORK_SIZE entry or a real
// file at the top level or under smp/ (checked, never overwritten).
const artSrc = await readFile(ART_TS, "utf8");
const todo = [];
for (const p of products) {
  const hasEntry = new RegExp(`^\\s*"?${p.slug}"?:`, "m").test(artSrc);
  const hasFile =
    (await exists(path.join(OUT_DIR, `${p.slug}.webp`))) ||
    (await exists(path.join(OUT_DIR, "smp", `${p.slug}.webp`)));
  if (!hasEntry && !hasFile) todo.push(p);
}
console.log(`products=${products.length} generating=${todo.length}`);

const sizes = [];
for (const p of todo) {
  const files = await renderProduct(p);
  const meta = await sharp(files[0]).metadata();
  sizes.push([p.slug, { width: meta.width, height: meta.height }]);
  console.log(`ok ${p.slug} ${meta.width}x${meta.height}`);
}

const added = await updateArtwork(sizes);
console.log(`artwork.ts entries added=${added}`);
