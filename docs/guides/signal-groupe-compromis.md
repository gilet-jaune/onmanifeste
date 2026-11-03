---
review: juridique
review_status: pending
tags:
    - guides
    - organiser
    - téléphone
    - schéma
---

# Groupes Signal : groupe compromis

[:octicons-arrow-left-24: Groupes Signal : vue d'ensemble](groupes-signal.md)

Mots utilisés ici : [les groupes](groupes-signal.md#les-groupes) (public, sas, confiance), [les rôles](groupes-signal.md#les-roles) (RH, gardien·ne…) et le [vocabulaire](groupes-signal.md#vocabulaire-et-concepts-cles).

## Que faire ?

<div class="flow" markdown>

1. **Que se passe-t-il ?**
    - **Quelqu'un se fait embarquer, ou perd son téléphone** → [retrait conservatoire](signal-groupe-compromis.md#retrait-conservatoire), tout de suite.
    - **Un doute sérieux sur une personne** → [pause préventive](signal-groupe-compromis.md#pause-preventive-en-cas-de-doute), puis deux RH décident sous 24 heures.
    - **Un inconnu dans le groupe, une fuite** → étape 2.
2. **Le groupe est-il compromis ?** → voir la liste ci-dessous.
3. **Sait-on par où ça fuit ?**
    - **Oui, et c'est retiré** → [cas A](signal-groupe-compromis.md#cas-a-on-sait-par-ou-ca-fuit) : le groupe continue.
    - **Non** → [cas B](signal-groupe-compromis.md#cas-b-on-ne-sait-pas-demenager) : on déménage.
4. **Les sous-groupes** → même question pour chacun (voir plus bas).

</div>

## Quand un groupe est-il compromis ?

Un groupe est compromis quand une personne qui ne devrait pas peut **lire ses messages** (passés ou à venir) ou **connaître ses membres**. Signal ne garde pas trace de qui est dans quel groupe,[^signal-groupes] mais **un téléphone déverrouillé montre tout** : membres, messages pas encore effacés, nom, présentation et historique des alertes du groupe.

**Compromis, à traiter tout de suite :**

- un membre est **arrêté ou placé en garde à vue avec son téléphone** ;
- un téléphone est **perdu ou volé** ;
- un membre **inconnu** apparaît, ou quelqu'un a été ajouté sans être validé par un·e secrétaire ;
- Signal indique que le **numéro de sécurité** d'un membre a changé alors qu'il est en garde à vue ou a perdu son téléphone : son compte a peut-être été réinstallé ailleurs ;[^eff-signal]
- une **fuite** est constatée (une personne a transmis des informations du groupe).

**À évaluer, sans paniquer :**

- une **fuite** : une info qui n'était que dans le groupe ressort chez la police, dans la presse ou à l'extrême droite ;
- un membre arrêté **sans** son téléphone : rien n'est lisible, mais il peut parler sous la pression ; vigilance, pas de déménagement automatique ;
- un membre qui part fâché ou qu'on exclut.

**La question clé : sait-on par où ça fuit ?** La « fuite », c'est la personne ou le téléphone par lequel quelqu'un d'extérieur accède au groupe.

- **On le sait, et on l'a retiré** (un membre arrêté avec son téléphone, un téléphone perdu, une personne à l'origine d'une fuite identifiée) : ce téléphone ou cette personne a vu le **passé** (historique, membres, nom), mais plus rien de l'**avenir**. Le groupe peut continuer.
- **On ne le sait pas** (une info sortie sans qu'on sache par qui, un doute sans coupable identifié) : la fuite est peut-être encore dans le groupe ; le passé **et** l'avenir sont exposés. Il faut **déménager**.

## Retrait conservatoire

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

## Pause préventive en cas de doute

Le retrait conservatoire vaut aussi pour un **doute sérieux**, sans arrestation. Ce sont des règles d'organisation, pas du droit.

- **Un·e RH ou un·e gardien·ne** qui a un doute sérieux sur une personne la retire **tout de suite** des groupes sensibles (groupe de confiance et sous-groupes), **sans accusation ni justification**. Elle reste dans le groupe public.
- **Le message est celui du retrait conservatoire** : retiré·e par précaution, rien de personnel. Rien d'autre dans le groupe.
- **Deux RH décident sous 24 heures** si la personne revient. S'ils ne peuvent pas trancher, ils prolongent la pause à deux et le notent au registre.
- **Garde-fous** : le registre note **qui** a déclenché la pause et **quand**, jamais **pourquoi** ; la personne qui l'a déclenchée ne participe pas à la décision finale ; la personne peut s'adresser à un·e autre RH.

## Cas A : on sait par où ça fuit

1. **Vérifiez que la personne est bien retirée** de tous les groupes où elle était (registre).
2. **Faites l'inventaire de ce qui est exposé** : messages dans le délai d'effacement et non lus, liste des membres, nom, présentation, historique des alertes (ajouts, retraits, changements de nom). Considérez tout cela comme connu.
3. **Prévenez individuellement les membres exposés**, en particulier ceux dont le numéro était visible.
4. **Nettoyez pour la suite** : présentation réduite à la charte, délai plus court, messages sensibles récents supprimés pour tout le monde.[^signal-gerer-groupe]
5. **Renommer ne sert qu'à l'avenir** : le téléphone saisi garde l'ancien nom. Changez-le seulement s'il en dit trop, et notez le nouvel identifiant dans le registre.
6. **Inutile de dissoudre le groupe** si personne d'autre n'est en doute.

## Cas B : on ne sait pas, déménager

1. **N'annoncez rien dans le groupe** : la personne qui fait fuiter le lit. Décidez en vrai, entre gardien·nes et RH, et cherchez discrètement d'où vient la fuite : quelle information est sortie, qui l'avait (quel groupe, quel sous-groupe, à quelle date). Ça réduit souvent le cercle à quelques personnes ; un doute ne prouve rien, n'accusez personne. Si les échanges doivent s'arrêter tout de suite, une phrase claire et neutre suffit : « **Pause : on n'écrit plus rien ici jusqu'à nouvel ordre.** » Sans dire pourquoi, ni où se retrouver : la fuite connaît le point de repli comme les autres membres. Ensuite, on réinvite un par un.
2. **Créez une nouvelle famille** : nouveau groupe de confiance avec un nouvel identifiant, **sans lien**.
3. **Réinvitez un par un, de façon proportionnée** : d'abord les personnes connues en vrai depuis longtemps, par plusieurs membres, après un court point en vrai et une nouvelle vérification du code QR ; les personnes entrées récemment, ou qui avaient l'information qui a fuité, repassent par une **nouvelle validation** : un·e secrétaire en vrai, un·e garant·e (voire deux), puis le second contrôle des RH. Si la fuite continue dans le nouveau groupe, elle est parmi ses membres : le cercle se resserre.
4. **Fermez l'ancien groupe seulement une fois la migration faite** : pendant le déménagement, sa liste de membres est votre liste des personnes à réinviter, et Signal ne garde nulle part qui était dans un groupe.[^signal-groupes] **Avant de fermer, comparez les deux listes** : les personnes pas encore réinvitées (absentes, injoignables) sont notées au registre par leur nom de militant·e, pour être retrouvées au point de repli. Signal ne permet pas non plus de supprimer un groupe pour tout le monde : postez un message neutre (« groupe fermé »), retirez les membres un par un, puis quittez-le.
5. **Chacun·e quitte l'ancien groupe une fois dans le nouveau**, et pas avant, puis supprime la conversation : supprimer la conversation ne fait pas quitter le groupe.[^signal-supprimer]
6. **Marquez l'identifiant comme perdu** dans le registre.

**L'ancien groupe a déjà été supprimé ?**

- **Si seule la conversation a été supprimée**, le groupe existe toujours : tapez son nom dans la recherche de Signal pour le retrouver, avec ses membres.[^signal-supprimer]
- **S'il a vraiment été fermé** : demandez aux autres gardien·nes et RH, qui l'ont peut-être encore ; le **registre** donne les noms de militant·e à retrouver ; chaque secrétaire peut faire réinviter les comptes qu'il ou elle a vérifiés par code QR ; les gardien·nes des sous-groupes encore actifs réinvitent leurs membres ; pour tous les autres, le **point de repli** en vrai.

## Et les sous-groupes ?

- **La personne ou le téléphone à l'origine de la fuite était dans le sous-groupe** → même procédure pour lui.
- **Ni l'une ni l'autre n'y était** → le sous-groupe n'est pas exposé par cette fuite. Si son nom ou son identifiant apparaissait dans les messages ou la présentation du groupe parent, renommez-le avec le nouvel identifiant de la famille ; pas besoin de le dissoudre.
- **Fuite non identifiée dans le groupe parent** → revoyez les membres du sous-groupe venus du parent ; dissolvez seulement s'il y a un doute sur l'un d'eux.

[:octicons-arrow-left-24: Précédent : Tenir les groupes](signal-gerer.md) · [Suivant : Modèles à copier-coller :octicons-arrow-right-24:](signal-modeles.md)

## Sources

Chaque note renvoie à la source de l'information. Les textes de loi évoluent : vérifiez la date de la source et, en cas de doute, demandez à un·e avocat·e.
