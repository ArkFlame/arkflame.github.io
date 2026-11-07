/**
 * Dated BuiltByBit store snapshot, keyed by product slug.
 *
 * Source: public creator page https://builtbybit.com/creators/linsaftw.152552/
 * (all three listing pages) and each product's store card. Values are copied as
 * shown on that date. A missing field means the store did not show it (for
 * example "Not yet rated" or no price line). `free: true` means the store card
 * showed no price and only a download count.
 *
 * Refresh by re-reading the creator pages and updating STATS_AS_OF with them.
 * This file is a snapshot, not a live feed. The build never fetches it.
 */
export const STATS_AS_OF = "2026-11-07";

export interface StoreStat {
  readonly price?: number;
  readonly free?: boolean;
  readonly rating?: number;
  readonly ratings?: number;
  readonly purchases?: number;
  readonly downloads?: number;
}

export const STORE_STATS: Record<string, StoreStat> = {
  exploitfixer: { price: 16.99, rating: 5, ratings: 46, purchases: 3325 },
  fairplay: { price: 49.99, rating: 5, ratings: 15, purchases: 65 },
  "authme-premium": { price: 9.99, rating: 5, ratings: 12, purchases: 390 },
  chatsentinel: { free: true, rating: 5, ratings: 9, downloads: 2909 },
  "chatsentinel-premium": { price: 4.99, rating: 4.5, ratings: 18, purchases: 465 },
  "aac-aacap-config": { price: 3, rating: 5, ratings: 6, purchases: 98 },
  redstonelimiter: { price: 11.99, rating: 5, ratings: 24, purchases: 1619 },
  flamestack: { price: 4.99, rating: 5, ratings: 5, purchases: 45 },
  mobstacker: { price: 5.99, rating: 5, ratings: 8, purchases: 399 },
  blocklimiter: { price: 5.99, rating: 5, ratings: 2, purchases: 58 },
  entitylimiter: { price: 5.99, rating: 5, ratings: 4, purchases: 244 },
  flamepaper: { price: 14.99, rating: 5, ratings: 42, purchases: 513 },
  flamecord: { price: 12.99, rating: 5, ratings: 175, purchases: 3632 },
  veloflame: { free: true, rating: 5, ratings: 13, downloads: 2145 },
  discordflow: { price: 8.99, rating: 5, ratings: 5, purchases: 83 },
  flamepractice: { price: 13.99, rating: 5, ratings: 4, purchases: 127 },
  floatingheads: { price: 4.99, rating: 5, ratings: 4, purchases: 87 },
  mineclans: { price: 4.99, rating: 5, ratings: 1, purchases: 113 },
  harvestableblocks: { price: 9.99, rating: 5, ratings: 5, purchases: 88 },
  essentialslite: { price: 9.99, rating: 5, ratings: 14, purchases: 313 },
  squidgamex: { price: 11.99, rating: 5, ratings: 3, purchases: 167 },
  disasters: { price: 14.99, rating: 5, ratings: 2, purchases: 41 },
  "sh-pets": { price: 9.99, rating: 4, ratings: 3, purchases: 23 },
  flamepearls: { price: 3.99, rating: 5, ratings: 12, purchases: 338 },
  fancyglow: { free: true, rating: 5, ratings: 5, downloads: 668 },
  mineclasses: { price: 4.99, rating: 5, ratings: 3, purchases: 74 },
  staffmodex: { price: 9.99, rating: 5, ratings: 6, purchases: 277 },
  slevels: { price: 6.99, rating: 5, ratings: 1, purchases: 12 },
  "leash-workers": { price: 9.99, purchases: 34 },
  "sh-koth": { free: true, rating: 5, ratings: 6, downloads: 200 },
  hubcombat: { free: true, rating: 5, ratings: 1, downloads: 262 },
  "lucky-pillars": { price: 9.99, rating: 4, ratings: 8, purchases: 95 },
  minekoth: { price: 4.99, rating: 5, ratings: 5, purchases: 134 },
  nextrtp: { free: true, rating: 5, ratings: 4, downloads: 243 },
  "crates-hcf": { price: 3.99, rating: 5, ratings: 2, purchases: 53 },
  flameforge: { price: 4.99, purchases: 0 },
  flameorders: { price: 9.99, rating: 5, ratings: 5, purchases: 38 },
  "smp-lifesteal": { price: 9.99, rating: 5, ratings: 1, purchases: 27 },
  "smp-protections": { price: 4.99, rating: 5, ratings: 4, purchases: 13 },
  "protectionstones-extras": { price: 5.99, rating: 5, ratings: 2, purchases: 59 },
  "smp-shards": { price: 8.99, rating: 5, ratings: 1, purchases: 30 },
  "smp-punishments": { price: 4.99, rating: 5, ratings: 2, purchases: 21 },
  "smp-weapons": { price: 9.99, rating: 5, ratings: 3, purchases: 13 },
  "smp-combat": { price: 4.99, rating: 5, ratings: 1, purchases: 33 },
  "smp-menus": { price: 3.99, rating: 5, ratings: 11, purchases: 16 },
  flamespawners: { price: 11.99, rating: 5, ratings: 2, purchases: 35 },
  "smp-lobby": { price: 4.99, rating: 5, ratings: 1, purchases: 29 },
  "smp-crates": { price: 4.99, rating: 5, ratings: 3, purchases: 6 },
  "smp-harvest": { price: 4.99, rating: 5, ratings: 2, purchases: 25 },
  "smp-regions": { price: 3.99, rating: 5, ratings: 2, purchases: 13 },
  "smp-rewards": { price: 4.99, rating: 5, ratings: 13, purchases: 1 },
  flameshop: { price: 7.99, purchases: 2 },
};

const USD = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

/** Formats a store price for display, for example 16.99 becomes "$16.99". */
export function formatPrice(n: number): string {
  return USD.format(n);
}
