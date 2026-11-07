import { i as getCategory, n as $$Icon, u as createComponent } from "./BaseLayout_hYm0FrBI.mjs";
import { O as createAstro, c as renderComponent, g as maybeRenderHead, h as renderTemplate, v as addAttribute } from "./server_C1-8vluA.mjs";
import { t as PRODUCTS } from "./products_DHgwqqLo.mjs";
//#region src/data/product-details.ts
var INSPECTED = "Repository README and manifest, inspected 30 Oct 2026";
var PRODUCT_DETAILS = {
	exploitfixer: {
		description: "ExploitFixer filters crash, dupe and packet-abuse traffic before it reaches gameplay. It ships fourteen configurable modules, a packet watchdog and a packet limiter, and refuses to start without HamsterAPI.",
		highlights: [
			"Packet size and tab-complete limits",
			"Book-per-chunk limit and command blocker",
			"Violation thresholds with cancel and reduce actions",
			"Optional Discord webhook and in-game notifications"
		],
		compatibility: {
			platforms: ["Spigot", "Paper"],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}. HamsterAPI is a hard startup requirement even though plugin.yml lists it as a soft dependency.`
		},
		evidence: "repository"
	},
	fairplay: {
		description: "FairPlay is a PacketEvents-based combat anticheat for aim, reach and rotation checks. It integrates with GrimAC and Vulcan when they are installed, and runs without either.",
		highlights: [
			"Combat checks with per-check and per-category toggles",
			"Optional GrimAC and Vulcan hooks",
			"Aim-model recording and review windows",
			"Permission-scoped alerts, punishments and ban waves"
		],
		compatibility: {
			platforms: [
				"Bukkit",
				"Spigot",
				"Paper"
			],
			minecraft: "README states 1.8–1.21; the build targets spigot-api 1.21.11, so treat the range as a claim rather than a runtime result",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}. PacketEvents is a hard dependency. No runtime-version matrix ships with the repository.`
		},
		evidence: "repository"
	},
	"authme-premium": {
		description: "AuthMe Premium bridges a Bungee-compatible or Velocity proxy with AuthMe on the backend so premium players can skip the second login. It also supports a Velocity-only mode for AuthMe 6.0.0+ backends.",
		highlights: [
			"One universal jar for proxy and Bukkit, Paper or Folia backends",
			"Proxy UUID approval and bridge-token trust checks",
			"Optional Geyser, Floodgate and Redis integrations",
			"Documented command, permission and troubleshooting tables"
		],
		compatibility: {
			platforms: [
				"Bungee-compatible proxy",
				"Velocity",
				"Bukkit",
				"Paper",
				"Folia"
			],
			minecraft: "No single version range; requirements are driven by AuthMe and the proxy",
			java: "Backend runtime Java 17+ per repository install guide",
			folia: "declared",
			note: `${INSPECTED}. Folia support is declared in the Bukkit manifest; proxy and backend module versions differ.`
		},
		evidence: "repository"
	},
	chatsentinel: {
		description: "ChatSentinel applies regex rules to chat to block swearing and spam. It runs on Bukkit, BungeeCord and Velocity, with blacklist, whitelist and message configuration.",
		highlights: [
			"Regex-based chat filtering",
			"Blacklist and whitelist rule sets",
			"Bukkit, BungeeCord and Velocity entry points",
			"Fourteen permissions"
		],
		compatibility: {
			platforms: [
				"Bukkit",
				"BungeeCord",
				"Velocity"
			],
			minecraft: "No version range stated in the repository",
			folia: "declared",
			note: `${INSPECTED}. The Bukkit module declares api-version 1.13 and folia-supported; that is an API level, not a game-version guarantee.`
		},
		evidence: "repository"
	},
	"chatsentinel-premium": {
		description: "ChatSentinel Premium is a tuned smart chat-filter configuration for ChatSentinel, sold separately from the plugin. It targets spam and swearing without adding a new command surface.",
		highlights: [
			"Configuration product, not a separate plugin",
			"Smart filter rules for spam and swearing",
			"Requires the ChatSentinel plugin"
		],
		evidence: "listing"
	},
	"aac-aacap-config": {
		description: "A balanced AAC and AACAP anticheat configuration aimed at protection, performance and fewer false positives. It is a configuration set, not a new anticheat build.",
		highlights: [
			"Tuned AAC and AACAP settings",
			"Balances detection against false positives",
			"Does not include the anticheat itself"
		],
		evidence: "listing"
	},
	redstonelimiter: {
		description: "RedstoneLimiter watches redstone activations at block, sub-chunk, chunk and region scope, then cancels or throttles work that crosses configured limits. It also includes a monitor-only mode for measuring before enforcing.",
		highlights: [
			"Block, sub-chunk, chunk and 32×32-chunk region scopes",
			"Monitor mode that observes without cancelling",
			"Presets plus per-world and per-material overrides",
			"In-game GUI, statistics and notifications"
		],
		compatibility: {
			platforms: ["Bukkit", "Spigot"],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}. Folia scheduling is documented in docs/tutorial.md; the repository README is still boilerplate.`
		},
		evidence: "repository"
	},
	flamestack: {
		description: "FlameStack merges loose ground items and redstone-machine output into stacks to reduce entity pressure. It is built against the Bukkit, Spigot and Paper API 1.13+ with Folia support detected at runtime.",
		highlights: [
			"Ground-item and machine-output stacking",
			"Bukkit, Spigot and Paper API 1.13+",
			"Folia capability detection"
		],
		compatibility: {
			platforms: [
				"Bukkit",
				"Spigot",
				"Paper"
			],
			minecraft: "README states API 1.13+",
			java: "README states Java 8 bytecode",
			folia: "declared",
			note: `${INSPECTED}. Version 1.0.1 in the descriptor.`
		},
		evidence: "repository"
	},
	mobstacker: {
		description: "MobStacker merges nearby mobs of the same type to cut entity counts and the tick cost that comes with them. Two commands and a config file cover the stacking behaviour.",
		highlights: [
			"Same-type mob stacking",
			"Entity-count reduction",
			"Two commands and a config file"
		],
		compatibility: {
			platforms: ["Bukkit", "Spigot"],
			minecraft: "No version range stated in the repository",
			note: `${INSPECTED}. api-version 1.13 is the Bukkit API level, not a game-version claim.`
		},
		evidence: "repository"
	},
	blocklimiter: {
		description: "BlockLimiter caps block counts per chunk so dense player-built structures cannot dominate load and persistence cost. Limits are configured per block type.",
		highlights: [
			"Per-chunk block limits",
			"Per-block-type configuration",
			"Folia support"
		],
		compatibility: {
			platforms: ["Bukkit", "Spigot"],
			minecraft: "No version range stated in the repository",
			folia: "declared",
			note: `${INSPECTED}. Descriptor version 1.0.9.`
		},
		evidence: "repository"
	},
	entitylimiter: {
		description: "EntityLimiter sets hard caps on entity counts to stop crash and lag conditions caused by entity pressure. Eight configuration files cover limits, messages and behaviour.",
		highlights: [
			"Entity-count limits",
			"Crash and lag prevention",
			"Eight configuration files"
		],
		compatibility: {
			platforms: ["Bukkit", "Spigot"],
			minecraft: "No version range stated in the repository",
			java: "README references a 1.21.5 Spigot API build",
			folia: "declared",
			note: `${INSPECTED}. The README is build and behaviour notes rather than a user manual.`
		},
		evidence: "repository"
	},
	flamepaper: {
		description: "FlamePaper is a Paper 1.8.8 server fork carrying patches for stability, redstone behaviour, knockback and the tick loop. It replaces the server jar; it is not a plugin.",
		highlights: [
			"Paper 1.8.8 fork",
			"Stability and tick-loop patches",
			"Redstone and knockback changes",
			"Runs on Java 8"
		],
		compatibility: {
			platforms: ["Paper 1.8.8"],
			minecraft: "1.8.8",
			java: "JRE 8 per repository README",
			note: `${INSPECTED}. A fork replaces the server jar; it does not install into plugins/.`
		},
		evidence: "repository"
	},
	flamecord: {
		description: "FlameCord is a BungeeCord and Waterfall-compatible proxy fork with anti-bot and anti-crash modules. Its protocol table covers 1.8.x through 1.21.x plus 26.x, and its firewall defaults to enabled.",
		highlights: [
			"BungeeCord and Waterfall-compatible proxy",
			"Connection rate limits, account limits and latency thresholds",
			"Packet violation thresholds and kick rules",
			"Firewall integration through ipset and iptables"
		],
		compatibility: {
			platforms: ["BungeeCord", "Waterfall"],
			minecraft: "Protocol table covers 1.8.x–1.21.x and 26.x",
			java: "Compile target Java 17; not runtime guidance",
			note: `${INSPECTED}. The default firewall module runs ipset and iptables commands and needs a Linux host with root.`
		},
		evidence: "repository"
	},
	veloflame: {
		description: "VeloFlame is a Velocity fork focused on connection protection and proxy performance. It adds whitelist, firewall and maintenance commands on top of the upstream Velocity command set.",
		highlights: [
			"Velocity proxy fork",
			"Whitelist and firewall commands",
			"Maintenance mode with backend targeting",
			"Connection rate limiting and packet guards"
		],
		compatibility: {
			platforms: ["Velocity"],
			minecraft: "Protocol constants cover 1.7.2–26.3",
			java: "Build toolchain Java 25; not runtime guidance",
			note: `${INSPECTED}. The repository README is upstream Velocity-CTD text and names an artifact the build no longer emits.`
		},
		evidence: "repository"
	},
	discordflow: {
		description: "DiscordFlow connects a Minecraft network to Discord for role sync, chat sync, proximity voice and console access. It runs on Bukkit-family servers with a BungeeCord or Velocity bridge.",
		highlights: [
			"Discord role and chat sync",
			"Proximity voice integration",
			"Console access from Discord",
			"Bukkit, BungeeCord and Velocity modules"
		],
		compatibility: {
			platforms: [
				"Spigot",
				"Paper",
				"BungeeCord",
				"Velocity"
			],
			minecraft: "README states 1.8–1.21+",
			java: "README requires Java 11 or newer",
			note: `${INSPECTED}. JDA is bundled in the universal artifact.`
		},
		evidence: "repository"
	},
	flamepractice: {
		description: "FlamePractice runs duel, ranked and FFA practice on a Spigot-based server. Arenas, queues, kits and player state are covered by five configuration files and a large command surface.",
		highlights: [
			"Duels, ranked queues and FFA",
			"Arena and kit configuration",
			"Thirty commands and forty-eight permissions"
		],
		compatibility: {
			platforms: ["Spigot"],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}. Built against Spigot API 1.13.2.`
		},
		evidence: "repository"
	},
	floatingheads: {
		description: "FloatingHeads renders floating heads, NPC-style displays and holograms. It depends on PacketEvents and is configured through a main config plus example head definitions.",
		highlights: [
			"Floating head and hologram displays",
			"PacketEvents dependency",
			"Example head configuration"
		],
		compatibility: {
			platforms: [
				"Bukkit",
				"Spigot",
				"Paper"
			],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 17; not runtime guidance",
			note: `${INSPECTED}. The local directory is Smarts-Hub/Floating-Heads.`
		},
		evidence: "repository"
	},
	mineclans: {
		description: "MineClans provides clans with power, land claiming, alliances and events. It integrates with PlaceholderAPI, Vault, Dynmap, WorldGuard and PacketEvents when those plugins are present.",
		highlights: [
			"Clan creation, power and alliances",
			"Land claiming",
			"Optional PlaceholderAPI, Vault, Dynmap and WorldGuard hooks"
		],
		compatibility: {
			platforms: ["Bukkit", "Spigot"],
			minecraft: "No version range stated in the repository",
			note: `${INSPECTED}. The repository README is empty; features come from the descriptor and config.`
		},
		evidence: "repository"
	},
	harvestableblocks: {
		description: "HarvestableBlocks defines mining and farming zones whose blocks and crops regenerate after harvest. Zone protection plugins can govern where the loops run.",
		highlights: [
			"Regenerating mining and farming zones",
			"Twenty-six permissions",
			"Works alongside zone protection plugins"
		],
		compatibility: {
			platforms: ["Bukkit", "Spigot"],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}.`
		},
		evidence: "repository"
	},
	essentialslite: {
		description: "EssentialsLite is a broad essentials command suite covering teleports, homes, kits, warps and administration. It ships command, permission, menu, Redis and RTP-zone configuration.",
		highlights: [
			"Around one hundred commands and eighty-five permissions",
			"Homes, warps, kits and teleports",
			"Menus, Redis support and RTP zones"
		],
		compatibility: {
			platforms: ["Bukkit", "Spigot"],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}. Content is derived from descriptors and bundled config; the project has no README.`
		},
		evidence: "repository"
	},
	squidgamex: {
		description: "SquidGameX runs large Squid Game-style events with a set of game and configuration files. It is built for Bukkit, Spigot, Paper and Folia servers.",
		highlights: [
			"Squid Game-style event rounds",
			"Ten-plus game and configuration files",
			"Folia support"
		],
		compatibility: {
			platforms: [
				"Bukkit",
				"Spigot",
				"Paper"
			],
			minecraft: "No version range stated in the repository",
			folia: "declared",
			note: `${INSPECTED}.`
		},
		evidence: "repository"
	},
	disasters: {
		description: "Disasters implements a Hypixel-style Disasters minigame on Paper. The current source targets Paper 26.2 and Java 25, and requires WorldEdit.",
		highlights: [
			"Disasters minigame rounds",
			"Seven configuration files",
			"WorldEdit dependency"
		],
		compatibility: {
			platforms: ["Paper 26.2"],
			minecraft: "Paper 26.2",
			java: "Java 25 per repository README",
			note: `${INSPECTED}. Both the README and plugin.yml target 26.2; no older-version claim is made.`
		},
		evidence: "repository"
	},
	"sh-pets": {
		description: "SH-Pets adds companion pets with abilities and events. Ten pet definition files and a level curve sit behind a PacketEvents dependency.",
		highlights: [
			"Companion pets with abilities",
			"Ten pet definition files",
			"Level and language configuration"
		],
		compatibility: {
			platforms: ["Bukkit", "Spigot"],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}. PacketEvents is a hard dependency.`
		},
		evidence: "repository"
	},
	flamepearls: {
		description: "FlamePearls corrects ender-pearl movement glitches and supports limiting stasis chambers. Behaviour is controlled from a single config file.",
		highlights: [
			"Ender-pearl glitch fixes",
			"Stasis-chamber limiting",
			"Single config file"
		],
		compatibility: {
			platforms: ["Bukkit", "Spigot"],
			minecraft: "No version range stated in the repository",
			folia: "declared",
			note: `${INSPECTED}. The repository README is title-only.`
		},
		evidence: "repository"
	},
	fancyglow: {
		description: "FancyGlow lets eligible players choose a glow colour through a menu, with TAB as the display integration. Glow definitions, menus and messages are configurable.",
		highlights: [
			"Player-selected glow colours",
			"TAB display integration",
			"Twenty-six permissions"
		],
		compatibility: {
			platforms: ["Bukkit", "Spigot"],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 17; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}. Version 4.1.0 in the descriptor.`
		},
		evidence: "repository"
	},
	mineclasses: {
		description: "MineClasses assigns MMORPG or HCF classes through armour and applies their potion effects automatically. Class definitions and messages are configurable.",
		highlights: [
			"Armour-based class selection",
			"Automatic potion effects",
			"MMORPG and HCF modes"
		],
		compatibility: {
			platforms: ["Bukkit", "Spigot"],
			minecraft: "No version range stated in the repository",
			note: `${INSPECTED}. The repository README is title-only.`
		},
		evidence: "repository"
	},
	staffmodex: {
		description: "StaffModeX provides staff-mode inventories, moderation tools and optional BungeeCord or Velocity awareness. Commands, permissions and configuration are documented.",
		highlights: [
			"Staff-mode inventories and tools",
			"Optional BungeeCord and Velocity modules",
			"Local command, permission and configuration docs"
		],
		compatibility: {
			platforms: [
				"Bukkit",
				"BungeeCord",
				"Velocity"
			],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}.`
		},
		evidence: "repository"
	},
	slevels: {
		description: "sLevels adds server-wide level progression with rewards. Levels are defined in configuration and can run on Spigot, Paper or Folia.",
		highlights: [
			"Server-level progression",
			"Configurable level rewards",
			"Twenty-one permissions"
		],
		compatibility: {
			platforms: [
				"Spigot",
				"Paper",
				"Folia"
			],
			minecraft: "README states 1.8.8–1.21.x",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}.`
		},
		evidence: "repository"
	},
	"leash-workers": {
		description: "Leash Workers lets players leash entities and assigns configured jobs to villagers. It depends on PacketEvents and ships five commands with twenty-five permissions.",
		highlights: [
			"Entity and player leashing",
			"Villager job assignments",
			"PacketEvents dependency"
		],
		compatibility: {
			platforms: [
				"Bukkit",
				"Spigot",
				"Paper"
			],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}. Local directory is ArkFlame/SMP-Leash; descriptor name is LeashWorkers.`
		},
		evidence: "repository"
	},
	"sh-koth": {
		description: "SH-Koth runs King-of-the-Hill events with Folia support. Operational documentation is maintained by the author.",
		highlights: [
			"King-of-the-Hill event format",
			"Folia support",
			"External documentation"
		],
		compatibility: {
			platforms: ["Bukkit", "Spigot"],
			minecraft: "No version range stated in the repository",
			java: "Build toolchain Java 21; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}.`
		},
		evidence: "repository"
	},
	hubcombat: {
		description: "HubCombat adds PvP and weapons to a lobby server. It targets Paper 1.21.7 with Java 21 and exposes a reload command plus an admin permission.",
		highlights: [
			"Lobby PvP and weapons",
			"Paper 1.21.7 build",
			"Reload command and admin permission"
		],
		compatibility: {
			platforms: ["Paper"],
			minecraft: "Paper 1.21.7",
			java: "Java 21",
			note: `${INSPECTED}. Version and API come from the Gradle paperweight bundle.`
		},
		evidence: "repository"
	},
	"lucky-pillars": {
		description: "Lucky Pillars implements the Pillars of Fortune minigame. Five commands, twenty-four permissions and configuration for GUIs, hotbars, messages and scoreboards are included.",
		highlights: [
			"Pillars of Fortune rounds",
			"GUI, hotbar and scoreboard configuration",
			"Folia support"
		],
		compatibility: {
			platforms: ["Paper"],
			minecraft: "Built against Paper API 1.20.4",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}. PlaceholderAPI and TAB are hard dependencies.`
		},
		evidence: "repository"
	},
	minekoth: {
		description: "MineKoth runs time-limited capture-the-hill events with rewards. It integrates with Vault, MineClans, UltimateClans, holograms, PlaceholderAPI and TAB when present.",
		highlights: [
			"Timed capture-the-hill events",
			"Reward configuration",
			"Clan, hologram and placeholder integrations"
		],
		compatibility: {
			platforms: ["Bukkit", "Spigot"],
			minecraft: "No version range stated in the repository",
			note: `${INSPECTED}.`
		},
		evidence: "repository"
	},
	nextrtp: {
		description: "NextRTP is a lightweight random-teleport plugin for Minecraft servers. Send players to a random destination without a heavy command surface.",
		highlights: ["Random player teleport", "Lightweight command surface"],
		evidence: "listing"
	},
	"crates-hcf": {
		description: "Crates is an HCF-oriented crate and reward system. The plugin descriptor covers a single command and requires HolographicDisplays.",
		highlights: [
			"Crate and reward loop",
			"HCF server focus",
			"HolographicDisplays dependency"
		],
		compatibility: {
			platforms: ["Bukkit", "Spigot"],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 8; not runtime guidance",
			note: `${INSPECTED}. Local directory is ArkFlame/Crates.`
		},
		evidence: "repository"
	},
	flameforge: {
		description: "FlameForge adds custom weapons, upgrades and reforging. It documents Spigot, Paper and Folia support across 1.8.8 to 1.21.x and ships twenty-two permissions.",
		highlights: [
			"Custom weapons and upgrades",
			"Reforging mechanics",
			"Six configuration files"
		],
		compatibility: {
			platforms: [
				"Bukkit",
				"Spigot",
				"Paper"
			],
			minecraft: "README table states 1.8.8–1.21.x",
			java: "README states Java 8+ bytecode",
			folia: "declared",
			note: `${INSPECTED}.`
		},
		evidence: "repository"
	},
	flameorders: {
		description: "FlameOrders provides server-synchronized orders and deliveries, with storage and network modes. It ships a command and permission table and supports Folia.",
		highlights: [
			"Synchronized orders and deliveries",
			"Storage and network modes",
			"Folia support"
		],
		compatibility: {
			platforms: ["Bukkit", "Spigot"],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}. A legacy DonutOrders descriptor also exists in the tree.`
		},
		evidence: "repository"
	},
	flameshop: {
		description: "FlameShop adds inventory shops, a sell basket, a worth catalog and cross-shop search for Economy SMP servers. Its store listing describes Vault economy support and Folia scheduling.",
		highlights: [
			"Inventory shops with buy and sell menus",
			"Sell basket and worth catalog",
			"Search, favourites and top sellers",
			"Permission-based price modifiers"
		],
		compatibility: {
			platforms: [
				"Bukkit",
				"Spigot",
				"Paper",
				"Folia",
				"Purpur"
			],
			minecraft: "Store listing states 1.8 to 26.3; not verified against a repository",
			folia: "declared",
			note: "Public BuiltByBit listing only, read 7 Nov 2026. No repository or runtime check."
		},
		evidence: "listing"
	},
	"smp-lifesteal": {
		description: "SMP Lifesteal adds health-based combat progression for survival servers. It ships nine commands, a large permission tree and six configuration files, and documents 1.8.8–1.21.x support.",
		highlights: [
			"Lifesteal combat progression",
			"Nine commands and 102 permissions",
			"Six configuration files"
		],
		compatibility: {
			platforms: [
				"Bukkit",
				"Spigot",
				"Paper",
				"Purpur",
				"Folia"
			],
			minecraft: "README states 1.8.8–1.21.x",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}. Jar version 1.1.5.`
		},
		evidence: "repository"
	},
	"smp-protections": {
		description: "SMP Protections provides ProtectionStones-style claims with menus. It requires SMP Regions at runtime and is configured through a main config and messages file.",
		highlights: [
			"Claim protection with menus",
			"SMP Regions runtime dependency",
			"Eight permissions"
		],
		compatibility: {
			platforms: ["Bukkit", "Spigot"],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}. SMP Regions is a hard dependency.`
		},
		evidence: "repository"
	},
	"protectionstones-extras": {
		description: "ProtectionStones Extras adds GUI management, region flags and bans to ProtectionStones. It requires WorldGuard and ProtectionStones and declares twelve subcommands.",
		highlights: [
			"GUI region management",
			"Region flags and bans",
			"WorldGuard and ProtectionStones dependencies"
		],
		compatibility: {
			platforms: ["Bukkit", "Spigot"],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 17; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}.`
		},
		evidence: "repository"
	},
	"smp-shards": {
		description: "SMP Shards adds an AFK-earned shard currency and a shop that spends it. The current source targets Paper and Folia 1.21.4+ and ships nine configuration files.",
		highlights: [
			"AFK-earned shard currency",
			"Shop and pricing configuration",
			"Nine configuration files"
		],
		compatibility: {
			platforms: [
				"Paper",
				"Purpur",
				"Folia"
			],
			minecraft: "README states 1.21.4+",
			java: "Java 21 per repository",
			folia: "declared",
			note: `${INSPECTED}.`
		},
		evidence: "repository"
	},
	"smp-punishments": {
		description: "SMP Punishments covers bans, kicks, mutes and warnings, with an optional voice-chat mute hook. Twenty-five commands and thirty-eight permissions cover the suite.",
		highlights: [
			"Bans, kicks, mutes and warnings",
			"Optional voice-chat mute",
			"Twenty-five commands and thirty-eight permissions"
		],
		compatibility: {
			platforms: ["Bukkit", "Spigot"],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}.`
		},
		evidence: "repository"
	},
	"smp-weapons": {
		description: "SMP Weapons adds configurable legendary weapons for SMP, PvP and FFA play. Arsenal menus, item definitions and messages are included.",
		highlights: [
			"Legendary weapon definitions",
			"Arsenal menus and messages",
			"Fourteen permissions"
		],
		compatibility: {
			platforms: [
				"Bukkit",
				"Spigot",
				"Paper"
			],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}. Jar version 1.1.5.`
		},
		evidence: "repository"
	},
	"smp-combat": {
		description: "SMP Combat adds combat tags with legacy-combat, WorldGuard-barrier and elytra restrictions. Ten configuration files cover the rules.",
		highlights: [
			"Combat tagging",
			"Legacy-combat and elytra rules",
			"WorldGuard barrier integration"
		],
		compatibility: {
			platforms: [
				"Bukkit",
				"Spigot",
				"Paper"
			],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}. Built against Paper API 1.21.4.`
		},
		evidence: "repository"
	},
	"smp-menus": {
		description: "SMP Menus provides help and rules menus as an alternative to DeluxeMenus. Menus are defined in configuration with a menu-driven interface.",
		highlights: [
			"Configurable help and rules menus",
			"Menu-driven interface",
			"Folia support"
		],
		compatibility: {
			platforms: [
				"Bukkit",
				"Spigot",
				"Paper"
			],
			minecraft: "README states Bukkit 1.8+",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}.`
		},
		evidence: "repository"
	},
	flamespawners: {
		description: "FlameSpawners adds configurable spawners with stacking, storage and upgrades. Six configuration files and forty-five permissions cover the item-producing spawner loop.",
		highlights: [
			"Configurable item-producing spawners",
			"Stacking, storage and upgrades",
			"Forty-five permissions"
		],
		compatibility: {
			platforms: [
				"Bukkit",
				"Spigot",
				"Paper"
			],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}.`
		},
		evidence: "repository"
	},
	"smp-lobby": {
		description: "SMP Lobby builds a lobby server with PvP, announcements, protection, titles, redirect and void protection. It ships twelve commands, thirty-six permissions and more than ten configuration files.",
		highlights: [
			"Lobby PvP and protection",
			"Titles, announcements and redirect",
			"BungeeCord and Velocity redirect support"
		],
		compatibility: {
			platforms: [
				"Bukkit",
				"Spigot",
				"Paper"
			],
			minecraft: "No version range stated in the repository",
			java: "Java 8 per repository README",
			folia: "declared",
			note: `${INSPECTED}. Version 2.1.8.`
		},
		evidence: "repository"
	},
	"smp-crates": {
		description: "SMP Crates is a configurable crate system. It documents Bukkit, Spigot and Paper 1.8–1.21+ support and declares Folia compatibility.",
		highlights: [
			"Configurable crate rewards",
			"Three commands and twenty-three permissions",
			"Folia support"
		],
		compatibility: {
			platforms: [
				"Bukkit",
				"Spigot",
				"Paper"
			],
			minecraft: "README states 1.8–1.21+",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}.`
		},
		evidence: "repository"
	},
	"smp-harvest": {
		description: "SMP Harvest adds harvest progression with upgradable hoes, XP, tokens and rewards. Eight configuration files and thirty-two permissions cover the loop.",
		highlights: [
			"Upgradable hoes and harvest XP",
			"Tokens and reward configuration",
			"Thirty-two permissions"
		],
		compatibility: {
			platforms: ["Bukkit", "Spigot"],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}. The repository has no user README.`
		},
		evidence: "repository"
	},
	"smp-regions": {
		description: "SMP Regions is a region system positioned as a WorldGuard alternative, with extra flags and resettable areas. It targets 1.8 through 1.21.11 and declares Folia support.",
		highlights: [
			"Regions with flags and resets",
			"Thirty-four permissions",
			"WorldGuard alternative"
		],
		compatibility: {
			platforms: [
				"Bukkit",
				"Spigot",
				"Paper"
			],
			minecraft: "README states target compatibility 1.8–1.21.11",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}.`
		},
		evidence: "repository"
	},
	"smp-rewards": {
		description: "SMP Rewards adds daily and hourly rewards with streaks, menus and playtime tracking. Four commands and ten permissions cover configuration and player access.",
		highlights: [
			"Daily and hourly rewards",
			"Streaks and playtime tracking",
			"Folia-aware scheduling"
		],
		compatibility: {
			platforms: [
				"Bukkit",
				"Spigot",
				"Paper"
			],
			minecraft: "No version range stated in the repository",
			java: "Compile target Java 8; not runtime guidance",
			folia: "declared",
			note: `${INSPECTED}.`
		},
		evidence: "repository"
	}
};
var PRODUCT_SLUGS = new Set(PRODUCTS.map((product) => product.slug));
var DETAIL_SLUGS = Object.keys(PRODUCT_DETAILS);
if (DETAIL_SLUGS.length !== PRODUCT_SLUGS.size) throw new Error(`product-details: expected ${PRODUCT_SLUGS.size} entries, found ${DETAIL_SLUGS.length}`);
for (const product of PRODUCTS) {
	const detail = PRODUCT_DETAILS[product.slug];
	if (detail === void 0) throw new Error(`product-details: missing entry for product "${product.slug}"`);
	if (detail.description.trim().length < 40) throw new Error(`product-details: description too short for "${product.slug}"`);
	if (detail.highlights.length === 0) throw new Error(`product-details: no highlights for "${product.slug}"`);
}
for (const slug of DETAIL_SLUGS) if (!PRODUCT_SLUGS.has(slug)) throw new Error(`product-details: entry "${slug}" does not match a catalog product`);
function getProductDetail(product) {
	const detail = PRODUCT_DETAILS[product.slug];
	if (detail === void 0) throw new Error(`product-details: missing entry for product "${product.slug}"`);
	return detail;
}
//#endregion
//#region src/data/artwork.ts
var ARTWORK_SIZE = {
	"authme-premium": {
		width: 1600,
		height: 1067
	},
	entitylimiter: {
		width: 1200,
		height: 720
	},
	exploitfixer: {
		width: 512,
		height: 512
	},
	fairplay: {
		width: 1600,
		height: 800
	},
	flamecord: {
		width: 1672,
		height: 941
	},
	flamepaper: {
		width: 1200,
		height: 720
	},
	flamepractice: {
		width: 1200,
		height: 720
	},
	redstonelimiter: {
		width: 1200,
		height: 720
	},
	veloflame: {
		width: 1600,
		height: 900
	},
	essentialslite: {
		width: 2e3,
		height: 1e3
	},
	"smp-lifesteal": {
		width: 1774,
		height: 887
	},
	"smp-punishments": {
		width: 2e3,
		height: 1e3
	},
	"smp-combat": {
		width: 2e3,
		height: 1e3
	},
	"smp-menus": {
		width: 1774,
		height: 887
	},
	"smp-harvest": {
		width: 2e3,
		height: 1e3
	},
	"smp-regions": {
		width: 2e3,
		height: 1e3
	},
	chatsentinel: {
		width: 1200,
		height: 720
	},
	"chatsentinel-premium": {
		width: 1200,
		height: 720
	},
	"aac-aacap-config": {
		width: 1200,
		height: 720
	},
	flamestack: {
		width: 1200,
		height: 720
	},
	mobstacker: {
		width: 1200,
		height: 720
	},
	blocklimiter: {
		width: 1200,
		height: 720
	},
	discordflow: {
		width: 1200,
		height: 720
	},
	floatingheads: {
		width: 1200,
		height: 720
	},
	mineclans: {
		width: 1200,
		height: 720
	},
	harvestableblocks: {
		width: 1200,
		height: 720
	},
	squidgamex: {
		width: 1200,
		height: 720
	},
	disasters: {
		width: 1200,
		height: 720
	},
	"sh-pets": {
		width: 1200,
		height: 720
	},
	flamepearls: {
		width: 1200,
		height: 720
	},
	fancyglow: {
		width: 1200,
		height: 720
	},
	mineclasses: {
		width: 1200,
		height: 720
	},
	staffmodex: {
		width: 1200,
		height: 720
	},
	slevels: {
		width: 1200,
		height: 720
	},
	"leash-workers": {
		width: 1200,
		height: 720
	},
	"sh-koth": {
		width: 1200,
		height: 720
	},
	hubcombat: {
		width: 1200,
		height: 720
	},
	"lucky-pillars": {
		width: 1200,
		height: 720
	},
	minekoth: {
		width: 1200,
		height: 720
	},
	nextrtp: {
		width: 1200,
		height: 720
	},
	"crates-hcf": {
		width: 1200,
		height: 720
	},
	flameforge: {
		width: 1200,
		height: 720
	},
	flameorders: {
		width: 1200,
		height: 720
	},
	"smp-protections": {
		width: 1200,
		height: 720
	},
	"protectionstones-extras": {
		width: 1200,
		height: 720
	},
	"smp-shards": {
		width: 1200,
		height: 720
	},
	"smp-weapons": {
		width: 1200,
		height: 720
	},
	flamespawners: {
		width: 1200,
		height: 720
	},
	"smp-lobby": {
		width: 1200,
		height: 720
	},
	"smp-crates": {
		width: 1200,
		height: 720
	},
	"smp-rewards": {
		width: 1200,
		height: 720
	},
	flameshop: {
		width: 1200,
		height: 720
	}
};
function getArtworkSize(slug) {
	return ARTWORK_SIZE[slug];
}
/** Responsive candidates generated next to the full artwork. */
function getResponsiveSrcSet(src, size) {
	if (size === void 0) return void 0;
	const base = src.replace(/\.webp$/, "");
	const candidates = [`${base}-480.webp 480w`];
	if (size.width > 720) candidates.push(`${base}-720.webp 720w`);
	candidates.push(`${src} ${size.width}w`);
	return candidates.join(", ");
}
//#endregion
//#region src/components/ProductCard.astro
createAstro("https://arkflame.com");
var $$ProductCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ProductCard;
	const { product, headingLevel = "h3", variant = "grid" } = Astro.props;
	const Heading = headingLevel;
	const category = getCategory(product.category);
	const detail = getProductDetail(product);
	const size = getArtworkSize(product.slug);
	const srcSet = product.image !== void 0 ? getResponsiveSrcSet(product.image, size) : void 0;
	const href = `/plugins/${product.slug}/`;
	const hasImage = product.image !== void 0;
	const isSquare = size !== void 0 && size.width === size.height;
	const metadata = detail.compatibility?.platforms?.slice(0, 3).join(" · ") ?? product.tags[0];
	const showIcon = !hasImage && product.icon !== void 0;
	return renderTemplate`${maybeRenderHead($$result)}<li${addAttribute(["af-product-card", `af-product-card--${variant}`], "class:list")}${addAttribute(product.slug, "data-product")}${addAttribute(product.name, "data-name")}${addAttribute(product.summary, "data-summary")}${addAttribute(product.tags.join(" "), "data-tags")}${addAttribute(product.category, "data-category")}${addAttribute(product.featured ? "1" : "0", "data-featured")} data-astro-cid-4fhpls6h><div${addAttribute(["af-product-card__media", { "af-product-card__media--square": isSquare }], "class:list")} data-astro-cid-4fhpls6h>${hasImage ? renderTemplate`<img${addAttribute(product.image, "src")}${addAttribute(srcSet, "srcset")} sizes="(max-width: 620px) 78vw, (max-width: 820px) 45vw, (max-width: 1100px) 31vw, 300px" alt="" loading="lazy" decoding="async"${addAttribute(size?.width, "width")}${addAttribute(size?.height, "height")} data-astro-cid-4fhpls6h>` : renderTemplate`<div class="af-product-card__placeholder" aria-hidden="true" data-astro-cid-4fhpls6h>${showIcon && renderTemplate`<img class="af-product-card__placeholder-icon"${addAttribute(product.icon, "src")} alt="" loading="lazy" decoding="async" width="48" height="48" data-astro-cid-4fhpls6h>`}${category !== void 0 && renderTemplate`${renderComponent($$result, "Icon", $$Icon, {
		"name": category.icon,
		"size": 30,
		"data-astro-cid-4fhpls6h": true
	})}`}<span data-astro-cid-4fhpls6h>${category?.name ?? product.category}</span></div>`}</div><div class="af-product-card__body" data-astro-cid-4fhpls6h>${renderComponent($$result, "Heading", Heading, {
		"class": "af-product-card__title",
		"data-astro-cid-4fhpls6h": true
	}, { "default": ($$result) => renderTemplate`<a${addAttribute(href, "href")} data-astro-cid-4fhpls6h>${product.name}</a>` })}<p class="af-product-card__summary" data-astro-cid-4fhpls6h>${product.summary}</p><p class="af-product-card__meta" data-astro-cid-4fhpls6h>${category !== void 0 ? renderTemplate`<a class="af-product-card__category"${addAttribute(`/plugins/${product.category}/`, "href")} data-astro-cid-4fhpls6h>${category.name}</a>` : renderTemplate`<span class="af-product-card__category" data-astro-cid-4fhpls6h>${product.category}</span>`}${metadata && renderTemplate`<span class="af-product-card__dot" aria-hidden="true" data-astro-cid-4fhpls6h>·</span>`}${metadata && renderTemplate`<span class="af-product-card__platform" data-astro-cid-4fhpls6h>${metadata}</span>`}</p></div><a class="af-card-link"${addAttribute(href, "href")} data-astro-cid-4fhpls6h>View<span class="af-sr-only" data-astro-cid-4fhpls6h> ${product.name}</span><span aria-hidden="true" data-astro-cid-4fhpls6h>→</span></a></li>`;
}, "/run/media/linsaftw/SDD/GitHub/ArkFlame/ArkFlame-Page/src/components/ProductCard.astro", void 0);
//#endregion
export { getProductDetail as i, getArtworkSize as n, getResponsiveSrcSet as r, $$ProductCard as t };
