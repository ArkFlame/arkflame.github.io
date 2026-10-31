---
title: "SMP Lifesteal commands and configuration"
description: "SMP Lifesteal's commands, permissions, storage defaults and heart-death settings as declared in its repository, with documented limits."
plugin: "smp-lifesteal"
category: "smp"
updated: 2026-10-30
runtimeVerified: false
evidenceNote: "Reviewed against the SMP-Lifesteal repository on 30 Oct 2026; not runtime-tested."
---

## What it does

SMP Lifesteal is a lifesteal core built around lives, heart items, withdrawal, and rebirth. On player death the attacker gains a life by default; when the attacker is already at maximum, the heart drops instead. Entity and natural deaths can also drop hearts. First-join protection defaults to `10m`.

The repository also ships compatibility grammar for ZelSteal and LifeStealZ command shapes, plus PlaceholderAPI expansions named `smplifesteal` and `zelsteal`. It is not a general economy or punishment suite.

## Requirements

- Bukkit/Spigot/Paper/Purpur/Folia. `plugin.yml` declares `folia-supported: true`.
- Minecraft `1.8.8` through `1.21.x`, as stated in `README.md`.
- Java 8 source/target in the POM. That is a build target, not a runtime guarantee.
- Optional soft dependencies: PlaceholderAPI, WorldGuard, Vault, AxAuctions.
- A storage backend: local YAML files, SQLite, or MySQL. MySQL can use local YAML as a shadow and fallback.

## Build and storage

`README.md` documents:

```bash
mvn test
mvn -DskipTests package
```

The output is `target/smplifesteal-1.1.5.jar`. The README calls SQLite the default at `plugins/SMPLifesteal/storage.db`, but the bundled `settings.yml` sets `database-type: yml`; the SQLite path only applies after switching type. `settings.yml` also sets `fallback.use-local-yml-when-sql-down: true`, while `allow-default-player-when-sql-down-and-no-local-file` stays `false`.

Storage values are `yml`, `sqlite`, and `mysql`. With `local-yml.shadow-sql-storage: true`, SQL-backed installs also write local YAML copies.

## Configure

A minimal excerpt of real keys:

```yaml
Database-Settings:
  database-type: sqlite
  sqlite:
    file: data/storage.db
Lives-Settings:
  default-lives: 10
  default-max-lives: 20
  withdraw:
    min-lives-after-withdraw: 1
    default-amount: 1
  rebirth:
    lives-to-reset-to: 10
```

Related defaults in the same file:

- `health-points-per-life: 2.0`, with `clamp-health-on-apply: true`.
- `ban-time: 1w`; life bans are checked at pre-login by default.
- `withdraw.max-amount-per-command: 64`; `drop-if-inventory-full: false`.
- `rebirth.max-rebirths: 10` and `max-life-increase: 1`.
- Death rewards: `by-player.enabled: true`, `attacker-gains-life: true`, `drop-when-attacker-maxed: true`; entity and natural drops are also enabled.
- Same-victim reward cooldowns default to `15m` for player, entity, and natural deaths.
- `Anti-Alt-Settings.enabled: true`; replace the shipped `ip-hash-salt` placeholder with a unique random value before enabling detection in production.
- `Anti-Dupe-Settings.enabled: false`. Enabling it prevents heart reuse but disables heart stacking, per the file's own comment.

`Cross-Server.enabled` is `false`; Redis is only needed when cross-server sync is turned on.

## Commands

Root command `/lifesteal` has aliases `smplifesteal`, `lives`, and `live`:

- `/withdraw [amount]` converts lives into heart items.
- `/rebirth` resets lives and adds permanent maximum lives when eligible.
- `/lifesteal admin reload`
- `/lifesteal admin info [player]`
- `/lifesteal admin setlives|addlives|removelives <player> <amount>`
- `/lifesteal admin setmaxlives|addmaxlives|removemaxlives <player> <amount>`
- `/lifesteal admin setrebirths <player> <amount>`
- `/lifesteal admin ban <player> [duration]` and `unban <player>`
- `/lifesteal admin giveheart <player> [type]`
- `/lifesteal admin convert <source> [--dry-run|--apply]`

ZelSteal-shaped commands such as `/zelsteal lives` and `/zelsteal withdraw` map onto the same operations.

## Permissions

Player nodes default to `true`: `lifesteal.use`, `lifesteal.withdraw`, `lifesteal.rebirth`. `lifesteal.view.others` defaults to `op`.

Admin nodes default to `op`: `lifesteal.admin` plus `reload`, `setlives`, `addlives`, `removelives`, `setmaxlives`, `addmaxlives`, `setrebirths`, `ban`, `unban`, `giveheart`, `info`, and `convert`.

Notification nodes `lifesteal.antialt.notify` and `lifesteal.antidupe.notify` default to `op`. The descriptor also declares parallel `smplifesteal.*` and `zelsteal.*` nodes for compatibility, and `lifesteal.bypass.firstjoin`, `antialt`, `antidupe`, and `life-ban` nodes defaulting to `op`.

## Troubleshooting

- **Placeholders render literally.** Restart after installing the expansion, confirm PlaceholderAPI is present, and run `/papi reload`.
- **WorldGuard hook missing.** Check startup for the hook line and load order; on Folia, confirm the scheduler bridge initialized.
- **SQL unavailable.** The plugin falls back to local YAML when `use-local-yml-when-sql-down` is true. Check credentials and connectivity rather than deleting data.
- **Duplicate heart message.** Expected while anti-dupe is enabled; hearts are single-use records. It ships disabled, which also permits stacking.
- **Anti-alt misses accounts.** Change the salt from the placeholder and confirm players arrive with consistent IPs. VPNs can create false relations.
- **Folia scheduler warnings.** Update the plugin and review `Advanced-Settings.scheduler-pool-size`.

## Evidence and limits

Inspected: `README.md`, `plugin.yml`, `settings.yml`, `docs/COMMANDS.md`, `docs/PERMISSIONS.md`, `docs/CONFIGURATION.md`, `docs/TROUBLESHOOTING.md`, and `pom.xml`. Not verified: runtime behavior on any listed server, the 1.8.8–1.21.x claim, Folia scheduling, database failover, and conversion accuracy. Drift exists: `docs/CONFIGURATION.md` lists `default-lives: 15` while `settings.yml` ships `10`; `docs/PERMISSIONS.md` says bypass nodes default `false` while `plugin.yml` says `op`. This page follows the shipped files.

## Related

- [SMP Lifesteal product page](/plugins/smp-lifesteal/)
- [SMP Punishments operations](/docs/smp-punishments/)
- [Folia compatibility notes](/guides/folia-compatibility/)
- [Plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/)
- [Diagnose lag before adding limiters](/guides/diagnose-lag-before-limiters/)
