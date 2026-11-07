---
title: "DiscordFlow features and compatibility"
description: "DiscordFlow connects a Minecraft network to Discord for role sync, chat sync, proximity voice and console access."
plugin: "discordflow"
category: "network"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. JDA is bundled in the universal artifact"
---

DiscordFlow connects a Minecraft network to Discord. It syncs Discord roles with in-game permissions, syncs chat between the two, adds proximity voice, and gives staff console access from Discord. It runs on Bukkit-family servers with a BungeeCord or Velocity bridge.

## What it does

The plugin has four feature areas: role sync, chat sync, proximity voice and console access. It ships Bukkit, BungeeCord and Velocity modules, so each server in a network gets the module that fits its role. The README states support from Minecraft 1.8 to 1.21 and newer, and requires Java 11 or newer.

## Features

- Discord role and chat sync.
- Proximity voice integration.
- Console access from Discord.
- Bukkit, BungeeCord and Velocity modules.

## Requirements

- Java 11 or newer, per the README.
- A Discord bot that you create and invite to your server. JDA, the Discord library, is bundled in the universal artifact, so you do not install it separately.
- Platforms: Spigot and Paper for the Bukkit-family module, plus BungeeCord or Velocity for the proxy module.

## Compatibility

- Minecraft version: the README states 1.8 to 1.21+.
- Folia: not declared in the product data for this plugin.

Because Folia is not declared, treat DiscordFlow as unverified on Folia. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains how to check a claim before you run a plugin there.

## Install

Choose the module for each server first. The proxy needs the BungeeCord or Velocity module. Each backend that players reach needs the Bukkit-family module. Start the network, then read the console on every server, because each one loads its own module.

## Setup guides

The [Discord role and chat sync setup guide](/guides/discord-role-and-chat-sync-setup/) walks through the setup order and a test plan. If you are replacing DiscordSRV, the [DiscordSRV alternative guide](/guides/discordsrv-alternative-discordflow/) compares the two.

## Troubleshooting

- If a player has the Discord role but not the in-game permission, check the role mapping first.
- If the bot cannot change roles, check its position in the Discord role list.
- If chat does not sync, check the channel setting and the module on each server.

## Related

- [SMP Punishments](/docs/smp-punishments/) handles mutes, bans and warnings. DiscordFlow does not list punishments among its features.
- [StaffModeX](/docs/staffmodex/) provides staff-mode tools in game.
- [ChatSentinel](/docs/chatsentinel/) filters chat with regex rules.
