---
source_commit: 9ba9b9d2e1b91a3ddda83b03ebd3576f20604088
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
