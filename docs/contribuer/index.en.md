---
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
    "check": { "date": "2026-10-28", "result": "confirmed" }
}
```

Rules:

- `id` and `tags` in lowercase, without accents, separated by hyphens (`hors-ligne`).
- `category` must exist in the `categories` object of the same file.
- `url` must use `https://`.
- `description.fr` is required; `description.en` is optional (falls back to French).
- `check`: the last human check of the link and the information.
    - `date` (YYYY-MM-DD): when you checked. After 12 months, the weekly maintenance flags the resource.
    - `result`: `confirmed` (link reachable, information accurate) or `unconfirmed` (could not be confirmed: "Unconfirmed" badge on the card, no phone number allowed).
    - `note`: required when `unconfirmed`, to explain what could not be confirmed.
- `url` is also the **primary source** of the description. If the description states something coming from elsewhere, add `sources`: `[{ "title": "…", "url": "https://…" }]`.
- In guides and tips, every factual or legal statement carries a footnote (`[^id]`) to its source, listed in the page's "Sources" section.
- `phone` (optional): only an official public number (emergency line, helpline).

## Improve search

Two blocks of the same file drive the directory search:

- `situations`: the shortcuts shown above the search ("I am in custody"…). A resource appears if it has **at least one** of the listed `tags` or `categories`.
- `synonyms`: words people type, mapped to tags or words to also search (`"gav": ["garde-a-vue"]`). Keys in lowercase without accents.

The `essentiel` tag feeds the "It's my first protest" shortcut: keep it for a handful of must-have tools and guides.

If a common search returns nothing, add a synonym rather than another tag.

## Check

```bash
npm run validate:data   # validate the registry
npm run readme          # regenerate the README list
npm run check           # format, lint, spelling, registry
npm test                # strict MkDocs build
```

Then open a Pull Request on the [GitHub repository]({{ repositories.docs.url }}).
