---
description: "Comment et pourquoi ce site utilise une IA : ce qu'elle fait, ce qu'elle ne fait pas, ses limites, son coût, et ce qui reste à relire par des humains."
tags:
    - ia
    - transparence
    - mentions légales
---

# Comment nous utilisons l'IA

!!! info "En bref"

    - **Oui, ce site est largement fait avec l'aide d'une IA** : recherche des sources, résumés, rédaction, traduction et code.
    - **Le moteur du site n'est pas fait par une IA** : c'est [MkDocs](https://www.mkdocs.org/) avec le thème Material, des logiciels libres qui convertissent des fichiers texte (Markdown) en pages web. Mais la couche personnalisée (filtres de la frise, recherche, mode hors ligne, scripts de contrôle) a été écrite avec une IA.
    - **Aucune IA ne fonctionne sur le site ni sur votre appareil.** Le site est statique : il n'envoie aucune de vos données à un service d'IA.
    - **Rien n'est encore relu par un humain** : chaque fiche (annuaire, événements, sources, victimes) affiche son niveau de vérification, aujourd'hui « sourcé, non relu par un humain ». La relecture humaine reste à faire : voir plus bas.
    - **Les pages juridiques et médicales** sont marquées « pas encore relu » tant qu'un·e professionnel·le ne les a pas relues.

## Pourquoi une IA ?

Ce projet est **bénévole et anonyme**. Son but n'est pas de produire une information nouvelle mais de **rassembler, en français et hors ligne, des informations déjà publiées** (textes de loi, administrations, associations, médias) pour des personnes qui manifestent, parfois dans l'urgence. Sans IA, ce travail de recherche, de rédaction et de mise à jour aurait été beaucoup plus lent, et le site n'existerait sans doute pas à cette échelle.

**Une question d'échelle.** Ce site compte aujourd'hui {{ resources | length }} ressources, plus de quarante guides, {{ events | length }} événements sourcés, en deux langues, avec des contrôles automatiques et un mode hors ligne. Pour une équipe bénévole très réduite, qui a un travail et une vie à côté, c'est hors de portée sans outil d'assistance : sans IA, un tel site n'aurait pas pu être construit à cette échelle, et de l'avis du mainteneur, **l'idée n'aurait tout simplement pas vu le jour**. L'IA sert ici à **défendre une cause rapidement**, avec peu de moyens, et à rendre accessibles des informations utiles à des personnes qui manifestent.

**Ce que cela ne veut pas dire.** Aller vite n'est pas une raison de moins vérifier : c'est pourquoi chaque fiche montre sa source, sa date et son niveau de relecture, et pourquoi nous appelons à la relecture humaine. L'IA permet d'exister ; elle ne remplace pas la confiance, qui se gagne par la vérification.

C'est un choix assumé, avec ses contreparties, détaillées ci-dessous.

## Ce que fait l'IA

- **Chercher et lire** des pages publiques (textes officiels, rapports, presse, sites d'associations).
- **Résumer avec les sources** : les textes sont reformulés, jamais recopiés, et chaque fait renvoie à sa source datée.
- **Rédiger** des guides, des événements de la frise et des fiches de l'annuaire, à partir de ces sources.
- **Traduire** le français vers l'anglais. Le français reste la version de référence.
- **Écrire et tester le code personnalisé** du site : modèles de page, scripts (filtres, recherche, mode hors ligne), scripts de contrôle des données et tests. Le moteur MkDocs et le thème Material ne sont pas concernés : ce sont des logiciels libres existants, que le site utilise tels quels.

Les outils employés sont des modèles de langage de la famille Claude (Anthropic), utilisés par l'intermédiaire d'un assistant de programmation.

## Ce que l'IA ne fait pas

- **Elle ne se donne jamais un niveau de vérification humain.** Une fiche produite par une IA reçoit toujours le niveau `ai` ; seul·e un·e bénévole, avocat·e, soignant·e ou historien·ne peut en changer.
- **Elle ne publie pas seule** : les modifications ne sont envoyées au dépôt que lorsque le mainteneur le demande.
- **Elle ne traite aucune donnée de visiteur·ses** : le site ne contient ni analytics ni intégration externe.
- **Elle n'est pas une autorité** : elle ne remplace ni un·e avocat·e, ni un·e soignant·e, ni les collectifs dont c'est le travail.

Les règles de rédaction sont publiques : faits établis uniquement, présomption d'innocence (personne non condamnée n'est nommée), attribution des affirmations des ONG à leurs auteurs, pas de données personnelles. Voir la [politique de contenu]({{ repositories.docs.url }}/blob/main/MODERATION.md).

## Limites et risques

Une IA peut **se tromper, inventer ou mal résumer** une source. Voici ce qui limite ce risque, et ce qui ne le supprime pas :

- Chaque fiche porte **sa source, la date de vérification et un badge** qui dit qui l'a contrôlée. Les informations non confirmées sont signalées comme telles, avec une note.
- Des **contrôles automatiques** vérifient la structure des données, que chaque source est citée, que les liens existent et que les traductions suivent le français. Ils **ne vérifient pas qu'un fait est vrai** : seule une relecture humaine le peut.
- Une IA peut aussi avoir des **biais**, dans le choix des sources et la formulation. C'est une raison de plus de relire, et de lire les sources originales plutôt que nos résumés.

Pour les questions juridiques ou de santé, ne vous fiez pas à ce site seul : appelez un·e avocat·e, une permanence juridique ou un service de secours (voir [SOS](../sos/index.md)).

## Coût et désaccords possibles

L'IA a un **coût énergétique et matériel**, et plusieurs causes défendues sur ce site, comme l'écologie ou la concentration des pouvoirs économiques, s'y opposent. Nous le reconnaissons : l'usage de l'IA ici est un compromis entre cette critique et la possibilité d'offrir gratuitement une information sourcée et hors ligne. On peut le contester. Si vous le faites, dites-le nous : c'est une discussion légitime.

## Ce qui reste à faire : la relecture humaine

L'objectif est que la **vérification** ne repose plus sur l'IA seule : faire relire en priorité ce qui engage le plus (urgence, droit, santé, faits sur des personnes), puis le reste. Si vous pouvez relire quelques fiches, même sans compétence particulière, voir [Relire une information](../relire/index.md) et [Contribuer](../contribuer/index.md).

## Corriger, contester, retirer

Une erreur, un oubli, une mention qui vous concerne ? Ouvrez une [issue]({{ repositories.docs.url }}/issues/new/choose) ou faites un [signalement privé]({{ repositories.docs.url }}/security/advisories/new). Une personne ou un collectif mentionné·e peut demander une correction ou un retrait. Voir aussi les [mentions légales](../mentions-legales/index.md).
