export type ProductCategory = "security" | "performance" | "network" | "gameplay" | "smp";

export interface Product {
  readonly slug: string;
  readonly name: string;
  readonly category: ProductCategory;
  readonly summary: string;
  readonly tags: readonly string[];
  readonly image?: string;
  readonly icon?: string;
  readonly officialUrl?: string;
  readonly storeUrl: string;
  readonly featured: boolean;
}

/** Canonical category order, frozen by the site taxonomy. */
export const CATEGORY_SLUGS: readonly ProductCategory[] = [
  "security",
  "performance",
  "network",
  "gameplay",
  "smp",
];

/** Single product authority. 51 records, grouped by category. */
export const PRODUCTS: readonly Product[] = [
  // security
  {
    slug: "exploitfixer",
    name: "ExploitFixer",
    category: "security",
    summary: "Protects servers from crash, dupe and packet-exploit abuse.",
    tags: ["Exploit protection", "Crash protection", "Dupe protection", "Packet abuse"],
    image: "/assets/img/products/exploitfixer.webp",
    icon: "/assets/img/product-icons/exploitfixer.webp",
    officialUrl: "https://exploitfixer.org/",
    storeUrl: "https://builtbybit.com/resources/exploitfixer-anti-crash-dupe-plugin.26463/",
    featured: true,
  },
  {
    slug: "fairplay",
    name: "FairPlay",
    category: "security",
    summary: "Combat anticheat with 140+ checks and Grim integration.",
    tags: ["Anticheat", "Combat", "140+ checks", "Grim"],
    image: "/assets/img/products/fairplay.webp",
    icon: "/assets/img/product-icons/fairplay.webp",
    officialUrl: "https://fairplay.arkflame.com/",
    storeUrl: "https://builtbybit.com/resources/fairplay-combat-anticheat.111265/",
    featured: true,
  },
  {
    slug: "authme-premium",
    name: "AuthMe Premium",
    category: "security",
    summary:
      "Auto-login bridge for premium players using AuthMe, with proxy/Geyser-oriented workflows.",
    tags: ["Authentication", "Premium support", "Geyser", "Proxy"],
    image: "/assets/img/products/authme-premium.webp",
    icon: "/assets/img/product-icons/authme-premium.webp",
    storeUrl: "https://builtbybit.com/resources/authme-premium-geyser-java.44493/",
    featured: true,
  },
  {
    slug: "chatsentinel",
    name: "ChatSentinel",
    category: "security",
    summary: "Regex-based anti-swear and anti-spam chat moderation.",
    tags: ["Chat moderation", "Anti-spam", "Regex"],
    storeUrl: "https://builtbybit.com/resources/chatsentinel-block-swearing-spamming.23698/",
    featured: false,
  },
  {
    slug: "chatsentinel-premium",
    name: "ChatSentinel Premium",
    category: "security",
    summary: "Premium smart chat-filter configuration for spam/swear protection.",
    tags: ["Chat moderation", "Smart filter", "Premium"],
    storeUrl: "https://builtbybit.com/resources/chatsentinel-premium-smart-chat-filter.9809/",
    featured: false,
  },
  {
    slug: "aac-aacap-config",
    name: "AAC + AACAP Balanced Configuration",
    category: "security",
    summary:
      "Balanced AAC/AACAP anticheat configuration focused on protection, performance and lower false positives.",
    tags: ["Anticheat", "Configuration", "AAC", "AACAP"],
    storeUrl: "https://builtbybit.com/resources/aac-aacap-balanced-anticheat-configuration.11147/",
    featured: false,
  },

  // performance
  {
    slug: "redstonelimiter",
    name: "RedstoneLimiter",
    category: "performance",
    summary: "Limits expensive redstone contraptions and exploit lag machines.",
    tags: ["Redstone", "Performance", "Lag prevention"],
    image: "/assets/img/products/redstonelimiter.webp",
    icon: "/assets/img/product-icons/redstonelimiter.webp",
    storeUrl: "https://builtbybit.com/resources/redstonelimiter-smart-redstone-limiter.23133/",
    featured: false,
  },
  {
    slug: "flamestack",
    name: "FlameStack",
    category: "performance",
    summary:
      "Stacks ground items and redstone-machine outputs to reduce server load; public listing advertises Folia support.",
    tags: ["Item stacking", "Redstone", "Performance", "Folia"],
    storeUrl: "https://builtbybit.com/resources/flamestack-optimize-performance.117945/",
    featured: false,
  },
  {
    slug: "mobstacker",
    name: "MobStacker",
    category: "performance",
    summary: "Stacks mobs to reduce entity pressure and server load.",
    tags: ["Entity performance", "Mob stacking", "Performance"],
    icon: "/assets/img/product-icons/mobstacker.webp",
    storeUrl: "https://builtbybit.com/resources/mobstacker-optimize-server-performance.23141/",
    featured: false,
  },
  {
    slug: "blocklimiter",
    name: "BlockLimiter",
    category: "performance",
    summary:
      "Limits block counts per chunk to control expensive server structures; public listing advertises Folia support.",
    tags: ["Block limits", "Performance", "Folia"],
    storeUrl: "https://builtbybit.com/resources/blocklimiter-optimize-performance.91119/",
    featured: false,
  },
  {
    slug: "entitylimiter",
    name: "EntityLimiter",
    category: "performance",
    summary: "Limits entity pressure to prevent crash/lag conditions.",
    tags: ["Entity limits", "Crash prevention", "Performance"],
    image: "/assets/img/products/entitylimiter.webp",
    icon: "/assets/img/product-icons/entitylimiter.webp",
    storeUrl: "https://builtbybit.com/resources/entitylimiter-optimize-performance.67164/",
    featured: false,
  },
  {
    slug: "flamepaper",
    name: "FlamePaper",
    category: "performance",
    summary:
      "Paper 1.8.8 fork focused on security, performance, stability, patches, knockback, tick loop and redstone behavior.",
    tags: ["Paper fork", "1.8.8", "Server stability", "Redstone"],
    image: "/assets/img/products/flamepaper.webp",
    icon: "/assets/img/product-icons/flamepaper.webp",
    storeUrl: "https://builtbybit.com/resources/flamepaper-high-performance.44405/",
    featured: false,
  },

  // network
  {
    slug: "flamecord",
    name: "FlameCord",
    category: "network",
    summary: "Secure BungeeCord/Waterfall-compatible replacement proxy with anti-bot/anti-crash focus.",
    tags: ["Proxy", "BungeeCord", "Waterfall", "Anti-bot"],
    image: "/assets/img/products/flamecord.webp",
    icon: "/assets/img/product-icons/flamecord.webp",
    officialUrl: "https://flamecord.com/",
    storeUrl: "https://builtbybit.com/resources/flamecord-ultimate-anti-bot-solution.13492/",
    featured: true,
  },
  {
    slug: "veloflame",
    name: "VeloFlame",
    category: "network",
    summary: "Velocity-based proxy focused on performance and protection against bot attacks.",
    tags: ["Velocity", "Proxy", "Anti-bot", "Performance"],
    image: "/assets/img/products/veloflame.webp",
    icon: "/assets/img/product-icons/veloflame.webp",
    officialUrl: "https://veloflame.com/",
    storeUrl: "https://builtbybit.com/resources/veloflame-secure-minecraft-proxy.80990/",
    featured: false,
  },
  {
    slug: "discordflow",
    name: "DiscordFlow",
    category: "network",
    summary: "Minecraft/Discord role sync, chat sync, proximity voice and console-access integration.",
    tags: ["Discord", "Role sync", "Chat sync", "Proximity voice"],
    storeUrl: "https://builtbybit.com/resources/discordflow-role-sync-chat-voice.79503/",
    featured: false,
  },

  // gameplay
  {
    slug: "flamepractice",
    name: "FlamePractice",
    category: "gameplay",
    summary: "PvP practice system for duels, ranked play and FFA.",
    tags: ["PvP", "Duels", "Ranked", "FFA"],
    image: "/assets/img/products/flamepractice.webp",
    icon: "/assets/img/product-icons/flamepractice.webp",
    storeUrl: "https://builtbybit.com/resources/flamepractice-duels-ranked-ffa.70252/",
    featured: false,
  },
  {
    slug: "floatingheads",
    name: "FloatingHeads",
    category: "gameplay",
    summary: "Floating-head visual/NPC/hologram effects for Minecraft servers.",
    tags: ["Visuals", "NPC", "Holograms"],
    storeUrl: "https://builtbybit.com/resources/floatingheads-14-effects-npc-holo.76533/",
    featured: false,
  },
  {
    slug: "mineclans",
    name: "MineClans",
    category: "gameplay",
    summary: "Factions-style clan system with power, land claiming, alliances and events.",
    tags: ["Clans", "Factions", "Land claiming", "Alliances"],
    storeUrl: "https://builtbybit.com/resources/mineclans-the-new-factions-plugin.52168/",
    featured: false,
  },
  {
    slug: "harvestableblocks",
    name: "HarvestableBlocks",
    category: "gameplay",
    summary:
      "Mining/farming zones with regenerating blocks/crops and WorldGuard-oriented workflows.",
    tags: ["Farming", "Regeneration", "WorldGuard"],
    storeUrl: "https://builtbybit.com/resources/harvestableblocks-block-farm-regen.70601/",
    featured: false,
  },
  {
    slug: "essentialslite",
    name: "EssentialsLite",
    category: "gameplay",
    summary: "Modern essentials command suite; current listing advertises Folia support.",
    tags: ["Essentials", "Commands", "Folia"],
    image: "/assets/img/products/smp/essentialslite.webp",
    icon: "/assets/img/product-icons/essentialslite.webp",
    storeUrl: "https://builtbybit.com/resources/essentialslite.34917/",
    featured: false,
  },
  {
    slug: "squidgamex",
    name: "SquidGameX",
    category: "gameplay",
    summary: "Runs large Squid Game-style Minecraft events.",
    tags: ["Events", "Minigames"],
    storeUrl: "https://builtbybit.com/resources/squidgamex-run-massive-events-no-lag.66200/",
    featured: false,
  },
  {
    slug: "disasters",
    name: "Disasters",
    category: "gameplay",
    summary: "Minecraft implementation inspired by Hypixel's Disasters minigame.",
    tags: ["Minigames", "Disasters"],
    storeUrl: "https://builtbybit.com/resources/disasters-hypixel-trendy-mini-game.61539/",
    featured: false,
  },
  {
    slug: "sh-pets",
    name: "SH-Pets",
    category: "gameplay",
    summary: "Companion/pet system with abilities and events.",
    tags: ["Pets", "Companions", "Abilities"],
    storeUrl: "https://builtbybit.com/resources/sh-pets-custom-abilities-events.80574/",
    featured: false,
  },
  {
    slug: "flamepearls",
    name: "FlamePearls",
    category: "gameplay",
    summary: "Fixes ender-pearl glitch behavior and supports stasis-chamber limiting.",
    tags: ["Ender pearls", "Glitch fix", "Stasis"],
    storeUrl: "https://builtbybit.com/resources/flamepearls-fix-ender-pearl-glitch.27842/",
    featured: false,
  },
  {
    slug: "fancyglow",
    name: "FancyGlow",
    category: "gameplay",
    summary: "Lets VIP players select glow colors using TAB integration.",
    tags: ["Glow", "TAB", "VIP"],
    storeUrl: "https://builtbybit.com/resources/fancyglow-menu-vault-tab.43517/",
    featured: false,
  },
  {
    slug: "mineclasses",
    name: "MineClasses",
    category: "gameplay",
    summary: "Armor-based MMORPG/HCF classes with automatic potion effects.",
    tags: ["Classes", "MMORPG", "HCF"],
    storeUrl: "https://builtbybit.com/resources/mineclasses-mmorpg-hcf-classes.66572/",
    featured: false,
  },
  {
    slug: "staffmodex",
    name: "StaffModeX",
    category: "gameplay",
    summary: "Staff-mode tooling with public listing support for HEX, Redis and MySQL.",
    tags: ["Staff mode", "HEX", "Redis", "MySQL"],
    storeUrl: "https://builtbybit.com/resources/staffmodex.42976/",
    featured: false,
  },
  {
    slug: "slevels",
    name: "sLevels",
    category: "gameplay",
    summary: "Server-level progression and rewards.",
    tags: ["Progression", "Rewards", "Levels"],
    storeUrl: "https://builtbybit.com/resources/slevels-levels-rewards.65139/",
    featured: false,
  },
  {
    slug: "leash-workers",
    name: "Leash Workers",
    category: "gameplay",
    summary: "Leashes entities/players and lets villagers perform configured jobs.",
    tags: ["Villagers", "Leashes", "Jobs"],
    storeUrl: "https://builtbybit.com/resources/leash-workers.117464/",
    featured: false,
  },
  {
    slug: "sh-koth",
    name: "SH-Koth",
    category: "gameplay",
    summary: "King-of-the-Hill event system.",
    tags: ["Events", "King of the Hill"],
    storeUrl: "https://builtbybit.com/resources/sh-koth.76419/",
    featured: false,
  },
  {
    slug: "hubcombat",
    name: "HubCombat",
    category: "gameplay",
    summary: "Adds lobby PvP and weapons.",
    tags: ["Lobby", "PvP", "Weapons"],
    storeUrl: "https://builtbybit.com/resources/hubcombat-add-pvp-to-your-lobby.65440/",
    featured: false,
  },
  {
    slug: "lucky-pillars",
    name: "Lucky Pillars",
    category: "gameplay",
    summary: "Pillars of Fortune minigame implementation.",
    tags: ["Minigames"],
    storeUrl: "https://builtbybit.com/resources/lucky-pillars-pillars-of-fortune-game.49289/",
    featured: false,
  },
  {
    slug: "minekoth",
    name: "MineKoth",
    category: "gameplay",
    summary: "Time-limited capture-the-hill events with rewards.",
    tags: ["Events", "Rewards", "Capture the hill"],
    storeUrl: "https://builtbybit.com/resources/minekoth-time-limited-events.59812/",
    featured: false,
  },
  {
    slug: "nextrtp",
    name: "NextRTP",
    category: "gameplay",
    summary: "Lightweight random-teleport plugin.",
    tags: ["Random teleport"],
    storeUrl: "https://builtbybit.com/resources/nextrtp.67544/",
    featured: false,
  },
  {
    slug: "crates-hcf",
    name: "Crates",
    category: "gameplay",
    summary: "HCF-oriented crate/reward system.",
    tags: ["Crates", "Rewards", "HCF"],
    storeUrl: "https://builtbybit.com/resources/crates-new-hcf-rewards-system.20411/",
    featured: false,
  },
  {
    slug: "flameforge",
    name: "FlameForge",
    category: "gameplay",
    summary: "Custom weapons, upgrades and reforging mechanics.",
    tags: ["Weapons", "Upgrades", "Reforging"],
    storeUrl: "https://builtbybit.com/resources/flameforge-weapons-upgrades-reforge.20292/",
    featured: false,
  },

  // smp
  {
    slug: "flameorders",
    name: "FlameOrders",
    category: "smp",
    summary:
      "Server-synchronized orders and deliveries; public listing advertises Folia support.",
    tags: ["Orders", "Deliveries", "Folia"],
    storeUrl: "https://builtbybit.com/resources/flameorders-server-sync-folia.118768/",
    featured: false,
  },
  {
    slug: "smp-lifesteal",
    name: "SMP Lifesteal",
    category: "smp",
    summary: "Lifesteal core for SMP progression; public listing advertises Folia support.",
    tags: ["Lifesteal", "Progression", "Folia"],
    image: "/assets/img/products/smp/smp-lifesteal.webp",
    storeUrl: "https://builtbybit.com/resources/smp-lifesteal.106855/",
    featured: false,
  },
  {
    slug: "smp-protections",
    name: "SMP Protections",
    category: "smp",
    summary: "ProtectionStones-style protection system with menus and Folia support.",
    tags: ["Protection", "Menus", "Folia"],
    storeUrl: "https://builtbybit.com/resources/smp-protections.110952/",
    featured: false,
  },
  {
    slug: "protectionstones-extras",
    name: "ProtectionStones Extras",
    category: "smp",
    summary: "GUI management, region flags and bans for ProtectionStones workflows.",
    tags: ["ProtectionStones", "GUI", "Region flags"],
    storeUrl: "https://builtbybit.com/resources/protectionstones-extras-menu-bans.79121/",
    featured: false,
  },
  {
    slug: "smp-shards",
    name: "SMP Shards",
    category: "smp",
    summary: "AFK-earned shard currency and shop system; public listing advertises Folia support.",
    tags: ["Currency", "Shop", "Folia"],
    storeUrl: "https://builtbybit.com/resources/smp-shards-afk-shop.117634/",
    featured: false,
  },
  {
    slug: "smp-punishments",
    name: "SMP Punishments",
    category: "smp",
    summary: "Punishment/moderation suite with voice-chat mute support.",
    tags: ["Moderation", "Punishments", "Voice mute"],
    image: "/assets/img/products/smp/smp-punishments.webp",
    storeUrl: "https://builtbybit.com/resources/smp-punishments-voice-mute-bans.103696/",
    featured: false,
  },
  {
    slug: "smp-weapons",
    name: "SMP Weapons",
    category: "smp",
    summary: "Configurable legendary weapons for SMP/PvP/FFA with premade weapons.",
    tags: ["Weapons", "PvP", "FFA"],
    storeUrl: "https://builtbybit.com/resources/smp-weapons.113979/",
    featured: false,
  },
  {
    slug: "smp-combat",
    name: "SMP Combat",
    category: "smp",
    summary: "Combat-tag system with legacy-combat, WorldGuard-barrier and elytra restrictions.",
    tags: ["Combat tags", "Legacy combat", "WorldGuard"],
    image: "/assets/img/products/smp/smp-combat.webp",
    storeUrl: "https://builtbybit.com/resources/smp-combat.103978/",
    featured: false,
  },
  {
    slug: "smp-menus",
    name: "SMP Menus",
    category: "smp",
    summary:
      "Help/rules menu system positioned as a modern DeluxeMenus alternative; current listing advertises Folia support.",
    tags: ["Menus", "Rules", "Folia"],
    image: "/assets/img/products/smp/smp-menus.webp",
    storeUrl: "https://builtbybit.com/resources/smp-menus.108152/",
    featured: false,
  },
  {
    slug: "flamespawners",
    name: "FlameSpawners",
    category: "smp",
    summary:
      "Item-producing configurable spawner system with stacking, storage/upgrades and public Folia support claim.",
    tags: ["Spawners", "Storage", "Folia"],
    storeUrl: "https://builtbybit.com/resources/flamespawners-folia-stack-storage.117473/",
    featured: false,
  },
  {
    slug: "smp-lobby",
    name: "SMP Lobby",
    category: "smp",
    summary: "Lobby system with PvP, announcements, protection, titles, redirect and void protection.",
    tags: ["Lobby", "PvP", "Protection"],
    storeUrl: "https://builtbybit.com/resources/smp-lobby-gadgets-pvp.116478/",
    featured: false,
  },
  {
    slug: "smp-crates",
    name: "SMP Crates",
    category: "smp",
    summary: "Modern configurable crates; current listing advertises Folia support.",
    tags: ["Crates", "Folia"],
    storeUrl: "https://builtbybit.com/resources/smp-crates.111623/",
    featured: false,
  },
  {
    slug: "smp-harvest",
    name: "SMP Harvest",
    category: "smp",
    summary: "Harvest progression with upgradable hoes, XP, tokens and rewards.",
    tags: ["Harvest", "Progression", "XP"],
    image: "/assets/img/products/smp/smp-harvest.webp",
    storeUrl: "https://builtbybit.com/resources/smp-harvest.26872/",
    featured: false,
  },
  {
    slug: "smp-regions",
    name: "SMP Regions",
    category: "smp",
    summary:
      "WorldGuard-alternative region system with extra flags and resettable areas; current listing advertises Folia support.",
    tags: ["Regions", "WorldGuard", "Folia"],
    image: "/assets/img/products/smp/smp-regions.webp",
    storeUrl: "https://builtbybit.com/resources/smp-regions.104646/",
    featured: false,
  },
  {
    slug: "smp-rewards",
    name: "SMP Rewards",
    category: "smp",
    summary:
      "Daily/hourly rewards with streak, menu and playtime mechanics; public listing advertises Folia support.",
    tags: ["Rewards", "Daily", "Playtime", "Folia"],
    storeUrl: "https://builtbybit.com/resources/smp-rewards.114143/",
    featured: false,
  },
];

// --- module-level integrity guards (throw at import time) ---

const CATEGORY_SLUG_SET: ReadonlySet<string> = new Set<string>(CATEGORY_SLUGS);

function assertHttpsUrl(productSlug: string, field: "storeUrl" | "officialUrl", value: string): void {
  if (!value.startsWith("https://")) {
    throw new Error(`products: ${productSlug}.${field} must be an https URL, received "${value}"`);
  }
  if (value.includes("#")) {
    throw new Error(`products: ${productSlug}.${field} must not contain "#", received "${value}"`);
  }
}

const SEEN_SLUGS: Set<string> = new Set<string>();

for (const product of PRODUCTS) {
  if (SEEN_SLUGS.has(product.slug)) {
    throw new Error(`products: duplicate product slug "${product.slug}"`);
  }
  SEEN_SLUGS.add(product.slug);

  if (CATEGORY_SLUG_SET.has(product.slug)) {
    throw new Error(`products: product slug "${product.slug}" collides with a category slug`);
  }

  assertHttpsUrl(product.slug, "storeUrl", product.storeUrl);
  if (product.officialUrl !== undefined) {
    assertHttpsUrl(product.slug, "officialUrl", product.officialUrl);
  }
}

// --- selectors ---

const PRODUCTS_BY_SLUG: ReadonlyMap<string, Product> = new Map(
  PRODUCTS.map((product) => [product.slug, product]),
);

const PRODUCTS_BY_CATEGORY: ReadonlyMap<ProductCategory, readonly Product[]> = (() => {
  const grouped = new Map<ProductCategory, Product[]>();
  for (const slug of CATEGORY_SLUGS) {
    grouped.set(slug, []);
  }
  for (const product of PRODUCTS) {
    grouped.get(product.category)?.push(product);
  }
  return grouped as ReadonlyMap<ProductCategory, readonly Product[]>;
})();

const FEATURED_PRODUCTS: readonly Product[] = PRODUCTS.filter((product) => product.featured);

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS_BY_SLUG.get(slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  const list = PRODUCTS_BY_CATEGORY.get(category);
  return list === undefined ? [] : [...list];
}

export function getFeaturedProducts(): Product[] {
  return [...FEATURED_PRODUCTS];
}
