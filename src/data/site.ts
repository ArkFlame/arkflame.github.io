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
  { key: "bukkit", label: "Bukkit", logo: "/assets/img/vendor/bukkit.webp" },
  { key: "spigot", label: "Spigot", logo: "/assets/img/vendor/spigot.webp" },
  { key: "paper", label: "Paper", logo: "/assets/img/vendor/papermc.webp" },
  { key: "folia", label: "Folia", logo: "/assets/img/vendor/folia.webp" },
  { key: "bungeecord", label: "BungeeCord", logo: "/assets/img/vendor/bungeecord.webp" },
  { key: "velocity", label: "Velocity", logo: "/assets/img/vendor/velocity.webp" },
] as const;

export const CAPABILITIES = [
  {
    key: "security",
    label: "SECURITY",
    href: "/plugins/security/",
    icon: "shield-lock",
  },
  {
    key: "performance",
    label: "PERFORMANCE",
    href: "/plugins/performance/",
    icon: "speedometer2",
  },
  {
    key: "network",
    label: "NETWORK",
    href: "/plugins/network/",
    icon: "diagram-3",
  },
  {
    key: "gameplay",
    label: "GAMEPLAY",
    href: "/plugins/gameplay/",
    icon: "controller",
  },
  {
    key: "smp",
    label: "SMP",
    href: "/plugins/smp/",
    icon: "boxes",
  },
] as const;

export const ENGINEERING_PROOF = {
  heading: "Built across the Minecraft server ecosystem.",
  platforms: [
    { key: "paper", label: "Paper", logo: "/assets/img/vendor/papermc.webp", url: "https://papermc.io/software/paper/" },
    { key: "folia", label: "Folia", logo: "/assets/img/vendor/folia.webp", url: "https://papermc.io/software/folia/" },
    { key: "velocity", label: "Velocity", logo: "/assets/img/vendor/velocity.webp", url: "https://papermc.io/software/velocity/" },
    { key: "bungeecord", label: "BungeeCord", logo: "/assets/img/vendor/bungeecord.webp", url: "https://www.spigotmc.org/wiki/bungeecord/" },
  ],
  note: "Our plugins support legacy to modern versions from 1.8 to 1.21. Folia is compatible in most plugins.",
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
