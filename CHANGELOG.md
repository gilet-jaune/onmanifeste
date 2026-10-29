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
- Guided search "Je suis… et je veux…" (`docs/data/parcours.json`): 19 profiles, 51 needs, each
- Guide "Venir et repartir" (public transport, car-sharing, bike, on foot, exit plan), RATP traffic
- Install suggestion is now a small card at the bottom of the screen, shown from the second page view
  or after 30 seconds, closable for 14 days, never on emergency pages.
- Fixed: the first visit no longer reloads the page when the service worker takes control.
- "Je suis…" step shows a rotating, clickable example (paused while typing, still with reduced
- Guide "Agressions par l'extrême droite" (FR/EN, defensive), LICRA, SOS Racisme, SOS homophobie,
- Kit guide: body protection (knee, elbow and wrist pads, shin guards, helmet) and a sourced warning
- "S'informer et se former" guide (FR/EN) and "Se former & s'engager" category: ANV-COP21,
- "Répressions et désinformation documentées" page (FR/EN): repression cases and official statements
- Guide "Communiquer pendant une manif" (FR/EN) comparing Signal, Briar and Meshtastic (offline, hardware,
  encryption, advantages, use cases, drawbacks) and Meshtastic in the directory.
- "Blessé·es et mort·es en manifestation" timeline (FR/EN, `victimes.json`): deaths and serious
  injuries by police, gendarmerie, army or far-right groups, each with sources; censuses (Basta!,
  Désarmons-les, Mutilés pour l'exemple, Allô Place Beauvau). Only deceased or already public cases
  are named.
- Fixed: on mobile, timeline dates sat beside the text instead of above it.
  later debunked (17 October 1961, Malik Oussekine, Rémi Fraisse, yellow vests LBD, Geneviève Legay,
  Pitié-Salpêtrière, Sainte-Soline body-camera footage, Nahel), each with evidence from the sources
  registry; `evidence` and `debunked` fields in `history.json`.
- Ten more guided-search profiles (misinformed, creator, under pressure, older, young, disabled,
  afraid, without a vehicle, professionals wanting to help, police officer).
  Alternatiba, Extinction Rebellion, Greenpeace local groups, LDH observatories, Amnesty training
  booklet; social media tips; shortcut and guided-search profile.
- Central registries: `sources.json` for citations (85 sources instead of 222 copies), `res()` macro
  for directory links; translation freshness tracked with `source_commit` (MDN-style) and review
  status in front matter.
  that protective gear can be confiscated or used as evidence (art. 222-14-2).
  La Horde, and a guided-search profile.
  motion).
  resource and an "en route" path.
  leading to guide sections, resources and shortcuts; shareable URLs, back button, offline, no-JS
  fallback, anchors validated in both languages.
- Six new guides (FR/EN): dispersal and kettling, protesting without French nationality, high-school
  students, sexist violence and online harassment, strikes and work, organising a protest.
- 13 new resources (LDH dispersal sheet, Conseil d'État 2021, Service-Public pages on organising,
  strikes and residence checks, Cimade, GISTI, CIDJ, 3919, 3018, PHAROS, CNIL) and two new
  situations (foreign nationals, harassment).
- Timeline: 9 new events and a `gains` field; "Ce que la rue a obtenu" section lists what movements
  won.
- `check: { date, result, note }` replaces `verified` + `status` on resources.
- Agent documentation rewritten: project map, data model, workflows (resource, guide, history event,
  maintenance issue).
  matter) and "Non vérifié" badges on unconfirmed resources (`status: unverified`).
- Sources everywhere: footnotes on every factual or legal claim in tips and guides (Légifrance,
  Service-Public, Croix-Rouge, Amnesty, LDH…), optional `sources` on resources shown on cards.
  covering), first aid, police custody, avoiding disinformation, talking to loved ones.
- Palestinian flag quick guide (FR/EN) and two more debunked official statements.
- Elected officials & parliamentary watch resources (`anticor`, `casier-politique`, `datan`,
  `howtheyvote`, `poligraph`) in the directory, linked from the documented repression page and the
  new "nul·le en politique, mais je veux agir" guided-search profile; "soutenir les lycéen·nes" need
  under the parent profile; known biases/limitations on repression and victims pages, and an Open
  Data section on the contributing page.
- Search: directory rendered at build time (header search finds every resource, works without JS),
  situation shortcuts, synonyms and one-typo tolerance, ranked and highlighted results, tag counts,
  live result count for screen readers, Escape to clear, suggestions when nothing matches.
