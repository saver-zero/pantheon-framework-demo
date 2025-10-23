/**
 * Markdown history fixtures for testing HistoryView component.
 * These represent markdown itineraries with clear metadata for parsing tests.
 */

export const historyItem1 = `# Tokyo Itinerary - 5 Days

<!-- Generated: 2025-10-15 -->

A comprehensive 5-day trip to Tokyo for a couple visiting in March.

## Day 1: Arrival and Shibuya

### Morning
- **Arrive at Narita Airport**
  - Take the Narita Express to Shibuya
  - Check into hotel

### Afternoon
- **Shibuya Crossing**
  - Experience the famous scramble crossing
  - Visit Hachiko statue
- **Where to eat**: Sushi lunch at Genki Sushi

## Day 2: Cultural Tokyo

### Morning
- **Senso-ji Temple**
  - Walk through Nakamise shopping street
  - Visit the main hall
- **Where to eat**: Traditional soba nearby
`;

export const historyItem2 = `# Paris Itinerary - 3 Days

<!-- Generated: 2025-10-16 -->

A romantic 3-day trip to Paris for a couple in April.

## Day 1: Iconic Paris

### Morning
- **Eiffel Tower**
  - Take elevator to the top
  - Enjoy panoramic views
- **Where to eat**: Cafe near Trocadero

### Afternoon
- **Louvre Museum**
  - See the Mona Lisa
  - Explore Egyptian artifacts
- **Where to eat**: Lunch in Le Marais
`;

export const historyItem3 = `# New York City Itinerary - 7 Days

<!-- Generated: 2025-10-17 -->

A week-long family trip to NYC in June.

## Day 1: Manhattan Basics

### Morning
- **Statue of Liberty**
  - Ferry from Battery Park
  - Visit Ellis Island
- **Where to eat**: Pizza at Lombardi's

### Afternoon
- **Times Square**
  - See the billboards
  - Visit M&M's World
- **Where to eat**: Dinner at Ellen's Stardust Diner
`;

export const historyItemWithoutTimestamp = `# London Itinerary - 2 Days

A quick weekend trip to London for solo travel.

## Day 1: Royal London

### Morning
- **Buckingham Palace**
  - Watch Changing of the Guard
  - Walk through St. James's Park
- **Where to eat**: Tea at The Wolseley
`;

export const historyItemMinimal = `# Rome - 1 Day

Quick day trip to Rome.

## Day 1

### Morning
- Colosseum tour
- Roman Forum walk
`;

/**
 * Helper function to create an array of history items for testing.
 * Useful for tests that need specific numbers of history entries.
 */
export const createHistoryWithNItems = (n: number): string[] => {
  const baseItems = [
    historyItem1,
    historyItem2,
    historyItem3,
    historyItemWithoutTimestamp,
    historyItemMinimal
  ];

  if (n <= 0) return [];
  if (n <= baseItems.length) return baseItems.slice(0, n);

  // Generate additional items if n > base items
  const items = [...baseItems];
  for (let i = baseItems.length; i < n; i++) {
    items.push(`# Destination ${i + 1} - ${i + 1} Days

<!-- Generated: 2025-10-${String(i + 1).padStart(2, '0')} -->

Trip number ${i + 1}.

## Day 1

### Morning
- Activity ${i + 1}
- Sightseeing
`);
  }

  return items;
};
