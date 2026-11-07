---
title: "DiscordSRV alternative: DiscordFlow"
description: "What DiscordFlow covers for Minecraft and Discord linking (role sync, chat sync, proximity voice, console access), its platform scope, and how to test it before you switch."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["discordflow"]
topics: ["discord", "discordsrv", "role-sync", "chat-sync"]
---

Most people looking for a DiscordSRV alternative want one of three things: chat between Minecraft and Discord, roles that follow Discord membership, or a way to run console commands from Discord. DiscordFlow covers all three. It also adds proximity voice and console access.

This guide lists what the repository supports. It does not compare DiscordFlow with DiscordSRV feature by feature. Make that comparison yourself, using your current DiscordSRV config as the list.

## What DiscordFlow covers

- Discord role sync.
- Chat sync between Minecraft and Discord channels.
- Proximity voice integration.
- Console access from Discord.

The repository describes it as a Discord connection for Bukkit-family servers, with a BungeeCord or Velocity bridge. The modules are split into Bukkit, BungeeCord and Velocity parts.

## Platform and runtime scope

- Platforms listed: Spigot, Paper, BungeeCord and Velocity.
- Minecraft: the README states 1.8 to 1.21 and later. Test the version you run.
- Java: the README requires Java 11 or newer. Check this on your host before install.
- The Discord library (JDA) is bundled in the universal artifact. You do not install it separately.

The repository has no Folia entry. Do not assume Folia support.

## Before you switch

1. Write down every DiscordSRV feature you use. Include channel routing, role mappings, console channels and any custom messages.
2. Check each one against the list above. Anything not on the list needs another plugin or a manual process.
3. Create a Discord test server, or a separate test channel set, with a bot account.
4. Install DiscordFlow on a test server with the same version as production.
5. Confirm the bot has the Discord permissions it needs. A bot that can read a channel but not send to it will show chat sync as broken.

## Test plan

Run each test in this order. Stop at the first failure and fix it before you go on.

1. **Startup.** Confirm the plugin loads on Java 11 or newer, and that the bot connects to Discord.
2. **Chat sync, both ways.** Send a message in Minecraft and see it in Discord. Send one from Discord and see it in game.
3. **Role sync.** Link a test account. Give it a Discord role, then check the in-game rank or permission group. Remove the role and check that it is revoked.
4. **Console access.** Run one harmless command from Discord, such as a status check. Then check that a user you have not authorised is refused, using your own access settings.
5. **Proximity voice.** Only if you use it. Two test players, one near and one far. Confirm the voice channel behaviour matches what you configured.
6. **Bridge.** If you run a BungeeCord or Velocity network, check that messages and role data reach the backend servers.
7. **Restart.** Restart the server. Check that the bot reconnects and that sync resumes without duplicate messages.

## Migration notes

- Run both plugins on the test server only. Two bots posting to one channel produces duplicate messages.
- Move your channel IDs and role mappings across by hand. Do not copy DiscordSRV config files over as they are.
- Keep the bot token out of public configs and screenshots.
- Switch production during low traffic. Keep the old setup ready to restore.

## When DiscordSRV is still the better choice

If your setup depends on a DiscordSRV feature that is not in the list above, keep DiscordSRV until you have confirmed a replacement. A missing feature found after the switch is harder to fix than one found on a test server.

For the product details, see the [DiscordFlow product page](/plugins/discordflow/).
