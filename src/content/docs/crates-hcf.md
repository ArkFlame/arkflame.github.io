---
title: "Crates features and compatibility"
description: "Crates is an HCF-oriented crate and reward system. The plugin descriptor covers a single command and requires HolographicDisplays."
plugin: "crates-hcf"
category: "gameplay"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. Local directory is ArkFlame/Crates"
---

Crates is a reward system built for HCF servers. Players open crates to receive items and rewards, and the crates can show holographic labels. The plugin requires HolographicDisplays at runtime, because the labels depend on it.

## What it does

The plugin provides a crate and reward loop for factions-style servers. Its descriptor declares a single command. The product data does not name that command or list the reward configuration, so read the plugin's config after the first start.

## Features

- Crate and reward loop.
- Focused on HCF servers.
- Single command, as declared in the plugin descriptor.
- HolographicDisplays dependency.

## Requirements

- HolographicDisplays. Install it first and confirm it loads, or the plugin will not start cleanly.
- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no version range.
- Java: compile target Java 8. That is a build setting, not runtime guidance.

## Compatibility

The product data does not declare Folia support for this plugin. Treat it as unverified on Folia. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains how to check a claim before you run it there.

## Install

Install HolographicDisplays, place the Crates jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins, not a repository step.

## Balance

Reward weights decide how quickly players gain value from crates. Test each crate with a test account before you open it to players, and change one weight at a time.

## Troubleshooting

- If the plugin does not start, check that HolographicDisplays loaded first.
- If holograms do not appear, check the HolographicDisplays version and the crate location in the config.
- For other startup failures, the [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating the cause.

## Related

- [SMP Crates](/docs/smp-crates/) is a configurable crate system for SMP servers, with three commands declared.
- [MineClasses](/docs/mineclasses/) is a class system for HCF and MMORPG modes.
- [MineClans](/docs/mineclans/) covers clans and land claims.
