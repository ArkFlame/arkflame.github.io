---
title: "FancyGlow features and compatibility"
description: "FancyGlow lets eligible players choose a glow colour through a menu, with TAB as the display integration. Glow definitions, menus and messages are configurable."
plugin: "fancyglow"
category: "gameplay"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. Version 4.1.0 in the descriptor"
---

FancyGlow lets eligible players pick a glow colour from a menu. The glow shows around the player, and TAB is the display integration that carries it. Glow definitions, menus and messages are all configurable.

## What it does

Eligible players open a menu, choose a colour and see the glow applied to them. Which colours a player can choose depends on the permissions you grant. The repository declares twenty-six permissions. The product data does not list the colour names, so read the glow definitions after you install.

## Features

- Player-selected glow colours.
- TAB display integration.
- Twenty-six permissions, as declared in the repository.
- Folia support, declared in the repository.

## Compatibility

- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no version range. The descriptor version is 4.1.0.
- Java: compile target Java 17. That is a build setting, not runtime guidance.
- Folia: declared in the repository.

Folia support is a declaration. Glow changes are applied to players, so test the menu and a glow on a Folia copy before you use it on a live server. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Install

Install TAB if you want the display integration, place the FancyGlow jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins, not a repository step.

## Permissions

Use the permission nodes to decide which glow colours each rank can choose. Test each rank with a test account, since a missing node often looks like a broken menu.

## Troubleshooting

- If the menu does not show a colour, check the permission for that colour on the test account.
- If the glow does not show in TAB, check the TAB integration and its config.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a display conflict.

## Related

- [FloatingHeads](/docs/floatingheads/) renders floating heads and holograms.
- [SMP Menus](/docs/smp-menus/) provides configurable menus for help and rules.
- [SLevels](/docs/slevels/) adds server-wide progression.
