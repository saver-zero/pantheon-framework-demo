---
created_at: {{ pantheon_timestamp }}
created_by: {{ pantheon_actor }}
---
{% set _include_destination = true %}
<!-- SECTION:START:DESTINATION -->
{% if _include_destination %}
{% include 'artifact-template://update-travel-preferences/sections/destination' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:DESTINATION -->

{% set _include_context = true %}
<!-- SECTION:START:CONTEXT -->
{% if _include_context %}
{% include 'artifact-template://update-travel-preferences/sections/context' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:CONTEXT -->

{% set _include_trip_details = true %}
<!-- SECTION:START:TRIP_DETAILS -->
{% if _include_trip_details %}
{% include 'artifact-template://update-travel-preferences/sections/trip_details' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:TRIP_DETAILS -->

{% set _include_interests = true %}
<!-- SECTION:START:INTERESTS -->
{% if _include_interests %}
{% include 'artifact-template://update-travel-preferences/sections/interests' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:INTERESTS -->

{% set _include_budget = true %}
<!-- SECTION:START:BUDGET -->
{% if _include_budget %}
{% include 'artifact-template://update-travel-preferences/sections/budget' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:BUDGET -->