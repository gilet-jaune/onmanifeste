---
source_commit: b71076ea9a43d144cdb84a73a525998f0864e278
tags:
    - guided search
hide:
    - toc
---

# I am… and I want to…

Say where you are, then what you want to do: the page takes you straight to the right guides, contacts and steps. Works **offline**.

{% import "overrides/partials/parcours-tree.html" as pt with context %}

<div class="parcours" data-parcours>
    <noscript><p>JavaScript is disabled: here are all the paths.</p></noscript>
    {{ pt.tree('en') }}
</div>
