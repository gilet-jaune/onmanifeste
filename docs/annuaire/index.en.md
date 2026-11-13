---
description: 'A directory of tools and resources for protesting in France: legal help, health, digital security, media, with checked sources.'
source_commit: b5d7c1f44c885a465a2e7e5810655b77bc8ee2e2
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
