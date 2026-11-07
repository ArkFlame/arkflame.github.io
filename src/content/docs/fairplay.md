---
title: "FairPlay quick start"
description: "Combat anticheat that applies mitigation against flagged players, with built-in checks and optional GrimAC or Vulcan flag hooks."
plugin: "fairplay"
category: "security"
updated: 2026-10-30
---

FairPlay is a combat anticheat. Detection feeds mitigation, such as synthetic hit opportunities for a clean player against a flagged target. It also ships conventional check modules for aimbot, autoclicker, autototem, fastbreak, hitbox, killaura, scaffold, and timer.

## Requirements

- A Bukkit, Spigot, or Paper server. `plugin.yml` resolves `api-version` to `1.13` and `folia-supported` to `true`.
- **PacketEvents installed.** `plugin.yml` declares `depend: [packetevents]`. Startup will not proceed without it.
- Optional integrations declared as soft dependencies: LuckPerms, Geyser-Spigot, floodgate, GrimAC, Vulcan, NoCheatPlus, PolarLoader, Intave, Matrix, Spartan. It loads without GrimAC or Vulcan. Missing hooks are expected.
- Minecraft 1.8–1.21, with a Java 8 build target.
- Java 8 is the compiler source and target. The repo documents no runtime Java requirement beyond that.

## Install

No numbered install guide ships in the repo. What the source documents:

1. Build the reactor from the parent POM. Modules are `models`, `fairplay-api`, and `fairplay`.
2. Run `./build.sh`. It refuses to build without the real bundled model files. A failure reads `ERROR: Missing/empty bundled FairPlay model: <path>`. Recover them with `FAIRPLAY_MODELS_SOURCE_JAR=/path/to/FairPlay.jar ./build.sh` or `FAIRPLAY_MODELS_SOURCE_DIR=/path/to/plugins/FairPlay/models ./build.sh`.
3. Install only the FairPlay plugin jar in `plugins/`. Do not install the API jar as a plugin or shade its classes.
4. The first start writes `config.yml` into the plugin data folder. Training window output goes to `plugins/FairPlay/windows/global/<player>/<UTC-date-and-session>.json`.

## Configure

No YAML is bundled. The config is generated from annotated Java classes, and defaults come from field initializers. A missing path logs `[FairPlay] Missing config value for path '…'`.

```yaml
bedrock-check: true
show-cancel-messages: false
auto-update-models: true
player-logs-enabled: true
cancel-message-cooldown-ms: 60000
```

`machine-learning-training` only affects training error costs, not runtime detection. The deprecated `confirmation` and `client-tick-sync` blocks remain for compatibility with older configs.

## Commands

Root is `/fairplay`, aliases `/fp` and `/anticheat`.

| Command | Purpose |
| --- | --- |
| `/fp checks <enable\|disable\|toggle> <check\|category>` | Toggle checks |
| `/fp alerts <enable\|disable\|toggle\|inspect\|clear> [player]` | Alert subscriptions |
| `/fp punishments <list\|add\|remove\|clear> [value]` | Punishment rules |
| `/fp toggle <check\|category>` | Toggle a check or category |
| `/fp kick <enable\|disable\|toggle>` | Kick behavior |
| `/fp damagecancel <enable\|disable\|toggle>` | Damage cancellation |
| `/fp blockcancel <enable\|disable\|toggle>` | Block cancellation |
| `/fp ml <aim\|click>` | ML inspection |
| `/fp latency <player> <seconds 1..120>` | Latency handling |
| `/fp banwave run` | Run a ban wave |
| `/fp ml aim window record GLOBAL` | Start global AIM window recording |
| `/fp ml aim window stop` / `status` | Stop recording / inspect completion |

The global window commands require `fairplay.command.ml.global`, default operator.

## Permissions

Every node is declared with default `op`, except the exemptions: `fairplay.admin`, `fairplay.train`, `fairplay.check`, `fairplay.notify`, `fairplay.command.ml`, `fairplay.command.ml.global`, `fairplay.command.damagecancel`, `fairplay.command.blockcancel`, `fairplay.command.latency`, `fairplay.command.rotations`, and `fairplay.command.banwave`. The exemptions are `fairplay.exempt`, `fairplay.nosetback`, and `fairplay.nomodifypacket`, all default `false`.

`fairplay.command` appears in the README and as a child of several nodes. It has no standalone declaration or default in `plugin.yml`. Grant it explicitly if needed.

## Troubleshooting

| Symptom | Cause and diagnostic |
| --- | --- |
| No GrimAC or Vulcan detection | Expected when neither plugin is installed. FairPlay still loads. |
| Missing config warning | `[FairPlay] Missing config value for path '…'`. The generated config lacks that key. |
| Build stops on models | `Missing/empty bundled FairPlay model`. Restore the trained `.nn` assets. Do not substitute blank artifacts. |
| Reach diagnostics look ambiguous | `reach-increase applied`, `range`, `aim`, `visibility_*`, and `candidate` do not prove a hit. Only `reach-increase damage-applied` confirms a `MONITOR`-confirmed applied hit. |


## Related

- [FairPlay product page](/plugins/fairplay/)
- [FairPlay false positives](/guides/fairplay-false-positives/)
- [ExploitFixer quick start](/docs/exploitfixer/)
- [SMP punishments](/docs/smp-punishments/)
- [Plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/)
