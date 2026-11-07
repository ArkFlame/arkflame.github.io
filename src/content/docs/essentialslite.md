---
title: "EssentialsLite features and compatibility"
description: "EssentialsLite is a broad essentials command suite covering teleports, homes, kits, warps and administration."
plugin: "essentialslite"
category: "gameplay"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. Content is derived from descriptors and bundled config; the project has no README"
---

EssentialsLite is an essentials command suite. It covers teleports, homes, kits, warps and administration, and it ships with menus, Redis support and random-teleport zones. The project has no README, so the features on this page come from the descriptor and bundled config.

## What it does

The plugin gives players and staff the everyday commands most survival servers need. Homes and warps handle travel, kits give starter items, and the admin commands manage the server. The repository declares around one hundred commands and eighty-five permissions. Check the command list in the config and the help output before you open access to players.

## Features

- Around one hundred commands and eighty-five permissions, as declared in the repository.
- Homes, warps, kits and teleports.
- Menus, Redis support and random-teleport zones.
- Folia support, declared in the repository.

## Compatibility

- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no version range.
- Java: compile target Java 8. That is a build setting, not runtime guidance.
- Folia: declared in the repository.

Folia support is a declaration, and the project has no README to describe how it was tested. Test teleports, homes and random-teleport zones on a Folia copy in a region away from spawn before you rely on them. The [EssentialsX alternative for Folia guide](/guides/essentialsx-alternative-folia/) covers what the Folia claim does and does not prove.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins, not a repository step. If you use Redis, set it up first and confirm the connection in the console.

## Permissions

Eighty-five permissions is a large tree. Grant nodes by rank, starting from the basic set. Test a home and a teleport with a test account at each rank, so you know a permission gap is not a broken command.

## Troubleshooting

- If a teleport does not work, check the permission for that command and test with a test account.
- If Redis features fail, check the connection settings and the console for a connection error.
- If a random teleport lands in a bad spot, check the RTP zone settings.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a command conflict.

## Related

- [SMP Menus](/docs/smp-menus/) provides help and rules menus.
- [SMP essentials plugin stack](/guides/smp-essentials-plugin-stack/) builds a small stack around EssentialsLite.
- [NextRTP](/plugins/nextrtp/) is a lightweight random-teleport option.
