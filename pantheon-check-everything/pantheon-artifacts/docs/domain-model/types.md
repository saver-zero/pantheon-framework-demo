---
doc_id: domain-model-types
keywords: [types, domain-model, itinerary, schema, typescript, deprecated, legacy, markdown]
relevance: Legacy type definitions for itinerary domain model (DEPRECATED - application now uses markdown strings)
created: 2025-10-15
updated: 2025-10-17
status: deprecated
---

# Itinerary Domain Model Types (DEPRECATED)

## Deprecation Notice

**STATUS: DEPRECATED as of 2025-10-17**

**Reason**: The application has migrated from structured JSON responses (`Itinerary` objects) to markdown string responses. The service interface (`IItineraryService`) now returns `Promise<string>` instead of `Promise<Itinerary>`. These TypeScript types are no longer used at runtime.

**Current Architecture**: The backend server spawns Claude CLI processes that generate markdown-formatted itineraries. The frontend receives and renders plain markdown strings using `react-markdown`. No JSON schema validation or type assertion occurs in the response pipeline.

**This Documentation**: Retained for historical reference and to understand the previous architecture. If you are implementing new features, **do not use these types**. Work with markdown strings directly.

---

## Overview (Historical Context)

The itinerary domain model defined TypeScript type definitions that established the contract between AI-generated JSON responses and frontend TypeScript code. These types served as the single source of truth for data structures throughout the application, ensuring type safety and enabling compile-time validation of data integrity.

The type definitions matched the PRD JSON schema specification exactly, using snake_case field naming to maintain perfect alignment between the wire format (JSON from AI) and the TypeScript types. This strict adherence prevented runtime errors from data structure mismatches and provided clear contracts for all components consuming itinerary data.

All types were defined in `src/types/itinerary.ts` and re-exported through `src/types/index.ts` for clean import paths.

**Note**: These types may still exist in the codebase for backward compatibility or legacy code, but they are not actively used in the markdown-based architecture.

## Type Definitions

### Activity

The `Activity` interface represents a single attraction with details for a specific time period.

**Definition:**
```typescript
export interface Activity {
  attraction: string;
  attraction_description: string;
  what_to_do: string[];
  where_to_eat: string;
}
```

**Fields:**
- `attraction` (required): Name of the attraction or location
- `attraction_description` (required): Detailed description of the attraction
- `what_to_do` (required): Array of activities or things to do at this attraction (minimum 1 item)
- `where_to_eat` (required): Dining recommendation for this time period

**Rationale:**
All fields are required to ensure complete activity information. The snake_case naming matches the PRD JSON schema exactly, preventing field name mismatches during JSON parsing. The `what_to_do` array type enforces that activities are provided as a list rather than a single string.

**PRD Schema Mapping:**
This interface maps to the `timePeriod.items` schema in the PRD, representing individual attractions within a time period.

### TimePeriod

The `TimePeriod` type represents activities for a specific time of day, supporting both populated activity arrays and null values for flexibility.

**Definition:**
```typescript
export type TimePeriod = Activity[] | null;
```

**Values:**
- `Activity[]`: Array of activities scheduled for this time period
- `null`: No activities planned for this time period

**Rationale:**
Using a union type elegantly handles the PRD requirement that time periods are optional and flexible. Components can safely check for null before rendering activities, and TypeScript enforces proper null handling. The type alias avoids repeating the union definition across all Day interface fields.

**PRD Schema Mapping:**
Maps to the `timePeriod` schema in the PRD, which allows both activity arrays and null values.

### Day

The `Day` interface represents a single day in the itinerary with time-based activity periods.

**Definition:**
```typescript
export interface Day {
  day: number;
  morning: TimePeriod;
  afternoon: TimePeriod;
  evening: TimePeriod;
  night?: TimePeriod;
  late_night?: TimePeriod;
}
```

**Fields:**
- `day` (required): Day number in the itinerary (1-based)
- `morning` (required): Morning activities (can be null)
- `afternoon` (required): Afternoon activities (can be null)
- `evening` (required): Evening activities (can be null)
- `night` (optional): Night activities (can be null or omitted)
- `late_night` (optional): Late night activities (can be null or omitted)

**Rationale:**
The distinction between required and optional time periods matches the PRD schema exactly. Morning, afternoon, and evening are always present in the response (even if null), while night and late_night are optional fields that may be omitted entirely. This structure supports flexible itinerary planning where some days may have extended time periods and others may not.

**PRD Schema Mapping:**
Maps directly to the `Day` schema in the PRD, maintaining the exact required/optional field specifications.

### Itinerary

The `Itinerary` interface represents the complete trip itinerary response from the AI.

**Definition:**
```typescript
export interface Itinerary {
  destination: string;
  party_info: string;
  month: string;
  days: number;
  itinerary: Day[];
}
```

**Fields:**
- `destination` (required): Destination city or location
- `party_info` (required): Information about the traveling party (e.g., "couple", "family with kids")
- `month` (required): Month of travel
- `days` (required): Number of days in the trip
- `itinerary` (required): Array of Day objects containing the detailed itinerary

**Rationale:**
All fields are required as they represent essential trip information. The snake_case `party_info` field name matches the PRD schema exactly. The `itinerary` field as a Day array establishes the one-to-many relationship between an Itinerary and its Days.

**PRD Schema Mapping:**
Maps to the root schema object in the PRD, representing the complete AI response structure.

## PRD JSON Schema to TypeScript Mapping

| PRD Schema Field | TypeScript Type | Required | Notes |
|-----------------|-----------------|----------|-------|
| `attraction` | `string` | Yes | Activity field |
| `attraction_description` | `string` | Yes | Activity field |
| `what_to_do` | `string[]` | Yes | Activity field (array) |
| `where_to_eat` | `string` | Yes | Activity field |
| `day` | `number` | Yes | Day field |
| `morning` | `TimePeriod` | Yes | Day field (can be null) |
| `afternoon` | `TimePeriod` | Yes | Day field (can be null) |
| `evening` | `TimePeriod` | Yes | Day field (can be null) |
| `night` | `TimePeriod` | No | Day field (optional) |
| `late_night` | `TimePeriod` | No | Day field (optional) |
| `destination` | `string` | Yes | Itinerary field |
| `party_info` | `string` | Yes | Itinerary field |
| `month` | `string` | Yes | Itinerary field |
| `days` | `number` | Yes | Itinerary field |
| `itinerary` | `Day[]` | Yes | Itinerary field (array) |

## Usage Examples

### Importing Types

```typescript
// Import from barrel export for clean paths
import { Itinerary, Day, Activity, TimePeriod } from '@/types';

// Or import directly
import { Itinerary } from '@/types/itinerary';
```

### Component Usage

```typescript
import { Itinerary, Day, TimePeriod } from '@/types';

interface ItineraryDisplayProps {
  itinerary: Itinerary;
}

function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  return (
    <div>
      <h1>{itinerary.destination}</h1>
      <p>Party: {itinerary.party_info}</p>
      <p>Month: {itinerary.month}</p>
      {itinerary.itinerary.map((day) => (
        <DayView key={day.day} day={day} />
      ))}
    </div>
  );
}
```

### Null Handling

```typescript
function renderTimePeriod(period: TimePeriod) {
  if (period === null) {
    return <p>No activities planned</p>;
  }

  return (
    <ul>
      {period.map((activity, index) => (
        <li key={index}>
          <h3>{activity.attraction}</h3>
          <p>{activity.attraction_description}</p>
        </li>
      ))}
    </ul>
  );
}
```

### Type Guards

```typescript
function hasNightActivities(day: Day): boolean {
  return day.night !== undefined && day.night !== null;
}

function hasLateNightActivities(day: Day): boolean {
  return day.late_night !== undefined && day.late_night !== null;
}
```

## Validation Contract

These TypeScript types define the compile-time contract for itinerary data structures. At runtime, the ValidationService (future implementation) will validate AI-generated JSON responses against a schema (e.g., Zod or JSON Schema) before parsing into these types.

**Validation Flow:**
1. AI generates JSON response
2. ValidationService validates JSON against runtime schema
3. If valid, JSON is typed as `Itinerary` and passed to components
4. TypeScript enforces correct usage through compile-time type checking

**Type Safety Guarantees:**
- Components cannot access fields that don't exist (compile error)
- Required fields must be present (TypeScript enforces)
- Optional fields must be checked before use (TypeScript enforces)
- Field types are enforced (string cannot be assigned to number)
- Array operations are type-safe (Activity[] methods available)

**Limitations:**
- TypeScript cannot enforce runtime constraints (e.g., `what_to_do` minimum length)
- Null vs undefined distinction requires runtime validation
- Field value validation (e.g., valid month names) happens at runtime

## Related Documentation

- **Architecture Guide - System Components**: Defines how types integrate with IItineraryService and components
- **Service Interface Documentation**: Explains how IItineraryService uses these types
- **Type Structure Diagram**: Visual representation of type hierarchy and relationships
