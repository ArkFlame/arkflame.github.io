---
title: "Folia-compatible plugins: what the flag covers"
description: "Which ArkFlame plugins declare Folia support in their repositories, which rely on store listings, and what to verify before you run them."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["exploitfixer", "fairplay", "authme-premium", "chatsentinel", "redstonelimiter", "flamestack", "blocklimiter", "entitylimiter", "smp-regions", "smp-lifesteal", "smp-shards", "flameshop"]
topics: ["folia", "compatibility", "plugins"]
---

A Folia flag is a declaration, not a test result. Most ArkFlame plugins that run on Folia declare it in their repository or manifest. A smaller set mentions Folia only in its store listing. Verify both kinds on your own build before you run them on a live server.

## Declared in the repository

These products declare Folia support in their repository or manifest:

- [ExploitFixer](/plugins/exploitfixer/): Spigot and Paper.
- [FairPlay](/plugins/fairplay/): Bukkit, Spigot and Paper. Requires PacketEvents.
- [AuthMe Premium](/plugins/authme-premium/): Bungee-compatible proxy, Velocity, Bukkit, Paper and Folia backends.
- [ChatSentinel](/plugins/chatsentinel/): the Bukkit module declares `folia-supported`. The repository states that as an API-level flag, not a game-version guarantee.
- [RedstoneLimiter](/plugins/redstonelimiter/): Bukkit and Spigot. Folia scheduling is documented in its tutorial.
- [FlameStack](/plugins/flamestack/): Bukkit, Spigot and Paper. Detects Folia at runtime.
- [BlockLimiter](/plugins/blocklimiter/): Bukkit and Spigot.
- [EntityLimiter](/plugins/entitylimiter/): Bukkit and Spigot.
- [SMP Regions](/plugins/smp-regions/): Bukkit, Spigot and Paper.
- [SMP Lifesteal](/plugins/smp-lifesteal/): Bukkit, Spigot, Paper, Purpur and Folia.
- [SMP Shards](/plugins/smp-shards/): Paper, Purpur and Folia, for source targeting 1.21.4+.

This list is not complete. Many other product pages also record a Folia declaration from the repository. Each product page states what its repository says.

## Listing claims only

One product rests on public listing text alone:

- [FlameShop](/plugins/flameshop/): the public BuiltByBit listing describes Folia scheduling. The site has no repository or runtime check for it.

Treat that claim as a listing claim until you test it.

## What a flag does not prove

The flag declares intent. It does not show that the code runs work on the right region. The [Folia compatibility guide](/guides/folia-compatibility/) explains the scheduling model and gives a verification checklist. Read that guide before you trust any flag on this page.

The [anticheat checklist](/guides/anticheat-folia-checklist/) applies the same steps to FairPlay.

## How to verify on your build

1. Start the server and read the console for each plugin's load line.
2. Confirm hard dependencies load. FairPlay needs PacketEvents. ExploitFixer needs HamsterAPI. SMP Protections needs SMP Regions.
3. Use each feature you plan to run, including in regions away from spawn.
4. Read exceptions that name a thread or region. The [troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) shows how to isolate the plugin that causes them.

## Mixed setups

Most Folia servers run more than one limiter or stacker. Set them up in the order the [lag guide](/guides/diagnose-lag-before-limiters/) describes, one at a time. That way a failure points at one plugin.

## Where to start on a new Folia server

Add one plugin at a time. Start with the limiters and the anticheat, since they affect load and player safety the most. Confirm each one loads and runs a normal session. Then add the SMP plugins. If a failure appears, only the newest jar is in question, and you can remove it without guessing.

Compare the version in the store listing with the file you download. A listing describes one build. Your server may run another.

## How the claims on this page were checked

Each product record in the catalogue has an evidence field. It is either `repository` or `listing`. A `repository` record comes from the product's README, plugin manifest or bundled config. Those were inspected on 30 October 2026, as each product's evidence note says. A `listing` record comes from the public store listing, read on 7 November 2026 for FlameShop.

Neither source is a runtime test. A repository can declare Folia support and still fail on a region-threaded server. A listing can advertise a feature that the current build does not include. Read each product's evidence note on its page before you decide how much to trust the claim.

## When a claim and a test disagree

Trust the test on your build. Keep the server log, the plugin version and the exact steps that failed. Report the failure to the plugin's author with those details. If the plugin is unsafe on Folia, remove it from the Folia copy and keep the Paper server running until the author confirms a fix.

## Frequently asked questions

### Does a Folia-supported flag mean the plugin was tested on Folia?

No. It means the plugin declares support. Test it on your build.

### Which evidence should I trust more?

Repository declarations are stronger than store-listing text. Both are claims until you test them on your own server.

### Which products rely only on listing text?

FlameShop, according to this page. Verify it before you run it on Folia.
