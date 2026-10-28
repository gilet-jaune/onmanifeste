# Workflow: Add a Quick Guide

1. Create `docs/guides/<slug>.md` (French) with `tags` front matter and, for legal or medical
   content, `review: juridique` or `review: medical`.
2. Keep it short and actionable: checklists (`- [ ]`), numbered steps for sequences, one warning
   admonition at most.
3. Footnote every factual, legal or medical statement (`[^id]`) and list the sources under
   `## Sources`. Prefer official sources (Légifrance, Service-Public, Croix-Rouge) and recognised
   organisations; verify each URL responds.
4. Write `docs/guides/<slug>.en.md` with the same structure and footnotes.
5. Register it in `mkdocs.yml` (`nav` and `nav_translations`), add a card to `docs/guides/index.md`
   and `index.en.md`, and update the guide count on the home pages and README if mentioned.
6. Run the validation baseline; the service worker precaches the new page automatically.
