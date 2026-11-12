# Workflow: Add a Historical Event

1. Add the event to `events` in `docs/data/history.json` **in chronological order**, with:
   - a unique `id` (`YYYY-short-slug`, lowercase, no accents): it is the stable link anchor
     (`#evt-<id>`), so never change it once published;
   - an ISO `date`, `kinds`, a list of keys from the top-level `kinds` (the first is the main theme;
     add more when the event belongs to several), and a `title` and `description` in French and
     English;
   - a source `url` (encyclopedia or documenting organisation) and, for every claim it does not
     cover, `evidence` ids from `docs/data/sources.json`. All of them are listed under the event;
   - `actors`: who the event is about, the institution(s) that decided or acted in it (keys of the
     top-level `actors`: government, Parliament, courts, police and gendarmes, companies, UN and
     Europe; the first is the main one). Only for accountability events (offences, fraud, killings,
     impunity, discrimination, repression), never for protest events themselves. Not those who
     report on it: an Amnesty or UN report on police violence is about the police and the
     government, and a journalistic investigation about the firm it investigates. Institutions only,
     never named people; the "Chez qui" filter reads it;
   - optionally `end` (end of a period), `related` (ids of related events, "see also") and `guides`
     (slugs of useful guides; labels live in `overrides/partials/history-timeline.html`);
   - a `check` (`date`, `result`, `by: "ai"` when added by an agent).
2. Check the URLs respond (Wikipedia titles change; prefer the exact article title).
3. Run `npm run validate:data` and `npm test`.
