---
description: 'Say where you are (gassed, first protest, witnessed an arrest…) and what you want to do: the site takes you to the right guide.'
source_hash: s1-bea2ba598402
source_sections: s1-5bd97f.b72d16
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
