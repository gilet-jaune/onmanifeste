---
source_commit: 9f2b2be2df7343f78545a12e8b25499ccac6c7bb
tags:
    - guided search
---

# I am… and I want to…

Say where you are, then what you want to do: the page takes you straight to the right guides, contacts and steps. Works **offline**.

{% import "overrides/partials/parcours-tree.html" as pt with context %}

<div class="parcours" data-parcours>
    <noscript><p>JavaScript is disabled: here are all the paths.</p></noscript>
    {{ pt.tree('en') }}
</div>
