---
source_commit: 649b105eb62d7cee82e30c4e3b6a4722ed2c7c49
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
    - **Graduated trust**: a **vetted secretary**, **one voucher** and a **second check by HR** for the trusted group; **two vouchers** for a sensitive sub-group. Never through a group link or QR code, **except for the public group** (announcements, nothing sensitive): people are added **by username**, from a private conversation.
    - **No vetting stops a determined leak**: write nothing you wouldn't want read out in police custody.
    - Before joining: a short **activist name**, also used in person; number hidden from **everyone**; **disappearing** messages, in every group from its creation.
    - Someone gets taken away: **remove them from all their groups straight away**, as a precaution.
    - Compromised group: if you **know where the leak is**, remove it and the group carries on; if not, **move out** and re-invite people **one by one**.

An encrypted messenger like {{ res("signal") }} protects your messages in transit, not against someone inside the group or a seized phone. How you organise your groups, however, can limit what a leak or a seizure reveals.

!!! warning "Encrypting is legal, but it can be turned against you"

    Using Signal is not an offence. In the so-called "8 December" case, the DGSI describes the defendants as having adopted "clandestine behaviour" with encrypted applications, Tails and Tor, and that wording recurs very often in the file, according to La Quadrature du Net, which analysed it before the trial.[^lqdn-8-decembre] The seven defendants were convicted in December 2023 of terrorist criminal association.[^politis-8-decembre] Neither source says encryption was judged to be an offence: it is cited as an **indicator**. This is a serious case and very far from an ordinary demonstration, but it shows you can be read back: **write nothing you would not want quoted**, and do not count on encryption to protect you from a hostile reading.

!!! info "Where to start?"

    - **You are joining groups** → [the groups](groupes-signal.md#the-groups), then [as a member](signal-membres.md).
    - **You are looking for a role at a protest** (medic, legal, logistics...) → [roles useful at protests](groupes-signal.md#roles-useful-at-protests).
    - **You organise** (secretary, HR, keyholder) → [the groups](groupes-signal.md#the-groups), [organisation roles](groupes-signal.md#roles-for-organising-the-signal-groups), then [recruiting and vetting](signal-recrutement.md) and [running the groups](signal-gerer.md).
    - **Someone has just been arrested, or a group is compromised** → [compromised group](signal-groupe-compromis.md).
    - **You organise and want to go straight to your role** (secretary, HR, keyholder, recruiter) → the [menu by role](groupes-signal.md#find-what-concerns-your-role).
    - **You just want the charter** → [copy-paste templates](signal-modeles.md).

!!! warning "Assume someone is reading"

    An in-person meeting keeps out the curious, trolls and the far right, not a well-prepared undercover officer or someone who talks after police custody. Written messages are evidence: knowingly taking part in a group that **prepares** violence or damage is punishable by one year in prison and a €15,000 fine, even if nothing happened.[^cp-222-14-2] In the groups: **logistics, mutual aid, public information**. Everything else is not written down.

!!! tip "This guide is public: adapt it"

    The police can read it too, and that is not a problem: your security does not rest on keeping the method secret, but on what is written nowhere here (who is in which group, your IDs, the register, meeting places, who your HR and keyholders are). **Change the role names, labels and group naming scheme** rather than copying the guide's: on a seized phone, they won't immediately point to your key people.

## Find what concerns your role

Do you organise groups? Say what your role is (secretary, HR, keyholder, recruiter), then what you want to do: the menu takes you straight to the right part of this guide. Works **offline**.

{% import "overrides/partials/parcours-tree.html" as pt with context %}

<div class="parcours" data-parcours data-embed data-up="../../" data-src="parcours-signal.json" data-key="parcours_signal" data-type-iam="Type a few words">
    <noscript><p>JavaScript is disabled: here are all the paths.</p></noscript>
    {{ pt.tree('en', parcours_signal, none, none, '../../', 3) }}
</div>

## The groups

<div class="flow flow--funnel" markdown>

1. **Public group** (one per city) → people join through the **public group's link** (the one exception: it holds nothing sensitive) or are added directly by a secretary or a recruiter; only admins (keyholders and secretaries) post: announcements, date, declared location, links to the guides.
    - **To move on to an airlock group**: set up your settings, make yourself known to a recruiter, write privately to a secretary (by username) to be added to an airlock group announced in the public group with its date and time of day, or suggest one.
2. **Airlock group** (temporary) → suggested by **any member of the public group**, created and announced by a secretary, to organise **one** in-person meeting; only the time and place are written there.
    - **To move on to the trusted group**: an in-person meeting with a secretary (settings, QR code scanned), **one voucher**, then HR's second check, who add you to the trusted group **by username**, from the cleaned airlock group.
3. **Trusted group** (vetted, `MVT-CTY-4K9-General`) → logistics, mutual aid, public information; nothing illegal.
    - **To move on to a sub-group**: a real need in the team, a period in the trusted group, and **two vouchers** if the sub-group is sensitive; the sub-group's keyholder adds them.
4. **Sub-groups by topic**, in the same family (same ID) → each only sees what concerns its team:
    - `4K9-Medic`
    - `4K9-Legal`
    - `4K9-Logistics`

</div>

The **trusted group and its sub-groups** are the **vetted groups**, and a **family** sharing the same ID (see [naming groups](signal-gerer.md#naming-groups)). A malicious person who gets into one sub-group does not see the others. Next to the funnel, the [temporary group](signal-gerer.md#the-temporary-group), for an action day or a mobilisation, leads nowhere: it is disposable.

**Two ways into the trusted group:**

=== "Diagram"

    <div class="grid" markdown>

    <div class="flow" markdown>

    **The open path**

    1. **Public group**
    2. **Airlock group** and a meeting with a secretary
    3. **A voucher** comes forward
    4. **HR's second check**
    5. **Trusted group**

    </div>

    <div class="flow" markdown>

    **Co-option**

    1. **A vetted member proposes** someone they know
    2. **Meeting with a secretary**, one-to-one or on the spot
    3. **The proposing member is the voucher**
    4. **HR's second check**
    5. **Trusted group**

    </div>

    </div>

=== "Table"

    | Way in | **The open path** | **Co-option** |
    | --- | --- | --- |
    | **For whom** | Someone nobody knows yet | Someone a vetted member already knows (friend, colleague, union, seen in action at several actions) |
    | **Through** | The public group, then an airlock group and a meeting | The vetted member **proposes** them directly to a secretary, without the public group or an airlock group |
    | **Meeting** | In the airlock group, with the secretary | One-to-one, or on the spot during an action |
    | **Voucher** | To be found: someone who knows them, or several actions together | The member who proposed them |
    | **Adding** | By HR, from the cleaned airlock group | By HR, **by username**, from a private conversation (no link) |
    | **Time** | A few days to a few weeks | The same day or the next |

In both cases, the same checks: QR code scanned, settings done, a voucher and HR's second check (see [validating](signal-recrutement.md#validating-graduated-trust)).

## The roles

Nobody holds every role, and roles **rotate**. And **no group brings together every key person** (see [coordinating](signal-gerer.md#coordinating)).

<a id="organisation-roles"></a>

### Roles for organising the Signal groups

These roles keep the Signal network running (recruitment, onboarding, moderation, security):

| Role | What they do | What they don't do | Admin in Signal |
| --- | --- | --- | --- |
| **Recruiter** | Talks about the movement at protests, on roundabouts, at public meetings; points people to the public group and the airlock groups | Validate; vouch for their own recruits; write anything down about them | No |
| **Secretary** (already-vetted member) | **Coordinates the meeting end to end**: announces the airlock group in the public group, comes to it, helps everyone set up Signal; **validates** once the conditions are met; cleans the airlock group and adds HR to it; stays the newcomers' contact | Validate without a voucher; **add anyone to the trusted group** (HR do the adding); keep an attendance list | Of the airlock group they run, and of the public group to announce meetings there |
| **HR** ("human resources") | Like at work: do the **second check** on validated people and **add** them to the trusted group; receive doubts; decide on removals in pairs; settle cases when a secretary hesitates | Run airlock groups; decide a removal alone; be keyholders of every group | Yes, of the trusted group |
| **Keyholder** | Holds a group's keys: **watches over its configuration** (message timer, permissions, no link except for the public group), adds and removes; **keeps an eye out** for unusual arrivals and interactions and reports them to HR. HR are keyholders of the trusted group | Add someone who hasn't been validated; go to an action with their keyholder phone | Yes, at least two per group |
| **Moderation** | Reminds people of the charter, deals with issues privately | Accuse anyone in the group | No |
| **"Lost group" lead** | Triggers the [compromised-group procedure](signal-groupe-compromis.md), alerts the [local legal team](../annuaire/index.md?tags=antirepression) | Discuss an arrest in writing | Depends on the group |

<a id="protest-roles"></a>

### Roles useful at protests

These protest roles operate during protests according to your needs. They are shared out **among the members already there**, according to each person's skills and availability, and can change from one action to the next: you don't recruit for a role. Each relies on a sub-group (`Medic`, `Legal`…) and on a guide on this site:

| Role | What they do | What they don't do | Learn more |
| --- | --- | --- | --- |
| **Medic** | First aid: gas, injuries, fainting | Medical procedures (stitching, removing fragments); giving medication | [First aid](premiers-secours.md) |
| **Legal** | Observes arrests, lawyer contacts, follows up people arrested | Replace a lawyer | [Police custody](garde-a-vue.md) |
| **Protection and de-escalation** | Spots tension, talks, helps people out of a kettle, accompanies vulnerable people | Carry anything that could pass for a weapon; respond to provocation | [Dispersal, warnings and kettling](dispersion.md) · [Kit and what to wear](kit-manif.md) |
| **Documentation** | Films arrests and violence, keeps the evidence | Publish without blurring protesters | [Film the police](filmer.md) |
| **Support** | Listens and accompanies after a hard moment | Play therapist | [Mental health](sante-mentale.md) |
| **Logistics** | Transport, food, water, storage | Store equipment that could pass for a weapon | [Getting there and back](venir-repartir.md) |
| **Build** | Banners, placards, equipment | Equipment that could pass for a weapon | [Signs, banners, flags and leaflets](faire-sa-pancarte.md) · [Kit and what to wear](kit-manif.md) |
| **Communication** | Visuals, announcements, social media | Repost far-right content | [Communicating at a protest](communiquer.md) · [Social media](reseaux-sociaux.md) |

### Key vocabulary and concepts

- **Voucher**: a vetted member who really knows a new person (outside the airlock group: friend, colleague, neighbour, or seen in action at several protests) and vouches for them, privately, to the secretary.
- **Activist name**: the pseudonym used on Signal and in person.
- **Register**: the list, kept by two or three people outside the groups, of active and lost groups and of who is in which group.
- **Fallback point**: a regular place and time, agreed in person, to meet up if the groups go down.
- **Precautionary removal**: removing someone from their groups as a precaution, for example when they are arrested.
- **Leak**: the person or phone through which an outsider gets into a group.

## In this guide

- [As a member](signal-membres.md)
- [Recruiting and vetting](signal-recrutement.md)
- [Running the groups](signal-gerer.md)
- [Compromised group](signal-groupe-compromis.md)
- [Copy-paste templates](signal-modeles.md)

## When Signal is not enough

- **No network**: {{ res("briar") }} works over Bluetooth or local wifi, without a phone number ([communicating at a protest](communiquer.md#comparison)).[^briar-how]
- **No phone number**: {{ res("element") }} (Matrix) works with a simple account ID and suits large spaces organised into rooms.
- **Shared documents**: {{ res("cryptpad") }}, encrypted, no account required.
- **The most sensitive matters**: in person, without phones (left in another room, or switched off and kept away).

[:octicons-arrow-right-24: Organising a protest](organiser.md) · [:octicons-arrow-right-24: Communicating at a protest](communiquer.md) · [:octicons-arrow-right-24: Phone](telephone.md)

## Sources

Each note links to the source of the information. Most sources are in French. Laws change: check the date of the source and, if in doubt, ask a lawyer.
