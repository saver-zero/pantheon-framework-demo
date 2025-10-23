# Travel Itinerary Backend Server

Backend API server for the Travel Itinerary Generator application. This Node.js/Express server executes Claude CLI commands server-side and provides HTTP endpoints for the frontend React application to generate travel itineraries.

## Project Overview

This backend server enables browser-compatible deployment by handling Claude CLI command execution on the server side, eliminating the need for child_process in browser environments. The server accepts HTTP requests from the React frontend, constructs prompts, executes Claude CLI commands, validates responses, and returns properly formatted itinerary data.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- Claude CLI installed and configured on your system
  - Install from: https://github.com/anthropics/claude-cli
  - Ensure `claude` command is available in your PATH

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory (see Configuration section below)

## Configuration

Create a `.env` file in the backend directory with the following variables:

```
PORT=3001
CLAUDE_CLI_TIMEOUT_MS=60000
CORS_ORIGIN=http://localhost:5173
```

### Environment Variables

- **PORT**: The port number the backend server will listen on (default: 3001)
- **CLAUDE_CLI_TIMEOUT_MS**: Timeout in milliseconds for Claude CLI command execution (default: 60000 = 60 seconds)
- **CORS_ORIGIN**: The origin URL of the frontend application for CORS configuration (default: http://localhost:5173 for Vite dev server)

## Development

Start the development server with hot-reloading:

```bash
npm run dev
```

The server will start on the configured PORT (default: 3001) and automatically restart when code changes are detected.

### Testing the Server

Check if the server is running:

```bash
curl http://localhost:3001/health
```

Expected response:
```json
{"message":"Backend server is running"}
```

## API Endpoints

### Health Check

**GET** `/health`

Health check endpoint to verify server is running.

**Response:**
```json
{
  "message": "Backend server is running"
}
```

### Generate Itinerary

**POST** `/api/itinerary`

Generates a travel itinerary based on provided parameters.

**Request Body:**
```json
{
  "destination": "Tokyo",
  "partyInfo": "late 20s couple",
  "month": "March",
  "days": 3
}
```

**Success Response (200):**
```json
{
  "destination": "Tokyo",
  "party_info": "late 20s couple",
  "month": "March",
  "days": 3,
  "itinerary": [
    {
      "day": 1,
      "morning": { ... },
      "afternoon": { ... },
      "evening": { ... }
    }
  ]
}
```

**Error Responses:**

- **400 Bad Request**: Missing or invalid request fields
```json
{
  "message": "Missing required fields. Please provide destination, partyInfo, month, and days."
}
```

- **502 Bad Gateway**: Invalid AI response format
```json
{
  "message": "The AI response could not be parsed. The response format was invalid."
}
```

- **503 Service Unavailable**: Claude CLI not installed or not accessible
```json
{
  "message": "Claude CLI is not installed or not accessible. Please install it from: https://github.com/anthropics/claude-cli"
}
```

- **504 Gateway Timeout**: CLI command exceeded timeout
```json
{
  "message": "Request timed out after 60000ms. Please try a simpler request or increase the timeout in backend configuration."
}
```

- **422 Unprocessable Entity**: Response validation failed
```json
{
  "message": "Response validation failed: [validation details]"
}
```

- **500 Internal Server Error**: Unexpected server error
```json
{
  "message": "An unexpected error occurred: [error details]"
}
```

## Build

Compile TypeScript to JavaScript:

```bash
npm run build
```

The compiled output will be in the `dist/` directory.

## Production Deployment

1. Build the project:
```bash
npm run build
```

2. Set production environment variables in `.env` file

3. Start the server:
```bash
npm start
```

Or use a process manager like PM2:
```bash
pm2 start npm --name "travel-backend" -- start
```

## Troubleshooting

### Claude CLI Not Found

**Error:** 503 Service Unavailable with message about Claude CLI not installed

**Solution:**
- Verify Claude CLI is installed: `claude --version`
- If not installed, install from https://github.com/anthropics/claude-cli
- Ensure the `claude` command is in your system PATH

### Request Timeout

**Error:** 504 Gateway Timeout

**Solutions:**
- Increase `CLAUDE_CLI_TIMEOUT_MS` in `.env` file
- Try a simpler request with fewer days
- Check Claude CLI is functioning: `claude -p "Test message"`

### CORS Errors

**Error:** Browser console shows CORS-related errors

**Solutions:**
- Verify `CORS_ORIGIN` in `.env` matches your frontend URL
- Check frontend is running on the expected port
- Restart backend server after changing `.env` file

### Port Already in Use

**Error:** EADDRINUSE: address already in use

**Solutions:**
- Change `PORT` in `.env` file to a different port
- Stop other processes using port 3001
- On Windows: `netstat -ano | findstr :3001` then `taskkill /PID <pid> /F`
- On Unix: `lsof -ti:3001 | xargs kill`

## Architecture Notes

- **API Abstraction Layer**: The backend implements the same prompt construction and validation logic as the frontend CLIApiClient, ensuring consistency
- **Error Translation**: CLI errors are translated to appropriate HTTP status codes for frontend error handling
- **Validation**: Both request input and CLI response output are validated using Zod schemas
- **CORS**: Configured to allow cross-origin requests from the frontend during development

## Related Documentation

- Frontend application: `../README.md`
- API interface contract: `../src/services/api/IItineraryService.ts`
- Product requirements: `../docs/trip-planner.md`
