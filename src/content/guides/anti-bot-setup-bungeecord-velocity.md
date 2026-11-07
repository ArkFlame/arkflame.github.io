---
title: "Anti-bot setup for BungeeCord and Velocity"
description: "Set up anti-bot protection on a BungeeCord or Velocity proxy with FlameCord or VeloFlame, then lock the backends behind it."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["flamecord", "veloflame", "authme-premium"]
topics: ["proxy", "bungeecord", "velocity", "anti-bot"]
---

Use the proxy's own rate limits and packet guards first. Add a host firewall second. Make sure only the proxy can reach your backends. FlameCord fits BungeeCord and Waterfall. VeloFlame fits Velocity.

## Pick the proxy fork

FlameCord is a BungeeCord and Waterfall-compatible proxy fork with anti-bot and anti-crash modules. Its protocol table covers 1.8.x through 1.21.x, plus 26.x. VeloFlame is a Velocity fork focused on connection protection and proxy performance. It adds whitelist, firewall and maintenance commands on top of the upstream Velocity command set.

Both are proxy forks, so the proxy jar is what changes. The [FlameCord and VeloFlame comparison](/guides/flamecord-vs-veloflame/) covers build and migration details.

## Layer 1: rate limits and packet guards

FlameCord has connection rate limits, account limits and latency thresholds. It also has packet violation thresholds and kick rules. VeloFlame has connection rate limiting and packet guards. Set these before you open the server to players, and test them with a few accounts first.

## Layer 2: firewall

FlameCord's firewall module is enabled by default. It runs ipset and iptables commands and needs a Linux host with root. If you cannot give it root, plan the host firewall yourself and turn the module off on purpose. VeloFlame adds whitelist and firewall commands on top of Velocity.

## Layer 3: whitelist and maintenance

VeloFlame includes maintenance mode with backend targeting. Use it to hold players out while you work on a backend. Keep a whitelist for staff, so you can still join while maintenance is on. Add staff to the whitelist before you turn maintenance on, not after.

## Lock the backends

Backends should not accept connections from the internet. Only the proxy should reach them. Forwarding identifies the player to the backend, but it does not authorize the connection by itself. The [secure proxy backend guide](/guides/secure-proxy-backend/) covers the trust chain in order.

If you run [AuthMe Premium](/plugins/authme-premium/), read the [topology guide](/guides/authme-premium-topologies/) too. Premium logins depend on the trust between the proxy and the backend, so a mistake there breaks sign-in.

## Checklist

1. Block direct access to backend ports from the internet.
2. Turn on connection rate limits and packet guards.
3. Add staff to the whitelist.
4. Use maintenance mode for planned work.
5. Read the logs after each change. The [Velocity bot protection guide](/guides/velocity-proxy-bot-protection/) lists what each layer should log.

## Test each layer

Test one layer at a time. Connect with a normal account, then with a deliberately fast reconnect, then from a host that should be blocked. Each test should produce the log line you expect. If a test passes when it should fail, the layer is not active. Fix that before you add the next layer.

## Build targets

FlameCord compiles for Java 17. VeloFlame's build toolchain is Java 25. Both are build targets, not runtime guidance. Check the requirements of the proxy and backends you actually run.

## What each layer covers

Each layer does a different job:

- Rate limits and packet guards slow down connection floods and malformed traffic before they reach the backends.
- The firewall blocks addresses at the host. FlameCord's module uses ipset and iptables. VeloFlame adds firewall commands on Velocity.
- The whitelist decides who can join while maintenance is on.
- Backend locking decides who can reach a backend at all. It is the only layer that protects a backend if the proxy is bypassed.

## Keep the proxy and backend configs in step

Record which rate limits, whitelist entries and firewall rules are active on the proxy. Record which ports each backend listens on. Review both lists after each change. A backend port that is open to the internet undoes every proxy limit, so check that list first.

## Frequently asked questions

### Can I use FlameCord on Velocity?

No. FlameCord is for BungeeCord and Waterfall. VeloFlame is the Velocity fork.

### Does FlameCord need root?

Its default firewall module does, because it runs ipset and iptables. The firewall is enabled by default.

### Does a proxy setup replace a backend firewall?

No. The proxy limits protect the proxy. Lock the backends so that only the proxy can reach them.

### Which Minecraft versions do these proxies support?

FlameCord's protocol table covers 1.8.x to 1.21.x, plus 26.x. VeloFlame's protocol constants cover 1.7.2 to 26.3.
