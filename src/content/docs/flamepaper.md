---
title: "FlamePaper features and compatibility"
description: "FlamePaper is a Paper 1.8.8 server fork carrying patches for stability, redstone behaviour, knockback and the tick loop."
plugin: "flamepaper"
category: "performance"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. A fork replaces the server jar; it does not install into plugins/"
---

FlamePaper is a Paper 1.8.8 server fork. It carries patches for stability, redstone behaviour, knockback and the tick loop. You run it instead of Paper, so it replaces the server jar rather than installing into `plugins/`.

## What it does

The fork changes the server itself. The patches cover the tick loop, redstone behaviour and knockback, and the README names stability as a goal. Because the changes are in the server, plugins run on FlamePaper only if they support Paper 1.8.8.

## Features

- Paper 1.8.8 fork.
- Stability and tick-loop patches.
- Redstone and knockback changes.
- Runs on Java 8, per the repository README.

## Compatibility

- Platforms: Paper 1.8.8.
- Minecraft version: 1.8.8.
- Java: JRE 8, per the repository README.
- Folia: not declared. FlamePaper is not a Folia server.

Do not run Folia-declared plugins on FlamePaper and assume they behave the same as on Folia. The [Folia compatibility guide](/guides/folia-compatibility/) explains what Folia changes.

## Install

Back up the world and the current server jar first. Replace the server jar with FlamePaper, keep the same world folder, and start the server on Java 8. Installing it into `plugins/` will not work, because it is not a plugin.

## Plugin compatibility

Test each plugin on a copy of the server before you move the live world. A plugin written for a newer Paper API can fail on 1.8.8, so check its support range first. Use the [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) to isolate a failure.

## Redstone and tick behaviour

The redstone and tick patches change how the server handles load, so measure before and after. Use the [diagnose-lag guide](/guides/diagnose-lag-before-limiters/) to compare tick numbers on a test copy. Do not assume a patch fixes a specific farm without testing it.

## Troubleshooting

- If the server does not start, check that Java 8 is the runtime and the server jar is the FlamePaper build.
- If a plugin fails, check its support range for 1.8.8 first.

## Related

- [FlameForge](/docs/flameforge/) supports Spigot, Paper and Folia across 1.8.8 to 1.21.x.
- [Migrate a Paper server to Folia](/guides/migrate-paper-to-folia-checklist/) covers a different migration path.
- [FlamePearls](/docs/flamepearls/) corrects ender-pearl glitches.
