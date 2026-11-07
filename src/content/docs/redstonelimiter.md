---
title: "RedstoneLimiter configuration and monitor mode"
description: "RedstoneLimiter scopes, presets, monitor mode, commands, permissions and configuration keys."
plugin: "redstonelimiter"
category: "performance"
updated: 2026-10-30
---

## What it does

RedstoneLimiter counts observable redstone activity per spatial scope. It blocks activity when a scope exceeds its period maximum. It observes redstone transitions (`BlockRedstoneEvent`), observers (`BlockPhysicsEvent`), dispensers and droppers (`BlockDispenseEvent`), and pistons (extend and retract). Piston push length is checked separately with `max_piston_push`, default `12`.

Signals flow `Block -> Subchunk -> Chunk -> Region`. An activation is recorded at every scope it reaches. The first blocking scope returns. Material overrides exist at block scope, with `DEFAULT` as the only fallback. `GLOBAL` is legacy-only.

Quarantine is manual.

## Requirements

- A Bukkit/Spigot-family server. `plugin.yml` declares `api-version: 1.13` and `folia-supported: true`.
- No plugin dependencies. The file has no `depend` or `softdepend` entries.
- Redis only when `notifications.cross_server.enabled` is on. It ships `false`.
- The POM compiles Java 8 against `spigot-api 1.8.8`. Runtime code uses modern Chunk/Region APIs and shaded Adventure, so the compile target is not a server floor.


## Install

Install from the current [BuiltByBit release](https://builtbybit.com/resources/redstonelimiter-smart-redstone-limiter.23133/). Place the jar in your server's plugins directory and start the server. The listing handles distribution and updates.

## Configure

The configuration contract is version 7. Startup and reload migrate older files, then save.

- Block maxima are per material: `DEFAULT: 5`, `REDSTONE_WIRE: 12`. Subchunks `96`, chunks `1024`, regions `96`.
- Every scope has `period.duration-millis` `5000`, `period.sustain-millis` `2000`, and `period.sliding: true`.
- `enabled: false` records telemetry without blocking. `max-activations: 0` means unlimited.
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

Presets multiply max activations only: `STRICT` `1.0x`, `BALANCED` `1.5x`, `LENIENT` `2.0x`. Duration and sustain do not change. TPS scaling also multiplies the maxima: `1.0x` at or below `16.0` TPS, `2.0x` at or above `19.5`, linear in between.

Monitor mode (`monitor: true`) bypasses enforcement and its effects. It keeps detection, verdicts, throttled notifications and telemetry, and exemptions. Quarantine and max piston push become alerts. The comparator/trapdoor guard is bypassed. Notifications then mean "would block". `/rl reload` applies it.

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
- `redstonelimiter.notify` receives notifications. Configurable through `notifications.permission`.

## Troubleshooting

- **Legitimate circuits throttled.** Raise maxima, duration, or sustain. Or change the preset, or whitelist the chunk.
- **Observer activity not cancelled.** Observer physics is uncancellable telemetry.
- **Contraptions not analyzed.** Only piston push length is checked.
- **TPS reads unavailable.** A missing or invalid TPS falls back to the `1.0x` multiplier.
- **Old keys.** Version 7 migration maps `anti-lag.sliding-window.*` to per-scope periods and `blocks.threshold.*` to `max-activations.*`. Whitelist and quarantine lists survive.
- **Folia.** Player and entity work uses `runTaskForEntity`, region work uses `runTaskForRegion`, and global work uses the Folia scheduler when available.


## Related

- [RedstoneLimiter product page](/plugins/redstonelimiter/)
- [Diagnose lag before adding limiters](/guides/diagnose-lag-before-limiters/)
- [Folia compatibility notes](/guides/folia-compatibility/)
- [Plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/)
- [ExploitFixer packet abuse guide](/guides/exploitfixer-packet-abuse/)
