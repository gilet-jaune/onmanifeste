---
tags:
    - guides
    - communication
---

# Communiquer pendant une manif

Sur place, le réseau mobile sature souvent, et un téléphone peut être perdu ou saisi. Choisissez l'outil selon la situation, et prévoyez un plan B sans réseau.

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

## Si Internet est coupé

Le réseau mobile peut saturer, être brouillé ou coupé. Prévoyez un plan qui marche **sans aucun réseau**.

- **Briar ou Meshtastic** : voir le comparatif ci-dessus, à installer et tester avant.
- **Talkies-walkies PMR446** : utilisables sans licence ni abonnement dans toute l'Union européenne, quelques kilomètres de portée en ville.[^wiki-pmr446] Mais **rien n'est chiffré** : n'importe qui réglé sur le même canal entend tout, forces de l'ordre comprises.[^wiki-pmr446] Réservez-les aux consignes non sensibles (« on bouge », « point B ») et convenez du canal à l'avance.
- **SMS et appels** : si seules les données sont coupées, ils peuvent encore passer, mais ils ne sont pas chiffrés.
- **Le plan papier**, qui ne tombe jamais en panne :

    - [ ] un **point de rendez-vous** fixe, loin du parcours, et une **heure de repli** : si on se perd, on y va à l'heure prévue, puis à l'heure suivante ;
    - [ ] les **numéros utiles écrits** sur papier ou sur le bras, et la [carte de poche](../carte/index.md) imprimée ;
    - [ ] une **carte hors ligne** ou papier du quartier ([checklist avant la manif](avant-de-partir.md#carte-hors-ligne)).

- [ ] **Installez et testez vos applis avant de partir**, et ajoutez vos contacts Briar à ce moment-là : si le réseau mobile est coupé ou saturé sur place, vous ne pourrez plus rien télécharger.
- [ ] **Signal** : activez les messages éphémères et le verrouillage de l'écran ; créez des groupes séparés par usage.[^eff-signal]
- [ ] **Meshtastic** : créez un **canal privé avec sa propre clé** et ne la partagez qu'avec votre équipe ; n'utilisez pas le canal par défaut pour des infos sensibles.[^meshtastic-encryption]
- [ ] **Meshtastic** : changez le **code d'appairage Bluetooth** ; sur les boîtiers sans écran, il vaut **123456** par défaut, et n'importe qui à proximité pourrait s'y connecter.[^meshtastic-bluetooth]
- [ ] **Meshtastic** : réglez la région sur **EU_868** ; en France, cette bande s'utilise sans licence, avec un temps d'émission limité.[^meshtastic-lora]
- [ ] **Briar** : ajoutez-vous en contact **avant** la manif, quand vous êtes ensemble.
- [ ] **Briar** : Briar n'existe que sur Android. Si votre groupe a des iPhone, désignez au moins une personne sous Android comme **responsable com** : les responsables com des différents groupes restent en lien sur Briar et relaient les infos à leur groupe de vive voix.[^briar-how]
- [ ] Pour tous : convenez d'un **point de rendez-vous** au cas où plus rien ne passe ([ne jamais rester seul·e](ne-pas-rester-seul.md)).

[:octicons-arrow-right-24: Outils de communication dans l'annuaire](../annuaire/index.md?category=communication)

## Sources

Chaque note renvoie à la source de l'information. Les textes de loi évoluent : vérifiez la date de la source et, en cas de doute, demandez à un·e avocat·e.
