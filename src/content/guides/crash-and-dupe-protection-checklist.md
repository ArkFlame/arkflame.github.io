---
title: "Crash and dupe protection checklist for Minecraft servers"
description: "A checklist for crash, dupe and packet-exploit protection on Spigot and Paper, using ExploitFixer with entity, block and redstone limits."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["exploitfixer", "entitylimiter", "blocklimiter", "redstonelimiter", "flamepearls"]
topics: ["security", "crash", "dupe", "exploits"]
---

ExploitFixer filters crash, dupe and packet-abuse traffic before it reaches gameplay. Limits on entities, blocks and redstone cover the load side of the same problems. Set up both, then test on a staging server before you go live.

## Start with ExploitFixer

ExploitFixer ships fourteen configurable modules, a packet watchdog and a packet limiter. It targets Spigot and Paper and declares Folia support in its repository. The repository states no Minecraft version range.

ExploitFixer refuses to start without HamsterAPI. The plugin.yml lists HamsterAPI as a soft dependency, but the repository treats it as a hard startup requirement. Install HamsterAPI before you install ExploitFixer, and confirm it loads first in the console.

## Checklist

1. Confirm HamsterAPI loads before ExploitFixer does.
2. Set the packet size and tab-complete limits.
3. Set the book-per-chunk limit and the command blocker.
4. Set violation thresholds. Each threshold triggers a cancel or reduce action, so set them before you rely on the watchdog.
5. Turn on Discord or in-game notifications so staff see each hit.
6. Cap entity counts with [EntityLimiter](/plugins/entitylimiter/).
7. Cap blocks per chunk with [BlockLimiter](/plugins/blocklimiter/).
8. Cap redstone with [RedstoneLimiter](/plugins/redstonelimiter/). Run it in monitor mode first.
9. If your server uses stasis chambers or ender-pearl mechanics, check [FlamePearls](/plugins/flamepearls/). It corrects ender-pearl movement glitches and supports stasis-chamber limiting.
10. Read the log after each change. The [troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) shows how to isolate a config that fails.

## Read the packet evidence before tuning

Do not change a number because a guide says so. Read the packet evidence first. The [ExploitFixer packet abuse guide](/guides/exploitfixer-packet-abuse/) shows which file owns each number and gives a tuning order that does not guess.

Change one threshold at a time. Note the time, the value before and the value after. If an exploit returns, you can see which change allowed it.

## Load limits cover the other side

Packet filters stop bad input. They do not stop a legitimate build from growing too large. EntityLimiter caps entity counts. BlockLimiter caps block counts per chunk and per block type. Both help when a crash comes from load rather than from a packet.

RedstoneLimiter covers the redstone side. It watches activations at several scopes and has a monitor-only mode, so you can see the load before you enforce a limit.

## Which limits to set first

Set the packet limits before the book and command limits. Packet size and tab-complete are the first inputs to limit in the packet modules. Set the violation thresholds last, once you know the packet limits do not block normal play. A threshold that fires on normal traffic creates alerts that staff learn to ignore.

## Where the checklist stops

Enabling a module does not prove that it blocks one specific exploit. Test with the same plugins and the same versions you run in production, on a staging server. Keep the notifications on during that test, so you can see every hit.

A clean staging run also does not prove a clean live server. Player builds, player counts and plugin combinations differ. Watch the live alerts for several days after launch.

## Steps for a staging test

1. Copy the live plugin set and config to a staging server.
2. Start the server and confirm HamsterAPI and ExploitFixer both load.
3. Run each packet test with notifications on.
4. Record every hit, the module that caught it and the action taken.
5. Lower thresholds only where a real attempt passed through.

## Frequently asked questions

### Does ExploitFixer work on Folia?

The repository declares Folia support. Check it on your own build before you rely on it.

### What does ExploitFixer need to run?

HamsterAPI. The repository treats it as a hard startup requirement.

### Do I need EntityLimiter if I run ExploitFixer?

They cover different sides. ExploitFixer filters packet abuse. EntityLimiter caps entity counts. Use both if entity pressure is a risk on your server.

### How do I avoid false alarms?

Set thresholds one step at a time. Read the alerts for a few days before you turn on actions that cancel or reduce traffic.
