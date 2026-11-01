---
source_commit: 2f4b412b8742151d64a72e00230bdae80d47c681
review: juridique
review_status: pending
tags:
    - emergency
hide:
    - toc
    - navigation
---

# Pocket card

Print it, cut it out and keep it on you: it stays useful if your phone is lost, flat or seized. Need more? See the [A4 memo sheets](../fiches/index.md) (police custody, first aid). Front: numbers. Back: your rights and reflexes.

<button class="md-button md-button--primary pocket__print" type="button" data-action="print">Print</button>

{% import "overrides/partials/sos.html" as sos with context %}

<div class="pocket" markdown="1">

<section class="pocket__side" markdown="1">

### Numbers

{{ sos.numbers('en') }}

**Legal team** (write it in): <span class="pocket__blank"></span>

**Person to notify**: <span class="pocket__blank"></span>

_(On your arm: **10 digits under your sleeve, no name** — someone not protesting who answers hidden numbers.)_

{{ sos.hotlines('en') }}

{% if config.site_url %}

<p class="pocket__qr"><img src="{{ config.site_url }}assets/social/qr.svg" alt="QR code to the Awesome Protest website" width="96" height="96"> <span>The site, offline once opened:<br><strong>{{ config.site_url }}</strong><br>Not sure what to do? <strong>{{ config.site_url }}parcours/</strong></span></p>
{% endif %}

</section>

<section class="pocket__side" markdown="1">

### In custody

1. I ask for **a lawyer** and **a doctor**.
2. I give my identity, then **I remain silent** until the lawyer arrives.
3. I read the number on my arm (**I do not unlock my phone**).
4. I talk **about no one** else.
5. I **re-read** everything; I sign nothing inaccurate.
6. Minor: my parents must be notified, a lawyer is mandatory.

### Stops, searches and phone

- **Phone**: lock with passcode before arrest (iPhone: _Volume + Side button 2 s_; Android: _Power → Lockdown_).
- **Bag**: visual check yes; search only by a judicial police officer (otherwise say: "I do not consent to the search").
- **Fine (€135)**: do not pay on the spot if you want to contest it (45 days).

### If I see an arrest

Time, place, description, unit → I call the legal team.

### Tear gas

I move away facing the wind, I don't rub, I rinse with saline.

</section>

</div>

Sources (in French): [emergency numbers]({{ emergency_source.url }}), {{ res("sp-garde-a-vue", "custody (Service-Public)") }}, {{ res("sp-garde-a-vue-mineur", "minors (Service-Public)") }}, {{ res("guide-manifestant-arrete", "stops and searches (Syndicat de la magistrature)") }}, {{ res("medic-gestes-manif", "first moves (street medics)") }}.
