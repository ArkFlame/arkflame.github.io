---
title: "BlockLimiter per-chunk block limits"
description: "BlockLimiter caps block counts per chunk, set per block type, to limit load and persistence cost from dense player builds. Compatibility overview."
plugin: "blocklimiter"
category: "performance"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026"
---

BlockLimiter caps how many blocks of each type can sit in one chunk. Dense player builds, such as large redstone or storage areas, can slow a server and make saves larger. A per-chunk cap keeps any one chunk from carrying too much of that load.

## What it does

The plugin counts blocks per chunk and enforces limits you set for each block type. The limit applies to the chunk, not the player, so the cap protects the area a build sits in. The product data does not list commands, so read the config for the limit table after you install.

## Features

- Per-chunk block limits.
- Per-block-type configuration.
- Folia support, declared in the repository.

## Compatibility

- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no version range.
- Folia: declared in the repository. Descriptor version is 1.0.9.

Folia support is a declaration. Block counting touches chunk data, so test a limit on a Folia copy in a region away from spawn before you rely on it. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins, not a repository step. Measure before you install it, using the [diagnose-lag guide](/guides/diagnose-lag-before-limiters/), so you know the chunk limit addresses a real cost.

## Choosing limits

Set limits only for block types that cause a measured problem. A limit on a common block such as stone or dirt can break builds that have nothing to do with lag. Test each limit with a test account in a build chunk before you apply it to the server.

## Troubleshooting

- If a player's build stops at a count, check the limit for that block type and the chunk it sits in.
- If limits do not apply, check the block type name in the config against the server version.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a conflict with another block plugin.

## Related

- [EntityLimiter](/docs/entitylimiter/) caps entity counts.
- [RedstoneLimiter](/docs/redstonelimiter/) throttles redstone activations.
- [Reduce entity lag with stacking](/guides/reduce-entity-lag-with-stacking/) compares BlockLimiter with the stacking plugins.
