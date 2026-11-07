---
title: "Leash Workers features and compatibility"
description: "Leash Workers lets players leash entities and assigns configured jobs to villagers. Needs PacketEvents; five commands, 25 permissions."
plugin: "leash-workers"
category: "gameplay"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. Local directory is ArkFlame/SMP-Leash; descriptor name is LeashWorkers"
---

Leash Workers lets players leash entities and assigns configured jobs to villagers. The plugin depends on PacketEvents and ships five commands with twenty-five permissions.

## What it does

The plugin covers two features: leashing entities and players, and giving villagers jobs. Job assignments are configured, so you choose which jobs exist and how they are granted. The product data does not list the commands by name, so check the help output after you install.

## Features

- Entity and player leashing.
- Villager job assignments.
- Five commands and twenty-five permissions, as declared in the repository.
- PacketEvents dependency.

## Requirements

- PacketEvents. Install it first. The plugin depends on it.
- Platforms: Bukkit, Spigot and Paper.
- Java: compile target Java 8. That is a build setting, not runtime guidance.
- Minecraft version: the repository states no version range.

## Compatibility

Folia support is declared in the repository. Leashing and villager jobs both change entity state, so test each job on a Folia copy in regions away from spawn before you use it on a live Folia server. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Install

Install PacketEvents, place the Leash Workers jar in `plugins/`, restart and read the console. The descriptor name is LeashWorkers, which is what the console shows. This is standard practice for Bukkit-family plugins.

## Configuration

Define one job at a time and test it with a test account. Give players the permissions for leashing only if you want them to leash, because the permission tree is wide.

## Troubleshooting

- If the plugin does not start, check that PacketEvents loaded first.
- If a villager does not take a job, check the job definition and the permission for the player who assigns it.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a load failure.

## Related

- [Floating Heads](/docs/floatingheads/) also depends on PacketEvents.
- [SH-Pets](/docs/sh-pets/) also depends on PacketEvents.
- [Reduce entity lag with stacking](/guides/reduce-entity-lag-with-stacking/) covers entity pressure from mobs and items.
