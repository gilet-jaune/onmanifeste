---
description: 'Signal groups: what to do when a group is compromised (seized phone, leak, arrest).'
source_commit: cb5ae65d827d2291933b32866de8568220e13315
review: juridique
review_status: pending
tags:
    - guides
    - organising
    - phone
    - flowchart
---

# Signal groups: compromised group

[:octicons-arrow-left-24: Signal groups: overview](groupes-signal.md)

Terms used here: [the groups](groupes-signal.md#the-groups) (public, airlock, trusted), [the roles](groupes-signal.md#the-roles) (HR, keyholder…) and the [vocabulary](groupes-signal.md#key-vocabulary-and-concepts).

## What to do?

<div class="flow" markdown>

1. **What is happening?**
    - **Someone is being taken away, or has lost their phone** → [precautionary removal](signal-groupe-compromis.md#precautionary-removal), straight away.
    - **A serious doubt about a person** → [preventive pause](signal-groupe-compromis.md#preventive-pause-when-in-doubt), then two HR members decide {{ default("decision_delay") }}.
    - **A stranger in the group, a leak** → step 2.
2. **Is the group compromised?** → see the list below.
3. **Do you know where the leak is?**
    - **Yes, and it's removed** → [case A](signal-groupe-compromis.md#case-a-you-know-where-the-leak-is): the group carries on.
    - **No** → [case B](signal-groupe-compromis.md#case-b-you-dont-know-move-out): move out.
4. **Sub-groups** → the same question for each (see below).

</div>

## When is a group compromised?

A group is compromised when someone who shouldn't can **read its messages** (past or future) or **know its members**. Signal keeps no record of who is in which group,[^signal-groupes] but **an unlocked phone shows everything**: members, messages not yet deleted, the group's name, description and history of alerts.

**Compromised, act now:**

- a member is **arrested or held in police custody with their phone**;
- a phone is **lost or stolen**;
- an **unknown** member appears, or someone was added without being validated by a secretary;
- Signal shows that a member's **safety number** has changed while they are in custody or have lost their phone: their account may have been reinstalled elsewhere;[^eff-signal]
- a **leak** is found (someone passed on information from the group).

**Assess, without panicking:**

- a **leak**: information that was only in the group turns up with the police, in the press or with the far right;
- a member arrested **without** their phone: nothing can be read, but they may talk under pressure; stay alert, no automatic move;
- a member who leaves angry or is excluded.

**The key question: do you know where the leak is?** The "leak" is the person or the phone through which an outsider gets into the group.

- **You know, and you have removed it** (a member arrested with their phone, a lost phone, the person behind a leak identified): that phone or person has seen the **past** (history, members, name), but nothing of the **future**. The group can carry on.
- **You don't know** (information got out and nobody knows how, a doubt with no identified culprit): the leak may still be inside the group; the past **and** the future are exposed. You need to **move out**.

## Precautionary removal

Removing someone from a group costs nothing and is fixed in a minute. Waiting to find out whether they are in custody gives time to unlock their phone.

**In the heat of the moment, people will write "X has been taken away" in the group.** That is not a fault, and forbidding it will not work: we prepare for it. The aim is to **act fast and not let panic set in**: a short alert, an immediate action, a ready-made reply.

<div class="flow" markdown>

1. **You see someone being taken away** → write **one line**, wherever is fastest for you (the group, or HR in private): `Alert: [activist name] taken away`. Nothing else in the group: no place, no details, no other person's name. The time, the place and whether they had their phone go **in private** to HR or to the [legal team](../annuaire/index.md?tags=antirepression).
2. **The first keyholder who sees the alert removes the person from that group straight away**, without waiting for confirmation or a vote. If they are a keyholder, remove that role first.[^signal-gerer-groupe] In the group, **delete the alert for everyone**[^signal-gerer-groupe] and post the ready-made reply (below).
3. **HR or the "lost group" lead checks the register** → list of the person's other groups; their keyholders remove them too, straight away, and post the same reply there.
4. **Sensitive messages from the last 24 hours** → a keyholder can delete them for everyone;[^signal-gerer-groupe] the deletion only reaches the seized phone if it reconnects: don't rely on it.
5. **Follow-up goes through the legal team** ([police custody](garde-a-vue.md)), not the group: the arrest is not discussed there.
6. **When they are released, debrief in person with HR**: phone seized? unlocked? code given? returned? how long out of their sight?
    - **Stayed with them and locked, or not taken along** → bring them back.
    - **Seized, unlocked or out of their sight** → their groups are compromised: case A. Treat the phone as compromised too: factory reset or a new phone, then verify safety numbers in person before bringing them back.[^eff-signal]

</div>

**Ready-to-copy messages**, to keep at hand (keyholders keep them in their notes):

```text
Alert: [activist name] taken away.
```

```text
[activist name] has been removed as a precaution, nothing personal. We don't comment here: the legal team is following up. Let's stay calm.
```

Removal protects the **future**, not the past: what was already on the phone stays there, including unread messages, whose timer has not started.[^signal-ephemeres]

## Preventive pause when in doubt

Precautionary removal also applies to a **serious doubt**, with no arrest. These are organising rules, not law.

- **An HR member or a keyholder** with a serious doubt about someone removes them **immediately** from the sensitive groups (trusted group and sub-groups), **with no accusation or justification**. They stay in the public group.
- **The message is the precautionary-removal one**: removed as a precaution, nothing personal. Nothing else in the group.
- **Two HR members decide {{ default("decision_delay") }}** whether the person comes back. If they cannot decide, they extend the pause together and note it in the register.
- **Safeguards**: the register notes **who** triggered the pause and **when**, never **why**; the person who triggered it does not take part in the final decision; the person can turn to another HR member.

## Case A: you know where the leak is

1. **Check the person has been removed** from every group they were in (register).
2. **List what is exposed**: messages still within the timer and unread ones, the member list, name, description, alert history (additions, removals, name changes). Treat all of it as known.
3. **Warn exposed members individually**, especially those whose number was visible.
4. **Clean up for the future**: description reduced to the charter, shorter timer, recent sensitive messages deleted for everyone.[^signal-gerer-groupe]
5. **Renaming only helps going forward**: the seized phone keeps the old name. Change it only if it says too much, and record the new ID in the register.
6. **No need to dissolve the group** if nobody else is in doubt.

## Case B: you don't know, move out

1. **Announce nothing in the group**: whoever is leaking is reading it. Decide in person, between keyholders and HR, and quietly look for where the leak comes from: what information got out, who had it (which group, which sub-group, on what date). This often narrows the circle down to a few people; a doubt proves nothing, accuse no one. If exchanges must stop at once, a clear, neutral sentence is enough: "**Pause: nobody posts here until further notice.**" Without saying why, or where to meet: the leak knows the fallback point like the other members. Then re-invite people one by one.
2. **Create a new family**: a new trusted group with a new ID, **without a link**.
3. **Re-invite people one by one, in proportion**: first those known in person for a long time, by several members, after a short in-person check and a fresh QR-code verification; people who joined recently, or who had the information that leaked, go through a **new validation**: a secretary in person, one voucher (or even two), then HR's second check. If the leak continues in the new group, it is among its members: the circle narrows.
4. **Close the old group only once everyone has moved**: during the move, its member list is your list of people to re-invite, and Signal keeps no record of who was in a group.[^signal-groupes] **Before closing, compare the two lists**: people not yet re-invited (absent, unreachable) are recorded in the register by activist name, to be found at the fallback point. Signal cannot delete a group for everyone either: post a neutral message ("group closed"), remove members one by one, then leave it.
5. **Everyone leaves the old group once they are in the new one**, not before, then deletes the chat: deleting the chat does not leave the group.[^signal-supprimer]
6. **Mark the ID as lost** in the register.

**Has the old group already been deleted?**

- **If only the chat was deleted**, the group still exists: type its name into Signal's search to find it again, with its members.[^signal-supprimer]
- **If it was really closed**: ask the other keyholders and HR, who may still have it; the **register** gives the activist names to find; each secretary can have the accounts they verified by QR code re-invited; keyholders of sub-groups that are still active re-invite their members; for everyone else, the **fallback point** in person.

## What about sub-groups?

- **The person or phone behind the leak was in the sub-group** → same procedure for it.
- **Neither was** → the sub-group is not exposed by this leak. If its name or ID appeared in the parent group's messages or description, rename it with the family's new ID; no need to dissolve it.
- **Unidentified leak in the parent group** → review the sub-group members who came from the parent; dissolve only if there is doubt about one of them.

[:octicons-arrow-left-24: Previous : Running the groups](signal-gerer.md) · [Next : Copy-paste templates :octicons-arrow-right-24:](signal-modeles.md)

## Sources

Each note links to the source of the information. Most sources are in French. Laws change: check the date of the source and, if in doubt, ask a lawyer.
