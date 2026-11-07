---
title: "A plugin won't start: reproduce, capture, check dependencies, then bisect"
description: "Work from a full stack trace and exact versions, verify hard dependencies and config paths, check permission nodes, then bisect plugin jars."
updated: 2026-10-30
author: "LinsaFTW"
relatedPlugins: ["exploitfixer", "fairplay", "authme-premium"]
topics: ["troubleshooting", "plugins", "operations"]
---

The plugin named on the first line of a stack trace is often the one that noticed the failure, not the one that caused it. Freeze the reproduction. Capture the full trace. Check the Java version, server build, dependencies, config paths and permissions first.

## 1. Reproduce and freeze the state

Write down the exact action, client version, server build, and whether a fresh server reproduces it. Don't change three settings at once. Copy the configs and the jar list first so you can reverse a bisect.

## 2. Capture the full trace and versions

- Take the full stack trace, including every `Caused by` line.
- Save `logs/latest.log` before restarting. Panels rotate it.
- Note the plugin version printed at startup, not just the jar filename.
- Record `java -version` and the server build. A POM compile target isn't the runtime requirement.
- Redact tokens, passwords, IPs and player credentials before you post.

`api-version` in `plugin.yml` is the Bukkit API level, not a game-version guarantee.

`UnsupportedClassVersionError` means a Java mismatch, not a plugin bug. Compare the class file version in the trace with the runtime that produced it.

## 3. Resolve dependencies before editing config

Read the descriptor, then the startup log.

- **ExploitFixer** lists HamsterAPI under `softdepend`, but startup aborts with `HamsterAPI is missing or disabled. ExploitFixer cannot start.` Treat HamsterAPI as required. A version below `0.3.5` logs a severe warning but still starts.
- **FairPlay** declares `depend: [packetevents]`. Without PacketEvents, it won't load. GrimAC and Vulcan are optional, and their absence is normal.
- **AuthMePremium Mode A** needs the companion on every backend, plus AuthMe wherever login state must change. A proxy-only install can look healthy while backends reject the session.
- **Folia** needs the descriptor flag and scheduler-aware code. A missing flag is a load refusal on Folia, not a config error.

If the console says a dependency is missing, install it. Editing limits or tokens won't bypass a class that never loaded.

## 4. Config parse versus config path

These failures look alike:

- **Parse failure.** Invalid YAML, tabs where spaces are required, or a duplicate key. The server usually refuses the file and names a line.
- **Missing path.** FairPlay generates its config from annotated classes. It logs `[FairPlay] Missing config value for path '…'` when the running build expects a key your file lacks. That isn't automatically corruption. Regenerate the file or add the key. Don't replace the whole file with one from a forum post.

RedstoneLimiter migrates old configs to version 7 on startup or reload, so a hand-edited legacy key may be transformed instead of honored.

If a plugin generates its config, let it create defaults before you edit one key.

## 5. Permission nodes can be undeclared

An op sees every command. A staff rank may not. Two real examples:

- ExploitFixer checks `exploitfixer.admin` for `/ef checks` and `/ef reload`, and `exploitfixer.logs` for `/ef logs`. Neither node is declared. Grant them explicitly.
- FairPlay's dispatcher requires `fairplay.command`. Several subcommands check nodes like `fairplay.command.alerts` and `fairplay.command.checks`, which the descriptor doesn't declare. `fairplay.notify` only covers alert delivery.

Check effective nodes in your permissions plugin, not just the descriptor. "No permission" messages can also come from a command blocker or a proxy-level command filter. Check both layers.

## 6. Folia exceptions are ownership errors

`UnsupportedOperationException` on Folia usually means a plugin touched state from the wrong scheduler. AuthMePremium's docs say to confirm the descriptor flag, the current universal JAR and the `FoliaAPI initialized` log line, then route player changes through the entity scheduler. Don't swap in a raw Bukkit scheduler task. That keeps the bug on a different thread.

## 7. Bisect jars, then config

1. Snapshot the plugins directory and configs.
2. Remove half the plugin jars, restart, and reproduce.
3. If the problem goes away, the cause is in the removed half. Add half back and repeat.
4. Keep dependency pairs together: FairPlay with PacketEvents, ExploitFixer with HamsterAPI, AuthMePremium proxy with its backend companion.
5. When one plugin is left, bisect its config on a copy, not production.
6. Restore the original set before you apply the fix.

Don't hot-unload. Restart between rounds, or classloader leftovers will give false results.

## Symptom map

| Symptom | First check |
| --- | --- |
| ExploitFixer never enables | HamsterAPI installed and enabled; version warning in console |
| FairPlay logs a missing config path | Generated config vs running build; do not wipe the file |
| `proxy UUID is not approved` | Approve the exact UUID on that backend; repeat per backend |
| `token mismatch` | Compare proxy and backend token, including whitespace and learned values |
| Folia `UnsupportedOperationException` | Descriptor flag, current JAR, `FoliaAPI initialized`, entity scheduler |
