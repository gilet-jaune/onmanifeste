---
review: juridique
review_status: pending
tags:
    - guides
    - organiser
    - téléphone
    - schéma
---

# Groupes Signal : s'organiser sans se faire infiltrer

!!! abstract "L'essentiel"

    - **Groupe public** d'annonces → **groupe sas** pour se rencontrer en vrai (proposé par n'importe qui, annoncé par un·e secrétaire) → **groupe de confiance** vérifié → **sous-groupes** par équipe.
    - **Confiance graduée** : un·e **secrétaire vérifié·e**, **un·e garant·e** et un **second contrôle des RH** pour le groupe de confiance ; **deux garant·es** pour un sous-groupe sensible. Jamais par un lien ni un code QR de groupe, **sauf pour le groupe public** (annonces, rien de sensible) : on ajoute les personnes **par nom d'utilisateur**, depuis une conversation privée.
    - **Aucune vérification n'arrête un·e infiltré·e déterminé·e** : n'écrivez rien que vous ne voudriez pas voir lu en garde à vue.
    - Avant d'entrer : un **nom de militant·e** court, utilisé aussi en vrai ; numéro caché à **tout le monde** ; messages **éphémères**, dans chaque groupe dès sa création.
    - Quelqu'un se fait embarquer : on le **retire de tous ses groupes tout de suite**, par précaution.
    - Groupe compromis : si l'on **sait par où ça fuit**, on retire la fuite et le groupe continue ; sinon, on **déménage** et on réinvite **un par un**.

Une messagerie chiffrée comme {{ res("signal") }} protège vos messages pendant leur transport, pas contre une personne présente dans le groupe ni contre un téléphone saisi. L'organisation des groupes, elle, peut limiter ce qu'une infiltration ou une saisie révèle.

!!! info "Par où commencer ?"

    - **Vous rejoignez des groupes** → [les groupes](groupes-signal.md#les-groupes), puis la [partie 1 : membres](groupes-signal.md#partie-1-membres).
    - **Vous organisez** (secrétaire, RH, gardien·ne) → [les groupes](groupes-signal.md#les-groupes), [les rôles](groupes-signal.md#les-roles), puis la [partie 2 : organiser](groupes-signal.md#partie-2-organiser).
    - **Quelqu'un vient d'être arrêté, ou un groupe est compromis** → [partie 3 : groupe compromis](groupes-signal.md#partie-3-groupe-compromis).
    - **Vous organisez et voulez aller droit à votre rôle** (secrétaire, RH, gardien·ne, recruteur·se) → le [menu par rôle](groupes-signal.md#trouver-ce-qui-concerne-votre-role).
    - **Vous voulez juste la charte** → [modèles à copier-coller](groupes-signal.md#modeles-a-copier-coller).

!!! warning "Partez du principe que quelqu'un lit"

    Une rencontre en vrai écarte les curieux, les trolls et l'extrême droite, pas un·e policier·e infiltré·e bien préparé·e ni une personne qui parle après une garde à vue. Les messages écrits servent de preuves : participer sciemment à un groupement qui **prépare** des violences ou des dégradations est puni d'un an de prison et 15 000 € d'amende, même si rien n'a eu lieu.[^cp-222-14-2] Dans les groupes : **logistique, entraide, infos publiques**. Le reste ne s'écrit pas.

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

Le **groupe de confiance et ses sous-groupes** forment les **groupes vérifiés**, et une **famille** qui partage le même identifiant (voir [nommer les groupes](groupes-signal.md#nommer-les-groupes)). Une personne infiltrée dans un sous-groupe ne voit pas les autres. À côté de l'entonnoir, le [groupe temporaire](groupes-signal.md#le-groupe-temporaire), pour une journée d'action ou une mobilisation, ne mène nulle part : il est jetable.

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

Dans les deux cas, les mêmes contrôles : code QR scanné, réglages faits, un·e garant·e et le second contrôle des RH (voir [valider](groupes-signal.md#valider-la-confiance-graduee)).

## Les rôles

Personne n'a tous les rôles, et les rôles **tournent**. Et **aucun groupe ne réunit toutes les personnes clés** (voir [se coordonner](groupes-signal.md#se-coordonner)).

**Rôles d'organisation des groupes Signal**

| Rôle | Ce qu'il fait | Ce qu'il ne fait pas | Admin dans Signal |
| --- | --- | --- | --- |
| **Recruteur·se** | Parle du mouvement en manif, sur les ronds-points, en réunion publique ; oriente vers le groupe public et les groupes sas | Valider ; être garant·e de ses propres recrues ; noter quoi que ce soit sur elles | Non |
| **Secrétaire** (membre déjà vérifié·e) | **Coordonne la rencontre de bout en bout** : annonce le groupe sas dans le groupe public, y vient, aide chacun·e à régler Signal ; **valide** quand les conditions sont réunies ; nettoie le groupe sas et y ajoute les RH ; reste le ou la référent·e des nouvelles personnes | Valider sans garant·e ; **ajouter quelqu'un au groupe de confiance** (ce sont les RH qui ajoutent) ; tenir une liste de présence | Du groupe sas qu'il ou elle anime, et du groupe public pour y annoncer les rencontres |
| **RH** (« ressources humaines ») | Comme au travail : font le **second contrôle** des personnes validées et les **ajoutent** au groupe de confiance ; reçoivent les doutes ; décident des retraits à deux ; tranchent quand un·e secrétaire hésite | Organiser les groupes sas ; décider seul·e d'un retrait ; être gardien·nes de tous les groupes | Oui, du groupe de confiance |
| **Gardien·ne** | Garde les clés d'un groupe : **veille sur sa configuration** (délai d'effacement, permissions, aucun lien sauf pour le groupe public), ajoute et retire ; **ouvre l'œil** sur les arrivées et les interactions étranges et les signale aux RH. Les RH sont gardien·nes du groupe de confiance | Ajouter quelqu'un qui n'a pas été validé ; partir en action avec son téléphone de gardien·ne | Oui, au moins deux par groupe |
| **Modération** | Rappelle la charte, recadre en privé | Accuser quelqu'un dans le groupe | Non |
| **Référent·e « groupe perdu »** | Déclenche la [procédure de la partie 3](groupes-signal.md#partie-3-groupe-compromis), prévient la [legal team locale](../annuaire/index.md?tags=antirepression) | Commenter une arrestation par écrit | Selon les groupes |

**Rôles utiles en manif**, selon vos besoins : chacun s'appuie sur un sous-groupe (`Medic`, `Legal`…) et sur un guide du site.

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

**Quelques mots encore :**

- **Garant·e** : membre vérifié·e qui connaît vraiment une nouvelle personne (en dehors du groupe sas : ami·e, collègue, voisin·e, ou vue agir sur plusieurs actions) et se porte garant·e pour elle, en privé, auprès du ou de la secrétaire.
- **Nom de militant·e** : le pseudo utilisé sur Signal et en vrai.
- **Registre** : la liste, tenue par deux ou trois personnes hors des groupes, des groupes actifs et perdus, et de qui est dans quel groupe.
- **Point de repli** : un lieu et un moment réguliers, convenus de vive voix, pour se retrouver si les groupes tombent.
- **Retrait conservatoire** : retirer quelqu'un de ses groupes par précaution, par exemple quand il ou elle est interpellé·e.
- **Fuite** : la personne ou le téléphone par lequel quelqu'un d'extérieur accède à un groupe.

## Partie 1 : membres

### Votre parcours

<div class="flow" markdown>

1. **Se préparer** → nom de militant·e, numéro caché, messages éphémères (voir ci-dessous).
2. **Rejoindre le groupe public** → lire les annonces.
3. **Rejoindre un groupe sas** annoncé dans le groupe public, ou en proposer un à un·e secrétaire, pour se rencontrer en vrai. Si un membre vérifié vous connaît déjà, il peut aussi vous **coopter** : il vous propose directement à un·e secrétaire.
4. **Venir aux rencontres et aux actions** → un·e secrétaire vérifié·e vous aide à régler Signal et scanne le code QR de votre compte.
5. **Validation** → quand un·e membre vérifié·e qui vous connaît se porte garant·e auprès du ou de la secrétaire ; sinon, continuez à venir aux actions : c'est là qu'on apprend à se connaître.
6. **Rejoindre le groupe de confiance** → une personne des RH vous rejoint dans le groupe sas, vérifie votre profil, vous fait valider la [charte complète](#charte-complete), puis vous ajoute au groupe de confiance **par votre nom d'utilisateur** : aucun lien à demander ni à suivre.
7. **Vivre le groupe** → rien d'illégal par écrit ; un doute sur quelqu'un : les RH, en privé.
8. **Arrêté·e, téléphone perdu, groupe disparu** → voir plus bas.

</div>

### Votre nom de militant·e

Le même nom sur Signal **et en vrai**, en réunion comme en manif : on ne crie pas un vrai prénom dans un cortège, et deux noms différents finissent toujours par se mélanger.

- [ ] **Court et facile à prononcer** : deux syllabes, un prénom courant ou un mot simple (« Lou », « Max », « Tilleul »). Il doit se crier, se retenir et s'épeler sans effort.
- [ ] **Sans lien avec vous** : ni vos initiales, ni un surnom que vos proches ou vos collègues connaissent, ni un pseudo déjà utilisé ailleurs (réseaux sociaux, jeux, forums).
- [ ] **Unique dans le groupe** : vérifiez qu'il n'est pas déjà pris.
- [ ] Si besoin d'un nom complet (inscription, liste de covoiturage), un **faux nom de famille** tout aussi simple ; jamais votre vrai nom dans un groupe.
- [ ] **Ne demandez pas** le vrai nom des autres, et ne donnez pas le vôtre, même en confiance : ce qu'on ne sait pas, on ne peut pas le dire en garde à vue.

### Vos réglages

À faire **avant** d'entrer dans le premier groupe, groupe sas compris : une fois dedans, votre ancien profil a déjà été vu. Un·e secrétaire vous aide à la rencontre ; personne d'autre ne prend votre téléphone déverrouillé en main.

**Dans Signal**

- [ ] **Nom de profil** : votre nom de militant·e ; **pas de photo** de vous (ou une image neutre).[^signal-usernames]
- [ ] **Numéro caché à tout le monde** : Paramètres › Confidentialité › Numéro de téléphone › « Qui peut voir mon numéro » : **Personne** (c'est le réglage par défaut, mais votre numéro reste visible pour qui l'a déjà dans ses contacts), et « Qui peut me trouver grâce à mon numéro » : **Personne** (par défaut, tout le monde peut vérifier que votre numéro est sur Signal).[^signal-confidentialite-numero] Signal lui-même connaît votre numéro ; face à une réquisition, il indique ne pouvoir fournir que la date d'inscription et la dernière connexion.[^signal-bigbrother]
- [ ] **Nom d'utilisateur** (il se termine par au moins deux chiffres) pour être ajouté·e sans donner votre numéro.[^signal-usernames]
- [ ] **Messages éphémères par défaut** pour toutes les nouvelles conversations : Paramètres › Confidentialité › Délai avant disparition.[^signal-ephemeres]
- [ ] **Code PIN Signal et verrouillage de l'inscription** : le code PIN protège votre **compte** ; avec le verrouillage de l'inscription, personne ne peut réenregistrer votre numéro sur un autre téléphone sans lui.[^eff-signal]
- [ ] **Verrouillage de Signal** (Paramètres › Confidentialité › Verrouillage de l'écran) : l'appli se verrouille après un délai d'inactivité. Il n'a **pas de code à lui** : il reprend celui du téléphone (ou l'empreinte, le visage).[^eff-signal]
- [ ] **Masquer l'écran dans le sélecteur d'applis**, notifications **sans le contenu** des messages, et **aperçus de liens désactivés** (réglage « Générer des aperçus de liens »).[^eff-signal]
- [ ] **Pas de vrais noms dans votre carnet d'adresses** : si le numéro d'un·e camarade y est enregistré, Signal vous montre le nom du carnet, pas son nom de militant·e.[^signal-profils] Sur un téléphone saisi, ça relie les deux. Ajoutez-vous par **nom d'utilisateur** plutôt que par numéro, retirez les camarades de vos contacts, ou retirez à Signal l'accès aux contacts (réglages du téléphone › Signal › Contacts). Si vous voulez un repère, utilisez les **pseudos** de Signal, visibles par vous seul·e,[^signal-confidentialite-numero] avec le nom de militant·e, jamais le vrai nom.
- [ ] **Pas de sauvegarde de l'historique** des groupes dans le cloud ni sur un ordinateur partagé ; pas d'enregistrement automatique des photos dans la galerie.

**Sur le téléphone**

- [ ] **Code** de 6 chiffres minimum ou alphanumérique : c'est lui qui protège vos messages, puisque Signal le reprend. **Biométrie désactivée** avant une action, verrouillage rapide ([téléphone : verrouillage, code et saisie](telephone.md)).

### Dans les groupes

- [ ] **Rien d'illégal par écrit** : pas d'appel à la violence ni aux dégradations, pas de menace, même pour rire (voir l'encadré plus haut). Le sensible se dit en vrai, sans téléphone.
- [ ] **Pas de messages vocaux** : votre voix vous identifie, c'est une donnée biométrique,[^cnil-assistants-vocaux] et un vocal capte aussi les bruits autour de vous (lieu, autres voix). Il s'écoute en plus à voix haute, parfois près d'autres personnes. Écrivez.
- [ ] **Nettoyez les liens avant de les partager** : un lien copié depuis Instagram, TikTok, YouTube ou X contient souvent un identifiant de partage lié à **votre compte** (`?igsh=`, `?si=`, liens courts `vm.tiktok.com`…). Des outils publics permettent de retrouver qui l'a partagé.[^behindit] Supprimez tout ce qui suit le `?` ; pour un lien court, ouvrez-le d'abord, puis copiez l'adresse complète et nettoyez-la.
- [ ] **Floutez les visages** avant d'envoyer une photo, avec l'outil de floutage de Signal.[^signal-blur] Pas de vrais noms, d'adresses, de captures d'écran.
- [ ] **Pas de localisation en direct** : un lieu de rendez-vous se donne en vrai, ou au dernier moment dans le groupe sas.
- [ ] **Besoin d'aide ? Nommez quelqu'un** : « @Lou, tu peux t'occuper de la banderole samedi ? » plutôt que « quelqu'un peut… ? ». Plus un groupe est grand, moins chacun·e répond, sauf quand on nomme la personne.[^markey-2000][^darley-latane-1968] **Urgence** : le **15** ou le **112**, pas le groupe.
- [ ] **Libellé** : Signal permet d'afficher votre rôle à côté de votre nom, dans chaque groupe séparément ; mettez-le seulement si la charte le prévoit (voir [libellés de rôle](groupes-signal.md#libelles-de-role)).
- [ ] **Un doute sur quelqu'un** : les RH, en privé. Jamais d'accusation dans le groupe : une rumeur d'infiltration détruit un groupe plus sûrement qu'un·e infiltré·e.
- [ ] **Ne partagez jamais le lien ni le code QR d'un groupe sas, de confiance ou d'un sous-groupe** (seul le lien du groupe public se partage) : donnez votre **nom d'utilisateur** à la personne qui doit vous ajouter, et ajoutez les autres de la même façon. Un lien aperçu quelque part : signalez-le aux gardien·nes, qui le **désactivent tout de suite**.[^signal-lien-groupe]

### Si vous êtes arrêté·e ou perdez votre téléphone

1. **En garde à vue, ne parlez de personne** : vous avez le droit de garder le silence,[^sp-gav] et rien ne vous oblige à parler des autres, de vos groupes ni de leurs membres ([garde à vue](garde-a-vue.md)).
2. **Prévenez les RH** dès que possible, en vrai ou par un·e camarade : vous serez retiré·e des groupes par précaution, rien de personnel.
3. **Récupérez votre compte** sur un autre téléphone avec votre numéro et votre code PIN, puis supprimez les **appareils associés** inconnus ([téléphone : si votre téléphone est saisi ou perdu](telephone.md#si-votre-telephone-est-saisi-ou-perdu)).
4. **Au débrief**, dites tout : téléphone pris, déverrouillé, code donné, combien de temps hors de votre vue. Ce n'est pas une faute, c'est ce qui permet de protéger les autres.

### Si le groupe disparaît ou si on vous retire

- [ ] **Prévoyez avant** : retenez, sans l'écrire, le nom de militant·e de votre secrétaire ou d'une personne des RH, et un **point de repli** convenu de vive voix (un lieu et un moment réguliers : marché, assemblée, rond-point).
- [ ] **Pas de panique** : un retrait est souvent une précaution (vous étiez près d'une interpellation, un téléphone a été perdu).
- [ ] **Ne quittez pas un groupe de vous-même** parce qu'il semble compromis : attendez la consigne des gardien·nes ou des RH. Tant que vous y êtes, vous êtes sur la liste des personnes à réinviter.
- [ ] **Ne créez pas de groupe de remplacement** et n'en parlez pas sur un autre réseau ; allez au point de repli ou contactez les RH.
- [ ] **N'acceptez une invitation que d'un·e gardien·ne ou d'un·e secrétaire que vous connaissez**, dans un groupe qui suit la nomenclature ; dans le doute, vérifiez en vrai. Une invitation venue d'un inconnu, ou postée dans l'ancien groupe, est un piège possible.

### Partir proprement

1. **Quittez le groupe** : paramètres du groupe › Quitter le groupe.
2. **Supprimez la conversation** : supprimer la conversation ne fait pas quitter le groupe, et quitter ne supprime pas l'historique.[^signal-supprimer]
3. **Supprimez ce qui reste ailleurs** : photos et fichiers enregistrés, captures d'écran, et la conversation sur vos appareils associés (Signal Desktop).
4. **Prévenez les RH** pour la mise à jour du registre.

## Partie 2 : organiser

### Le recrutement de bout en bout, rôle par rôle

| Étape | Nouvelle personne | Secrétaire | RH | Gardien·ne |
| --- | --- | --- | --- | --- |
| **1. Avant** | Rejoint le groupe public ; fait ses réglages (nom de militant·e, numéro caché) | — | — | Règle les groupes **vides** : délai d'effacement, permissions, aucun lien (sauf pour le groupe public) |
| **2. Groupe sas** | Rejoint un groupe sas annoncé dans le groupe public (date et tranche horaire), ou en propose un au ou à la secrétaire, qui l'annonce (délai d'effacement réglé avant toute invitation ; ajouté·e par le ou la secrétaire, par nom d'utilisateur) | Annonce le groupe sas dans le groupe public (date, tranche horaire) ; en est admin ; **ajoute** les personnes qui s'y sont inscrites en privé ; poste le lieu la veille, sans plus ajouter personne, puis le jour même | — | — |
| **3. Rencontre** | Vient, sans téléphone sur la table ; fait ses réglages **avec** le ou la secrétaire | Anime ; aide aux réglages ; **scanne le code QR du numéro de sécurité** de chaque compte, qui est alors marqué « vérifié » sur son téléphone[^eff-signal] | — | — |
| **4. Garant·e** | Un·e membre vérifié·e qui la connaît se porte garant·e, en privé | **Valide** si toutes les conditions sont réunies (voir [valider](groupes-signal.md#valider-la-confiance-graduee)) | Tranchent en cas de doute | — |
| **5. Nettoyage** | — | Retire les personnes non validées (personne n'est plus ajouté·e depuis la veille), **y ajoute une personne des RH**, qui n'est ainsi exposée qu'aux personnes validées | — | — |
| **6. Second contrôle** | Répond aux éventuelles questions | — | Vérifient les profils : nom, pas de photo, numéro caché, pas de nom en double | — |
| **7. Ajout** | Est ajouté·e au groupe de confiance par les RH | — | **Ajoutent par nom d'utilisateur** les seuls membres validés du groupe sas, quittent le groupe sas, notent les noms au registre | Vérifie que les arrivées correspondent : personne d'inconnu, pas de nom en double |
| **8. Ensuite** | Lit la charte ; période d'essai ; les sous-groupes sensibles plus tard | Reste son ou sa référent·e | Reçoivent les doutes, décident des retraits ; une interpellation : [retrait conservatoire](groupes-signal.md#retrait-conservatoire) | **Veille** : arrivées inattendues, changements de nom, comportements étranges ; signale aux RH |

### Le groupe sas

- [ ] **Aucun groupe sas ne donne accès seul aux groupes vérifiés.** N'importe qui peut créer un groupe qui se dit « sas », y compris une personne mal intentionnée : seuls comptent ceux qu'un·e secrétaire annonce dans le groupe public, et même eux restent une rencontre ouverte, rien de plus. Dites-le dans le groupe public.
- [ ] **Ce qu'y voit une personne** : l'heure et le lieu, les noms de militant·e des autres, et, à la rencontre, le visage du ou de la secrétaire. On n'y écrit donc rien d'autre, et les secrétaires **tournent**.
- [ ] **Ce n'est pas une salle d'attente** : il sert à **une** rencontre. Les personnes pas encore validées restent dans le groupe public.
- [ ] **À la rencontre, on ne vérifie pas l'identité.** Ni papiers, ni vrai nom, ni métier, ni quartier : ces questions fabriquent des informations qui identifient, et un·e infiltré·e a une histoire toute prête. Parler de tout et de rien met à l'aise, sans questions personnelles et sans rien noter ; pas de tour de table sur le métier ou le quartier, pour protéger aussi les nouvelles personnes les unes des autres. On vérifie plutôt :
    1. **le compte et les réglages** : code QR scanné, nom de militant·e, numéro caché ;
    2. **qui la connaît** : « comment as-tu connu le groupe ? quelqu'un ici ou dans le mouvement te connaît ? », pour repérer un·e garant·e possible ;
    3. **ce qu'elle veut faire** : quelles actions, quelle équipe ;
    4. **qu'elle a compris la charte**, en la lui faisant redire avec ses mots ;
    5. **les signaux d'alerte**, sans accuser : pousser à l'illégal ou à la violence, vouloir savoir qui est qui et quels groupes existent, demander des noms ou des adresses, prendre des photos, vouloir entrer partout tout de suite.
- [ ] **Chaque groupe sas naît avec sa date et sa tranche horaire** (« jeudi soir », « samedi midi ») : les personnes choisissent celui qui leur convient, sans sondage ni découpage après coup. C'est le ou la secrétaire qui synchronise tout : il ou elle crée le groupe sas (ou en devient admin s'il a été créé par quelqu'un d'autre) et poste l'annonce dans le groupe public, dont les secrétaires sont admins : « Rencontre jeudi soir : groupe sas », avec la consigne de **lui écrire en privé** (par nom d'utilisateur) pour être ajouté·e. **Jamais le lieu** : il est posté la veille dans le groupe sas.
- [ ] **Date pas encore fixée ?** Un sondage Signal dans le groupe sas, avec 2 ou 3 créneaux ; pas d'outil extérieur, qui garderait la trace de qui vient quand. Les votes ne sont pas anonymes : chaque membre voit qui a choisi quoi, ce qui ne pose pas de problème pour une date.[^signal-sondages]
- [ ] **Deux créneaux qui ont du succès ?** Une rencontre, un groupe sas : le ou la secrétaire en crée un second pour l'autre créneau, y ajoute les personnes qui l'ont choisi, puis les retire du premier. Un créneau qui n'attire qu'une ou deux personnes ne vaut pas un groupe : on garde le créneau majoritaire, et les autres viendront à la prochaine rencontre.
- [ ] **Le calendrier du ménage** :
    - **avant** : on ne retire personne, mais on **ferme les entrées** : la veille, en postant l'heure et le lieu, le ou la secrétaire n'ajoute plus personne ; seules les personnes déjà ajoutées connaissent le lieu ;
    - **pendant** : pas de ménage, les téléphones sont rangés ; une tolérance annoncée pour les retardataires (30 minutes, par exemple), qui font réglages et code QR à la fin ;
    - **après** : le ménage se fait **le soir même**, au plus tard sous 48 heures : on retire les personnes non validées, absent·es compris ; elles ne voient plus rien de la suite. Plus on attend, plus longtemps des personnes non rencontrées voient la suite. Ce qu'elles ont déjà vu ne s'efface pas : fermer le groupe sas ensuite est une question d'hygiène (moins de groupes), pas de sécurité. Les absent·es restent dans le groupe public et viendront à la prochaine rencontre ; une personne absente qu'un·e garant·e connaît peut aussi être rencontrée seule par un·e secrétaire.
- [ ] **Ensuite, au choix** : le fermer, ou le garder, renommé, comme **groupe de secours** du petit noyau de cette rencontre, pour garder le contact si le groupe principal est perdu (fermé par erreur, gardien·nes arrêté·es). On n'y organise rien et on n'y ajoute personne ; deux admins du noyau, de préférence **pas** les gardien·nes du groupe de confiance ; aucun lien ; messages éphémères à 1 semaine.[^signal-groupes][^signal-gerer-groupe] Il ne protège pas d'une fuite inconnue (cas B).
- [ ] **Sans groupe sas de secours**, on se retrouve par un message neutre des gardien·nes dans le groupe public (« les RH vous recontactent ») et par le point de repli en vrai.
- [ ] **Dans le groupe public, la liste des membres est visible par tous**, et Signal ne permet pas de la cacher : quelqu'un peut y piocher des contacts pour un groupe sas, ou pour harceler. D'où le nom de militant·e et le numéro caché, dès le groupe public.

### Recruteur·ses et secrétaires

- [ ] **Plusieurs de chaque**, pour ne dépendre de personne, et qui tournent.
- [ ] **Les recruteur·ses ne valident pas** et ne peuvent pas être garant·es de leurs propres recrues : sinon, une seule personne infiltrée fait entrer tout son entourage. Ils et elles ne sont pas gardien·nes des groupes vérifiés (le rôle expose), et envoient la liste des [réglages](groupes-signal.md#vos-reglages) avant une rencontre.
- [ ] **Les secrétaires sont des membres déjà vérifié·es**, jamais une personne du groupe sas désignée sur place. Les nouvelles personnes peuvent en revanche prendre de petites tâches sans droits dans Signal (gérer le temps, distribuer la parole, accueillir à la porte) : ça les implique et les fait connaître.
- [ ] **Pendant la rencontre**, chaque personne manipule elle-même son téléphone et montre ses écrans ; personne ne prend un téléphone déverrouillé en main.
- [ ] **Aucune liste** de présence, aucune note avec des noms.

### Valider : la confiance graduée

La rencontre est un **premier contact**. On valide ensuite selon le niveau du groupe :

**Vérifié, ça veut dire quoi ?** Trois contrôles, qui ne répondent pas à la même question :

| Ce qu'on vérifie | Question | Qui, comment | Durée |
| --- | --- | --- | --- |
| **Le compte** | Ce compte Signal est-il bien celui de la personne devant moi ? | Le ou la secrétaire scanne le **code QR du numéro de sécurité** : le compte est marqué « vérifié », personne ne peut se faire passer pour elle avec un autre compte[^eff-signal] | 10 secondes |
| **La personne** | Quelqu'un de fiable la connaît-il vraiment ? | Un·e **garant·e** qui la connaît en dehors du mouvement, ou l'a vue agir sur plusieurs actions, le confirme en privé au ou à la secrétaire | Immédiat si quelqu'un la connaît ; quelques semaines sinon |
| **Les réglages** | Risque-t-elle d'exposer le groupe par négligence ? | Le ou la secrétaire, puis les RH : nom de militant·e, pas de photo, numéro caché, pas de nom en double | 5 minutes |

- **Parcours rapide**, quand quelqu'un la connaît déjà : rencontre au groupe sas (15 minutes de réglages et scan du code QR), confirmation du ou de la garant·e, nettoyage du groupe sas, second contrôle des RH, ajout au groupe de confiance. **Le jour même.**
- **Parcours lent**, quand personne ne la connaît : elle vient aux actions pendant quelques semaines. Ce temps ne se raccourcit pas : c'est le seul moyen de connaître quelqu'un.
- **Ce que la vérification ne garantit pas** : les intentions. Un·e infiltré·e qui a un·e vrai·e garant·e passera ; d'où « rien d'illégal par écrit » et le cloisonnement en sous-groupes.

<figure class="venn" markdown>
<svg viewBox="0 0 360 300" role="img" aria-labelledby="venn-title venn-desc" xmlns="http://www.w3.org/2000/svg">
<title id="venn-title">Entrer dans le groupe de confiance</title>
<desc id="venn-desc">Trois cercles qui se chevauchent : rencontré·e en vrai par un·e secrétaire, connu·e d'un·e garant·e, profil contrôlé par les RH. Seule leur intersection donne accès au groupe de confiance.</desc>
<circle class="venn__circle" cx="130" cy="115" r="95"/>
<circle class="venn__circle" cx="230" cy="115" r="95"/>
<circle class="venn__circle" cx="180" cy="195" r="95"/>
<text class="venn__label" x="88" y="70" text-anchor="middle">Rencontré·e en vrai</text>
<text class="venn__label" x="88" y="88" text-anchor="middle">par un·e secrétaire</text>
<text class="venn__label" x="272" y="70" text-anchor="middle">Connu·e</text>
<text class="venn__label" x="272" y="88" text-anchor="middle">d'un·e garant·e</text>
<text class="venn__label" x="180" y="255" text-anchor="middle">Profil contrôlé</text>
<text class="venn__label" x="180" y="273" text-anchor="middle">par les RH</text>
<text class="venn__center" x="180" y="143" text-anchor="middle">Groupe de</text>
<text class="venn__center" x="180" y="161" text-anchor="middle">confiance</text>
</svg>
</figure>

| Pour entrer dans | Il faut |
| --- | --- |
| **Le groupe de confiance** (on n'y écrit rien de sensible) | Un·e **secrétaire vérifié·e** qui a rencontré la personne, fait ses réglages avec elle et scanné le code QR de son compte, **un·e garant·e**, puis le **second contrôle des RH**, qui l'ajoutent |
| **Un sous-groupe sensible** (medic, legal, logistique…) | **Deux garant·es** qui connaissent vraiment la personne, après une période dans le groupe de confiance ; le ou la gardien·ne du sous-groupe l'ajoute |

- [ ] **Les garant·es n'ont pas besoin d'être dans le groupe sas** : ce sont des membres vérifiés qui connaissent la personne **ailleurs** (ami·e, collègue, voisin·e, camarade de syndicat). Ils et elles le confirment **en privé** au ou à la secrétaire.
- [ ] **Personne ne la connaît ?** Elle vient aux actions publiques pendant quelques semaines ; les membres vérifiés qui l'ont vue agir et ont parlé avec elle peuvent ensuite se porter garant·es.
- [ ] **Croisé·e en manif, même comme medic ?** Ce n'est pas encore la connaître : n'importe qui peut porter un brassard medic ou une chasuble legal, et les sous-groupes de ces équipes sont sensibles. Pas d'ajout direct dans un groupe de confiance. En revanche, l'avoir vu·e agir sur **plusieurs** actions et lui avoir parlé permet de se porter garant·e ; et si elle vient d'un collectif connu (street medics, legal team), un membre vérifié qui connaît ce collectif peut être son ou sa garant·e.
- [ ] **Une personne très active ?** Un membre vérifié qui a agi à ses côtés sur deux ou trois actions la **propose** à un·e secrétaire et devient son ou sa garant·e. Le ou la secrétaire la rencontre, au besoin sur place pendant une action (scanner un code QR prend 10 secondes), puis les RH l'ajoutent : le jour même ou le lendemain. Les syndicats, associations et collectifs aident aussi : un membre vérifié qui la connaît par son syndicat ou son collectif peut être son ou sa garant·e tout de suite.
- [ ] **Jamais de garantie entre nouvelles personnes** : plusieurs personnes infiltrées arrivées ensemble se valideraient mutuellement. Pas de vote non plus, ni de seuil de « oui ».
- [ ] **Un seul doute sérieux suffit pour attendre** : le ou la secrétaire en parle aux RH, qui tranchent.
- [ ] **Signal prévient quand deux membres d'un groupe portent le même nom** : vérifiez, c'est peut-être une usurpation.[^signal-confidentialite-numero]
- [ ] **Ne demandez jamais** pièce d'identité, photo, adresse ou employeur : ça crée un fichier dangereux en cas de saisie, et ça ne prouve rien.
- [ ] **Signaux d'alerte** : quelqu'un qui pousse à des actions illégales ou violentes, réclame des noms, des adresses ou la liste des groupes, veut entrer partout tout de suite ; un·e secrétaire qui valide beaucoup de monde d'un coup ; un·e garant·e qui revient sans cesse.
- [ ] **Pas de liste de confiance.** Une liste de « qui a rencontré qui », sur papier, dans un groupe Signal ou dans un outil de vote en ligne, **dessine la carte de votre réseau** : un téléphone saisi ou le serveur de l'outil suffit à la livrer entière. Rien ne se transmet par écrit ; le registre ne note jamais qui s'est porté garant·e pour qui.
- [ ] **Au tout début**, dans une ville sans aucun membre vérifié, le premier noyau est un groupe de personnes qui se connaissent déjà en vrai : ce sont les premier·es vérifié·es, secrétaires et garant·es.

### Nommer les groupes

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

### Régler les groupes

| Groupe | Taille | Messages éphémères | Gardien·nes | Entrée | Présentation |
| --- | --- | --- | --- | --- | --- |
| **Groupe public** | Jusqu'à 1 000 (le maximum de Signal)[^signal-groupes] | 4 semaines (le maximum)[^signal-ephemeres] | 2 ou 3, plus les secrétaires pour annoncer les rencontres ; **seul·es les admins écrivent** | **Lien autorisé** (seule exception), sans approbation, réinitialisé si besoin ; ou ajout direct | Charte courte et lien vers ce site |
| **Groupe sas** | 5 à 15 personnes | 1 semaine : sa durée de vie ; il ne contient rien de sensible | Le ou la secrétaire qui l'annonce, et une autre personne | Ajout direct par le ou la secrétaire, sur inscription en privé ; **aucun lien** | Vide |
| **Groupe de confiance** | Une centaine au plus | 1 semaine | 2 ou 3, pas les mêmes partout | Ajout direct par les RH ; **aucun lien** | Charte seulement |
| **Sous-groupe** | 5 à 15 ; moins de 10 si sensible | 1 semaine ; 1 jour si sensible, quelques heures les jours d'action | 2 | Ajout direct par un·e gardien·ne ; **aucun lien** | Charte seulement |
| **Groupe temporaire** | Les personnes présentes | Quelques heures pour une journée ; la durée de la mobilisation sinon | La personne qui l'a créé et une autre | Ajout direct, en vrai, par la personne qui l'a créé ; **aucun lien ni code QR** | Vide |

Un groupe se règle **vide**, avant la première invitation : le délai d'effacement ne vaut que pour les **nouveaux** messages.[^signal-ephemeres]

<div class="flow" markdown>

1. **Créez le groupe seul·e ou avec votre co-gardien·ne** → nom selon la nomenclature, sans photo.
2. **Messages éphémères** → le délai prévu dans le tableau, dès la création.[^signal-ephemeres]
3. **Permissions** → **à régler à la création** (paramètres du groupe › permissions). Quatre droits, chacun réservable aux admins : **envoyer des messages**, **ajouter des libellés**, **modifier les infos du groupe** (nom, photo, description et, selon la documentation de Signal, le délai des messages éphémères) et **ajouter des membres**.[^signal-groupes][^signal-gerer-groupe][^signal-ephemeres][^signal-libelles] Tant qu'un droit n'est pas restreint, un·e simple membre peut l'exercer, y compris changer le délai. Réservez-les aux admins (gardien·nes, et secrétaires dans le groupe public et le groupe sas) et vérifiez-les dans chaque groupe ; dans le groupe public, seul·es les admins envoient des messages. **Retirer un membre reste réservé aux admins**, quoi qu'on règle : d'où plusieurs gardien·nes joignables par groupe.[^signal-groupes][^signal-gerer-groupe]
4. **Pas de lien de groupe, pas de code QR de groupe** (seule exception : le **groupe public**, qui ne contient rien de sensible et dont le lien peut circuler) → on ajoute chaque personne **par nom d'utilisateur**, depuis une conversation privée. Un lien qui circule échappe à tout contrôle : quiconque l'a peut demander à entrer, et il peut être relayé ou retrouvé. Le lien se gère dans la section **lien du groupe** : on l'active, on le **réinitialise** ou on le **désactive** ;[^signal-lien-groupe] une option **« nécessite l'approbation d'un admin »** (à garder activée partout où un lien existe, sauf le groupe public) sert de filet, sans remplacer l'ajout direct. **Si un lien a été créé malgré tout, désactivez-le tout de suite**, puis réinitialisez-le au moindre doute. Réserver « ajouter des membres » aux admins limite aussi qui peut en créer un : un membre qui ne voit pas la fonction doit passer par un·e admin (à vérifier dans votre groupe).
5. **Description du groupe** → collez la description courte (règles vitales, vocation d'entraide et rappel légal). Les messages éphémères effaçant les messages épinglés, la charte complète se fait valider dans le groupe sas avant l'ajout.
6. **Deuxième gardien·ne** → ajoutez cette personne et nommez-la admin dans Signal **avant** tout le monde.
7. **Registre** → notez l'identifiant du groupe et ses gardien·nes.
8. **Ensuite seulement**, ajoutez les membres.

</div>

**Un groupe qui dépasse sa taille se divise, il ne grossit pas** : plus un groupe est grand, plus il a de chances de contenir une fuite, et plus une fuite expose de monde. Ces tailles sont des repères de bon sens : tout le monde doit pouvoir se reconnaître au moins de vue dans le groupe de confiance, et vraiment se connaître dans un sous-groupe. Groupe sas trop plein : deux rencontres.

| Créer | Quand |
| --- | --- |
| **Une nouvelle famille** (nouvel identifiant, avec son groupe de confiance et ses sous-groupes) | Le groupe de confiance approche la centaine et les membres ne se reconnaissent plus de vue (on divise par quartier ou secteur) ; une autre ville ; une campagne distincte ; des lycéen·nes (avec des gardien·nes lycéen·nes) ; une fuite non identifiée (cas B) |
| **Un sous-groupe** | Au moins 3 à 5 personnes ont le même rôle et doivent se coordonner (medic, legal…) |
| **Un deuxième sous-groupe du même rôle**, dans la même famille (`MVT-VIL-4K9-Medic2`) | Le premier dépasse 15 personnes, ou deux équipes travaillent sur des terrains différents |
| **Rien de nouveau** | Le besoin est ponctuel : nommez quelqu'un dans le groupe de confiance, ou créez un groupe temporaire |

- [ ] **Adaptez le délai au rendez-vous annoncé** : il doit couvrir le temps qui reste jusqu'au rendez-vous, plus une marge (rendez-vous dans 6 jours : 1 semaine ; demain : 1 jour). Réglez-le **avant** de poster le message : un nouveau délai ne s'applique qu'aux messages suivants,[^signal-ephemeres] et chaque changement s'affiche dans la conversation.
- [ ] **Un message reçu ne commence à disparaître qu'une fois lu.**[^signal-ephemeres] Sur un téléphone saisi, les messages **non lus** restent : délais courts les jours d'action.
- [ ] **Dans la présentation, jamais** : noms, adresses, lieux de réunion, liens vers d'autres groupes, liste des sous-groupes. Pas de photo de groupe reconnaissable.
- [ ] **Les gardien·nes ne partent pas en action avec leur téléphone de gardien·ne** quand une interpellation est possible : déverrouillé, il permet d'ajouter quelqu'un, de lire et de modifier le groupe. Confiez le rôle à des personnes qui restent en retrait, ou retirez-le temporairement.
- [ ] **Entre gardien·nes, vérifiez vos numéros de sécurité** en vous rencontrant (code QR).[^eff-signal]

### Fermer un groupe

Signal ne permet pas de supprimer un groupe pour tout le monde : le **fermer**, c'est retirer les membres un par un puis le quitter, après avoir comparé sa liste avec celle du nouveau groupe s'il y en a un (voir le [cas B](groupes-signal.md#cas-b-on-ne-sait-pas-demenager)). Notez ensuite l'identifiant comme fermé au registre.

| On le ferme | Pourquoi |
| --- | --- |
| **Le groupe sas, après sa rencontre** (sauf s'il est gardé en secours) | Il a servi une fois ; sa liste de membres est connue de personnes non validées. Elles n'y ont vu que l'heure, le lieu et des noms de militant·e : les en retirer suffit pour la suite, mais ce qui est déjà sur leur téléphone y reste |
| **Fuite non identifiée** (cas B) | La fuite est peut-être encore dedans : on déménage, puis on ferme l'ancien |
| **Le groupe temporaire, à la fin de sa journée ou de sa mobilisation** | Il ne sert plus |
| **Le groupe ne sert plus** (campagne finie, équipe dissoute, fusion) | Un groupe dormant reste sur tous les téléphones, avec son historique et ses membres : exposé en cas de saisie, pour rien |
| **Le groupe est trop grand** | On le divise en nouveaux groupes, puis on ferme l'ancien (ou on le garde comme l'un d'eux) |

**On ne le ferme pas** pour une fuite connue et retirée (cas A), un membre arrêté (retrait conservatoire), un nom qui a circulé (renommer suffit) ou un conflit (c'est le travail de la modération).

### Libellés de rôle

Signal permet à chaque membre d'afficher un **libellé** à côté de son nom. Chacun·e ne peut en mettre un **qu'à lui-même ou elle-même**, et il ne vaut **que dans le groupe où il est créé** : à refaire dans chaque groupe. Les libellés sont chiffrés, et les gardien·nes peuvent les réserver aux gardien·nes (Paramètres du groupe › Permissions).[^signal-libelles]

Gardez une **liste commune** dans la charte, pour que tout le monde utilise les mêmes mots, par exemple :

| Libellé        | Rôle                                                       |
| -------------- | ---------------------------------------------------------- |
| `Secrétaire`   | Accompagne et valide les nouvelles personnes               |
| `RH`           | Reçoit les doutes, décide des retraits                     |
| `Gardien·ne`   | Garde les clés du groupe (admin dans Signal)               |
| `Recruteur·se` | Oriente vers le groupe public et les groupes sas           |
| `Medic`        | Premiers secours                                           |
| `Legal`        | Observation, contacts avocat·es, suivi des interpellations |
| `Construction` | Banderoles, pancartes, matériel                            |
| `Logistique`   | Transport, nourriture, stockage                            |
| `Com`          | Visuels, annonces, réseaux                                 |

- [ ] **N'importe qui peut s'afficher « RH » ou « Gardien·ne »** si tout le monde a le droit de se mettre un libellé. Dans le groupe public et le groupe sas, réservez les libellés aux admins ; ailleurs, vérifiez : un·e vrai·e gardien·ne porte aussi la mention « Admin » de Signal, et les RH et secrétaires sont des personnes que vous avez rencontrées en vrai.
- [ ] **Un libellé se voit sur un téléphone saisi** : il désigne les personnes clés. Dans les grands groupes, seulement les rôles utiles aux autres (medic, legal, secrétaire), et pas de libellé qui désigne un niveau (« orga », « noyau »).

**Sans libellé**, les rôles se connaissent autrement : la mention « Admin » désigne déjà les gardien·nes ; être dans le sous-groupe `Medic`, c'est être medic ; le ou la secrétaire présente les rôles à la rencontre, et un tour rapide au début d'une action (« qui est medic, qui est legal aujourd'hui ? ») suffit. Évitez le champ « À propos » du profil : il se voit dans toutes vos conversations.

### Se coordonner

- [ ] **Demandez en nommant quelqu'un** : plus il y a de monde, moins chacun·e répond, car tout le monde pense qu'un·e autre va le faire. C'est l'**effet du témoin**,[^darley-latane-1968] et il existe aussi dans les discussions en ligne, sauf quand on nomme la personne à qui l'on demande.[^markey-2000]
- [ ] **Le jour d'une action**, les personnes qui coordonnent se retrouvent en vrai, ou dans un [groupe temporaire](groupes-signal.md#le-groupe-temporaire).
- [ ] **Personne n'est dans tous les sous-groupes** pour faire le lien : une seule personne présente partout exposerait toute la famille avec un seul téléphone saisi. Les échanges entre équipes passent par le groupe de confiance.
- [ ] **Pas de groupe « orga » qui réunit toutes les RH, tous les gardien·nes et tous les secrétaires**, ni de réunion où toutes ces personnes sont présentes en même temps : un seul téléphone saisi, ou une seule descente, les livrerait toutes. Le 21 juin 1943, à Caluire, l'arrestation de Jean Moulin et des responsables de la Résistance qu'il avait réunis au même endroit a montré ce risque.[^ordre-liberation-jean-moulin] Les rôles clés se coordonnent en vrai, ou en petits groupes de 2 ou 3 personnes, par sujet.

### Le groupe temporaire

Pour s'organiser vite, pour une journée d'action ou le temps d'une mobilisation, avec des personnes qu'on vient de rencontrer : un groupe **jetable**, à utiliser en partant du principe que la police peut y être. Il est à côté de l'entonnoir, pas dedans : il ne mène pas au groupe de confiance.

- [ ] **Pour une journée** : créé sur place par n'importe qui ; on y **ajoute les personnes présentes par nom d'utilisateur**, en vrai, sans lien ni code QR de groupe. Messages éphémères de quelques heures.
- [ ] **Pour une mobilisation** (quelques jours à deux semaines) : on y entre après une rencontre avec un·e secrétaire (code QR du compte scanné, réglages faits), **sans garant·e** ; messages éphémères d'un jour.
- [ ] **Dans les deux cas** : un nom neutre, sans mouvement ni ville (`J-7Q`, par exemple) ; le délai d'effacement **réglé avant d'inviter qui que ce soit**.[^signal-ephemeres]
- [ ] **Seulement du pratique** : « medic demandé·e devant la gare », « on se replie rue X », « besoin d'eau ». Pas de noms, pas de photos de visages, rien d'illégal.
- [ ] **Aucun lien avec les groupes de confiance** : on n'y ajoute personne depuis eux, on ne les mentionne pas.
- [ ] **Fermé à la fin** de la journée ou de la mobilisation : l'admin retire tout le monde et quitte le groupe ; chacun·e supprime la conversation.[^signal-supprimer] Les personnes qu'on y a vues agir ont alors leurs garant·es pour le groupe de confiance.
- [ ] **Sans réseau**, {{ res("briar") }} ou {{ res("meshtastic") }} ([communiquer pendant une manif](communiquer.md#comparatif)), ou pas de téléphone du tout : binômes et point de rendez-vous fixé à l'avance.

### Mineur·es dans les groupes

Lycéen·nes et adultes peuvent militer ensemble, avec des règles en plus :

- **Ne poussez jamais un·e mineur·e à une action illégale** (blocus, dégradation) : provoquer directement un·e mineur·e à commettre un délit est puni de 5 ans de prison, et de 7 ans aux abords d'un établissement scolaire ou pour un·e mineur·e de moins de 15 ans.[^cp-227-21]
- **Groupes séparés** pour les lycéen·nes quand c'est possible, avec des gardien·nes lycéen·nes.
- **Pas d'échange privé adulte-mineur·e** sans nécessité ; tout passe par le groupe.
- **Aucune photo** de mineur·es.
- En garde à vue, les mineur·es sont souvent pressé·es de donner des noms : moins ils et elles en connaissent, mieux ils et elles sont protégé·es ([guide lycéen](lyceens.md)).

## Partie 3 : groupe compromis

### Que faire ?

<div class="flow" markdown>

1. **Que se passe-t-il ?**
    - **Quelqu'un se fait embarquer, ou perd son téléphone** → [retrait conservatoire](groupes-signal.md#retrait-conservatoire), tout de suite.
    - **Un inconnu dans le groupe, une fuite, un doute sérieux** → étape 2.
2. **Le groupe est-il compromis ?** → voir la liste ci-dessous.
3. **Sait-on par où ça fuit ?**
    - **Oui, et c'est retiré** → [cas A](groupes-signal.md#cas-a-on-sait-par-ou-ca-fuit) : le groupe continue.
    - **Non** → [cas B](groupes-signal.md#cas-b-on-ne-sait-pas-demenager) : on déménage.
4. **Les sous-groupes** → même question pour chacun (voir plus bas).

</div>

### Quand un groupe est-il compromis ?

Un groupe est compromis quand une personne qui ne devrait pas peut **lire ses messages** (passés ou à venir) ou **connaître ses membres**. Signal ne garde pas trace de qui est dans quel groupe,[^signal-groupes] mais **un téléphone déverrouillé montre tout** : membres, messages pas encore effacés, nom, présentation et historique des alertes du groupe.

**Compromis, à traiter tout de suite :**

- un membre est **arrêté ou placé en garde à vue avec son téléphone** ;
- un téléphone est **perdu ou volé** ;
- un membre **inconnu** apparaît, ou quelqu'un a été ajouté sans être validé par un·e secrétaire ;
- Signal indique que le **numéro de sécurité** d'un membre a changé alors qu'il est en garde à vue ou a perdu son téléphone : son compte a peut-être été réinstallé ailleurs ;[^eff-signal]
- un·e infiltré·e est **identifié·e**.

**À évaluer, sans paniquer :**

- une **fuite** : une info qui n'était que dans le groupe ressort chez la police, dans la presse ou à l'extrême droite ;
- un membre arrêté **sans** son téléphone : rien n'est lisible, mais il peut parler sous la pression ; vigilance, pas de déménagement automatique ;
- un membre qui part fâché ou qu'on exclut.

**La question clé : sait-on par où ça fuit ?** La « fuite », c'est la personne ou le téléphone par lequel quelqu'un d'extérieur accède au groupe.

- **On le sait, et on l'a retiré** (un membre arrêté avec son téléphone, un téléphone perdu, un·e infiltré·e démasqué·e) : ce téléphone ou cette personne a vu le **passé** (historique, membres, nom), mais plus rien de l'**avenir**. Le groupe peut continuer.
- **On ne le sait pas** (une info sortie sans qu'on sache par qui, un doute sans coupable identifié) : la fuite est peut-être encore dans le groupe ; le passé **et** l'avenir sont exposés. Il faut **déménager**.

### Retrait conservatoire

Retirer quelqu'un d'un groupe ne coûte rien et se répare en une minute. Attendre de savoir s'il est en garde à vue, c'est laisser le temps de déverrouiller son téléphone.

**Dans le feu de l'action, les gens écriront « X est embarqué·e » dans le groupe.** Ce n'est pas une faute, et l'interdire ne marchera pas : on s'y prépare. Le but est d'**aller vite et de ne pas laisser la panique s'installer** : une alerte courte, une action immédiate, une réponse toute prête.

<div class="flow" markdown>

1. **Vous voyez quelqu'un se faire embarquer** → écrivez **une ligne**, là où c'est le plus rapide pour vous (le groupe, ou un·e RH en privé) : `Alerte : [nom de militant·e] embarqué·e`. Rien d'autre dans le groupe : ni lieu, ni détails, ni nom d'une autre personne. L'heure, le lieu et si le téléphone était sur la personne vont **en privé** à un·e RH ou à la [legal team](../annuaire/index.md?tags=antirepression).
2. **Le ou la premier·e gardien·ne qui voit l'alerte retire la personne de ce groupe, tout de suite**, sans attendre de confirmation ni de vote. Si elle est gardien·ne, retirez-lui d'abord ce rôle.[^signal-gerer-groupe] Dans le groupe, **supprimez l'alerte pour tout le monde**[^signal-gerer-groupe] et postez la réponse toute prête (ci-dessous).
3. **Un·e RH ou le ou la référent·e « groupe perdu » consulte le registre** → liste des autres groupes de la personne ; leurs gardien·nes la retirent aussi, tout de suite, et y postent la même réponse.
4. **Messages sensibles des dernières 24 heures** → un·e gardien·ne peut les supprimer pour tout le monde ;[^signal-gerer-groupe] la suppression n'atteint le téléphone saisi que s'il se reconnecte : n'y comptez pas.
5. **Le suivi passe par la legal team** ([garde à vue](garde-a-vue.md)), pas par le groupe : on n'y commente pas l'arrestation.
6. **À sa sortie, débrief en vrai avec les RH** : téléphone saisi ? déverrouillé ? code donné ? rendu ? combien de temps hors de sa vue ?
    - **Resté avec elle et verrouillé, ou pas emporté** → on la réintègre.
    - **Saisi, déverrouillé ou hors de sa vue** → ses groupes sont compromis : cas A. Considérez aussi le téléphone comme compromis : réinitialisation ou nouveau téléphone, puis vérification des numéros de sécurité en vrai avant de la réintégrer.[^eff-signal]

</div>

**Messages prêts à copier**, à avoir sous la main (les gardien·nes les gardent dans leurs notes) :

```text
Alerte : [nom de militant·e] embarqué·e.
```

```text
[nom de militant·e] est retiré·e par précaution, rien de personnel. On ne commente pas ici : la legal team suit. Gardons notre calme.
```

Le retrait protège l'**avenir**, pas le passé : ce qui était déjà sur le téléphone y reste, y compris les messages non lus, dont le minuteur n'a pas commencé.[^signal-ephemeres]

### Cas A : on sait par où ça fuit

1. **Vérifiez que la personne est bien retirée** de tous les groupes où elle était (registre).
2. **Faites l'inventaire de ce qui est exposé** : messages dans le délai d'effacement et non lus, liste des membres, nom, présentation, historique des alertes (ajouts, retraits, changements de nom). Considérez tout cela comme connu.
3. **Prévenez individuellement les membres exposés**, en particulier ceux dont le numéro était visible.
4. **Nettoyez pour la suite** : présentation réduite à la charte, délai plus court, messages sensibles récents supprimés pour tout le monde.[^signal-gerer-groupe]
5. **Renommer ne sert qu'à l'avenir** : le téléphone saisi garde l'ancien nom. Changez-le seulement s'il en dit trop, et notez le nouvel identifiant dans le registre.
6. **Inutile de dissoudre le groupe** si personne d'autre n'est en doute.

### Cas B : on ne sait pas, déménager

1. **N'annoncez rien dans le groupe** : la personne qui fait fuiter le lit. Décidez en vrai, entre gardien·nes et RH, et cherchez discrètement d'où vient la fuite : quelle information est sortie, qui l'avait (quel groupe, quel sous-groupe, à quelle date). Ça réduit souvent le cercle à quelques personnes ; un doute ne prouve rien, n'accusez personne. Si les échanges doivent s'arrêter tout de suite, une phrase claire et neutre suffit : « **Pause : on n'écrit plus rien ici jusqu'à nouvel ordre.** » Sans dire pourquoi, ni où se retrouver : la fuite connaît le point de repli comme les autres membres. Ensuite, on réinvite un par un.
2. **Créez une nouvelle famille** : nouveau groupe de confiance avec un nouvel identifiant, **sans lien**.
3. **Réinvitez un par un, de façon proportionnée** : d'abord les personnes connues en vrai depuis longtemps, par plusieurs membres, après un court point en vrai et une nouvelle vérification du code QR ; les personnes entrées récemment, ou qui avaient l'information qui a fuité, repassent par une **nouvelle validation** : un·e secrétaire en vrai, un·e garant·e (voire deux), puis le second contrôle des RH. Si la fuite continue dans le nouveau groupe, elle est parmi ses membres : le cercle se resserre.
4. **Fermez l'ancien groupe seulement une fois la migration faite** : pendant le déménagement, sa liste de membres est votre liste des personnes à réinviter, et Signal ne garde nulle part qui était dans un groupe.[^signal-groupes] **Avant de fermer, comparez les deux listes** : les personnes pas encore réinvitées (absentes, injoignables) sont notées au registre par leur nom de militant·e, pour être retrouvées au point de repli. Signal ne permet pas non plus de supprimer un groupe pour tout le monde : postez un message neutre (« groupe fermé »), retirez les membres un par un, puis quittez-le.
5. **Chacun·e quitte l'ancien groupe une fois dans le nouveau**, et pas avant, puis supprime la conversation : supprimer la conversation ne fait pas quitter le groupe.[^signal-supprimer]
6. **Marquez l'identifiant comme perdu** dans le registre.

**L'ancien groupe a déjà été supprimé ?**

- **Si seule la conversation a été supprimée**, le groupe existe toujours : tapez son nom dans la recherche de Signal pour le retrouver, avec ses membres.[^signal-supprimer]
- **S'il a vraiment été fermé** : demandez aux autres gardien·nes et RH, qui l'ont peut-être encore ; le **registre** donne les noms de militant·e à retrouver ; chaque secrétaire peut faire réinviter les comptes qu'il ou elle a vérifiés par code QR ; les gardien·nes des sous-groupes encore actifs réinvitent leurs membres ; pour tous les autres, le **point de repli** en vrai.

### Et les sous-groupes ?

- **La personne ou le téléphone à l'origine de la fuite était dans le sous-groupe** → même procédure pour lui.
- **Ni l'une ni l'autre n'y était** → le sous-groupe n'est pas exposé par cette fuite. Si son nom ou son identifiant apparaissait dans les messages ou la présentation du groupe parent, renommez-le avec le nouvel identifiant de la famille ; pas besoin de le dissoudre.
- **Fuite non identifiée dans le groupe parent** → revoyez les membres du sous-groupe venus du parent ; dissolvez seulement s'il y a un doute sur l'un d'eux.

## Modèles à copier-coller

Remplacez ce qui est entre crochets.

!!! warning "Pourquoi pas un simple message épinglé ?"

    Dans Signal, un message éphémère est **automatiquement désépinglé et supprimé** quand son délai expire (1 jour, 1 semaine…).[^signal-messages-epingles] De plus, une personne qui rejoint le groupe après coup **ne voit pas les messages épinglés avant son arrivée**.[^signal-messages-epingles]

    C'est pourquoi la **description du groupe** (permanente, visible par tous et dès la demande d'entrée) doit contenir le *disclaimer* et les règles vitales. La charte détaillée, elle, est transmise et validée **dans le groupe sas** avant l'entrée dans le groupe de confiance.

### Présentation d'un groupe de confiance

**Nom du groupe** : `[MVT]-[VIL]-[ID]-General`

**Description du groupe** (permanente et courte, environ 230 caractères) :

```text
Entraide, logistique et info militante. Aucune incitation aux violences ni aux dégradations ; rien d'illégal (art. 222-14-2 CP). Pas de vrais noms, adresses, visages ni captures. Messages éphémères actifs. Charte validée dans le sas.
```

### Présentation d'un sous-groupe

**Nom du groupe** : `[MVT]-[VIL]-[ID]-[THEME]`

**Description du groupe** :

```text
[THEME] : entraide et logistique. Aucune incitation aux violences ni dégradations ; rien d'illégal (art. 222-14-2 CP). Groupe confidentiel (pas de mention ailleurs). Pas de noms, visages ni captures. Messages éphémères : [1 j].
```

<a id="charte-complete"></a>

### Charte complète

À valider dans le groupe sas avant l'ajout au groupe de confiance.

```text
CHARTE — à lire avant d'écrire

1. NOMS DES GROUPES
MVT-VILLE-ID-THEME, ex. MVT-VIL-4K9-Medic. L'ID, tiré au hasard, est commun au groupe de confiance et à ses sous-groupes. Quand la famille est remplacée, l'ID change. On ne rejoint un groupe vérifié que sur **ajout direct** par une personne des RH ou un·e gardien·ne connu·e, par votre nom d'utilisateur ; jamais par un lien ni un code QR de groupe. Aucun groupe sas ne donne accès seul à un groupe vérifié.

2. VOCATION ET CONTENU
Groupe à vocation strictement informative, logistique et d'entraide.
Ce qu'on écrit : infos pratiques, entraide, logistique, infos publiques.
Ce qu'on n'écrit jamais : appel ou incitation à la violence, aux dégradations, menace (même pour rire), projet d'action illégale. Ces messages servent de preuves : menacer par écrit est puni, et participer à un groupe qui prépare des violences ou des dégradations aussi, même si rien n'a lieu.
Le sensible se dit en vrai, sans téléphone.
Pas de vocaux. Liens nettoyés (rien après le « ? »). Visages floutés.
Besoin d'aide : nommez quelqu'un (@nom). Urgence : 15 ou 112.

3. ANONYMAT ET RÔLES
Votre nom de militant·e, ici comme en vrai. Pas de vrais noms, pas d'adresses, pas de photos de visages, pas de captures d'écran. Numéro caché, messages éphémères activés.
Libellé : votre rôle dans ce groupe (Medic, Legal, Construction, Logistique, Com…), à remettre dans chaque groupe. « Gardien·ne » et « RH » : seulement si c'est vraiment votre rôle.

4. SI VOUS ÊTES ARRÊTÉ·E OU PERDEZ VOTRE TÉLÉPHONE
En garde à vue, vous avez le droit de vous taire : ne parlez de personne. On vous retire de tous les groupes par précaution : rien de personnel. Ne commentez pas l'arrestation ici. Prévenez votre secrétaire ou les RH dès que possible, en vrai ou par un·e camarade, pour revenir.

5. SI LE GROUPE DISPARAÎT OU SI ON VOUS RETIRE
Pas de panique, pas de nouveau groupe créé dans votre coin. Ne quittez pas un groupe de vous-même : attendez la consigne, sinon on ne pourra pas vous réinviter. Rendez-vous au point de repli convenu de vive voix, ou contactez les RH. Refusez toute invitation d'une personne que vous ne connaissez pas.

6. POUR PARTIR
Quittez le groupe, puis supprimez la conversation, les fichiers enregistrés et les captures. Prévenez les RH.

Un doute sur quelqu'un : parlez-en en privé aux RH, qui décident des retraits. Jamais d'accusation dans le groupe.
```

Le cadre légal de la charte : menacer par écrit est puni de 6 mois de prison et 7 500 € d'amende, 3 ans et 45 000 € pour une menace de mort ;[^cp-222-17] participer sciemment à un groupement qui prépare des violences ou des dégradations, d'un an et 15 000 €.[^cp-222-14-2] Avec des mineur·es dans le groupe, voir [mineur·es dans les groupes](groupes-signal.md#mineures-dans-les-groupes).

## Quand Signal ne suffit pas

- **Sans réseau** : {{ res("briar") }} fonctionne en Bluetooth ou wifi local, sans numéro de téléphone ([communiquer pendant une manif](communiquer.md#comparatif)).[^briar-how]
- **Sans numéro de téléphone** : {{ res("element") }} (Matrix) fonctionne avec un simple identifiant, et convient à de grands espaces organisés en salons.
- **Documents partagés** : {{ res("cryptpad") }}, chiffré, sans compte obligatoire.
- **Le plus sensible** : en vrai, sans téléphone (laissés dans une autre pièce ou éteints et à distance).

[:octicons-arrow-right-24: Organiser une manifestation](organiser.md) · [:octicons-arrow-right-24: Communiquer pendant une manif](communiquer.md) · [:octicons-arrow-right-24: Téléphone](telephone.md)

## Sources

Chaque note renvoie à la source de l'information. Les textes de loi évoluent : vérifiez la date de la source et, en cas de doute, demandez à un·e avocat·e.
