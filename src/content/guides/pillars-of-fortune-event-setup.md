---
title: "Pillars of Fortune plugin: event setup and checks"
description: "Run a Pillars of Fortune minigame on Paper with Lucky Pillars: PlaceholderAPI and TAB dependencies, GUI and scoreboard setup, and a test round first."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["lucky-pillars", "squidgamex", "disasters", "smp-lobby"]
topics: ["minigame", "pillars", "events", "paper"]
---

Pillars of Fortune is a minigame where players stand on pillars and random blocks decide what each round offers. Lucky Pillars implements it for Paper. It ships five commands, twenty-four permissions and configuration for GUIs, hotbars, messages and scoreboards. This guide covers the dependencies, the order to set up a round, and the checks to run before you schedule an event.

## What Lucky Pillars covers

The plugin runs Pillars of Fortune rounds. It manages the round flow, the player's hotbar during play and the scoreboard. Each of those can be configured, so you can change how a round looks without changing the game logic.

The repository declares five commands and twenty-four permissions. The product data does not list the commands by name, so read the help output after you install.

## Dependencies

Two plugins are hard dependencies. The product data states both:

- PlaceholderAPI.
- TAB.

The product data does not say which of these files uses each one, so check the config after install.

Install both first, confirm each one loads, then add Lucky Pillars. If either one is missing, the plugin will not start cleanly. The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) shows how to check dependency load order when a plugin fails at startup.

## Platform and compatibility

- Platform: Paper.
- Built against Paper API 1.20.4.
- Java: the repository's compile target is Java 8. That is a build setting, not runtime guidance for your server.
- Folia: declared in the repository.

The build target is Paper API 1.20.4. The repository does not state a broader version range, so test on the version you run.

Folia support is a declaration. A round moves many players and blocks at once, so test a full round on a Folia copy in a region away from spawn before you run the minigame there. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Set up the round

This order is a suggestion, not a repository requirement. Test after each step:

1. Configure the GUI. The GUI is the first thing players see, so check its layout and text with a test account.
2. Configure the hotbar. Confirm the items appear at the right slots when a round starts.
3. Configure the scoreboard. Check that each placeholder shows a value, not raw text.
4. Set the messages. Keep them short, since they appear during fast rounds.

Change one file at a time. The GUI, hotbar, scoreboard and message files all affect what a player sees, so a change in one can look like a fault in another.

## Test a full round

Run at least one full round with a few test accounts before you schedule an event. Check the start, the play phase, the end of the round and the messages at each step. Confirm the hotbar and the scoreboard reset for the next round. A round that works once can still fail on the second run, so run two.

## Event planning

Plan the event around the player count you expect. A round with four players tests different paths from a round with twenty. If you expect a large event, run a test with the same number of test accounts or as close as you can get, and watch the server during the round with the [diagnose-lag guide](/guides/diagnose-lag-before-limiters/) in mind.

## Troubleshooting

If the plugin does not start, check that PlaceholderAPI and TAB loaded first. If the scoreboard shows raw placeholder text, confirm PlaceholderAPI is loaded and that TAB reads the same placeholders. If a message does not appear, check its file for a formatting error in the console. For a conflict with another plugin that changes the hotbar or scoreboard, remove that plugin on a test copy and repeat the round.

## Related events

If you want a different event format, compare these before you choose. [SquidGameX](/plugins/squidgamex/) runs large Squid Game-style rounds with several games. [Disasters](/plugins/disasters/) is a Hypixel-style minigame on Paper 26.2 that needs WorldEdit. [MineKoth](/plugins/minekoth/) runs timed capture-the-hill events with rewards.

## Frequently asked questions

### Do I need PlaceholderAPI and TAB?

Yes. The product data lists both as hard dependencies. Install them before Lucky Pillars.

### Which Paper version should I use?

The repository builds against Paper API 1.20.4. Test on the version you run, since the repository does not state a broader range.

### Can I run an event on Folia?

The repository declares Folia support. Test a full round on your own Folia copy before you run an event there.
