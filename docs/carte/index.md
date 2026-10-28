---
review: juridique
tags:
    - urgence
hide:
    - toc
    - navigation
---

# Carte de poche

À imprimer, découper et garder sur soi : elle reste utile si votre téléphone est perdu, déchargé ou saisi. Recto : numéros. Verso : vos droits et réflexes.

<button class="md-button md-button--primary pocket__print" type="button" data-action="print">Imprimer</button>

{% import "overrides/partials/sos.html" as sos with context %}

<div class="pocket" markdown="1">

<section class="pocket__side" markdown="1">

### Numéros

{{ sos.numbers('fr') }}

**Legal team** (à recopier) : <span class="pocket__blank"></span>

**Proche à prévenir** : <span class="pocket__blank"></span>

{{ sos.hotlines('fr') }}

{% if config.site_url %}

<p class="pocket__qr"><img src="{{ config.site_url }}assets/social/qr.svg" alt="QR code vers le site Awesome Protest" width="96" height="96"> <span>Le site, hors ligne une fois ouvert :<br><strong>{{ config.site_url }}</strong></span></p>
{% endif %}

</section>

<section class="pocket__side" markdown="1">

### En garde à vue

1. Je demande **un·e avocat·e** et **un médecin**.
2. Je donne mon identité, puis **je garde le silence** jusqu'à l'avocat·e.
3. Je ne parle **de personne** d'autre.
4. Je **relis** tout ; je ne signe rien d'inexact.
5. Mineur·e : mes parents doivent être prévenus, l'avocat·e est obligatoire.

### Si je vois une interpellation

Heure, lieu, description, unité → j'appelle la legal team.

### Gaz lacrymogène

Je m'éloigne face au vent, je ne frotte pas, je rince au sérum.

</section>

</div>

Sources : [numéros d'urgence]({{ emergency_source.url }}), [garde à vue (Service-Public)](https://www.service-public.gouv.fr/particuliers/vosdroits/F14837), [mineurs (Service-Public)](https://www.service-public.gouv.fr/particuliers/vosdroits/F1469), [premiers gestes (street medics)](https://paris-luttes.info/IMG/pdf/brochure_1_les_gestes_a_adopter_en_manif.pdf).
