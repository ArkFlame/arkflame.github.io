---
title: "A plugin won't start: reproduce, capture, check dependencies, then bisect"
description: "Work from a full stack trace and exact versions, verify hard dependencies and config paths, check permission nodes, then bisect plugin jars."
updated: 2026-10-30
author: "LinsaFTW"
relatedPlugins: ["exploitfixer", "fairplay", "authme-premium"]
topics: ["troubleshooting", "plugins", "operations"]
---

The plugin named in the first line of a stack trace is often the one that noticed the failure, not the one that caused it. Freeze the reproduction, capture the whole trace, and check Java version, server build, dependencies, config paths, and permissions first.

## 1. Reproduce and freeze the state

Write down the exact action, client version, server build, and whether a fresh server reproduces it. Do not change three settings at once. Copy configs and the jar list first so a bisect can be reversed.

## 2. Capture the full trace and versions

- Take the complete stack trace, including every `Caused by` line.
- Save `logs/latest.log` before restarting; panels rotate it.
- Record the plugin version printed at startup, not just the jar filename.
- Record `java -version` and the server build. A compile target in a POM is not the runtime requirement.
- Redact tokens, passwords, IPs, and player credentials before posting.

`api-version` in `plugin.yml` is the Bukkit API level, not a game-version guarantee.

`UnsupportedClassVersionError` is a Java mismatch, not a plugin bug. Compare the class file version in the trace with the runtime that produced it.

## 3. Resolve dependencies before editing config

Read the descriptor and then the startup log.

- **ExploitFixer** lists HamsterAPI under `softdepend`, but startup aborts with `HamsterAPI is missing or disabled. ExploitFixer cannot start.` Treat HamsterAPI as a hard requirement. A version below `0.3.5` logs a severe warning but still starts.
- **FairPlay** declares `depend: [packetevents]`; without PacketEvents it will not load. GrimAC and Vulcan are optional and their absence is normal.
- **AuthMePremium Mode A** needs the companion on every backend, plus AuthMe where auto-login must change login state. A proxy-only install can look healthy while backends reject the session.
- **Folia** needs the descriptor flag and scheduler-aware code; a missing flag is a load refusal on Folia, not a config error.

If the console says a dependency is missing, install it; editing limits or tokens will not bypass a class that was never loaded.

## 4. Config parse versus config path

These failures look similar:

- **Parse failure.** Invalid YAML, tabs where spaces are required, or a duplicated key. The server usually refuses the file and names a line.
- **Missing path.** FairPlay generates its config from annotated classes and logs `[FairPlay] Missing config value for path '…'` when the running build expects a key your file does not contain. That is not automatically corruption; regenerate or add the key rather than replacing the whole file from a forum post.

RedstoneLimiter migrates old configs to version 7 on startup or reload, so a hand-edited legacy key may be transformed rather than honored.

If a plugin generates its config, let it create defaults before editing one key.

## 5. Permission nodes can be undeclared

An op sees every command; a staff rank does not. Two real examples:

- ExploitFixer checks `exploitfixer.admin` for `/ef checks` and `/ef reload`, and `exploitfixer.logs` for `/ef logs`. Neither node is declared; grant them explicitly.
- FairPlay's dispatcher requires `fairplay.command`, and several subcommands check nodes such as `fairplay.command.alerts` and `fairplay.command.checks` that the descriptor does not declare. `fairplay.notify` only covers alert delivery.

Use your permissions plugin to inspect effective nodes, not the descriptor alone. "No permission" messages can also come from a command blocker or a proxy-level command filter, so check both layers.

## 6. Folia exceptions are ownership errors

`UnsupportedOperationException` on Folia usually means a plugin touched state from the wrong scheduler. AuthMePremium's docs say to confirm the descriptor flag, the current universal JAR, and the `FoliaAPI initialized` log line, then route player mutations through the entity scheduler. Do not replace the call with a raw Bukkit scheduler task; that preserves the bug in a different thread.

## 7. Bisect jars, then config

1. Snapshot the plugins directory and configs.
2. Remove half the plugin jars, restart, and reproduce.
3. If it disappears, the cause is in the removed half; add half back and repeat.
4. Keep dependency pairs together: FairPlay with PacketEvents, ExploitFixer with HamsterAPI, AuthMePremium proxy with its backend companion.
5. Once one plugin remains, bisect its config on a copy, not production.
6. Restore the original set before applying the fix.

Do not hot-unload; restart between rounds, because classloader remnants create false results.

## Symptom map

| Symptom | First check |
| --- | --- |
| ExploitFixer never enables | HamsterAPI installed and enabled; version warning in console |
| FairPlay logs a missing config path | Generated config vs running build; do not wipe the file |
| `proxy UUID is not approved` | Approve the exact UUID on that backend; repeat per backend |
| `token mismatch` | Compare proxy and backend token, including whitespace and learned values |
| Folia `UnsupportedOperationException` | Descriptor flag, current JAR, `FoliaAPI initialized`, entity scheduler |
