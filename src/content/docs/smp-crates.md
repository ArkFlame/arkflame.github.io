---
title: "SMP Crates features and compatibility"
description: "SMP Crates is a configurable crate system. It documents Bukkit, Spigot and Paper 1.8–1.21+ support and declares Folia compatibility."
plugin: "smp-crates"
category: "smp"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026"
---

SMP Crates is a configurable crate system for survival servers. Crates hold rewards that players open, and the reward tables are set in configuration. It documents support for Bukkit, Spigot and Paper from 1.8 to 1.21+ and declares Folia compatibility.

## What it does

A crate is a container that gives a weighted set of rewards when a player opens it. You define the crates and their contents in configuration, so balance changes do not need a rebuild. The plugin ships three commands and twenty-three permissions. The product data does not list the commands by name, so check the plugin's help output after you install.

## Features

- Configurable crate rewards.
- Three commands and twenty-three permissions, as counted in the repository.
- Folia support, declared in the repository.

## Compatibility

- Platforms: Bukkit, Spigot and Paper.
- Minecraft version: the README states 1.8 to 1.21+.
- Java: compile target Java 8. That is a build setting, not runtime guidance.
- Folia: declared in the repository.

The version range is a README claim. Test each crate type on the version you run. Folia support is a declaration, so open test crates in regions away from spawn before you put a Folia server into use.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins. The repository data used for this page lists no extra install steps.

## Balance

Reward tables are the main risk. A common item with a high weight can flood the economy. Test each table by opening a batch of crates with a test account and count the results. Change one weight at a time.

## Troubleshooting

- If a crate opens but gives nothing, check that the reward table has entries and that each entry is valid. Read the console for a config error.
- If the crate does not open, check the permission for the player and the block or key you use to open it.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a plugin conflict.

## Related

- [Crates](/docs/crates-hcf/) is an HCF-oriented crate system that needs HolographicDisplays.
- [SMP Rewards](/docs/smp-rewards/) adds daily and hourly rewards.
- [SMP essentials plugin stack](/guides/smp-essentials-plugin-stack/) shows how crates fit into a small stack.
