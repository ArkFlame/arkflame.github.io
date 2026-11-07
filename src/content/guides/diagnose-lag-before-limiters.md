---
title: "Diagnose the lag source before installing another limiter"
description: "Measure TPS, tick time and hot paths first, then choose EntityLimiter, RedstoneLimiter, MobStacker or BlockLimiter based on what is actually costing ticks."
updated: 2026-10-30
author: "LinsaFTW"
relatedPlugins: ["entitylimiter", "redstonelimiter", "mobstacker", "blocklimiter"]
topics: ["performance", "lag", "configuration"]
---

Installing all four limiters at once hides the cause and makes rollback harder. Measure first. TPS alone tells you the server is behind, not what's behind it. Tick duration plus a profiler sample shows whether the cost is entities, redstone, mob density or block-heavy chunks. The tool choice follows from that.

## Measure before changing anything

1. Record a baseline with no players, then with a typical player count. Note TPS and tick duration (MSPT) for both.
2. Run `/spark tps` and read TPS next to tick duration.
3. Start a profile with `/spark profiler start`, reproduce the lag for 30 to 60 seconds, stop it, and read the hottest paths. Spark is external tooling and not verified here.
4. Repeat the same scenario after each change. Comparing different player counts or different farms proves nothing.

The profiler names the expensive method, not the plugin that owns the entity. That's your next step.

## Classify the cost

| Symptom | Likely owner | First check |
| --- | --- | --- |
| Many entities in loaded chunks, farm animals, item drops, armor stands | Entity density | Entity counts per chunk and per type near the hotspot |
| Activation bursts around observers, pistons, comparators, clocks | Redstone | Redstone activation counts per chunk/region |
| Hoppers, chests, spawners, pistons packed into a few chunks | Block density | Block counts per chunk |
| Spawner output producing large mob groups | Mob density | Stacked mob counts and spawner placement |

These categories overlap. A mob farm is entity load, redstone and block entities at once. Fix the biggest part first, not all three at once.

## What each limiter actually controls

**EntityLimiter** enforces per-type and group caps from `limits.yml`. Shipped defaults include `mode: RADIUS`, `radius: 16`, a `default` cap of `32`, per-type caps like `zombie: 16` and `horse: 40`, and group caps like `monsters: 32` and `animals: 32`. `update-rate: 20` sets periodic reconciliation. `remove-order: YOUNG` picks the removal candidate. `exempt-worlds` ships with `lobby` and `spawn`. The command is `/entitylimiter` (alias `/el`), permission `entitylimiter.admin`.

Use it when the profiler shows entity ticking and the entity count near players is the problem. It doesn't reduce redstone cost or block entity tick cost.

**RedstoneLimiter** counts activations per block, subchunk, chunk and its own 32x32-chunk "region". Defaults include `anti-lag.preset: STRICT`, `blocks.max-activations.DEFAULT: 5`, `REDSTONE_WIRE: 12`, `chunks.max-activations: 1024` and `max_piston_push: 12`. `/rl` prints aggregate stats. `/rl chunk <world> <x> <z>` inspects one chunk. `/rl reload` reapplies config.

`monitor: false` is the safe default. With `monitor: true`, the plugin skips enforcement but keeps detection, policy verdicts and throttled notifications. In monitor mode, a blocked notification means "would block," not "cancelled." Tune after you have a real would-block count, then turn monitor off on purpose.

The docs limit the claim. Detection is best effort and covers only observable events. Observer physics is uncancellable telemetry.

**MobStacker** keeps stacked mobs in one location instead of deleting them. Config covers loot multipliers, XP delivery, instant-kill behavior, breeding cooldowns and a world blacklist. `/mobstacker` (alias `/stacker`) prints stack stats. `/spawnergive` gives a configured spawner item. The descriptor declares no permission nodes, so access control comes from your command layer and server config.

Use it when spawner output creates entity load but the farm's drops and XP must keep working. Check breeding and loot behavior against your economy first.

**BlockLimiter** caps placed blocks per chunk. `chunk-limits` ships with values like `PISTON: 32`, `HOPPER: 64`, `CHEST: 128` and `SPAWNER: 4`. It uses a 16x128x16 limit cell and scans chunks in the background, paced by `max-blocks-per-tick: 8192` and `max-chunks-per-tick: 1`. Commands are `/blocklimiter` (aliases `/bl`, `/blimiter`), with `blocklimiter.admin` and `blocklimiter.bypass`.

Use it when a few chunks hold storage or automation walls. It removes blocks over the cell limit. It isn't an entity limiter.

## Turn one tool on in monitor mode

Only RedstoneLimiter documents a monitor mode. For the others, turn on `debug` on a staging copy, not production, and read the removal logs.

1. Pick the one category with the strongest profiler evidence.
2. Copy the config, set conservative caps above current legitimate use, and apply it to staging.
3. Reproduce the same scenario and compare tick duration.
4. Lower one scope at a time. Note the old value.
5. Apply to production during low traffic. Watch for player-facing removals. Keep `/rl reload` or a restart ready as rollback.

Running several limiters means several plugins can remove the same entity for different reasons. Assign ownership: one plugin per category, written down in the config.

## Frequently asked questions

### Should I install all four limiters at once?

No. Installing them together hides the cause and makes rollback harder.

### Is TPS enough to find the cause?

No. TPS shows that the server is behind. Tick duration and a profiler sample show what costs the ticks.

### Does the profiler name the plugin that owns the entity?

No. It names the expensive method. Use that method to find the owner.
