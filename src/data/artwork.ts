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
  entitylimiter: { width: 1200, height: 720 },
  exploitfixer: { width: 512, height: 512 },
  fairplay: { width: 1600, height: 800 },
  flamecord: { width: 1672, height: 941 },
  flamepaper: { width: 1200, height: 720 },
  flamepractice: { width: 1200, height: 720 },
  redstonelimiter: { width: 1200, height: 720 },
  veloflame: { width: 1600, height: 900 },
  essentialslite: { width: 2000, height: 1000 },
  "smp-lifesteal": { width: 1774, height: 887 },
  "smp-punishments": { width: 2000, height: 1000 },
  "smp-combat": { width: 2000, height: 1000 },
  "smp-menus": { width: 1774, height: 887 },
  "smp-harvest": { width: 2000, height: 1000 },
  "smp-regions": { width: 2000, height: 1000 },
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
