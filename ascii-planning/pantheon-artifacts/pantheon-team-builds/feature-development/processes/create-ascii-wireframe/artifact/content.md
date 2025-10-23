---
created_at: {{ pantheon_timestamp }}
created_by: {{ pantheon_actor }}
---
{% set _include_layout_specification = true %}
<!-- SECTION:START:LAYOUT_SPECIFICATION -->
{% if _include_layout_specification %}
{% include 'artifact-template://update-ascii-wireframe/sections/layout_specification' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:LAYOUT_SPECIFICATION -->

{% set _include_context = true %}
<!-- SECTION:START:CONTEXT -->
{% if _include_context %}
{% include 'artifact-template://update-ascii-wireframe/sections/context' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:CONTEXT -->

{% set _include_flow_diagram = true %}
<!-- SECTION:START:FLOW_DIAGRAM -->
{% if _include_flow_diagram %}
{% include 'artifact-template://update-ascii-wireframe/sections/flow_diagram' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:FLOW_DIAGRAM -->

{% set _include_design_decisions = true %}
<!-- SECTION:START:DESIGN_DECISIONS -->
{% if _include_design_decisions %}
{% include 'artifact-template://update-ascii-wireframe/sections/design_decisions' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:DESIGN_DECISIONS -->

{% set _include_component_registry = true %}
<!-- SECTION:START:COMPONENT_REGISTRY -->
{% if _include_component_registry %}
{% include 'artifact-template://update-ascii-wireframe/sections/component_registry' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:COMPONENT_REGISTRY -->