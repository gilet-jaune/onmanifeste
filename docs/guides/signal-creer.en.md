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

# Signal groups: creating and configuring groups

[:octicons-arrow-left-24: Signal groups: overview](groupes-signal.md)

Terms used here: [the groups](groupes-signal.md#the-groups) (public, airlock, trusted), [the roles](groupes-signal.md#the-roles) (HR, keyholder…) and the [vocabulary](groupes-signal.md#key-vocabulary-and-concepts).

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
5. **Group description** → paste the short description (vital rules, non-violence disclaimer and legal reminder). Because disappearing messages delete pinned messages, the [full charter](signal-modeles.en.md#full-charter) is reviewed and agreed to in the airlock group before admission.
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

[:octicons-arrow-left-24: Previous : Vetting](signal-valider.md) · [Next : Running the groups :octicons-arrow-right-24:](signal-gerer.md)

## Sources

Each note links to the source of the information. Most sources are in French. Laws change: check the date of the source and, if in doubt, ask a lawyer.
