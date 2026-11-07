---
title: "Locking backend ports to the proxy without breaking AuthMePremium trust"
description: "Separate backend reachability from proxy trust: bind and firewall backend ports, verify forwarding, then fix AuthMe UUID approval or token mismatches."
updated: 2026-10-30
author: "LinsaFTW"
relatedPlugins: ["authme-premium", "flamecord", "veloflame"]
topics: ["security", "proxy", "networking"]
---

A login failure often mixes two problems. One is network reachability: only the proxy should be able to open a backend connection. The other is application trust: the backend must recognize the proxy's UUID and token (Mode A) or shared secret (Mode B). Opening the backend port fixes neither. It just removes the boundary that makes trust mean something.

## Layer 1: make the backend unreachable from the internet

- Bind the backend to a private interface, or to loopback if the proxy runs on the same host. In vanilla config, that's `server-ip`. Panels usually call it a bind address.
- Firewall the backend port so only the proxy's address can reach it.
- Don't publish the backend port through the proxy's load balancer or DNS name.
- Verify from outside: a connection to the backend address should fail or time out. From the proxy host, it should work. `ss -lntp` on the backend shows the address the process actually bound.

This is host configuration, not a plugin feature. AuthMePremium's install docs require forwarding that blocks direct backend access, and its ops checklist says backend ports should accept traffic only from proxy addresses.

## Layer 2: forwarding is identity, not authorization

Bungee-style forwarding and Velocity forwarding both tell the backend who the player is. They don't prove the connecting process is your proxy, and they don't replace the AuthMePremium trust check.

- FlameCord forwarding follows the inherited BungeeCord/Waterfall model. Check `ip_forward` on the proxy and the backend's Bungee mode before you change anything else.
- VeloFlame's core setting is `player-info-forwarding-mode` in `default-velocity.toml`, with `forwarding-secret-file` for modern or BungeeGuard forwarding. The shipped file defaults to `"none"`, so a fresh install isn't production-ready.
- Keep forwarding secrets out of tickets.

AuthMePremium doesn't replace the proxy, AuthMe, Geyser, Floodgate or your firewall. It runs on top of a correctly forwarded connection.

## Layer 3: AuthMePremium trust

**Mode A (proxy UUID plus plugin-message token).** Each backend keeps an `allowed-proxies.txt`. An unknown proxy logs `Backend auto-login blocked: proxy UUID is not approved.` Read the pending list with `/authmepremium pendingproxies`, then approve the exact UUID with `/authmepremium approveproxy <uuid>`. Repeat on every backend. An empty allow-list approves only the first UUID. Later proxies still need approval.

Then compare `bridge.plugin-message.token` on proxy and backend. A mismatch logs `Rejected force action ... due to token mismatch`. The cause can be whitespace or a learned token. If `learn-first-token: true` and the backend token was empty, the backend may have saved the first token it saw, so a changed proxy token gets rejected. Set one explicit value everywhere, restart, and re-approve if needed.

**Mode B (Velocity native bridge).** AuthMe 6.0.0+ backends need `Hooks.bungeecord: true`. `Hooks.proxySharedSecret` must match `bridge.authme-native.shared-secret` exactly. Turn off AuthMe DataSource caching as AuthMe documents. Keep proxy and backend clocks correct. Stale signed messages get rejected.

In either mode, tokens and secrets are compared, never published. The [Mode A vs Mode B guide](/guides/authme-premium-topologies/) covers the full install matrix.

## The proxy firewall is not a backend ACL

Both proxies ship with an IP firewall on by default. It blocks abusive client addresses at the proxy. It doesn't decide which hosts can reach a backend.

| Default | FlameCord | VeloFlame |
| --- | --- | --- |
| Feature switch | `antibot.firewall.ipset: true` | `firewall.enabled: true`, `firewall.ipset: true` |
| Block duration | `antibot.firewall.time: 60` | `firewall.duration: 60` |
| Host requirement | root; code runs `apt install iptables`, `apt install ipset`, `ipset create flamecord`, and an `iptables -t raw -I PREROUTING` drop rule | root or `CAP_NET_ADMIN`; config comment names `iptables -w 5 -I INPUT` and the `veloflame-firewall` set |
| Failure behavior | not documented in the repository | documented: Java-side firewall cache still works |

FlameCord's startup path assumes a Debian-style host because it calls `apt`. If you can't run that, turn the feature off on purpose instead of leaving a default that fails silently. Neither firewall replaces restricting the backend port.

## Check the trust chain in order

1. From an outside host, confirm the backend port is closed.
2. From the proxy host, confirm it's reachable.
3. Confirm the backend descriptor and the proxy agree on the forwarding mode.
4. Confirm the expected proxy UUID is approved on every backend.
5. Confirm tokens or shared secrets match, without printing them.
6. Read the backend log for a trusted action and AuthMe completion before you blame the player.

Don't fix a UUID or token error by opening the backend firewall. That turns a config bug into an exposure.

## BungeeGuard

VeloFlame's shipped `default-velocity.toml` comments name BungeeGuard IP forwarding as one forwarding mode. That is the only local reference. This guide doesn't evaluate or recommend it.
