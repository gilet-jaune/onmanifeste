---
description: 'A directory of tools and resources for protesting in France: legal help, health, digital security, media, with checked sources.'
source_commit: 938f841e5cde7f657165a8e00b9d91e6a5fc119a
tags:
    - directory
hide:
    - toc
image: assets/covers/annuaire.svg
image_alt: ''
---

# Resource Directory

Search a tool by name, description or keyword, then refine by type of help and keywords. Filters are kept in the URL so you can share a search.

{% import "overrides/partials/resource-cards.html" as rc with context %}

<div data-resource-directory>
    <noscript><p>JavaScript is disabled: the full list is shown below, without filters.</p></noscript>
    {{ rc.cards('en') }}
</div>
