# Workflow: Handle the Weekly Maintenance Issue

The `Maintenance: Weekly Check` workflow opens one issue labelled `maintenance` listing broken links
and resources to re-check (last check older than 12 months, or unconfirmed).

1. For each resource: open the link, confirm the information (especially phone numbers).
2. Confirmed: update `check` to `{ "date": "<today>", "result": "confirmed" }`.
3. Not confirmed: set `result: "unconfirmed"` with a `note` and remove any `phone`; if the resource
   is gone, delete the entry.
4. Broken links in guides: replace with a working official source, or remove the claim.
5. Run the validation baseline and commit; the next weekly run closes the issue when all is fine.
