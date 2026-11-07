---
title: "FlameStack dropped-item stacking"
description: "FlameStack merges dropped items through a chunk-section index and a bounded reservation coordinator. Defaults, commands and Folia notes."
plugin: "flamestack"
category: "performance"
updated: 2026-10-30
---

## What it does

FlameStack merges dropped items without sweeping worlds or entities. Lifecycle events fill a concurrent world/chunk/16-block-section index. One global bounded async coordinator consumes a server-wide raw ticket budget per run. Merge reservations carry a TTL. Committed transactions are compensated, not discarded. Bukkit entity reads and writes run on the item's entity scheduler, or on the Bukkit main scheduler outside Folia.

The aggregate amount is virtual. The physical dropped stack stays at a vanilla-safe projection. When a player or hopper picks it up, the logical amount moves through managed inventory paths, and the vanilla pickup event is cancelled. Non-virtual items keep vanilla pickup behavior. FlameStack is not a clear-lag tool, an entity limiter, or a chunk optimizer.

## Requirements

- Java 8 bytecode. `pom.xml` sets `maven.compiler.release` to 8.
- `plugin.yml` declares `api-version: 1.13` and `folia-supported: true`. The README states Bukkit/Spigot/Paper API 1.13+.
- Adventure and MiniMessage are shaded and relocated. The plugin declares no external plugin dependency.
- Java 8 runtime.

## Install

The README documents:

```bash
mvn clean test package
```

The README names the output `target/FlameStack-0.0.3.jar`, but `pom.xml` and `plugin.yml` both declare `1.0.1`. Confirm the artifact from the build output or jar manifest, not the README filename.

Place the jar in `plugins/` and start the server. No proxy component exists. The first start creates `config.yml`. `/flamestack reload` re-reads it.

## Configure

```yaml
stacking:
  max-stack-size: 2304
  merge-radius: 8.0
  scan-interval-ticks: 20
  scan-budget-per-run: 64
  max-active-merge-reservations: 64
  reservation-timeout-millis: 10000
```

`candidate-scan-limit-per-item` defaults to `256`, is clamped to `1..2048`, and must be at least `candidate-limit-per-item` (default `64`). The comments call `scan-budget-per-run` a server-wide raw ticket budget, not a per-shard cap. Stale or ineligible tickets are filtered before a merge decision.

`allow_list` defaults to `enabled: true`, `mode: blacklist`, with `BARRIER`. With `trigger.enabled: true` and `respect-vanilla-max-stack: true`, stone `32 + 32` stays untouched, and `32 + 33` can merge. Non-stackable items become eligible at `1 + 1`. `display.enabled: true` and `always-visible: true` show the floating amount, formatted with the MiniMessage `display.format`. Invalid material names are logged and ignored.

`debug: false` enables bounded diagnostics for registration, index lookup, reservations, and merge decisions. The config says to keep it off in normal operation.

## Commands

`/flamestack [help|reload|stats]`, with aliases `/fs` and `/fstack`.

`/flamestack stats` prints the platform, tracked items, indexed sections, and active merge reservations, using the labels under `messages.stats`.

## Permissions

- `flamestack.admin` (default `op`) grants `flamestack.reload` and `flamestack.stats`.
- `flamestack.reload` (default `op`) reloads configuration.
- `flamestack.stats` (default `op`) shows runtime statistics.

## Troubleshooting

- No merges: check `trigger.enabled`, `allow_list.mode`, `stacking.max-stack-size`, and whether the material is excluded.
- Items below the vanilla maximum do not merge: expected while `respect-vanilla-max-stack: true`.
- Merge bursts stall: `max-active-merge-reservations: 64` caps concurrent reservations. The coordinator filters raw tickets before deciding.
- Suspect a duplicate jar: the README and POM disagree on version. Confirm from the jar manifest or build output.
- Invalid material names disappear from `allow_list`: the README says they are logged and ignored. `MaterialUtil.get` falls back to `Material.AIR` rather than returning null.


## Related

- [FlameStack product page](/plugins/flamestack/)
- [Diagnose lag before adding limiters](/guides/diagnose-lag-before-limiters/)
- [Folia compatibility notes](/guides/folia-compatibility/)
- [RedstoneLimiter quick start](/docs/redstonelimiter/)
- [Plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/)
