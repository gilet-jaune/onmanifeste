---
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
    - **Confiance graduée** : un·e **secrétaire vérifié·e**, **un·e garant·e** et un **second contrôle des RH** pour le groupe de confiance ; **deux garant·es** pour un sous-groupe sensible. Jamais par un lien ni un code QR de groupe, **sauf pour le groupe public** (annonces, rien de sensible) : on ajoute les personnes **par nom d'utilisateur**, depuis une conversation privée.
    - **Aucune vérification n'arrête une fuite déterminée** : n'écrivez rien que vous ne voudriez pas voir lu en garde à vue.
    - Avant d'entrer : un **nom de militant·e** court, utilisé aussi en vrai ; numéro caché à **tout le monde** ; messages **éphémères**, dans chaque groupe dès sa création.
    - Quelqu'un se fait embarquer : on le **retire de tous ses groupes tout de suite**, par précaution.
    - Groupe compromis : si l'on **sait par où ça fuit**, on retire la fuite et le groupe continue ; sinon, on **déménage** et on réinvite **un par un**.

Une messagerie chiffrée comme {{ res("signal") }} protège vos messages pendant leur transport, pas contre une personne présente dans le groupe ni contre un téléphone saisi. L'organisation des groupes, elle, peut limiter ce qu'une fuite ou une saisie révèle.

!!! warning "Chiffrer est légal, mais cela peut être retourné contre vous"

    Utiliser Signal n'est pas une infraction. Dans l'affaire dite du 8 décembre, la DGSI décrit les mis en cause comme ayant adopté un « comportement clandestin » avec des applications chiffrées, Tails et Tor, et cette formule revient très souvent dans le dossier, selon La Quadrature du Net, qui l'a analysé avant le procès.[^lqdn-8-decembre] Les sept prévenus ont été condamnés en décembre 2023 pour association de malfaiteurs terroriste.[^politis-8-decembre] Aucune de ces deux sources ne dit que le chiffrement a été jugé comme une infraction : il est cité comme **indice**. Ce dossier est un cas grave et très éloigné d'une manifestation ordinaire, mais il montre qu'on peut vous relire : **n'écrivez rien que vous ne voudriez pas voir cité**, et ne comptez pas sur le chiffrement pour vous protéger d'une lecture hostile.

!!! info "Par où commencer ?"

    - **Vous rejoignez des groupes** → [les groupes](groupes-signal.md#les-groupes), puis la [partie 1 : membres](signal-membres.md).
    - **Vous cherchez un rôle en manif** (medic, legal, logistique...) → [les rôles utiles en manif](groupes-signal.md#roles-utiles-en-manif).
    - **Vous organisez** (secrétaire, RH, gardien·ne) → [les groupes](groupes-signal.md#les-groupes), [les rôles d'organisation](groupes-signal.md#roles-dorganisation-des-groupes-signal), puis la [partie 2 : organiser](signal-recrutement.md).
    - **Quelqu'un vient d'être arrêté, ou un groupe est compromis** → [partie 3 : groupe compromis](signal-groupe-compromis.md).
    - **Vous organisez et voulez aller droit à votre rôle** (secrétaire, RH, gardien·ne, recruteur·se) → le [menu par rôle](groupes-signal.md#trouver-ce-qui-concerne-votre-role).
    - **Vous voulez juste la charte** → [modèles à copier-coller](signal-modeles.md).

!!! warning "Partez du principe que quelqu'un lit"

    Une rencontre en vrai écarte les curieux, les trolls et l'extrême droite, pas une personne malintentionnée bien préparée (policier·e, journaliste, provocateur·rice) ni une personne qui parle après une garde à vue. Les messages écrits servent de preuves : participer sciemment à un groupement qui **prépare** des violences ou des dégradations est puni d'un an de prison et 15 000 € d'amende, même si rien n'a eu lieu.[^cp-222-14-2] Dans les groupes : **logistique, entraide, infos publiques**. Le reste ne s'écrit pas.

!!! tip "Ce guide est public : adaptez-le"

    La police peut le lire aussi, et ce n'est pas un problème : votre sécurité ne repose pas sur le secret de la méthode, mais sur ce qui n'est écrit nulle part ici (qui est dans quel groupe, vos identifiants, le registre, les lieux de rencontre, qui sont vos RH et vos gardien·nes). **Changez les noms de rôles, de libellés et la nomenclature des groupes** plutôt que de reprendre ceux du guide : sur un téléphone saisi, ils ne désigneront pas d'emblée vos personnes clés.

## Trouver ce qui concerne votre rôle

Vous organisez des groupes ? Dites quel est votre rôle (secrétaire, RH, gardien·ne, recruteur·se), puis ce que vous voulez faire : le menu vous emmène directement à la bonne partie de ce guide. Fonctionne **hors ligne**.

{% import "overrides/partials/parcours-tree.html" as pt with context %}

<div class="parcours" data-parcours data-embed data-up="../../" data-src="parcours-signal.json" data-key="parcours_signal" data-type-iam="Tapez quelques mots">
    <noscript><p>JavaScript est désactivé : voici tous les parcours.</p></noscript>
    {{ pt.tree('fr', parcours_signal, none, none, '../../', 3) }}
</div>

## Les groupes

<div class="flow flow--funnel" markdown>

1. **Groupe public** (un par ville) → on y entre par le **lien du groupe public** (seule exception : il ne contient rien de sensible) ou par ajout direct d'un·e secrétaire ou d'un·e recruteur·se ; seul·es les admins (gardien·nes et secrétaires) écrivent : annonces, date, lieu déclaré, liens vers les guides.
    - **Pour passer au groupe sas** : faire ses réglages, se faire connaître d'un·e recruteur·se, écrire en privé à un·e secrétaire (par nom d'utilisateur) pour être ajouté·e à un groupe sas annoncé dans le groupe public, avec sa date et sa tranche horaire, ou en proposer un.
2. **Groupe sas** (temporaire) → proposé par **n'importe quel membre du groupe public**, créé et annoncé par un·e secrétaire, pour organiser **une** rencontre en vrai ; on n'y écrit que l'heure et le lieu.
    - **Pour passer au groupe de confiance** : rencontre en vrai avec un·e secrétaire (réglages, code QR scanné), **un·e garant·e**, puis le second contrôle des RH, qui vous ajoutent au groupe de confiance **par nom d'utilisateur**, depuis le groupe sas nettoyé.
3. **Groupe de confiance** (vérifié, `MVT-VIL-4K9-General`) → logistique, entraide, infos publiques ; rien d'illégal.
    - **Pour passer à un sous-groupe** : un besoin réel dans l'équipe, une période dans le groupe de confiance, et **deux garant·es** si le sous-groupe est sensible ; le ou la gardien·ne du sous-groupe ajoute.
4. **Sous-groupes par thème**, dans la même famille (même identifiant) → chacun ne voit que ce qui concerne son équipe :
    - `4K9-Medic`
    - `4K9-Legal`
    - `4K9-Logistique`

</div>

Le **groupe de confiance et ses sous-groupes** forment les **groupes vérifiés**, et une **famille** qui partage le même identifiant (voir [nommer les groupes](signal-gerer.md#nommer-les-groupes)). Une personne malintentionnée entrée dans un sous-groupe ne voit pas les autres. À côté de l'entonnoir, le [groupe temporaire](signal-gerer.md#le-groupe-temporaire), pour une journée d'action ou une mobilisation, ne mène nulle part : il est jetable.

**Deux portes pour entrer dans le groupe de confiance :**

=== "Schéma"

    <div class="grid" markdown>

    <div class="flow" markdown>

    **La voie ouverte**

    1. **Groupe public**
    2. **Groupe sas** et rencontre avec un·e secrétaire
    3. **Un·e garant·e** se manifeste
    4. **Second contrôle des RH**
    5. **Groupe de confiance**

    </div>

    <div class="flow" markdown>

    **La cooptation**

    1. **Un membre vérifié propose** quelqu'un qu'il connaît
    2. **Rencontre avec un·e secrétaire**, en tête-à-tête ou sur place
    3. **Le membre qui propose est le ou la garant·e**
    4. **Second contrôle des RH**
    5. **Groupe de confiance**

    </div>

    </div>

=== "Tableau"

    | Porte | **La voie ouverte** | **La cooptation** |
    | --- | --- | --- |
    | **Pour qui** | Une personne que personne ne connaît encore | Une personne qu'un membre vérifié connaît déjà (ami·e, collègue, syndicat, vue agir sur plusieurs actions) |
    | **Par où** | Groupe public, puis groupe sas et rencontre | Le membre vérifié la **propose** directement à un·e secrétaire, sans passer par le groupe public ni le groupe sas |
    | **Rencontre** | Au groupe sas, avec le ou la secrétaire | En tête-à-tête, ou sur place pendant une action |
    | **Garant·e** | À trouver : quelqu'un qui la connaît, ou plusieurs actions communes | Le membre qui l'a proposée |
    | **Ajout** | Par les RH, depuis le groupe sas nettoyé | Par les RH, **par nom d'utilisateur**, depuis une conversation privée (aucun lien) |
    | **Durée** | De quelques jours à quelques semaines | Le jour même ou le lendemain |

Dans les deux cas, les mêmes contrôles : code QR scanné, réglages faits, un·e garant·e et le second contrôle des RH (voir [valider](signal-recrutement.md#valider-la-confiance-graduee)).

## Les rôles

Personne n'a tous les rôles, et les rôles **tournent**. Et **aucun groupe ne réunit toutes les personnes clés** (voir [se coordonner](signal-gerer.md#se-coordonner)).

<a id="roles-organisation"></a>

### Rôles d'organisation des groupes Signal

Ces rôles font fonctionner le réseau Signal (recrutement, accueil, modération, sécurité) :

| Rôle | Ce qu'il fait | Ce qu'il ne fait pas | Admin dans Signal |
| --- | --- | --- | --- |
| **Recruteur·se** | Parle du mouvement en manif, sur les ronds-points, en réunion publique ; oriente vers le groupe public et les groupes sas | Valider ; être garant·e de ses propres recrues ; noter quoi que ce soit sur elles | Non |
| **Secrétaire** (membre déjà vérifié·e) | **Coordonne la rencontre de bout en bout** : annonce le groupe sas dans le groupe public, y vient, aide chacun·e à régler Signal ; **valide** quand les conditions sont réunies ; nettoie le groupe sas et y ajoute les RH ; reste le ou la référent·e des nouvelles personnes | Valider sans garant·e ; **ajouter quelqu'un au groupe de confiance** (ce sont les RH qui ajoutent) ; tenir une liste de présence | Du groupe sas qu'il ou elle anime, et du groupe public pour y annoncer les rencontres |
| **RH** (« ressources humaines ») | Comme au travail : font le **second contrôle** des personnes validées et les **ajoutent** au groupe de confiance ; reçoivent les doutes ; décident des retraits à deux ; tranchent quand un·e secrétaire hésite | Organiser les groupes sas ; décider seul·e d'un retrait ; être gardien·nes de tous les groupes | Oui, du groupe de confiance |
| **Gardien·ne** | Garde les clés d'un groupe : **veille sur sa configuration** (délai d'effacement, permissions, aucun lien sauf pour le groupe public), ajoute et retire ; **ouvre l'œil** sur les arrivées et les interactions étranges et les signale aux RH. Les RH sont gardien·nes du groupe de confiance | Ajouter quelqu'un qui n'a pas été validé ; partir en action avec son téléphone de gardien·ne | Oui, au moins deux par groupe |
| **Modération** | Rappelle la charte, recadre en privé | Accuser quelqu'un dans le groupe | Non |
| **Référent·e « groupe perdu »** | Déclenche la [procédure de la partie 3](signal-groupe-compromis.md), prévient la [legal team locale](../annuaire/index.md?tags=antirepression) | Commenter une arrestation par écrit | Selon les groupes |

<a id="roles-en-manif"></a>

### Rôles utiles en manif

Ces rôles de manif s'exercent en manifestation selon vos besoins. Ils se répartissent **entre les membres déjà présents**, selon les capacités et la disponibilité de chacun·e, et peuvent changer d'une action à l'autre : on ne recrute pas pour un rôle. Chacun s'appuie sur un sous-groupe (`Medic`, `Legal`…) et sur un guide du site :

| Rôle | Ce qu'il fait | Ce qu'il ne fait pas | Pour en savoir plus |
| --- | --- | --- | --- |
| **Medic** | Premiers secours : gaz, blessures, malaises | Gestes médicaux (suture, retrait d'éclats) ; donner des médicaments | [Premiers secours](premiers-secours.md) |
| **Legal** | Observation des interpellations, contacts avocat·es, suivi des personnes arrêtées | Remplacer un·e avocat·e | [Garde à vue](garde-a-vue.md) |
| **Protection et désescalade** | Repère les tensions, dialogue, aide à sortir d'une nasse, accompagne les personnes vulnérables | S'équiper de ce qui peut passer pour une arme ; répondre à la provocation | [Dispersion, sommations et nasse](dispersion.md) · [Kit et tenue de manif](kit-manif.md) |
| **Documentation** | Filme les interpellations et les violences, conserve les preuves | Publier sans flouter les manifestant·es | [Filmer les forces de l'ordre](filmer.md) |
| **Soutien** | Écoute et accompagne après un moment difficile | Jouer le ou la thérapeute | [Santé mentale](sante-mentale.md) |
| **Logistique** | Transport, nourriture, eau, stockage | Entreposer du matériel qui peut passer pour une arme | [Venir et repartir](venir-repartir.md) |
| **Construction** | Banderoles, pancartes, matériel | Matériel qui peut passer pour une arme | [Pancartes, banderoles, drapeaux et tracts](faire-sa-pancarte.md) · [Kit et tenue de manif](kit-manif.md) |
| **Communication** | Visuels, annonces, réseaux | Reprendre du contenu d'extrême droite | [Communiquer pendant une manif](communiquer.md) · [Réseaux sociaux](reseaux-sociaux.md) |

### Vocabulaire et concepts clés

- **Garant·e** : membre vérifié·e qui connaît vraiment une nouvelle personne (en dehors du groupe sas : ami·e, collègue, voisin·e, ou vue agir sur plusieurs actions) et se porte garant·e pour elle, en privé, auprès du ou de la secrétaire.
- **Nom de militant·e** : le pseudo utilisé sur Signal et en vrai.
- **Registre** : la liste, tenue par deux ou trois personnes hors des groupes, des groupes actifs et perdus, et de qui est dans quel groupe.
- **Point de repli** : un lieu et un moment réguliers, convenus de vive voix, pour se retrouver si les groupes tombent.
- **Retrait conservatoire** : retirer quelqu'un de ses groupes par précaution, par exemple quand il ou elle est interpellé·e.
- **Fuite** : la personne ou le téléphone par lequel quelqu'un d'extérieur accède à un groupe.

## Dans ce guide

- [Vous êtes membre](signal-membres.md)
- [Recruter et valider](signal-recrutement.md)
- [Tenir les groupes](signal-gerer.md)
- [Groupe compromis](signal-groupe-compromis.md)
- [Modèles à copier-coller](signal-modeles.md)

## Quand Signal ne suffit pas

- **Sans réseau** : {{ res("briar") }} fonctionne en Bluetooth ou wifi local, sans numéro de téléphone ([communiquer pendant une manif](communiquer.md#comparatif)).[^briar-how]
- **Sans numéro de téléphone** : {{ res("element") }} (Matrix) fonctionne avec un simple identifiant, et convient à de grands espaces organisés en salons.
- **Documents partagés** : {{ res("cryptpad") }}, chiffré, sans compte obligatoire.
- **Le plus sensible** : en vrai, sans téléphone (laissés dans une autre pièce ou éteints et à distance).

[:octicons-arrow-right-24: Organiser une manifestation](organiser.md) · [:octicons-arrow-right-24: Communiquer pendant une manif](communiquer.md) · [:octicons-arrow-right-24: Téléphone](telephone.md)

## Sources

Chaque note renvoie à la source de l'information. Les textes de loi évoluent : vérifiez la date de la source et, en cas de doute, demandez à un·e avocat·e.
