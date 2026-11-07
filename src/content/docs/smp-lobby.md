---
title: "SMP Lobby features and compatibility"
description: "SMP Lobby builds a lobby server with PvP, announcements, protection and titles. Twelve commands, 36 permissions, ten-plus config files."
plugin: "smp-lobby"
category: "smp"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. Version 2.1.8"
---

SMP Lobby builds the lobby server for a survival network. It covers PvP in the lobby, announcements, protection, titles, redirects and void protection. The plugin is at version 2.1.8.

## What it does

A lobby is the first server players reach. SMP Lobby keeps that space safe and useful. It can send players to other servers through a redirect, show titles and announcements, and stop players from falling into the void. The repository declares twelve commands, thirty-six permissions and more than ten configuration files.

## Features

- Lobby PvP and protection.
- Titles, announcements and redirect.
- BungeeCord and Velocity redirect support.
- Void protection.
- Twelve commands and thirty-six permissions, as declared in the repository.

## Compatibility

- Platforms: Bukkit, Spigot and Paper.
- Minecraft version: the repository states no version range.
- Java: the README states Java 8.
- Folia: declared in the repository.

Folia support is a declaration. Test the redirect, the void protection and the lobby PvP in a region away from spawn on a Folia copy before you rely on them. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins. If you use the redirect, set up the proxy first, then point the lobby at the target server.

## Redirect and proxy

The redirect works with BungeeCord and Velocity. Confirm the proxy can reach each target server before you enable the redirect. The [secure proxy backend guide](/guides/secure-proxy-backend/) covers how to keep backends reachable only through the proxy.

## Troubleshooting

- If a redirect fails, check the target server name in the config and confirm the proxy knows that server.
- If players fall through the floor, check the void protection setting and test with a test account.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a lobby conflict.

## Related

- [HubCombat](/docs/hubcombat/) adds PvP and weapons to a lobby.
- [SMP Menus](/docs/smp-menus/) provides help and rules menus.
- [Secure proxy backend guide](/guides/secure-proxy-backend/)
