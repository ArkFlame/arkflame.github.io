---
title: "EntityLimiter entity caps"
description: "EntityLimiter sets hard caps on entity counts to prevent crash and lag from entity pressure. Compatibility and configuration overview."
plugin: "entitylimiter"
category: "performance"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026"
---

## What it does

EntityLimiter sets hard caps on entity counts. The caps stop crash and lag conditions caused by entity pressure.

## Configuration

Eight configuration files cover limits, messages and behaviour.

## Compatibility

- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no range. The README references a 1.21.5 Spigot API build.
- Folia: declared in the repository.
- The README covers build and behaviour notes rather than a user manual.

## Related

- [Reduce entity lag with mob and item stacking](/guides/reduce-entity-lag-with-stacking/)
- [Crash and dupe protection checklist](/guides/crash-and-dupe-protection-checklist/)
- [MobStacker](/plugins/mobstacker/) stacks same-type mobs before the caps apply.
