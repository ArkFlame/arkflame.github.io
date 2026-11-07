---
title: "SH-Koth features and compatibility"
description: "SH-Koth runs King-of-the-Hill events with Folia support. Operational documentation is maintained by the author."
plugin: "sh-koth"
category: "gameplay"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026"
---

SH-Koth runs King-of-the-Hill events. A player or team holds a capture zone for a set time to win the round. The plugin is aimed at Bukkit and Spigot servers and declares Folia support in its manifest.

## What it does

The repository describes one event format: King-of-the-Hill. The product data does not list command names, permission counts or configuration file counts for this plugin, so this page does not state them. Check the plugin's own files after you install it.

## Features

- King-of-the-Hill event format.
- Folia support, declared in the repository.
- Operational documentation kept by the author, outside this repository.

## Compatibility

- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no version range.
- Java: the build toolchain is Java 21. That is a build setting, not runtime guidance for your server.
- Folia: declared in the repository.

Folia support is a declaration. Before you run events on a Folia server, follow the [Folia-compatible plugins guide](/guides/folia-compatible-plugins/), which explains what the flag does and does not cover, and test one event in a region away from spawn.

## Install

Standard practice for a Bukkit-family plugin is to place the jar in `plugins/`, restart the server, and read the console for load errors. This is general practice, not a step the repository documents. Start the server once and check the generated folder before you change anything.

## Troubleshooting

- If the plugin does not load on Folia, remove it from the test copy and check whether the error goes away. The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) shows how to isolate one plugin.
- If event timing or rewards seem wrong, test with a short event and a test account before you change settings for everyone.

## Related

- [MineKoth](/docs/minekoth/) is another timed capture-the-hill plugin with reward configuration.
- [Lucky Pillars](/docs/lucky-pillars/) and [SquidGameX](/docs/squidgamex/) are other event-style gameplay plugins in the catalogue.
- [Folia-compatible plugins guide](/guides/folia-compatible-plugins/)
