---
title: "An SMP essentials plugin stack that stays small"
description: "Build an SMP plugin stack from EssentialsLite, SMP Rewards, SMP Shards, SMP Menus and SMP Crates. Order, dependencies and what to test first."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["essentialslite", "smp-rewards", "smp-shards", "smp-menus", "smp-crates", "smp-harvest", "flameshop"]
topics: ["smp", "essentials", "economy", "rewards"]
---

Start with one command suite, then add rewards and currency one plugin at a time. EssentialsLite covers homes, warps, kits and teleports. SMP Rewards handles daily and hourly rewards. SMP Shards adds an AFK-earned currency and a shop. SMP Menus and SMP Crates give players menus and crates. Each one adds commands, permissions and config files. Add only what your players will use.

## Start with EssentialsLite

EssentialsLite is a broad essentials suite. It covers teleports, homes, kits, warps and administration. The repository has around one hundred commands and eighty-five permissions. It ships command, permission, menu, Redis and RTP-zone configuration. The project has no README, so the bundled config is the reference.

Install it first. Players need homes, warps and random teleports before rewards or shops make sense. Set the RTP zones and kit defaults before you open the server, not after the first player asks.

## Add rewards

SMP Rewards adds daily and hourly rewards with streaks, menus and playtime tracking. It ships four commands and ten permissions. Its descriptor declares Folia-aware scheduling. Set the reward amounts and streak rules in config, then check the playtime counter with a test account.

Rewards that pay out too fast change the economy. Start with small amounts and raise them after a week of play.

## Add a currency and a shop

SMP Shards adds an AFK-earned shard currency and a shop that spends it. It targets Paper, Purpur and Folia on 1.21.4+ and uses Java 21. It ships nine configuration files. Set the earn rate and the shop prices together, since one number changes the other's value.

If you want an inventory shop with a sell basket and a worth catalog, [FlameShop](/plugins/flameshop/) covers that. Its public listing describes Vault economy support. Choose one shop, not two that sell the same items.

## Add menus and crates

SMP Menus provides help and rules menus as an alternative to DeluxeMenus. Menus are defined in configuration. Use it for the pages players open often, such as rules and help.

SMP Crates is a configurable crate system with three commands and twenty-three permissions. Test each crate reward on a test account before you add it to a live key.

## Add farming progression only if you need it

SMP Harvest adds upgradable hoes, harvest XP, tokens and rewards across eight configuration files and thirty-two permissions. It is a progression layer, not a basic essential. Add it when your players farm as a goal, not as a side task.

## Order of work

1. Install EssentialsLite and set homes, warps, kits and RTP zones.
2. Add SMP Rewards and tune the streak and playtime rules.
3. Add a currency and shop. Pick SMP Shards or FlameShop, not both.
4. Add SMP Menus for rules and help.
5. Add SMP Crates and test each reward.
6. Add SMP Harvest only if farming progression is part of the server plan.

Add one plugin per session. Run a normal play session after each addition, then read the console before you add the next.

## Check Folia before you add the stack

Several of these plugins declare Folia support in their repositories. Others rely on store listing text. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) lists which claims come from a repository and which come from a listing. Verify each claim on your own build.

## Permissions

Each plugin adds its own permission tree. Give players the permissions that match their rank, and test with a non-admin account. A permission that is missing from the rank setup looks like a broken plugin, so check it before you blame the plugin.

## Frequently asked questions

### Do I need all of these plugins?

No. Start with EssentialsLite and add the others when players ask for them.

### Can I run SMP Shards and FlameShop together?

Technically you can install both. Pick one shop for the same items, or players will not know where to buy and sell.

### Do these plugins work on Folia?

Several declare Folia support in their repositories. The stack page does not prove it. Verify each plugin on your build.

### Which plugin should I add first?

EssentialsLite. Players need homes, warps and teleports before the rest of the stack matters.
