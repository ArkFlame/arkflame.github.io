---
title: "Reduce entity lag with mob and item stacking"
description: "Stack mobs and ground items to cut entity count, then cap what still grows. MobStacker, FlameStack, EntityLimiter and BlockLimiter compared."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["mobstacker", "flamestack", "entitylimiter", "blocklimiter", "redstonelimiter"]
topics: ["entities", "performance", "lag", "stacking"]
---

Stack what repeats, then cap what keeps growing. MobStacker merges nearby mobs of the same type. FlameStack merges loose ground items and redstone-machine output. EntityLimiter sets hard caps on entity counts, and BlockLimiter caps blocks per chunk. Measure first, so you know which source costs the most.

## Measure before you stack

Read the [lag diagnosis guide](/guides/diagnose-lag-before-limiters/) first. It shows how to tell whether entities, redstone or blocks cause the cost. Change one source at a time. If you stack mobs and the lag was in redstone, you learn nothing from the change.

Record the tick and entity numbers before the change. Record them again after it. Without the before numbers, you cannot tell whether the change helped.

## What does MobStacker do?

MobStacker merges nearby mobs of the same type. Fewer entities means less tick cost from entity pressure. Two commands and a config file cover the stacking behaviour. The repository states no Minecraft version range, and its `api-version` 1.13 is the Bukkit API level, not a game-version claim.

Open the config on your server and set the behaviour you need before you go live. Test the stacking on a copy of a busy area first, so you can see how the stacks look to players.

## What does FlameStack do?

FlameStack stacks loose ground items and redstone-machine output. That covers the drops that pile up under farms. It is built against the Bukkit, Spigot and Paper API 1.13+, and it detects Folia at runtime. The [redstone guide](/guides/redstone-lag-without-breaking-farms/) walks through stacking ground items around a farm without breaking the farm.

FlameStack and MobStacker cover different entities. Use both if your server has both problems. Do not expect either one to fix the other's source.

## When do you need a hard cap?

Stacking lowers counts. It does not stop growth. EntityLimiter sets hard caps on entity counts to prevent crash and lag from entity pressure. It ships eight configuration files for limits, messages and behaviour. Use it after stacking, so the caps catch only what stacking misses.

## What about blocks?

Dense player builds cost load and save time. BlockLimiter caps block counts per chunk. Limits are set per block type, so you can cap the blocks your players build most without touching the rest. The plugin's descriptor is at version 1.0.9.

## What about redstone?

Redstone machines are a separate cost. RedstoneLimiter watches activations at block, sub-chunk, chunk and 32×32-chunk region scope. It cancels or throttles work that crosses the configured limits. It also has a monitor-only mode. Run it in monitor mode first, then enforce limits once you know which machines cross the line.

## Order of work

1. Measure with the lag guide.
2. Stack mobs with MobStacker and ground items with FlameStack.
3. Cap entity counts with EntityLimiter.
4. Cap blocks per chunk with BlockLimiter.
5. Run RedstoneLimiter in monitor mode, then enforce.

Stop after each step and measure again. If the numbers stop improving, the next source is probably not the one you assumed.

## How to tell the stacking worked

Compare the same measurements before and after. Look at the entity count in the area you stacked, then at tick time under the load that caused the problem. A drop in entity count with no change in tick time means the entities were not the cost. Go back to the lag guide and measure the next source.

Also check player reports. Stacked mobs or items can look different. If players cannot find their loot or cannot see a mob they want to fight, adjust the stacking config before you add the next plugin.

## What about Folia?

FlameStack detects Folia at runtime. EntityLimiter and BlockLimiter declare Folia support in their repositories. RedstoneLimiter also declares it. Check each one on your own build. The [Folia compatibility guide](/guides/folia-compatibility/) explains what the flag does and does not prove.

## Frequently asked questions

### Does stacking replace limits?

No. Stacking merges what exists. EntityLimiter caps what keeps growing.

### Is FlameStack the same as MobStacker?

No. FlameStack stacks ground items and redstone-machine output. MobStacker stacks mobs.

### Does EntityLimiter work on Folia?

The repository declares Folia support. Verify it on your own build before you rely on it.

### Which plugin should I install first?

Measure first. The lag guide shows how to find which source costs the most, then install the matching plugin.
