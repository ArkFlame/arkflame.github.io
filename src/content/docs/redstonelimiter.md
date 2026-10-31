---
title: "RedstoneLimiter configuration and monitor mode"
description: "RedstoneLimiter's scopes, presets, monitor mode, commands, permissions and config keys, plus the installation gap in its repository."
plugin: "redstonelimiter"
category: "performance"
updated: 2026-10-30
runtimeVerified: false
evidenceNote: "Reviewed against the RedstoneLimiter repository on 30 Oct 2026; not runtime-tested."
---

## What it does

RedstoneLimiter counts observable redstone activity per spatial scope and blocks activity when a scope's period maximum is exceeded. It observes redstone transitions (`BlockRedstoneEvent`), observers (`BlockPhysicsEvent`), dispensers and droppers (`BlockDispenseEvent`), and pistons (extend/retract). Piston push length is checked separately with `max_piston_push`, default `12`.

Signals flow `Block -> Subchunk -> Chunk -> Region`. An activation is recorded at every reached scope; the first blocking scope returns. Material overrides exist at block scope, with `DEFAULT` as the sole fallback. `GLOBAL` is legacy-only.

Quarantine is manual.

## Requirements

- A Bukkit/Spigot-family server. `plugin.yml` declares `api-version: 1.13` and `folia-supported: true`.
- No plugin dependencies: no `depend` or `softdepend` entries.
- Redis only when `notifications.cross_server.enabled` is on; it ships `false`.
- The POM compiles Java 8 against `spigot-api 1.8.8`, but runtime code uses modern Chunk/Region APIs and shaded Adventure. The compile target is not a server floor.
- No Minecraft version range is stated.

## Install

The repository does not document installation. `README.md` is unmodified Bukkit boilerplate, `TODO.md` is boilerplate, and `docs/tutorial.md` has no install section. This page does not invent jar-placement steps. Distribution and install details belong to the product listing: [RedstoneLimiter on BuiltByBit](https://builtbybit.com/resources/redstonelimiter-smart-redstone-limiter.23133/).

## Configure

The configuration contract is version 7; startup and reload migrate older files, then save.

- Block maxima are per material: `DEFAULT: 5`, `REDSTONE_WIRE: 12`; subchunks `96`, chunks `1024`, regions `96`.
- Every scope has `period.duration-millis` `5000`, `period.sustain-millis` `2000`, and `period.sliding: true`.
- `enabled: false` records telemetry without blocking; `max-activations: 0` is unlimited.
- A region is a fixed 32x32-chunk area, not a Folia scheduler region.

```yaml
config-version: 7
monitor: false
anti-lag:
  preset: "STRICT"
  tps-scaling:
    enabled: true
blocks:
  max-activations:
    DEFAULT: 5
    REDSTONE_WIRE: 12
chunks:
  max-activations: 1024
max_piston_push: 12
```

Presets multiply max activations only: `STRICT` `1.0x`, `BALANCED` `1.5x`, `LENIENT` `2.0x`. Duration and sustain do not change. TPS scaling also multiplies maxima: `1.0x` at or below `16.0` TPS, `2.0x` at or above `19.5`, linear between.

Monitor mode (`monitor: true`) bypasses enforcement and effects while keeping detection, verdicts, throttled notifications/telemetry, and exemptions. Quarantine and max piston push become alerts; the comparator/trapdoor guard is bypassed. Notifications then mean "would block". `/rl reload` applies it.

## Commands

`/redstonelimiter` and `/rl` are equivalent.

| Command | Behavior | Permission |
| --- | --- | --- |
| `/rl` | Aggregate statistics | `redstonelimiter.stats` |
| `/rl block` | Top block danger zones | `redstonelimiter.stats` |
| `/rl subchunk` | Top subchunk danger zones | `redstonelimiter.stats` |
| `/rl chunk` | Top chunk danger zones | `redstonelimiter.stats` |
| `/rl chunk <world> <chunk-x> <chunk-z>` | Opens the chunk's Blocks page; player only | `redstonelimiter.stats` |
| `/rl region` | Top region danger zones | `redstonelimiter.stats` |
| `/rl gui` | Control panel; `/rl menu` still works | `redstonelimiter.admin` |
| `/rl reload` | Reloads config after saved GUI changes | `redstonelimiter.reload` |
| `/rl tp <world> <x> <y> <z>` | Teleports to a notification target; player only | — |
| `/rl notifications` | Toggles personal notifications | notification permission |
| `/rl visit <server> <world> <x> <y> <z>` | Redis/proxy cross-server travel | notification permission |

## Permissions

All four descriptor nodes default to `op`:

- `redstonelimiter.admin` opens the control panel.
- `redstonelimiter.stats` reads statistics.
- `redstonelimiter.reload` reloads configuration.
- `redstonelimiter.notify` receives notifications; configurable through `notifications.permission`.

## Troubleshooting

- **Legitimate circuits throttled.** Raise maxima, duration, or sustain; change preset; or whitelist the chunk.
- **Observer activity not cancelled.** Observer physics is uncancellable telemetry.
- **Contraptions not analyzed.** Only piston push length is checked.
- **TPS reads unavailable.** Missing or invalid TPS falls back to the `1.0x` multiplier.
- **Old keys.** Version 7 migration maps `anti-lag.sliding-window.*` to per-scope periods and `blocks.threshold.*` to `max-activations.*`; whitelist and quarantine lists survive.
- **Folia.** Player/entity work uses `runTaskForEntity`, region work `runTaskForRegion`, and global work the Folia scheduler when available.

## Evidence and limits

Inspected: `plugin.yml`, `config.yml`, `docs/tutorial.md`, `pom.xml`, `README.md`, and `CHANGELOG.md`. Not verified: runtime behavior on any server or Folia build, Minecraft compatibility, TPS estimator accuracy, and preset effects on live contraptions. No performance numbers are asserted.

## Related

- [RedstoneLimiter product page](/plugins/redstonelimiter/)
- [Diagnose lag before adding limiters](/guides/diagnose-lag-before-limiters/)
- [Folia compatibility notes](/guides/folia-compatibility/)
- [Plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/)
- [ExploitFixer packet abuse guide](/guides/exploitfixer-packet-abuse/)
