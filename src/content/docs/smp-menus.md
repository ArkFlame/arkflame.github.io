---
title: "SMP Menus features and compatibility"
description: "SMP Menus provides help and rules menus as an alternative to DeluxeMenus. Menus are defined in configuration with a menu-driven interface."
plugin: "smp-menus"
category: "smp"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026"
---

SMP Menus provides help and rules menus for a survival server. Menus are defined in configuration, so you can build a help screen or a rules screen without writing code. The plugin is positioned as an alternative to DeluxeMenus for these two menus.

## What it does

The plugin opens menus that players reach through commands or items you set up. Help and rules are the two stated uses. The product data does not list the commands or menu files, so read the menu config after you install to see the layout options.

## Features

- Configurable help and rules menus.
- Menu-driven interface.
- Folia support, declared in the repository.

## Compatibility

- Platforms: Bukkit, Spigot and Paper.
- Minecraft version: the README states Bukkit 1.8 or newer.
- Java: compile target Java 8. That is a build setting, not runtime guidance.
- Folia: declared in the repository.

The README gives Bukkit 1.8 as the starting point, which is a claim, not a tested range. Test menus on the version you run. Folia support is a declaration, so open the menus in a region away from spawn on a Folia server before you rely on them. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins, not a repository step.

## Writing a menu

Start from one menu, such as rules, and keep the item count small. Open the menu on a test account and check each button. A menu that is too large is hard to read on a phone client, so keep the layout simple.

## Troubleshooting

- If a menu does not open, check its file for a config error in the console.
- If a button does nothing, check the command or action it points to, then test the command directly.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a menu conflict with another GUI plugin.

## Related

- [SMP Lobby](/docs/smp-lobby/) builds a lobby with titles and announcements.
- [SMP essentials plugin stack](/guides/smp-essentials-plugin-stack/) includes SMP Menus in a small plugin stack.
- [EssentialsLite](/docs/essentialslite/) includes menus among its features.
