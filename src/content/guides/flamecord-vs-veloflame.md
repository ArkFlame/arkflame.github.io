---
title: "FlameCord vs VeloFlame: pick by proxy ecosystem, not speed"
description: "FlameCord is a BungeeCord/Waterfall fork and VeloFlame a Velocity fork, so compare protocol tables, build targets, firewall defaults and migration limits."
updated: 2026-10-30
author: "LinsaFTW"
relatedPlugins: ["flamecord", "veloflame"]
topics: ["proxy", "migration", "comparison"]
---

FlameCord and VeloFlame are not two builds of the same proxy. FlameCord is a BungeeCord/Waterfall fork; VeloFlame is a Velocity fork built from the Velocity-CTD tree. Your existing plugin ecosystem, forwarding setup, and staff commands decide the move. Neither repository contains a benchmark, so "faster" is not a supported reason to switch.

## They fork different proxies

FlameCord's README describes it as a fork of BungeeCord and Waterfall. Its proxy module inherits the Waterfall `26.1-R0.1-SNAPSHOT` line, and the bootstrap main class remains `net.md_5.bungee.Bootstrap`. BungeeCord plugins, Bungee-style commands, and Bungee forwarding are its native world.

VeloFlame's root project is named `velocity-ctd`; the product code adds `/veloflame` commands and its own firewall. Velocity plugins and Velocity forwarding are native. A Bungee plugin jar will not load on it, and a Velocity plugin will not load on FlameCord.

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

These are manifest and protocol-table facts, not runtime checks. The compile targets describe how the jars are built; neither repository states a runtime Java requirement in its product documentation. Do not turn `release 17` or `Java 25` into a hosting requirement without testing your actual startup.

Protocol coverage also is not the same as tested gameplay. Both tables are broad; a client version appearing in a protocol enum only proves the proxy can parse that handshake.

## Firewall defaults and root requirements

Both proxies ship an IP firewall enabled by default, and both expect Linux tooling that ordinary panel hosting may not provide.

FlameCord's `antibot.firewall.ipset` defaults to `true`. At startup the code attempts `apt install iptables`, `apt install ipset`, `ipset create flamecord hash:ip timeout <expiry>`, and an `iptables -t raw -I PREROUTING` drop rule, then removes the rule on shutdown. That path needs a Debian-style host and root. The repository does not document what happens when those commands fail.

VeloFlame's `firewall.enabled` defaults to `true`, with `firewall.ipset = true` and a 60-second duration. Its shipped config comment names the exact `iptables -w 5 -I INPUT` rule and states the requirement: Linux `ipset` plus `iptables` and root or `CAP_NET_ADMIN`. It also documents a fallback: if OS setup fails, the Java-side firewall cache still works.

Decide before migration whether you can run that tooling. If not, disable the feature deliberately and account for the weaker protection; do not leave a default that silently fails.

## Artifacts and version drift

Do not copy a jar name from a README.

- FlameCord builds `FlameCord.jar` (bootstrap `finalName`), not a Waterfall-named artifact.
- VeloFlame's README is upstream Velocity-CTD text and refers to an "`-all` JAR"; the actual shadow jar name is hard-coded as `VeloFlame-Lite.jar`.
- VeloFlame reports two version strings: the Gradle version and an internal `1.4.9`. Quote `/veloflame` output when asking for support.

After building, list the output directory and run the jar you actually produced. For the deployment side, see the [FlameCord product page](/plugins/flamecord/) and [docs](/docs/flamecord/), or [VeloFlame](/plugins/veloflame/) and its [docs](/docs/veloflame/).

## Migration constraints

1. **Plugins.** Inventory every proxy plugin. Bungee plugins must be replaced with Velocity equivalents, not ported by renaming the jar.
2. **Forwarding.** Bungee-style `ip_forward` and the backend's Bungee mode do not carry over to Velocity's `player-info-forwarding-mode` and `forwarding-secret-file`. VeloFlame ships `player-info-forwarding-mode = "none"`, so the default config is not a finished production setup.
3. **Commands and permissions.** FlameCord has no product-specific command tree; VeloFlame adds `/veloflame` with `veloflame.reload`, `veloflame.whitelist`, `veloflame.firewall`, and `veloflame.maintenance`. Staff documentation and permission grants must be rewritten.
4. **Configs.** There is no converter. Rebuild `veloflame.toml` and `default-velocity.toml` from the new defaults, then reapply only settings you can explain.
5. **Cutover.** Run both proxies against a test backend, compare login, forwarding, whitelist, and firewall behavior, then change DNS. A proxy swap is not a rolling restart.

The [secure proxy and backend guide](/guides/secure-proxy-backend/) covers the forwarding and trust layer that must survive the move.

## What neither repo proves

There are no measured TPS, player-count, or latency results in either repository. Feature lists and config defaults are not performance evidence. Select on plugin compatibility, forwarding model, and whether you can operate the firewall; then measure on your own hardware.

## Sources and review

Reviewed the FlameCord and VeloFlame repositories read-only on 30 October 2026. FlameCord: README, `FlameCord-Proxy/pom.xml`, bootstrap POM, `ProtocolConstants.java`, `FlameCord.java`, `FlameCordConfiguration.java`, `ModulesConfiguration.java`. VeloFlame: `settings.gradle.kts`, `gradle.properties`, `build.gradle.kts`, `ProtocolVersion.java`, `default-veloflame.toml`, `default-velocity.toml`, `VeloFlameCommand.java`, and the whitelist, firewall, and maintenance subcommands. No builds or runtime tests.
