---
review: juridique
tags:
    - emergency
hide:
    - toc
    - navigation
---

# Pocket card

Print it, cut it out and keep it on you: it stays useful if your phone is lost, flat or seized. Front: numbers. Back: your rights and reflexes.

<button class="md-button md-button--primary pocket__print" type="button" data-action="print">Print</button>

{% import "overrides/partials/sos.html" as sos with context %}

<div class="pocket" markdown="1">

<section class="pocket__side" markdown="1">

### Numbers

{{ sos.numbers('en') }}

**Legal team** (write it in): <span class="pocket__blank"></span>

**Person to notify**: <span class="pocket__blank"></span>

{{ sos.hotlines('en') }}

{% if config.site_url %}

<p class="pocket__qr"><img src="{{ config.site_url }}assets/social/qr.svg" alt="QR code to the Awesome Protest website" width="96" height="96"> <span>The site, offline once opened:<br><strong>{{ config.site_url }}</strong></span></p>
{% endif %}

</section>

<section class="pocket__side" markdown="1">

### In custody

1. I ask for **a lawyer** and **a doctor**.
2. I give my identity, then **I remain silent** until the lawyer arrives.
3. I talk **about no one** else.
4. I **re-read** everything; I sign nothing inaccurate.
5. Minor: my parents must be notified, a lawyer is mandatory.

### If I see an arrest

Time, place, description, unit → I call the legal team.

### Tear gas

I move away facing the wind, I don't rub, I rinse with saline.

</section>

</div>

Sources (in French): [emergency numbers]({{ emergency_source.url }}), [custody (Service-Public)](https://www.service-public.gouv.fr/particuliers/vosdroits/F14837), [minors (Service-Public)](https://www.service-public.gouv.fr/particuliers/vosdroits/F1469), [first moves (street medics)](https://paris-luttes.info/IMG/pdf/brochure_1_les_gestes_a_adopter_en_manif.pdf).
