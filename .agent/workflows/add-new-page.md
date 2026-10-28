# Workflow: Add a New Page

1. Create the Markdown file under the relevant `docs/<section>/` directory, with `tags` frontmatter
   and a single `#` title, plus its English version (`index.en.md`).
2. Register it in the `nav` section of `mkdocs.yml` and add the English title to `nav_translations`.
3. Link it from the section `index.md` (and `docs/index.md` if it is a new section).
4. Source every factual statement with footnotes (`[^id]`) under `## Sources`.
5. Run `npm run check` and `npm test`.
