# AGENTS

Entry point for AI agents working in `awesome-protest` — a French-first, offline-capable MkDocs
Material toolkit for protesting in France (directory, guides, SOS page, pocket card, timeline).

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
