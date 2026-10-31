---
source_commit: 691a14a1850b04e91f1c8e4acaac318702ecbb70
tags:
    - guided search
---

# I am… and I want to…

**Tell us where you are** (tear-gassed, first protest, witness to an arrest…), then what you want to do: in two steps, the page takes you to the right part, with the useful contacts and steps. Works **offline**.

{% import "overrides/partials/parcours-tree.html" as pt with context %}

<div class="parcours" data-parcours>
    <noscript><p>JavaScript is disabled: here are all the paths.</p></noscript>
    {{ pt.tree('en') }}
</div>
