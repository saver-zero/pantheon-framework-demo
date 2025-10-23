{
  "type": "object",
  "properties": {
    "authentication": {
      "description_for_schema": "The authentication solution for user management and security",
      "properties": {
        "name": {
          "description_for_schema": "Auth solution name (e.g., Supabase Auth, Better Auth, NextAuth)",
          "purpose": "The auth provider or library for reference and integration.",
          "type": "string"
        },
        "rationale": {
          "description_for_schema": "Why this authentication approach was selected",
          "purpose": "Why this auth solution was chosen. Explains security model and integration approach.",
          "type": "string"
        }
      },
      "purpose": "The auth solution that handles user identity and security. Critical for understanding auth flow patterns during implementation.",
      "required": [
        "name",
        "rationale"
      ],
      "type": "object"
    },
    "database": {
      "description_for_schema": "The database solution used for data persistence",
      "properties": {
        "name": {
          "description_for_schema": "Database name (e.g., Supabase, PostgreSQL, MongoDB)",
          "purpose": "The database technology for reference and configuration.",
          "type": "string"
        },
        "rationale": {
          "description_for_schema": "Why this database was selected",
          "purpose": "Why this database was chosen. Anchors data architecture decisions and ORM/client library selections.",
          "type": "string"
        }
      },
      "purpose": "The persistence layer choice that shapes data modeling and query patterns throughout implementation.",
      "required": [
        "name",
        "rationale"
      ],
      "type": "object"
    },
    "framework": {
      "description_for_schema": "The main framework used for building the application",
      "properties": {
        "name": {
          "description_for_schema": "Framework name (e.g., Next.js, React Native, Flutter)",
          "purpose": "The framework name for reference and dependency management.",
          "type": "string"
        },
        "rationale": {
          "description_for_schema": "Why this framework was selected for this project",
          "purpose": "Why this framework was chosen over alternatives. Prevents second-guessing during implementation and justifies patterns that stem from framework constraints.",
          "type": "string"
        }
      },
      "purpose": "The primary application framework that structures the codebase. Locked early to ensure consistent architectural patterns across all implementation chunks.",
      "required": [
        "name",
        "rationale"
      ],
      "type": "object"
    },
    "hosting": {
      "description_for_schema": "The hosting/deployment platform for the application",
      "properties": {
        "name": {
          "description_for_schema": "Hosting platform name (e.g., Vercel, Netlify, AWS)",
          "purpose": "The hosting platform for deployment reference.",
          "type": "string"
        },
        "rationale": {
          "description_for_schema": "Why this hosting platform was selected",
          "purpose": "Why this platform was chosen. Informs deployment scripts and environment configuration.",
          "type": "string"
        }
      },
      "purpose": "The deployment platform that determines build configuration and runtime constraints.",
      "required": [
        "name",
        "rationale"
      ],
      "type": "object"
    },
    "key_libraries": {
      "authoring_guidance": "Include only libraries that significantly impact implementation patterns or architecture. Skip trivial utilities.",
      "description_for_schema": "Important libraries and tools beyond the core framework",
      "items": {
        "properties": {
          "name": {
            "description_for_schema": "Library name",
            "purpose": "The library name for reference.",
            "type": "string"
          },
          "purpose": {
            "description_for_schema": "What this library handles in the application",
            "purpose": "What this library does and why it's important.",
            "type": "string"
          }
        },
        "required": [
          "name",
          "purpose"
        ],
        "type": "object"
      },
      "maxItems": 10,
      "purpose": "Significant dependencies that shape implementation patterns. Provides quick reference for common integration needs across chunks.",
      "type": "array"
    }
  }
}