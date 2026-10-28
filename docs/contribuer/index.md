---
tags:
    - contribuer
---

# Contribuer

Toutes les ressources de l'annuaire proviennent d'un seul fichier : `docs/data/resources.json`.

## Sans compétences techniques

Utilisez les formulaires GitHub :

- [Proposer une ressource]({{ repositories.docs.url }}/issues/new?template=1-nouvelle-ressource.yml)
- [Signaler une ressource obsolète ou erronée]({{ repositories.docs.url }}/issues/new?template=2-signaler-probleme.yml)

## Ajouter une ressource (Pull Request)

Ajoutez une entrée dans le tableau `resources` :

```json
{
    "id": "mon-outil",
    "name": "Mon outil",
    "url": "https://exemple.org/",
    "category": "communication",
    "tags": ["messagerie", "open-source"],
    "description": {
        "fr": "Description courte en français.",
        "en": "Short description in English (optional)."
    },
    "check": { "date": "2026-10-28", "result": "confirmed" }
}
```

Règles :

- `id` et `tags` en minuscules, sans accents, séparés par des tirets (`hors-ligne`).
- `category` doit exister dans l'objet `categories` du même fichier.
- `url` en `https://`.
- `description.fr` est obligatoire ; `description.en` est facultative (repli sur le français).
- `check` : la dernière vérification humaine du lien et des informations.
    - `date` (AAAA-MM-JJ) : quand vous avez vérifié. Au-delà de 12 mois, la maintenance hebdomadaire signale la ressource.
    - `result` : `confirmed` (lien joignable, informations exactes) ou `unconfirmed` (impossible à confirmer : badge « Non confirmé » sur la carte, pas de numéro de téléphone autorisé).
    - `note` : obligatoire si `unconfirmed`, pour expliquer ce qui n'a pas pu être confirmé.
- `url` est aussi la **source principale** de la description. Si la description affirme quelque chose qui vient d'ailleurs, ajoutez `sources` : `[{ "title": "…", "url": "https://…" }]`.
- Dans les guides et conseils, chaque information factuelle ou juridique porte une note de bas de page (`[^id]`). Les sources sont centralisées dans `docs/data/sources.json` (titre FR/EN, URL, date de vérification) : ajoutez-y la source une seule fois, puis citez-la par son identifiant dans n'importe quelle page.
- Pour mentionner une ressource de l'annuaire dans un guide, utilisez `{% raw %}{{ res("id") }}{% endraw %}` (ou `{% raw %}{{ res("id", "texte du lien") }}{% endraw %}`) au lieu de coller son URL.
- `phone` (facultatif) : uniquement un numéro public officiel (ligne d'urgence, permanence).

## Traduire et faire relire

- Chaque page anglaise (`page.en.md`) indique dans `source_commit` le commit de la page française qu'elle traduit. Si la page française change ensuite, la traduction est signalée comme en retard (CI, rapport hebdomadaire et avertissement sur la page). Après avoir mis à jour une traduction, remplacez `source_commit` par le dernier commit de la page française (`git log -1 --format=%H -- docs/…/page.md`).
- Les pages juridiques ou médicales portent `review: juridique` ou `review: medical` et `review_status: pending`. Après relecture par un·e professionnel·le, passez à `review_status: reviewed` et ajoutez `reviewed_on: AAAA-MM-JJ` : le badge « pas encore relu » disparaît.

## Améliorer la recherche

Deux blocs du même fichier règlent la recherche de l'annuaire :

- `situations` : les raccourcis affichés au-dessus de la recherche (« Je suis en garde à vue »…). Une ressource apparaît si elle a **au moins un** des `tags` ou une des `categories` listés.
- `synonyms` : mots que les gens tapent, associés aux tags ou mots à chercher aussi (`"gav": ["garde-a-vue"]`). Clés en minuscules et sans accents.

Le tag `essentiel` alimente le raccourci « C'est ma première manif » : réservez-le à une poignée d'outils et de guides indispensables.

Si une recherche courante ne donne rien, ajoutez un synonyme plutôt qu'un tag de plus.

## Ajouter un parcours « Je suis… et je veux… »

Les parcours sont dans `docs/data/parcours.json` : chaque profil (« Je suis… ») a des mots-clés pour la saisie et des besoins (« … et je veux… »). Chaque besoin liste des résultats :

- `{ "resource": "id" }` : une ressource de l'annuaire ;
- `{ "guide": "slug", "anchor": { "fr": "…", "en": "…" }, "label": { … } }` : une section de guide ;
- `{ "page": "sos" | "carte" | "conseils", … }` ou `{ "directory": { "situation": "…" }, … }`.

Ajoutez `"urgent": true` pour afficher le lien vers la page SOS. `npm run validate:data` vérifie que chaque ressource, situation et ancre existe, en français et en anglais.

## Vérifier

```bash
npm run validate:data   # valide le référentiel
npm run readme          # régénère la liste du README
npm run check           # format, lint, orthographe, référentiel
npm test                # build MkDocs strict
```

Puis ouvrez une Pull Request sur le [dépôt GitHub]({{ repositories.docs.url }}).
