---
title: "MobStacker stacking and entity counts"
description: "MobStacker merges nearby mobs of the same type to reduce entity counts and tick cost. Platforms, compatibility and configuration overview."
plugin: "mobstacker"
category: "performance"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026"
---

## What it does

MobStacker merges nearby mobs of the same type. Fewer entities means less tick cost from entity pressure.

## Compatibility

- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no range.
- `api-version` 1.13 is the Bukkit API level, not a game-version claim.
- Folia: the repository does not declare support.

## Configuration

Two commands and a config file cover stacking behaviour. Open the config on your server and set the behaviour you need before you go live.

## Related

- [Reduce entity lag with mob and item stacking](/guides/reduce-entity-lag-with-stacking/)
- [FlameStack](/plugins/flamestack/) stacks ground items and redstone-machine output.
- [EntityLimiter](/plugins/entitylimiter/) caps entity counts.
