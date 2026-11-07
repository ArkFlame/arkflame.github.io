---
title: "SMP Weapons features and compatibility"
description: "SMP Weapons adds configurable legendary weapons for SMP, PvP and FFA play. Arsenal menus, item definitions and messages are included."
plugin: "smp-weapons"
category: "smp"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. Jar version 1.1.5"
---

SMP Weapons adds legendary weapons for SMP, PvP and FFA play. Weapon definitions and arsenal menus are set in configuration, so you can add or change a weapon without code. The plugin is at jar version 1.1.5.

## What it does

The plugin defines a set of legendary weapons and presents them through arsenal menus. Each weapon's item definition and its messages live in configuration. The repository declares fourteen permissions. The product data does not list the weapons by name, so read the definitions file after you install.

## Features

- Legendary weapon definitions.
- Arsenal menus and messages.
- Fourteen permissions, as declared in the repository.
- Folia support, declared in the repository.

## Compatibility

- Platforms: Bukkit, Spigot and Paper.
- Minecraft version: the repository states no version range.
- Java: compile target Java 8. That is a build setting, not runtime guidance.
- Folia: declared in the repository.

Folia support is a declaration. Test weapon damage and menus in regions away from spawn before you run the plugin on a Folia server. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins, not a repository step.

## Balance

Legendary weapons are the most visible balance decision on a PvP server. Change one weapon at a time and test it in a short duel with two test accounts. Use the permission nodes to decide which players can take a weapon from the arsenal.

## Troubleshooting

- If a weapon does not appear in the arsenal, check its definition for a config error in the console.
- If a weapon's effect does not work, test it alone without other combat plugins to find the conflict.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a conflict.

## Related

- [SMP Combat](/docs/smp-combat/) adds combat tags and elytra rules.
- [FlameForge](/docs/flameforge/) adds custom weapons, upgrades and reforging.
- [SMP Menus](/docs/smp-menus/) provides help and rules menus.
