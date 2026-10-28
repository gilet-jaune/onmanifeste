# Workflow: Add a Historical Event

1. Add the event to `events` in `docs/data/history.json` **in chronological order**, with an ISO
   `date`, a `kind` from `kinds`, a source `url` (encyclopedia or documenting organisation) and a
   neutral, factual `description` in French and English.
2. Check the URL responds (Wikipedia titles change; prefer the exact article title).
3. Run `npm run validate:data` and `npm test`.
