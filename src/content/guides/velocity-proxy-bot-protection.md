---
title: "Protecting a Velocity proxy from bot attacks"
description: "Layer host firewall, whitelist, maintenance mode and connection limits on a Velocity proxy, using the controls VeloFlame and FlameCord document."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["veloflame", "flamecord"]
topics: ["velocity", "bot-protection", "proxy", "firewall", "rate-limiting"]
---

A bot attack hits the proxy first. Botted connections fill the login queue and keep backends busy with handshakes that never finish. One setting rarely stops this. The fix is a stack of controls, each one catching what the layer above missed.

This guide uses the controls that VeloFlame and FlameCord document. VeloFlame is a Velocity fork. FlameCord is for BungeeCord and Waterfall networks. If you run Velocity, start with VeloFlame. Use FlameCord only if your network runs BungeeCord or Waterfall.

## The layers

1. **Host firewall.** Block traffic you do not need before it reaches Java.
2. **Whitelist.** Let known players in while an attack is running.
3. **Maintenance mode.** Stop new logins to a backend while you work on it.
4. **Connection limits.** Cap how fast connections and accounts arrive.
5. **Packet guards.** Drop clients that send malformed or excessive packets.
6. **Logs.** Watch what each layer rejects, so you can tune the limits.

## Layer 1: host firewall

VeloFlame includes firewall and whitelist commands. Use them, but also keep the host firewall rules you already trust. The proxy port should be the only public port. Backend ports should not accept traffic from the internet.

FlameCord's default firewall module uses `ipset` and `iptables`. It needs a Linux host with root access. If you run FlameCord on another OS, or you do not want root in the proxy process, do this step at the host level.

## Layer 2: whitelist

Turn on the whitelist before an attack, not during one. Add your staff and regular players. Keep the list short and review it after the attack.

Test it: join from an account that is not on the list and confirm that it is refused. Then join from one that is on the list.

## Layer 3: maintenance mode

VeloFlame's maintenance mode can target a backend. Use it to stop new logins to one server while you restart it or clear a problem. Players already online stay where they are.

Use this during an attack on a single backend. Do not use it as the main defence.

## Layer 4: connection limits

FlameCord's documented controls include connection rate limits, account limits and latency thresholds. VeloFlame documents connection rate limiting. Set limits high enough for a real join spike. A server that loses a busy evening to strict limits loses players.

Start with the defaults. Watch the logs for a day. Then adjust one limit at a time.

## Layer 5: packet guards

Both products document packet-level protection. FlameCord has packet violation thresholds and kick rules. VeloFlame has packet guards. A client that breaks the protocol gets dropped before it can take more of the proxy's time.

Read the thresholds before you change them. A threshold that is too low kicks players on bad connections.

## Layer 6: logs

Check the logs after every change. You want to see:

- How many connections each limit rejected.
- Which IP ranges repeat.
- Whether any real player was refused.

If the logs show many refusals from one source, the firewall layer is the right place to block it.

## Compatibility notes

- VeloFlame's protocol constants cover 1.7.2 to 26.3. The repository's README is upstream Velocity text and names an artifact the build no longer emits. Use the release artifact from the product page, not the README, as your install reference.
- FlameCord's protocol table covers 1.8.x to 1.21.x and 26.x.
- Neither product's build Java version is a runtime requirement. Check the release notes before you deploy.

## What this guide does not cover

No setting makes a proxy immune to a large attack. These controls limit the damage and keep backends usable. For a large attack, add upstream protection at your hosting provider or network edge. That layer is outside these plugins.

For product details, see the [VeloFlame product page](/plugins/veloflame/) and the [FlameCord product page](/plugins/flamecord/).

## Frequently asked questions

### Does one setting stop a bot attack?

No. The guide uses a stack of controls, each catching what the layer above missed.

### Which proxy should I use on Velocity?

VeloFlame is the Velocity fork. Use FlameCord only on BungeeCord or Waterfall networks.

### Does this guide cover everything?

No. Read the section on what the guide does not cover.
