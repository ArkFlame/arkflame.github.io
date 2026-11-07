---
title: "SMP Protections features and compatibility"
description: "SMP Protections provides ProtectionStones-style claims with menus. It requires SMP Regions at runtime and is configured through a main config and messages file."
plugin: "smp-protections"
category: "smp"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. SMP Regions is a hard dependency"
---

SMP Protections provides claims in the style of ProtectionStones. Players claim land and manage it through menus. The plugin needs SMP Regions at runtime, since the protected areas are regions, and it is configured through a main config and a messages file.

## What it does

A player claims an area and the plugin protects it from other players. Menus let players manage the claim without commands. The repository declares eight permissions. The product data does not list the claim commands, so check the help output after you install.

## Features

- Claim protection with menus.
- SMP Regions runtime dependency.
- Eight permissions, as declared in the repository.
- Main config and messages file.

## Requirements

- SMP Regions. It is a hard dependency, so install it and confirm it loads first.
- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no version range.
- Java: compile target Java 8. That is a build setting, not runtime guidance.

## Compatibility

Folia support is declared in the repository. Claims change region state, so test a claim and a removal on a Folia copy in a region away from spawn before you rely on it. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Install

Install SMP Regions, place the SMP Protections jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins, not a repository step.

## Claims and regions

Test the claim flow with two test accounts, one claiming and one trying to build inside. Check that the protection holds after a restart. Change one message or menu item at a time.

## Troubleshooting

- If the plugin does not start, check that SMP Regions loaded first.
- If a claim does not protect, check the region the claim created in SMP Regions.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a dependency failure.

## Related

- [SMP Regions](/docs/smp-regions/) is the region system this plugin needs.
- [ProtectionStones Extras](/docs/protectionstones-extras/) adds GUI management, flags and bans to ProtectionStones.
- [Protect an SMP from griefing and exploits](/guides/protect-smp-from-griefing-and-exploits/) compares claim and region options.
