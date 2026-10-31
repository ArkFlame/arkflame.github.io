export const SITE = {
  name: "ArkFlame Studios",
  shortName: "ArkFlame",
  siteUrl: "https://arkflame.com",
  ogImage: "/assets/img/og-image.webp",
  logo: "/assets/img/arkflame-logo.webp",
  founderImage: "/assets/img/linsaftw-profile.webp",
  founderName: "Juan Cruz Linsalata",
  founderHandle: "LinsaFTW",
  founderUrl: "https://linsaftw.arkflame.com/",
  githubUrl: "https://github.com/ArkFlame",
  builtByBitUrl: "https://builtbybit.com/creators/linsaftw.152552/",
  discordUrl: "https://discord.com/invite/gF36AT3",
  nonAffiliation:
    "Minecraft is a trademark of Mojang Studios. ArkFlame Studios is not affiliated with Mojang or Microsoft.",
  brandLine: "ArkFlame Studios builds Minecraft plugins.",
} as const;

export const HERO = {
  eyebrow: "MINECRAFT SERVER SOFTWARE",
  h1: "We make Minecraft plugins.",
  body: "Security, performance, proxy infrastructure and gameplay systems for production Minecraft servers. Documented from the source, with the limits stated.",
  primaryCta: "Browse plugins",
  secondaryCta: "Read the docs",
} as const;

/**
 * Platform names, not a blanket compatibility promise. The homepage caption and
 * every product page make the product-specific scope explicit.
 */
export const PLATFORM_STRIP = [
  { key: "bukkit", label: "Bukkit", logo: "/assets/img/vendor/bukkit.webp" },
  { key: "spigot", label: "Spigot", logo: "/assets/img/vendor/spigot.webp" },
  { key: "paper", label: "Paper", logo: "/assets/img/vendor/papermc.webp" },
  { key: "folia", label: "Folia", logo: "/assets/img/vendor/folia.webp" },
  { key: "bungeecord", label: "BungeeCord", logo: "/assets/img/vendor/bungeecord.webp" },
  { key: "velocity", label: "Velocity", logo: "/assets/img/vendor/velocity.webp" },
] as const;
