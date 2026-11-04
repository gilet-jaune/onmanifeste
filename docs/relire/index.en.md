---
description: 'Review the sources of this site: open the source, give your verdict, export a batch. Pseudonym by default, nothing is sent automatically.'
source_commit: 577592a89464c3ab32ada8aabaff84e5037ac7f6
tags:
    - contributing
---

# Review a piece of information

The content was **researched and written with the help of an AI** and has **not yet been reviewed by humans**. If you can, even for a few entries, it helps a lot: you open the source, say whether it really supports the information, and send the result.

## How it works

1. Enter a **pseudonym** and your role (volunteer, lawyer, health professional, historian).
2. For each entry, open the source then choose **Confirmed**, **Error** or **Outdated** (with a short explanation).
3. Your reviews are **saved only in your browser**, so you can stop and resume later.
4. **Download your batch** (one file) and send it (see below).

!!! warning "Pseudonym by default"

    A pseudonym is enough. Your real name appears on the site only if **you** explicitly ask for it, and anyone can then read it. Never write personal information in comments.

## Your role

The role (lawyer, health professional, historian) is **self-declared**: it grants no badge by itself. It is recognised after the maintainer checks it, preferably **without any document**: you give a public identifier that can be looked up (bar directory, health directory or RPPS). If a document is really needed, it is requested through the dedicated e-mail address below, checked, then **deleted, never kept**. Until then, your reviews count as a volunteer's.

<div data-relire></div>

## Send your batch

{% if config.extra.review_email %}

- By e-mail: send the file to **{{ config.extra.review_email }}**. {% endif %}
- With a GitHub account: [open an _issue_]({{ repositories.docs.url }}/issues/new?template=4-relecture.yml) and paste the content of the file into it. Your account will then be visible: prefer e-mail if you want to stay anonymous. The message is end-to-end encrypted only if you write from a Proton address or use PGP.

The batch is checked then applied by the maintainer: nothing is published automatically. Once applied, its content (pseudonym, verdicts, comments) is **copied into a public _issue_** and a fingerprint (SHA-256) is recorded in the commit, so anyone can check that it was not altered. The file itself is not kept in the site's code. You can ask for your pseudonym or name to be erased from that _issue_ at any time.
