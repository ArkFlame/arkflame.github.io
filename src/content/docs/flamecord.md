---
title: "FlameCord quick start"
description: "BungeeCord and Waterfall fork proxy with antibot filtering, packet limits, and an optional iptables/ipset firewall module."
plugin: "flamecord"
category: "network"
updated: 2026-10-30
runtimeVerified: false
evidenceNote: "Reviewed against the FlameCord repository on 30 Oct 2026; not runtime-tested."
---

FlameCord is a BungeeCord/Waterfall fork that replaces the proxy jar. It adds antibot checks, packet limits, and a firewall module on top of the upstream proxy, and tracks Waterfall changes as needed.

## Requirements

- A Linux host if the firewall module stays enabled. `antibot.firewall.ipset` defaults to `true`, and startup runs `apt install iptables -y`, `apt install ipset -y`, `ipset create flamecord hash:ip timeout <time>`, and an `iptables -t raw -I PREROUTING` drop rule for the `flamecord` set. This needs root.
- No plugin dependencies. FlameCord is a standalone proxy replacement, not a plugin.
- Java 17 is the proxy module's Maven compiler release and Java 11 the bootstrap's. These are compile targets; the README states no runtime Java version.

The proxy's protocol table lists `1.8.x` through `1.21.x` plus `26.x`, ending at `MINECRAFT_26_3`. The project version is `26.1-R0.1-SNAPSHOT`.

## Install

1. Build or obtain `FlameCord.jar`. The bootstrap module sets `finalName` to `FlameCord` and main class `net.md_5.bungee.Bootstrap`.
2. Place the jar in the proxy directory and run it. The README's instruction is to drag and drop it into the server folder.
3. Keep `iptables` and `ipset` installed and run as root if you leave `antibot.firewall.ipset: true`.
4. First start generates `flamecord.yml` and `modules.yml`. Missing keys are appended on later loads with `setIfUnexistant`.

No FlameCord component goes on backends.

## Configure

Real defaults from `flamecord.yml`:

```yaml
antibot:
  accounts:
    enabled: true
    limit: 3
  latency:
    limit: 900
  country:
    blacklist: ["CN", "HK", "RU", "IN", "TH", "ID", "DZ", "VN", "IR", "PK"]
  firewall:
    enabled: true
    ipset: true
    time: 60
  ratelimit:
    connections-per-second: 3
  packets:
    vls-to-kick: 100.0
    vls-to-cancel: 25.0
balancer:
  enabled: false
```

The firewall thread also destroys and recreates the `flamecord` ipset at startup and removes the iptables rule at shutdown. The repository does not state what happens when `apt`, `ipset`, or `iptables` fail, so verify the rule exists rather than assuming the module is active.

`modules.yml` toggles upstream Bungee modules: `alert`, `find`, `ip`, `list`, `perms`, `reload`, `send`, `server`, and `reconnect`. All default to `true` except `reconnect`.

## Commands and permissions

FlameCord registers **no product-specific commands**. A search of the module source for command registration found only the shell commands used by the firewall. The upstream Bungee commands remain available when their `modules.yml` flag is enabled, but this repository does not document their syntax.

FlameCord declares **no permission nodes**. The module ships no `plugin.yml` or equivalent descriptor. Do not copy upstream Bungee permission nodes into a FlameCord setup expecting them to be verified here.

## Troubleshooting

The repository has **no troubleshooting document or section**. The only operational failure path visible in source is the firewall startup sequence: the `apt`, `ipset`, and `iptables` commands run on a background thread, gated by `antibot.firewall.ipset`. Failure handling is not defined in the repo. Source shows the exact commands it attempts; verify those took effect on the host.

## Evidence and limits

Inspected: `README.md`, `FlameCordConfiguration.java`, `ModulesConfiguration.java`, `FlameCord.java`, `ProtocolConstants.java`, both POMs, and the bootstrap descriptor. No build or proxy run was performed. Not verified: runtime Java version, behavior when firewall commands fail, upstream command syntax, any Minecraft compatibility beyond the protocol constant table, and performance claims. FlameCord has no product commands, no permission nodes, and no troubleshooting guide; this page says so rather than filling the gap.

## Related

- [FlameCord product page](/plugins/flamecord/)
- [VeloFlame quick start](/docs/veloflame/)
- [FlameCord vs VeloFlame](/guides/flamecord-vs-veloflame/)
- [Secure proxy and backend setup](/guides/secure-proxy-backend/)
- [Diagnose lag before adding limiters](/guides/diagnose-lag-before-limiters/)
