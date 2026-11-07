---
title: "BlockLimiter per-chunk block limits"
description: "BlockLimiter caps block counts per chunk, set per block type, to limit load and persistence cost from dense player builds. Compatibility overview."
plugin: "blocklimiter"
category: "performance"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026"
---

## What it does

BlockLimiter caps block counts per chunk. Dense player-built structures cannot dominate load and persistence cost once a limit is set.

## Configuration

Limits are set per block type. Start with the blocks your players build most, then add others as you need them.

## Compatibility

- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no range.
- Folia: declared in the repository.
- Descriptor version: 1.0.9.

## Related

- [Reduce entity lag with mob and item stacking](/guides/reduce-entity-lag-with-stacking/)
- [Crash and dupe protection checklist](/guides/crash-and-dupe-protection-checklist/)
- [EntityLimiter](/plugins/entitylimiter/) caps entity counts.
