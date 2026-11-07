---
title: "Lucky Pillars features and compatibility"
description: "Lucky Pillars implements the Pillars of Fortune minigame, with five commands, 24 permissions and config for GUIs, hotbars and scoreboards."
plugin: "lucky-pillars"
category: "gameplay"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. PlaceholderAPI and TAB are hard dependencies"
---

Lucky Pillars implements the Pillars of Fortune minigame. Players stand on pillars, and random blocks decide what each round offers. The plugin ships five commands and twenty-four permissions, with configuration for GUIs, hotbars, messages and scoreboards.

## What it does

Each round runs the Pillars of Fortune loop. The plugin manages the rounds, the player hotbar and the scoreboard during play. Because GUIs, hotbars, messages and scoreboards are all configurable, you can adjust how a round looks without changing the game logic.

## Features

- Pillars of Fortune rounds.
- GUI, hotbar and scoreboard configuration.
- Five commands and twenty-four permissions, as declared in the repository.
- Folia support, declared in the repository.

## Requirements

- PlaceholderAPI. It is a hard dependency.
- TAB. It is a hard dependency.
- Platforms: Paper.
- Minecraft version: built against Paper API 1.20.4.
- Java: compile target Java 8. That is a build setting, not runtime guidance.

Install PlaceholderAPI and TAB first, confirm they load, and then add Lucky Pillars.

## Compatibility

Folia support is a declaration. A round moves many players and blocks at once, so test a full round on a Folia copy in a region away from spawn before you run the minigame there. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Paper plugins, not a repository step.

## Running a round

Run one round with a few test accounts before you schedule the event. Check the hotbar, the scoreboard and the end-of-round messages. Change one configuration file at a time, since the GUI, scoreboard and message files all affect what players see.

## Troubleshooting

- If the plugin does not start, check that PlaceholderAPI and TAB loaded first.
- If the scoreboard shows raw placeholder text, check that PlaceholderAPI is loaded and that TAB is reading the same placeholders.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a load failure.

## Related

- [SquidGameX](/docs/squidgamex/) is another large event minigame.
- [Disasters](/docs/disasters/) is a Paper minigame that needs WorldEdit.
- [SMP Lobby](/docs/smp-lobby/) covers the lobby that players return to between rounds.
