---
title: "SMP Rewards features and compatibility"
description: "SMP Rewards adds daily and hourly rewards with streaks, menus and playtime tracking. Four commands and ten permissions cover configuration and player access."
plugin: "smp-rewards"
category: "smp"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026"
---

SMP Rewards adds daily and hourly rewards to a survival server. Players claim a reward on a schedule, build streaks for returning on consecutive days, and see their playtime. Menus let them claim without typing commands.

## What it does

The plugin tracks when each player last claimed a reward, keeps a streak count, and records playtime. The schedule and the reward tables are configured. The repository declares four commands and ten permissions. The product data does not list the commands by name, so check the help output after you install.

## Features

- Daily and hourly rewards.
- Streaks and playtime tracking.
- Menus for claiming.
- Folia-aware scheduling, declared in the repository.
- Four commands and ten permissions, as declared in the repository.

## Compatibility

- Platforms: Bukkit, Spigot and Paper.
- Minecraft version: the repository states no version range.
- Java: compile target Java 8. That is a build setting, not runtime guidance.
- Folia: declared in the repository.

The Folia-aware scheduling is a repository claim. Test one daily claim and one hourly claim on a Folia copy before you rely on the schedule there. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins, not a repository step.

## Reward design

Hourly rewards are the most frequent source of items, so keep them small. Daily streaks reward returning players, so make sure the streak resets are clear to players. Test a full day cycle with a test account before you publish the tables.

## Troubleshooting

- If a claim does not reset at the expected time, check the schedule and the server time zone setting in the config.
- If a streak breaks unexpectedly, check the claim history for that test account.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a reward failure.

## Related

- [SMP Shards](/docs/smp-shards/) is an AFK-earned currency with a shop.
- [SLevels](/docs/slevels/) adds server-wide level progression with rewards.
- [SMP essentials plugin stack](/guides/smp-essentials-plugin-stack/) shows how rewards fit into a small stack.
