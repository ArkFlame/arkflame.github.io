---
title: "MineKoth features and compatibility"
description: "MineKoth runs time-limited capture-the-hill events with rewards. It integrates with Vault, MineClans, UltimateClans, holograms and PlaceholderAPI."
plugin: "minekoth"
category: "gameplay"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026"
---

MineKoth runs time-limited capture-the-hill events. Players contest a point, the plugin tracks the capture, and rewards go to the winner when the timer ends. It is a gameplay plugin for Bukkit and Spigot servers.

## What it does

Each event is a timed capture. The plugin ties the event to reward configuration, so you decide what the winner receives. It can also show clan, hologram and placeholder information when those plugins are installed.

## Features

- Timed capture-the-hill events.
- Reward configuration.
- Clan integration with MineClans and UltimateClans.
- Hologram and placeholder integration when those plugins are present.

## Optional integrations

The repository declares these integrations. None is a hard requirement stated in the product data, so check the plugin's startup messages after you install it:

- Vault, for economy-based rewards.
- MineClans or UltimateClans, for clan ownership of a capture.
- Holograms and PlaceholderAPI, for on-screen event information.
- TAB, for display integration.

If an integration is missing, the plugin should still load. Confirm that on a test server before you rely on a reward path that depends on one.

## Compatibility

- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no version range.
- Folia: not declared in the product data for this plugin.

Because Folia is not declared, treat the plugin as unverified on Folia. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains how to check a plugin's claim before you run it on a Folia server.

## Install

Standard practice for a Bukkit-family plugin is to put the jar in `plugins/` and restart. The repository data used for this page lists no extra install steps. Install Vault and any clan or placeholder plugin you plan to use first, then start the server and read the console.

## Troubleshooting

- A reward that does not pay out usually points to the economy or reward configuration. Test one reward with a test account before you run a full event.
- For a clan-related problem, check that the clan plugin loads before MineKoth. The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers load order and bisecting jars.

## Related

- [SH-Koth](/docs/sh-koth/) is another King-of-the-Hill plugin with Folia support declared.
- [MineClans](/docs/mineclans/) provides the clan layer that MineKoth can integrate with.
- [MineClasses](/docs/mineclasses/) is a class system for gameplay servers.
