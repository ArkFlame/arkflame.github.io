---
title: "AuthMePremium Mode A vs Mode B: install matrix and trust boundaries"
description: "Choose AuthMePremium Mode A or Mode B by proxy type and AuthMe version, then wire proxy UUID approval, bridge tokens and private backend ports correctly."
updated: 2026-10-30
author: "LinsaFTW"
relatedPlugins: ["authme-premium"]
topics: ["authentication", "proxy", "installation"]
---

Mode A puts the AuthMePremium companion on the proxy and on every backend, and trusts backends through a proxy UUID allow-list plus a plugin-message token. Mode B drops the AuthMePremium companion from backends, requires Velocity, and lets standard AuthMe 6.0.0+ backends consume the native `authme:main` channel. Pick by proxy type and AuthMe version first; the rest of the install follows.

## The two modes at a glance

| Requirement | Mode A (default) | Mode B (optional) |
| --- | --- | --- |
| Proxy | Bungee-compatible or Velocity | Velocity only |
| Backend plugin | AuthMePremium universal JAR on every backend | Standard AuthMeReloaded 6.0.0+ |
| Transport | proprietary `authmp:*` plugin messages | native `authme:main` |
| Auto-login support | AuthMe 5.x–6.x via companion | AuthMe 6.0.0+ |
| Bedrock completion, Vault groups, `SYNC_CRACKED_STATE` | provided | not provided |
| Config switch | `bridge.plugin-message.enabled: true` | `bridge.authme-native.enabled: true` |

"Universal JAR" means one artifact with proxy and Bukkit entry points. Build from the project root with JDK 21; `common`, `bukkit`, and `bungee` compile for Java 17, `velocity` for Java 21, and the install docs say to run Bukkit with Java 17 or newer. Those are build targets, not a tested matrix.

## Mode A: companion on every backend

1. Put the same AuthMePremium JAR in the proxy's plugins directory and in the plugins directory of every backend that receives proxy players.
2. Install AuthMe Reloaded on each backend where AuthMe login or registration state must change.
3. Start one backend and read its warning. An unapproved proxy produces `Backend auto-login blocked: proxy UUID is not approved.` The backend writes the UUID to its pending list.
4. On that backend, run `/authmepremium pendingproxies`, then `/authmepremium approveproxy <uuid>`. Reject unknown UUIDs with `/authmepremium rejectproxy <uuid>`.
5. Repeat on every backend. An empty allow-list auto-approves the first UUID only; it does not approve later proxies.
6. Confirm the proxy and backend token values match, or intentionally use empty tokens on both sides.

`allowed-proxies.txt` holds the approved UUIDs. Backend auto-login also depends on `authme.enabled: true`, with `auto-login.timeout-seconds: 15` and `auto-login.max-retries: 5` as shipped defaults.

## Mode B: Velocity plus AuthMe 6.0.0+

Mode B removes the Bukkit companion from the session-continuity path, but it also gives up features. Bungee-compatible proxies, AuthMe 5.x backends, Bedrock completion, Vault group changes, and cracked-state sync still require Mode A.

Per backend:

- AuthMeReloaded 6.0.0+ stable.
- `Hooks.bungeecord: true`.
- `Hooks.proxySharedSecret` set to exactly the same value as `bridge.authme-native.shared-secret` in the proxy config.
- AuthMe DataSource caching disabled, as AuthMe documents for proxy networks.
- Sane clocks on proxy and backends; AuthMe rejects stale signed messages.

On the proxy, set `bridge.authme-native.enabled: true`, then populate `login-source-servers` and `target-servers` so only intended servers can promote or receive sessions. The shipped defaults are empty lists, `all-target-servers: false`, `max-retries: 3`, and `retry-delay-millis: 1000`.

## Token trust is a separate layer from forwarding

Forwarding tells the backend who the player is. It does not authorize the proxy. AuthMePremium has its own trust gate, and a token mismatch looks like a login failure:

`Rejected force action ... due to token mismatch`

Compare `bridge.plugin-message.token` on proxy and backend, including whitespace, without printing the value. If the backend had an empty token with `learn-first-token: true`, it may have persisted the first token it saw. A later proxy or changed token is then rejected. Set one explicit shared token on all sides, restart, and re-approve proxy UUIDs if needed. Mode B has the same failure shape with `Hooks.proxySharedSecret` and the shared secret; there is no separate token to blame.

Tokens, passwords, IPs, and player credentials do not belong in a support thread. The [AuthMePremium docs](/docs/authme-premium/) and the [secure proxy guide](/guides/secure-proxy-backend/) cover the network layer around this trust gate.

## Backend port hygiene

Keep backend ports reachable only from proxy addresses. The install docs require a forwarding configuration that prevents direct backend access, and the operations checklist repeats it: backend ports should accept traffic only from proxy addresses.

Do not open a backend port to the internet to "fix" a UUID or token error. That bypasses the trust boundary instead of repairing it. Verify from an external host that the backend port is closed, and from the proxy host that it is open.

## Version and artifact notes

- Parent POM version is `2.7.2`; the universal `finalName` produces `authmepremium-2.7.2.jar`. The README still names `authmepremium-2.2.1-SNAPSHOT.jar`, so trust the build output, not the README string.
- Bukkit descriptor: `api-version: "1.20"`, `folia-supported: true`. The API level is not a Minecraft version guarantee.
- Proxy permission nodes have behavior in docs but no descriptor defaults; grant them through your permissions plugin.

## What is not runtime-verified

No proxy, backend, AuthMe install, or player login was executed for this review. Mode behavior, approval flow, token learning, and log messages come from the repository docs, descriptors, and config defaults. The exact AuthMe compatibility pairing is logged at startup as `PreJoin=..., Online=...`; use that line when the documented mode does not match your installed AuthMe build.

If approval or token steps fail, collect the exact log family before changing config. The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) explains what to capture.

## Sources and review

Reviewed the AuthMePremium repository read-only on 30 October 2026: README, `docs/installation.md`, `docs/operations-and-troubleshooting.md`, `docs/commands-and-permissions.md`, `bukkit/src/main/resources/plugin.yml`, `bukkit-config.yml`, `common/src/main/resources/proxy-config.yml`, and the parent POM. No build or runtime test.
