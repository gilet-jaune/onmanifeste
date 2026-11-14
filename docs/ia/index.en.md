---
description: 'How and why this site uses AI: what it does, what it does not do, its limits, its cost, and what still needs human review.'
source_commit: 27a2a47e5019fd3b976ebb178e7c4498627ed86c
tags:
    - ai
    - transparency
    - legal notice
---

# How we use AI

!!! info "In short"

    - **Yes, this site is largely built with the help of an AI**: finding sources, summaries, drafting, translation and code.
    - **The site's engine is not made by an AI**: it is [MkDocs](https://www.mkdocs.org/) with the Material theme, free software that converts text files (Markdown) into web pages. But the custom layer (timeline filters, search, offline mode, check scripts) was written with an AI.
    - **No AI runs on the site or on your device.** The site is static: it sends none of your data to any AI service.
    - **Nothing has been reviewed by a human yet**: every record (directory, events, sources, victims) shows its verification level, currently "sourced, not reviewed by a human". Human review is still to be done: see below.
    - **Legal and medical pages** are marked "not yet reviewed" until a professional has reviewed them.

## Why use AI?

This project is **volunteer-run and anonymous**. Its aim is not to produce new information but to **gather, in French and offline, information that is already published** (laws, administrations, associations, media) for people who protest, sometimes in an emergency. Without AI, the research, writing and updating would have been much slower, and the site probably would not exist at this scale.

**A question of scale.** The site now has {{ resources | length }} resources, over forty guides and {{ events | length }} sourced events, in two languages, with automated checks and an offline mode. For a very small volunteer team with jobs and lives of their own, that is out of reach without an assistive tool: without AI, a site like this could not have been built at this scale, and in the maintainer's view **the idea would simply never have seen the light of day**. AI is used here to **defend a cause quickly**, with few means, and to make useful information accessible to people who protest.

**What this does not mean.** Going fast is not a reason to check less: that is why every record shows its source, its date and its review level, and why we call for human review. AI makes it possible to exist; it does not replace trust, which is earned through verification.

It is a deliberate choice, with trade-offs, set out below.

## What the AI does

- **Find and read** public pages (official texts, reports, press, association websites).
- **Summarise with sources**: texts are reworded, never copied, and every fact points to its dated source.
- **Draft** guides, timeline events and directory entries from those sources.
- **Translate** French into English. French remains the reference version.
- **Write and test the custom code** of the site: page templates, scripts (filters, search, offline mode), data-check scripts and tests. The MkDocs engine and the Material theme are not involved: they are existing free software used as they are.

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

AI has an **energy and hardware cost**, and several causes defended on this site, such as ecology or the concentration of economic power, oppose it. We acknowledge this: using AI here is a compromise between that criticism and the ability to offer free, sourced, offline information. You can challenge it. As for money, the AI tool is an ordinary subscription paid by the publishers, with no outside funding ([details](../mentions-legales/index.md#funding-and-independence)). If you do, tell us: it is a legitimate discussion.

## What remains: human review

The goal is to **reduce the role of AI in verification**, not just in production: have the most consequential content reviewed first (emergencies, law, health, facts about people), then the rest. If you can review a few records, even without special expertise, see [Review information](../relire/index.md) and [Contributing](../contribuer/index.md).

## Correct, challenge, remove

An error, an omission, a mention that concerns you? Open an [issue]({{ repositories.docs.url }}/issues/new/choose) or make a [private report]({{ repositories.docs.url }}/security/advisories/new). A person or collective mentioned can ask for a correction or removal. See also the [legal notice](../mentions-legales/index.md).
