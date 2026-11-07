---
title: "MineClasses features and compatibility"
description: "MineClasses assigns MMORPG or HCF classes through armour and applies their potion effects automatically. Class definitions and messages are configurable."
plugin: "mineclasses"
category: "gameplay"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. The repository README is title-only"
---

MineClasses gives players a class based on the armour they wear. Each class applies its potion effects automatically while the player wears the set. The plugin supports two modes, MMORPG and HCF, and both class definitions and messages are configurable.

## What it does

When a player equips a full class set, MineClasses recognises the class and applies its effects. When the armour comes off, the effects stop. The repository states two modes. The product data does not list class names, effect levels or commands, so read the class definitions in the config before you publish a server.

## Features

- Armour-based class selection.
- Automatic potion effects.
- MMORPG and HCF modes.
- Class definitions and messages set in configuration.

## Compatibility

- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no version range.
- Java: compile target Java 8. That is a build setting, not runtime guidance.
- Folia: not declared in the product data for this plugin.

Because Folia is not declared, treat MineClasses as unverified on Folia. Test effect timing and armour changes on a test copy before you use it there. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains how to check a claim.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins, not a repository step.

## Choosing a mode

MMORPG and HCF mode suit different server styles. Pick the mode that matches your gameplay before you write class definitions, because the definitions depend on the mode. Test each class with a test account by equipping the full set and checking the effects.

## Troubleshooting

- If a class does not apply, check that the full set matches the definition. A partial set usually does not count.
- If effects stay after the armour is removed, restart and test again. Then check for another plugin that also manages potion effects.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) shows how to find the conflicting plugin.

## Related

- [MineClans](/docs/mineclans/) adds clans, power and land claims.
- [Crates](/docs/crates-hcf/) is an HCF-oriented reward system.
- [Lucky Pillars](/docs/lucky-pillars/) is a gameplay minigame.
