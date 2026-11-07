---
title: "SMP Shards features and compatibility"
description: "SMP Shards adds an AFK-earned shard currency and a shop that spends it. The current source targets Paper and Folia 1.21.4+ and ships nine configuration files."
plugin: "smp-shards"
category: "smp"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026"
---

SMP Shards adds a currency that players earn by being AFK, and a shop where they spend it. The plugin targets Paper and Folia 1.21.4 or newer. Its shop prices and currency rules are set in nine configuration files.

## What it does

Players earn shards over time while they are AFK, and the shop lets them spend those shards on items or other rewards. The currency and the shop are separate settings, so you can change the earn rate without touching the prices. The product data does not list the shop items, so read the shop config after you install.

## Features

- AFK-earned shard currency.
- Shop and pricing configuration.
- Nine configuration files.
- Folia support, declared in the repository.

## Compatibility

- Platforms: Paper, Purpur and Folia.
- Minecraft version: the README states 1.21.4 or newer.
- Java: the repository states Java 21.
- Folia: declared in the repository.

The version range is a README claim. Test the shard earn rate and the shop on the version you run. Folia support is a declaration, so check the AFK detection and a shop purchase in a region away from spawn on a Folia copy before you rely on it. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains the claim.

## Install

Use a Java 21 runtime, place the jar in `plugins/`, restart and read the console. This is standard practice, not a repository step.

## Economy balance

An AFK earn rate can inflate an economy quickly, because AFK income does not depend on play. Start with a low rate and watch the shard total over a few days before you raise it. Test each shop price with a test account.

## Troubleshooting

- If shards do not increase, check the AFK settings in the config and test with a test account.
- If a purchase fails, check the price and the player's balance in the shop config.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a conflict with another economy plugin.

## Related

- [SMP Rewards](/docs/smp-rewards/) adds daily and hourly rewards.
- [SLevels](/docs/slevels/) adds server-wide level progression.
- [SMP essentials plugin stack](/guides/smp-essentials-plugin-stack/) shows how these plugins fit together.
