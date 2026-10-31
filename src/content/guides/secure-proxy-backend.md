---
title: "Locking backend ports to the proxy without breaking AuthMePremium trust"
description: "Separate backend reachability from proxy trust: bind and firewall backend ports, verify forwarding, then fix AuthMe UUID approval or token mismatches."
updated: 2026-10-30
author: "LinsaFTW"
relatedPlugins: ["authme-premium", "flamecord", "veloflame"]
topics: ["security", "proxy", "networking"]
---

Two different jobs get confused during a login failure. One is network reachability: only the proxy should be able to open a backend connection. The other is application trust: the backend must recognize the proxy's UUID and token (Mode A) or shared secret (Mode B). Opening the backend port fixes neither and removes the boundary that makes trust meaningful.

## Layer 1: make the backend unreachable from the internet

- Bind the backend to a private interface, or to loopback when the proxy runs on the same host. In vanilla configuration this is the `server-ip` setting; panels usually expose it as a bind address.
- Firewall the backend port so only the proxy's address can reach it.
- Do not publish the backend port through the proxy's load balancer or DNS name.
- Verify from outside: a connection attempt to the backend address should fail or time out. From the proxy host, it should succeed. `ss -lntp` on the backend shows which address the process actually bound.

This is host configuration, not a plugin feature. AuthMePremium's install docs require a forwarding configuration that prevents direct backend access, and its operations checklist says backend ports should accept traffic only from proxy addresses.

## Layer 2: forwarding is identity, not authorization

Bungee-style forwarding and Velocity forwarding both tell the backend who the player is. They do not prove that the connecting process is your proxy, and they do not replace the AuthMePremium trust gate.

- On FlameCord, forwarding follows the inherited BungeeCord/Waterfall model. Confirm `ip_forward` on the proxy and the backend's Bungee mode before changing anything else.
- On VeloFlame, the core setting is `player-info-forwarding-mode` in `default-velocity.toml`, with `forwarding-secret-file` for modern or BungeeGuard forwarding. The shipped file defaults to `"none"`, so a fresh install is not a finished production setup.
- Keep forwarding secrets out of tickets.

AuthMePremium is not a replacement for the proxy, AuthMe, Geyser, Floodgate, or your firewall. It sits on top of a correctly forwarded connection.

## Layer 3: AuthMePremium trust

**Mode A (proxy UUID plus plugin-message token).** Each backend keeps an `allowed-proxies.txt`. An unknown proxy produces `Backend auto-login blocked: proxy UUID is not approved.` Read the pending list, run `/authmepremium pendingproxies`, and approve the exact UUID with `/authmepremium approveproxy <uuid>`. Repeat on every backend. An empty allow-list auto-approves the first UUID only; later proxies still need approval.

Then compare `bridge.plugin-message.token` on proxy and backend. A mismatch logs `Rejected force action ... due to token mismatch` and can come from whitespace or a learned token. If `learn-first-token: true` and the backend token was empty, the backend may have persisted the first token it saw; a changed proxy token is then rejected. Set one explicit value everywhere, restart, and re-approve if needed.

**Mode B (Velocity native bridge).** AuthMe 6.0.0+ backends need `Hooks.bungeecord: true` and `Hooks.proxySharedSecret` exactly matching `bridge.authme-native.shared-secret`. Disable AuthMe DataSource caching as AuthMe documents, and keep proxy and backend clocks sane; stale signed messages are rejected.

Whichever mode you use, tokens and secrets are compared, not published. The [Mode A vs Mode B guide](/guides/authme-premium-topologies/) covers the full install matrix.

## The proxy firewall is not a backend ACL

Both proxy projects ship an IP firewall enabled by default. It blocks abusive client addresses at the proxy; it does not decide which hosts may reach a backend.

| Default | FlameCord | VeloFlame |
| --- | --- | --- |
| Feature switch | `antibot.firewall.ipset: true` | `firewall.enabled: true`, `firewall.ipset: true` |
| Block duration | `antibot.firewall.time: 60` | `firewall.duration: 60` |
| Host requirement | root; code runs `apt install iptables`, `apt install ipset`, `ipset create flamecord`, and an `iptables -t raw -I PREROUTING` drop rule | root or `CAP_NET_ADMIN`; config comment names `iptables -w 5 -I INPUT` and the `veloflame-firewall` set |
| Failure behavior | not documented in the repository | documented: Java-side firewall cache still works |

FlameCord's startup path assumes a Debian-style host because it calls `apt`. If you cannot run that, disable the feature deliberately rather than leaving a default that fails silently. Neither firewall substitutes for restricting the backend port.

## Check the trust chain in order

1. From an external host, confirm the backend port is closed.
2. From the proxy host, confirm it is reachable.
3. Confirm the backend descriptor and the proxy agree on forwarding mode.
4. Confirm the expected proxy UUID is approved on every backend.
5. Confirm tokens or shared secrets match, without printing them.
6. Read the backend log for a trusted action and AuthMe completion before blaming the player.

Do not solve a UUID or token error by opening the backend firewall. That converts a configuration bug into an exposure.

## BungeeGuard

VeloFlame's shipped `default-velocity.toml` comments name BungeeGuard IP forwarding as one of the forwarding modes. That is the only local reference found. This guide does not evaluate or recommend it.

## Limits

No proxy, backend, firewall, or AuthMe handshake was executed for this review. Host commands such as `ss` and external connection tests are standard administration, not product-verified steps. Exact forwarding keys vary by proxy version; verify against the config your build generates. The FlameCord firewall's behavior on non-Debian hosts is undocumented.

## Sources and review

Reviewed read-only on 30 October 2026: AuthMePremium README and `docs/installation.md`, `docs/operations-and-troubleshooting.md`; FlameCord `FlameCord.java`, `FlameCordConfiguration.java`, and README; VeloFlame `default-veloflame.toml`, `default-velocity.toml`, and README. No builds or runtime tests. Product routes: [AuthMePremium](/plugins/authme-premium/), [FlameCord](/plugins/flamecord/), [VeloFlame](/plugins/veloflame/); docs at [AuthMePremium](/docs/authme-premium/).
