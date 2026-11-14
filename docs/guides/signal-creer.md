---
description: 'Groupes Signal : créer et régler les groupes, avec les bons paramètres dès le départ.'
review: juridique
review_status: pending
tags:
    - guides
    - organiser
    - téléphone
    - schéma
---

# Groupes Signal : créer et régler les groupes

[:octicons-arrow-left-24: Groupes Signal : vue d'ensemble](groupes-signal.md)

Mots utilisés ici : [les groupes](groupes-signal.md#les-groupes) (public, sas, confiance), [les rôles](groupes-signal.md#les-roles) (RH, gardien·ne…) et le [vocabulaire](groupes-signal.md#vocabulaire-et-concepts-cles).

!!! abstract "L'essentiel"

    - **Un nom court, codé et tiré au hasard** pour chaque famille de groupes (`MVT-VIL-4K9-Medic`) : jamais séquentiel, jamais un mot qui désigne un niveau.
    - **Réglez le groupe vide, avant la première invitation** : messages éphémères, permissions réservées aux admins, aucun lien ni code QR (seule exception : le groupe public), un deuxième gardien·ne dès le départ.
    - **Un groupe qui dépasse sa taille se divise, il ne grossit pas** : 25 personnes de préférence et 50 au plus pour le groupe de confiance.
    - **Quelques heures avant une action**, réglez les messages éphémères du groupe de confiance sur quelques heures, et gardez le point de rendez-vous sur papier.
    - **Tenez un registre** des familles et des groupes, à deux ou trois personnes, hors des groupes.

## Nommer les groupes

Un nom court et codé aide à s'y retrouver et à **remplacer** des groupes sans confusion. Exemple fictif : `MVT-VIL-4K9-Medic`. Le groupe de confiance et ses sous-groupes forment une **famille**, qui partage le même identifiant : `MVT-VIL-4K9-General`, `MVT-VIL-4K9-Medic`, `MVT-VIL-4K9-Legal`. Dans le nom, le groupe de confiance s'appelle simplement `General` : un mot neutre, qui ne désigne pas un niveau.

| Partie | Sens | Conseil |
| --- | --- | --- |
| `MVT` | Le mouvement ou la campagne | Facultatif |
| `VIL` | La ville ou le secteur (trigramme) | Lisible : la police sait déjà où ont lieu les manifs |
| `4K9` | Identifiant de la **famille** (le groupe de confiance et ses sous-groupes) | **Tiré au hasard**, jamais séquentiel (1, 2, 3 trahit combien de familles ont existé ou ont été perdues). Famille perdue : tous ses groupes sont remplacés sous un nouvel identifiant. Un seul sous-groupe perdu : il est recréé dans la même famille, avec un numéro (`MVT-VIL-4K9-Medic2`) |
| `Medic` | Le thème, le rôle ou l'équipe | Restez vague pour les rôles sensibles (« Logistique » plutôt que le détail du matériel) |

**Variante discrète**, si vous voulez cacher aussi le mouvement, la ville et les thèmes : seulement des identifiants tirés au hasard, par exemple `4K9-T2`.

- `4K9` remplace `MVT-VIL-4K9` : l'identifiant de la famille, seul.
- `T2` remplace `Medic` : un second identifiant pour le thème, tiré au hasard lui aussi, et le même dans toutes les familles (`T2` désigne toujours les medics, par exemple).
- La correspondance (quel identifiant pour quelle ville, quel thème) se retient ou reste dans le registre, jamais dans les groupes. Chaque membre connaît le sens des groupes où il est, et ça suffit.
- Le prix : on s'y retrouve moins facilement. Gardez un nom clair si vous n'avez pas un vrai besoin de discrétion.

- [ ] **Évitez les mots qui désignent un niveau** (« vérifié », « orga », « noyau ») : ils signalent les groupes importants sur un écran ou une capture.
- [ ] **Sur un téléphone saisi, l'identifiant commun montre quels groupes vont ensemble** : leurs membres communs le montreraient de toute façon, et la famille se remplace d'un coup.
- [ ] **Choisissez un nom qui n'aura pas besoin de changer** : chaque changement de nom ou de présentation s'affiche comme une alerte dans la conversation.[^signal-gerer-groupe]
- [ ] **Tenez un registre** des familles et des groupes actifs et perdus, et de qui est dans quel groupe (par nom de militant·e), à deux ou trois personnes, hors des groupes : c'est lui qui permet de retirer quelqu'un partout en quelques minutes.

## Régler les groupes

| Groupe | Taille | Messages éphémères | Gardien·nes | Entrée | Présentation |
| --- | --- | --- | --- | --- | --- |
| **Groupe public** | Jusqu'à 1 000 (le maximum de Signal)[^signal-groupes] | 4 semaines (le maximum)[^signal-ephemeres] | 2 ou 3, plus les secrétaires pour annoncer les rencontres ; **seul·es les admins écrivent** | **Lien autorisé** (seule exception), sans approbation, réinitialisé si besoin ; ou ajout direct | Charte courte et lien vers ce site |
| **Groupe sas** | 5 à 15 personnes | 1 semaine : sa durée de vie ; il ne contient rien de sensible | Le ou la secrétaire qui l'annonce, et une autre personne | Ajout direct par le ou la secrétaire, sur inscription en privé ; **aucun lien** | Vide |
| **Groupe de confiance** | 25 de préférence, 50 au plus | 1 semaine ; **quelques heures, le plus court possible, à partir de quelques heures avant l'action** | 2 ou 3, pas les mêmes partout | Ajout direct par les RH ; **aucun lien** | Charte seulement |
| **Sous-groupe** | 5 à 15 ; moins de 10 si sensible | 1 semaine ; 1 jour si sensible, quelques heures les jours d'action | 2 | Ajout direct par un·e gardien·ne ; **aucun lien** | Charte seulement |
| **Groupe de liaison** | 4 à 8 personnes : 2 liaisons par famille | 1 semaine ; quelques heures les jours d'action | 2, de familles différentes | Ajout direct, avec l'accord des RH de chaque famille ; **aucun lien** | Charte seulement |
| **Groupe temporaire** | Les personnes présentes | Quelques heures pour une journée ; la durée de la mobilisation sinon | La personne qui l'a créé et une autre | Ajout direct, en vrai, par la personne qui l'a créé ; **aucun lien ni code QR** | Vide |

Un groupe se règle **vide**, avant la première invitation : le délai d'effacement ne vaut que pour les **nouveaux** messages.[^signal-ephemeres]

<div class="flow" markdown>

1. **Créez le groupe seul·e ou avec votre co-gardien·ne** → nom selon la nomenclature, sans photo.
2. **Messages éphémères** → le délai prévu dans le tableau, dès la création.[^signal-ephemeres]
3. **Permissions** → **à régler à la création** (paramètres du groupe › permissions). Quatre droits, chacun réservable aux admins : **envoyer des messages**, **ajouter des libellés**, **modifier les infos du groupe** (nom, photo, description et, selon la documentation de Signal, le délai des messages éphémères) et **ajouter des membres**.[^signal-groupes][^signal-gerer-groupe][^signal-ephemeres][^signal-libelles] Tant qu'un droit n'est pas restreint, un·e simple membre peut l'exercer, y compris changer le délai. Réservez-les aux admins (gardien·nes, et secrétaires dans le groupe public et le groupe sas) et vérifiez-les dans chaque groupe ; dans le groupe public, seul·es les admins envoient des messages. **Retirer un membre reste réservé aux admins**, quoi qu'on règle : d'où plusieurs gardien·nes joignables par groupe.[^signal-groupes][^signal-gerer-groupe]
4. **Pas de lien de groupe, pas de code QR de groupe** (seule exception : le **groupe public**, qui ne contient rien de sensible et dont le lien peut circuler) → on ajoute chaque personne **par nom d'utilisateur**, depuis une conversation privée. Un lien qui circule échappe à tout contrôle : quiconque l'a peut demander à entrer, et il peut être relayé ou retrouvé. Le lien se gère dans la section **lien du groupe** : on l'active, on le **réinitialise** ou on le **désactive** ;[^signal-lien-groupe] une option **« nécessite l'approbation d'un admin »** (à garder activée partout où un lien existe, sauf le groupe public) sert de filet, sans remplacer l'ajout direct. **Si un lien a été créé malgré tout, désactivez-le tout de suite**, puis réinitialisez-le au moindre doute. Réserver « ajouter des membres » aux admins limite aussi qui peut en créer un : un membre qui ne voit pas la fonction doit passer par un·e admin (à vérifier dans votre groupe).
5. **Description du groupe** → collez la description courte (règles vitales, vocation d'entraide et rappel légal). Les messages éphémères effaçant les messages épinglés, la [charte complète](signal-modeles.md#charte-complete) se fait valider dans le groupe sas avant l'ajout.
6. **Deuxième gardien·ne** → ajoutez cette personne et nommez-la admin dans Signal **avant** tout le monde.
7. **Registre** → notez l'identifiant du groupe et ses gardien·nes.
8. **Ensuite seulement**, ajoutez les membres.

</div>

### Quand créer ou diviser un groupe

**Un groupe qui dépasse sa taille se divise, il ne grossit pas** : plus un groupe est grand, plus il a de chances de contenir une fuite, et plus une fuite expose de monde. Ces tailles sont des repères de bon sens : tout le monde doit pouvoir se reconnaître au moins de vue dans le groupe de confiance, et vraiment se connaître dans un sous-groupe. Groupe sas trop plein : deux rencontres.

| Créer | Quand |
| --- | --- |
| **Une nouvelle famille** (nouvel identifiant, avec son groupe de confiance et ses sous-groupes) | Le groupe de confiance dépasse 25 personnes (50 au plus) ou ses membres ne se reconnaissent plus de vue (on divise par quartier ou secteur) ; une autre ville ; une campagne distincte ; des lycéen·nes (avec des gardien·nes lycéen·nes) ; une fuite non identifiée (cas B) |
| **Un groupe de liaison** (avec son propre identifiant, jamais celui d'une des familles) | Deux familles ou plus doivent se coordonner (voir [relier plusieurs familles](signal-gerer.md#relier-plusieurs-familles)) |
| **Un sous-groupe** | Au moins 3 à 5 personnes ont le même rôle et doivent se coordonner (medic, legal…) |
| **Un deuxième sous-groupe du même rôle**, dans la même famille (`MVT-VIL-4K9-Medic2`) | Le premier dépasse 15 personnes, ou deux équipes travaillent sur des terrains différents |
| **Rien de nouveau** | Le besoin est ponctuel : nommez quelqu'un dans le groupe de confiance, ou créez un groupe temporaire |

- [ ] **Adaptez le délai au rendez-vous annoncé** : il doit couvrir le temps qui reste jusqu'au rendez-vous, plus une marge (rendez-vous dans 6 jours : 1 semaine ; demain : 1 jour). Réglez-le **avant** de poster le message : un nouveau délai ne s'applique qu'aux messages suivants,[^signal-ephemeres] et chaque changement s'affiche dans la conversation.
- [ ] **Un message reçu ne commence à disparaître qu'une fois lu.**[^signal-ephemeres] Sur un téléphone saisi, les messages **non lus** restent : délais courts les jours d'action. **Quelques heures avant l'action**, au plus fort de l'organisation, réglez le délai du **groupe de confiance** (et des sous-groupes concernés) sur **quelques heures**, le plus court possible (8 h, ou 3 h en durée personnalisée), et gardez le point de rendez-vous sur papier.
- [ ] **Dans la présentation, jamais** : noms, adresses, lieux de réunion, liens vers d'autres groupes, liste des sous-groupes. Pas de photo de groupe reconnaissable.
- [ ] **Les gardien·nes ne partent pas en action avec leur téléphone de gardien·ne** quand une interpellation est possible : déverrouillé, il permet d'ajouter quelqu'un, de lire et de modifier le groupe. Confiez le rôle à des personnes qui restent en retrait, ou retirez-le temporairement.
- [ ] **Entre gardien·nes, vérifiez vos numéros de sécurité** en vous rencontrant (code QR).[^eff-signal]

[:octicons-arrow-left-24: Précédent : Valider](signal-valider.md) · [Suivant : Tenir les groupes :octicons-arrow-right-24:](signal-gerer.md)

## Sources

Chaque note renvoie à la source de l'information. Les textes de loi évoluent : vérifiez la date de la source et, en cas de doute, demandez à un·e avocat·e.
