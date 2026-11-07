---
title: "FlamePractice features and compatibility"
description: "FlamePractice runs duel, ranked and FFA practice on a Spigot-based server, with arenas, queues, kits and player state in five config files."
plugin: "flamepractice"
category: "gameplay"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. Built against Spigot API 1.13.2"
---

FlamePractice runs practice PvP on a Spigot-based server. It covers duels, ranked queues and free-for-all matches. Arenas, queues, kits and player state are set in five configuration files, and the plugin declares a large command surface.

## What it does

Players join a queue or start a duel, get a kit, and fight in an arena. The plugin tracks player state across the match. The repository declares thirty commands and forty-eight permissions. The product data does not list them by name, so check the help output and the permission list before you give access to players.

## Features

- Duels, ranked queues and FFA.
- Arena and kit configuration.
- Thirty commands and forty-eight permissions, as declared in the repository.
- Five configuration files.
- Folia support, declared in the repository.

## Compatibility

- Platforms: Spigot.
- Minecraft version: the repository states no version range. The build is against Spigot API 1.13.2.
- Java: compile target Java 8. That is a build setting, not runtime guidance.
- Folia: declared in the repository.

Folia support is a declaration. Ranked queues and FFA matches run many players at once, so test a full queue cycle on a Folia copy before you run it live. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Spigot plugins, not a repository step.

## Arenas and kits

Build one arena and one kit first. Test a duel, a ranked match and an FFA round with test accounts before you open more arenas. Keep the kit definitions small, since each kit is a balance decision.

## Troubleshooting

- If a queue does not start, check the arena and queue settings in the config, then test with two accounts.
- If a player is stuck in a match, check the player state handling and the command that ends a match.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a conflict with another PvP plugin.

## Related

- [Hub Combat](/docs/hubcombat/) adds PvP and weapons to a lobby.
- [SMP Weapons](/docs/smp-weapons/) adds legendary weapons for PvP and FFA.
- [SMP Combat](/docs/smp-combat/) adds combat tags on SMP servers.
