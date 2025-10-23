/**
 * Markdown fixtures for testing the markdown-based itinerary responses.
 * These represent various markdown formats that Claude might generate.
 */

export const validMarkdownItinerary = `# Tokyo Itinerary - 3 Days

## Day 1: Exploring Central Tokyo

### Morning
- **Senso-ji Temple**: Historic Buddhist temple in Asakusa
  - Walk through the Nakamise shopping street
  - Visit the main hall and pagoda
- **Where to eat**: Traditional soba at nearby Asakusa restaurants

### Afternoon
- **Tokyo Skytree**: Tallest structure in Japan
  - Visit the observation deck for panoramic views
  - Explore the Solamachi shopping complex
- **Where to eat**: Lunch at Skytree restaurants

### Evening
- **Shibuya Crossing**: World's busiest pedestrian crossing
  - Experience the famous scramble crossing
  - Shop in Shibuya Center-gai
- **Where to eat**: Dinner in Shibuya (izakaya or ramen)

## Day 2: Cultural Tokyo

### Morning
- **Meiji Shrine**: Peaceful Shinto shrine in a forest
  - Walk through the torii gates
  - Observe traditional wedding ceremonies
- **Where to eat**: Crepes at Harajuku Takeshita Street

### Afternoon
- **Tokyo National Museum**: Japan's largest museum
  - Explore Japanese art and artifacts
  - Stroll through Ueno Park
- **Where to eat**: Park-side cafes in Ueno

## Day 3: Modern Tokyo

### Morning
- **Tsukiji Outer Market**: Fresh seafood and street food
  - Try fresh sushi for breakfast
  - Shop for Japanese kitchen goods
- **Where to eat**: Market stalls and restaurants

### Afternoon
- **Odaiba**: Futuristic artificial island
  - Visit teamLab Borderless digital art museum
  - See the Rainbow Bridge and Statue of Liberty replica
- **Where to eat**: Restaurants in DiverCity Tokyo Plaza
`;

export const minimalMarkdownItinerary = `# Paris - 1 Day

## Day 1

### Morning
- Eiffel Tower visit
- Coffee at nearby cafe

### Afternoon
- Louvre Museum
- Lunch in Le Marais

### Evening
- Seine River cruise
- Dinner in Latin Quarter
`;

export const markdownWithSpecialCharacters = `# London Itinerary - 2 Days

## Day 1: Royal London

### Morning
- **Buckingham Palace** - "The Queen's official residence"
  - Watch the Changing of the Guard (10:45 AM)
  - Walk through St. James's Park
- **Where to eat**: Afternoon tea at The Wolseley

### Afternoon
- **Westminster Abbey** - Gothic church with 1000+ years of history
  - See the Coronation Chair & Poet's Corner
  - Marvel at the architecture
- **Where to eat**: Pub lunch near Parliament

## Day 2: Cultural London

### Morning
- **British Museum** - World's largest collection (5.5 million items!)
  - Rosetta Stone & Egyptian mummies
  - Greek & Roman sculptures
- **Where to eat**: Cafe in the Great Court

### Afternoon
- **Tower of London** - Historic castle & Crown Jewels
  - Meet the Beefeaters (Yeoman Warders)
  - See where Anne Boleyn was executed
- **Where to eat**: Borough Market for dinner
`;

export const emptyMarkdown = '';

export const malformedMarkdown = `# Broken Itinerary

This has no proper structure...
Just random text without headings or lists.
`;

export const markdownWithGFM = `# Rome Itinerary - 3 Days

## Day 1: Ancient Rome

| Time | Activity | Location |
|------|----------|----------|
| 9:00 AM | Colosseum Tour | Via del Colosseo |
| 12:00 PM | Lunch | Trattoria near Forum |
| 2:00 PM | Roman Forum | Via della Salaria |

### Morning Tasks
- [x] Book Colosseum tickets online
- [x] Download audio guide app
- [ ] Wear comfortable shoes

### Afternoon
- Visit the **Colosseum** ~~(not the Pantheon)~~
  - Take the underground tour if available
  - See the arena floor reconstruction
- **Where to eat**: Pizza al taglio near the Forum

## Day 2: Vatican City

### Morning
- **St. Peter's Basilica**: Climb the dome (551 steps!)
  - See Michelangelo's Pieta
  - Marvel at the architecture
- **Where to eat**: Cafe in Vatican area

~~Visiting time: 2-3 hours~~ Allow 4 hours minimum!

### Notes
> Remember to dress modestly (covered shoulders and knees) for Vatican entry.
`;
