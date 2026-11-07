---
title: "Reduce redstone lag without breaking farms"
description: "Measure redstone and entity load in monitor mode, then cap the machines causing lag with per-material overrides so working farms keep running."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["redstonelimiter", "flamestack", "entitylimiter"]
topics: ["redstone", "lag", "farms", "performance", "entities"]
---

Redstone lag and farm breakage have the same root cause: a limit that is too broad. A cap that stops a lag machine also stops a working farm. The fix is to measure first, cap the machines that cost the most, and leave the rest alone.

This guide uses three plugins. RedstoneLimiter controls redstone activations. FlameStack merges ground items and machine output so they take up fewer entity slots. EntityLimiter caps entity counts. Use only the ones your lag report points to.

## Step 1: measure in monitor mode

RedstoneLimiter has a monitor mode. It observes activations without cancelling anything. Turn it on, let a normal play period run, and read its statistics.

Look for the scopes where activations concentrate. RedstoneLimiter tracks activations at block, sub-chunk, chunk and region scope. A hot spot at chunk scope is a different problem from one at block scope. Note the world and the area.

Do not enforce anything until you have a list of the machines causing the load.

## Step 2: check entities separately

Redstone is not always the cause. Mob farms and item drops can cost as much as a redstone clock. Check entity counts before you cap redstone.

EntityLimiter caps entity counts. Its shipped defaults use a radius mode with a radius of 16. The default cap is 32 per area, with per-type caps such as 16 for zombies and 40 for horses. Those are defaults. Adjust them to your server's layout and mob farms.

Run EntityLimiter in its own test window so you can tell which change did what.

## Step 3: stack ground items

Ground items and machine output build up around farms. FlameStack merges loose ground items and redstone-machine output into stacks. That reduces entity pressure without removing any items.

Test it on a copy of a farm first. Check that the output still reaches the collection point and that the stacked items still count correctly in the chest or hopper that receives them.

## Step 4: cap the machines, not the redstone

Once you know the hot spots, use RedstoneLimiter's overrides. It supports presets, per-world overrides and per-material overrides.

- Use a per-world override for a world that is only for testing or building.
- Use a per-material override for the machine that is causing the load.
- Leave the default limits alone for everything else.

Do not set a broad limit on all redstone to fix one machine. That is how working farms break.

## Step 5: check the farms

After each change, run the farm for a full cycle and count the output. Compare it with the same cycle before the change.

If output drops, widen the override for that material, or move the limit to a different scope. Do not remove the limit without checking what caused the drop.

## Step 6: watch the notifications

RedstoneLimiter has an in-game GUI, statistics and notifications. Use the notifications during the first few days. They show which machines hit a limit, which tells you whether a limit is hitting a farm that should be left alone.

## Folia

RedstoneLimiter declares Folia support, and its tutorial documents Folia scheduling. A declaration is not a test. Run the setup on a Folia test server before you change production. For the scheduling rules, read the [Folia compatibility guide](/guides/folia-compatibility/).

## Common mistakes

- Enforcing before measuring. You cannot tell which limit fixed the lag.
- Using one global limit. It breaks farms that were working.
- Changing redstone and entity limits in one step. You lose the ability to tell which one helped.
- Skipping the output check. A farm that runs at half speed looks fine in the logs.

For the product details, see the [RedstoneLimiter product page](/plugins/redstonelimiter/), the [FlameStack product page](/plugins/flamestack/) and the [EntityLimiter product page](/plugins/entitylimiter/).

For a wider method, see [diagnose lag before limiters](/guides/diagnose-lag-before-limiters/).
