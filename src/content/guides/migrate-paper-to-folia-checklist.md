---
title: "Migrate a Paper server to Folia: a plugin checklist"
description: "A Paper-to-Folia migration checklist: audit each plugin's Folia claim, test in order, check dependencies and read region-ownership errors."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["flamestack", "entitylimiter", "redstonelimiter", "fairplay", "exploitfixer", "smp-regions"]
topics: ["folia", "paper", "migration", "compatibility"]
---

Migrate in stages. Audit every plugin's Folia claim first, then move a copy of the server to Folia, then add the plugins one at a time. A Folia flag is a declaration, so each claim needs a test on your build. The steps below are a suggested order. Where a step comes from the ArkFlame product data, this guide says so. Where it is general practice, it is labelled that way.

## Audit the plugin list

List every plugin in `plugins/`. For each one, check the Folia claim. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) separates repository declarations from store-listing claims. Mark each plugin as declared, listing-only or undeclared. The product data marks a plugin as undeclared when its repository does not state Folia support. Those plugins are not known to be broken, but they need the most testing.

Also list the hard dependencies. The product data states these: [FairPlay](/plugins/fairplay/) needs PacketEvents, [ExploitFixer](/plugins/exploitfixer/) needs HamsterAPI, and [SMP Protections](/plugins/smp-protections/) needs [SMP Regions](/plugins/smp-regions/). Install each dependency first, since the dependent plugin will not start without it.

## Read what Folia changes

The [Folia compatibility guide](/guides/folia-compatibility/) covers the Folia model in detail. As general background, Folia runs regions on separate threads instead of one main tick loop. Code that reads or changes the world from the wrong thread can work on Paper and fail on Folia. Read that guide before you test.

## Make a copy

Copy the server directory, including worlds and plugin configs. Run the migration on the copy and keep the Paper server untouched. As general practice, do not test on the live world, since a failed test there can damage player data.

## Add plugins in order

Adding limiters and the anticheat first is a suggested order, chosen because they affect load and player safety. It is not a repository requirement.

1. Install [EntityLimiter](/plugins/entitylimiter/) and [BlockLimiter](/plugins/blocklimiter/) if you use them. The product data lists Folia support as declared for both. Confirm each loads.
2. Install [FlameStack](/plugins/flamestack/). The product data says it detects Folia capability at runtime, so check the startup messages for that.
3. Install [RedstoneLimiter](/plugins/redstonelimiter/) in monitor mode first. Monitor mode is a documented feature, so you can measure before you enforce limits.
4. Install [FairPlay](/plugins/fairplay/) with PacketEvents. Read the startup messages.
5. Install [ExploitFixer](/plugins/exploitfixer/) with HamsterAPI.
6. Add the SMP plugins last, one at a time.

After each addition, start the server, read the console and run a normal session. If a failure appears, the newest jar is the first suspect.

## Test in regions away from spawn

As general practice, spawn is the easiest place to test, but players spread across many regions. Run each feature in regions away from spawn, including player bases and farms, so you test the places players actually use.

## Read ownership errors

As general background, an exception that names a thread or a region usually points to a region-ownership problem. The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) shows how to isolate the plugin that causes it. One practical method is to remove a suspect plugin from the copy, reproduce the error, and check whether it disappears.

## Keep the Paper server as a fallback

As general practice, keep the Paper server and its backup until the Folia copy has run without errors for several days. If a plugin proves unsafe on Folia, you can move players back while you replace it.

## Check the lag numbers

Migration can change the performance profile. Measure tick and entity numbers on both servers under the same load. The [lag diagnosis guide](/guides/diagnose-lag-before-limiters/) explains how to find the largest cost before you add limits.

## Migration checklist

1. Audit each plugin's Folia claim.
2. Confirm hard dependencies.
3. Copy the server. Do not test on the live world.
4. Add the limiters and anticheat first.
5. Add SMP plugins one at a time.
6. Test in regions away from spawn.
7. Keep the Paper server until the Folia copy is stable.

## Frequently asked questions

### Do I need to rewrite my plugins for Folia?

Migrating a server does not require code changes to its plugins. Check whether each plugin declares Folia support, then test it. Rewriting plugins is the work of plugin authors.

### Is a Folia flag enough to migrate?

No. A flag declares intent. Test each plugin on your build.

### Can I migrate the whole server at once?

You can, but a failure then has many possible causes. Adding plugins one at a time keeps each failure traceable to one plugin.

### What if a plugin fails only on Folia?

Remove it from the copy and keep Paper running. Check the plugin's Folia claim again, then decide whether to replace it.
