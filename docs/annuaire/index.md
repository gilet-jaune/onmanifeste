---
tags:
    - annuaire
hide:
    - toc
---

# Annuaire des ressources

Recherchez un outil par nom, description ou étiquette, puis affinez avec la catégorie et les tags. Le filtre est conservé dans l'URL : vous pouvez partager une recherche.

{% import "overrides/partials/resource-cards.html" as rc with context %}

<div data-resource-directory>
    <noscript><p>JavaScript est désactivé : la liste complète est affichée ci-dessous, sans filtres.</p></noscript>
    {{ rc.cards('fr') }}
</div>
