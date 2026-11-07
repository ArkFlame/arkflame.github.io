---
title: "Stop chat spam and advertising on a Minecraft server"
description: "Block advertising, swearing and flood in Minecraft chat with ChatSentinel. Blacklists, alerts, mutes and what the plugin does not do."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["chatsentinel", "chatsentinel-premium", "smp-punishments"]
topics: ["chat", "moderation", "spam", "advertising"]
---

Run a chat filter with folder-based blacklists, flood and similarity checks, and alerts to staff. ChatSentinel does this. It applies regex rules to chat and runs on Bukkit, BungeeCord and Velocity. It filters messages, but it does not punish anyone. You still need a mute or ban setup for repeat offenders.

## What does ChatSentinel check?

The bundled modules cover folder-based blacklists (`security`, `advertisement`, `offense`, `user` and `client`), capitalization, flood, similarity, cooldown, syntax, allowed characters, correction, server mute and a join-location movement gate. The `advertisement` folder holds the blacklist for ad text. Put your server's domain and the ad patterns you see most often there.

The plugin also ships whitelist rule sets and message configuration. The repository lists fourteen permissions. Check them before you give staff access to the alert and reload commands.

## Where does it filter?

Chat comes first. The module set also covers private messages, signs, books, anvil renames and commands. That matters because spam often moves to a private message once the public chat is filtered.

## Who punishes the offender?

ChatSentinel does not. Offense responses are a list of console commands under `punishments`. The config recommends LiteBans or AdvancedBans for mutes. Write those commands before you go live, then test them with a test account.

## How do staff see what was blocked?

Alerts go to a Discord webhook and, optionally, Redis. Chat clear prints blank lines, controlled by `chat-snapshot.clear-lines`, which defaults to 128. The repository states that message history is no longer stored. If you need a record of blocked messages, the Discord webhook is the place to keep it.

## Which platforms does it run on?

ChatSentinel uses one shared checking core with entry points for Bukkit and Spigot, BungeeCord and Velocity. The Bukkit module declares `api-version: "1.13"` and `folia-supported: true`. Those are API levels, not a game-version promise. The repository states no Minecraft version range.

## When does ChatSentinel Premium help?

ChatSentinel Premium is a tuned smart chat-filter configuration for spam and swearing. It is sold separately and requires the ChatSentinel plugin. Use it when you want a ready configuration rather than writing the rules yourself. The base plugin is the right start if you want to control every list.

## Which rules should you tune first?

Start with advertising and flood. Those two cause the most damage in a public chat. Add swearing filters after you have read a few days of alerts. Changing many rules at once makes it hard to see which one caught a legitimate message.

Check similarity and cooldown on a busy channel. A strict cooldown can stop normal conversation during an event. Test that case before you enable the rule for everyone.

## Steps

1. Install ChatSentinel on the proxy or server that handles chat: Bukkit or Spigot, BungeeCord, or Velocity.
2. Edit the `advertisement` blacklist for your domain and common ad patterns.
3. Set `punishments` to the console commands your mute or ban plugin runs.
4. Connect a Discord webhook for alerts.
5. Test with a test account. Post a link, repeat a message quickly, and check that the alert arrives.

## Tune flood and similarity checks

Flood and similarity checks catch repeated messages. Both can catch ordinary players too. A player who types the same word in quick succession during a game is a common false positive. Set the cooldown first. Read the alerts for a day, then change the similarity threshold only if the alerts show a real pattern.

Keep the capitalization and syntax checks lighter than the ad blacklist. Capitals and punctuation annoy players, but they seldom carry an ad. Strict rules on those checks cost more goodwill than they save.

## Keep a record of blocked messages

The repository states that message history is no longer stored. Your Discord webhook is the record. If staff need a history of blocked messages for a dispute, decide where that record lives before the first offense. Set the webhook channel to one that staff can search, and keep its retention in line with your own rules.

## Frequently asked questions

### Does ChatSentinel ban players?

No. Offense responses run the console commands you list under `punishments`.

### Does ChatSentinel store chat history?

No. The repository states that message history is no longer stored.

### Does it work on Velocity?

Yes. ChatSentinel has a Velocity entry point, alongside the Bukkit, Spigot and BungeeCord entry points.

### Do I need Redis?

No. Redis alerts are optional. Discord webhooks are the main alert path.
