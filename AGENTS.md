# AGENTS

Entry point for AI agents working in `onmanifeste` — a French-first, offline-capable MkDocs Material
toolkit for protesting in France (directory, guides, SOS page, pocket card, timeline).

## Role & Principles

Act as a **Senior Documentation Engineer**:

- **Autonomous within gates:** work autonomously to complete the task; validate before considering
  it done (below) rather than asking for approval on routine changes.
- **KISS / DRY:** avoid duplicating documentation. Use MkDocs macros (`{{ repositories.*.name }}`,
  `{% include %}`) instead of hardcoding names or re-typing content that already lives elsewhere.

## Content Rules

- **French first:** `page.md` is French (default); English goes in `page.en.md`
  (`mkdocs-static-i18n`, falls back to French when missing).
- **Single registry:** tools/resources are added to `docs/data/resources.json` only, never hardcoded
  in pages. Run `npm run validate:data`, then `npm run readme` (the README list is generated).
- **Page description:** every page has a `description:` (160 characters max). It is the meta
  description and the line shown under the title in the site search results.
- **Guide illustration (optional):** `image:` + `image_alt:` in the front matter (`image_alt: ""` if
  purely decorative), file under `docs/assets/guides/`, 80 KB at most, no text inside the picture
  (it cannot be translated or read), and only an image you have the right to publish (your own, or a
  clear free licence with credit). Shown as a banner, a card thumbnail and the link preview.
- **No copying:** summarise, never copy a source's wording. A quoted passage is short, in quotes and
  attributed (footnote). Respect licences of reused material (e.g. CC BY-SA needs credit and
  share-alike).
- **Verified sources only:** every entry must link to an official, reachable page. No legal claims
  without a source. Record the check in `check: { date, result }` (`result`: `confirmed` or
  `unconfirmed` with a `note`).
- **Anonymity:** published by "citron-oppresse" in the `gilet-jaune` organization; never write a
  real name, personal e-mail or personal handle in files, commits or URLs.
- **Privacy:** no third-party requests at runtime (fonts are self-hosted by the `privacy` plugin);
  never add analytics or external embeds.

## Where the Details Live

- [`.agent/README.md`](.agent/README.md) — project map, data model and workflows (add a resource, a
  guide, a history event, handle the maintenance issue).
- [`docs/`](docs/) — the published MkDocs site.

## Validation Baseline

Before considering a change done, run:

```bash
npm run format:check   # Prettier
npm run lint            # markdownlint-cli2
npm run spellcheck      # cspell
npm run validate:data    # resources.json registry
npm test                 # mkdocs build --strict
```

Or `npm run check` to run format-check + lint + spellcheck in one step. CI additionally verifies
link integrity (`lychee`) after the strict build.

To live-preview the site locally: `npm run dev` (installs MkDocs into `.venv` on first run, then
`mkdocs serve`). `npm run preview` serves the strict build as deployed.
