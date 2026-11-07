---
title: "ProtectionStones Extras features and compatibility"
description: "ProtectionStones Extras adds GUI management, region flags and bans to ProtectionStones."
plugin: "protectionstones-extras"
category: "smp"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026"
---

ProtectionStones Extras adds management tools on top of ProtectionStones. Players and staff can manage claimed regions through a GUI, set region flags, and ban players from a region. It needs both WorldGuard and ProtectionStones to run.

## What it does

The plugin extends an existing claim system rather than replacing it. The repository declares twelve subcommands. Use the GUI for routine changes and the subcommands when you script or support a player who cannot open the menu.

## Features

- GUI region management.
- Region flags.
- Region bans.
- Twelve subcommands, as declared in the repository.

## Requirements

- WorldGuard. The plugin depends on it for regions.
- ProtectionStones. The plugin extends it, so it will not work alone.
- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no version range.
- Java: compile target Java 17. That is a build setting, not runtime guidance.
- Folia: declared in the repository.

Install WorldGuard and ProtectionStones first, confirm both load, and only then add this plugin. A missing dependency is the most likely reason the plugin fails at startup.

## Compatibility

Folia support is a declaration in the repository. Region code is sensitive to threading, so test flag changes and bans in regions away from spawn before you rely on the plugin on a Folia server. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains what the flag covers.

## Troubleshooting

- If the GUI opens but a flag does not apply, check that the region exists in WorldGuard under the expected name.
- If a ban does not stop a player, confirm the ban applies to the region the player is standing in. Test with a test account.
- For a general startup failure, use the [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/).

## Related

- [SMP Protections](/docs/smp-protections/) provides claims with menus and needs SMP Regions.
- [SMP Regions](/docs/smp-regions/) is a WorldGuard alternative with region flags.
- [Protect an SMP from griefing and exploits](/guides/protect-smp-from-griefing-and-exploits/) compares claim and region options.
