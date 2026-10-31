---
title: "Diagnose the lag source before installing another limiter"
description: "Measure TPS, tick time and hot paths first, then choose EntityLimiter, RedstoneLimiter, MobStacker or BlockLimiter based on what is actually costing ticks."
updated: 2026-10-30
author: "LinsaFTW"
relatedPlugins: ["entitylimiter", "redstonelimiter", "mobstacker", "blocklimiter"]
topics: ["performance", "lag", "configuration"]
---

Installing all four limiters at once hides the cause and makes rollback harder. Measure first: TPS alone says the server is behind, not what is behind it. Tick duration plus a profiler sample tells you whether the cost is entities, redstone, mob density, or block-heavy chunks; the tool choice follows from that.

## Measure before changing anything

1. Record a baseline with no players, then with a representative player count. Note TPS and tick duration (MSPT) for both.
2. Run `/spark tps` and read TPS together with tick duration.
3. Start a profile with `/spark profiler start`, reproduce the lag for 30 to 60 seconds, then stop it and read the hottest paths. Spark is external tooling, not verified here.
4. Repeat the same scenario after each change. Comparing different player counts or different farms proves nothing.

The profiler names the expensive method, not the plugin owning the entity. That is the next step.

## Classify the cost

| Symptom | Likely owner | First check |
| --- | --- | --- |
| Many entities in loaded chunks, farm animals, item drops, armor stands | Entity density | Entity counts per chunk and per type near the hotspot |
| Activation bursts around observers, pistons, comparators, clocks | Redstone | Redstone activation counts per chunk/region |
| Hoppers, chests, spawners, pistons packed into a few chunks | Block density | Block counts per chunk |
| Spawner output producing large mob groups | Mob density | Stacked mob counts and spawner placement |

These categories overlap. A mob farm is entity load plus redstone plus block entities; fix the largest component first, not all three at once.

## What each limiter actually controls

**EntityLimiter** enforces per-type and group caps using `limits.yml`. Shipped defaults include `mode: RADIUS`, `radius: 16`, a `default` cap of `32`, per-type caps such as `zombie: 16` and `horse: 40`, and group caps such as `monsters: 32` and `animals: 32`. `update-rate: 20` controls periodic reconciliation, `remove-order: YOUNG` selects the removal candidate, and `exempt-worlds` is already populated with `lobby` and `spawn`. The command is `/entitylimiter` (alias `/el`), permission `entitylimiter.admin`.

Use it when the profiler shows entity ticking and the entity count near players is the problem. It does not reduce redstone cost or block entity tick cost.

**RedstoneLimiter** works on activation counts per block, subchunk, chunk, and its own 32x32-chunk "region". Defaults include `anti-lag.preset: STRICT`, `blocks.max-activations.DEFAULT: 5`, `REDSTONE_WIRE: 12`, `chunks.max-activations: 1024`, and `max_piston_push: 12`. `/rl` prints aggregate stats; `/rl chunk <world> <x> <z>` inspects one chunk; `/rl reload` reapplies config.

Its `monitor: false` default is the safe starting point. Set `monitor: true` and the plugin bypasses enforcement while retaining detection, policy verdicts, and throttled notifications. Blocked notifications in monitor mode mean "would block", not "cancelled". Tune after a real would-block count, then turn monitor off deliberately.

Its docs limit the claim: detection is best effort and limited to observable events; observer physics is uncancellable telemetry.

**MobStacker** changes mob representation rather than deleting entities: stacked mobs share a location, with config for loot multipliers, XP delivery, instant-kill behavior, breeding cooldowns, and a world blacklist. `/mobstacker` (alias `/stacker`) prints stack stats and `/spawnergive` gives a configured spawner item. The descriptor declares no permission nodes, so access control is whatever your command layer and server config enforce.

Use it when spawner output creates entity load but the farm's drops and XP must keep working. Check breeding and loot behavior against your economy first.

**BlockLimiter** limits placed blocks per chunk. `chunk-limits` ships specific values such as `PISTON: 32`, `HOPPER: 64`, `CHEST: 128`, and `SPAWNER: 4`, with a 16x128x16 limit cell and background chunk scanning paced by `max-blocks-per-tick: 8192` and `max-chunks-per-tick: 1`. Commands are `/blocklimiter` (aliases `/bl`, `/blimiter`), with `blocklimiter.admin` and `blocklimiter.bypass`.

Use it when a few chunks hold storage or automation walls. It removes blocks that exceed the configured cell limit; it is not an entity limiter.

## Turn one tool on in monitor mode

Only RedstoneLimiter documents a monitor mode. For the others, enable `debug` on a staging copy, not production, and read the removal logs.

1. Pick the single category with the strongest profiler evidence.
2. Copy the config, set conservative caps above current legitimate usage, and apply to staging.
3. Reproduce the same scenario and compare tick duration.
4. Lower one scope at a time. Keep a note of the old value.
5. Apply to production at a low-traffic window, watch for player-facing removals, and keep `/rl reload` or a restart rollback ready.

Running several limiters means multiple plugins can remove the same entity for different reasons. Define ownership: one plugin per category, documented in the config.
