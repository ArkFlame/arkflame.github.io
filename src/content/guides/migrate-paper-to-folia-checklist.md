---
title: "Migrate a Paper server to Folia: a plugin checklist"
description: "A Paper-to-Folia migration checklist: audit each plugin's Folia claim, test in order, check dependencies and read region-ownership errors."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["flamestack", "entitylimiter", "redstonelimiter", "fairplay", "exploitfixer", "smp-regions"]
topics: ["folia", "paper", "migration", "compatibility"]
---

Migrate in stages. Audit every plugin's Folia claim first, then move a copy of the server to Folia, then add the plugins one at a time. A Folia flag is a declaration, so each claim needs a test on your build. Keep the Paper server running until the Folia copy passes a normal play session.

## Audit the plugin list

List every plugin in `plugins/`. For each one, check the Folia claim. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) separates repository declarations from store-listing claims. Mark each plugin as declared, listing-only or undeclared. Undeclared plugins are not automatically broken, but they need the most testing.

Also list the hard dependencies. [FairPlay](/plugins/fairplay/) needs PacketEvents. [ExploitFixer](/plugins/exploitfixer/) needs HamsterAPI. [SMP Protections](/plugins/smp-protections/) needs [SMP Regions](/plugins/smp-regions/). Install the dependency first, or the dependent plugin fails at startup.

## Read what Folia changes

The [Folia compatibility guide](/guides/folia-compatibility/) explains the model. Folia replaces the single main-thread tick loop with region-owned scheduling. Code that reads or changes the world from the wrong thread can work on Paper and fail on Folia. Read that guide before you test. It tells you what to look for in the logs.

## Make a copy

Copy the server directory, including worlds and plugin configs. Run the migration on the copy. Keep the Paper server untouched. If the copy fails, you lose nothing and you have the working server to compare against.

Do not test on the live world. Folia changes the threading model, and a failed test on the live world can corrupt player data.

## Add plugins in order

Add the limiters and the anticheat first. They affect load and player safety the most.

1. Install [EntityLimiter](/plugins/entitylimiter/) and [BlockLimiter](/plugins/blocklimiter/) if you use them. Both declare Folia support in their repositories. Confirm each loads.
2. Install [FlameStack](/plugins/flamestack/). It detects Folia at runtime. Check its console line.
3. Install [RedstoneLimiter](/plugins/redstonelimiter/) in monitor mode first.
4. Install [FairPlay](/plugins/fairplay/) with PacketEvents. Read the start lines.
5. Install [ExploitFixer](/plugins/exploitfixer/) with HamsterAPI.
6. Add the SMP plugins last, one at a time.

After each addition, start the server, read the console, and run a normal session. If a failure appears, only the newest jar is in question.

## Test in regions away from spawn

Spawn is the easiest place to test. Players live in many regions. Run each feature in regions away from spawn, including player bases and farms. Check that each feature works there, not only at the first test point.

## Read ownership errors

Exceptions that name a thread or region point to a region-ownership problem. The [troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) shows how to isolate the plugin that causes the exception. Remove that plugin from the copy, reproduce the error, and check whether it disappears. That is a faster test than reading the stack trace alone.

## Keep the Paper server as a fallback

Do not delete the Paper server until the Folia copy has run for several days with no errors. Keep the Paper backup too. If a plugin turns out to be unsafe on Folia, you can move players back while you replace it.

## Check the lag numbers

Migration can change the performance profile. Measure tick and entity numbers on both servers under the same load. Use the [lag diagnosis guide](/guides/diagnose-lag-before-limiters/) to decide which source costs the most before you add limits.

## Migration checklist

1. Audit each plugin's Folia claim.
2. Confirm hard dependencies.
3. Copy the server. Never test on the live world.
4. Add the limiters and anticheat first.
5. Add SMP plugins one at a time.
6. Test in regions away from spawn.
7. Keep the Paper server until the Folia copy is stable.

## Frequently asked questions

### Do I need to rewrite my plugins for Folia?

Not for this checklist. Check whether each plugin declares Folia support, then test it. Rewriting is for plugin authors.

### Is a Folia flag enough to migrate?

No. A flag declares intent. Test each plugin on your build.

### Can I migrate the whole server at once?

You can, but a failure then points at everything. Add plugins one at a time so each failure has one cause.

### What if a plugin fails only on Folia?

Remove it from the copy and keep Paper running. Check the plugin's Folia claim again, then decide whether to replace it.
