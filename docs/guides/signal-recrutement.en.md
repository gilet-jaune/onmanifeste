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

# Signal groups: recruiting and meeting

[:octicons-arrow-left-24: Signal groups: overview](groupes-signal.md)

Terms used here: [the groups](groupes-signal.md#the-groups) (public, airlock, trusted), [the roles](groupes-signal.md#the-roles) (HR, keyholder…) and the [vocabulary](groupes-signal.md#key-vocabulary-and-concepts).

## Recruitment end to end, role by role

| Step | Newcomer | Secretary | HR | Keyholder |
| --- | --- | --- | --- | --- |
| **1. Before** | Joins the public group; sets up their settings (activist name, hidden number) | — | — | Sets up **empty** groups: message timer, permissions, no link (except for the public group) |
| **2. Airlock group** | Joins an airlock group announced in the public group (date and time of day), or suggests one to the secretary, who announces it (timer set before any invitation; added by the secretary, by username) | Announces the airlock group in the public group (date, time of day); is its admin; **adds** the people who signed up in private; posts the place the day before, without adding anyone else, then again on the day | — | — |
| **3. Meeting** | Comes, no phone on the table; sets up their settings **with** the secretary | Hosts; helps with settings; **scans each account's safety-number QR code**, which is then marked "verified" on their phone[^eff-signal] | — | — |
| **4. Voucher** | A vetted member who knows them vouches for them, privately | **Validates** if all the conditions are met (see [validating](signal-valider.md#validating-graduated-trust)) | Settle it if in doubt | — |
| **5. Cleaning** | — | Removes unvalidated people (nobody has been added since the day before), **adds an HR member to it**, who is thus only exposed to validated people | — | — |
| **6. Second check** | Answers any questions | — | Check profiles: name, no photo, hidden number, no duplicate name | — |
| **7. Adding** | Is added to the trusted group by HR | — | **Add by username** only the airlock group's validated members, leave the airlock group, record the names in the register | Checks that the arrivals match: no strangers, no duplicate names |
| **8. Afterwards** | Reads the [charter](signal-modeles.en.md#full-charter); trial period; sensitive sub-groups later | Stays their contact | Receive doubts, decide on removals; an arrest: [precautionary removal](signal-groupe-compromis.md#precautionary-removal) | **Watches**: unexpected arrivals, name changes, odd behaviour; reports to HR |

## The airlock group

- [ ] **No airlock group gives access to the vetted groups on its own.** Anyone can create a group calling itself an "airlock", including someone with bad intentions: only those a secretary announces in the public group count, and even they remain an open meeting, nothing more. Say so in the public group.
- [ ] **What someone sees there**: the time and place, the others' activist names, and, at the meeting, the secretary's face. So nothing else is written there, and secretaries **rotate**.
- [ ] **It is not a waiting room**: it is for **one** meeting. People not yet validated stay in the public group.
- [ ] **At the meeting, identity is not checked.** No ID, no real name, no job, no neighbourhood: these questions create identifying information, and a malicious person has a ready-made story. Small talk puts people at ease, with no personal questions and nothing written down; no round of jobs or neighbourhoods, which also protects newcomers from each other. Check instead:
    1. **the account and settings**: QR code scanned, activist name, hidden number;
    2. **who knows them**: "how did you hear about the group? does anyone here or in the movement know you?", to spot a possible voucher;
    3. **what they want to do**: which actions, which team;
    4. **that they understood the [charter](signal-modeles.en.md#full-charter)**, by having them put it in their own words;
    5. **warning signs**, without accusing: pushing for illegal or violent action, wanting to know who is who and which groups exist, asking for names or addresses, taking photos, wanting to get into everything straight away.
- [ ] **Each airlock group starts with its date and time of day** ("Thursday evening", "Saturday lunchtime"): people pick the one that suits them, with no poll or splitting afterwards. The secretary syncs it all: they create the airlock group (or become its admin if someone else created it) and post the announcement in the public group, where secretaries are admins: "Meeting on Thursday evening: airlock group" with the instruction to **write to them in private** (by username) to be added. **Never the place**: it is posted the day before in the airlock group.
- [ ] **Date not set yet?** A Signal poll in the airlock group, with 2 or 3 slots; no outside tool, which would keep a record of who comes when. Votes are not anonymous: every member sees who chose what, which is fine for a date.[^signal-sondages]
- [ ] **Two popular slots?** One meeting, one airlock group: the secretary creates a second one for the other slot, adds the people who chose it, then removes them from the first. A slot that only attracts one or two people isn't worth a group: keep the majority slot, and the others will come to the next meeting.
- [ ] **When to give the place?** By default, **the day before**, with the time. The later it is given, the less long it is known, but the harder it is to organise. The group's choice: **the same morning** for a small airlock, or **in two steps** (area and time the day before, exact spot a few hours before, only to people who confirmed). These are organising choices: no source measures their effect.
- [ ] **When to clean up**:
    - **before**: nobody is removed, but **entry is closed**: the day before, when posting the time and place, the secretary stops adding anyone; only people already added know the place;
    - **during**: no clean-up, phones are put away; an announced grace period for latecomers (30 minutes, for example), who do their settings and QR code at the end;
    - **after**: clean-up happens **the same evening**, within 48 hours at most: unvalidated people are removed, absentees included; they see nothing further. The longer you wait, the longer people nobody has met see what follows. What they have already seen is not erased: closing the airlock group afterwards is a matter of hygiene (fewer groups), not security. Absentees stay in the public group and come to the next meeting; an absentee known to a voucher can also be met one-to-one by a secretary.
- [ ] **Then, either**: close it, or keep it, renamed, as a **backup group** for that meeting's small core, to stay in touch if the main group is lost (closed by mistake, keyholders arrested). Nothing is organised there and nobody is added; two admins from the core, preferably **not** the trusted group's keyholders; no link; disappearing messages at 1 week.[^signal-groupes][^signal-gerer-groupe] It doesn't protect against an unknown leak (case B).
- [ ] **Without a backup airlock group**, people find each other through a neutral message from keyholders in the public group ("HR will get back to you") and the fallback point in person.
- [ ] **In the public group, the member list is visible to everyone**, and Signal can't hide it: someone can pick contacts from it for an airlock group, or to harass. Hence the activist name and hidden number, from the public group onwards.

## The in-person meeting, step by step

The airlock group sets up the meeting; here is how it goes. These guidelines are organising common sense, not established rules: adapt them. A meeting **reduces** the risk, it does not remove it: that is why a voucher and HR's second check come on top.

**Before**

- [ ] **A public, neutral, busy place** (café, park, open community venue), chosen by the secretaries, never someone's home. Daytime if possible, with an easy exit.
- [ ] **Never one person alone facing a newcomer**: at least two vetted members, not necessarily secretaries (the secretary leads, another person greets and listens). Two pairs of eyes spot an inconsistency better. It also protects the newcomer, who can tell a relative the time and place.
- [ ] **Announce the length**: 15 to 30 minutes per person. Small groups (5 to 15 people) stop anyone dwelling on one case.
- [ ] **The voucher preferably comes along** with the person, or confirms them in private: "the person with this activist name is the one I know". Nothing more to exchange.
- [ ] **The settings are sent beforehand**, so the meeting is used to check them, not to discover them.

**During (15 to 30 minutes)**

1. **Welcome (5 minutes).** The secretary introduces themselves with their activist name, explains what the group is for (mutual aid, logistics, nothing illegal) and what will happen. They also say that **nothing is written down and no ID is asked for**. The aim is to put people at ease.
2. **Settings and QR code (10 minutes).** Each person handles their own phone and shows their screens; the secretary guides aloud: activist name, no photo, hidden number, then scan of the safety number QR code. The secretary **looks at the screen**, with the person's agreement: ticking them off aloud is not enough.
3. **Conversation (10 minutes).** Open questions, no interrogation: "What brings you here?", "What would you like to do: leafleting, logistics, first aid, legal?", "How did you hear about the group?", then "Can you tell me the [charter](signal-modeles.en.md#full-charter) in your own words?". Listen more than you talk. **The person can ask their own questions** (who organises, how, what risks) and gets answers: trust goes both ways. The checks to make are listed in [the airlock group](signal-recrutement.md#the-airlock-group).
4. **End (2 minutes).** Say what happens next ("HR will get back to you within a few days") **without promising**: never say "you're in" on the spot.

**To avoid**

- [ ] **Do not test by provocation** (proposing an illegal action "to see" the reaction): it creates risk for everyone and proves nothing.
- [ ] **Do not decide alone on the spot**: a feeling of unease, an inconsistency or a warning sign is passed to HR afterwards, without accusing the person.
- [ ] **Do not try to guess** who is "infiltrated": watch behaviour (pressure, insistence, curiosity about others), not profiles.

**After**

- [ ] **A short debrief, preferably out loud**, between the two vetted members present, then with HR, **the same day**: what went well, what was surprising. A Signal conversation between vetted members is still acceptable, with disappearing messages. Nothing is written down lastingly with names (see "no trust list").
- [ ] **A single serious doubt is enough to wait**: the person stays in the public group, and comes to public actions.

## Recruiters and secretaries

- [ ] **Several of each**, so you depend on no one, and they rotate.
- [ ] **Recruiters don't validate** and cannot vouch for their own recruits: otherwise a single malicious person brings in their whole circle. They are not keyholders of vetted groups (the role is exposed), and they send the [settings](signal-membres.md#your-settings) list before a meeting.
- [ ] **Secretaries are already-vetted members**, never someone from the airlock group picked on the spot. Newcomers can, however, take small tasks with no rights in Signal (timekeeping, handing out the floor, welcoming at the door): it gets them involved and known.
- [ ] **During the meeting**, each person handles their own phone and shows their screens; nobody takes an unlocked phone in hand.
- [ ] **No attendance list**, no notes with names.

[:octicons-arrow-left-24: Previous : As a member](signal-membres.md) · [Next : Vetting :octicons-arrow-right-24:](signal-valider.md)

## Sources

Each note links to the source of the information. Most sources are in French. Laws change: check the date of the source and, if in doubt, ask a lawyer.
