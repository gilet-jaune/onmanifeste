# On manifeste — Agent Guide

French-first toolkit for protesting in France: a sourced directory, guides, an SOS page, a printable pocket card and a history timeline, published with MkDocs Material as an offline-capable PWA. Entry point and validation baseline: [`AGENTS.md`](../AGENTS.md).

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
| `docs/data/history.json` | Timeline events (`kinds`, `events`), each with a unique `id`, a bilingual `title` and a `check` (`date`, `result`, `by`), rendered at build time. Schema in `schemas/history.schema.json`. |
| `docs/data/victimes.json` | Landmark historical cases and movement-wide tolls of people injured or killed at or after protests (`by`, `censuses`, `victims`); ongoing case-by-case tracking is delegated to the external databases (`censuses`). Every entry needs `evidence` (ids from `sources.json`), an optional `justice` outcome (`status` from the `justice` labels, `date`, `text`, `evidence`; omit it when unknown) and a `check` (`date`, `result`, `note` when unconfirmed). Name only the dead or people who made their case public; never name minors who are alive. Validated by `scripts/validate-victimes.mjs`. |
| `docs/guides/` | Guides (FR + EN). `review: juridique\|medical` front matter shows a "not yet reviewed" badge. |
| `docs/annuaire/`, `docs/sos/`, `docs/carte/` | Directory, SOS page and pocket card, all rendered from the registry (`overrides/partials/*.html`). |
| `docs/data/parcours.json`, `docs/javascripts/parcours.js` | Guided search "Je suis… / et je veux…": profiles → needs → results (guide sections, resources, pages). Validated by `scripts/validate-parcours.mjs` (anchors checked FR and EN). |
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
  "stores": {
    "android": "https://play.google.com/store/apps/details?id=…",
    "fdroid": "https://f-droid.org/packages/…/",
    "ios": "https://apps.apple.com/app/id…"
  },
  "check": { "date": "2026-10-28", "result": "confirmed", "by": "ai" }
}
```

- `stores` (optional, apps only): copy the store links from the publisher's own download page, never from a store search (look-alike apps exist).
- `check.by`: who checked it — `ai` (an agent found and sourced it: always use this when you are an AI agent), `volunteer`, `lawyer`, `medical` or `historian`. Never set a human level yourself. The wording and date format shown for each level live in `docs/data/check-levels.json` only (read by the footnote hook, the Jinja macros and the scripts); never write "checked on" text by hand.
- `phone` only for official public lines, and never when `check.result` is `unconfirmed`.
- `check.result: unconfirmed` requires a `note`; the card and README show a warning badge, and the SOS page hides the entry.
- After editing: `npm run validate:data` then `npm run readme` (the README list is generated).
- Schemas: vertical diagrams (steps with a label, arrows or not, optional dashed notes) are data in `docs/data/routes.json`, drawn in French and English by `{{ route("id") }}` (`main.py`); `npm run validate:data` checks both languages, text length and that every route is used. A timeline puts the time in the label; a set of cases uses `"arrows": false` with the condition in the label.
- Tunable thresholds of the Signal guide (how many actions are watched, how many members go along, how long a decision takes) live only in `docs/data/defaults.json` (example wording, public): pages use `{{ default("id") }}`, `routes.json` uses `[[id]]`, and `npm run validate:data` fails if one is typed again in a Signal page. A real group’s own values are never put in this repository.
- Signal guide: each process is described in one place and linked from elsewhere (the open-door route lives in `signal-valider`; the overview only summarises and links). When a process changes, also reread the printable memo sheets (`docs/fiches/signal.md`), which are copies by design.
- Legal or medical review: `npm run review:brief -- garde-a-vue` (or `-- --pending`) prints each sourced claim with its sources and a verdict line, to hand to the reviewer. Output goes in `review-briefs/` (git-ignored; do not publish).

## Workflows

- [/add-resource](./workflows/add-resource.md): add or update a directory entry.
- [/add-guide](./workflows/add-guide.md): write a new quick guide (FR + EN, sourced).
- [/add-history-event](./workflows/add-history-event.md): add a date to the timeline.
- [/review-maintenance-issue](./workflows/review-maintenance-issue.md): handle the weekly report.
- [/add-new-page](./workflows/add-new-page.md): any other page.
