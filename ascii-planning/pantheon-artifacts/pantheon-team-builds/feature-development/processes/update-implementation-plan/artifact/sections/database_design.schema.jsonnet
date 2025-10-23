{
  "type": "object",
  "required": [
    "schema_changes",
    "data_migrations",
    "data_integrity"
  ],
  "properties": {
    "data_integrity": {
      "authoring_guidance": "Target 100-200 words. Cover: foreign key relationships, uniqueness constraints, check constraints, cascade behaviors, validation rules enforced at database level. Explain rationale for key constraints.",
      "description_for_schema": "Describe data integrity considerations: validation rules, referential integrity constraints, uniqueness requirements, and consistency checks.",
      "purpose": "Identifies constraints, validations, and referential integrity rules that protect data quality and consistency.",
      "type": "string"
    },
    "data_migrations": {
      "authoring_guidance": "Target 100-200 words. Outline migration steps in order. Address: how existing data is handled, whether backfilling is needed, if migrations can run online, rollback strategy. If no migrations needed, state 'No data migrations required'.",
      "description_for_schema": "Describe migration strategy for deploying schema changes. Include steps for backfilling data, handling existing records, and rollback plans.",
      "purpose": "Plans how to safely evolve the database schema and existing data without breaking running systems or losing information.",
      "type": "string"
    },
    "schema_changes": {
      "authoring_guidance": "Target 200-400 words. For each table/column change, specify: name, data type, constraints (nullable, unique, default), indexes, foreign keys. Use clear formatting. If no changes needed, state 'No schema changes required'.",
      "description_for_schema": "Describe all database schema changes: new tables, columns, indexes, foreign keys, or modifications to existing structures. Include data types and constraints.",
      "purpose": "Specifies new tables, columns, indexes, or relationships required to support the feature's data needs.",
      "type": "string"
    }
  }
}