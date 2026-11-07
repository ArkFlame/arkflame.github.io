---
title: "Practice server PvP plugin: duels, queues and kits"
description: "Set up a Spigot practice server with FlamePractice: duels, ranked queues, FFA, arenas and kits, with a test plan before you open queues to players."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["flamepractice", "smp-combat", "smp-weapons", "hubcombat"]
topics: ["practice", "pvp", "duels", "queues", "kits"]
---

A practice server lets players fight in controlled matches, such as one-on-one duels, ranked queues or free-for-all rounds. FlamePractice runs that model on Spigot. It covers arenas, queues, kits and player state, and it is set up through five configuration files. This guide covers the order to set it up, how to build arenas and kits you can test, and what to check before you open queues to players.

## What FlamePractice covers

The plugin runs three modes: duels, ranked queues and FFA. Arenas define where matches happen. Queues decide who plays whom. Kits define what each player starts with. Player state, such as their inventory and position during a match, is handled by the plugin.

The repository declares thirty commands and forty-eight permissions. The product data does not list those commands by name, so read the help output and the permission list before you give access to players or staff.

## Requirements and compatibility

- Platform: Spigot.
- Built against Spigot API 1.13.2.
- Java: the repository's compile target is Java 8. That is a build setting, not runtime guidance for your server.
- Folia: declared in the repository.

The repository does not state a Minecraft version range. Test on the version you run, and do not assume a range from the API level.

Folia support is a declaration. Ranked queues and FFA rounds put many players in motion at once, so test a full queue cycle on a Folia copy before you run it live. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Install and first start

Place the jar in `plugins/`, restart and read the console. This is standard practice for Spigot plugins, not a repository step. Keep the first start on a test server, and read every warning, since a missing arena or kit definition often shows up there first.

## Build one arena and one kit

Start small. Build one arena and one kit, then test a duel with two test accounts. Check that both players spawn in the right place, the kit is correct, and the match ends cleanly. Only then add the second arena, the ranked queue and FFA.

Keep kit definitions short. Each item you add is a balance decision that affects every match, so change one item at a time and play a few matches after each change.

## Set up queues

Queues connect players who want to fight. Set the queue for one mode first. Test it with four test accounts, two in each queue slot, so you see the match start and end. Confirm that a player who leaves the queue is removed from it.

Ranked and FFA use the same plugin but different rules. Test each one separately, because a match with more than two players exercises code paths a duel does not.

## Test plan

Run this before you open the server:

1. Install FlamePractice on a test server and confirm the console shows no arena or kit errors.
2. Play one duel from start to finish with two test accounts.
3. Join a queue, leave it, and join again.
4. Play a ranked match and check its result.
5. Play one FFA round with at least three test accounts.
6. Restart the server and repeat one duel.

## Combat rules on the same server

FlamePractice handles matches. Combat rules outside matches, such as tagging or weapon restrictions on the rest of the network, belong to other plugins. [SMP Combat](/plugins/smp-combat/) adds combat tags and elytra rules, and [SMP Weapons](/plugins/smp-weapons/) adds legendary weapons. Test any combined setup on a copy first, since two combat plugins can disagree on damage or state.

## Troubleshooting

If a player is stuck in a match, check how the match ends and test the command that closes it. If a queue does not start, confirm the arena and queue settings are present, then test with two accounts. If a kit gives the wrong items, check its definition for a typo in the item name. For wider problems, the [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) shows how to isolate the cause.

## Frequently asked questions

### Does FlamePractice work on Paper?

The product data lists Spigot as the platform. Test on Spigot, the platform the repository names, before you consider any other server type.

### Is FlamePractice Folia-ready?

The repository declares Folia support. Treat that as a claim until you test a full queue cycle on your own Folia copy.
