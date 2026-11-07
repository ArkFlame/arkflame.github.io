---
title: "SMP Harvest features and compatibility"
description: "SMP Harvest adds harvest progression with upgradable hoes, XP, tokens and rewards. Eight configuration files and thirty-two permissions cover the loop."
plugin: "smp-harvest"
category: "smp"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. The repository has no user README"
---

SMP Harvest adds a harvest progression loop to a survival server. Players upgrade their hoe, earn XP from harvesting, collect tokens and claim rewards. The loop is set in eight configuration files.

## What it does

Harvesting gives XP, and XP unlocks upgrades to the hoe. Tokens are a second currency for rewards. The repository has no user README, so the rules on this page come from the descriptor and config. The product data does not list the commands, so check the config for the upgrade and token settings.

## Features

- Upgradable hoes and harvest XP.
- Tokens and reward configuration.
- Eight configuration files.
- Thirty-two permissions, as declared in the repository.

## Compatibility

- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no version range.
- Java: compile target Java 8. That is a build setting, not runtime guidance.
- Folia: declared in the repository.

Folia support is a declaration. Test harvest XP and token rewards on a Folia copy in a farm area away from spawn before you rely on it. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins, not a repository step.

## Progression balance

XP per harvest and the cost of each hoe upgrade set the pace. Test a full upgrade path with a test account and time it. Keep token rewards separate from the hoe upgrade cost so each one can be tuned on its own.

## Troubleshooting

- If XP does not increase, check the crop list and the XP setting in the config.
- If tokens do not pay out, check the reward table and test one reward.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a conflict with another farming plugin.

## Related

- [Harvestable Blocks](/docs/harvestableblocks/) defines regenerating mining and farming zones.
- [FlameSpawners](/docs/flamespawners/) adds configurable item-producing spawners.
- [SMP Rewards](/docs/smp-rewards/) adds daily and hourly rewards.
