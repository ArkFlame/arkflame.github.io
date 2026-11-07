---
title: "Redstone clock lag: measure, then limit the source"
description: "Find redstone clock lag on Spigot or Paper, run RedstoneLimiter in monitor mode, then cap clocks with per-material overrides without breaking working farms."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["redstonelimiter", "flamestack", "entitylimiter"]
topics: ["redstone", "clock", "lag", "performance"]
---

A redstone clock toggles on a fixed cycle, so it fires again and again without a player touching it. One clock is cheap. Many clocks in one chunk, or a machine that never stops, can keep the server busy around the clock.
The order matters. Measure first, limit second, and test each change on its own.

## Confirm the clock is the cost

Before you add any limiter, find out whether redstone is the cost at all. Use the [diagnose-lag guide](/guides/diagnose-lag-before-limiters/) to measure tick time and hot paths. If the largest cost is entities or chunk loading, a redstone limit will not fix it.
When the numbers point at redstone, note the location of the clock. A clock inside a player base is easy to find. A clock in a remote farm may need a visit or a player report.

## Run RedstoneLimiter in monitor mode

RedstoneLimiter has a monitor-only mode. It observes redstone activations without cancelling them. Install the plugin, leave monitor mode on, and let it run through a normal play session. The plugin keeps statistics and sends notifications, so you can see which area produces the most activations before you enforce anything.

The plugin works at four scopes: a block, a sub-chunk, a chunk and a 32 by 32 chunk region. A clock that fires many times in one chunk shows up at the chunk scope. A clock that is busy on its own shows up at the block scope. Use the scope that matches the cost you measured.

## Pick a scope for the limit

Once monitor data identifies a source, choose the scope. Block scope limits one machine. Chunk and region scopes limit a whole area, which also limits working farms nearby. Start with the narrowest scope that covers the clock.

Presets give you a starting point. Per-world and per-material overrides let you change limits for one world or one block type. Use an override for the clock's block type, not a global change that affects every farm.

## Keep working farms running

The main risk is a limit that stops a farm players rely on. Before you enforce a limit:

1. List the farms in the area, using the statistics from monitor mode.
2. Mark any farm you do not want touched. Give it its own override with a higher limit, or leave it out of the scope.
3. Enforce the limit on the clock only, then check the farm's output for one full cycle.

A farm that slows down after enforcement is a signal to raise its limit, not to remove the plugin.

## Test the change

Test on a copy of the server first. Build a clock on a test account, add it to the scope, and confirm the limit takes effect. Check the GUI and the statistics. Then confirm a neighbouring farm still works. Only then apply the same settings to the live server.

## Folia notes

The repository declares Folia support for RedstoneLimiter, and it points to a tutorial in the project's docs for Folia scheduling. The repository README is still boilerplate, so the tutorial is the place to read for Folia-specific setup. Treat the claim as a declaration until you test it. Use a Folia copy, test one clock in a region away from spawn, and read the console for ownership errors. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Troubleshooting

If a limit does not seem to apply, check the scope and the material override against the block your clock uses. If a farm stops after you enforce a limit, read its statistics and raise the override for that farm. For wider startup failures, the [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating the cause.

## Frequently asked questions

### Can I skip monitor mode and enforce limits right away?

You can, but you will not know which clock is the real cost, and you may stop a working farm. Monitor mode costs little and gives you data first.

### Does a redstone limit fix all lag?

No. It reduces one cost. Measure again after the change, since the largest cost may now be entities or chunk loading.

### Which scope should I use?

Use the narrowest scope that covers the clock. Block scope limits one machine, while chunk and region scopes also affect nearby farms.

### Will the limiter break my farms?

It can, if the limit is too low. Mark working farms first, give them overrides, and check their output for a full cycle before you enforce a global limit.
