---
description: "Relire les sources du site : ouvrez la source, donnez votre verdict, exportez un lot. Pseudonyme par défaut, rien n'est envoyé automatiquement."
tags:
    - contribuer
---

# Relire une information

Le contenu a été **recherché et rédigé avec l'aide d'une IA** et n'est **pas encore relu par des humains**. Si vous pouvez le faire, même pour quelques entrées, c'est très utile : vous ouvrez la source, vous dites si elle soutient bien l'information, et vous envoyez le résultat.

## Comment ça marche

1. Indiquez un **pseudonyme** et votre qualité (bénévole, avocat·e, soignant·e, historien·ne).
2. Pour chaque entrée, ouvrez la source puis choisissez **Confirmé**, **Erreur** ou **Périmé** (avec une courte explication).
3. Vos avis sont **enregistrés seulement dans votre navigateur**, vous pouvez arrêter et reprendre plus tard.
4. **Téléchargez votre lot** (un fichier) et envoyez-le (voir plus bas).

!!! warning "Pseudonyme par défaut"

    Un pseudonyme suffit. Votre vrai nom (nom, prénom) n'apparaît sur le site que si **vous** le demandez expressément, et il pourra alors être lu par tout le monde. N'écrivez jamais d'information personnelle dans les commentaires.

## Votre qualité

La qualité (avocat·e, soignant·e, historien·ne) est **déclarative** : elle ne donne aucun badge par elle-même. Elle est reconnue après vérification par le mainteneur, de préférence **sans document** : vous indiquez un identifiant public que l'on peut contrôler (annuaire du barreau, annuaire santé ou RPPS). Si un document est vraiment nécessaire, il est demandé par l'adresse e-mail dédiée ci-dessous, vérifié puis **supprimé, jamais conservé**. Tant que ce n'est pas fait, vos avis comptent comme ceux d'un·e bénévole.

<div data-relire></div>

## Envoyer votre lot

{% if config.extra.review_email %}

- Par e-mail : envoyez le fichier à **{{ config.extra.review_email }}**. {% endif %}
- Avec un compte GitHub : [ouvrez une _issue_]({{ repositories.docs.url }}/issues/new?template=4-relecture.yml) et collez-y le contenu du fichier. Votre compte sera alors visible : préférez l'e-mail si vous voulez rester anonyme. Le message n'est chiffré de bout en bout que si vous écrivez depuis une adresse Proton ou avec PGP.

Le lot est vérifié puis appliqué par le mainteneur : rien n'est publié automatiquement. Une fois appliqué, son contenu (pseudonyme, verdicts, commentaires) est **recopié dans une _issue_ publique** et une empreinte (SHA-256) est notée dans le commit, pour qu'on puisse vérifier qu'il n'a pas été modifié. Le fichier lui-même n'est pas conservé dans le code du site. Vous pouvez demander l'effacement de votre pseudonyme ou de votre nom dans cette _issue_ à tout moment.
