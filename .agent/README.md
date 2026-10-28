# Awesome Protest — Agent Guide

French-first toolkit for protesting in France: a sourced directory, quick guides, an SOS page, a printable pocket card and a history timeline, published with MkDocs Material as an offline-capable PWA. Entry point and validation baseline: [`AGENTS.md`](../AGENTS.md).

## Ground rules

- **Safety first:** readers may be in custody, injured or scared. Prefer short, actionable wording; never publish an unconfirmed phone number.
- **Every claim is sourced:** resources link to their official page (`url`, `sources`); guides and tips use footnotes (`[^id]`) listed under `## Sources`.
- **Privacy:** no analytics, no external embeds, no third-party requests at runtime (fonts are self-hosted by the Material `privacy` plugin).
- **Anonymity:** the project is published anonymously by "citron-oppresse" in the `gilet-jaune` GitHub organization. Never write a real name, personal e-mail or personal handle in files, commits or URLs.
- **French first:** `page.md` is French; `page.en.md` is its English translation (every page has one). Sources stay in French and are marked "(in French)" in English pages when useful.

## Map

| Path | What it is |
| --- | --- |
| `docs/data/resources.json` | Single registry: `categories`, `emergency`, `situations`, `synonyms`, `resources`. Schema in `schemas/resources.schema.json`. |
| `docs/data/history.json` | Timeline events (`kinds`, `events`), rendered at build time. Schema in `schemas/history.schema.json`. |
| `docs/guides/` | Seven quick guides (FR + EN). `review: juridique\|medical` front matter shows a "not yet reviewed" badge. |
| `docs/annuaire/`, `docs/sos/`, `docs/carte/` | Directory, SOS page and pocket card, all rendered from the registry (`overrides/partials/*.html`). |
| `docs/javascripts/directory.js` | Live search: situations, synonyms, typo tolerance, ranking, tag counts. |
| `docs/javascripts/pwa.js`, `docs/sw.js`, `hooks/pwa.py` | Offline mode: service worker precache list and version injected at build. |
| `hooks/csp.py`, `hooks/qrcode.py` | Per-page Content-Security-Policy (inline scripts by hash); QR code to the site for the pocket card. Hook order matters: qrcode, csp, then pwa. |
| `overrides/main.html` | Head (manifest, Open Graph), review badge, install banner slot, footer. |
| `scripts/` | Registry validators, README generator, stale report, icon and OG image generators. |
| `.github/workflows/` | `validate` (PRs), `deploy-pages` (push to main), `maintenance` (weekly links and checks). |

## Resource entries

```json
{
  "id": "slug",
  "name": "Name",
  "url": "https://official.page/",
  "phone": "07 00 00 00 00",
  "category": "juridique",
  "tags": ["garde-a-vue", "urgence"],
  "description": { "fr": "…", "en": "…" },
  "sources": [{ "title": "…", "url": "https://…" }],
  "check": { "date": "2026-10-28", "result": "confirmed" }
}
```

- `phone` only for official public lines, and never when `check.result` is `unconfirmed`.
- `check.result: unconfirmed` requires a `note`; the card and README show a warning badge, and the SOS page hides the entry.
- After editing: `npm run validate:data` then `npm run readme` (the README list is generated).

## Workflows

- [/add-resource](./workflows/add-resource.md): add or update a directory entry.
- [/add-guide](./workflows/add-guide.md): write a new quick guide (FR + EN, sourced).
- [/add-history-event](./workflows/add-history-event.md): add a date to the timeline.
- [/review-maintenance-issue](./workflows/review-maintenance-issue.md): handle the weekly report.
- [/add-new-page](./workflows/add-new-page.md): any other page.
