---
title: "SMP Punishments operations and configuration"
description: "SMP Punishments commands, permissions, storage and warning settings, including multi-server sync."
plugin: "smp-punishments"
category: "smp"
updated: 2026-10-30
---

## What it does

SMP Punishments covers bans, IP bans, mutes, kicks, freezes, screenshares, totem checks, warnings, reports, and staff lookup tools. It ships SQLite and MySQL storage with HikariCP, async join-ban checks through `AsyncPlayerPreLoginEvent`, optional MySQL `sync_events` propagation, PlaceholderAPI and Simple Voice Chat hooks, Discord webhook notifications, and player/reason selector GUIs.

The repository describes conservative Bukkit API use with reflection for Folia scheduling and modern player-head ownership. It is a moderation suite, not a proxy or authentication plugin.

## Requirements

- A Bukkit/Spigot-family server. `plugin.yml` declares `api-version: 1.13` and `folia-supported: true`.
- Optional soft dependencies: PlaceholderAPI and `voicechat`. The voice hook loads only when the Simple Voice Chat plugin is present.
- SQLite for single-server installs, or MySQL when multi-server propagation is needed. The README states that SQLite remains local-only.

## Build and storage

Build with `mvn -DskipTests package`. Place the jar in your server plugins directory and start the server; first run generates `config.yml`.

Defaults in `config.yml`:

- `storage.type: SQLITE` with `sqlite-file: data.db`.
- `storage.write-queue.flush-on-submit: true` and `max-writes-per-flush: 256`.
- `network.enabled: false`; multi-server sync targets MySQL.
- Existing tables are upgraded on startup by missing table, column, and index detection. The README calls the migration idempotent and says rows are preserved.

## Configure

A minimal excerpt of real keys:

```yaml
storage:
  type: SQLITE
  sqlite-file: data.db
network:
  enabled: false
  server-id: ""
warnings:
  strike-period: "24h"
  max-strikes: 3
  same-target-cooldown: "1m"
  punishment:
    enabled: true
    type: BAN
    duration: "1d"
check-join-ban-on-prelogin: true
```

Other defaults worth knowing:

- `freeze-block-movement: true`.
- `mute.mode: CANCEL`; the command filter is a `BLACKLIST` containing `/msg`, `/tell`, `/w`, `/r`, `/reply`, and `/mail send`.
- `limits.default-max-duration: "1y"`, with per-permission caps for `30d`, `90d`, `180d`, and `365d`.
- `security.dupeip.hide-ips: true`, `max-accounts: 50`, `max-ips: 50`.
- Discord webhook defaults: `enabled: false`, empty `url`, and event toggles for bans, kicks, and warns. The URL is a secret; keep it out of commits and tickets. Silent punishments still reach the webhook, and the old `hooks.warning-webhook` block remains a runtime fallback.

Warnings use a target-wide rolling window. Strikes are computed, not entered manually; crossing `max-strikes` applies the configured punishment. Staff with `smppunishments.bypass.warncooldown` skip the same-target cooldown.

## Commands

Declared roots and subcommands:

- `/ban`, `/tempban`, `/banip` (aliases `/ban-ip`, `/ipban`), `/unban` (`/pardon`), `/unbanip`
- `/mute`, `/tempmute`, `/unmute`, `/kick`, `/freeze` (`/stopchat`)
- `/screenshare` (`/ss`), `/totemcheck` (`/totemtest`, `/autototemcheck`)
- `/warn <player> [reason...]`, `/reports`
- `/history` (`/punhistory`), `/banhistory`, `/mutehistory`
- `/banlist` (`/listbans`), `/mutelist` (`/listmutes`), `/clearbans`, `/clearmutes`
- `/searchid` (`/puninfo`, `/baninfo`, `/muteinfo`)
- `/dupeip` (`/alts`) for shared-IP lookup
- `/smppunishments` (`/punishments`, `/sp`, `/smpp`) with `reload`
- `/notify` (permission `smppunishments.notify`)

The README omits `tempban`, `tempmute`, `screenshare`, `totemcheck`, and `notify`, but `plugin.yml` declares them.

## Permissions

Core: `smppunishments.*`, `smppunishments.admin` for the main command and reload, and `smppunishments.notify` for broadcasts.

Punishments: `smppunishments.ban`, `tempban`, `banip`, `unban`, `unbanip`, `mute`, `tempmute`, `unmute`, `kick`, `freeze`, `warn`, `reports`, `screenshare`, `totemcheck`.

History and lookup: `history`, `history.ban`, `history.mute`, `searchid`, `list.bans`, `list.mutes`, `clear.bans`, `clear.mutes`, `dupeip`, and `dupeip.viewip`.

Bypass: `bypass.mute`, `bypass.freeze`, `bypass.warncooldown`, plus `bypass.illegalitems` and the `silent` / `notify.silent` nodes. Duration and limits: `duration.permanent`, `unlimited.ban`, `unlimited.mute`, `group.unlimited`. GUI: `smppunishments.gui`, `stats`.

Except for `smppunishments.*`, descriptor nodes default to `op`.

## Troubleshooting

- **Webhook silent.** Only bans, kicks, and warns are delivered; check `hooks.discord-webhook.enabled` and the per-event toggles. Run `/smppunishments reload` after edits.
- **Webhook URL leaked.** Rotate it in Discord and replace the config value. Do not paste it into reports.
- **Sync not working.** Multi-server sync expects MySQL. Check `network.enabled`, `server-id`, and the shared database. SQLite stays local.
- **Pool timeouts.** Diagnostics include active, idle, total, and waiting connection counts when Hikari metrics are available.
- **Voice mute missing.** The hook only loads with the `voicechat` plugin present.


## Related

- [SMP Punishments product page](/plugins/smp-punishments/)
- [SMP Lifesteal commands](/docs/smp-lifesteal/)
- [Plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/)
- [Securing a proxy/backend link](/guides/secure-proxy-backend/)
- [Folia compatibility notes](/guides/folia-compatibility/)
