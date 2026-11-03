---
description: "Dites où vous en êtes (gazé·e, première manif, témoin d'une arrestation…) et ce que vous voulez faire : le site vous mène au bon guide."
tags:
    - parcours
---

# Je suis… et je veux…

**Dites-nous où vous en êtes** (gazé·e, première manif, témoin d'une arrestation…), puis ce que vous voulez faire : en deux étapes, la page vous emmène au bon passage, avec les contacts et les démarches utiles. Fonctionne **hors ligne**.

{% import "overrides/partials/parcours-tree.html" as pt with context %}

<div class="parcours" data-parcours>
    <noscript><p>JavaScript est désactivé : voici tous les parcours.</p></noscript>
    {{ pt.tree('fr') }}
</div>
