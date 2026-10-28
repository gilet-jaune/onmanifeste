---
tags:
    - urgence
hide:
    - toc
---

# SOS

Touchez un numéro pour appeler. Cette page fonctionne **hors ligne**.

{% import "overrides/partials/sos.html" as sos with context %}

## Urgences

{{ sos.numbers('fr') }}

## Interpellation : prévenir une legal team

Donnez **l'heure, le lieu, une description** (vêtements) de la personne interpellée, et ce que vous avez vu. Ne donnez pas de nom par téléphone si ce n'est pas nécessaire.

{{ sos.hotlines('fr') }}

Pas de legal team dans votre ville ? Consultez {{ res("rajcol", "la liste des collectifs locaux (RAJCOL)") }} ou l'[annuaire](../annuaire/index.md?situation=garde-a-vue).

## En garde à vue

Demandez **un·e avocat·e et un médecin**. Gardez le silence jusqu'à l'entretien avec l'avocat·e. Ne signez rien d'inexact. [Le guide complet](../guides/garde-a-vue.md).

[:material-printer: Imprimer la carte de poche](../carte/index.md){ .md-button .md-button--primary }

## Sources

Numéros d'urgence : [{{ emergency_source.title }}]({{ emergency_source.url }}). Lignes antirépression : page de chaque collectif (lien « Vérifié le »).
