---
title: "StaffModeX staff mode, vanish and reports"
description: "StaffModeX adds staff mode, vanish, staff chat, freeze, reports and inspection tools to Bukkit servers, with optional proxy and Redis transport."
plugin: "staffmodex"
category: "gameplay"
updated: 2026-10-30
---

## What it does

StaffModeX is a Bukkit staff-management plugin. It covers staff mode with inventory and location restoration, vanish, local or networked staff chat, HelpOp, freeze, player examination, reports, warnings, moderation action menus, identity lookups, notes, audit logs, inventory backups, item scans, staff statistics, chat moderation, and diagnostics. It also ships BungeeCord and Velocity bridge modules.

It does not implement kick, ban, mute, or WorldEdit commands. `/moderate` and configured action menus dispatch administrator-supplied console commands; the plugin itself does not provide those punishments.

Network mode is `AUTO`, `PROXY`, `REDIS`, or `LOCAL`. Proxy transport uses `staffmodex:network`, and Redis is optional. Reports and warnings use local YAML by default and MySQL when enabled.

## Requirements

- Bukkit-side `plugin.yml` declares `api-version: '1.13'` and `folia-supported: true`; source and target are Java 8.
- Soft dependencies: PlaceholderAPI and PremiumVanish.
- Optional MySQL and Redis. Proxy modules compile against BungeeCord API `1.21-R0.4` and Velocity API `3.4.0`.
- Maven modules: `common`, `bukkit`, `bungee`, `velocity`, `universal`.
- Bukkit API 1.13.

## Install

Build with Maven. Module `finalName`s produce `StaffModeX.jar` for Bukkit and the universal module, `StaffModeX-Bungee.jar`, and `StaffModeX-Velocity.jar`; the universal build copies its jar to the root `target/StaffModeX.jar`.

Place the Bukkit jar in `plugins/`. If proxy features are used, place the matching proxy jar in the proxy's plugin directory. Bukkit uses these files under `plugins/StaffModeX/`: `config.yml`, `commands.yml`, `messages.yml`, `webhooks.yml`, `inventories.yml`, `infractions/`, and `ips/`. Proxy modules use `proxy-config.yml`, `proxy-messages.yml`, and `proxy-webhooks.yml`.

## Configure

```yaml
network:
  mode: AUTO
  proxy-channel: "staffmodex:network"
  dedupe-cache-size: 2048
  dedupe-ttl-seconds: 30
mysql:
  enabled: false
```

`staff-command-opens-staffmode: true` makes bare `/staff` toggle staff mode; `/staff list` still opens the list. Command topology is startup-owned: `commands.yml` controls `enabled`, aliases, permission, usage, and conflict policy, and changes require a full restart. `commands.skip-if-conflict: true` keeps foreign commands. `mysql` and `redis` both default to `false`; local YAML stores reports, warnings, and IPs when MySQL is off.

`messages.yml` selects `format: minimessage` or `legacy`. Missing or blank `format` falls back to `text-format`; invalid values log one warning and use legacy. Existing runtime files are not migrated automatically. In MiniMessage, literal `<player>`-style text must be escaped.

## Commands

Core commands: `/staffmode` (`/mod`), `/vanish` (`/v`), `/staffchat` (`/sc`), `/helpop`, `/freeze`, `/examine` (`/invsee`), `/report`, `/warn`, `/reports`, `/warnings`, `/infractions`, `/ip` (`/iplog`), `/staff`, and `/staffmodex reload`.

Feature and command gates apply: `/freeze` needs `freeze.enabled`; `/helpop` needs both `helpop.enabled` and `commands.helpop.enabled`; `/vanish` needs `commands.vanish.enabled`. Additional commands such as `/moderate`, `/alts`, `/notes`, `/activity`, `/invbackups`, `/chatcontrol`, and `/serverinfo` are enabled by default and documented in `commands.yml`.

## Permissions

Exact nodes include `staffmodex.admin`, `staffmodex.staffmode`, `staffmodex.staffchat`, `staffmodex.vanish`, `staffmodex.vanish.see`, `staffmodex.freeze`, `staffmodex.ip`, `staffmodex.warning`, `staffmodex.report`, `staffmodex.helpop`, `staffmodex.examine`, `staffmodex.infractions`, `staffmodex.moderation`, `staffmodex.manage`, `staffmodex.teleport`, `staffmodex.heal`, `staffmodex.chat.manage`, and `staffmodex.socialspy`.

Bypass nodes include `staffmodex.freeze.bypass`, `staffmodex.vanish.pvp`, `staffmodex.inventory.bypass`, and `staffmodex.bypass.cooldown`. The full command-to-node mapping is in `docs/commands-and-permissions.md`; action-specific nodes extend `staffmodex.moderation` with `.warning`, `.kick`, `.mute`, `.tempban`, and `.ban`.

## Troubleshooting

- A new command or alias does not appear: command topology is startup-owned; restart instead of running `/staffmodex reload`.
- Reload does not update proxy files, MySQL, or Redis connections: reload covers Bukkit YAML, messages, and webhooks only.
- Messages show raw tags: the file's `format` may still be `legacy`, or MiniMessage literal placeholders are unescaped.
- Reports or warnings vanish after switching storage: MySQL is disabled or not initialized; local files live under `infractions/`.
- `/staff` opens the list instead of toggling: `staff-command-opens-staffmode` is false.
- Expecting `/ban` or `/mute`: not implemented; only configured moderation actions dispatch console commands.


## Related

- [StaffModeX product page](/plugins/staffmodex/)
- [SMP Punishments operations](/docs/smp-punishments/)
- [Securing a proxy/backend link](/guides/secure-proxy-backend/)
- [Plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/)
- [FlameCord quick start](/docs/flamecord/)
