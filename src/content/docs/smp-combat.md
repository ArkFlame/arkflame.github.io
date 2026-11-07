---
title: "SMP Combat features and compatibility"
description: "SMP Combat adds combat tags with legacy-combat, WorldGuard-barrier and elytra restrictions. Ten configuration files cover the rules."
plugin: "smp-combat"
category: "smp"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. Built against Paper API 1.21.4"
---

SMP Combat adds combat tagging to a survival server. A player who fights is tagged for a period, and the plugin can restrict behaviour while the tag lasts. It also covers legacy combat, WorldGuard barriers and elytra use during combat.

## What it does

Combat tagging marks players who have recently fought. The restrictions you configure apply while the tag is active. The repository lists three rule areas: legacy-combat behaviour, a WorldGuard barrier, and elytra restrictions. Ten configuration files hold the rules, so you can change one area without touching the others.

## Features

- Combat tagging.
- Legacy-combat and elytra rules.
- WorldGuard barrier integration.
- Ten configuration files.

## Compatibility

- Platforms: Bukkit, Spigot and Paper.
- Minecraft version: the repository states no version range. The build targets Paper API 1.21.4.
- Java: compile target Java 8. That is a build setting, not runtime guidance.
- Folia: declared in the repository.

The build target is Paper API 1.21.4, which is a development target, not a tested range. Test on the version you run. Folia support is a declaration, so verify tag timing and barrier behaviour in regions away from spawn before you rely on it there. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains the claim.

## Install

Place the jar in `plugins/`, restart and read the console. If you use the WorldGuard barrier, install WorldGuard first. This is standard practice for Bukkit-family plugins, not a repository step.

## Setting the rules

Enable one rule at a time. Test each change with two test accounts, one tagged and one not, and confirm the restriction applies only while the tag is active. Combat rules affect every fight, so a rule that is too strict is noticed quickly.

## Troubleshooting

- If the barrier does not work, check that WorldGuard loads and that the region is configured as the barrier.
- If elytra restrictions do not apply, check the elytra rule in its config file and test with a test account.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a rule conflict.

## Related

- [SMP Weapons](/docs/smp-weapons/) adds legendary weapons for SMP and PvP.
- [Protect an SMP from griefing and exploits](/guides/protect-smp-from-griefing-and-exploits/) compares protection options.
- [SMP Regions](/docs/smp-regions/) provides the region layer that the barrier can use.
