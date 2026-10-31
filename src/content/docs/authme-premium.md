---
title: "AuthMe Premium install and topology"
description: "How AuthMe Premium's two proxy session bridge modes differ, what each backend needs, and which install steps its repository documents."
plugin: "authme-premium"
category: "security"
updated: 2026-10-30
runtimeVerified: false
evidenceNote: "Reviewed against the AuthMePremium repository on 30 Oct 2026; not runtime-tested."
---

## What it does

AuthMe Premium bridges premium, cracked, and Bedrock login state between a Bungee-compatible or Velocity proxy and Bukkit/Paper/Folia backends. It integrates with AuthMe Reloaded, Vault groups, Floodgate/Geyser detection, YAML/MySQL/MEMORY profiles, and proxy plugin messages.

It is not a replacement for the proxy, AuthMe, Geyser, Floodgate, firewall, or forwarding security. Premium proof comes from proxy online-mode verification. A username lookup is never proof, and Bedrock auto-login needs a verified Floodgate path or the configured backend fallback.

## The two modes

The repository documents exactly two session bridge modes, both proxy-side.

**Mode A (default)** uses the proprietary `authmp:*` plugin-message bridge. It requires the AuthMePremium Bukkit companion on every backend that receives proxy players. The companion owns AuthMe 5.x auto-login, Bedrock completion, Vault group changes, and `SYNC_CRACKED_STATE`.

**Mode B (optional)** sets `bridge.authme-native.enabled: true`. It is Velocity-only. Standard AuthMeReloaded 6.0.0+ backends consume the native `authme:main` channel, so the Bukkit companion is not required for session continuity. Bungee-compatible proxies, AuthMe 5.x backends, Bedrock completion, Vault group changes, and `SYNC_CRACKED_STATE` still need Mode A.

Mode B backends need AuthMeReloaded 6.0.0+, `Hooks.bungeecord: true`, and `Hooks.proxySharedSecret` matching the proxy's `bridge.authme-native.shared-secret`. Disable AuthMe DataSource caching in proxy/network deployments and keep clocks sane; AuthMe rejects stale signed messages.

## Requirements

- One supported proxy (Bungee-compatible or Velocity); the universal JAR carries proxy and Bukkit entrypoints.
- JDK 21 to build. `common`, `bukkit`, and `bungee` compile for Java 17; `velocity` compiles for Java 21. The install doc says to run Bukkit with Java 17+.
- AuthMe Reloaded on each backend where AuthMe login or register state must change.
- Mode A: the same JAR on the proxy and every backend receiving proxy players.
- Mode B: AuthMe 6.0.0+ backends and the shared secret above.

The Bukkit descriptor declares `api-version: "1.20"` and `folia-supported: true`; these are declarations, not a verified matrix.

## Install

1. Build with Maven: `mvn clean test`, then `mvn clean package`.
2. Take the universal artifact. `universal/pom.xml` sets `finalName` to `authmepremium-${project.version}`, currently `authmepremium-2.7.2.jar`. The README's `2.2.1-SNAPSHOT` is stale.
3. Mode A: place that JAR on the proxy and every backend behind it.
4. Approve each backend's proxy UUID with `/authmepremium pendingproxies` and `/authmepremium approveproxy <uuid>`. An empty allow-list only auto-approves the first UUID.
5. Keep backend ports private to trusted proxy addresses.
6. Mode B: enable `bridge.authme-native.enabled`, match the shared secret, and list `login-source-servers` and `target-servers`.

## Configure

Proxy `proxy-config.yml` defaults include:

```yaml
provider: YAML
database:
  type: YAML
protection:
  block-commands-unauthenticated: true
auto-premium: true
self-service-commands:
  require-permission: false
```

Backend `bukkit-config.yml` enables the AuthMe hook, keeps Vault off, and sets the auto-login timeout to `15` seconds with `5` retries. `bridge.plugin-message.token` ships empty; use one explicit shared token rather than relying on learning.

## Commands

Proxy admin commands require `authmepremium.usage`:

- `/authmepremium setpremium <player> <true|false>`
- `/authmepremium check <player>`
- `/authmepremium clear [player]`
- `/authmepremium setpremiumuuid <player> <true|false>`
- `/authmepremium setuuidmode <player> <default|cracked|premium|auto>`
- `/authmepremium migrateuuid <source> <target>`
- `/authmepremium reload`

Self-service: `/premium` (`/prem`), `/cracked` (`/crack`), `/premiumuuid` (`/uuid`), and `/migrate request|confirm|cancel`.

Bukkit trust: `/authmepremium pendingproxies`, `/authmepremium approveproxy <uuid>`, `/authmepremium rejectproxy <uuid>`.

## Permissions

- `authmepremium.admin`, default `op` in the Bukkit descriptor.
- `authmepremium.usage` for the proxy admin root.
- `authmepremium.premium`, `.cracked`, `.premiumuuid`, and `.migrate` for self-service commands.
- Self-service checks run only when `self-service-commands.require-permission: true`; the default is `false`.

## Troubleshooting

- `Backend auto-login blocked: proxy UUID is not approved.` Approve the UUID on that backend.
- Token mismatch, including after `Learned bridge token from proxy`: set one explicit token and restart.
- Premium action received without an AuthMe login: check ordering, log families, and mode matching.
- Auto-login retries exceeded: inspect `auto-login.*` limits and the AuthMe flow.
- Folia `UnsupportedOperationException`: confirm the current universal JAR and `FoliaAPI initialized`.
- Empty MySQL data: check provider key shape and `authme_premium_profiles`; YAML and MEMORY are not shared stores.
- Never open backend firewall ports to fix trust.

## Evidence and limits

Inspected: `README.md`, installation/commands/operations docs, both descriptors, and bundled configs. Not verified: runtime startup, proxy/backend handshakes, Bedrock flows, Folia scheduling, migrations, and Minecraft version behavior. No benchmark, pricing, or population claims are made.

## Related

- [AuthMe Premium product page](/plugins/authme-premium/)
- [Proxy/backend topology guide](/guides/authme-premium-topologies/)
- [Securing a proxy/backend link](/guides/secure-proxy-backend/)
- [Folia compatibility notes](/guides/folia-compatibility/)
- [Plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/)
