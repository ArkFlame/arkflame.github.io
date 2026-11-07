---
title: "Disasters features and compatibility"
description: "Disasters implements a Hypixel-style Disasters minigame on Paper. The current source targets Paper 26.2 and Java 25, and requires WorldEdit."
plugin: "disasters"
category: "gameplay"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. Both the README and plugin.yml target 26.2; no older-version claim is made"
---

Disasters is a minigame in the style of the Hypixel Disasters game. Players survive rounds in which disasters change the arena. It runs on Paper and needs WorldEdit. The current source targets Paper 26.2 and Java 25.

## What it does

The plugin runs Disasters rounds with seven configuration files. WorldEdit is required because the arena handling depends on it. The product data does not list the commands or the disaster types, so read the config after you install.

## Features

- Disasters minigame rounds.
- Seven configuration files.
- WorldEdit dependency.

## Requirements

- Paper 26.2. The README and plugin.yml both target this version.
- Java 25, per the repository README.
- WorldEdit, a hard dependency. Install it first and confirm it loads.

No older Paper version is claimed, so do not assume the plugin works on a different version without testing it.

## Compatibility

The product data does not declare Folia support for this plugin. Treat it as unverified on Folia. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains how to check a claim before you run a plugin there.

## Install

Install WorldEdit, place the Disasters jar in `plugins/`, restart and read the console. Confirm the server runs Paper 26.2 and Java 25 before you install. This is standard practice, not a repository step.

## Running a round

Run a round with a few test accounts before opening it to players. Check that the arena resets between rounds and that the end-of-round step works. Keep a copy of the arena and config before you change disaster settings.

## Troubleshooting

- If the plugin does not start, check that WorldEdit is installed and loads first.
- If the arena does not reset, check the WorldEdit setup and the arena settings in the config.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a startup failure.

## Related

- [SquidGameX](/docs/squidgamex/) is another large event minigame.
- [Lucky Pillars](/docs/lucky-pillars/) is a Pillars of Fortune minigame.
- [Diagnose the lag source before installing another limiter](/guides/diagnose-lag-before-limiters/) helps when a round causes lag.
