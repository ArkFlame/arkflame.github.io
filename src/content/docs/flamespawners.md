---
title: "FlameSpawners features and compatibility"
description: "FlameSpawners adds configurable spawners with stacking, storage and upgrades."
plugin: "flamespawners"
category: "smp"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026"
---

FlameSpawners adds configurable spawners to a survival server. Each spawner can be stacked, stored and upgraded. The plugin is built for Bukkit, Spigot and Paper and declares Folia support.

## What it does

The plugin covers an item-producing spawner loop. Players can stack spawners, keep them in storage and improve them through upgrades. The product data describes six configuration files and forty-five permissions. Those counts come from the repository, so check the generated config and permission list after you install.

## Features

- Configurable item-producing spawners.
- Stacking, storage and upgrades.
- Forty-five permissions, as counted in the repository.
- Six configuration files, as counted in the repository.

## Compatibility

- Platforms: Bukkit, Spigot and Paper.
- Minecraft version: the repository states no version range.
- Java: compile target Java 8. That is a build setting, not runtime guidance.
- Folia: declared in the repository.

Folia support is a declaration. Test spawner placement and item output in regions away from spawn before you run the plugin on a Folia server. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag does and does not prove.

## Install

Place the jar in `plugins/`, restart, and read the console. This is standard practice for a Bukkit-family plugin, not a repository step. Make a backup of the plugin data folder before you change the spawner configuration, so you can restore the defaults if a setting behaves unexpectedly.

## Permissions and balance

Forty-five permissions is a large tree. Give players only the nodes for the features you offer. Test each upgrade and storage level with a test account, since a stack that produces too many items can change the economy faster than you expect.

## Entity load

Spawners add entities and item drops. If your server already lags, measure first with the [diagnose-lag guide](/guides/diagnose-lag-before-limiters/). If the cause is entity pressure, the [entity-lag stacking guide](/guides/reduce-entity-lag-with-stacking/) compares MobStacker, FlameStack, EntityLimiter and BlockLimiter.

## Related

- [MobStacker](/docs/mobstacker/) stacks mobs of the same type.
- [FlameStack](/docs/flamestack/) stacks ground items and redstone-machine output.
- [SMP Harvest](/docs/smp-harvest/) is another SMP progression plugin.
