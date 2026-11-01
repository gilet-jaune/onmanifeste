---
tags:
    - guides
    - communication
---

# Communiquer pendant une manif

!!! abstract "L'essentiel"

    - Avec du réseau : **Signal**, messages éphémères activés.
    - Sans réseau : **Briar**, avec au moins **une personne sous Android** par groupe (responsable com).
    - **Installez, testez et ajoutez vos contacts avant de partir** : sur place, plus rien ne se télécharge.
    - Toujours un **plan papier** : point de rendez-vous, heure de repli, numéros écrits.

Sur place, le réseau mobile sature souvent, et un téléphone peut être perdu ou saisi. Choisissez l'outil selon la situation, et prévoyez un plan B sans réseau.

!!! tip "Par où commencer ?"

    - Choisir une application : [le comparatif](#comparatif).
    - Le réseau est coupé ou saturé : [si Internet ou les réseaux sociaux sont coupés](#si-internet-ou-les-reseaux-sociaux-sont-coupes).

## Comparatif

| Critère | {{ res("signal") }} | {{ res("briar") }} | {{ res("meshtastic") }} | {{ res("bitchat") }} |
| --- | --- | --- | --- | --- |
| **Fonctionne sans Internet** | Non : réseau mobile ou Wi-Fi nécessaire | Oui, de proche en proche par Bluetooth ou Wi-Fi local[^briar-how] | Oui : le téléphone se connecte au boîtier en **Bluetooth** (ou Wi-Fi, USB), puis les boîtiers communiquent entre eux par **radio LoRa**, sans réseau mobile ni Internet[^meshtastic-intro][^meshtastic-bluetooth] | Oui, de téléphone en téléphone en Bluetooth, avec relais jusqu'à 7 sauts[^bitchat-readme] |
| **Matériel** | Le téléphone seul | Le téléphone seul (Android)[^briar-how] | Un boîtier radio LoRa (quelques dizaines d'euros), relié au téléphone en Bluetooth[^meshtastic-intro] | Le téléphone seul (Android et iPhone)[^bitchat-readme] |
| **Chiffrement** | De bout en bout, avec confidentialité persistante[^signal-docs] | De bout en bout, contacts stockés sur le téléphone[^briar-how] | Messages directs chiffrés ; canaux chiffrés par une clé partagée. Le canal **par défaut** utilise une clé publique : lisible par tous[^meshtastic-encryption] | Messages privés chiffrés (protocole Noise), mais un identifiant fixe et le pseudo sont diffusés **en clair**[^bitchat-whitepaper] |
| **Avantages** | Simple, très répandu, appels et groupes, messages éphémères[^eff-signal] | Aucune infrastructure, pas de numéro à donner | Portée de plusieurs kilomètres en réseau maillé, indépendant des antennes[^meshtastic-intro] | Ni compte ni numéro ; fonctionne aussi sur iPhone[^bitchat-readme] |
| **Cas d'usage** | Coordination avant et pendant la manif tant que le réseau tient ; groupes d'affinité | Groupe proche, réseau saturé ou coupé | Équipes réparties sur une grande zone (service d'ordre, street medics, legal team), réseau coupé | Dépannage entre Android et iPhone quand le réseau est coupé, pour des infos non sensibles |
| **Inconvénients** | Dépend du réseau mobile ; demande un numéro de téléphone[^eff-signal] | Portée courte ; Android seulement ; il faut s'ajouter en contact à l'avance[^briar-how] | Matériel à acheter et à configurer ; texte court uniquement ; en-têtes des paquets non chiffrés et pas de confidentialité persistante[^meshtastic-encryption] ; temps d'émission limité par la réglementation[^meshtastic-lora] | Appli récente ; une personne qui capte le Bluetooth peut lister les participant·es et **suivre un téléphone** d'un lieu à l'autre[^bitchat-whitepaper] |

!!! tip "Notre recommandation sans Internet : Briar"

    Si le réseau est coupé ou saturé, utilisez **Briar**, même si votre groupe compte surtout des iPhone : il suffit d'**une personne sous Android par groupe**, la ou le **responsable com**, qui centralise les messages et les relaie de vive voix. Briar est chiffré de bout en bout et ne demande ni matériel ni numéro.[^briar-how] Installez Briar **avant** la manif : une fois privé·e de réseau mobile, impossible de le télécharger. Gardez Bitchat pour le dépannage : il permet de suivre un téléphone.[^bitchat-whitepaper]

## Si Internet ou les réseaux sociaux sont coupés

Le réseau mobile peut saturer, être brouillé ou coupé. Le gouvernement peut aussi tenter de bloquer certaines plateformes : après la suspension de TikTok en Nouvelle-Calédonie en mai 2024, selon des documents publiés par Blast, Matignon a demandé par courrier le 22 octobre 2026 aux quatre grands opérateurs télécoms de se préparer à suspendre par filtrage DNS l'accès à TikTok, Instagram, Snapchat et X ; la mesure n'a finalement pas été appliquée.[^blast-coupure-reseaux-2026][^wiki-24-octobre-2026] Prévoyez un plan qui marche **sans plateformes centralisées, voire sans aucun réseau**.

- **Si seuls les réseaux sociaux sont bloqués par filtrage DNS** : les messageries chiffrées comme {{ res("signal") }} continuent en général de fonctionner, et un VPN sans compte ({{ res("mullvad-vpn") }}) ou le réseau Tor ({{ res("orbot") }}, {{ res("tor-browser") }}) permet de contourner un blocage DNS opérateur.[^blast-coupure-reseaux-2026]
- **Briar ou Meshtastic** : voir le comparatif ci-dessus, à installer et tester avant si tout Internet mobile est coupé.
- **Talkies-walkies PMR446** : utilisables sans licence ni abonnement dans toute l'Union européenne, quelques kilomètres de portée en ville.[^wiki-pmr446] Mais **rien n'est chiffré** : n'importe qui réglé sur le même canal entend tout, forces de l'ordre comprises.[^wiki-pmr446] Réservez-les aux consignes non sensibles (« on bouge », « point B ») et convenez du canal à l'avance.
- **SMS et appels** : si seules les données sont coupées, ils peuvent encore passer, mais ils ne sont pas chiffrés.
- **Le plan papier**, qui ne tombe jamais en panne :

    - [ ] un **point de rendez-vous** fixe, loin du parcours, et une **heure de repli** : si on se perd, on y va à l'heure prévue, puis à l'heure suivante ;
    - [ ] les **numéros utiles écrits** sur papier ou sur le bras, et la [carte de poche](../carte/index.md) imprimée ;
    - [ ] une **carte hors ligne** ou papier du quartier ([checklist avant la manif](avant-de-partir.md#carte-hors-ligne)).

- [ ] **Installez et testez vos applis avant de partir**, et ajoutez vos contacts Briar à ce moment-là : si le réseau mobile est coupé ou saturé sur place, vous ne pourrez plus rien télécharger.
- [ ] **Signal** : activez les messages éphémères, **réglés sur quelques heures (8 h, ou 3 h en durée personnalisée), quelques heures avant la manif**, au plus fort de l'organisation, puis le plus court que vous pouvez supporter, et le verrouillage de l'écran ; créez des groupes séparés par usage ([groupes Signal : s'organiser sans se faire infiltrer](groupes-signal.md)).[^eff-signal]
- [ ] **Meshtastic** : créez un **canal privé avec sa propre clé** et ne la partagez qu'avec votre équipe ; n'utilisez pas le canal par défaut pour des infos sensibles.[^meshtastic-encryption]
- [ ] **Meshtastic** : changez le **code d'appairage Bluetooth** ; sur les boîtiers sans écran, il vaut **123456** par défaut, et n'importe qui à proximité pourrait s'y connecter.[^meshtastic-bluetooth]
- [ ] **Meshtastic** : réglez la région sur **EU_868** ; en France, cette bande s'utilise sans licence, avec un temps d'émission limité.[^meshtastic-lora]
- [ ] **Briar** : ajoutez-vous en contact **avant** la manif, quand vous êtes ensemble.
- [ ] **Briar** : Briar n'existe que sur Android. Si votre groupe a des iPhone, désignez au moins une personne sous Android comme **responsable com** : les responsables com des différents groupes restent en lien sur Briar et relaient les infos à leur groupe de vive voix.[^briar-how]
- [ ] Pour tous : convenez d'un **point de rendez-vous** au cas où plus rien ne passe ([ne jamais rester seul·e](ne-pas-rester-seul.md)).

[:octicons-arrow-right-24: Outils de communication dans l'annuaire](../annuaire/index.md?category=communication)

## Sources

Chaque note renvoie à la source de l'information. Les textes de loi évoluent : vérifiez la date de la source et, en cas de doute, demandez à un·e avocat·e.
