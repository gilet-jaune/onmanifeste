---
source_commit: 9ba9b9d2e1b91a3ddda83b03ebd3576f20604088
tags:
    - guided search
---

# I am… and I want to… (Signal groups)

Say what your role in the groups is, then what you want to do: the page takes you straight to the right part of the guide [Signal groups: organising without being infiltrated](../guides/groupes-signal.md). Works **offline**.

{% import "overrides/partials/parcours-tree.html" as pt with context %}

<div class="parcours" data-parcours data-src="parcours-signal.json" data-key="parcours_signal" data-type-iam="Type or choose: newcomer, secretary, keyholder…">
    <noscript><p>JavaScript is disabled: here are all the paths.</p></noscript>
    {{ pt.tree('en', parcours_signal) }}
</div>
