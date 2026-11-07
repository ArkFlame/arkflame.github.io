---
title: "SquidGameX features and compatibility"
description: "SquidGameX runs large Squid Game-style events with a set of game and configuration files. It is built for Bukkit, Spigot, Paper and Folia servers."
plugin: "squidgamex"
category: "gameplay"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026"
---

SquidGameX runs large Squid Game-style events. A round is made of several games, and players are eliminated as the rounds go on. The plugin is built for Bukkit, Spigot, Paper and Folia servers.

## What it does

The plugin is organised as a set of game files and configuration files. Each game in a round has its own definition, so you can change one game without changing the others. The repository holds ten or more game and configuration files. The product data does not list the games by name.

## Features

- Squid Game-style event rounds.
- Ten or more game and configuration files.
- Folia support, declared in the repository.

## Compatibility

- Platforms: Bukkit, Spigot and Paper, with Folia declared.
- Minecraft version: the repository states no version range.
- Folia: declared in the repository.

No version range is stated, so test one full round on the version you run before you schedule an event. Folia support is a declaration. A large event puts many players in one area, so test a full round on a Folia copy before you run it live. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins. The repository data used for this page lists no extra install steps.

## Running an event

Run a short round with a few test accounts first. Check that eliminations, timers and the end-of-round step all work before a large event. Keep a copy of the config files before you change game settings.

## Troubleshooting

- If a game does not start, check its config file for an error in the console.
- If players are not eliminated as expected, test the elimination rule with two test accounts.
- For wider lag during large events, use the [diagnose-lag guide](/guides/diagnose-lag-before-limiters/) to find the cost before you add limits.

## Related

- [Disasters](/docs/disasters/) is another event minigame, for Paper 26.2.
- [Lucky Pillars](/docs/lucky-pillars/) is a Pillars of Fortune minigame.
- [MineKoth](/docs/minekoth/) runs timed capture-the-hill events.
