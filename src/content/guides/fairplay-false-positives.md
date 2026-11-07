---
title: "FairPlay false positives: inspect, trace, change one check"
description: "Use /fp alerts inspect and /fp latency diagnostics to verify a FairPlay flag before disabling checks, changing exemptions or recording an ML window."
updated: 2026-10-30
author: "LinsaFTW"
relatedPlugins: ["fairplay"]
topics: ["anticheat", "false positives", "operations"]
---

A FairPlay alert is a signal, not a verdict. Before you disable a check or grant an exemption, find out which check fired, whether the alert is for the player you think it is, and what the latency trace shows. The [FairPlay product page](/plugins/fairplay/) covers scope and the [docs](/docs/fairplay/) cover install. This page is the triage path.

## Point your alert feed at one player

`/fp alerts <enable|disable|toggle|inspect|clear> [player]` controls alerts for the staff member running it.

- `enable`, `disable` and `toggle` change your own subscription and save it. Player-only.
- `inspect <player>` sets your alert target to one player. It doesn't print history. It narrows the live feed until you clear it.
- `clear` removes that target.

Two permission details matter. The dispatcher first requires `fairplay.command`. `AlertsCommand` then checks `fairplay.command.alerts`, which isn't in the shipped `plugin.yml`. Ops bypass it, but a non-op staff rank needs the node granted. `fairplay.notify` is separate and controls receiving alerts. If an admin sees nothing, check both nodes before you assume the check is quiet.

## Verify the flag before touching a check

1. Reproduce with the same client version and the same action. A flag that shows up only during a lag spike is a different problem from one that shows up on every hit.
2. Record the check name, VLS and reason from the alert. FairPlay's built-in modules cover aimbot, autoclicker, autototem, fastbreak, hitbox, killaura, scaffold and timer. Which ones are active depends on your build.
3. Watch the player for a session without punishment commands. `/fp checks <enable|disable|toggle> <check|category>` changes check state. `/fp toggle <check|category>` is the shorthand.
4. Disable one check or category at a time, then reproduce. Disabling a whole category hides unrelated flags and makes the next report harder to read.

Combat-only posture matters. FairPlay has no movement prediction checks. Movement packets are telemetry for combat, aim, hitbox, interaction, scaffold, inventory and timing checks. A "movement false positive" usually belongs to one of those, not to a fly or speed module.

## Trace latency instead of guessing

`/fp latency <player> <seconds 1..120>` starts transaction-latency diagnostics for one player through the `BacktrackCombatSpikes` check. It streams records and ends with a summary: transaction samples, usable and unusable RTT samples, zero-RTT samples, attack attempts, accepted hits, spike matches, analyses, baseline rejections, resets and dropped records.

This is a diagnostic, not a latency compensation setting. Run it while the player reproduces the flag, then read the summary before you change `mitigations.yml`. The permission is `fairplay.command.latency`.

If the flag comes from reach compensation rather than detection, turn on `reach-increase.debug` in `mitigations.yml` and read the reason chain. `reach-increase applied` means the mitigation state was stored. `range`, `aim` and `visibility_*` show the first failed gate. Only `reach-increase damage-applied` proves a `MONITOR`-confirmed applied hit. Without that distinction, you might "fix" a compensation log that never applied damage.

## Record an ML window when the alert won't reproduce

For aim-model review, use the global window recorder:

```
/fp ml aim window record GLOBAL
/fp ml aim window status
/fp ml aim window stop
```

Recording needs `fairplay.command.ml.global`. Files land in `plugins/FairPlay/windows/global/<player>/<UTC-date-and-session>.json` after async finalization. They are per-player rotation captures and haven't been reviewed. Treat them as evidence to inspect, not training data to merge blindly. The `machine-learning-training` config block is for training only and doesn't affect runtime detection.

## Check the optional hooks and config state

GrimAC and Vulcan are optional `softdepend` entries. FairPlay loads and runs without either, so a missing hook is expected, not a failure. PacketEvents is the hard dependency, so a packet-level failure usually starts there.

There's no bundled YAML. Config is generated from annotated Java classes. A missing path logs `[FairPlay] Missing config value for path '…'`. That means the running build expects a key your file doesn't have. It isn't automatically corruption. `show-cancel-messages` defaults to `false` and `cancel-message-cooldown-ms` to `60000`, so a silent cancellation doesn't prove nothing happened.

## Exemptions beat global disables

The descriptor ships three targeted nodes, all default `false`:

- `fairplay.exempt` keeps tracking active while removing the player from checks.
- `fairplay.nosetback` stops setbacks but leaves detection.
- `fairplay.nomodifypacket` stops packet cancellation or modification.

Use these for a known legitimate player or a tournament exception. They're auditable and reversible. Disabling a check for everyone is neither.

## Frequently asked questions

### Is a FairPlay alert a verdict?

No. It is a signal. Check which check fired, which player it names and what the latency trace shows.

### Should I disable a check when it fires?

Not first. Verify the flag, then prefer an exemption over a global disable.

### Which command controls alerts?

`/fp alerts <enable|disable|toggle|inspect|clear> [player]`. The command applies to the staff member who runs it.
