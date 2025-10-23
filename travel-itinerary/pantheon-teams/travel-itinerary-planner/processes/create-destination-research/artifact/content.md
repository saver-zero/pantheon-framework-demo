---
created_at: {{ pantheon_timestamp }}
created_by: {{ pantheon_actor }}
---
{% set _include_attractions = true %}
<!-- SECTION:START:ATTRACTIONS -->
{% if _include_attractions %}
{% include 'artifact-template://update-destination-research/sections/attractions' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:ATTRACTIONS -->

{% set _include_context = true %}
<!-- SECTION:START:CONTEXT -->
{% if _include_context %}
{% include 'artifact-template://update-destination-research/sections/context' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:CONTEXT -->

{% set _include_dining = true %}
<!-- SECTION:START:DINING -->
{% if _include_dining %}
{% include 'artifact-template://update-destination-research/sections/dining' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:DINING -->

{% set _include_activities = true %}
<!-- SECTION:START:ACTIVITIES -->
{% if _include_activities %}
{% include 'artifact-template://update-destination-research/sections/activities' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:ACTIVITIES -->

{% set _include_logistics = true %}
<!-- SECTION:START:LOGISTICS -->
{% if _include_logistics %}
{% include 'artifact-template://update-destination-research/sections/logistics' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:LOGISTICS -->