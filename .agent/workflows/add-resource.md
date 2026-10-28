# Workflow: Add or Update a Resource

1. Open the official page yourself and confirm it is reachable and current. If it is not, do not
   invent details: use `check.result: "unconfirmed"` with a `note`, and no `phone`.
2. Add the entry to `resources` in `docs/data/resources.json`, next to its category. Reuse existing
   tags (see the directory's tag list) before creating new ones.
3. Set `check.date` to today. Add `sources` for any statement that does not come from `url`.
4. If people will search for it with other words, add `synonyms`; if it fits a situation shortcut,
   check that one of its tags or its category is listed there.
5. Run `npm run validate:data`, `npm run readme`, `npm run check` and `npm test`.
6. Add a line to `CHANGELOG.md` under `[Unreleased]`.
