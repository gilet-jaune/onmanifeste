---
description: "Groupes Signal pour s'organiser en limitant les fuites : groupe public, groupe sas, groupe de confiance. Vue d'ensemble."
review: juridique
review_status: pending
tags:
    - guides
    - organiser
    - téléphone
    - schéma
---

# Groupes Signal : s'organiser en limitant les fuites

!!! abstract "L'essentiel"

    - **Groupe public** d'annonces → **groupe sas** pour se rencontrer en vrai (proposé par n'importe qui, annoncé par un·e secrétaire) → **groupe de confiance** vérifié → **sous-groupes** par équipe.
    - **À porte ouverte**, sans garant·e : sas → sas « nettoyé » → agir ensemble → garant·es → second contrôle des RH → groupe de confiance (voir [les voir agir](signal-valider.md#recruter-a-porte-ouverte-les-voir-agir)).
    - **Par cooptation** : un membre vérifié propose quelqu'un qu'il connaît déjà, rencontre avec un·e secrétaire, ce membre est le ou la garant·e, puis second contrôle des RH (voir [la cooptation](signal-valider.md#recruter-par-cooptation-un-membre-verifie-propose)).
    - **Confiance graduée** : un·e **secrétaire vérifié·e**, **un·e garant·e** et un **second contrôle des RH** pour le groupe de confiance ; **deux garant·es** pour un sous-groupe sensible. Jamais par un lien ni un code QR de groupe, **sauf pour le groupe public** (annonces, rien de sensible) : on ajoute les personnes **par nom d'utilisateur**, depuis une conversation privée.
    - **Aucune vérification n'arrête une fuite déterminée** : n'écrivez rien que vous ne voudriez pas voir lu en garde à vue.
    - Avant d'entrer : un **nom de militant·e** court, utilisé aussi en vrai ; numéro caché à **tout le monde** ; messages **éphémères**, dans chaque groupe dès sa création.
    - Quelqu'un se fait embarquer : on le **retire de tous ses groupes tout de suite**, par précaution.
    - Groupe compromis : si l'on **sait par où ça fuit**, on retire la fuite et le groupe continue ; sinon, on **déménage** et on réinvite **un par un**.

Une messagerie chiffrée comme {{ res("signal") }} protège vos messages pendant leur transport, pas contre une personne présente dans le groupe ni contre un téléphone saisi. L'organisation des groupes, elle, peut limiter ce qu'une fuite ou une saisie révèle.

!!! info "Par où commencer ?"

    - **Quelqu'un vient d'être arrêté, ou un groupe est compromis** → [groupe compromis](signal-groupe-compromis.md).
    - **Vous découvrez ou rejoignez des groupes** → [les groupes](groupes-signal.md#les-groupes), [rejoindre ou proposer un groupe sas](signal-recrutement.md#proposer-une-date-une-heure-et-un-lieu), puis [vous êtes membre](signal-membres.md).
    - **Vous avez un rôle dans les groupes Signal** (membre, recruteur·se, secrétaire, RH, gardien·ne, liaison, modération, référent·e « groupe perdu ») → le [menu par rôle](groupes-signal.md#trouver-ce-qui-concerne-votre-role) ci-dessous, ou le [tableau des rôles d'organisation](groupes-signal.md#roles-dorganisation-des-groupes-signal) avec les liens vers chaque consigne.
    - **Vous cherchez un rôle en manif ou à distance** (medic, legal, veille, logistique...) → [les rôles dans une mobilisation](roles.md).
    - **Vous voulez juste la charte** → [modèles à copier-coller](signal-modeles.md).

## Trouver ce qui concerne votre rôle

Choisissez votre rôle (nouveau membre, membre, recruteur·se, secrétaire, RH, gardien·ne, liaison, modération ou référent·e « groupe perdu »), puis ce que vous voulez faire : le menu vous emmène directement à la bonne consigne (voir aussi le [tableau récapitulatif des rôles](groupes-signal.md#roles-dorganisation-des-groupes-signal)). Fonctionne **hors ligne**.

{% import "overrides/partials/parcours-tree.html" as pt with context %}

<div class="parcours" data-parcours data-embed data-up="../../" data-src="parcours-signal.json" data-key="parcours_signal" data-type-iam="Tapez quelques mots">
    <noscript><p>JavaScript est désactivé : voici tous les parcours.</p></noscript>
    {{ pt.tree('fr', parcours_signal, none, none, '../../', 3) }}
</div>

## À savoir avant de commencer

!!! warning "Chiffrer est légal, mais cela peut être retourné contre vous"

    Utiliser Signal n'est pas une infraction. Dans l'affaire dite du 8 décembre, la DGSI décrit les mis en cause comme ayant adopté un « comportement clandestin » avec des applications chiffrées, Tails et Tor, et cette formule revient très souvent dans le dossier, selon La Quadrature du Net, qui l'a analysé avant le procès.[^lqdn-8-decembre] Les sept prévenus ont été condamnés en décembre 2023 pour association de malfaiteurs terroriste.[^politis-8-decembre] Aucune de ces deux sources ne dit que le chiffrement a été jugé comme une infraction : il est cité comme **indice**. Ce dossier est un cas grave et très éloigné d'une manifestation ordinaire, mais il montre qu'on peut vous relire : **n'écrivez rien que vous ne voudriez pas voir cité**, et ne comptez pas sur le chiffrement pour vous protéger d'une lecture hostile.

!!! warning "Partez du principe que quelqu'un lit"

    Une rencontre en vrai écarte les curieux, les trolls et l'extrême droite, pas une personne malintentionnée bien préparée (policier·e, journaliste, provocateur·rice) ni une personne qui parle après une garde à vue. Les messages écrits servent de preuves : participer sciemment à un groupement qui **prépare** des violences ou des dégradations est puni d'un an de prison et 15 000 € d'amende, même si rien n'a eu lieu.[^cp-222-14-2] Dans les groupes : **logistique, entraide, infos publiques**. Le reste ne s'écrit pas.

!!! tip "Ce guide est public : adaptez-le"

    La police peut le lire aussi, et ce n'est pas un problème : votre sécurité ne repose pas sur le secret de la méthode, mais sur ce qui n'est écrit nulle part ici (qui est dans quel groupe, vos identifiants, le registre, les lieux de rencontre, qui sont vos RH et vos gardien·nes). **Changez les noms de rôles, de libellés et la nomenclature des groupes** plutôt que de reprendre ceux du guide : sur un téléphone saisi, ils ne désigneront pas d'emblée vos personnes clés.

## Les groupes

<div class="flow flow--funnel" markdown>

1. **Groupe public** (un par ville) → on y entre par le **lien du groupe public** (seule exception : il ne contient rien de sensible) ou par ajout direct d'un·e secrétaire ou d'un·e recruteur·se ; seul·es les admins (gardien·nes et secrétaires) écrivent : annonces, date, lieu déclaré, liens vers les guides.
    - **Pour passer au groupe sas** : faire [ses réglages](signal-membres.md#vos-reglages), se faire connaître d'un·e recruteur·se, écrire en privé à un·e secrétaire (par nom d'utilisateur) pour être ajouté·e à un [groupe sas](signal-recrutement.md#le-groupe-sas) annoncé dans le groupe public, avec sa date et sa tranche horaire, ou [en proposer un](signal-recrutement.md#proposer-une-date-une-heure-et-un-lieu).
2. **Groupe sas** (temporaire) → proposé par **n'importe quel membre du groupe public**, créé et [annoncé par un·e secrétaire](signal-recrutement.md#proposer-une-date-une-heure-et-un-lieu), pour **[une rencontre en vrai](signal-recrutement.md#la-rencontre-en-vrai-etape-par-etape)**, puis, au besoin, un rendez-vous à une action organisée par d'autres ; on n'y écrit que l'heure et le lieu, et il reste ouvert tant que des personnes attendent une décision.
    - **Pour passer au groupe de confiance** : [rencontre en vrai](signal-recrutement.md#la-rencontre-en-vrai-etape-par-etape) avec un·e secrétaire (réglages, code QR scanné, [contrôles](signal-recrutement.md#ce-quon-verifie-a-la-rencontre)), {{ default("actions") }} où des membres vérifié·es vous observent, **un·e garant·e**, puis le second contrôle des RH, qui vous ajoutent au groupe de confiance **par nom d'utilisateur**, depuis le sas (voir [les voir agir](signal-valider.md#recruter-a-porte-ouverte-les-voir-agir)).
3. **Groupe de confiance** (vérifié, `MVT-VIL-4K9-General`) → logistique, entraide, infos publiques ; [rien d'illégal](signal-membres.md#dans-les-groupes).
    - **Pour passer à un sous-groupe** : un besoin réel dans l'équipe, une période dans le groupe de confiance, et **deux garant·es** si le sous-groupe est sensible ; le ou la gardien·ne du sous-groupe ajoute.
4. **Sous-groupes par thème**, dans la même famille (même identifiant) → chacun ne voit que ce qui concerne son équipe :
    - `4K9-Medic`
    - `4K9-Legal`
    - `4K9-Logistique`

</div>

Le **groupe de confiance et ses sous-groupes** forment les **groupes vérifiés**, et une **famille** qui partage le même identifiant (voir [nommer les groupes](signal-creer.md#nommer-les-groupes)). Une personne malintentionnée entrée dans un sous-groupe ne voit pas les autres. À côté de l'entonnoir, le [groupe temporaire](signal-gerer.md#le-groupe-temporaire), pour une journée d'action ou une mobilisation, ne mène nulle part : il est jetable.

**Deux portes pour entrer dans le groupe de confiance** : la [**voie ouverte**](signal-valider.md#recruter-a-porte-ouverte-les-voir-agir) (groupe public, sas, se voir en action, garant·es, second contrôle des RH) et la [**cooptation**](signal-valider.md#recruter-par-cooptation-un-membre-verifie-propose) (un membre vérifié propose quelqu'un qu'il connaît, souvent le jour même). Voir [les deux portes](signal-valider.md#deux-portes-pour-entrer-dans-le-groupe-de-confiance) : schéma, tableau et détail de chaque parcours.

## Les rôles

Personne n'a tous les rôles, et les rôles **tournent**. Et **aucun groupe ne réunit toutes les personnes clés** (voir [se coordonner](signal-gerer.md#se-coordonner)). Pour filtrer selon votre rôle et votre besoin : [Trouver ce qui concerne votre rôle](groupes-signal.md#trouver-ce-qui-concerne-votre-role).

<a id="roles-organisation"></a>

### Rôles d'organisation des groupes Signal

Ces rôles font fonctionner le réseau Signal (recrutement, accueil, modération, sécurité) :

| Rôle | Ce qu'il fait | Ce qu'il ne fait pas | Admin dans Signal | Pour en savoir plus |
| --- | --- | --- | --- | --- |
| **Recruteur·se** | Parle du mouvement en manif, sur les ronds-points, en réunion publique ; oriente vers le groupe public et les groupes sas | Valider ; être garant·e de ses propres recrues ; noter quoi que ce soit sur elles | Non | [Recruteur·ses et secrétaires](signal-recrutement.md#recruteurses-et-secretaires) · [Proposer une date et un lieu](signal-recrutement.md#proposer-une-date-une-heure-et-un-lieu) · [Vos réglages](signal-membres.md#vos-reglages) |
| **Secrétaire** (membre déjà vérifié·e) | **Coordonne la rencontre de bout en bout** : annonce le groupe sas dans le groupe public, y vient, aide chacun·e à régler Signal ; **valide** quand les conditions sont réunies ; nettoie le groupe sas et y ajoute les RH ; reste le ou la référent·e des nouvelles personnes | Valider sans garant·e ; **ajouter quelqu'un au groupe de confiance** (ce sont les RH qui ajoutent) ; tenir une liste de présence | Du groupe sas qu'il ou elle anime, et du groupe public pour y annoncer les rencontres | [Parcours Secrétaire (schéma)](signal-recrutement.md#parcours-secretaire) · [Proposer une date et un lieu](signal-recrutement.md#proposer-une-date-une-heure-et-un-lieu) · [La rencontre en vrai](signal-recrutement.md#la-rencontre-en-vrai-etape-par-etape) · [Ce qu'on vérifie](signal-recrutement.md#ce-quon-verifie-a-la-rencontre) · [Nettoyer le sas](signal-recrutement.md#nettoyer-le-groupe-sas-apres-la-rencontre) · [Valider](signal-valider.md#valider-la-confiance-graduee) |
| **RH** (« ressources humaines ») | Comme au travail : font le **second contrôle** des personnes validées et les **ajoutent** au groupe de confiance ; reçoivent les doutes ; décident des retraits à deux ({{ default("decision_delay") }} après une [pause préventive](signal-groupe-compromis.md#pause-preventive-en-cas-de-doute)) ; tranchent quand un·e secrétaire hésite | Organiser les groupes sas ; décider seul·e d'un retrait ; être gardien·nes de tous les groupes | Oui, du groupe de confiance | [Parcours RH (schéma)](signal-recrutement.md#parcours-rh) · [Valider](signal-valider.md#valider-la-confiance-graduee) · [Pause préventive](signal-groupe-compromis.md#pause-preventive-en-cas-de-doute) · [Retrait conservatoire](signal-groupe-compromis.md#retrait-conservatoire) · [Groupe compromis](signal-groupe-compromis.md) |
| **Gardien·ne** | Garde les clés d'un groupe : **veille sur sa configuration** (délai d'effacement, permissions, aucun lien sauf pour le groupe public), ajoute et retire ; **ouvre l'œil** sur les arrivées et les interactions étranges et les signale aux RH. Les RH sont gardien·nes du groupe de confiance | Ajouter quelqu'un qui n'a pas été validé ; partir en action avec son téléphone de gardien·ne | Oui, au moins deux par groupe | [Nommer et registre](signal-creer.md#nommer-les-groupes) · [Régler les groupes](signal-creer.md#regler-les-groupes) · [Créer ou diviser](signal-creer.md#quand-creer-ou-diviser-un-groupe) · [Libellés de rôle](signal-gerer.md#libelles-de-role) · [Fermer un groupe](signal-gerer.md#fermer-un-groupe) · [Groupe compromis](signal-groupe-compromis.md) |
| **Agent de liaison** | Transmet un lieu, une heure, une décision entre familles dans un groupe de liaison dédié | Être dans deux familles ; être RH ou gardien·ne ; transmettre une liste de membres ou des identités | Non (2 gardien·nes de familles différentes) | [Relier plusieurs familles](signal-gerer.md#relier-plusieurs-familles) · [Régler les groupes](signal-creer.md#regler-les-groupes) |
| **Modération** | Rappelle la [charte](signal-modeles.md#charte-complete), recadre en privé | Accuser quelqu'un dans le groupe | Non | [Charte complète](signal-modeles.md#charte-complete) · [Dans les groupes](signal-membres.md#dans-les-groupes) · [Pause préventive](signal-groupe-compromis.md#pause-preventive-en-cas-de-doute) |
| **Référent·e « groupe perdu »** | Déclenche la [procédure « groupe compromis »](signal-groupe-compromis.md), prévient la [legal team locale](../annuaire/index.md?tags=antirepression) | Commenter une arrestation par écrit | Selon les groupes | [Que faire ?](signal-groupe-compromis.md#que-faire) · [Retrait conservatoire](signal-groupe-compromis.md#retrait-conservatoire) · [Cas A](signal-groupe-compromis.md#cas-a-on-sait-par-ou-ca-fuit) · [Cas B : déménager](signal-groupe-compromis.md#cas-b-on-ne-sait-pas-demenager) |

<a id="roles-en-manif"></a>

### Rôles utiles en manif

Les rôles exercés en manifestation (`Medic`, `Legal`, `Veille`, protection et désescalade, documentation…) sont décrits dans [Les rôles dans une mobilisation](roles.md), avec ce que chacun fait, ce qu'il ne fait pas, et s'il se joue sur place ou à distance. Chacun s'appuie sur un sous-groupe Signal du même nom.

### Vocabulaire et concepts clés

- **Garant·e** : membre vérifié·e qui connaît vraiment une nouvelle personne (en dehors du groupe sas : ami·e, collègue, voisin·e, ou vue agir sur plusieurs actions) et se porte garant·e pour elle, en privé, auprès du ou de la secrétaire ([valider la confiance](signal-valider.md#valider-la-confiance-graduee), [les voir agir](signal-valider.md#recruter-a-porte-ouverte-les-voir-agir), [coopter](signal-valider.md#recruter-par-cooptation-un-membre-verifie-propose)).
- **Nom de militant·e** : le pseudo utilisé sur Signal et en vrai ([choisir son nom de militant·e](signal-membres.md#votre-nom-de-militante)).
- **Registre** : la liste, tenue par deux ou trois personnes hors des groupes, des groupes actifs et perdus, et de qui est dans quel groupe ([nommer les groupes et tenir le registre](signal-creer.md#nommer-les-groupes)).
- **Point de repli** : un lieu et un moment réguliers, convenus de vive voix, pour se retrouver si les groupes tombent ([si le groupe disparaît](signal-membres.md#si-le-groupe-disparait-ou-si-on-vous-retire)).
- **Retrait conservatoire** : retirer quelqu'un de ses groupes par précaution, par exemple quand il ou elle est interpellé·e ([retrait conservatoire](signal-groupe-compromis.md#retrait-conservatoire)).
- **Fuite** : la personne ou le téléphone par lequel quelqu'un d'extérieur accède à un groupe ([quand un groupe est-il compromis ?](signal-groupe-compromis.md#quand-un-groupe-est-il-compromis)).

## Dans ce guide

- [Vous êtes membre](signal-membres.md)
- [Recruter et rencontrer](signal-recrutement.md)
- [Valider](signal-valider.md)
- [Créer et régler les groupes](signal-creer.md)
- [Tenir les groupes](signal-gerer.md)
- [Groupe compromis](signal-groupe-compromis.md)
- [Modèles à copier-coller](signal-modeles.md)
- [Fiches mémo à imprimer](../fiches/signal.md)

## Quand Signal ne suffit pas

- **Sans réseau** : {{ res("briar") }} fonctionne en Bluetooth ou wifi local, sans numéro de téléphone ([communiquer pendant une manif](communiquer.md#comparatif)).[^briar-how]
- **Sans numéro de téléphone** : {{ res("element") }} (Matrix) fonctionne avec un simple identifiant, et convient à de grands espaces organisés en salons.
- **Documents partagés** : {{ res("cryptpad") }}, chiffré, sans compte obligatoire.
- **Le plus sensible** : en vrai, sans téléphone (laissés dans une autre pièce ou éteints et à distance).

[:octicons-arrow-right-24: Organiser une manifestation](organiser.md) · [:octicons-arrow-right-24: Communiquer pendant une manif](communiquer.md) · [:octicons-arrow-right-24: Téléphone](telephone.md)

[Suivant : Vous êtes membre :octicons-arrow-right-24:](signal-membres.md)

## Sources

Chaque note renvoie à la source de l'information. Les textes de loi évoluent : vérifiez la date de la source et, en cas de doute, demandez à un·e avocat·e.
