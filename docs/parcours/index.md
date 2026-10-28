---
tags:
    - parcours
hide:
    - toc
---

# Je suis… et je veux…

Dites où vous en êtes, puis ce que vous voulez faire : la page vous donne directement les bons guides, contacts et démarches. Fonctionne **hors ligne**.

{% import "overrides/partials/parcours-tree.html" as pt with context %}

<div class="parcours" data-parcours>
    <noscript><p>JavaScript est désactivé : voici tous les parcours.</p></noscript>
    {{ pt.tree('fr') }}
</div>
