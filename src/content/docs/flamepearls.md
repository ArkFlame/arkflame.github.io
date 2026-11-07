---
title: "FlamePearls features and compatibility"
description: "FlamePearls corrects ender-pearl movement glitches and supports limiting stasis chambers. Behaviour is controlled from a single config file."
plugin: "flamepearls"
category: "gameplay"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. The repository README is title-only"
---

FlamePearls changes how ender pearls behave on a survival server. It corrects movement glitches that let players travel in ways the server does not intend, and it can limit stasis chambers, which are pearl-based builds that hold a player in place. All of its behaviour is set in one config file.

## What it does

The plugin has three stated features: ender-pearl glitch fixes, stasis-chamber limiting and a single config file. The repository README contains only a title, so the detailed behaviour of each fix is not described here. Read the config file after the first start to see what each option controls.

## Features

- Ender-pearl glitch fixes.
- Stasis-chamber limiting.
- A single config file for all behaviour.

## Compatibility

- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no version range.
- Folia: declared in the repository.

Folia support is a declaration. Pearl behaviour depends on player movement and entity timing, so test pearl throws and stasis builds in regions away from spawn before you rely on the plugin on a Folia server. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains how to check the claim.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins. The repository lists no extra install steps.

## Configuration

Everything is in one file, so change one value at a time. Save a copy of the original config before you edit it. After each change, restart or reload according to what the plugin supports, then test one pearl throw in a controlled area.

## Troubleshooting

- If a pearl fix conflicts with another movement plugin, disable one plugin on a test copy and repeat the throw. The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) shows how to isolate the conflict.
- If stasis chambers still form, check the limiting option in the config before you add another plugin. Adding a second limiter rarely fixes a single-option problem.

## Related

- [FlamePaper](/docs/flamepaper/) is a Paper 1.8.8 fork with redstone and tick-loop patches.
- [SMP Combat](/docs/smp-combat/) covers combat rules on SMP servers.
- [SMP Protections](/docs/smp-protections/) covers claims, which pearl abuse can cross.
