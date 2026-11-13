---
description: 'Signal groups to organise while limiting leaks: public group, airlock group, trusted group. Overview.'
source_commit: b5d7c1f44c885a465a2e7e5810655b77bc8ee2e2
review: juridique
review_status: pending
tags:
    - guides
    - organising
    - phone
    - flowchart
---

# Signal groups: organising while limiting leaks

!!! abstract "Key points"

    - **Public** announcement group → **airlock group** to meet in person (suggested by anyone, announced by a secretary) → vetted **trusted group** → team **sub-groups**.
    - **Open door**, with no voucher: airlock → "cleaned" airlock → acting together → vouchers → HR second check → trusted group (see [watching them act](signal-valider.md#open-door-recruitment-watching-them-act)).
    - **By co-option**: a vetted member proposes someone they already know, meeting with a secretary, that member is the voucher, then HR's second check (see [co-option](signal-valider.md#recruiting-by-co-option-a-vetted-member-proposes)).
    - **Graduated trust**: a **vetted secretary**, **one voucher** and a **second check by HR** for the trusted group; **two vouchers** for a sensitive sub-group. Never through a group link or QR code, **except for the public group** (announcements, nothing sensitive): people are added **by username**, from a private conversation.
    - **No vetting stops a determined leak**: write nothing you wouldn't want read out in police custody.
    - Before joining: a short **activist name**, also used in person; number hidden from **everyone**; **disappearing** messages, in every group from its creation.
    - Someone gets taken away: **remove them from all their groups straight away**, as a precaution.
    - Compromised group: if you **know where the leak is**, remove it and the group carries on; if not, **move out** and re-invite people **one by one**.

An encrypted messenger like {{ res("signal") }} protects your messages in transit, not against someone inside the group or a seized phone. How you organise your groups, however, can limit what a leak or a seizure reveals.

!!! info "Where to start?"

    - **Someone has just been arrested, or a group is compromised** → [compromised group](signal-groupe-compromis.md).
    - **You are discovering or joining groups** → [the groups](groupes-signal.md#the-groups), [join or suggest an airlock group](signal-recrutement.md#proposing-a-date-time-and-place), then [as a member](signal-membres.md).
    - **You have a role in the Signal groups** (member, recruiter, secretary, HR, keyholder, liaison, moderation, "lost group" lead) → the [menu by role](groupes-signal.md#find-what-concerns-your-role) below, or the [organising roles table](groupes-signal.md#roles-for-organising-the-signal-groups) with links to every instruction.
    - **You are looking for a role at a protest or from afar** (medic, legal, field watch, logistics...) → [roles in a mobilisation](roles.md).
    - **You just want the charter** → [copy-paste templates](signal-modeles.md).

## Find what concerns your role

Pick your role (new member, member, recruiter, secretary, HR, keyholder, liaison, moderation or "lost group" lead), then what you want to do: the menu takes you straight to the right instruction (see also the [summary table of roles](groupes-signal.md#roles-for-organising-the-signal-groups)). Works **offline**.

{% import "overrides/partials/parcours-tree.html" as pt with context %}

<div class="parcours" data-parcours data-embed data-up="../../" data-src="parcours-signal.json" data-key="parcours_signal" data-type-iam="Type a few words">
    <noscript><p>JavaScript is disabled: here are all the paths.</p></noscript>
    {{ pt.tree('en', parcours_signal, none, none, '../../', 3) }}
</div>

## Before you start

!!! warning "Encrypting is legal, but it can be turned against you"

    Using Signal is not an offence. In the so-called "8 December" case, the DGSI describes the defendants as having adopted "clandestine behaviour" with encrypted applications, Tails and Tor, and that wording recurs very often in the file, according to La Quadrature du Net, which analysed it before the trial.[^lqdn-8-decembre] The seven defendants were convicted in December 2023 of terrorist criminal association.[^politis-8-decembre] Neither source says encryption was judged to be an offence: it is cited as an **indicator**. This is a serious case and very far from an ordinary demonstration, but it shows you can be read back: **write nothing you would not want quoted**, and do not count on encryption to protect you from a hostile reading.

!!! warning "Assume someone is reading"

    An in-person meeting keeps out the curious, trolls and the far right, not a well-prepared undercover officer or someone who talks after police custody. Written messages are evidence: knowingly taking part in a group that **prepares** violence or damage is punishable by one year in prison and a €15,000 fine, even if nothing happened.[^cp-222-14-2] In the groups: **logistics, mutual aid, public information**. Everything else is not written down.

!!! tip "This guide is public: adapt it"

    The police can read it too, and that is not a problem: your security does not rest on keeping the method secret, but on what is written nowhere here (who is in which group, your IDs, the register, meeting places, who your HR and keyholders are). **Change the role names, labels and group naming scheme** rather than copying the guide's: on a seized phone, they won't immediately point to your key people.

## The groups

<div class="flow flow--funnel" markdown>

1. **Public group** (one per city) → people join through the **public group's link** (the one exception: it holds nothing sensitive) or are added directly by a secretary or a recruiter; only admins (keyholders and secretaries) post: announcements, date, declared location, links to the guides.
    - **To move on to an airlock group**: set up [your settings](signal-membres.md#your-settings), make yourself known to a recruiter, write privately to a secretary (by username) to be added to an [airlock group](signal-recrutement.md#the-airlock-group) announced in the public group with its date and time of day, or [suggest one](signal-recrutement.md#proposing-a-date-time-and-place).
2. **Airlock group** (temporary) → suggested by **any member of the public group**, created and [announced by a secretary](signal-recrutement.md#proposing-a-date-time-and-place), for **[one in-person meeting](signal-recrutement.md#the-in-person-meeting-step-by-step)**, then, if needed, a rendezvous at an action organised by others; only the time and place are written there, and it stays open while people await a decision.
    - **To move on to the trusted group**: [an in-person meeting](signal-recrutement.md#the-in-person-meeting-step-by-step) with a secretary (settings, QR code scanned, [checks](signal-recrutement.md#what-to-check-at-the-meeting)), {{ default("actions") }} where vetted members watch you, **one voucher**, then HR's second check, who add you to the trusted group **by username**, from the airlock (see [watching them act](signal-valider.md#open-door-recruitment-watching-them-act)).
3. **Trusted group** (vetted, `MVT-CTY-4K9-General`) → logistics, mutual aid, public information; [nothing illegal](signal-membres.md#in-the-groups).
    - **To move on to a sub-group**: a real need in the team, a period in the trusted group, and **two vouchers** if the sub-group is sensitive; the sub-group's keyholder adds them.
4. **Sub-groups by topic**, in the same family (same ID) → each only sees what concerns its team:
    - `4K9-Medic`
    - `4K9-Legal`
    - `4K9-Logistics`

</div>

The **trusted group and its sub-groups** are the **vetted groups**, and a **family** sharing the same ID (see [naming groups](signal-creer.md#naming-groups)). A malicious person who gets into one sub-group does not see the others. Next to the funnel, the [temporary group](signal-gerer.md#the-temporary-group), for an action day or a mobilisation, leads nowhere: it is disposable.

**Two ways into the trusted group**: the [**open path**](signal-valider.md#open-door-recruitment-watching-them-act) (public group, airlock, meeting in action, vouchers, HR's second check) and [**co-option**](signal-valider.md#recruiting-by-co-option-a-vetted-member-proposes) (a vetted member proposes someone they know, often the same day). See [the two ways in](signal-valider.md#two-ways-into-the-trusted-group): diagram, table and detail of each route.

## The roles

Nobody holds every role, and roles **rotate**. And **no group brings together every key person** (see [coordinating](signal-gerer.md#coordinating)). To filter by your role and what you need: [Find what concerns your role](groupes-signal.md#find-what-concerns-your-role).

<a id="organisation-roles"></a>

### Roles for organising the Signal groups

These roles keep the Signal network running (recruitment, onboarding, moderation, security):

| Role | What they do | What they don't do | Admin in Signal | Find out more |
| --- | --- | --- | --- | --- |
| **Recruiter** | Talks about the movement at protests, on roundabouts, at public meetings; points people to the public group and the airlock groups | Validate; vouch for their own recruits; write anything down about them | No | [Recruiters and secretaries](signal-recrutement.md#recruiters-and-secretaries) · [Propose a date and place](signal-recrutement.md#proposing-a-date-time-and-place) · [Your settings](signal-membres.md#your-settings) |
| **Secretary** (already-vetted member) | **Coordinates the meeting end to end**: announces the airlock group in the public group, comes to it, helps everyone set up Signal; **validates** once the conditions are met; cleans the airlock group and adds HR to it; stays the newcomers' contact | Validate without a voucher; **add anyone to the trusted group** (HR do the adding); keep an attendance list | Of the airlock group they run, and of the public group to announce meetings there | [Secretary path (diagram)](signal-recrutement.md#secretary-path) · [Propose a date and place](signal-recrutement.md#proposing-a-date-time-and-place) · [In-person meeting](signal-recrutement.md#the-in-person-meeting-step-by-step) · [What to check](signal-recrutement.md#what-to-check-at-the-meeting) · [Clean up the airlock](signal-recrutement.md#cleaning-up-the-airlock-group-after-the-meeting) · [Validate](signal-valider.md#validating-graduated-trust) |
| **HR** ("human resources") | Like at work: do the **second check** on validated people and **add** them to the trusted group; receive doubts; decide on removals in pairs ({{ default("decision_delay") }} after a [preventive pause](signal-groupe-compromis.md#preventive-pause-when-in-doubt)); settle cases when a secretary hesitates | Run airlock groups; decide a removal alone; be keyholders of every group | Yes, of the trusted group | [HR path (diagram)](signal-recrutement.md#hr-path) · [Validate](signal-valider.md#validating-graduated-trust) · [Preventive pause](signal-groupe-compromis.md#preventive-pause-when-in-doubt) · [Precautionary removal](signal-groupe-compromis.md#precautionary-removal) · [Compromised group](signal-groupe-compromis.md) |
| **Keyholder** | Holds a group's keys: **watches over its configuration** (message timer, permissions, no link except for the public group), adds and removes; **keeps an eye out** for unusual arrivals and interactions and reports them to HR. HR are keyholders of the trusted group | Add someone who hasn't been validated; go to an action with their keyholder phone | Yes, at least two per group | [Naming and register](signal-creer.md#naming-groups) · [Set up groups](signal-creer.md#setting-up-the-groups) · [Create or split](signal-creer.md#when-to-create-or-split-a-group) · [Role labels](signal-gerer.md#role-labels) · [Close a group](signal-gerer.md#closing-a-group) · [Compromised group](signal-groupe-compromis.md) |
| **Liaison agent** | Passes on a place, a time or a decision between families in a dedicated liaison group | Belong to two families; be HR or a keyholder; pass on a member list or identities | No (2 keyholders from different families) | [Linking several families](signal-gerer.md#linking-several-families) · [Set up groups](signal-creer.md#setting-up-the-groups) |
| **Moderation** | Reminds people of the [charter](signal-modeles.en.md#full-charter), deals with issues privately | Accuse anyone in the group | No | [Full charter](signal-modeles.en.md#full-charter) · [In the groups](signal-membres.md#in-the-groups) · [Preventive pause](signal-groupe-compromis.md#preventive-pause-when-in-doubt) |
| **"Lost group" lead** | Triggers the [compromised-group procedure](signal-groupe-compromis.md), alerts the [local legal team](../annuaire/index.md?tags=antirepression) | Discuss an arrest in writing | Depends on the group | [What to do?](signal-groupe-compromis.md#what-to-do) · [Precautionary removal](signal-groupe-compromis.md#precautionary-removal) · [Case A](signal-groupe-compromis.md#case-a-you-know-where-the-leak-is) · [Case B: move out](signal-groupe-compromis.md#case-b-you-dont-know-move-out) |

<a id="protest-roles"></a>

### Roles useful at protests

The roles played at protests (`Medic`, `Legal`, `Veille`, protection and de-escalation, documentation…) are described in [Roles in a mobilisation](roles.md), with what each does, what they don't do, and whether it is played on the ground or remotely. Each relies on a Signal sub-group of the same name.

### Key vocabulary and concepts

- **Voucher**: a vetted member who really knows a new person (outside the airlock group: friend, colleague, neighbour, or seen in action at several protests) and vouches for them, privately, to the secretary ([validating trust](signal-valider.md#validating-graduated-trust), [watching them act](signal-valider.md#open-door-recruitment-watching-them-act), [co-option](signal-valider.md#recruiting-by-co-option-a-vetted-member-proposes)).
- **Activist name**: the pseudonym used on Signal and in person ([choosing your activist name](signal-membres.md#your-activist-name)).
- **Register**: the list, kept by two or three people outside the groups, of active and lost groups and of who is in which group ([naming groups and keeping the register](signal-creer.md#naming-groups)).
- **Fallback point**: a regular place and time, agreed in person, to meet up if the groups go down ([if the group disappears](signal-membres.md#if-the-group-disappears-or-you-are-removed)).
- **Precautionary removal**: removing someone from their groups as a precaution, for example when they are arrested ([precautionary removal](signal-groupe-compromis.md#precautionary-removal)).
- **Leak**: the person or phone through which an outsider gets into a group ([when is a group compromised?](signal-groupe-compromis.md#when-is-a-group-compromised)).

## In this guide

- [As a member](signal-membres.md)
- [Recruiting and meeting](signal-recrutement.md)
- [Vetting](signal-valider.md)
- [Creating and configuring groups](signal-creer.md)
- [Running the groups](signal-gerer.md)
- [Compromised group](signal-groupe-compromis.md)
- [Copy-paste templates](signal-modeles.md)
- [Memo sheets to print](../fiches/signal.md)

## When Signal is not enough

- **No network**: {{ res("briar") }} works over Bluetooth or local wifi, without a phone number ([communicating at a protest](communiquer.md#comparison)).[^briar-how]
- **No phone number**: {{ res("element") }} (Matrix) works with a simple account ID and suits large spaces organised into rooms.
- **Shared documents**: {{ res("cryptpad") }}, encrypted, no account required.
- **The most sensitive matters**: in person, without phones (left in another room, or switched off and kept away).

[:octicons-arrow-right-24: Organising a protest](organiser.md) · [:octicons-arrow-right-24: Communicating at a protest](communiquer.md) · [:octicons-arrow-right-24: Phone](telephone.md)

[Next : As a member :octicons-arrow-right-24:](signal-membres.md)

## Sources

Each note links to the source of the information. Most sources are in French. Laws change: check the date of the source and, if in doubt, ask a lawyer.
