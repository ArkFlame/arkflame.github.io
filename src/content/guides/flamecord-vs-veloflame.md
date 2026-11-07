---
title: "FlameCord vs VeloFlame: pick by proxy ecosystem, not speed"
description: "FlameCord is a BungeeCord/Waterfall fork and VeloFlame a Velocity fork, so compare protocol tables, build targets, firewall defaults and migration limits."
updated: 2026-10-30
author: "LinsaFTW"
relatedPlugins: ["flamecord", "veloflame"]
topics: ["proxy", "migration", "comparison"]
---

FlameCord and VeloFlame are different proxies, not two builds of the same one. FlameCord is a BungeeCord/Waterfall fork. VeloFlame is a Velocity fork built from the Velocity-CTD tree. Your plugins, forwarding setup and staff commands should decide the move. Neither repository has a benchmark, so "faster" is not a reason to switch.

## They fork different proxies

FlameCord's README calls it a fork of BungeeCord and Waterfall. Its proxy module inherits the Waterfall `26.1-R0.1-SNAPSHOT` line, and the bootstrap main class is still `net.md_5.bungee.Bootstrap`. Bungee plugins, Bungee-style commands and Bungee forwarding are native to it.

VeloFlame's root project is named `velocity-ctd`. Its product code adds `/veloflame` commands and its own firewall. Velocity plugins and Velocity forwarding are native. A Bungee plugin jar won't load on VeloFlame, and a Velocity plugin won't load on FlameCord.

## Protocol and build facts

| Fact | FlameCord | VeloFlame |
| --- | --- | --- |
| Upstream | BungeeCord / Waterfall | Velocity-CTD |
| Protocol table | `1.8.x` through `1.21.x`, plus a `26.x` line ending at `MINECRAFT_26_3` | minimum `1.7.2`, maximum constant `MINECRAFT_26_3` |
| Compile target | proxy release 17, bootstrap release 11 | Java 25 toolchain |
| Product version string | Waterfall parent `26.1-R0.1-SNAPSHOT` | Gradle `4.2.1-SNAPSHOT`, internal string `1.4.9` |
| Shipped artifact | `FlameCord.jar` from the bootstrap module | `VeloFlame-Lite.jar` from the shaded proxy module |
| Product commands | none registered by the FlameCord module; upstream module toggles remain | `/veloflame reload`, `whitelist`, `firewall`, `maintenance` |
| Config files | `flamecord.yml`, `modules.yml` | `veloflame.toml`, `default-velocity.toml` |

These are manifest and protocol-table facts, not runtime checks. The compile targets show how the jars are built. Neither repository states a runtime Java requirement in its product docs. Don't treat `release 17` or `Java 25` as a hosting requirement until you test your own startup.

Both protocol tables are broad, but a client version in a protocol enum only proves the proxy can parse that handshake. It doesn't prove gameplay works.

## Firewall defaults and root requirements

Both proxies ship with an IP firewall on by default. Both expect Linux tools that ordinary panel hosting may not provide.

FlameCord's `antibot.firewall.ipset` defaults to `true`. At startup, the code runs `apt install iptables`, `apt install ipset`, `ipset create flamecord hash:ip timeout <expiry>`, and adds an `iptables -t raw -I PREROUTING` drop rule. It removes the rule on shutdown. This needs a Debian-style host and root. The repository doesn't say what happens when these commands fail.

VeloFlame's `firewall.enabled` defaults to `true`, with `firewall.ipset = true` and a 60-second duration. The shipped config comment names the exact `iptables -w 5 -I INPUT` rule and the requirement: Linux `ipset` and `iptables`, plus root or `CAP_NET_ADMIN`. It also says the Java-side firewall cache still works if OS setup fails.

Decide before you migrate whether you can run that tooling. If you can't, turn the feature off on purpose and accept the weaker protection. Don't leave a default that fails silently.

## Artifacts and version drift

Don't copy a jar name from a README.

- FlameCord builds `FlameCord.jar` (bootstrap `finalName`), not a Waterfall-named file.
- VeloFlame's README is upstream Velocity-CTD text and mentions an "`-all` JAR". The real shadow jar is hard-coded as `VeloFlame-Lite.jar`.
- VeloFlame reports two version strings: the Gradle version and internal `1.4.9`. Include `/veloflame` output when you ask for support.

After a build, list the output directory and run the jar you actually built. For deployment, see the [FlameCord product page](/plugins/flamecord/) and [docs](/docs/flamecord/), or [VeloFlame](/plugins/veloflame/) and its [docs](/docs/veloflame/).

## Migration constraints

1. **Plugins.** List every proxy plugin. Replace Bungee plugins with Velocity equivalents. Don't port them by renaming the jar.
2. **Forwarding.** Bungee-style `ip_forward` and the backend's Bungee mode don't carry over to Velocity's `player-info-forwarding-mode` and `forwarding-secret-file`. VeloFlame ships with `player-info-forwarding-mode = "none"`, so the default config is not a finished production setup.
3. **Commands and permissions.** FlameCord has no product command tree. VeloFlame adds `/veloflame` with `veloflame.reload`, `veloflame.whitelist`, `veloflame.firewall` and `veloflame.maintenance`. Rewrite staff docs and permission grants.
4. **Configs.** There is no converter. Rebuild `veloflame.toml` and `default-velocity.toml` from the new defaults, then reapply only the settings you can explain.
5. **Cutover.** Run both proxies against a test backend. Compare login, forwarding, whitelist and firewall behavior. Then change DNS. A proxy swap is not a rolling restart.

The [secure proxy and backend guide](/guides/secure-proxy-backend/) covers the forwarding and trust layer that has to survive the move.
