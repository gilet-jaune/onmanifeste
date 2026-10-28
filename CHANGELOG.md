# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial MkDocs Material scaffold (Prettier, markdownlint, cspell, lychee, GitHub Actions).
- Resources registry (`docs/data/resources.json`) with JSON schema and validation script.
- Directory page with live search by name, category and tags.
- French-first i18n (`mkdocs-static-i18n`) with English fallback.
- Practical tips page (digital security, rights when arrested, minors in custody).
- `verified` date on every resource, shown on cards; validation warns after 12 months.
- Offline-capable PWA (service worker, manifest, icons) with update and reinstall controls.
- Self-hosted fonts via the Material `privacy` plugin (no Google Fonts requests).
- Health & first aid category, regional legal team (Marseille), filming police, complaints (IGGN,
  LDH guide), psychological support (France Victimes), metadata removal (mat2), accessibility.
- Tips: rights, what to bring, filming police, complaints, parents, protesting with a disability.
- GitHub Pages deployment workflow and issue forms; trusted news and fact-checking sources.
- "Gilet jaune" visual identity: fluorescent yellow header with reflective bands, Barlow / Barlow
  Condensed (self-hosted), black-on-yellow components, AA contrast in light and dark modes, new icons.
- Historical milestones timeline (`docs/data/history.json`, rendered at build time) from 14 July 1789
  to the 2026 high-school movement.
- Directory shows the most used tags first, with a toggle for the full list.
- `site_url` injected by CI (no hardcoded GitHub Pages host).
- Install banner explaining offline access, with native install button or iOS instructions.
- Quick guides (offline): never stay alone, protest kit and outfit (mask filters, legal note on face
- SOS page and printable pocket card (offline), official emergency numbers and anti-repression
  hotlines; regional legal teams (Lyon, Lille, Nantes, Rennes).
- Weekly maintenance workflow: link check and stale `verified` dates, reported in a single issue.
- Community files: code of conduct, content policy, security policy, pull request template.
- Legal notice and privacy page (non-professional anonymous publisher, GitHub Pages host and its IP
  logging), linked from the footer.
- Open Graph share image and meta tags for link previews.
- Seventh quick guide "Filmer les forces de l'ordre": always film police interventions, keep the
  untouched original as evidence, auto-backup over mobile data to end-to-end encrypted storage, blur
  faces and any identifying feature before publishing, archive posts.
- "Filmer & archiver" category: ProofMode, eyeWitness, WITNESS guides, Wayback Machine,
  archive.today, Ente Photos, Proton Drive.
- Review badges on guides not yet checked by a lawyer or medical professional (`review` front
- English version of every page.
- Strict Content-Security-Policy on every page (`hooks/csp.py`, inline scripts allowed by hash only).
- Repository widget no longer calls the GitHub API from visitors' browsers.
- QR code to the published site on the pocket card (`hooks/qrcode.py`).
- README passes awesome-lint (checked in CI).
- `check: { date, result, note }` replaces `verified` + `status` on resources.
- Agent documentation rewritten: project map, data model, workflows (resource, guide, history event,
  maintenance issue).
  matter) and "Non vérifié" badges on unconfirmed resources (`status: unverified`).
- Sources everywhere: footnotes on every factual or legal claim in tips and guides (Légifrance,
  Service-Public, Croix-Rouge, Amnesty, LDH…), optional `sources` on resources shown on cards.
  covering), first aid, police custody, avoiding disinformation, talking to loved ones.
- Search: directory rendered at build time (header search finds every resource, works without JS),
  situation shortcuts, synonyms and one-typo tolerance, ranked and highlighted results, tag counts,
  live result count for screen readers, Escape to clear, suggestions when nothing matches.
