---
title: "HubCombat features and compatibility"
description: "HubCombat adds PvP and weapons to a lobby server. It targets Paper 1.21.7 with Java 21 and exposes a reload command plus an admin permission."
plugin: "hubcombat"
category: "gameplay"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. Version and API come from the Gradle paperweight bundle"
---

HubCombat adds PvP and weapons to a lobby server. Players can fight in the hub and use weapons there. It targets Paper 1.21.7 and requires Java 21.

## What it does

The plugin turns a lobby into a combat space. It gives players weapons and handles PvP in the hub. The repository exposes a reload command and an admin permission. The product data does not list the weapon types or the reload command name, so check the help output and config after you install.

## Features

- Lobby PvP and weapons.
- Reload command.
- Admin permission.

## Compatibility

- Platforms: Paper.
- Minecraft version: Paper 1.21.7.
- Java: Java 21.
- Folia: not declared in the product data for this plugin.

The version and API come from the Gradle paperweight bundle. Test on Paper 1.21.7 with Java 21 before you use the plugin on a live lobby. Because Folia is not declared, treat HubCombat as unverified on Folia. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains how to check a claim.

## Install

Confirm the server runs Paper 1.21.7 on Java 21. Place the jar in `plugins/`, restart and read the console. This is standard practice for Paper plugins, not a repository step.

## Lobby design

PvP in a lobby affects players who only want to join the server. Put combat in a separate area of the lobby, and test the spawn points with two test accounts. Set the weapons and their effects in config before you open the lobby.

## Troubleshooting

- If the plugin does not load, confirm the Java version is 21 and the server is Paper 1.21.7.
- If the reload command does not apply a change, restart and test again.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a load failure.

## Related

- [SMP Lobby](/docs/smp-lobby/) builds the lobby with PvP, titles, redirect and void protection.
- [FlamePractice](/docs/flamepractice/) runs duels, ranked queues and FFA.
- [Secure proxy backend guide](/guides/secure-proxy-backend/) covers the backend setup behind a proxy.
