---
source_commit: 0f43be89bba118890ad69fe58c7c90e2c9c6ad1c
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
