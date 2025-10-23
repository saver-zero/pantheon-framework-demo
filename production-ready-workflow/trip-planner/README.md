# Travel Itinerary Generator

An intelligent travel itinerary generator that creates personalized day-by-day schedules based on your destination, party composition, trip duration, and time of year.

## Features

- AI-powered itinerary generation using Claude
- Personalized recommendations based on party demographics
- Seasonal and weather-appropriate activities
- Flexible time-period structure (morning, afternoon, evening, night, late night)
- Attraction details with activities and dining suggestions
- Local storage history (last 10 itineraries)
- Responsive design for all devices
- Clean, scannable itinerary format

## Architecture

This is a **proof-of-concept** application with a frontend-only architecture:

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- Local storage for history management

### API Abstraction Layer
The application uses an abstraction layer (`IItineraryService`) that allows for pluggable implementations:

- **CLIApiClient** (Current POC implementation)
  - Calls a local Node.js server that executes `claude -p` command
  - Returns structured JSON itinerary data
  - Used for proof of concept and local development

- **HTTPApiClient** (Future production implementation)
  - Will call REST API endpoints on a production backend
  - Same interface - no frontend code changes needed

This architecture provides a smooth migration path from POC to production.

## Prerequisites

- Node.js 18+ and npm
- Claude CLI installed and configured (`claude` command available)
  - Install: `npm install -g @anthropic-ai/claude-cli`
  - Configure: `claude config`

## Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd trip-planner
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

You need to run two processes:

### 1. Start the Backend Server (Terminal 1)
```bash
npm run server
```
This starts the Node.js server on `http://localhost:3001` that handles Claude CLI calls.

### 2. Start the Frontend Development Server (Terminal 2)
```bash
npm run dev
```
This starts the Vite development server, typically on `http://localhost:5173`.

Open your browser to the Vite dev server URL and start generating itineraries!

## Usage

1. Fill in the form with:
   - **Destination**: City, country, or specific attraction (e.g., "Tokyo", "Paris, France", "Disney World")
   - **Party Information**: Natural language description of your group (e.g., "late 20s Gen Z couple", "family of four with 12-year-old boy and 10-year-old girl")
   - **Month of Travel**: Select from dropdown
   - **Trip Duration**: Number of days (1-30)

2. Click "Generate Itinerary"

3. Wait 10-30 seconds for the AI to generate your personalized itinerary

4. View your itinerary with day-by-day breakdown including:
   - Time periods (flexible based on party type)
   - Attractions with descriptions
   - Things to do at each location
   - Dining recommendations

5. Access previous itineraries from the History panel

## Project Structure

```
trip-planner/
├── src/
│   ├── components/          # React components
│   │   ├── ItineraryForm.tsx       # Input form
│   │   ├── ItineraryDisplay.tsx    # Itinerary viewer
│   │   └── HistoryView.tsx         # History panel
│   ├── services/            # API services
│   │   ├── IItineraryService.ts    # Interface
│   │   └── CLIApiClient.ts         # CLI implementation
│   ├── types/               # TypeScript types
│   │   └── itinerary.ts            # Data models
│   ├── utils/               # Utilities
│   │   └── constants.ts            # App constants
│   ├── App.tsx              # Main app component
│   ├── App.css              # App styles
│   └── index.css            # Global styles
├── server.js                # Backend server for CLI calls
└── package.json
```

## Key Technologies

- **React 19**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Express**: Backend server
- **Claude AI**: Itinerary generation via CLI

## Data Model

### Itinerary Structure
```typescript
interface ItineraryResponse {
  destination: string;
  party_info: string;
  month: string;
  days: number;
  itinerary: DayItinerary[];
}

interface DayItinerary {
  day: number;
  morning: Activity[] | null;
  afternoon: Activity[] | null;
  evening: Activity[] | null;
  night?: Activity[] | null;
  late_night?: Activity[] | null;
}

interface Activity {
  attraction: string;
  attraction_description: string;
  what_to_do: string[];
  where_to_eat: string;
}
```

## Local Storage

The application stores the last 10 generated itineraries in browser local storage under the key `itinerary_history`. This data persists across browser sessions but is device-specific.

## Future Enhancements

### Phase 2
- Budget level preferences
- Interest categories filtering
- Pace preferences (relaxed, moderate, packed)
- PDF export
- Share itinerary via link

### Phase 3
- Map integration
- Estimated costs per activity
- Transportation suggestions
- Alternative options for each time slot
- User accounts with cloud storage
- Production HTTPApiClient implementation

## Development

### Build for Production
```bash
npm run build
```
Output will be in the `dist/` directory.

### Linting
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

## Troubleshooting

**Issue**: Server fails to start
- Ensure Node.js 18+ is installed
- Check if port 3001 is available

**Issue**: Itinerary generation fails
- Verify Claude CLI is installed: `claude --version`
- Ensure Claude CLI is configured: `claude config`
- Check API key is valid
- Look for error messages in browser console and server logs

**Issue**: Frontend doesn't connect to server
- Ensure backend server is running on port 3001
- Check for CORS errors in browser console
- Verify `apiUrl` in `CLIApiClient.ts` points to correct server

## License

MIT

## Contributing

This is a proof-of-concept project. For production use, implement the HTTPApiClient with a proper backend service.
