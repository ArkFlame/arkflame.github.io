---
title: "Choosing an anticheat for Paper and Folia"
description: "What to check before you run an anticheat on Paper or Folia: dependencies, the Folia flag, alerts and false positives. FairPlay is the worked example."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["fairplay"]
topics: ["anticheat", "paper", "folia", "combat"]
---

Pick an anticheat you can start without guessing. Check its hard dependencies, find out what its Folia flag does and does not prove, and run it in alert mode before any punishment is active. ArkFlame's combat anticheat is FairPlay. Its repository lists Bukkit, Spigot and Paper as platforms and declares Folia support.

This guide uses FairPlay as the worked example. The same steps apply to any anticheat you evaluate.

## What does FairPlay cover?

FairPlay is an AI combat anticheat with 169+ checks. It hooks into GrimAC and runs without Grim installed. Its repository lists Bukkit, Spigot and Paper as platforms. The Bukkit manifest declares `folia-supported: true`, which tells the server that the plugin intends to run on Folia. That declaration is not a test result. Read the [Folia compatibility guide](/guides/folia-compatibility/) before you rely on it.

## What does it need to start?

PacketEvents is a hard dependency. Without it, FairPlay does not start. GrimAC and Vulcan hooks are optional. When GrimAC is installed, FairPlay can read its flags. When it is not, FairPlay runs on its own checks.

The repository ships no runtime-version matrix. The README states 1.8 to 1.21, and the build targets spigot-api 1.21.11. Treat that range as a claim and test the version you actually run.

## Which checks should you trust first?

FairPlay has per-check and per-category toggles. Enable checks one category at a time, watch the alerts, and change one check before you change the next. Aim-model recording and review windows help when an alert does not reproduce on demand. The [FairPlay false-positives guide](/guides/fairplay-false-positives/) shows how to trace a flag before you change a check.

If a category produces alerts you cannot explain, leave it in alert mode and collect more samples. Do not disable the whole category to stop the noise. You lose the signal for the checks that are working.

## Should punishments run on day one?

No. Point alerts at one staff account. FairPlay supports permission-scoped alerts, punishments and ban waves, so you control who sees each one. Run the anticheat for about a week, read every flag, and compare it with what the player did. Turn on punishments and ban waves only after the alerts match what you saw in play.

## Is a proxy anticheat the same job?

No. FairPlay targets Bukkit, Spigot and Paper. Bot traffic and connection abuse on BungeeCord or Velocity need a different layer. FlameCord is the anti-bot proxy for BungeeCord and Waterfall. VeloFlame is the proxy for Velocity. The [proxy bot protection guide](/guides/velocity-proxy-bot-protection/) covers that layer.

## Steps for the first start

1. Install PacketEvents and confirm it loads before FairPlay.
2. Start the server and save the PacketEvents load line and the FairPlay start line.
3. Enable one check category in alert mode only.
4. Read every alert for a week. Trace each one that looks wrong.
5. Turn on punishments and ban waves once the alerts match real play.

## Why keep the first-start log?

Keep the console output from the first start. If a flag appears a month later, that log is your baseline. It shows whether the plugin loaded cleanly on the day you installed it, or whether a dependency was already missing. Without it, you have no way to tell a new fault from one that was present all along.

## Where does the Folia part fit?

On a region-threaded server, check where alerts and punishments run. The [Folia checklist for anticheats](/guides/anticheat-folia-checklist/) applies the same verification steps to FairPlay. Run each step on your own Folia build. Do not rely on the flag alone.

## Frequently asked questions

### Does FairPlay need GrimAC?

No. GrimAC is an optional hook. FairPlay runs without it.

### Does FairPlay need PacketEvents?

Yes. PacketEvents is a hard dependency. FairPlay does not start without it.

### Is FairPlay verified on Folia?

No. The repository declares Folia support. Verify scheduling and alerts on your own Folia build before you trust it.

### Which Minecraft versions does FairPlay support?

The README states 1.8 to 1.21. The build targets spigot-api 1.21.11. Treat that range as a claim and test the version you run.
