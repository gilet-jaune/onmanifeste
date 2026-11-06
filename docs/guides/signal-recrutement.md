---
description: 'Groupes Signal : recruter et rencontrer de nouvelles personnes sans exposer le groupe.'
review: juridique
review_status: pending
tags:
    - guides
    - organiser
    - téléphone
    - schéma
---

# Groupes Signal : recruter et rencontrer

[:octicons-arrow-left-24: Groupes Signal : vue d'ensemble](groupes-signal.md)

Mots utilisés ici : [les groupes](groupes-signal.md#les-groupes) (public, sas, confiance), [les rôles](groupes-signal.md#les-roles) (RH, gardien·ne…) et le [vocabulaire](groupes-signal.md#vocabulaire-et-concepts-cles).

## Le recrutement de bout en bout, rôle par rôle

Choisissez votre rôle pour voir votre checklist étape par étape, ou ouvrez le tableau complet pour voir qui fait quoi à chaque étape :

=== "Parcours Secrétaire"

    <div class="flow" id="parcours-secretaire" markdown>

    1. **Créer et annoncer le groupe sas** : régler les [messages éphémères avant toute invitation](signal-creer.md#regler-les-groupes), [annoncer la date et la tranche horaire](signal-recrutement.md#proposer-une-date-une-heure-et-un-lieu) dans le groupe public (**jamais le lieu**) et ajouter en privé par nom d'utilisateur.
    2. **La veille : fermer les entrées et donner le lieu** : poster l'heure et le lieu dans le groupe sas, **sans plus ajouter personne** ensuite.
    3. **Animer la rencontre en vrai** ([à deux membres vérifié·es minimum](signal-recrutement.md#la-rencontre-en-vrai-etape-par-etape)) : vérifier [les réglages](signal-membres.md#vos-reglages) sur chaque écran, **scanner le code QR du numéro de sécurité**[^eff-signal] et passer les [5 points de contrôle](signal-recrutement.md#ce-quon-verifie-a-la-rencontre).
    4. **Le soir même : [nettoyer le groupe sas](signal-recrutement.md#nettoyer-le-groupe-sas-apres-la-rencontre)** (au plus tard sous 48 h) :
        - **Personne avec [garant·e](signal-valider.md#valider-la-confiance-graduee)** : retirer absent·es, personnes non rencontrées et signaux d'alerte ; garder uniquement les personnes validées.
        - **Voie ouverte (sans garant·e)** : retirer absent·es et alertes, renommer le sas d'un nom neutre pour [se donner rendez-vous en action](signal-valider.md#recruter-a-porte-ouverte-les-voir-agir).
    5. **Passer le relais aux RH** : faire un point à voix haute le jour même ; **ajouter une personne des RH** au groupe sas nettoyé pour qu'elle contrôle et ajoute les personnes validées.

    </div>

=== "Parcours RH"

    <div class="flow" id="parcours-rh" markdown>

    1. **Recevoir les retours en privé** (à voix haute si possible, sans liste écrite) :
        - **Parcours rapide ou [cooptation](signal-valider.md#recruter-par-cooptation-un-membre-verifie-propose)** : confirmation du ou de la [garant·e](signal-valider.md#valider-la-confiance-graduee) et retour du ou de la secrétaire après la rencontre.
        - **[Voie ouverte](signal-valider.md#recruter-a-porte-ouverte-les-voir-agir)** : retours des binômes vérifié·es après {{ default("actions") }} et désignation d'au moins un·e garant·e.
    2. **Trancher en cas de doute** : un seul doute sérieux suffit pour attendre dans le groupe public ; sur un membre existant, appliquer une [pause préventive](signal-groupe-compromis.md#pause-preventive-en-cas-de-doute) ou un [retrait conservatoire](signal-groupe-compromis.md#retrait-conservatoire) en cas d'interpellation.
    3. **Second contrôle du profil** (dans le sas nettoyé ou en privé) : [nom de militant·e](signal-membres.md#votre-nom-de-militante), pas de photo, numéro caché, pas de nom en double dans le groupe.
    4. **Ajouter au groupe de confiance et tenir le registre** : ajouter **par nom d'utilisateur** (aucun lien ni code QR de groupe), quitter le groupe sas et noter le nom au [registre](signal-creer.md#nommer-les-groupes) (**jamais** le nom du ou de la garant·e).

    </div>

=== "Tableau complet (tous les rôles)"

    <div id="tableau-complet" markdown>

    | Étape | Nouvelle personne | Secrétaire | RH | Gardien·ne |
    | --- | --- | --- | --- | --- |
    | **1. Avant** | Rejoint le groupe public ; fait [ses réglages](signal-membres.md#vos-reglages) ([nom de militant·e](signal-membres.md#votre-nom-de-militante), numéro caché) | — | — | [Règle les groupes](signal-creer.md#regler-les-groupes) **vides** : délai d'effacement, permissions, aucun lien (sauf pour le groupe public) |
    | **2. Groupe sas** | Rejoint un [groupe sas](signal-recrutement.md#le-groupe-sas) annoncé dans le groupe public (date et tranche horaire), ou [en propose un](signal-recrutement.md#proposer-une-date-une-heure-et-un-lieu) au ou à la secrétaire, qui l'annonce (délai d'effacement réglé avant toute invitation ; ajouté·e par le ou la secrétaire, par nom d'utilisateur) | [Annonce le groupe sas](signal-recrutement.md#proposer-une-date-une-heure-et-un-lieu) dans le groupe public (date, tranche horaire) ; en est admin ; **ajoute** les personnes qui s'y sont inscrites en privé ; poste le lieu la veille, sans plus ajouter personne, puis le jour même | — | — |
    | **3. Rencontre** | Vient à [la rencontre](signal-recrutement.md#la-rencontre-en-vrai-etape-par-etape), sans téléphone sur la table ; fait ses réglages **avec** le ou la secrétaire | [Anime](signal-recrutement.md#la-rencontre-en-vrai-etape-par-etape) ; aide aux réglages ; **scanne le code QR du numéro de sécurité** de chaque compte, qui est alors marqué « vérifié » sur son téléphone[^eff-signal] ; fait [les contrôles prévus](signal-recrutement.md#ce-quon-verifie-a-la-rencontre) | — | — |
    | **4. Garant·e** | Un·e membre vérifié·e qui la connaît se porte garant·e, en privé | **Valide** si toutes les conditions sont réunies (voir [valider](signal-valider.md#valider-la-confiance-graduee)) | Tranchent en cas de doute | — |
    | **5. Nettoyage** | — | [Retire les personnes non validées](signal-recrutement.md#nettoyer-le-groupe-sas-apres-la-rencontre) (personne n'est plus ajouté·e depuis la veille), **y ajoute une personne des RH**, qui n'est ainsi exposée qu'aux personnes validées | — | — |
    | **6. Second contrôle** | Répond aux éventuelles questions | — | Vérifient les profils : nom, pas de photo, numéro caché, pas de nom en double | — |
    | **7. Ajout** | Est ajouté·e au groupe de confiance par les RH | — | **Ajoutent par nom d'utilisateur** les seuls membres validés du groupe sas, quittent le groupe sas, notent les noms au [registre](signal-creer.md#nommer-les-groupes) | Vérifie que les arrivées correspondent : personne d'inconnu, pas de nom en double |
    | **8. Ensuite** | Lit la [charte](signal-modeles.md#charte-complete) ; période d'essai ; les sous-groupes sensibles plus tard | Reste son ou sa référent·e | Reçoivent les doutes ([pause préventive](signal-groupe-compromis.md#pause-preventive-en-cas-de-doute)), décident des retraits ; une interpellation : [retrait conservatoire](signal-groupe-compromis.md#retrait-conservatoire) | **Veille** : arrivées inattendues, changements de nom, comportements étranges ; signale aux RH |

    </div>

## Le groupe sas

- [ ] **Aucun groupe sas ne donne accès seul aux groupes vérifiés.** N'importe qui peut créer un groupe qui se dit « sas », y compris une personne mal intentionnée : seuls comptent ceux qu'un·e secrétaire annonce dans le groupe public, et même eux restent une rencontre ouverte, rien de plus. Dites-le dans le groupe public.
- [ ] **Ce qu'y voit une personne** : l'heure et le lieu, les noms de militant·e des autres, et, à la rencontre, le visage du ou de la secrétaire. On n'y écrit donc rien d'autre, et les secrétaires **tournent**.
- [ ] **Ce n'est pas une salle d'attente et on n'y planifie aucune action** : il sert à **une** rencontre, puis, au besoin, à **se donner rendez-vous** pour se voir en vrai à une action organisée par d'autres, où des membres vérifié·es observent et en parlent aux RH (voir [les voir agir](signal-valider.md#recruter-a-porte-ouverte-les-voir-agir)). Les autres personnes pas encore validées restent dans le groupe public.
- [ ] **Dans le groupe public, la liste des membres est visible par tous**, et Signal ne permet pas de la cacher : quelqu'un peut y piocher des contacts pour un groupe sas, ou pour harceler. D'où le nom de militant·e et le numéro caché, dès le groupe public.

### Proposer une date, une heure et un lieu

- [ ] **Chaque groupe sas naît avec sa date et sa tranche horaire** (« jeudi soir », « samedi midi ») : les personnes choisissent celui qui leur convient, sans sondage ni découpage après coup. N'importe quel membre du groupe public peut proposer un créneau en privé à un·e secrétaire ; c'est le ou la secrétaire qui synchronise tout : il ou elle crée le groupe sas (ou en devient admin s'il a été créé par quelqu'un d'autre) et poste l'annonce dans le groupe public, dont les secrétaires sont admins : « Rencontre jeudi soir : groupe sas », avec la consigne de **lui écrire en privé** (par nom d'utilisateur) pour être ajouté·e. **Jamais le lieu** : il est posté la veille dans le groupe sas.
- [ ] **Date pas encore fixée ?** Un sondage Signal dans le groupe sas, avec 2 ou 3 créneaux ; pas d'outil extérieur, qui garderait la trace de qui vient quand. Les votes ne sont pas anonymes : chaque membre voit qui a choisi quoi, ce qui ne pose pas de problème pour une date.[^signal-sondages]
- [ ] **Deux créneaux qui ont du succès ?** Une rencontre, un groupe sas : le ou la secrétaire en crée un second pour l'autre créneau, y ajoute les personnes qui l'ont choisi, puis les retire du premier. Un créneau qui n'attire qu'une ou deux personnes ne vaut pas un groupe : on garde le créneau majoritaire, et les autres viendront à la prochaine rencontre.
- [ ] **Quand donner le lieu ?** Par défaut, **la veille**, avec l'heure. Plus on le donne tard, moins longtemps il est connu, mais plus c'est difficile à organiser. Au choix du groupe : **le matin même** pour un petit sas, ou **en deux temps** (zone et heure la veille, point exact quelques heures avant, seulement aux personnes qui ont confirmé). Ce sont des choix d'organisation : aucune source n'en mesure l'effet.

### Ce qu'on vérifie à la rencontre

**À la rencontre, on ne vérifie pas l'identité.** Ni papiers, ni vrai nom, ni métier, ni quartier : ces questions fabriquent des informations qui identifient, et une personne malintentionnée a une histoire toute prête. Parler de tout et de rien met à l'aise, sans questions personnelles et sans rien noter ; pas de tour de table sur le métier ou le quartier, pour protéger aussi les nouvelles personnes les unes des autres. On vérifie plutôt :

1. **Le compte et les réglages** : code QR scanné, nom de militant·e, numéro caché.
2. **Qui la connaît** : « comment as-tu connu le groupe ? quelqu'un ici ou dans le mouvement te connaît ? », pour repérer un·e garant·e possible.
3. **Ce qu'elle veut faire** : quelles actions, quelle équipe.
4. **Qu'elle a compris la [charte](signal-modeles.md#charte-complete)**, en la lui faisant redire avec ses mots.
5. **Les signaux d'alerte**, sans accuser : pousser à l'illégal ou à la violence, vouloir savoir qui est qui et quels groupes existent, demander des noms ou des adresses, prendre des photos, vouloir entrer partout tout de suite.

### Nettoyer le groupe sas après la rencontre

- [ ] **Avant la rencontre** : on ne retire personne, mais on **ferme les entrées** : la veille, en postant l'heure et le lieu, le ou la secrétaire n'ajoute plus personne ; seules les personnes déjà ajoutées connaissent le lieu.
- [ ] **Pendant la rencontre** : pas de ménage, les téléphones sont rangés ; une tolérance annoncée pour les retardataires (30 minutes, par exemple), qui font réglages et code QR à la fin.
- [ ] **Après la rencontre** : le ménage se fait **le soir même**, au plus tard sous 48 heures : on retire les personnes non validées, absent·es compris ; elles ne voient plus rien de la suite. Plus on attend, plus longtemps des personnes non rencontrées voient la suite. Ce qu'elles ont déjà vu ne s'efface pas : fermer le groupe sas ensuite est une question d'hygiène (moins de groupes), pas de sécurité. Les absent·es restent dans le groupe public et viendront à la prochaine rencontre ; une personne absente qu'un·e garant·e connaît peut aussi être rencontrée seule par un·e secrétaire. **Exception** : les personnes rencontrées qui vont se retrouver à une action restent dans le sas, nettoyé et renommé, pour se donner rendez-vous seulement, jusqu'à ce que chacune soit ajoutée au groupe de confiance ou écartée (voir [les voir agir](signal-valider.md#recruter-a-porte-ouverte-les-voir-agir)).
- [ ] **Ensuite, au choix** : le fermer, ou le garder, renommé, comme **groupe de secours** du petit noyau de cette rencontre, pour garder le contact si le groupe principal est perdu (fermé par erreur, gardien·nes arrêté·es). On n'y organise rien et on n'y ajoute personne ; deux admins du noyau, de préférence **pas** les gardien·nes du groupe de confiance ; aucun lien ; messages éphémères à 1 semaine.[^signal-groupes][^signal-gerer-groupe] Il ne protège pas d'une fuite inconnue (cas B).
- [ ] **Sans groupe sas de secours**, on se retrouve par un message neutre des gardien·nes dans le groupe public (« les RH vous recontactent ») et par le point de repli en vrai.

## La rencontre en vrai, étape par étape

Le groupe sas organise la rencontre ; voici comment elle se passe. Ces consignes sont du bon sens d'organisation, pas des règles établies : adaptez-les. Une rencontre **réduit** le risque, elle ne l'élimine pas : c'est pourquoi s'y ajoutent un·e garant·e et le second contrôle des RH.

**Avant**

- [ ] **Un lieu public, neutre et fréquenté** (café, parc, local associatif ouvert), choisi par les secrétaires, jamais un domicile. De jour de préférence, avec une sortie facile.
- [ ] **Jamais une seule personne face à une nouvelle** : au moins deux membres vérifié·es, pas forcément secrétaires (le ou la secrétaire anime, une autre personne accueille et écoute). Deux regards repèrent mieux une incohérence. C'est aussi une protection pour la nouvelle personne, qui peut prévenir un·e proche de l'heure et du lieu.
- [ ] **Annoncez la durée** : 15 à 30 minutes par personne. Les petits groupes (5 à 15 personnes) évitent qu'on s'attarde sur un cas.
- [ ] **Le ou la garant·e vient de préférence** avec la personne, ou la confirme en privé : « la personne qui porte ce nom de militant·e est bien celle que je connais ». Rien de plus à échanger.
- [ ] **Les réglages sont envoyés avant**, pour que la rencontre serve à les vérifier, pas à les découvrir.

**Pendant (15 à 30 minutes)**

1. **Accueil (5 minutes).** Le ou la secrétaire se présente avec son nom de militant·e, rappelle à quoi sert le groupe (entraide, logistique, rien d'illégal) et ce qui va se passer. Il ou elle dit aussi qu'**on ne note rien et qu'on ne demande aucune identité**. L'objectif est de mettre à l'aise.
2. **Réglages et code QR (10 minutes).** Chaque personne manipule son téléphone et montre ses écrans ; le ou la secrétaire guide à voix haute : nom de militant·e, pas de photo, numéro caché, puis scan du code QR du numéro de sécurité. Le ou la secrétaire **regarde l'écran**, avec l'accord de la personne : les cocher à voix haute ne suffit pas.
3. **Conversation (10 minutes).** Des questions ouvertes, sans interrogatoire : « Qu'est-ce qui t'amène ? », « Qu'aimerais-tu faire : tracter, logistique, secourisme, juridique ? », « Comment as-tu connu le groupe ? », puis « Peux-tu me redire la [charte](signal-modeles.md#charte-complete) avec tes mots ? ». Écoutez plus que vous ne parlez. **La personne peut poser ses propres questions** (qui organise, comment, quels risques) et on lui répond : la confiance va dans les deux sens. Les contrôles à faire sont listés dans [ce qu'on vérifie à la rencontre](signal-recrutement.md#ce-quon-verifie-a-la-rencontre).
4. **Fin (2 minutes).** Dites ce qui se passe ensuite (« les RH reviennent vers toi sous quelques jours ») **sans promettre** : on ne dit jamais « tu es accepté·e » sur place.

**À éviter**

- [ ] **Ne testez pas par provocation** (proposer une action illégale « pour voir » sa réaction) : cela crée du risque pour tout le monde et ne prouve rien.
- [ ] **Ne tranchez pas seul·e sur place** : un malaise, une incohérence ou un signal d'alerte se disent aux RH après coup, sans accuser la personne.
- [ ] **N'essayez pas de deviner** qui est « infiltré·e » : on observe des comportements (pression, insistance, curiosité sur les autres), pas des profils.

**Après**

- [ ] **Un court point, de préférence à voix haute**, entre les deux membres vérifié·es présent·es, puis avec les RH, **le jour même** : ce qui s'est bien passé, ce qui a surpris. Une conversation Signal entre membres vérifié·es reste acceptable, en messages éphémères. Rien n'est écrit durablement avec des noms (voir « pas de liste de confiance »).
- [ ] **Un seul doute sérieux suffit pour attendre** : la personne reste dans le groupe public, et vient aux actions publiques.

## Recruteur·ses et secrétaires

- [ ] **Plusieurs de chaque**, pour ne dépendre de personne, et qui tournent.
- [ ] **Les recruteur·ses ne valident pas** et ne peuvent pas être garant·es de leurs propres recrues : sinon, une seule personne malintentionnée fait entrer tout son entourage. Ils et elles ne sont pas gardien·nes des groupes vérifiés (le rôle expose), et envoient la liste des [réglages](signal-membres.md#vos-reglages) avant une rencontre.
- [ ] **Les secrétaires sont des membres déjà vérifié·es**, jamais une personne du groupe sas désignée sur place. Les nouvelles personnes peuvent en revanche prendre de petites tâches sans droits dans Signal (gérer le temps, distribuer la parole, accueillir à la porte) : ça les implique et les fait connaître.
- [ ] **Pendant la rencontre**, chaque personne manipule elle-même son téléphone et montre ses écrans ; personne ne prend un téléphone déverrouillé en main.
- [ ] **Aucune liste** de présence, aucune note avec des noms.

[:octicons-arrow-left-24: Précédent : Vous êtes membre](signal-membres.md) · [Suivant : Valider :octicons-arrow-right-24:](signal-valider.md)

## Sources

Chaque note renvoie à la source de l'information. Les textes de loi évoluent : vérifiez la date de la source et, en cas de doute, demandez à un·e avocat·e.
