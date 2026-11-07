---
title: "sLevels features and compatibility"
description: "sLevels adds server-wide level progression with rewards. Levels are defined in configuration and can run on Spigot, Paper or Folia."
plugin: "slevels"
category: "gameplay"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026"
---

sLevels adds server-wide level progression. Players gain levels over time, and each level can grant a reward. Levels are defined in configuration, so you decide the curve and the rewards without code. The plugin runs on Spigot, Paper or Folia.

## What it does

The plugin tracks a player's level across the whole server and pays out the reward attached to each level. The repository declares twenty-one permissions. The product data does not list the exact commands or the levels the default config ships with, so read the config after you install.

## Features

- Server-level progression.
- Configurable level rewards.
- Twenty-one permissions, as declared in the repository.

## Compatibility

- Platforms: Spigot, Paper and Folia.
- Minecraft version: the README states 1.8.8 to 1.21.x.
- Java: compile target Java 8. That is a build setting, not runtime guidance.
- Folia: declared in the repository.

The version range is a README claim. Test on the version you run before you open the server to players. Folia support is also a declaration, so check reward payouts in regions away from spawn if you run on Folia. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what that means.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins, not a repository step.

## Setting up the curve

Start with a short curve and a small reward at each level. Play through the first few levels with a test account before you publish the values. A steep early curve or a large early reward is hard to undo once players have progressed.

## Troubleshooting

- If levels do not increase, check that the progression source you expect is enabled in the config, then test with a test account.
- If rewards do not arrive, check the permission and economy setup for the reward type. The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) shows how to isolate a reward failure.

## Related

- [SMP Rewards](/docs/smp-rewards/) adds daily and hourly rewards with streaks.
- [SMP Shards](/docs/smp-shards/) is an AFK-earned currency with a shop.
- [SMP essentials plugin stack](/guides/smp-essentials-plugin-stack/) shows how these plugins fit into one stack.
