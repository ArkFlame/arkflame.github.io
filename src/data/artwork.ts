/**
 * Intrinsic dimensions of shipped product artwork, measured from the real
 * WebP files in public/assets/img. Missing entries simply omit width/height.
 */
export interface ArtworkSize {
  readonly width: number;
  readonly height: number;
}

export const ARTWORK_SIZE: Readonly<Record<string, ArtworkSize>> = {
  "authme-premium": { width: 1600, height: 1067 },
  exploitfixer: { width: 512, height: 512 },
  fairplay: { width: 1600, height: 800 },
  flamecord: { width: 1672, height: 941 },
  veloflame: { width: 1600, height: 900 },
  essentialslite: { width: 2000, height: 1000 },
  "smp-lifesteal": { width: 1774, height: 887 },
  "smp-punishments": { width: 2000, height: 1000 },
  "smp-combat": { width: 2000, height: 1000 },
  "smp-menus": { width: 1774, height: 887 },
  "smp-harvest": { width: 2000, height: 1000 },
  "smp-regions": { width: 2000, height: 1000 },
  chatsentinel: { width: 1200, height: 720 },
  "chatsentinel-premium": { width: 1200, height: 720 },
  "aac-aacap-config": { width: 1200, height: 720 },
  flamestack: { width: 1672, height: 941 },
  mobstacker: { width: 1920, height: 1080 },
  blocklimiter: { width: 1024, height: 512 },
  discordflow: { width: 1200, height: 720 },
  floatingheads: { width: 1200, height: 720 },
  mineclans: { width: 1200, height: 720 },
  harvestableblocks: { width: 1200, height: 720 },
  squidgamex: { width: 1200, height: 720 },
  disasters: { width: 1200, height: 720 },
  "sh-pets": { width: 1200, height: 720 },
  flamepearls: { width: 1200, height: 720 },
  fancyglow: { width: 1200, height: 720 },
  mineclasses: { width: 1200, height: 720 },
  staffmodex: { width: 1200, height: 720 },
  slevels: { width: 1200, height: 720 },
  "leash-workers": { width: 1200, height: 720 },
  "sh-koth": { width: 1200, height: 720 },
  hubcombat: { width: 1200, height: 720 },
  "lucky-pillars": { width: 1200, height: 720 },
  minekoth: { width: 1200, height: 720 },
  nextrtp: { width: 1200, height: 720 },
  "crates-hcf": { width: 1200, height: 720 },
  flameforge: { width: 1200, height: 720 },
  flameorders: { width: 1200, height: 720 },
  "smp-protections": { width: 1200, height: 720 },
  "protectionstones-extras": { width: 1200, height: 720 },
  "smp-shards": { width: 1200, height: 720 },
  "smp-weapons": { width: 1200, height: 720 },
  flamespawners: { width: 1200, height: 720 },
  "smp-lobby": { width: 1200, height: 720 },
  "smp-crates": { width: 1200, height: 720 },
  "smp-rewards": { width: 1200, height: 720 },
  flameshop: { width: 1200, height: 720 },
  redstonelimiter: { width: 1200, height: 720 },
  entitylimiter: { width: 1280, height: 720 },
  flamepaper: { width: 1200, height: 720 },
  flamepractice: { width: 1200, height: 720 },
};

export function getArtworkSize(slug: string): ArtworkSize | undefined {
  return ARTWORK_SIZE[slug];
}

/** Responsive candidates generated next to the full artwork. */
export function getResponsiveSrcSet(src: string, size: ArtworkSize | undefined): string | undefined {
  if (size === undefined) return undefined;
  const base = src.replace(/\.webp$/, "");
  const candidates = [`${base}-480.webp 480w`];
  if (size.width > 720) candidates.push(`${base}-720.webp 720w`);
  candidates.push(`${src} ${size.width}w`);
  return candidates.join(", ");
}
