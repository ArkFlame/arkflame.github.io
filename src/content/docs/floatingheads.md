---
title: "FloatingHeads features and compatibility"
description: "FloatingHeads renders floating heads, NPC-style displays and holograms."
plugin: "floatingheads"
category: "gameplay"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. The local directory is Smarts-Hub/Floating-Heads"
---

FloatingHeads renders floating heads, NPC-style displays and holograms in the world. The plugin depends on PacketEvents, which handles the packet work behind the displays.

## What it does

The plugin places heads and text displays where you configure them. It is set up through a main config file and an example head definition file, so you can copy an example and change the texture or position.

## Features

- Floating head and hologram displays.
- Example head configuration.
- PacketEvents dependency.

## Requirements

- PacketEvents. The plugin depends on it, so install PacketEvents first and confirm it loads.
- Platforms: Bukkit, Spigot and Paper.
- Minecraft version: the repository states no version range.
- Java: compile target Java 17. That is a build setting, not runtime guidance.

## Compatibility

The product data does not declare Folia support for FloatingHeads. Treat it as unverified on Folia. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what to check before you run a plugin on Folia.

## Install

Install PacketEvents, place the FloatingHeads jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins, not a repository step.

## Configuration

Keep the example definitions as a reference and create your own entries in the main config. Change one head at a time, reload or restart as needed, and check its position in game. Displays placed near spawn are easier to check than displays in a busy builder area.

## Troubleshooting

- If the plugin does not load, check that PacketEvents loaded first.
- If a head does not show, check that the texture or definition is valid, then read the console for a config warning.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a load failure.

## Related

- [SH-Pets](/docs/sh-pets/) also depends on PacketEvents.
- [Leash Workers](/docs/leash-workers/) also depends on PacketEvents.
- [FancyGlow](/docs/fancyglow/) adds player glow colours with TAB.
