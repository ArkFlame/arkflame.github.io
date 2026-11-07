---
title: "MobStacker stacking and entity counts"
description: "MobStacker merges nearby mobs of the same type to reduce entity counts and tick cost. Platforms, compatibility and configuration overview."
plugin: "mobstacker"
category: "performance"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026"
---

MobStacker merges nearby mobs of the same type into one stack. Fewer entities means a lower tick cost on a busy server. Two commands and a config file cover the stacking behaviour.

## What it does

When mobs of the same type sit close together, MobStacker combines them so the server tracks one entity in place of many. The config controls the stacking behaviour. The repository declares two commands. The product data does not name them, so check the help output after you install.

## Features

- Same-type mob stacking.
- Entity-count reduction.
- Two commands and a config file.

## Compatibility

- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no version range. The api-version 1.13 in the manifest is the Bukkit API level, not a game-version claim.

The product data does not declare Folia support for MobStacker. Treat it as unverified on Folia. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains how to check a claim.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins, not a repository step. Measure entity counts first with the [diagnose-lag guide](/guides/diagnose-lag-before-limiters/), so you know mob stacking addresses the cost you see.

## Stacking behaviour

Stacking helps most where mobs gather, such as a spawner farm. Test the stack with a test account and a small group of mobs before you widen the range. A stack that is too wide can make farm output hard to predict.

## Troubleshooting

- If mobs do not stack, check the range and the mob type in the config, then test with a few mobs in one spot.
- If farm drops change after stacking, check the kill logic of the farm and test with one stack.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a conflict with another mob plugin.

## Related

- [FlameStack](/docs/flamestack/) stacks ground items and redstone-machine output.
- [EntityLimiter](/docs/entitylimiter/) caps entity counts with hard limits.
- [Reduce entity lag with stacking](/guides/reduce-entity-lag-with-stacking/) compares MobStacker, FlameStack, EntityLimiter and BlockLimiter.
