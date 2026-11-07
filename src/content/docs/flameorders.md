---
title: "FlameOrders features and compatibility"
description: "FlameOrders provides server-synchronized orders and deliveries, with storage and network modes. It ships a command and permission table and supports Folia."
plugin: "flameorders"
category: "smp"
updated: 2026-11-07
evidenceNote: "Repository README and manifest, inspected 30 Oct 2026. A legacy DonutOrders descriptor also exists in the tree"
---

FlameOrders lets players place orders and receive deliveries, synchronised across the server. It has storage and network modes, so orders can be kept on one server or shared across a network. The plugin ships a command and permission table and declares Folia support.

## What it does

Players place orders for items, and deliveries are made when the order is filled. The storage mode keeps orders on the local server. The network mode shares them between servers in a network. The product data does not list the commands or the mode switch, so read the config and the command table in the repository before you choose a mode.

## Features

- Synchronised orders and deliveries.
- Storage and network modes.
- Command and permission table.
- Folia support, declared in the repository.

## Compatibility

- Platforms: Bukkit and Spigot.
- Minecraft version: the repository states no version range.
- Java: compile target Java 8. That is a build setting, not runtime guidance.
- Folia: declared in the repository.

The repository tree also contains a legacy DonutOrders descriptor. Use the FlameOrders descriptor for your install, and do not mix the two. Folia support is a declaration, so test an order and a delivery on a Folia copy before you run it live. The [Folia-compatible plugins guide](/guides/folia-compatible-plugins/) explains the claim.

## Choosing a mode

Pick storage mode for a single server. Pick network mode only when every server in the network can reach the same store. Test the mode on a copy of your network before you switch, because orders placed in one mode are not automatically moved to the other.

## Install

Place the jar in `plugins/`, restart and read the console. This is standard practice for Bukkit-family plugins, not a repository step.

## Troubleshooting

- If a delivery does not arrive, check the order status with a test account and read the console for a storage error.
- If orders do not sync across servers in network mode, check that each server uses the same store.
- The [plugin troubleshooting workflow](/guides/plugin-troubleshooting-workflow/) covers isolating a conflict with another economy plugin.

## Related

- [SMP Shards](/docs/smp-shards/) is a currency with a shop.
- [SMP Rewards](/docs/smp-rewards/) adds daily and hourly rewards.
- [Folia-compatible plugins guide](/guides/folia-compatible-plugins/)
