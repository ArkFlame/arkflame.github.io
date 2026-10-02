import type { ProductCategory } from "./products";

export interface CategoryInfo {
  readonly slug: ProductCategory;
  readonly name: string;
  readonly title: string;
  readonly h1: string;
  readonly intro: string;
  readonly closing: string;
  readonly icon: string;
  readonly keywords: readonly string[];
  readonly related: readonly ProductCategory[];
}

/** Frozen category copy, in site taxonomy order. */
export const CATEGORIES: readonly CategoryInfo[] = [
  {
    slug: "security",
    name: "Security",
    title: "Minecraft Security Plugins | ArkFlame Studios",
    h1: "Minecraft Security Plugins",
    intro:
      "Exploit protection, anticheat, authentication and abuse prevention for Minecraft servers and networks.",
    closing:
      "Security products stop bad traffic before it becomes downtime. The set covers crash and dupe exploit protection, packet abuse filtering, combat anticheat with Grim integration, premium authentication bridges for proxy and Geyser networks, regex and smart chat filtering, and balanced anticheat configurations tuned for fewer false positives.",
    icon: "bi-shield-lock",
    keywords: ["Anti-exploit", "Anticheat", "Authentication"],
    related: ["performance", "network"],
  },
  {
    slug: "performance",
    name: "Performance",
    title: "Minecraft Performance Plugins | ArkFlame Studios",
    h1: "Minecraft Performance Plugins",
    intro:
      "Server optimization tools for entity pressure, redstone abuse, runtime stability and high-load environments.",
    closing:
      "Performance products target the work that costs a server the most. Redstone and block limits cap expensive contraptions and dense structures, item and mob stacking reduce entity pressure, dedicated entity limits bound load directly, and a Paper 1.8.8 fork focuses on the tick loop, redstone behavior, knockback and long-running stability.",
    icon: "bi-speedometer2",
    keywords: ["Entity pressure", "Redstone limits", "Runtime optimization"],
    related: ["security", "network"],
  },
  {
    slug: "network",
    name: "Network",
    title: "Minecraft Proxy & Network Software | ArkFlame Studios",
    h1: "Minecraft Proxy & Network Software",
    intro:
      "Proxy infrastructure for secure Minecraft networks built around Velocity and Bungee-compatible environments.",
    closing:
      "Network software guards the entry point of a Minecraft network. FlameCord is proxy and server-jar software for BungeeCord and Waterfall environments, not a Bukkit or Paper plugin, with anti-bot and anti-crash focus. VeloFlame is the modern Velocity path with the same protection goal, and the rest of the set syncs roles, chat, proximity voice and console access between Minecraft and Discord.",
    icon: "bi-hdd-network",
    keywords: ["Velocity", "Bungee-compatible proxy software", "Anti-bot"],
    related: ["security", "performance"],
  },
  {
    slug: "gameplay",
    name: "Gameplay",
    title: "Minecraft Gameplay Plugins | ArkFlame Studios",
    h1: "Minecraft Gameplay Plugins",
    intro: "PvP, practice, minigame and player-facing systems built for multiplayer Minecraft.",
    closing:
      "Gameplay products cover the systems players actually touch: duel, ranked and FFA practice servers, faction clans with land claiming and alliances, armor-based classes, custom weapons with upgrades and reforging, lobby PvP, staff-mode tooling, level progression, pets with abilities, and event and minigame systems for large gatherings.",
    icon: "bi-controller",
    keywords: ["PvP practice", "Clans and progression", "Minigames and events"],
    related: ["smp", "performance"],
  },
  {
    slug: "smp",
    name: "SMP",
    title: "Minecraft SMP Plugins | ArkFlame Studios",
    h1: "Minecraft SMP Plugins",
    intro: "Survival systems for combat, regions, farming, lifesteal, moderation, menus and progression.",
    closing:
      "SMP products cover the full survival loop: region and claim protection with flag management, combat tags and lifesteal progression, configurable spawners and harvest farming with earnable currency, synchronized orders and deliveries, crates, shards, daily rewards and playtime streaks, plus menu, lobby, punishment and weapon systems that finish the server.",
    icon: "bi-tree",
    keywords: ["Land protection", "Survival progression", "Crates and currency"],
    related: ["gameplay", "security"],
  },
];

const CATEGORY_BY_SLUG: ReadonlyMap<string, CategoryInfo> = new Map(
  CATEGORIES.map((category) => [category.slug, category]),
);

export function getCategory(slug: string): CategoryInfo | undefined {
  return CATEGORY_BY_SLUG.get(slug);
}

export function getCategorySlugs(): readonly ProductCategory[] {
  return CATEGORIES.map((category) => category.slug);
}