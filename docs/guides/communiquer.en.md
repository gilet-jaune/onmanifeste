---
description: 'Communicating during a protest: Signal with network, Briar without, disappearing messages and good practice.'
source_commit: a7b3a95c19882f9eb40af18aeef9ae5bf8f8fb34
tags:
    - guides
    - communication
---

# Communicating at a protest

!!! abstract "Key points"

    - With a network: **Signal**, with disappearing messages on.
    - Without a network: **Briar**, with at least **one Android user** per group (comms lead).
    - **Install, test and add your contacts before you leave**: nothing can be downloaded on site.
    - Always a **paper plan**: meeting point, fallback time, numbers written down.

On site, the mobile network often saturates, and a phone can be lost or seized. Pick the tool for the situation, and have a no-network plan B.

!!! tip "Where to start?"

    - Choosing an app: [the comparison](#comparison).
    - The network is cut or saturated: [if the Internet or social media are cut](#if-the-internet-or-social-media-are-cut).

## Comparison

| Criterion | {{ res("signal") }} | {{ res("briar") }} | {{ res("meshtastic") }} | {{ res("bitchat") }} |
| --- | --- | --- | --- | --- |
| **Works without Internet** | No: mobile network or Wi-Fi needed | Yes, device to device over Bluetooth or local Wi-Fi[^briar-how] | Yes: the phone connects to the device over **Bluetooth** (or Wi-Fi, USB), then devices talk to each other over **LoRa radio**, without mobile network or Internet[^meshtastic-intro][^meshtastic-bluetooth] | Yes, phone to phone over Bluetooth, relayed up to 7 hops[^bitchat-readme] |
| **Hardware** | Just the phone | Just the phone (Android)[^briar-how] | A LoRa radio device (a few tens of euros), paired with the phone over Bluetooth[^meshtastic-intro] | Just the phone (Android and iPhone)[^bitchat-readme] |
| **Encryption** | End-to-end, with forward secrecy[^signal-docs] | End-to-end, contacts stored on the phone[^briar-how] | Direct messages encrypted; channels encrypted with a shared key. The **default** channel uses a public key: anyone can read it[^meshtastic-encryption] | Private messages encrypted (Noise protocol), but a fixed identifier and the nickname are broadcast **in clear text**[^bitchat-whitepaper] |
| **Advantages** | Simple, widespread, calls and groups, disappearing messages[^eff-signal] | No infrastructure, no phone number to give | Range of several kilometres as a mesh, independent of cell towers[^meshtastic-intro] | No account or number; also works on iPhone[^bitchat-readme] |
| **Use cases** | Coordination before and during the protest while the network holds; affinity groups | Nearby group, network saturated or cut | Teams spread over a large area (stewards, street medics, legal team), network cut | Fallback between Android and iPhone when the network is cut, for non-sensitive information |
| **Drawbacks** | Depends on the mobile network; requires a phone number[^eff-signal] | Short range; Android only; you must add each other as contacts beforehand[^briar-how] | Hardware to buy and set up; short text only; packet headers unencrypted and no forward secrecy[^meshtastic-encryption]; airtime limited by regulation[^meshtastic-lora] | Recent app; anyone picking up Bluetooth can list participants and **track a phone** from place to place[^bitchat-whitepaper] |

!!! tip "Our recommendation without Internet: Briar"

    If the network is cut or saturated, use **Briar**, even if your group is mostly on iPhone: you only need **one Android user per group**, the **comms lead**, who centralises messages and relays them by word of mouth. Briar is end-to-end encrypted and needs no hardware or phone number.[^briar-how] Install Briar **before** the protest: once you are cut off from the mobile network, you can't download it. Keep Bitchat as a fallback: it allows a phone to be tracked.[^bitchat-whitepaper]

## If the Internet or social media are cut

The mobile network can saturate, be jammed or be cut. The government can also seek to block specific platforms: after TikTok was suspended in New Caledonia in May 2024, according to documents published by Blast, the Prime Minister's office wrote on 22 October 2026 to the four main telecom operators asking them to prepare a DNS block on TikTok, Instagram, Snapchat and X; the measure was ultimately not applied.[^blast-coupure-reseaux-2026][^wiki-24-octobre-2026] Have a plan that works **without centralised platforms, or with no network at all**.

- **If only social media are blocked by DNS filtering**: encrypted messengers like {{ res("signal") }} generally keep working, and an account-free VPN ({{ res("mullvad-vpn") }}) or the Tor network ({{ res("orbot") }}, {{ res("tor-browser") }}) bypasses a carrier DNS block.[^blast-coupure-reseaux-2026]
- **Briar or Meshtastic**: see the comparison above, to install and test beforehand if all mobile Internet is cut.
- **PMR446 walkie-talkies**: usable without a licence or subscription across the European Union, a few kilometres of range in town.[^wiki-pmr446] But **nothing is encrypted**: anyone tuned to the same channel hears everything, police included.[^wiki-pmr446] Keep them for non-sensitive instructions ("we're moving", "point B") and agree on the channel beforehand.
- **Texts and calls**: if only mobile data is cut, they may still get through, but they are not encrypted.
- **The paper plan**, which never breaks down:
    - [ ] a fixed **meeting point** away from the route, and a **fallback time**: if you get separated, go there at the agreed time, then at the next one;
    - [ ] **useful numbers written** on paper or on your arm, and the printed [pocket card](../carte/index.md);
    - [ ] an **offline** or paper **map** of the area ([pre-protest checklist](avant-de-partir.md#offline-map)).

## Good practice

- [ ] **Install and test your apps before leaving**, and add your Briar contacts then: if the mobile network is cut or saturated on site, you won't be able to download anything.
- [ ] **Signal**: turn on disappearing messages, **set to a few hours (8 h, or 3 h as a custom time), a few hours before the protest**, at the peak of organising, then as short as you can manage, and screen lock; create separate groups per purpose ([Signal groups: organising while limiting leaks](groupes-signal.md)).[^eff-signal]
- [ ] **Meshtastic**: create a **private channel with its own key** and share it only with your team; don't use the default channel for anything sensitive.[^meshtastic-encryption]
- [ ] **Meshtastic**: change the **Bluetooth pairing PIN**; on devices without a screen it defaults to **123456**, so anyone nearby could connect.[^meshtastic-bluetooth]
- [ ] **Meshtastic**: set the region to **EU_868**; in France this band is licence-free, with limited airtime.[^meshtastic-lora]
- [ ] **Briar**: add each other as contacts **before** the protest, while you are together.
- [ ] **Briar**: Briar is Android-only. If your group has iPhones, pick at least one Android user as **comms lead**: the comms leads of the different groups stay in touch on Briar and relay news to their group by word of mouth.[^briar-how]
- [ ] For all: agree on a **meeting point** in case nothing gets through ([never stay alone](ne-pas-rester-seul.md)).

[:octicons-arrow-right-24: Communication tools in the directory](../annuaire/index.md?category=communication)

## Sources

Each note links to the source of the information. Most sources are in French. Laws change: check the date of the source and, if in doubt, ask a lawyer.
