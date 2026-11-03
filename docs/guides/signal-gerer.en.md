---
source_commit: 82367f8caba9978159a453add83c40343aa54736
review: juridique
review_status: pending
tags:
    - guides
    - organising
    - phone
    - flowchart
---

# Signal groups: running the groups

[:octicons-arrow-left-24: Signal groups: overview](groupes-signal.md)

Terms used here: [the groups](groupes-signal.md#the-groups) (public, airlock, trusted), [the roles](groupes-signal.md#the-roles) (HR, keyholder…) and the [vocabulary](groupes-signal.md#key-vocabulary-and-concepts).

## Closing a group

Signal cannot delete a group for everyone: **closing** it means removing members one by one, then leaving it, after comparing its list with the new group's if there is one (see [case B](signal-groupe-compromis.md#case-b-you-dont-know-move-out)). Then record the ID as closed in the register.

| Close it | Why |
| --- | --- |
| **The airlock group, after its meeting** (unless kept as a backup) | It was used once; its list of members is known to unvalidated people. They only saw the time, the place and activist names in it: removing them is enough going forward, but what is already on their phone stays there |
| **Unidentified leak** (case B) | The leak may still be inside: move out, then close the old one |
| **The temporary group, at the end of its day or mobilisation** | It is no longer needed |
| **The group is no longer used** (campaign over, team dissolved, merged) | A dormant group stays on every phone, with its history and members: exposed if a phone is seized, for nothing |
| **The group is too big** | Split it into new groups, then close the old one (or keep it as one of them) |

**Don't close it** for a known leak that has been removed (case A), a member arrested (precautionary removal), a name that has got around (renaming is enough) or a conflict (that is moderation's job).

## Role labels

Signal lets each member show a **label** next to their name. Each person can only set one **for themselves**, and it only applies **in the group where it was created**: it has to be set again in each group. Labels are end-to-end encrypted, and keyholders can restrict them to keyholders (Group settings › Permissions).[^signal-libelles]

**A label only shows a protest role** (medic, legal…), never an organising role (secretary, HR, keyholder, recruiter): those point to key people and are of no use to other members.

Keep a **shared list** in the [charter](signal-modeles.en.md#full-charter), so everyone uses the same words, for example:

| Label       | Role                                             |
| ----------- | ------------------------------------------------ |
| `Medic`     | First aid                                        |
| `Legal`     | Observing, lawyer contacts, following up arrests |
| `Build`     | Banners, placards, equipment                     |
| `Logistics` | Transport, food, storage                         |
| `Comms`     | Visuals, announcements, social media             |

- [ ] **Anyone can show "Medic" or "Legal"** if everyone is allowed to set a label: it is an indication, not proof. In the public group and the airlock group, restrict labels to admins; elsewhere, check in person (see the [medic or legal role](groupes-signal.md#roles-useful-at-protests)), as you would for an armband.
- [ ] **Protest roles are shared out among the members already there, according to their skills, and labels follow**: a label shows the role held **right now**, not a status. When a role passes to someone else, the previous holder removes their label and the new one sets theirs.
- [ ] **A label is visible on a seized phone**: in large groups, only protest roles that are useful to others, **never an organising role** (HR, secretary, keyholder), and no label that reveals a level ("orga", "core").

**Without labels**, roles can be known in other ways: the "Admin" tag already marks the keyholders; being in the `Medic` sub-group means being a medic; the secretary introduces the roles at the meeting, and a quick round at the start of an action ("who's medic, who's legal today?") is enough. Avoid the profile "About" field: it shows in all your conversations.

## Coordinating

- [ ] **Ask by naming someone**: the more people there are, the less each person responds, because everyone assumes someone else will. This is the **bystander effect**,[^darley-latane-1968] and it also happens in online chats, except when you name the person you are asking.[^markey-2000]
- [ ] **On an action day**, the people coordinating meet in person, or in a [temporary group](signal-gerer.md#the-temporary-group).
- [ ] **Nobody is in every sub-group** to link them: one person present everywhere would expose the whole family through a single seized phone. Exchanges between teams go through the trusted group, and between families through [liaisons](signal-gerer.md#linking-several-families).
- [ ] **No "orga" group bringing together all HR, keyholders and secretaries**, and no meeting where all of them are present at once: a single seized phone, or a single raid, would hand them all over. On 21 June 1943, in Caluire, the arrest of Jean Moulin and the Resistance leaders he had gathered showed this risk.[^ordre-liberation-jean-moulin] Key roles coordinate in person, or in small groups of 2 or 3 people, by topic.

## Linking several families

Rather than one large trusted group, several families of about 25 people coordinate through **liaison agents**. These sizes and this method are rules of thumb, not established rules.

- [ ] **Each family appoints two liaisons**, known to its HR: if one is absent or arrested, the link holds. They change regularly, so that no one person stays the weak point.
- [ ] **Liaisons meet in a liaison group**, with its **own random ID** (`MVT-VIL-8R3-Liaison`), never that of one of the families. No one is in the trusted group of two families.
- [ ] **Preferably, a liaison is neither HR nor a keyholder**, so as not to gather the people who hold the lists (see above).
- [ ] **They pass on only the essentials**: a place, a time, a decision. Never a list of members, nor anyone's identity.
- [ ] **On a seized phone**, one sees the liaison's family and the liaison group, not the other family.
- [ ] **For an emergency that concerns everyone**, use the public group, which holds nothing sensitive: liaison is slower.

## The temporary group

To organise quickly, for an action day or for the length of a mobilisation, with people you have just met: a **disposable** group, used on the assumption that the police may be in it. It sits next to the funnel, not inside it: it doesn't lead to the trusted group.

- [ ] **For a day**: created on the spot by anyone; people present are **added by username**, in person, with no group link or QR code. Disappearing messages of a few hours.
- [ ] **For a mobilisation** (a few days to two weeks): people join after meeting a secretary (account QR code scanned, settings done), **without a voucher**; disappearing messages of one day.
- [ ] **In both cases**: a neutral name, no movement or city (`J-7Q`, for example); the timer **set before inviting anyone**.[^signal-ephemeres]
- [ ] **Practical matters only**: "medic needed outside the station", "falling back to X street", "need water". No names, no photos of faces, nothing illegal.
- [ ] **No link with the trusted groups**: nobody is added from them, they are not mentioned.
- [ ] **Closed at the end** of the day or mobilisation: the admin removes everyone and leaves; everyone deletes the chat.[^signal-supprimer] The people seen in action there then have their vouchers for the trusted group.
- [ ] **No network**: {{ res("briar") }} or {{ res("meshtastic") }} ([communicating at a protest](communiquer.md#comparison)), or no phone at all: pairs and a meeting point agreed beforehand.

## Minors in the groups

High-school students and adults can organise together, with extra rules:

- **Never push a minor into illegal action** (school blockade, damage): directly inciting a minor to commit an offence is punishable by 5 years in prison, and 7 years near a school or for a minor under 15.[^cp-227-21]
- **Separate groups** for high-school students where possible, with high-school keyholders.
- **No private adult–minor conversations** unless necessary; everything goes through the group.
- **No photos** of minors.
- In police custody, minors are often pressed to give names: the less they know, the better protected they are ([high-school students guide](lyceens.md)).

[:octicons-arrow-left-24: Previous : Creating and configuring groups](signal-creer.md) · [Next : Compromised group :octicons-arrow-right-24:](signal-groupe-compromis.md)

## Sources

Each note links to the source of the information. Most sources are in French. Laws change: check the date of the source and, if in doubt, ask a lawyer.
