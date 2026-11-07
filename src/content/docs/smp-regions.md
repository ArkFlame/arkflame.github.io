---
title: "SMP Regions resets, flags and commands"
description: "SMP Regions resets tracked temporary blocks in cuboid regions on a timer. Flags, commands, permissions and cache behaviour."
plugin: "smp-regions"
category: "smp"
updated: 2026-10-30
---

## What it does

SMP Regions manages cuboid regions whose player-made changes reset on a timer. It protects original map blocks, tracks temporary placements and breaks, persists the temporal cache, and skips resets when nothing changed. Regions resolve per world. When several match, the higher `priority` wins per flag. `__global__` provides a per-world fallback. The same region name may exist in different worlds.

Region files live under `plugins/SMPRegions/regions/<world>/<region>.yml`. Tracked blocks live under `cache/temporal_blocks/<world>/<x_y_z>.yml`. The plugin keeps its own region index and reset model and does not require WorldGuard. `/rg` is registered only when WorldGuard is absent.

## Requirements

- Bukkit/Spigot/Paper/Folia. `plugin.yml` declares `api-version: 1.13` and `folia-supported: true`.
- The README states a `1.8 -> 1.21.11` target and a Java 8 source target. That is a compatibility target, not a tested matrix.
- Optional soft dependencies: DecentHolograms, FancyHolograms, and `packetevents`.
- PacketEvents `2.13.0` is required only for local `time-lock` client-time simulation. It is not bundled.
- WorldGuard is not required for protection checks.

## Install

The README documents `mvn clean install`, which publishes the artifact to the local Maven repository. It names `target/SMPRegions-1.2.1.jar`. `pom.xml` declares `1.2.3`, and `CHANGELOG.md` stops at `1.2.0`. Confirm the built jar name from the build output.

Drop the jar in `plugins/` and start the server. The jar ships `config.yml`, `lang/`, and a disabled `regions/world/example-region.yml`. Resets, saves, and reloads operate on files under the data folder.

## Configure

A real region file:

```yaml
name: example-region
enabled: false
priority: 0
reset-every: 5
world: world
flags:
  pvp: deny
  use-elytra: deny
  block-break: deny
  temporal-block-place: allow
  temporal-block-break: allow
```

`reset-every` is in minutes. `0` disables automatic resets for that region. Manual `/smprg reset` and individual temporal timers still work. Temporal flags are evaluated first and are actor-independent. Owners, members, operators, and `smpregions.bypass` do not bypass an allowed temporal route. A denied or unset temporal flag falls through to permanent `block-place` or `block-break`. `entity_place` is independent and has no temporal mode.

Global defaults include `general.max-reset-blocks-per-tick: 20`, `reset-check-interval-seconds: 60`, `build-denied-adventure-mode: true`, and `temporal-block.restore-block-physics: false`. `chunk-unload: deny` keeps whole intersected chunks loaded via native tickets where the runtime supports them. Legacy runtimes log one warning and leave retention inactive. `__global__` rejects a non-unset `chunk-unload`.

## Commands

Base command `/smprg`, aliases `/smpregions` and `/smpr`.

- `/smprg wand`, `create`, `redefine` (`update`, `move`), `delete` (`remove`), `info`, `priority`
- `/smprg reset`, `list`, `flags`, `flag <region> <flag> <value|unset>`
- `/smprg load`, `save`, `reload`

Most accept `[-w <world>]`. `save` forces an immediate write.

## Permissions

`smpregions.admin` grants every node. Command nodes include `smpregions.command.use`, `.reload`, `.flag`, `.flags`, `.info`, `.list`, `.create`, `.delete`, `.redefine`, `.priority`, `.reset`, `.wand`, `.save`, and `.load`. `smpregions.bypass` bypasses gameplay restrictions after temporal evaluation.

Region-scoped nodes such as `smpregions.region.info.owner`, `smpregions.region.flag.member`, `smpregions.region.addmember.member`, `smpregions.region.delete.owner`, and `smpregions.region.redefine.owner` default to `false`. `smpregions.command.owner` and `smpregions.command.member` default to `true`.

## Troubleshooting

- An owner or op can still place tracked blocks: the temporal route is intentionally actor-independent.
- Local `time-lock` does nothing: PacketEvents is absent, or the lock is global. Local mode never changes world time.
- Chunk retention is inactive: the runtime lacks native chunk tickets, so the plugin logs one warning.
- A reset misses complex block data: v1 preserves inventories and front sign lines, not all block-entity metadata.
- Physics or liquid flags seem reserved but do nothing: the README calls them inactive in v1, and `use-physics-event` defaults to `false`.
- A region never resets automatically: `reset-every: 0` disables the timer.


## Related

- [SMP Regions product page](/plugins/smp-regions/)
- [SMP Lifesteal quick start](/docs/smp-lifesteal/)
- [Folia compatibility notes](/guides/folia-compatibility/)
- [Plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/)
- [SMP Punishments operations](/docs/smp-punishments/)
