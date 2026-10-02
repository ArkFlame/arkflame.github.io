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
  eyebrow: "MINECRAFT INFRASTRUCTURE",
  h1: "We make Minecraft plugins.",
  body: "Security, performance, proxy infrastructure and gameplay systems for production Minecraft servers.",
  primaryCta: "Browse plugins",
  secondaryCta: "Meet the founder",
} as const;

export const PLATFORM_STRIP = [
  "Bukkit",
  "Spigot",
  "Paper",
  "Folia",
  "BungeeCord",
  "Velocity",
] as const;

export const CAPABILITIES = [
  {
    key: "security",
    label: "SECURITY",
    body: "Stop malicious clients and abusive traffic before they become downtime.",
    keywords: ["Anti-exploit", "Anticheat", "Authentication"],
    cta: "Explore security",
    href: "/plugins/security/",
  },
  {
    key: "performance",
    label: "PERFORMANCE",
    body: "Control expensive server behavior before it becomes a stability problem.",
    keywords: ["Entity pressure", "Redstone limits", "Runtime optimization"],
    cta: "Explore performance",
    href: "/plugins/performance/",
  },
  {
    key: "network",
    label: "NETWORK",
    body: "Protect and control the entry point to a Minecraft network.",
    keywords: ["Velocity", "Bungee-compatible proxy software", "Anti-bot"],
    cta: "Explore network",
    href: "/plugins/network/",
  },
  {
    key: "gameplay",
    label: "GAMEPLAY",
    body: "Build PvP, practice, minigame and player-facing systems for multiplayer servers.",
    keywords: ["Practice", "Minigames", "Player systems"],
    cta: "View",
    href: "/plugins/gameplay/",
  },
  {
    key: "smp",
    label: "SMP",
    body: "Add survival systems for combat, regions, progression, menus and server economies.",
    keywords: ["Combat", "Regions", "Progression"],
    cta: "View",
    href: "/plugins/smp/",
  },
] as const;

export const ENGINEERING_PROOF = {
  heading: "Built across the Minecraft server ecosystem.",
  platforms: ["Paper", "Folia", "Velocity", "BungeeCord"],
  disciplines: ["Packet handling", "Concurrency", "Compatibility", "Performance", "Security"],
  note: "Products span legacy and modern Minecraft environments. Verify compatibility on each product page.",
} as const;

export const FOUNDER = {
  eyebrow: "FOUNDER",
  name: "LinsaFTW",
  fullName: "Juan Cruz Linsalata — Founder & Developer",
  body: "Argentine software developer and the builder behind ArkFlame Studios and its Minecraft infrastructure products.",
  cta: "Meet LinsaFTW",
} as const;

export const FINAL_CTA = {
  heading: "Build a stronger Minecraft server.",
  body: "Explore security, performance and infrastructure software from ArkFlame Studios.",
  cta: "Browse plugins",
} as const;
