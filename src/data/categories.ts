import type { ProductCategory } from "./products";

export interface CategoryInfo {
  readonly slug: ProductCategory;
  readonly name: string;
  readonly title: string;
  readonly h1: string;
  /** One line. Used for meta description and category cards. */
  readonly intro: string;
  /** 80-120 words, shown at the top of the category page. */
  readonly overview: string;
  /** Who the category is for. Shown on each product page in this category. */
  readonly audience: string;
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
    overview:
      "Security plugins stop the abuse that causes crashes, dupes, bot floods and cheating. ExploitFixer filters crash, dupe and packet-exploit traffic before it reaches gameplay. FairPlay is a combat anticheat with 169+ checks that hooks into Grim. AuthMe Premium lets premium players skip the second login through a proxy bridge. ChatSentinel blocks swearing and spam with regex rules. ChatSentinel Premium and the AAC and AACAP configuration are tuned rule sets for those tools rather than new anticheat builds. Match the product to the abuse you see, then test alerts on a staging server before you enforce punishments.",
    audience:
      "Owners of public or semi-public servers who need to stop exploits, bot floods, cheating or login problems.",
    icon: "shield-lock",
    keywords: ["Anti-exploit", "Anticheat", "Authentication"],
    related: ["performance", "network"],
  },
  {
    slug: "performance",
    name: "Performance",
    title: "Minecraft Performance Plugins | ArkFlame Studios",
    h1: "Minecraft Performance Plugins",
    intro:
      "Server optimization tools for entity pressure, redstone abuse and runtime stability.",
    overview:
      "Performance plugins target the work that costs a server the most: entity counts, redstone machines and dense player builds. RedstoneLimiter cancels or throttles redstone activity that crosses configured limits, and its monitor mode measures load before you enforce anything. BlockLimiter caps block counts per chunk. EntityLimiter sets hard caps on entity counts. MobStacker and FlameStack merge mobs and ground items to reduce entity pressure. FlamePaper is a Paper 1.8.8 fork that replaces the server jar, so it is not a plugin. Measure TPS and tick time first, then add the limiter that matches the cost you see.",
    audience:
      "Server admins whose TPS drops come from entity counts, redstone machines or dense player-built structures.",
    icon: "gauge",
    keywords: ["Entity pressure", "Redstone limits", "Runtime optimization"],
    related: ["security", "network"],
  },
  {
    slug: "network",
    name: "Network",
    title: "Minecraft Proxy & Network Software | ArkFlame Studios",
    h1: "Minecraft Proxy & Network Software",
    intro:
      "Secure proxy software for Minecraft networks on Velocity and Bungee-compatible setups.",
    overview:
      "Network software guards the entry point of a Minecraft network. FlameCord is a BungeeCord and Waterfall-compatible proxy with anti-bot and anti-crash modules. It is proxy software, not a Bukkit plugin. VeloFlame is a Velocity fork with the same protection goal, adding whitelist, firewall and maintenance commands. DiscordFlow syncs roles, chat, proximity voice and console access between Minecraft and Discord. Pick the proxy by the ecosystem you already run: FlameCord for BungeeCord or Waterfall, VeloFlame for Velocity. Because the proxy takes the connections, keep backend ports reachable only from the proxy.",
    audience:
      "Operators running a proxy in front of one or more backend servers on BungeeCord, Waterfall or Velocity.",
    icon: "network",
    keywords: ["Velocity", "Bungee-compatible proxy software", "Anti-bot"],
    related: ["security", "performance"],
  },
  {
    slug: "gameplay",
    name: "Gameplay",
    title: "Minecraft Gameplay Plugins | ArkFlame Studios",
    h1: "Minecraft Gameplay Plugins",
    intro: "PvP, practice, minigame and player-facing systems for multiplayer Minecraft.",
    overview:
      "Gameplay plugins cover the systems players use directly: PvP practice, clans, classes, weapons, events and minigames. FlamePractice runs duels, ranked play and FFA. MineClans is a factions-style system with power, land claiming and alliances. MineClasses adds armor-based classes with automatic potion effects. FlameForge covers custom weapons, upgrades and reforging. For events, MineKoth and SH-Koth run hill-capture events and SquidGameX runs large Squid Game-style events. Disasters and Lucky Pillars are minigame implementations. Check each product page for its platform and dependencies before you install.",
    audience:
      "Server owners building PvP, practice, clan, event or minigame modes for players.",
    icon: "gamepad",
    keywords: ["PvP practice", "Clans and progression", "Minigames and events"],
    related: ["smp", "performance"],
  },
  {
    slug: "smp",
    name: "SMP",
    title: "Minecraft SMP Plugins | ArkFlame Studios",
    h1: "Minecraft SMP Plugins",
    intro: "Survival systems for combat, regions, farming, lifesteal, moderation, menus and progression.",
    overview:
      "SMP plugins cover the survival loop: land protection, combat, progression, farming, economy, moderation and menus. SMP Protections and ProtectionStones Extras handle claims, menus and region flags. SMP Regions is a WorldGuard-alternative region system. SMP Lifesteal, SMP Harvest and FlameSpawners add progression and farming. FlameShop covers shop, sell and worth for economy servers, and SMP Shards adds AFK-earned currency. SMP Punishments adds moderation with voice-chat mute support. Several SMP listings advertise Folia support. That is a listing claim; verify it on your own Folia server before relying on it.",
    audience:
      "Operators of survival servers who need protection, progression, economy or moderation systems.",
    icon: "tree",
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
