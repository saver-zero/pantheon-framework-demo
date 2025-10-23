# Travel Itinerary Generator

A modern web application for generating personalized travel itineraries using AI assistance. Built with React, TypeScript, and Vite.

## Tech Stack

### Frontend
- **React 18.3.1** - Modern UI library with hooks and functional components
- **TypeScript 5.9.3** - Type-safe JavaScript for enhanced development experience
- **Vite 5.4.20** - Fast build tool and development server with HMR
- **React Router 7.9.4** - Client-side routing for multi-page application flow
- **Zod 4.1.12** - TypeScript-first schema validation
- **ESLint 8.57.1** - Code linting for quality enforcement
- **Prettier 3.3.3** - Automatic code formatting for consistency
- **Vitest 3.2.4** - Fast testing framework with Vite integration
- **React Testing Library 16.1.0** - Component testing with user-centric approach

### Backend
- **Node.js** - JavaScript runtime for server-side execution
- **Express** - Fast, minimal web framework for Node.js
- **TypeScript 5.9.3** - Type-safe server-side code
- **Zod 4.1.12** - Runtime type validation for API requests/responses
- **CORS** - Cross-origin resource sharing middleware
- **tsx** - TypeScript execution engine for development

## Development Setup

### Prerequisites

- Node.js 18.0 or higher
- npm package manager
- Claude CLI (for backend server to execute AI commands) - [Installation Guide](https://docs.anthropic.com/claude/docs/cli)

### Installation

Clone the repository and install dependencies:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

## Running the Application

The application supports two backend modes:

### HTTP Mode (Recommended for Browser Deployment)

This mode runs a separate backend server that executes Claude CLI commands server-side. This is required for browser-based deployment since browsers cannot execute Node.js child processes.

**Step 1: Configure Environment**

Ensure your `.env` file has the following configuration:

```
VITE_BACKEND_MODE=http
VITE_BACKEND_URL=http://localhost:3001
```

**Step 2: Start the Backend Server**

In a terminal window:

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:3001`. You should see:
```
Backend server listening on port 3001
```

**Step 3: Start the Frontend Development Server**

In a separate terminal window:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or another port if 5173 is in use).

**Step 4: Access the Application**

Open your browser to `http://localhost:5173` and the application will communicate with the backend server via HTTP.

### CLI Mode (Local POC Only)

This mode executes Claude CLI commands directly from the frontend. **Note: This only works in Node.js environments and will NOT work in browsers.**

Configure your `.env` file:

```
VITE_BACKEND_MODE=cli
```

Then start the frontend:

```bash
npm run dev
```

**Important**: CLI mode will cause browser errors because browsers cannot access Node.js child processes. Use HTTP mode for browser deployment.

## Available Scripts

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Build

Build the application for production:

```bash
npm run build
```

The optimized production build will be created in the `dist` directory.

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

### Formatting

Format code with Prettier:

```bash
npm run format
```

Check if code is properly formatted without making changes:

```bash
npm run format-check
```

### Testing

Run tests in single-run mode:

```bash
npm test
```

Run tests in watch mode for development:

```bash
npm run test:watch
```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/              # Page-level components (LandingPage, FormPage, etc.)
├── services/           # Business logic and API abstraction
│   └── api/            # API client interfaces and implementations
│       ├── IItineraryService.ts      # Interface for API clients
│       ├── CLIApiClient.ts           # CLI-based implementation
│       ├── HTTPApiClient.ts          # HTTP-based implementation
│       └── ApiClientFactory.ts       # Factory for client selection
├── types/              # TypeScript type definitions and interfaces
├── utils/              # Shared utility functions
├── App.tsx             # Root application component with routing
├── main.tsx            # Application entry point
└── setupTests.ts       # Testing configuration

backend/
├── controllers/        # Request handlers for API endpoints
├── routes/             # API route definitions
├── services/           # Business logic (Claude CLI execution)
├── utils/              # Shared utilities (PromptBuilder, validation)
├── schemas/            # Zod validation schemas
├── types/              # TypeScript type definitions
└── server.ts           # Express server entry point
```

### Key Architecture Patterns

- **API Abstraction Layer**: The `IItineraryService` interface in `src/services/api/` enables seamless switching between different backend implementations (CLI for local POC, HTTP for browser deployment) without changing frontend code.

- **Backend Server Architecture**: The Express backend server handles Claude CLI execution server-side, providing REST API endpoints for itinerary generation and enabling browser compatibility.

- **Markdown-Based Itinerary Format**: As of T012, the backend returns itineraries as plain text markdown strings instead of structured JSON. The frontend uses `react-markdown` with GitHub Flavored Markdown support to render itinerary content with proper formatting, headers, lists, and tables. This provides flexibility in itinerary structure while maintaining readability.

- **Type-Safe Data Flow**: All data structures are explicitly typed using TypeScript interfaces defined in `src/types/` and `backend/types/`, ensuring compile-time safety across the full stack.

- **Component Composition**: The application uses functional components with React hooks, following modern React patterns for state management and side effects.

## Development Workflow

### For HTTP Mode (Recommended)

1. Start the backend server: `cd backend && npm run dev`
2. Start the frontend server: `npm run dev` (in a separate terminal)
3. Make your changes
4. Verify linting passes: `npm run lint`
5. Format your code: `npm run format`
6. Run tests: `npm test`
7. Build for production: `npm run build`

### Quick Start Commands

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
npm run dev
```

The application will be available at `http://localhost:5173` with the backend API at `http://localhost:3001`.

## API Response Format

The backend API returns itineraries in the following JSON structure:

```json
{
  "destination": "Paris",
  "party_info": "2 adults",
  "month": "May",
  "days": 3,
  "itinerary": "# Paris Travel Itinerary\n\n## Day 1\n### Morning\n- Visit Eiffel Tower\n..."
}
```

The `itinerary` field contains markdown-formatted text with:
- Headers (# for titles, ## for days, ### for time periods)
- Lists (- for bullet points)
- Text emphasis (**bold**, *italic*)
- Links and other markdown features
- GitHub Flavored Markdown extensions (tables, strikethrough, task lists)

The frontend uses `react-markdown` to render this content with proper HTML formatting and styling.

### Markdown Rendering

The application uses the following libraries for markdown rendering:
- **react-markdown (v10.1.0)**: Core markdown rendering with built-in XSS sanitization
- **remark-gfm (v4.0.1)**: GitHub Flavored Markdown plugin for tables, strikethrough, and other GFM features

Components:
- `MarkdownItineraryDisplay`: Current component for rendering markdown itineraries
- `ItineraryDisplay` (deprecated): Legacy component for structured JSON itineraries, maintained for backward compatibility

## Additional Documentation

- See `backend/README.md` for detailed backend server documentation including API endpoints, environment variables, and troubleshooting
- See `docs/trip-planner.md` for architectural overview and backend mode switching instructions
- See `src/types/index.ts` for detailed type definitions and migration notes regarding the markdown format change
