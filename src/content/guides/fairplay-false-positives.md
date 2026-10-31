---
title: "FairPlay false positives: inspect alerts, trace latency, change one check"
description: "Use /fp alerts inspect and /fp latency diagnostics to verify a FairPlay flag before disabling checks, changing exemptions or recording an ML window."
updated: 2026-10-30
author: "LinsaFTW"
relatedPlugins: ["fairplay"]
topics: ["anticheat", "false positives", "operations"]
---

A FairPlay alert is a signal, not a verdict. Before you disable a check or hand out an exemption, capture which check fired, whether the alert belongs to the player you think it does, and what the latency trace shows. Start with the [FairPlay product page](/plugins/fairplay/) for scope; the [docs](/docs/fairplay/) cover installation, and this page is the triage path.

## Point your alert feed at one player

`/fp alerts <enable|disable|toggle|inspect|clear> [player]` controls alerts for the staff member running it.

- `enable`, `disable`, and `toggle` change your own subscription and persist it. The command is player-only.
- `inspect <player>` sets your alert target to one player. It does not print a history; it narrows the live feed until you clear it.
- `clear` removes that target.

Two permission details matter. The dispatcher first requires `fairplay.command`. `AlertsCommand` then checks `fairplay.command.alerts`, which is not declared in the shipped `plugin.yml`; ops bypass it, but a non-op staff rank needs the node granted explicitly. `fairplay.notify` is the separate permission for receiving alerts. If an admin sees nothing, check both nodes before assuming the check is silent.

## Verify the flag before touching a check

1. Reproduce with the same client version and the same action. A flag that appears only during a lag spike is a different problem from a flag that appears on every hit.
2. Record the check name, VLS, and reason from the alert. FairPlay's built-in modules cover aimbot, autoclicker, autototem, fastbreak, hitbox, killaura, scaffold, and timer; which of them are active depends on your build.
3. Watch the player without punishment commands for a session. `/fp checks <enable|disable|toggle> <check|category>` changes check state; `/fp toggle <check|category>` is the shorthand toggle.
4. Disable one check or category at a time and reproduce. Disabling a whole category hides unrelated flags and makes the next report harder to read.

Combat-only posture matters. FairPlay does not ship movement prediction checks; movement packets exist as telemetry for combat, aim, hitbox, interaction, scaffold, inventory, and timing checks. A "movement false positive" report usually belongs to one of those consumers, not to a fly or speed module.

## Trace latency instead of guessing

`/fp latency <player> <seconds 1..120>` starts transaction-latency diagnostics for one player via the `BacktrackCombatSpikes` check. It streams records and ends with a summary containing transaction samples, usable and unusable RTT samples, zero-RTT samples, attack attempts, accepted hits, spike matches, analyses, baseline rejections, resets, and dropped records.

This is a diagnostic, not a latency compensation setting. Run it while the player reproduces the flag, then read the summary before changing `mitigations.yml`. The permission is `fairplay.command.latency`.

If the flag is from reach compensation rather than detection, enable `reach-increase.debug` in `mitigations.yml` and read the reason chain. `reach-increase applied` proves the mitigation state was stored; `range`, `aim`, and `visibility_*` identify the first failed gate. Only `reach-increase damage-applied` proves a `MONITOR`-confirmed applied hit. This distinction prevents you from "fixing" a compensation log that never applied damage.

## Record an ML window when the alert is not reproducible

For aim-model review, use the global window recorder:

```
/fp ml aim window record GLOBAL
/fp ml aim window status
/fp ml aim window stop
```

Recording requires `fairplay.command.ml.global`. Files land under `plugins/FairPlay/windows/global/<player>/<UTC-date-and-session>.json` after asynchronous finalization. They are per-player rotation captures and are unreviewed; treat them as evidence to inspect, not as training data to merge blindly. The `machine-learning-training` config block is training-only and does not affect runtime detection.

## Check the optional hooks and config state

GrimAC and Vulcan are optional `softdepend` entries. FairPlay loads and runs without either; a missing hook is expected, not a failure. PacketEvents is the hard dependency, so a packet-level failure usually starts there.

There is no bundled YAML. Config is generated from annotated Java classes, and a missing path logs `[FairPlay] Missing config value for path '…'`. That message means the running build expects a key your file does not have; it is not automatically corruption. `show-cancel-messages` defaults to `false`, and `cancel-message-cooldown-ms` defaults to `60000`, so a silent cancellation is not proof that nothing happened.

## Exemptions beat global disables

The descriptor ships three targeted nodes, all default `false`:

- `fairplay.exempt` keeps tracking active while removing the player from checks.
- `fairplay.nosetback` stops setbacks but leaves detection.
- `fairplay.nomodifypacket` stops packet cancellation or modification.

Use these for a known legitimate player or a tournament exception. They are auditable and reversible. Disabling a check for everyone is neither.

## Version caveat and limits

The README says Minecraft 1.8–1.21 and Folia-supported. The runtime module compiles against `spigot-api 1.21.11-R0.1-SNAPSHOT` while source and target are Java 8. Those facts conflict, and the repository contains no runtime-version verification. Do not repeat "runs on 1.8" as tested.

This guide was not exercised on a live server. Command syntax, defaults, and log strings come from the repository; alert thresholds, latency interpretation, and ML file review depend on your build and players.

## Sources and review

Reviewed the FairPlay repository read-only on 30 October 2026: README, `fairplay/src/main/resources/plugin.yml`, `config/impl/MainConfig.java`, `config/FairConfig.java`, `commands/sub/AlertsCommand.java`, `ChecksCommand.java`, `LatencyCommand.java`, `docs/REACH-INCREASE-COMPENSATION.md`, and `docs/API.md`. No build or runtime execution. For a start failure rather than a flag, use the [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/).
