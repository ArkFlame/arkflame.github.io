---
title: "AuthMePremium Mode A vs Mode B: install and trust"
description: "Choose AuthMePremium Mode A or Mode B by proxy type and AuthMe version, then wire proxy UUID approval, bridge tokens and private backend ports correctly."
updated: 2026-10-30
author: "LinsaFTW"
relatedPlugins: ["authme-premium"]
topics: ["authentication", "proxy", "installation"]
---

Mode A puts the AuthMePremium companion on the proxy and on every backend. Backends trust the proxy through a UUID allow-list and a plugin-message token. Mode B removes the companion from backends, requires Velocity, and lets standard AuthMe 6.0.0+ backends use the native `authme:main` channel. Pick by proxy type and AuthMe version first. The rest of the install follows from that.

## The two modes at a glance

| Requirement | Mode A (default) | Mode B (optional) |
| --- | --- | --- |
| Proxy | Bungee-compatible or Velocity | Velocity only |
| Backend plugin | AuthMePremium universal JAR on every backend | Standard AuthMeReloaded 6.0.0+ |
| Transport | proprietary `authmp:*` plugin messages | native `authme:main` |
| Auto-login support | AuthMe 5.x–6.x via companion | AuthMe 6.0.0+ |
| Bedrock completion, Vault groups, `SYNC_CRACKED_STATE` | provided | not provided |
| Config switch | `bridge.plugin-message.enabled: true` | `bridge.authme-native.enabled: true` |

A "universal JAR" is one artifact with both proxy and Bukkit entry points. Build from the project root with JDK 21. `common`, `bukkit` and `bungee` compile for Java 17, and `velocity` for Java 21. The install docs say to run Bukkit on Java 17 or newer. These are build targets, not a tested matrix.

## Mode A: companion on every backend

1. Put the same AuthMePremium JAR in the proxy's plugins directory and in the plugins directory of every backend that gets proxy players.
2. Install AuthMe Reloaded on each backend where AuthMe login or registration state must change.
3. Start one backend and read its warning. An unapproved proxy logs `Backend auto-login blocked: proxy UUID is not approved.` The backend writes the UUID to its pending list.
4. On that backend, run `/authmepremium pendingproxies`, then `/authmepremium approveproxy <uuid>`. Reject unknown UUIDs with `/authmepremium rejectproxy <uuid>`.
5. Repeat on every backend. An empty allow-list auto-approves only the first UUID. Later proxies are not approved.
6. Confirm the proxy and backend token values match, or deliberately leave both empty.

`allowed-proxies.txt` holds the approved UUIDs. Backend auto-login also needs `authme.enabled: true`. Shipped defaults are `auto-login.timeout-seconds: 15` and `auto-login.max-retries: 5`.

## Mode B: Velocity plus AuthMe 6.0.0+

Mode B drops the Bukkit companion from the session path, but you give up features. Bungee-compatible proxies, AuthMe 5.x backends, Bedrock completion, Vault group changes and cracked-state sync still need Mode A.

Per backend:

- AuthMeReloaded 6.0.0+ stable.
- `Hooks.bungeecord: true`.
- `Hooks.proxySharedSecret` set to exactly the value of `bridge.authme-native.shared-secret` in the proxy config.
- AuthMe DataSource caching off, as AuthMe documents for proxy networks.
- Correct clocks on the proxy and backends. AuthMe rejects stale signed messages.

On the proxy, set `bridge.authme-native.enabled: true`. Then fill `login-source-servers` and `target-servers` so only intended servers can promote or receive sessions. Shipped defaults are empty lists, `all-target-servers: false`, `max-retries: 3` and `retry-delay-millis: 1000`.

## Token trust is a separate layer from forwarding

Forwarding tells the backend who the player is. It doesn't authorize the proxy. AuthMePremium has its own trust check, and a token mismatch looks like a login failure:

`Rejected force action ... due to token mismatch`

Compare `bridge.plugin-message.token` on proxy and backend, including whitespace. Don't print the value. If the backend had an empty token with `learn-first-token: true`, it may have saved the first token it saw. A later proxy or changed token then gets rejected. Set one explicit shared token on all sides, restart, and re-approve proxy UUIDs if needed. Mode B fails the same way with `Hooks.proxySharedSecret` and the shared secret. No separate token is involved.

Tokens, passwords, IPs and player credentials don't belong in a support thread. The [AuthMePremium docs](/docs/authme-premium/) and the [secure proxy guide](/guides/secure-proxy-backend/) cover the network layer around this trust check.

## Backend port hygiene

Keep backend ports reachable only from proxy addresses. The install docs require forwarding that blocks direct backend access, and the ops checklist says the same.

Don't open a backend port to the internet to fix a UUID or token error. That skips the trust boundary instead of repairing it. From an outside host, check that the backend port is closed. From the proxy host, check that it's open.

## Version and artifact notes

- Parent POM version is `2.7.2`. The universal `finalName` produces `authmepremium-2.7.2.jar`. The README still names `authmepremium-2.2.1-SNAPSHOT.jar`, so trust the build output over the README.
- Bukkit descriptor: `api-version: "1.20"`, `folia-supported: true`. The API level is not a Minecraft version guarantee.
- Proxy permission nodes are described in the docs but have no descriptor defaults. Grant them in your permissions plugin.

## Frequently asked questions

### Which mode should I choose?

Mode A works with Bungee-compatible or Velocity proxies. Mode B requires Velocity and AuthMe 6.0.0 or newer on the backends.

### Does forwarding authorize a backend connection?

No. Forwarding identifies the player. The backend still needs its own trust check.

### Should backend ports be reachable from the internet?

No. Keep them private, so only the proxy reaches them.
