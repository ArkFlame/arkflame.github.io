---
title: "What folia-supported: true actually proves, and how to verify it"
description: "A folia-supported flag is a declaration, not a scheduler audit; check region ownership, entity tasks and FoliaAPI adapters, not just the flag."
updated: 2026-10-30
author: "LinsaFTW"
relatedPlugins: ["redstonelimiter", "smp-regions", "entitylimiter"]
topics: ["folia", "compatibility", "scheduling"]
---

`folia-supported: true` in `plugin.yml` is a declaration that the author intends the plugin to run on Folia. It is not a runtime proof. Folia replaces the single main-thread tick loop with region-owned scheduling, so the real question is whether every world, block, and entity access happens on the thread that owns that state.

## What the flag does and does not do

Folia reads the descriptor flag at load time. A true value tells the platform the plugin claims support; it does not inspect the code that runs afterward. A plugin can pass the load check and still call `Bukkit.getScheduler()` or touch a block in another region.

Treat the flag as the start of a checklist:

- It does not prove that tasks are scheduled on the correct region.
- It does not prove that cross-region teleports, block edits, or entity lookups are safe.
- It does not prove that third-party hooks or optional dependencies are Folia-aware.
- It does not prove that reload and shutdown paths are clean.
- It does not prove a Minecraft or Java runtime range.

## The scheduling model in practice

Folia has global, region, async, and entity-scoped work. The names differ by API version, but the ownership rule is stable: global work goes to the global scheduler, work tied to a location goes to the region scheduler for that location's owning region, background work goes async, and entity mutations go through that entity's scheduler. Code that assumes one main thread will eventually throw, often as `UnsupportedOperationException`.

Real adapters in these repositories show the pattern:

- **RedstoneLimiter** wraps a `FoliaAPI` adapter: player and entity work through `runTaskForEntity(...)`, region work through `runTaskForRegion(World, chunkX, chunkZ, ...)`, global work through `FoliaAPI.runTask`, and background maintenance on the async scheduler when available.
- **EntityLimiter** uses `FoliaAPI.runTaskTimerAsyncCancellable` for its tracker and `FoliaAPI.runTask(chunk, ...)` for chunk-scoped work.
- **BlockLimiter** branches on `FoliaAPI.isFolia()` and uses `FoliaAPI.runTaskForEntity(player, ...)` for player-scoped refresh work.
- **MobStacker** comments that async coordinator tasks stay async while entity-owned work is bounced through the entity scheduler, with a separate `isFolia()` branch for its merge task.

Those are code-level adaptations, not proof that every path in each plugin is covered. They are still stronger evidence than a descriptor flag.

## "Region" means two different things

RedstoneLimiter calls a 32x32-chunk area a region in its statistics and configuration. That is not a Folia scheduler region. If you tune a RedstoneLimiter scope while diagnosing a Folia scheduling error, you are mixing two vocabularies and will look in the wrong place.

SMP-Regions documents its own Folia model explicitly: global work on the global scheduler, location work on the region scheduler, background scanning and file queueing on the async scheduler, no raw threads, and no fake async completions. That is the level of detail to ask for from any plugin claiming support.

## A verification checklist

1. Confirm the descriptor has `folia-supported: true` and note its `api-version`. The API level is a Bukkit API level, not a game-version guarantee.
2. Start the server and read the first thirty seconds of console. AuthMePremium, for example, is expected to log `FoliaAPI initialized`; a missing adapter line is a warning sign.
3. Join with two accounts in different regions and trigger the feature in both. Region bugs often appear only when two owners are active.
4. Exercise entity work: spawn, remove, teleport, and damage an entity. Watch for wrong-thread or ownership exceptions.
5. Exercise block work at a chunk boundary, then at a region boundary. Place and break the block from a player standing on each side.
6. Run the plugin's reload command, then repeat steps 3 to 5. Reload paths are where stale schedulers hide.
7. Search the log for `UnsupportedOperationException`, `not supported`, `wrong thread`, and the plugin's own scheduler messages. A clean startup is not a clean test.

For a plugin with a large surface, repeat the checklist on a staging server with the same optional dependencies you run in production.

## When it fails

AuthMePremium's operational docs give the pattern for a Folia `UnsupportedOperationException`: confirm the descriptor flag, confirm the backend is running the current universal JAR, confirm `FoliaAPI initialized` appears, and route player mutations through the entity scheduler. Do not replace the failing call with a raw Bukkit scheduler call; that moves the error rather than fixing ownership.

If the exception comes from a third-party plugin, capture the full stack trace before disabling anything. The class and method in the trace usually identify the owner faster than a plugin list.
