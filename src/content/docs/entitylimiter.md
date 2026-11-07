---
title: "EntityLimiter entity caps"
description: "EntityLimiter sets hard caps on entity counts to prevent crash and lag from entity pressure. Compatibility and configuration overview."
plugin: "entitylimiter"
category: "performance"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026"
---

EntityLimiter sets hard caps on how many entities can exist. Entity pressure, such as too many mobs or items in one area, can crash a server or slow it down. A cap stops the count from growing past a level you choose.

## What it does

The plugin counts entities and enforces the limits in its config. When a cap is reached, the plugin stops new entities from adding to the load. The repository has eight configuration files covering limits, messages and behaviour. The README covers build and behaviour notes rather than a user manual.

## Features

- Entity-count limits.
- Crash and lag prevention.
- Eight configuration files.
- Folia support, declared in the repository.

## Compatibility

- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no version range. The README references a 1.21.5 Spigot API build.
- Folia: declared in the repository.

Folia support is a declaration. Entity caps touch every region, so test a cap on a Folia copy in a region away from spawn before you rely on it. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins, not a repository step. Measure entity counts first with the [diagnose-lag guide](/guides/diagnose-lag-before-limiters/), so you set limits based on a measured problem.

## Setting caps

Start with caps set well above normal counts, then lower them as you see the effect. A cap set too low stops players' farms and builds from working. Test each entity type with a test account.

## Troubleshooting

- If entities stop spawning where you expect them, check the cap for that type and the area it applies to.
- If messages do not appear, check the messages file among the eight config files.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a conflict with another entity plugin.

## Related

- [BlockLimiter](/docs/blocklimiter/) caps blocks per chunk.
- [MobStacker](/docs/mobstacker/) stacks mobs of the same type instead of capping them.
- [Reduce entity lag with stacking](/guides/reduce-entity-lag-with-stacking/) compares stacking and capping.
