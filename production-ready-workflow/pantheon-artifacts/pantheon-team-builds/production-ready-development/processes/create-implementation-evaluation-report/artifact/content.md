---
created_at: {{ pantheon_timestamp }}
created_by: {{ pantheon_actor }}
---
{% set _include_test_coverage_analysis = true %}
<!-- SECTION:START:TEST_COVERAGE_ANALYSIS -->
{% if _include_test_coverage_analysis %}
{% include 'artifact-template://update-implementation-evaluation-report/sections/test_coverage_analysis' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:TEST_COVERAGE_ANALYSIS -->

{% set _include_architectural_alignment = true %}
<!-- SECTION:START:ARCHITECTURAL_ALIGNMENT -->
{% if _include_architectural_alignment %}
{% include 'artifact-template://update-implementation-evaluation-report/sections/architectural_alignment' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:ARCHITECTURAL_ALIGNMENT -->

{% set _include_code_quality_assessment = true %}
<!-- SECTION:START:CODE_QUALITY_ASSESSMENT -->
{% if _include_code_quality_assessment %}
{% include 'artifact-template://update-implementation-evaluation-report/sections/code_quality_assessment' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:CODE_QUALITY_ASSESSMENT -->

{% set _include_feedback_summary = true %}
<!-- SECTION:START:FEEDBACK_SUMMARY -->
{% if _include_feedback_summary %}
{% include 'artifact-template://update-implementation-evaluation-report/sections/feedback_summary' %}
{% else %}
<!-- SECTION:PLACEHOLDER -->
{% endif %}
<!-- SECTION:END:FEEDBACK_SUMMARY -->