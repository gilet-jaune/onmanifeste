---
review: juridique
review_status: pending
tags:
    - urgence
hide:
    - toc
    - navigation
---

# Carte de poche

À imprimer, découper et garder sur soi : elle reste utile si votre téléphone est perdu, déchargé ou saisi. Recto : numéros. Verso : vos droits et réflexes. Besoin de plus ? Les [fiches mémo A4](../fiches/index.md) (garde à vue, premiers secours).

<button class="md-button md-button--primary pocket__print" type="button" data-action="print">Imprimer</button>

{% import "overrides/partials/sos.html" as sos with context %}

<div class="pocket" markdown="1">

<section class="pocket__side" markdown="1">

### Numéros

{{ sos.numbers('fr') }}

**Legal team** (à recopier) : <span class="pocket__blank"></span>

**Proche à prévenir** : <span class="pocket__blank"></span>

_(Sur le bras : **10 chiffres sous la manche, sans nom** — proche hors manif qui décroche aux numéros masqués.)_

{{ sos.hotlines('fr') }}

{% if config.site_url %}

<p class="pocket__qr"><img src="{{ config.site_url }}assets/social/qr.svg" alt="QR code vers le site Awesome Protest" width="96" height="96"> <span>Le site, hors ligne une fois ouvert :<br><strong>{{ config.site_url }}</strong><br>Pas sûr·e de quoi faire ? <strong>{{ config.site_url }}parcours/</strong></span></p>
{% endif %}

</section>

<section class="pocket__side" markdown="1">

### En garde à vue

1. Je demande **un·e avocat·e** et **un médecin**.
2. Je donne mon identité, puis **je garde le silence** jusqu'à l'avocat·e.
3. Je lis le numéro sur mon bras (**je ne déverrouille pas mon téléphone**).
4. Je ne parle **de personne** d'autre.
5. Je **relis** tout ; je ne signe rien d'inexact.
6. Mineur·e : mes parents doivent être prévenus, l'avocat·e est obligatoire.

### Contrôle, fouille et téléphone

- **Téléphone** : verrouiller par code avant interpellation (iPhone : _Volume + Bouton latéral 2 s_ ; Android : _Marche → Verrouiller_).
- **Sac** : inspection visuelle oui ; fouille uniquement par un·e OPJ (sinon, dites « je ne consens pas à la fouille »).
- **Amende (135 €)** : ne payez pas sur place si vous voulez contester (45 jours).

### Si je vois une interpellation

Heure, lieu, description, unité → j'appelle la legal team.

### Gaz lacrymogène

Je m'éloigne face au vent, je ne frotte pas, je rince au sérum.

</section>

</div>

Sources : [numéros d'urgence]({{ emergency_source.url }}), {{ res("sp-garde-a-vue", "garde à vue (Service-Public)") }}, {{ res("sp-garde-a-vue-mineur", "mineurs (Service-Public)") }}, {{ res("guide-manifestant-arrete", "contrôle et fouille (Syndicat de la magistrature)") }}, {{ res("medic-gestes-manif", "premiers gestes (street medics)") }}.
