---
source_commit: 7d9d5d7afc9bb106125ce0508bc658d421c804c7
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

## Naming groups

A short, coded name helps you find your way and **replace** groups without confusion. Fictional example: `MVT-CTY-4K9-Medic`. The trusted group and its sub-groups form a **family**, which shares the same ID: `MVT-CTY-4K9-General`, `MVT-CTY-4K9-Medic`, `MVT-CTY-4K9-Legal`. In the name, the trusted group is simply called `General`: a neutral word that doesn't reveal a level.

| Part | Meaning | Advice |
| --- | --- | --- |
| `MVT` | The movement or campaign | Optional |
| `CTY` | The city or area (three letters) | Readable: the police already know where protests happen |
| `4K9` | ID of the **family** (the trusted group and its sub-groups) | **Randomly drawn**, never sequential (1, 2, 3 gives away how many families have existed or been lost). Family lost: all its groups are replaced under a new ID. A single sub-group lost: it is recreated in the same family, with a number (`MVT-CTY-4K9-Medic2`) |
| `Medic` | The topic, role or team | Stay vague for sensitive roles ("Logistics" rather than the details of the equipment) |

**Discreet variant**, if you also want to hide the movement, the city and the topics: random IDs only, for example `4K9-T2`.

- `4K9` replaces `MVT-CTY-4K9`: the family ID, on its own.
- `T2` replaces `Medic`: a second ID for the topic, also drawn at random, and the same in every family (`T2` always means the medics, for example).
- The mapping (which ID for which city, which topic) is memorised or kept in the register, never in the groups. Each member knows what their own groups are for, and that is enough.
- The cost: it is harder to find your way. Keep a clear name unless you really need discretion.

- [ ] **Avoid words that reveal a level** ("vetted", "core", "orga"): they flag the important groups on a screen or a screenshot.
- [ ] **On a seized phone, the shared ID shows which groups belong together**: their shared members would show it anyway, and the family is replaced in one go.
- [ ] **Pick a name that won't need changing**: every change of name or description shows up as an alert in the chat.[^signal-gerer-groupe]
- [ ] **Keep a register** of active and lost families and groups, and of who is in which group (by activist name), held by two or three people, outside the groups: it is what lets you remove someone everywhere within minutes.

## Setting up the groups

| Group | Size | Disappearing messages | Keyholders | Entry | Description |
| --- | --- | --- | --- | --- | --- |
| **Public group** | Up to 1,000 (Signal's maximum)[^signal-groupes] | 4 weeks (the maximum)[^signal-ephemeres] | 2 or 3, plus secretaries to announce meetings; **only admins post** | **Link allowed** (the one exception), no approval, reset if needed; or direct add | Short charter and a link to this site |
| **Airlock group** | 5 to 15 people | 1 week: its lifetime; it holds nothing sensitive | The secretary who announces it, and one other person | Added directly by the secretary, after a private sign-up; **no link** | Empty |
| **Trusted group** | 25 preferably, 50 at most | 1 week; **a few hours, as short as possible, from a few hours before the action** | 2 or 3, not the same everywhere | Added directly by HR; **no link** | Charter only |
| **Sub-group** | 5 to 15; under 10 if sensitive | 1 week; 1 day if sensitive, a few hours on action days | 2 | Added directly by a keyholder; **no link** | Charter only |
| **Liaison group** | 4 to 8 people: 2 liaisons per family | 1 week; a few hours on action days | 2, from different families | Added directly, with the agreement of each family's HR; **no link** | Charter only |
| **Temporary group** | The people present | A few hours for a day; the length of the mobilisation otherwise | The person who created it and one other | Added directly, in person, by whoever created it; **no link or QR code** | Empty |

A group is set up **empty**, before the first invitation: the message timer only covers **new** messages.[^signal-ephemeres]

<div class="flow" markdown>

1. **Create the group alone or with your co-keyholder** → name following the naming scheme, no photo.
2. **Disappearing messages** → the timer from the table, from creation.[^signal-ephemeres]
3. **Permissions** → **to set at creation** (group settings › permissions). Four rights, each can be reserved for admins: **send messages**, **add labels**, **edit group info** (name, photo, description and, according to Signal's documentation, the disappearing-messages timer) and **add members**.[^signal-groupes][^signal-gerer-groupe][^signal-ephemeres][^signal-libelles] While a right is not restricted, an ordinary member can use it, including changing the timer. Reserve them for admins (keyholders, and secretaries in the public group and the airlock group) and check them in each group; in the public group, only admins send messages. **Removing a member stays reserved for admins**, whatever you set: hence several reachable keyholders per group.[^signal-groupes][^signal-gerer-groupe]
4. **No group link, no group QR code** (the one exception: the **public group**, which holds nothing sensitive and whose link may circulate) → add each person **by username**, from a private conversation. A link that gets passed around escapes all control: anyone who has it can ask to join, and it can be relayed or found. The link is managed in the **group link** section: you turn it on, **reset** it or **turn it off**;[^signal-lien-groupe] an **"require admin approval"** option (keep it on wherever a link exists, except the public group) acts as a safety net, without replacing direct adding. **If a link was created anyway, turn it off straight away**, then reset it if in any doubt. Reserving "add members" for admins also limits who can create one: a member who does not see the feature has to go through an admin (to check in your group).
5. **Group description** → paste the short description (vital rules, non-violence disclaimer and legal reminder). Because disappearing messages delete pinned messages, the full charter is reviewed and agreed to in the airlock group before admission.
6. **Second keyholder** → add them and make them admin in Signal **before** anyone else.
7. **Register** → note the group ID and its keyholders.
8. **Only then** add the members.

</div>

**A group that outgrows its size is split, it doesn't keep growing**: the bigger a group, the more likely it contains a leak, and the more people a leak exposes. These sizes are common-sense benchmarks: everyone in the trusted group should at least recognise each other by sight, and really know each other in a sub-group. Airlock group too full: two meetings.

| Create | When |
| --- | --- |
| **A new family** (new ID, with its trusted group and sub-groups) | The trusted group exceeds 25 people (50 at most) or its members no longer recognise each other by sight (split by neighbourhood or area); another city; a separate campaign; high-school students (with high-school keyholders); an unidentified leak (case B) |
| **A liaison group** (with its own ID, never that of one of the families) | Two or more families need to coordinate (see [linking several families](signal-gerer.md#linking-several-families)) |
| **A sub-group** | At least 3 to 5 people share a role and need to coordinate (medics, legal…) |
| **A second sub-group for the same role**, in the same family (`MVT-CTY-4K9-Medic2`) | The first exceeds 15 people, or two teams work on different ground |
| **Nothing new** | The need is one-off: name someone in the trusted group, or create a temporary group |

- [ ] **Match the timer to the announced meeting**: it must cover the time left until the meeting, plus a margin (meeting in 6 days: 1 week; tomorrow: 1 day). Set it **before** posting the message: a new timer only applies to later messages,[^signal-ephemeres] and every change shows up in the chat.
- [ ] **A received message only starts disappearing once it has been read.**[^signal-ephemeres] On a seized phone, **unread** messages remain: short timers on action days. **A few hours before the action**, at the peak of organising, set the timer of the **trusted group** (and the sub-groups concerned) to **a few hours**, as short as possible (8 h, or 3 h as a custom time), and keep the meeting point on paper.
- [ ] **Never in the description**: names, addresses, meeting places, links to other groups, the list of sub-groups. No recognisable group photo.
- [ ] **Keyholders don't go to an action with their keyholder phone** when an arrest is possible: unlocked, it lets someone add members, read and change the group. Give the role to people who stay in the background, or remove it temporarily.
- [ ] **Between keyholders, verify your safety numbers** in person (QR code).[^eff-signal]

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

Keep a **shared list** in the charter, so everyone uses the same words, for example:

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

## Sources

Each note links to the source of the information. Most sources are in French. Laws change: check the date of the source and, if in doubt, ask a lawyer.
