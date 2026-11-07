---
title: "FlameForge features and compatibility"
description: "FlameForge adds custom weapons, upgrades and reforging. It documents Spigot, Paper and Folia support across 1.8.8 to 1.21.x and ships twenty-two permissions."
plugin: "flameforge"
category: "gameplay"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026"
---

FlameForge adds custom weapons to a server. Players upgrade a weapon, and reforging changes its stats. The weapon, upgrade and reforge rules live in six configuration files, so balance changes stay in the config.

## What it does

The plugin covers three areas: custom weapon definitions, upgrades that improve a weapon, and reforging. The repository declares twenty-two permissions. The product data does not list command names, so check the help output after you install.

## Features

- Custom weapons and upgrades.
- Reforging mechanics.
- Six configuration files.
- Twenty-two permissions, as declared in the repository.

## Compatibility

- Platforms: Spigot, Paper and Folia.
- Minecraft version: the README table states 1.8.8 to 1.21.x.
- Java: the README states Java 8+ bytecode.
- Folia: declared in the repository.

The version table is a README claim. Test each weapon type on the version you run. Folia support is a declaration, so test upgrades and reforges in regions away from spawn before you put a Folia server into use. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins, not a repository step.

## Balance

Weapon stats and upgrade costs decide how fast players advance. Change one weapon at a time, then test it with a test account in a PvP setting. A reforge that changes stats too much can make older weapons obsolete.

## Troubleshooting

- If a weapon does not appear, check its definition in the config and read the console for a parse error.
- If an upgrade fails, check the cost and the permission for the player.
- For a conflict with another combat plugin, use the [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/).

## Related

- [SMP Weapons](/docs/smp-weapons/) adds legendary weapons with arsenal menus.
- [SMP Combat](/docs/smp-combat/) adds combat tags and elytra rules.
- [Protect an SMP from griefing and exploits](/guides/protect-smp-from-griefing-and-exploits/) covers the wider SMP protection setup.
