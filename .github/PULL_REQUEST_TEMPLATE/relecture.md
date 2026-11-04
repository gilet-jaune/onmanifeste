<!-- Modèle pour appliquer un lot de relecture. Ouvrir la PR avec ?template=relecture.md -->

## Lot appliqué

Issue du lot : #

Empreinte (affichée par `npm run review:apply`) :

```text
Review-batch: sha256:
```

## Vérifications

- [ ] Le lot a été appliqué avec `npm run review:apply -- <lot.json> --write --issue=<n°>`.
- [ ] Le texte du lot dans l'issue correspond à l'empreinte ci-dessus.
- [ ] Un niveau `lawyer`, `medical` ou `historian` n'est attribué que si le pseudonyme est dans
      `docs/data/reviewers.json`, avec `method` et `verified_on`.
- [ ] Aucun identifiant, document ni donnée personnelle dans cette PR, ni dans `reviewers.json`.
- [ ] `npm run validate:data` et `npm test` passent.
