---
title: "SH-Pets features and compatibility"
description: "SH-Pets adds companion pets with abilities and events. Ten pet definition files and a level curve sit behind a PacketEvents dependency."
plugin: "sh-pets"
category: "gameplay"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. PacketEvents is a hard dependency"
---

SH-Pets adds companion pets to a server. Each pet has abilities, and the plugin can run pet events. The pet definitions and a level curve are set in configuration, and the plugin depends on PacketEvents.

## What it does

Players own pets that follow them and use abilities. The repository describes ten pet definition files and a level curve that controls how pets grow. The product data does not say how the files split the pets, so open them to see the layout. The product data does not list the abilities or commands by name, so read the pet files after you install.

## Features

- Companion pets with abilities.
- Ten pet definition files.
- Level and language configuration.
- Folia support, declared in the repository.

## Requirements

- PacketEvents. It is a hard dependency, so install it first and confirm it loads.
- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no version range.
- Java: compile target Java 8. That is a build setting, not runtime guidance.

## Compatibility

Folia support is declared in the repository. Pets move with their owner and use packets, so test pet movement and abilities on a Folia copy in a region away from spawn before you use them on a live server. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Install

Install PacketEvents, place the SH-Pets jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins, not a repository step.

## Balance

Pet abilities and the level curve decide how valuable a pet is. Start with a short curve and test each pet with a test account before you publish it. A pet that is too strong early can make other progression feel pointless.

## Troubleshooting

- If the plugin does not start, check that PacketEvents loaded first.
- If a pet does not follow its owner, check the pet definition and test with a test account.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a load failure.

## Related

- [Floating Heads](/docs/floatingheads/) also depends on PacketEvents.
- [Leash Workers](/docs/leash-workers/) also depends on PacketEvents.
- [SLevels](/docs/slevels/) adds server-wide progression that can sit alongside pets.
