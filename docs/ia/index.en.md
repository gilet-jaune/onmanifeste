---
description: 'How and why this site uses AI: what it does, what it does not do, its limits, its cost, and what still needs human review.'
source_commit: e2863095d0e40aed7e0c87e2edca0aaa2a1f9939
tags:
    - ai
    - transparency
    - legal notice
---

# How we use AI

{% set ai_n = namespace(total=0, ai=0) %} {%- for list in [resources, events, sources.values() | list, victimes.victims] %} {%- for e in list %}{% set ai_n.total = ai_n.total + 1 %}{% if e.check.by == 'ai' %}{% set ai_n.ai = ai_n.ai + 1 %}{% endif %}{% endfor %} {%- endfor %}

!!! info "In short"

    - **Yes, this site is largely built with the help of an AI**: finding sources, summaries, drafting, translation and code.
    - **No AI runs on the site or on your device.** The site is static: it sends none of your data to any AI service.
    - **Nothing has been reviewed by a human yet**: {{ ai_n.ai }} of the {{ ai_n.total }} records in the registries (directory, events, sources, victims) carry the level "sourced, not reviewed by a human". Every record shows its level.
    - **Legal and medical pages** are marked "not yet reviewed" until a professional has reviewed them.

## Why use AI?

This project is **volunteer-run and anonymous**. Its aim is not to produce new information but to **gather, in French and offline, information that is already published** (laws, administrations, associations, media) for people who protest, sometimes in an emergency. Without AI, the research, writing and updating would have been much slower, and the site probably would not exist at this scale.

It is a deliberate choice, with trade-offs, set out below.

## What the AI does

- **Find and read** public pages (official texts, reports, press, association websites).
- **Summarise with sources**: texts are reworded, never copied, and every fact points to its dated source.
- **Draft** guides, timeline events and directory entries from those sources.
- **Translate** French into English. French remains the reference version.
- **Write and test the code** of the site (MkDocs, check scripts, tests).

The tools used are language models of the Claude family (Anthropic), used through a coding assistant.

## What the AI does not do

- **It never gives itself a human verification level.** A record produced by an AI always gets the `ai` level; only a volunteer, lawyer, health professional or historian can change it.
- **It does not publish on its own**: changes are pushed to the repository only when the maintainer asks.
- **It handles no visitor data**: the site has no analytics and no external embeds.
- **It is not an authority**: it replaces neither a lawyer, nor a health professional, nor the collectives whose job this is.

The writing rules are public: established facts only, presumption of innocence (nobody who has not been convicted is named), NGO claims attributed to their authors, no personal data. See the [content policy]({{ repositories.docs.url }}/blob/main/MODERATION.md).

## Limits and risks

An AI can **be wrong, make things up or misread a source**. Here is what reduces that risk, and what does not remove it:

- Every record carries **its source, the check date and a badge** saying who checked it. Unconfirmed information is flagged as such, with a note.
- **Automated checks** verify the data structure, that every source is cited, that links exist and that translations follow the French. They **do not verify that a fact is true**: only human review can.
- An AI can also carry **bias** in its choice of sources and wording. One more reason to review, and to read the original sources rather than our summaries.

For legal or health questions, do not rely on this site alone: call a lawyer, a legal helpline or an emergency service (see [SOS](../sos/index.md)).

## Cost and possible disagreement

AI has an **energy and hardware cost**, and several causes defended on this site, such as ecology or the concentration of economic power, oppose it. We acknowledge this: using AI here is a compromise between that criticism and the ability to offer free, sourced, offline information. You can challenge it. If you do, tell us: it is a legitimate discussion.

## What remains: human review

The goal is to **reduce the role of AI in verification**, not just in production: have the most consequential content reviewed first (emergencies, law, health, facts about people), then the rest. If you can review a few records, even without special expertise, see [Review information](../relire/index.md) and [Contributing](../contribuer/index.md).

## Correct, challenge, remove

An error, an omission, a mention that concerns you? Open an [issue]({{ repositories.docs.url }}/issues/new/choose) or make a [private report]({{ repositories.docs.url }}/security/advisories/new). A person or collective mentioned can ask for a correction or removal. See also the [legal notice](../mentions-legales/index.md).
