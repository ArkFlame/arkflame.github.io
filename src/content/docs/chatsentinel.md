---
title: "ChatSentinel chat filtering and SocialSpy"
description: "ChatSentinel filters chat for spam, swearing, advertising and client mentions, with server mute, SocialSpy and Redis alerts. Commands and limits."
plugin: "chatsentinel"
category: "security"
updated: 2026-10-30
runtimeVerified: false
evidenceNote: "Reviewed against the ChatSentinel repository on 30 Oct 2026; not runtime-tested."
---

## What it does

ChatSentinel is a chat filter for Bukkit/Spigot, BungeeCord, and Velocity with a shared checking core. Bundled modules cover folder-based blacklists (`security`, `advertisement`, `offense`, `user`, `client`), capitalization, flood, similarity, cooldown, syntax, allowed characters, correction, server mute, and a join-location movement gate. SocialSpy covers private messages, signs, books, anvil renames, and commands. Alerts can go to Discord webhooks and, optionally, Redis.

It is not a punishment plugin. Offense responses are a list of console commands under `punishments`; the config recommends LiteBans or AdvancedBans for mutes. Chat clear renders blank lines (`chat-snapshot.clear-lines: 128`), and the repository states message history is no longer stored.

## Requirements

- `plugin.yml` declares `api-version: "1.13"` and `folia-supported: true`. Soft dependencies: Essentials, EssentialsLite, ZelChat.
- A BungeeCord descriptor ships as `bungee.yml`. Velocity uses a `@Plugin` entrypoint compiled against Velocity API `3.4.0-SNAPSHOT`.
- The POM compiles against Spigot API `1.19-R0.1-SNAPSHOT`, BungeeCord API `1.21-R0.4`, and Java 8 source/target. These are compile targets; the repository documents no supported Minecraft version range and no runtime Java requirement.
- Redis is optional; Jedis is shaded and relocated. No database is used.
- Enforcement of mutes depends on an external punishment plugin.

## Install

Run the Maven build. The POM is a single `jar` module containing the Bukkit, BungeeCord, and Velocity entrypoints; both `plugin.yml` and `bungee.yml` live in the same resources directory. The repository does not document separate per-platform jars.

Place the jar in `plugins/` on the Bukkit server or proxy. Startup creates missing `config.yml`, `messages.yml`, `blacklist.yml`, `whitelist.yml`, and nested filter files. `/chatsentinel reload` reloads config, messages, filters, and the online-player cache.

## Configure

Server mute defaults:

```yaml
server-mute:
  enabled: true
  muted: false
  bypass-permission: "chatsentinel.mute.bypass"
```

`blacklist.modules.<folder>.enabled` enables each folder-backed group. `blacklist.warn.max: 3` sets warns before `punishments`; `-1` disables that path. `blacklist.fake_message` is documented as ineffective on BungeeCord. `general.global-bypass-permission: "chatsentinel.bypass"` skips enforcement but not `correction` or `no-move-chat`, which are listed under `global-bypass-excluded-modules`. `no-move-chat` is backend-only because proxies cannot observe movement.

For user regexes, `/chatsentinel regex add <moduleId> common|raw <text|regex>` appends to `blacklist/<moduleId>/custom.yml`. `common` builds an expression from plain text; `raw` validates a regex capped at 512 characters.

Velocity-specific:

```yaml
velocity:
  signed-chat-policy: "legacy-deny"
```

The bundled comment warns that `legacy-deny` may kick 1.19.1+ signed-chat clients; `warn-only` never changes the chat event.

## Commands

- `/chatsentinel help`, `status`, `selftest`, `reload`, `clear [reason]`, `notify`, `spy`
- `/chatsentinel module list|enable|disable|toggle <moduleId>`
- `/chatsentinel regex add <moduleId> common|raw <text|regex>`
- `/chatsentinel mutechat [on|off|toggle] [reason]`
- `/servermute [on|off|toggle] [reason]` with aliases `/muteall` and `/muteserver`
- `/autocorrect [on|off|toggle]` (player only)
- `/socialspy [module|status]`; `/socialspy menu` opens the Bukkit GUI

`/chatsentinel` aliases in `plugin.yml` include `autocorrect`, `correction`, `servermute`, `muteall`, `muteserver`, `socialspy`, and `sspy`. `status` requires `chatsentinel.help`; `selftest` requires `chatsentinel.admin`.

## Permissions

`chatsentinel.admin` grants the declared staff children: `help`, `reload`, `clear`, `notify`, `spy`, `module`, `regex.add`, `mute`, and the SocialSpy submodules. Also declared: `chatsentinel.mute.bypass`, `chatsentinel.bypass`, `chatsentinel.bypass.capitalization`, `chatsentinel.bypass.correction`, `chatsentinel.clear.bypass`, `chatsentinel.notify`, `chatsentinel.spy`, `chatsentinel.socialspy`, `chatsentinel.socialspy.messages`, `.signs`, `.books`, `.anvils`, and `.commands`.

`chatsentinel.mute` is used by the command service but is not a standalone top-level declaration in `plugin.yml`; it appears only as an admin child. `/autocorrect` performs no permission check in the shared command service, so any player can toggle personal correction.

## Troubleshooting

- Kicks on Velocity after enabling `legacy-deny`: switch `signed-chat-policy` to `warn-only`; detection still notifies.
- Punishments never run: `punishments` is empty, no mute plugin is installed, or `warn.max` has not been reached.
- Chat is still filtered for an operator: `chatsentinel.bypass` is the global gate, but correction and no-move-chat ignore it by design.
- `fake_message: true` on BungeeCord: the config comment says it does not work there.
- Filter changes ignored: user regexes go to `blacklist/user/custom.yml`; check the startup compile report controlled by `filter-compile.notify-admins`.

## Evidence and limits

Inspected `README.md` (two lines), `pom.xml` (2.0.3), `plugin.yml`, `bungee.yml`, `config.yml`, `ChatSentinelCommandService`, `CommandPermission`, `UserRegexAddService`, the Velocity entrypoint, and config creation paths. Not verified: runtime behavior on any platform, permission resolution under LuckPerms, Redis alert delivery, Discord webhook delivery, signed-chat handling against a live 1.19.1+ client, and Folia scheduling. The repository states no supported Minecraft range.

## Related

- [ChatSentinel product page](/plugins/chatsentinel/)
- [Securing a proxy/backend link](/guides/secure-proxy-backend/)
- [FlameCord quick start](/docs/flamecord/)
- [VeloFlame quick start](/docs/veloflame/)
- [Plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/)
