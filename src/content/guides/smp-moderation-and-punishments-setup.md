---
title: "SMP moderation setup: punishments, staff mode and chat"
description: "Set up SMP moderation with SMP Punishments, StaffModeX and ChatSentinel: bans, mutes, warnings, staff tools and chat filters, in a safe order."
updated: 2026-11-07
author: "LinsaFTW"
relatedPlugins: ["smp-punishments", "staffmodex", "chatsentinel", "fairplay"]
topics: ["moderation", "punishments", "staff", "smp"]
---

Set moderation up in layers. Punishments come first, then staff tools, then chat filters, then anticheat alerts. SMP Punishments covers bans, kicks, mutes and warnings. StaffModeX gives staff their inventories and tools. ChatSentinel filters chat. Each layer needs its own permissions, and each one needs a test before players see it.

## Start with SMP Punishments

SMP Punishments covers bans, kicks, mutes and warnings. It has an optional voice-chat mute hook. The suite has twenty-five commands and thirty-eight permissions. Give staff the permissions by rank, not by name, so you can change a rank without editing each player.

Test each command with a test account before you give staff access. Check that a warning is recorded, a mute blocks chat, and a ban stops a login. A punishment that does not do what the command says is the most damaging bug a moderation plugin can have.

## Add staff mode

StaffModeX provides staff-mode inventories, moderation tools and optional BungeeCord or Velocity modules. Its commands, permissions and configuration are documented in the repository. Install the proxy module only on a network that uses a proxy. On a single server, the Bukkit module is enough.

Keep staff mode separate from player permissions. Test entering and leaving staff mode with a test account before you give it to staff.

## Filter chat

ChatSentinel filters messages. It runs regex rules on Bukkit, BungeeCord and Velocity. It does not punish anyone, so pair it with SMP Punishments. Set the `punishments` section to the console commands your punishment plugin runs. The [chat spam guide](/guides/stop-chat-spam-and-advertising/) covers the blacklists and alert setup in order.

Check the alert channel before you launch. An offense that produces no alert is an offense staff never see.

## Add anticheat alerts

[FairPlay](/plugins/fairplay/) is the combat anticheat. It has permission-scoped alerts, punishments and ban waves. Keep it in alert mode for the first week, and point its alerts at staff who review them. Turn on punishments only after the alerts match what you saw in play.

## Order of work

1. Install SMP Punishments and test every command with a test account.
2. Set the staff ranks and permissions.
3. Install StaffModeX and test staff-mode entry and exit.
4. Configure ChatSentinel with punishment commands and an alert channel.
5. Install FairPlay in alert mode.
6. Review alerts for a week before you enable punishments.

## Who should see what

Give each rank only the moderation commands it needs. Junior staff need warnings and mutes. Senior staff need bans. Use the permission system to split them, and test each split with a test account on each rank.

Decide where staff look up past punishments before you launch. Test the lookup with a punishment issued from a second staff account, so you know the record is readable by the people who need it.

## Test the whole chain

Run one full scenario with a test account. Post an advertisement in chat, get the offense recorded, get the mute applied and check that staff saw the alert. A chain that works only in parts is not ready.

## Common mistakes

Do not enable punishments before you test them. Do not give every staff member the ban command on day one. Do not set chat filters so strict that normal conversation fails. Each of these is easy to avoid and hard to undo after players react.

## Folia

SMP Punishments declares Folia support in its repository. StaffModeX also declares it. ChatSentinel's Bukkit module declares the Folia flag as an API-level claim. Verify each one on your Folia build. The [Folia compatibility guide](/guides/folia-compatibility/) explains what each flag covers.

## Frequently asked questions

### Does ChatSentinel ban players?

No. It runs the console commands you list under `punishments`. Use SMP Punishments or another punishment plugin for bans and mutes.

### Do I need the proxy module for StaffModeX?

Only if your network uses a BungeeCord or Velocity proxy and you want proxy awareness.

### Should FairPlay punish players on day one?

No. Run it in alert mode for about a week, then turn on punishments.

### How do I test a punishment safely?

Use a test account. Confirm that a mute blocks chat and a ban stops a login, then remove the punishment and confirm the account is back to normal.
