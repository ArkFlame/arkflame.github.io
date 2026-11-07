---
title: "What folia-supported: true actually proves, and how to verify it"
description: "A folia-supported flag is a declaration, not a scheduler audit; check region ownership, entity tasks and FoliaAPI adapters, not just the flag."
updated: 2026-10-30
author: "LinsaFTW"
relatedPlugins: ["redstonelimiter", "smp-regions", "entitylimiter"]
topics: ["folia", "compatibility", "scheduling"]
---

`folia-supported: true` in `plugin.yml` says the author intends the plugin to run on Folia. It is not proof that it works. Folia replaces the single main-thread tick loop with region-owned scheduling. The real question is whether every world, block and entity access happens on the thread that owns that state.

## What the flag does and doesn't do

Folia reads the flag at load time. A true value means the plugin claims support. Folia doesn't inspect the code that runs afterward. A plugin can pass the load check and still call `Bukkit.getScheduler()` or touch a block in another region.

Treat the flag as the start of a checklist. It doesn't prove:

- that tasks are scheduled on the correct region.
- that cross-region teleports, block edits or entity lookups are safe.
- that third-party hooks or optional dependencies are Folia-aware.
- that reload and shutdown paths are clean.
- a Minecraft or Java runtime range.

## The scheduling model in practice

Folia has global, region, async and entity-scoped work. The names differ by API version, but the ownership rule holds. Global work goes to the global scheduler. Work tied to a location goes to the region scheduler of the region that owns that location. Background work goes async. Entity changes go through that entity's scheduler. Code that assumes one main thread will eventually throw, often as `UnsupportedOperationException`.

Real adapters in these repositories show the pattern:

- **RedstoneLimiter** wraps a `FoliaAPI` adapter. Player and entity work goes through `runTaskForEntity(...)`, region work through `runTaskForRegion(World, chunkX, chunkZ, ...)`, global work through `FoliaAPI.runTask`, and background maintenance on the async scheduler when it's available.
- **EntityLimiter** uses `FoliaAPI.runTaskTimerAsyncCancellable` for its tracker and `FoliaAPI.runTask(chunk, ...)` for chunk-scoped work.
- **BlockLimiter** branches on `FoliaAPI.isFolia()` and uses `FoliaAPI.runTaskForEntity(player, ...)` for player-scoped refresh work.
- **MobStacker** notes that async coordinator tasks stay async while entity work is handed to the entity scheduler. Its merge task has a separate `isFolia()` branch.

These are code-level adaptations, not proof that every path in each plugin is covered. They're still stronger evidence than a descriptor flag.

## "Region" means two different things

RedstoneLimiter calls a 32x32-chunk area a region in its stats and config. That's not a Folia scheduler region. If you tune a RedstoneLimiter scope while chasing a Folia scheduling error, you're mixing two vocabularies and will look in the wrong place.

SMP-Regions documents its Folia model: global work on the global scheduler, location work on the region scheduler, background scanning and file queuing on the async scheduler, no raw threads and no fake async completions. Ask for that level of detail from any plugin that claims Folia support.

## A verification checklist

1. Confirm the descriptor has `folia-supported: true` and note its `api-version`. The API level is a Bukkit API level, not a game-version guarantee.
2. Start the server and read the first thirty seconds of console. AuthMePremium, for example, should log `FoliaAPI initialized`. A missing adapter line is a warning sign.
3. Join with two accounts in different regions and trigger the feature in both. Region bugs often appear only when two owners are active.
4. Exercise entity work: spawn, remove, teleport and damage an entity. Watch for wrong-thread or ownership exceptions.
5. Exercise block work at a chunk boundary, then at a region boundary. Place and break the block from a player on each side.
6. Run the plugin's reload command, then repeat steps 3 to 5. Reload paths are where stale schedulers hide.
7. Search the log for `UnsupportedOperationException`, `not supported`, `wrong thread` and the plugin's own scheduler messages. A clean startup doesn't mean a clean test.

For a large plugin, repeat the checklist on a staging server with the same optional dependencies you run in production.

## When it fails

AuthMePremium's operational docs give the fix pattern for a Folia `UnsupportedOperationException`. Confirm the descriptor flag, confirm the backend runs the current universal JAR, confirm `FoliaAPI initialized` appears, and route player changes through the entity scheduler. Don't swap the failing call for a raw Bukkit scheduler call. That moves the error instead of fixing ownership.

If a third-party plugin throws, capture the full stack trace before disabling anything. The class and method in the trace usually name the owner faster than a plugin list.
