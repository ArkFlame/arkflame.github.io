---
title: "Set up Discord role and chat sync with DiscordFlow"
description: "Connect a Minecraft network to Discord with DiscordFlow: role sync, chat sync, proximity voice and console access, plus the bridge you need on a proxy."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["discordflow", "smp-punishments", "staffmodex"]
topics: ["discord", "sync", "roles", "network"]
---

DiscordFlow connects a Minecraft network to Discord. It syncs roles, syncs chat, adds proximity voice and lets staff run console commands from Discord. It runs on Bukkit-family servers with a BungeeCord or Velocity bridge. Plan the proxy part first, then add the backend modules, then test each sync with a test account.

## What DiscordFlow covers

The plugin has four feature areas: Discord role sync, Discord chat sync, proximity voice integration and console access from Discord. It ships Bukkit, BungeeCord and Velocity modules. The repository states support for 1.8 through 1.21+ and requires Java 11 or newer. JDA is bundled in the universal artifact, so you do not install it separately.

Because the proxy and backend need different modules, decide the topology before you install anything. The [DiscordSRV alternative guide](/guides/discordsrv-alternative-discordflow/) compares the plugin with the older option and covers when each one fits.

## Choose the topology

A single Spigot or Paper server needs the Bukkit-family module only. A network with a proxy needs the BungeeCord or Velocity module on the proxy, and the Bukkit-family module on each backend that players reach. Install the module that matches each jar. Do not put the proxy module on a backend.

## Set up the bot first

Create the Discord bot and invite it to your server before you touch the Minecraft config. Give it only the permissions it needs for role management and the channels you plan to sync. Check the bot's role position. A bot below the roles it manages cannot change them.

## Configure role sync

Map each Discord role to the Minecraft group or permission that goes with it. Start with one role, such as a verified-member role, and test it with a test account. Confirm the role appears in Discord and the permission applies in game. Add the staff roles last, after the basic mapping works.

## Configure chat sync

Pick one channel for each direction you want. Two-way sync on a busy channel doubles the message flow, so start with one channel. Test with a short message, a long message and a message with formatting, since each one can break differently. Keep the ChatSentinel filter on the Minecraft side if you already use it, so spam does not reach Discord.

## Set up proximity voice

Proximity voice is one of the four feature areas, so test it separately from role and chat sync. Test it with two accounts standing at different distances. Check the voice settings in the config before you invite players, and change one value at a time.

## Enable console access carefully

Console access lets staff run commands from Discord. It is powerful. Restrict it to the staff roles that need it, and log every command. Do not give it to a general role. Test with a harmless command, such as a broadcast, before you use a command that changes player data.

## Test order

1. Install the proxy module on the proxy and the Bukkit-family module on each backend.
2. Start the network and confirm each module loads without errors.
3. Map one role and test it with a test account.
4. Enable one chat channel and send test messages in both directions.
5. Configure proximity voice and test two accounts at different distances.
6. Restrict console access to staff, then test one harmless command.

## Common failure points

If a player has the Discord role but not the in-game permission, check the role mapping first. A bot below the managed roles cannot change them, so check the bot's role position. Read the console on every server in the network, since each module logs on its own server.

## What this does not do

DiscordFlow syncs roles and chat. It does not punish players. For mutes, bans and warnings, use a punishment plugin such as [SMP Punishments](/plugins/smp-punishments/). For staff tools inside the game, [StaffModeX](/plugins/staffmodex/) provides staff-mode inventories and moderation tools.

## Frequently asked questions

### Does DiscordFlow need a proxy?

Not for a single server. A network with a proxy needs the BungeeCord or Velocity module on the proxy.

### Does the universal artifact include JDA?

Yes. The repository states that JDA is bundled in the universal artifact.

### Which Java version does it need?

The repository requires Java 11 or newer.

### Does DiscordFlow punish players?

No. It syncs roles, chat, voice and console access. Use a punishment plugin for mutes and bans.
