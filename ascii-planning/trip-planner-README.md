# Trip Itinerary Generator

A web application that generates personalized travel itineraries using AI. This is a proof-of-concept implementation that uses the Claude CLI to generate day-by-day travel plans based on destination, party composition, travel month, and trip duration.

## Features

- Generate personalized travel itineraries for 1-7 day trips
- Season-aware recommendations based on travel month
- Party-specific activity suggestions
- Local browser storage for the last 10 itineraries
- Responsive design with mobile support
- Real-time loading feedback with elapsed time
- Categorized error handling

## Prerequisites

- Node.js (v16 or higher)
- Claude CLI installed and configured
  - Install: Follow instructions at https://docs.anthropic.com/claude/docs/cli
  - Ensure `claude` command is available in your PATH

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure the prompt template path (optional):
   - The default prompt template is located at `./prompts/itinerary-prompt.txt`
   - To use a different location, update the `.env` file:
   ```
   VITE_PROMPT_TEMPLATE_PATH=./prompts/itinerary-prompt.txt
   ```

## Running the Application

### Development Mode

To run both the backend server and frontend development server:

```bash
npm run dev:all
```

This will start:
- Backend server on http://localhost:3100
- Frontend development server on http://localhost:3101

Or run them separately:

```bash
npm run server
npm run dev
```

### Using the Application

1. Open http://localhost:3101 in your browser
2. Fill in the form:
   - **Destination**: Enter a city, country, or region (min 3 characters)
   - **Party Info**: Describe your travel group (e.g., "late 20s Gen Z couple")
   - **Travel Month**: Select the month of travel
   - **Days**: Enter trip duration (1-7 days)
3. Click "Generate Itinerary"
4. Wait 10-30 seconds for the AI to generate your personalized itinerary
5. View your itinerary with day-by-day breakdowns
6. Access previous itineraries from the sidebar

### Mobile View

On mobile devices (< 768px width):
- Tap the hamburger menu (☰) to access history sidebar
- Tap outside the drawer or the hamburger again to close

## Architecture

### Frontend
- React 18 with Vite
- Component-based architecture
- LocalStorage for client-side history
- Responsive CSS with mobile drawer support

### Backend
- Express.js server
- Executes Claude CLI commands
- Template-based prompt generation
- 30-second timeout handling

### Key Components

- `InputForm`: Form with validation for user inputs
- `LoadingState`: Animated spinner with elapsed time counter
- `ErrorState`: Categorized error messages with retry functionality
- `GeneratedItinerary`: Markdown-rendered itinerary display
- `HistorySidebar`: History management with mobile drawer

### Services

- `CLIApiClient`: Handles API communication with backend
- `LocalStorageService`: Manages browser storage for itinerary history

## Error Handling

The application distinguishes between different error types:
- **Timeout**: Request exceeded 30 seconds
- **CLI Execution Failed**: Claude CLI command failed
- **Validation Error**: Invalid input format
- **Empty Response**: AI returned no content
- **Network Error**: Server connection failed

## Validation Rules

- Destination: Minimum 3 characters
- Party Info: Required, any natural language text
- Travel Month: Must select from dropdown
- Days: Integer between 1-7 (no decimals)

## Storage

- Maximum 10 itineraries stored in browser LocalStorage
- Oldest entries automatically removed when limit exceeded
- Each entry includes:
  - Destination, party info, travel month, days
  - Generation timestamp and duration
  - Full markdown itinerary

## Browser Compatibility

- Modern browsers with ES6+ support
- LocalStorage support required
- Responsive design for mobile and desktop

## Troubleshooting

### Claude CLI not found
```
Error: CLI execution failed - Claude CLI not found
```
**Solution**: Install Claude CLI and ensure it's in your PATH

### Port already in use
```
Error: listen EADDRINUSE: address already in use :::3100
```
**Solution**: Change the port in `server.js` or kill the process using port 3100

### Empty response from AI
```
Error: Received empty response from AI
```
**Solution**: Check your Claude CLI configuration and API key

## Development

### Project Structure
```
ascii-planning/
├── src/
│   ├── components/      # React components
│   ├── services/        # API client and storage
│   ├── App.jsx         # Main application
│   ├── App.css         # Styles
│   └── main.jsx        # Entry point
├── prompts/            # Prompt templates
├── server.js           # Backend Express server
└── package.json        # Dependencies
```

### Testing

Run tests (when implemented):
```bash
npm test
```

## Future Enhancements

- HTTP-based production backend
- User authentication
- Server-side itinerary storage
- Export functionality (PDF, email)
- Social sharing features
- Multi-language support

## License

This is a proof-of-concept demonstration project.
