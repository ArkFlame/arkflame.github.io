---
title: "Minecraft chat filter plugin: regex rules and setup"
description: "Set up a Minecraft chat filter with ChatSentinel: regex rules, blacklist and whitelist sets, Bukkit, BungeeCord and Velocity entry points, and a test plan."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["chatsentinel", "chatsentinel-premium", "smp-punishments", "discordflow"]
topics: ["chat", "filter", "regex", "moderation"]
---

A chat filter stops swearing and spam from reaching other players. ChatSentinel does this with regex rules. It runs on Bukkit, BungeeCord and Velocity, and it uses blacklist and whitelist rule sets plus a message configuration. This guide covers how to set it up, how to write rules you can test, and what the plugin does not do.

If you want the wider picture of advertising, flood and spam control, read the [stop chat spam and advertising guide](/guides/stop-chat-spam-and-advertising/) first. This guide focuses on the filter itself.

## What ChatSentinel checks

ChatSentinel applies regular expressions to chat. The repository describes two rule sets, a blacklist and a whitelist, and a message configuration that controls the text players see. The product data does not say exactly how a whitelist entry overrides a blacklist match, so test that behaviour on a test server before you depend on it.

The plugin declares fourteen permissions. The product data does not list them by name, so read the permission list in the plugin files before you give staff access.

## Choose the right entry point

The plugin ships for three platforms. Pick the module that matches each server:

- Bukkit or Spigot for a single server.
- BungeeCord or Velocity for a proxy, when you want one filter across a network.

If your network has a proxy and several backends, decide where the filter runs before you install it. As general practice, keep the rules in one place so you can change them once and know which copy is live.

The Bukkit module declares an api-version of 1.13 and Folia support in its manifest. The repository does not state a game-version range for the plugin, so treat the 1.13 value as an API level, not a promise about every Minecraft version.

## Write a rule you can test

A careless regex can flag ordinary words. Write rules in small steps:

1. Start with a short blacklist of the words you actually see in your chat. Do not copy a long list from the internet.
2. Test each pattern against a set of sample messages. Include messages that should pass, such as a harmless word that contains a banned fragment.
3. Add a whitelist entry only when a real message is blocked wrongly. Record the message that caused the change.
4. Reload the rules, then send a test message from a test account to confirm the result.

A common mistake is a pattern that matches inside other words. Read each new pattern against the sample set before you publish it. The [FairPlay false positives guide](/guides/fairplay-false-positives/) describes a similar method for a different plugin: inspect the result, trace it to its cause, then change one thing.

## Staff alerts and punishments

ChatSentinel filters messages. It does not replace a punishment system. If a player keeps trying to send blocked messages, pass the case to a punishment plugin. [SMP Punishments](/plugins/smp-punishments/) covers bans, kicks, mutes and warnings, and the [SMP moderation setup guide](/guides/smp-moderation-and-punishments-setup/) explains the order to set them up in.

If you sync chat to Discord, test the staff path on its own. The [Discord role and chat sync guide](/guides/discord-role-and-chat-sync-setup/) covers DiscordFlow. The repository does not document how DiscordFlow and a chat filter interact, so check that on your server before you rely on it.

## Test plan

Run this before you open the filter to players:

1. Install ChatSentinel on a test server and confirm the console shows no rule errors.
2. Send one message that should pass and one that should be blocked, from two test accounts.
3. Test a message that contains a banned fragment inside a harmless word.
4. Check the staff alert path if you use one.
5. Restart the server and send the same messages again.

## Frequently asked questions

### Does ChatSentinel block spam as well as swearing?

Its description covers both through regex rules. Write separate rules for each, and test each one with sample messages before you publish it.

### Should I run ChatSentinel on the proxy or on each backend?

Pick one place for the rules so you know which copy is live. Test the setup you choose before you open the server.

### Can a whitelist stop a false positive?

It is meant to. Add a whitelist entry only after a real message is blocked wrongly, and record the message that caused the change. Confirm the override works on a test server.

### Does ChatSentinel punish players?

Its listed features are filtering and messages. For mutes, bans and warnings, use a punishment plugin such as SMP Punishments.
