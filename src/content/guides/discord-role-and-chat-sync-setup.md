---
title: "Set up Discord role and chat sync with DiscordFlow"
description: "Connect a Minecraft network to Discord with DiscordFlow: role sync, chat sync, proximity voice and console access, plus the bridge you need on a proxy."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["discordflow", "smp-punishments", "staffmodex"]
topics: ["discord", "sync", "roles", "network"]
---

DiscordFlow connects a Minecraft network to Discord. It syncs roles, syncs chat, adds proximity voice and gives staff console access from Discord. It runs on Bukkit-family servers with a BungeeCord or Velocity bridge. Plan the proxy part first, then add the backend modules, then test each sync with a test account.

## What DiscordFlow covers

The plugin has four feature areas: Discord role sync, Discord chat sync, proximity voice integration and console access from Discord. It ships Bukkit, BungeeCord and Velocity modules. The repository states support for 1.8 through 1.21+ and requires Java 11 or newer. JDA is bundled in the universal artifact, so you do not install it separately.

Because the proxy and backend need different modules, decide the topology before you install anything. The [DiscordSRV alternative guide](/guides/discordsrv-alternative-discordflow/) compares the plugin with the older option and covers when each one fits.

## Choose the topology

The repository states that the plugin runs on Bukkit-family servers with a BungeeCord or Velocity bridge. A single server needs the Bukkit-family module only. A network with a proxy needs the proxy module on the proxy, and the Bukkit-family module on each backend that players reach.

## Set up the bot first

Discord bot setup is outside what the repository documents, so follow Discord's own developer documentation for creating the bot and inviting it. In general, give the bot only the permissions it needs for the roles and channels you plan to sync. Discord's role hierarchy also applies: a bot can only manage roles that sit below its own highest role. Check that position before you test role sync.

## Configure role sync

Map each Discord role to the in-game group or permission it should carry. The mapping syntax is in the plugin config, which this guide does not reproduce. Start with one role, such as a verified-member role, and test it with a test account. Confirm the role appears in Discord and the permission applies in game. Add staff roles last, after the basic mapping works.

## Configure chat sync

Pick one channel for each direction you want. Start with one channel, since a busy two-way channel produces a lot of traffic. Test with a short message, a long message and a message with formatting, so you see how each one renders on both sides.

If you already run a chat filter such as [ChatSentinel](/docs/chatsentinel/), test whether filtered messages reach Discord. The repository does not document how DiscordFlow and ChatSentinel interact, so verify that on your server.

## Set up proximity voice

Proximity voice is one of the four feature areas, so test it separately from role and chat sync. Test it with two accounts standing at different distances. The repository does not describe the voice settings, so read the config on your install and change one value at a time.

## Enable console access carefully

Console access lets staff run commands from Discord, so restrict it to the staff roles that need it. As general practice, keep a log of every command and do not give console access to a general role. Test with a harmless command, such as a broadcast, before you use a command that changes player data.

## Test order

The order below is a general practice, not a sequence from the repository:

1. Install the proxy module on the proxy and the Bukkit-family module on each backend.
2. Start the network and confirm each module loads without errors.
3. Map one role and test it with a test account.
4. Enable one chat channel and send test messages in both directions.
5. Configure proximity voice and test two accounts at different distances.
6. Restrict console access to staff, then test one harmless command.

## Common failure points

If a player has the Discord role but not the in-game permission, check the role mapping first. Check the bot's role position too. Each server in the network loads its own module, so read the console on every server, not only the proxy.

## What this does not do

The repository lists role sync, chat sync, proximity voice and console access as the features. Punishments are not among them. For mutes, bans and warnings, use a punishment plugin such as [SMP Punishments](/plugins/smp-punishments/). For staff tools inside the game, [StaffModeX](/plugins/staffmodex/) provides staff-mode inventories and moderation tools.

## Frequently asked questions

### Does DiscordFlow need a proxy?

No. A single Bukkit-family server runs the Bukkit-family module alone. A network with a proxy needs the BungeeCord or Velocity module on the proxy.

### Does the universal artifact include JDA?

Yes. The repository states that JDA is bundled in the universal artifact.

### Which Java version does it need?

The repository requires Java 11 or newer.

### Does DiscordFlow punish players?

Not according to its listed features. Use a punishment plugin for mutes and bans.
