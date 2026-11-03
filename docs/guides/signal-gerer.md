---
review: juridique
review_status: pending
tags:
    - guides
    - organiser
    - téléphone
    - schéma
---

# Groupes Signal : tenir les groupes

[:octicons-arrow-left-24: Groupes Signal : vue d'ensemble](groupes-signal.md)

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

## Fermer un groupe

Signal ne permet pas de supprimer un groupe pour tout le monde : le **fermer**, c'est retirer les membres un par un puis le quitter, après avoir comparé sa liste avec celle du nouveau groupe s'il y en a un (voir le [cas B](signal-groupe-compromis.md#cas-b-on-ne-sait-pas-demenager)). Notez ensuite l'identifiant comme fermé au registre.

| On le ferme | Pourquoi |
| --- | --- |
| **Le groupe sas, après sa rencontre** (sauf s'il est gardé en secours) | Il a servi une fois ; sa liste de membres est connue de personnes non validées. Elles n'y ont vu que l'heure, le lieu et des noms de militant·e : les en retirer suffit pour la suite, mais ce qui est déjà sur leur téléphone y reste |
| **Fuite non identifiée** (cas B) | La fuite est peut-être encore dedans : on déménage, puis on ferme l'ancien |
| **Le groupe temporaire, à la fin de sa journée ou de sa mobilisation** | Il ne sert plus |
| **Le groupe ne sert plus** (campagne finie, équipe dissoute, fusion) | Un groupe dormant reste sur tous les téléphones, avec son historique et ses membres : exposé en cas de saisie, pour rien |
| **Le groupe est trop grand** | On le divise en nouveaux groupes, puis on ferme l'ancien (ou on le garde comme l'un d'eux) |

**On ne le ferme pas** pour une fuite connue et retirée (cas A), un membre arrêté (retrait conservatoire), un nom qui a circulé (renommer suffit) ou un conflit (c'est le travail de la modération).

## Libellés de rôle

Signal permet à chaque membre d'afficher un **libellé** à côté de son nom. Chacun·e ne peut en mettre un **qu'à lui-même ou elle-même**, et il ne vaut **que dans le groupe où il est créé** : à refaire dans chaque groupe. Les libellés sont chiffrés, et les gardien·nes peuvent les réserver aux gardien·nes (Paramètres du groupe › Permissions).[^signal-libelles]

**Un libellé n'indique qu'un rôle de manif** (medic, legal…), jamais un rôle d'organisation (secrétaire, RH, gardien·ne, recruteur·se) : ceux-là désignent les personnes clés et ne servent pas aux autres membres.

Gardez une **liste commune** dans la [charte](signal-modeles.md#charte-complete), pour que tout le monde utilise les mêmes mots, par exemple :

| Libellé        | Rôle                                                       |
| -------------- | ---------------------------------------------------------- |
| `Medic`        | Premiers secours                                           |
| `Legal`        | Observation, contacts avocat·es, suivi des interpellations |
| `Construction` | Banderoles, pancartes, matériel                            |
| `Logistique`   | Transport, nourriture, stockage                            |
| `Com`          | Visuels, annonces, réseaux                                 |

- [ ] **N'importe qui peut s'afficher « Medic » ou « Legal »** si tout le monde a le droit de se mettre un libellé : c'est une indication, pas une preuve. Dans le groupe public et le groupe sas, réservez les libellés aux admins ; ailleurs, vérifiez en vrai (voir le [rôle medic ou legal](groupes-signal.md#roles-utiles-en-manif)), comme pour un brassard.
- [ ] **Les rôles de manif se répartissent entre les membres déjà présents, selon leurs capacités, et les libellés suivent** : un libellé indique le rôle tenu **en ce moment**, pas un statut. Quand le rôle passe à quelqu'un d'autre, l'ancien titulaire retire son libellé et le nouveau met le sien.
- [ ] **Un libellé se voit sur un téléphone saisi** : dans les grands groupes, seulement les rôles de manif utiles aux autres, **jamais un rôle d'organisation** (RH, secrétaire, gardien·ne), et pas de libellé qui désigne un niveau (« orga », « noyau »).

**Sans libellé**, les rôles se connaissent autrement : la mention « Admin » désigne déjà les gardien·nes ; être dans le sous-groupe `Medic`, c'est être medic ; le ou la secrétaire présente les rôles à la rencontre, et un tour rapide au début d'une action (« qui est medic, qui est legal aujourd'hui ? ») suffit. Évitez le champ « À propos » du profil : il se voit dans toutes vos conversations.

## Se coordonner

- [ ] **Demandez en nommant quelqu'un** : plus il y a de monde, moins chacun·e répond, car tout le monde pense qu'un·e autre va le faire. C'est l'**effet du témoin**,[^darley-latane-1968] et il existe aussi dans les discussions en ligne, sauf quand on nomme la personne à qui l'on demande.[^markey-2000]
- [ ] **Le jour d'une action**, les personnes qui coordonnent se retrouvent en vrai, ou dans un [groupe temporaire](signal-gerer.md#le-groupe-temporaire).
- [ ] **Personne n'est dans tous les sous-groupes** pour faire le lien : une seule personne présente partout exposerait toute la famille avec un seul téléphone saisi. Les échanges entre équipes passent par le groupe de confiance, et entre familles par des [liaisons](signal-gerer.md#relier-plusieurs-familles).
- [ ] **Pas de groupe « orga » qui réunit toutes les RH, tous les gardien·nes et tous les secrétaires**, ni de réunion où toutes ces personnes sont présentes en même temps : un seul téléphone saisi, ou une seule descente, les livrerait toutes. Le 21 juin 1943, à Caluire, l'arrestation de Jean Moulin et des responsables de la Résistance qu'il avait réunis au même endroit a montré ce risque.[^ordre-liberation-jean-moulin] Les rôles clés se coordonnent en vrai, ou en petits groupes de 2 ou 3 personnes, par sujet.

## Relier plusieurs familles

Plutôt qu'un grand groupe de confiance, plusieurs familles de 25 personnes se coordonnent par des **agents de liaison**. Ces tailles et cette méthode sont des repères de bon sens, pas des règles établies.

- [ ] **Chaque famille désigne deux liaisons**, connues de ses RH : si l'une est absente ou arrêtée, le lien tient. Elles changent régulièrement, pour qu'une même personne ne reste pas le point faible.
- [ ] **Les liaisons se retrouvent dans un groupe de liaison**, avec son **propre identifiant** tiré au hasard (`MVT-VIL-8R3-Liaison`), jamais celui d'une des familles. Aucune personne n'est dans le groupe de confiance de deux familles.
- [ ] **De préférence, une liaison n'est ni RH ni gardien·ne**, pour ne pas rassembler les personnes qui détiennent les listes (voir plus haut).
- [ ] **Elles ne transmettent que l'essentiel** : un lieu, une heure, une décision. Jamais une liste de membres, ni l'identité de qui que ce soit.
- [ ] **Sur un téléphone saisi**, on voit la famille de la liaison et le groupe de liaison, pas l'autre famille.
- [ ] **Pour une urgence qui concerne tout le monde**, passez par le groupe public, qui ne contient rien de sensible : la liaison est plus lente.

## Le groupe temporaire

Pour s'organiser vite, pour une journée d'action ou le temps d'une mobilisation, avec des personnes qu'on vient de rencontrer : un groupe **jetable**, à utiliser en partant du principe que la police peut y être. Il est à côté de l'entonnoir, pas dedans : il ne mène pas au groupe de confiance.

- [ ] **Pour une journée** : créé sur place par n'importe qui ; on y **ajoute les personnes présentes par nom d'utilisateur**, en vrai, sans lien ni code QR de groupe. Messages éphémères de quelques heures.
- [ ] **Pour une mobilisation** (quelques jours à deux semaines) : on y entre après une rencontre avec un·e secrétaire (code QR du compte scanné, réglages faits), **sans garant·e** ; messages éphémères d'un jour.
- [ ] **Dans les deux cas** : un nom neutre, sans mouvement ni ville (`J-7Q`, par exemple) ; le délai d'effacement **réglé avant d'inviter qui que ce soit**.[^signal-ephemeres]
- [ ] **Seulement du pratique** : « medic demandé·e devant la gare », « on se replie rue X », « besoin d'eau ». Pas de noms, pas de photos de visages, rien d'illégal.
- [ ] **Aucun lien avec les groupes de confiance** : on n'y ajoute personne depuis eux, on ne les mentionne pas.
- [ ] **Fermé à la fin** de la journée ou de la mobilisation : l'admin retire tout le monde et quitte le groupe ; chacun·e supprime la conversation.[^signal-supprimer] Les personnes qu'on y a vues agir ont alors leurs garant·es pour le groupe de confiance.
- [ ] **Sans réseau**, {{ res("briar") }} ou {{ res("meshtastic") }} ([communiquer pendant une manif](communiquer.md#comparatif)), ou pas de téléphone du tout : binômes et point de rendez-vous fixé à l'avance.

## Mineur·es dans les groupes

Lycéen·nes et adultes peuvent militer ensemble, avec des règles en plus :

- **Ne poussez jamais un·e mineur·e à une action illégale** (blocus, dégradation) : provoquer directement un·e mineur·e à commettre un délit est puni de 5 ans de prison, et de 7 ans aux abords d'un établissement scolaire ou pour un·e mineur·e de moins de 15 ans.[^cp-227-21]
- **Groupes séparés** pour les lycéen·nes quand c'est possible, avec des gardien·nes lycéen·nes.
- **Pas d'échange privé adulte-mineur·e** sans nécessité ; tout passe par le groupe.
- **Aucune photo** de mineur·es.
- En garde à vue, les mineur·es sont souvent pressé·es de donner des noms : moins ils et elles en connaissent, mieux ils et elles sont protégé·es ([guide lycéen](lyceens.md)).

## Sources

Chaque note renvoie à la source de l'information. Les textes de loi évoluent : vérifiez la date de la source et, en cas de doute, demandez à un·e avocat·e.
