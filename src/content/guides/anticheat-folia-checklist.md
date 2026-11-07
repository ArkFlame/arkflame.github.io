---
title: "Anticheat on Folia: what to check first"
description: "Before you trust an anticheat on Folia, check its dependencies, scheduling, alerts and optional hooks. FairPlay is the worked example."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["fairplay"]
topics: ["anticheat", "folia", "scheduling", "false-positives"]
---

An anticheat on Folia has two jobs: catch cheaters, and not disturb honest players. Folia runs each region on its own thread, so a check that reads or changes player state from the wrong thread can fail in ways a single-threaded server never shows.
This checklist uses FairPlay as the worked example. FairPlay declares `folia-supported: true` and is built on PacketEvents. GrimAC is not a product in this catalogue. FairPlay can read flags from GrimAC when it is installed, and it runs without it. The same steps apply to any anticheat you evaluate.

## 1. Confirm the hard dependencies load

FairPlay declares PacketEvents as a dependency. Without it, FairPlay does not start. Check the console on startup for the PacketEvents load line before you check anything else. A packet-level failure usually starts there.

Confirm the PacketEvents version you run is the one your anticheat expects, and that it loads on your Folia build.

## 2. Treat the Folia flag as a claim

`folia-supported: true` tells the server the plugin intends to run on Folia. It does not show that the code schedules work on the correct region. Read the [Folia compatibility guide](/guides/folia-compatibility/) for the rule to check: every world, block and entity access must run on the thread that owns that state.

Run the anticheat on a Folia test server with several players spread across regions. Watch for scheduler errors in the console. An `UnsupportedOperationException` is a sign of main-thread code running on Folia.

## 3. Check where alerts and punishments run

An anticheat acts on what it sees. Check three paths:

- Alerts to staff.
- Punishments, such as kicks, mitigation and bans.
- Ban waves, if you use them.

FairPlay has permission-scoped alerts, punishments and ban waves. Test each one with a test account. Confirm that the action lands on the right player, in the right region, and that the log entry is correct.

## 4. Start with alerts before punishments

Run alerts only for the first stretch. Review every alert against what you saw in play. Turn on punishments only after the false positive rate is acceptable for your players.

FairPlay also records aim-model data and has review windows. Use those windows to check flagged players before you act on them.

## 5. Check the optional hooks

FairPlay's optional hooks are GrimAC and Vulcan. The repository lists them as soft dependencies. FairPlay loads without them, and a missing hook is expected. Do not treat a missing hook as a failure.

If you do run GrimAC or Vulcan alongside FairPlay, check that the flags you rely on still show in the logs after a restart.

## 6. Check false positives on your own players

Test with the players you actually have. Your player base decides which checks misfire, not the defaults. Read the [FairPlay false-positives guide](/guides/fairplay-false-positives/) for the cases this repository covers before you set any threshold.

Keep a list of flagged players who turned out to be honest. Use it to tune the checks you need. Disable only the checks that cause the problem.

## 7. Confirm reload and shutdown

Reload and restart the server with the anticheat enabled. Watch the console for errors on both steps. Check that the anticheat does not keep stale state for players who left during the restart.

## Version and runtime notes

- FairPlay's README states 1.8 to 1.21. The build targets spigot-api 1.21.11, so treat that range as a claim until you test it.
- Java 8 is the compile target. That is not runtime guidance.
- The repository has no runtime-version matrix. Your own test server is the only evidence for your setup.

## What this checklist does not prove

Passing these steps shows the anticheat starts, schedules work on the expected path and produces alerts you can review. It does not prove the anticheat is accurate on your player base. That needs a review period on live players.

For the product details, see the [FairPlay product page](/plugins/fairplay/).

## Frequently asked questions

### Does FairPlay work on Folia?

The repository declares Folia support. Verify scheduling and alerts on your own Folia build before you rely on it.

### Is GrimAC required?

No. GrimAC is an optional hook. FairPlay runs without it.

### Should alerts run before punishments?

Yes. Start with alerts, then add punishments once you have checked the flags.
