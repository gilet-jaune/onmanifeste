# Contributing to On manifeste

Thank you for considering contributing to On manifeste!

## Working Locally

1. **Clone the repository**: `git clone https://github.com/gilet-jaune/onmanifeste.git`
2. **Setup your environment**:

   ```bash
   npm ci
   npm run dev   # first run installs MkDocs into .venv, then opens http://127.0.0.1:8000/
   ```

3. **Write documentation**: Edit the `.md` files in `docs/`. The site live-reloads at
   `http://127.0.0.1:8000/` (English at `/en/`).

## Style Guidelines

- **Use clear headings**: `#` for page titles, `##`/`###` for sections.
- **Keep it concise**: explain the _why_ alongside the _how_.
- **Update the index**: when adding a page, update `docs/index.md` and the `nav` in `mkdocs.yml`.
- **Guides start with key points**: an `!!! abstract "L'essentiel"` box (`"Key points"` in English).
- **Decision flows, not Mermaid**: for step-by-step situations, wrap an ordered list in
  `<div class="flow" markdown>` with nested `- **Oui** → …` branches. It renders offline, without
  JavaScript, and reads well with a screen reader (Mermaid is not cached offline).

## Validation

Before opening a Pull Request, run:

```bash
npm ci
npm run check   # Prettier + markdownlint + cspell
npm test        # mkdocs build --strict
```

## Submitting Changes

1. Create a descriptive branch (e.g., `doc/add-getting-started`).
2. Commit your changes with a clear message.
3. Update `CHANGELOG.md` under the `[Unreleased]` header.
4. Push and open a Pull Request against `main`.

## Developer Reference

### Resources Registry

All directory entries live in a single JSON file:
[`docs/data/resources.json`](docs/data/resources.json) (schema:
[`schemas/resources.schema.json`](schemas/resources.schema.json)). The `Annuaire` page loads it
client-side and offers live search by name, description, category and tags (filters are mirrored in
the URL). Validate changes with `npm run validate:data`.

### Local Development

**Prerequisites:** Python 3 and Node.js (see `.node-version`).

```bash
npm ci          # lint/format/spellcheck tooling
npm run dev     # live preview at http://127.0.0.1:8000/ (opens the browser)
npm test        # strict build into site/
npm run preview # strict build, then serve site/ as deployed (offline mode, service worker)
```

`npm run dev` and `npm test` go through `scripts/mkdocs.sh`, which creates a local `.venv` and
installs `requirements.txt` on first run (and again whenever it changes). No manual `pip install`.

### Offline (PWA)

The site is an installable Progressive Web App. `hooks/pwa.py` injects the list of built files and a
content hash into `sw.js` after each build, so every page (French and English), the registry and the
self-hosted fonts are cached on first visit. The footer panel (`docs/javascripts/pwa.js`) shows the
offline status and lets users check for updates, install a pending update or fully reinstall the
offline copy. Fonts are self-hosted by the Material `privacy` plugin: visitors make no third-party
requests.

Icons: edit `docs/assets/icons/icon.svg` and `scripts/generate-icons.py`, then run
`python3 scripts/generate-icons.py` (requires Pillow).

### Directory Structure

- **`docs/`**: Markdown pages (`page.md` = French, `page.en.md` = English translation).
  - `data/resources.json`: the resources registry.
  - `javascripts/directory.js`: dynamic search for the directory page.
  - `stylesheets/` / `javascripts/extra.js`: custom theming and interactivity.
- **`schemas/`** / **`scripts/`**: JSON schema and validator for the registry.
- **`overrides/`**: MkDocs Material template overrides (footer with version metadata).
- **`.agent/`**: Guidelines and workflows for AI agents (see `AGENTS.md`).
- **`mkdocs.yml`**: Site configuration (navigation, theme, plugins).

### Validation

```bash
npm ci
npm run check   # Prettier + markdownlint + cspell
npm test        # mkdocs build --strict
```

### Continuous Integration & Publication

- `Docs: Validate` runs on every Pull Request: format, lint, spellcheck, registry validation, strict
  MkDocs build and link check (lychee).
- `Docs: Deploy to GitHub Pages` runs on every push to `main`: same validation, then builds and
  publishes the site to GitHub Pages (the URL is shown in the deploy job and in the repository's
  Pages settings). One-time setup: **Settings > Pages > Source = GitHub Actions**.
- `Maintenance: Weekly Check` runs every Monday: builds the site, checks links (lychee) and lists
  resources whose last check (`check.date`) is older than 12 months or unconfirmed
  (`scripts/stale-report.mjs`). It opens or updates a single issue labelled `maintenance`, and
  closes it when everything is fine.
- `npm run review:queue` lists the legal and medical pages still waiting for a professional review
  (`review_status: pending`), the most used by the guided search first. Use it to brief reviewers.
- One-time setup for private reports (used by `SECURITY.md` and the code of conduct): **Settings >
  Code security > Private vulnerability reporting = Enabled**.

### Contributing Without Git

GitHub issue forms (`.github/ISSUE_TEMPLATE/`) let anyone propose a resource or report an outdated
one.
