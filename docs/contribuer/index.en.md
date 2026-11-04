---
description: 'How to contribute: add a resource, a guide or an event, review a page. Everything starts from a public, checked data registry.'
source_commit: a7b3a95c19882f9eb40af18aeef9ae5bf8f8fb34
tags:
    - contributing
---

# Contributing

Every resource in the directory comes from a single file: `docs/data/resources.json`.

## Without technical skills

Use the GitHub forms (in French, answers in English are welcome):

- [Suggest a resource]({{ repositories.docs.url }}/issues/new?template=1-nouvelle-ressource.yml)
- [Report an outdated or wrong resource]({{ repositories.docs.url }}/issues/new?template=2-signaler-probleme.yml)

## Add a resource (Pull Request)

Add an entry to the `resources` array:

```json
{
    "id": "my-tool",
    "name": "My tool",
    "url": "https://example.org/",
    "category": "communication",
    "tags": ["messagerie", "open-source"],
    "description": {
        "fr": "Description courte en français.",
        "en": "Short description in English (optional)."
    },
    "check": { "date": "2026-10-28", "result": "confirmed", "by": "volunteer" }
}
```

Rules:

- `id` and `tags` in lowercase, without accents, separated by hyphens (`hors-ligne`).
- `category` must exist in the `categories` object of the same file.
- `url` must use `https://`.
- `description.fr` is required; `description.en` is optional (falls back to French).
- `check`: the last check of the link and the information (see "Check an entry" below).
    - `date` (YYYY-MM-DD): when you checked. After 12 months, the weekly maintenance flags the resource.
    - `result`: `confirmed` (link reachable, information accurate) or `unconfirmed` (could not be confirmed: "Unconfirmed" badge on the card, no phone number allowed).
    - `note`: required when `unconfirmed`, to explain what could not be confirmed.
    - `by`: who checked (`ai`, `volunteer`, `lawyer`, `medical` or `historian`).
- `url` is also the **primary source** of the description. If the description states something coming from elsewhere, add `sources`: `[{ "title": "…", "url": "https://…" }]`.
- In guides and tips, every factual or legal statement carries a footnote (`[^id]`). Sources are centralised in `docs/data/sources.json` (FR/EN title, URL, check date): add a source once, then cite it by id from any page.
- To mention a directory resource in a guide, use `{% raw %}{{ res("id") }}{% endraw %}` (or `{% raw %}{{ res("id", "link text") }}{% endraw %}`) instead of pasting its URL.
- `phone` (optional): only an official public number (emergency line, helpline).

## Check an entry

Content was first **researched and sourced with the help of an AI**. Every registry entry (`resources.json`, `sources.json`, `history.json`, `victimes.json`) carries a `check` indicator saying who checked it, from least to most reliable:

| `by` | Shown as | Who |
| --- | --- | --- |
| `ai` | Sourced, not reviewed by a human | Starting value: link and content found by an AI, no human review |
| `volunteer` | Checked by a volunteer | Someone opened the source and confirmed the information |
| `lawyer` | Checked by a lawyer | Legal information confirmed by a lawyer |
| `medical` | Checked by a health professional | Medical information confirmed by a health professional |
| `historian` | Checked by a historian | Historical fact (date, toll, context) confirmed by a historian |

To check: open the source, compare it with what is written, fix it if needed, then update `check` (today's `date`, `result`, `by`). No technical skills? Report your check in an issue.

## Translate and get reviewed

- Each English page (`page.en.md`) records in `source_commit` the commit of the French page it translates. If the French page changes afterwards, the translation is flagged as outdated (CI, weekly report and a notice on the page). After updating a translation, set `source_commit` to the French page's latest commit (`git log -1 --format=%H -- docs/…/page.md`).
- Legal or medical pages carry `review: juridique` or `review: medical` and `review_status: pending`. Once reviewed by a professional, switch to `review_status: reviewed` and add `reviewed_on: YYYY-MM-DD`: the "not yet reviewed" badge disappears.

## Improve search

Two blocks of the same file drive the directory search:

- `situations`: the shortcuts shown above the search ("I am in custody"…). A resource appears if it has **at least one** of the listed `tags` or `categories`.
- `synonyms`: words people type, mapped to tags or words to also search (`"gav": ["garde-a-vue"]`). Keys in lowercase without accents.

The `essentiel` tag feeds the "It's my first protest" shortcut: keep it for a handful of must-have tools and guides.

If a common search returns nothing, add a synonym rather than another tag.

## Add an "I am… and I want to…" path

Paths live in `docs/data/parcours.json`: each profile ("I am…") has keywords for typing and needs ("… and I want to…"). Each need lists results:

- `{ "resource": "id" }`: a directory resource;
- `{ "guide": "slug", "anchor": { "fr": "…", "en": "…" }, "label": { … } }`: a guide section;
- `{ "page": "sos" | "carte" | "comprendre" | "histoire" | "repressions", … }` or `{ "directory": { "situation": "…" }, … }`.

Add `"urgent": true` to show the SOS link. `npm run validate:data` checks that every resource, situation and anchor exists, in French and English.

## Open Data

All site data is public and available in JSON format in [`docs/data/`]({{ repositories.docs.url }}/tree/main/docs/data) (validation schemas in [`schemas/`]({{ repositories.docs.url }}/tree/main/schemas)):

- [`resources.json`]({{ repositories.docs.url }}/blob/main/docs/data/resources.json) — directory of tools, associations, outlets and emergency numbers;
- [`parcours.json`]({{ repositories.docs.url }}/blob/main/docs/data/parcours.json) — "I am… and I want to…" decision tree;
- [`history.json`]({{ repositories.docs.url }}/blob/main/docs/data/history.json) — historical milestones, social gains and documented repression and debunked statements;
- [`victimes.json`]({{ repositories.docs.url }}/blob/main/docs/data/victimes.json) — censuses and timeline of people injured or killed at protests;
- [`sources.json`]({{ repositories.docs.url }}/blob/main/docs/data/sources.json) — centralised registry of sources cited across the site.

## Check

```bash
npm run validate:data   # validate the registry
npm run readme          # regenerate the README list
npm run check           # format, lint, spelling, registry
npm test                # strict MkDocs build
```

Then open a Pull Request on the [GitHub repository]({{ repositories.docs.url }}).
