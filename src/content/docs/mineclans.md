---
title: "MineClans features and compatibility"
description: "MineClans provides clans with power, land claiming, alliances and events."
plugin: "mineclans"
category: "gameplay"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. The repository README is empty; features come from the descriptor and config"
---

MineClans adds clans to a server. Players form a clan, build power, claim land, make alliances and join clan events. It integrates with several other plugins when they are installed.

## What it does

A clan is a group of players with shared power and claimed land. The plugin covers clan creation, power, land claims, alliances and events. The repository README is empty, so the features on this page come from the plugin descriptor and bundled config. Read the config to see the exact limits.

## Features

- Clan creation, power and alliances.
- Land claiming.
- Optional PlaceholderAPI, Vault, Dynmap and WorldGuard hooks.
- Clan events.

## Optional integrations

These are declared in the product data. Each one is optional:

- PlaceholderAPI, for clan names and power in other plugins.
- Vault, for economy features.
- Dynmap, for clan territory on a web map.
- WorldGuard, for region-based protection.
- PacketEvents is also listed in the product data as an integration.

If an integration is missing, check the console at startup to see which hook was skipped.

## Compatibility

- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no version range.
- Folia: not declared in the product data for this plugin.

Because Folia is not declared, treat MineClans as unverified on Folia. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains how to check a claim before you run a plugin there.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins. Install the optional hooks before MineClans if you plan to use them.

## Setting up clans

Start with the power and claim limits set low. Test clan creation, a claim, and an alliance with three test accounts before you open the plugin to players. Land claims affect everyone, so change one limit at a time.

## Troubleshooting

- If a claim does not stick, check whether WorldGuard or another region plugin is also controlling the same land.
- If a placeholder shows blank, confirm PlaceholderAPI loaded before MineClans.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a load or conflict problem.

## Related

- [MineClasses](/docs/mineclasses/) is a class system for MMORPG and HCF modes.
- [MineKoth](/docs/minekoth/) integrates with MineClans for clan-owned captures.
- [SMP Protections](/docs/smp-protections/) covers claims with menus.
