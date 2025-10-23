---
created_at: {{ pantheon_timestamp }}
created_by: {{ pantheon_actor }}
---
{% set _include_search_criteria = true %}
<!-- SECTION:START:SEARCH_CRITERIA -->
{% if _include_search_criteria %}
{% include 'artifact-template://update-flight-options/sections/search_criteria' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:SEARCH_CRITERIA -->

{% set _include_cheapest_flights = true %}
<!-- SECTION:START:CHEAPEST_FLIGHTS -->
{% if _include_cheapest_flights %}
{% include 'artifact-template://update-flight-options/sections/cheapest_flights' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:CHEAPEST_FLIGHTS -->

{% set _include_shortest_flights = true %}
<!-- SECTION:START:SHORTEST_FLIGHTS -->
{% if _include_shortest_flights %}
{% include 'artifact-template://update-flight-options/sections/shortest_flights' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:SHORTEST_FLIGHTS -->