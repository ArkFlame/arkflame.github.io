---
title: "VeloFlame quick start"
description: "Velocity proxy fork adding antibot, rate limiting, firewall, whitelist, and maintenance commands, built with a Java 25 toolchain."
plugin: "veloflame"
category: "network"
updated: 2026-10-30
---

VeloFlame is a Velocity proxy fork that adds antibot checks, connection rate limits, a firewall module, and administrative whitelist and maintenance commands. Internally the project is `velocity-ctd`, and its README is upstream Velocity-CTD text, not VeloFlame documentation.

## Requirements

- Root or `CAP_NET_ADMIN` on Linux when `firewall.ipset` stays `true`, the default. The config notes that `ipset` and `iptables` are required; if setup fails, the Java-side cache still works.
- No plugin dependency descriptor; VeloFlame replaces the proxy.
- Java 25 build toolchain.

The protocol API declares `MINIMUM_VERSION = MINECRAFT_1_7_2` and a maximum at `MINECRAFT_26_3`, so the declared range is 1.7.2 through 26.3.

Two version strings disagree: Gradle reports `4.2.1-SNAPSHOT`, while `VeloFlame.java` reports internal version `1.4.9`.

## Install

1. Build with the Gradle wrapper: `./gradlew build`.
2. Take the shaded proxy jar from `proxy/build/libs`. The produced file is **`VeloFlame-Lite.jar`**, hard-coded in `proxy/build.gradle.kts`.
3. Run it. A default `veloflame.toml` is generated alongside the core `velocity.toml`.
4. If `firewall.ipset` remains `true`, install `ipset` and `iptables` and run with root or `CAP_NET_ADMIN`.

**Artifact-name drift:** the README says `-all`; this build emits `VeloFlame-Lite.jar`.

## Configure

Real defaults from `default-veloflame.toml`:

```toml
config-version = "0.0.8"

[firewall]
enabled = true
duration = 60
ipset = true

[ratelimit]
connections = 3
connections-period = 5

[packet-guard]
serverbound-unknown-play-max-packet-size = 204800
```

Core proxy settings such as bind address, servers, and forwarding remain in `velocity.toml`. The `[limbo]` section is marked VeloFlame PRO only and defaults to `enabled = true`. Its default global whitelist includes localhost and private addresses; remove those entries on a test instance or the limbo check will never see your connection. `[advanced] seamless-server-switching` defaults to `false` and the config warns to enable it only when backends use compatible registries and data packs.

## Commands

Root is `/veloflame`, alias `/velo`. `/bungeecord` and `/bungee` aliases are added for non-PRO builds, or when PRO controls allow them.

| Command | Purpose |
| --- | --- |
| `/veloflame` | Version, edition, and command list |
| `/veloflame reload` | Reload configuration |
| `/veloflame whitelist` | Usage and entry count |
| `/veloflame whitelist add <entry>` | Add a single-word entry |
| `/veloflame whitelist remove <entry>` | Remove an entry |
| `/veloflame whitelist list` / `clear` | List or clear entries |
| `/veloflame firewall` | Usage: `add`, `remove`, `list` |
| `/veloflame firewall add <ip>` | Add an IP |
| `/veloflame maintenance` | Status |
| `/veloflame maintenance on\|off [backend] [target]` | Global or per-backend toggle |

Whitelist and maintenance arguments use Velocity's single-word string argument, so entries cannot contain spaces.

The README also documents inherited upstream commands; this page does not reproduce them, because they are upstream docs rather than VeloFlame-specific behavior verified here.

## Permissions

These four nodes are checked in source:

| Node | Where enforced |
| --- | --- |
| `veloflame.reload` | `VeloFlameCommand` |
| `veloflame.whitelist` | `WhitelistSubcommand` |
| `veloflame.firewall` | `FirewallSubcommand` |
| `veloflame.maintenance` | `MaintenanceSubcommand` |

No descriptor declares these nodes, so there are **no default values**. Assign them through your permission plugin; do not assume operator grants. Upstream `velocity.command.*` nodes appear only in the inherited README, with `velocity.command.gkick` as the one code-confirmed sample.

## Troubleshooting

VeloFlame has **no troubleshooting document or section**. Only inline config comments cover failure behavior: firewall setup failure falls back to the Java-side cache, seamless switching carries a registry compatibility warning, and limbo testing requires removing localhost/private entries from the global whitelist. Do not treat those comments as a diagnostic guide.


## Related

- [VeloFlame product page](/plugins/veloflame/)
- [FlameCord quick start](/docs/flamecord/)
- [FlameCord vs VeloFlame](/guides/flamecord-vs-veloflame/)
- [Secure proxy and backend setup](/guides/secure-proxy-backend/)
- [AuthMe premium topologies](/guides/authme-premium-topologies/)
