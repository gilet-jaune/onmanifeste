---
description: 'A directory of tools and resources for protesting in France: legal help, health, digital security, media, with checked sources.'
source_commit: 4637462e02618d6b3ce3bca1963244d3f6cef4be
tags:
    - directory
hide:
    - toc
image: assets/covers/annuaire.svg
image_alt: ''
---

# Resource Directory

Search a tool by name, description or tag, then refine by category and tags. Filters are kept in the URL so you can share a search.

{% import "overrides/partials/resource-cards.html" as rc with context %}

<div data-resource-directory>
    <noscript><p>JavaScript is disabled: the full list is shown below, without filters.</p></noscript>
    {{ rc.cards('en') }}
</div>
