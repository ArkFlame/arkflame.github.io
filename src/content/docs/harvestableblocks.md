---
title: "HarvestableBlocks features and compatibility"
description: "HarvestableBlocks defines mining and farming zones whose blocks and crops regenerate after harvest. Zone protection plugins can govern where the loops run."
plugin: "harvestableblocks"
category: "gameplay"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026"
---

HarvestableBlocks defines mining and farming zones. Blocks and crops in a zone regenerate after a player harvests them, so the zone keeps producing. Zone protection plugins can decide where the regeneration loops run.

## What it does

A zone is a region where harvesting is part of the gameplay loop. When a block is mined or a crop is harvested, the plugin brings it back after the configured time. The plugin declares twenty-six permissions. The product data does not list the zone commands, so read the config and the help output after you install.

## Features

- Regenerating mining and farming zones.
- Twenty-six permissions, as declared in the repository.
- Works alongside zone protection plugins.
- Folia support, declared in the repository.

## Compatibility

- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no version range.
- Java: compile target Java 8. That is a build setting, not runtime guidance.
- Folia: declared in the repository.

Folia support is a declaration. Regeneration touches blocks that players mine, so test a zone on a Folia copy in a region away from spawn before you rely on it. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins. If you use a zone protection plugin, install it first so it can take control of the zone.

## Zone design

Keep each zone small enough that a player can see the regeneration happen. Test the regeneration time with a test account before you publish the zone. A zone that regenerates too fast can flatten the resource it is meant to provide.

## Troubleshooting

- If a block does not regenerate, check the zone definition and the regeneration time in the config.
- If a player can mine outside the zone, check the zone protection plugin and its region settings.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a conflict with another block plugin.

## Related

- [SMP Harvest](/docs/smp-harvest/) adds harvest progression with upgradable hoes.
- [SMP Regions](/docs/smp-regions/) provides region flags that can govern a zone.
- [Protect an SMP from griefing and exploits](/guides/protect-smp-from-griefing-and-exploits/) covers the wider protection setup.
