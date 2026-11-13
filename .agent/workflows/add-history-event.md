# Workflow: Add a Historical Event

1. Add the event to `events` in `docs/data/history.json` **in chronological order**, with:
   - a unique `id` (`YYYY-short-slug`, lowercase, no accents): it is the stable link anchor
     (`#evt-<id>`), so never change it once published;
   - an ISO `date`, `kinds`, a list of keys from the top-level `kinds` (the first is the main theme;
     add more when the event belongs to several), and a `title` and `description` in French and
     English;
   - a source `url` (encyclopedia or documenting organisation) and, for every claim it does not
     cover, `evidence` ids from `docs/data/sources.json`. All of them are listed under the event;
   - `actors` (accountability events only: offences, fraud, killings, impunity, discrimination,
     repression): who the event puts in question, i.e. the party implicated (keys of the top-level
     `actors`: police and gendarmes, government, elected officials, companies; the first is the main
     one). Not those who judge, investigate or report on it: an Amnesty or UN report on police
     violence is about the police and the government, a journalistic investigation about the firm it
     investigates, a trial about the person tried. Never for protest events, never named people; the
     "Concerne" filter reads it;
   - optionally `highlights` (slugs of thematic pages such as `probite` or `securite-libertes`, i.e.
     folders `docs/<slug>/`): a key event of that page, which shows only its key events (4 to 9) and
     links to the full timeline. Keep it for the events a reader needs to follow the page's
     explanation;
   - optionally `end` (end of a period), `related` (ids of related events, "see also") and `guides`
     (slugs of useful guides; labels live in `overrides/partials/history-timeline.html`);
   - a `check` (`date`, `result`, `by: "ai"` when added by an agent).
2. Check the URLs respond (Wikipedia titles change; prefer the exact article title).
3. Run `npm run validate:data` and `npm test`.
