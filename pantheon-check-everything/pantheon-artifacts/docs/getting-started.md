---
doc_id: getting-started
title: "Getting Started with Travel Itinerary Generator"
description: "Step-by-step setup and development workflow guide for developers joining the project"
keywords: [setup, installation, development, workflow, npm, testing, build]
relevance: "Use this guide when setting up your development environment for the first time or when onboarding new developers to the project."
---

# Getting Started with Travel Itinerary Generator

This guide provides practical setup instructions and development workflow guidance for developers joining the Travel Itinerary Generator project.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: Version 18.x or higher (recommended: 20.x LTS)
  - Check your version: `node --version`
  - Download from: [https://nodejs.org/](https://nodejs.org/)
- **npm**: Version 9.x or higher (comes with Node.js)
  - Check your version: `npm --version`
- **Git**: For version control
  - Check your version: `git --version`
- **Claude CLI**: Required for backend server
  - Check if installed: `claude --version`
  - Installation: Follow Anthropic's Claude CLI installation guide
  - **Note**: The backend server spawns Claude CLI processes to generate itineraries.

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd pantheon-check-everything
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   This will install all required packages including:
   - React and React-DOM for the UI framework
   - Vite for the build tool and development server
   - TypeScript for type safety
   - Vitest and Testing Library for testing
   - ESLint for code quality
   - Express and CORS for the backend server
   - react-markdown for rendering markdown itineraries

3. **Verify installation**:
   ```bash
   npm test
   ```

   If all tests pass, your environment is correctly configured.

## Environment Configuration

The Travel Itinerary Generator uses a dual-server architecture with environment variables for configuration.

### Architecture Overview

The application consists of two servers:
- **Frontend Server** (Vite): Runs on port 5273, serves the React application
- **Backend Server** (Express): Runs on port 3001, spawns Claude CLI processes

In development, the frontend server proxies API requests to the backend server, eliminating CORS issues.

### VITE_BACKEND_URL Environment Variable

The `VITE_BACKEND_URL` variable configures the backend API endpoint:

- **Development**: Use empty string (default) for relative URLs through Vite proxy
- **Production**: Set to the deployed backend server URL

**For Development**:

No configuration required - the application defaults to using the Vite proxy. The frontend makes relative `/api/itinerary` requests that Vite proxies to `http://localhost:3001`.

**For Production Deployment**:

Create a `.env` file or set environment variables in your deployment platform:

```bash
# .env file
# Backend API URL for production deployment
VITE_BACKEND_URL=https://api.your-domain.com
```

**Important Notes**:
- Environment variable must be prefixed with `VITE_` to be exposed to client code by Vite
- Changes to `.env` file require restarting the development servers
- `.env` file should be added to `.gitignore` (committed as `.env.example` for reference)
- Frontend uses relative URLs in development, absolute URLs in production

**Example .env.example File**:

```bash
# Backend API URL
# Development: Leave empty for relative URLs (Vite proxy)
# Production: Set to deployed backend URL
# Default: empty string
VITE_BACKEND_URL=
```

## Backend Server Setup

The application uses a Node.js/Express backend server that spawns Claude CLI processes to generate itineraries. The backend returns markdown-formatted responses instead of JSON.

### Verifying Claude CLI Integration

To verify Claude CLI is correctly installed and accessible:

```bash
# Test Claude CLI directly
claude -p "Generate a simple markdown itinerary"
```

Expected output: Markdown text response from Claude

**If command fails**:
- Ensure Claude CLI is in your system PATH
- Verify authentication credentials are configured
- Check Claude CLI documentation for setup instructions

### Understanding Backend Architecture

**Backend Server Behavior**:
- Uses `child_process.spawn` (NOT exec) to run Claude CLI
- Immediately calls `stdin.end()` after spawn (required for Claude CLI)
- Collects stdout chunks and returns markdown string
- 60-second timeout per request
- Returns markdown directly without JSON parsing

**Important Implementation Details**:
- The backend MUST use `spawn` instead of `exec` or `execAsync`
- `stdin.end()` MUST be called immediately after spawning the process
- Failure to end stdin will cause the Claude CLI process to hang

**Logging for Debugging**:
Backend operations are logged to console:
- Incoming API requests with parameters
- Claude CLI execution status
- Response generation duration
- Detailed error context for failures

Check terminal output where the backend server is running for these logs.

## Development Workflow

### Starting the Development Servers

The application requires **both** frontend and backend servers to run. You need to start them in separate terminal windows:

**Terminal 1 - Backend Server**:
```bash
npm run server:dev
```

The backend server will start on `http://localhost:3001` and handle Claude CLI execution.

**Terminal 2 - Frontend Server**:
```bash
npm run dev
```

The frontend application will be available at `http://localhost:5273`.

**Alternative - Start Both Servers Together** (coming soon):
```bash
npm run dev:all
```

This command will run both servers concurrently in a single terminal.

**Hot Reload**: Changes to your frontend source files will automatically reload in the browser. Backend changes require manually restarting the backend server (or use nodemon for auto-restart).

**Development Server Features**:
- Fast startup times with Vite's native ES modules
- Instant hot module replacement for React components
- TypeScript compilation errors displayed in the browser and terminal
- Source maps for debugging
- Vite proxy forwards `/api` requests to backend server (no CORS issues)

### Testing

The project uses Vitest as the test runner with React Testing Library for component testing.

**Run all tests once**:
```bash
npm test
```

This command runs all tests in a single pass and exits. It's ideal for CI/CD pipelines and quick verification.

**Run tests in watch mode** (recommended for development):
```bash
npm run test:watch
```

Watch mode automatically re-runs tests when files change, providing immediate feedback during TDD workflows. Press `q` to quit, `a` to run all tests, or `f` to run only failed tests.

**Generate coverage report**:
```bash
npm run test:coverage
```

This command runs all tests and generates coverage reports in multiple formats:
- **Text summary**: Displayed in the terminal
- **JSON report**: Located at `coverage/coverage-final.json`
- **HTML report**: Located at `coverage/index.html` (open in browser for detailed view)

**Coverage Thresholds**:
- Lines: 80%
- Functions: 80%
- Branches: 75%
- Statements: 80%

The build will fail if coverage falls below these thresholds, ensuring code quality standards are maintained.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This command performs the following:
- Runs TypeScript compiler to check for type errors
- Bundles and minifies JavaScript and CSS
- Generates optimized assets with content hashes for cache busting
- Outputs files to the `dist/` directory

**Build Output**:
- `dist/index.html`: Entry point HTML file
- `dist/assets/`: Minified and hashed JavaScript and CSS files

To preview the production build locally:
```bash
npm run preview
```

### Code Quality with Linting

To check code quality and style consistency:

```bash
npm run lint
```

This command runs ESLint on all TypeScript and TSX files, checking for:
- TypeScript type issues
- React best practices and hooks rules
- Code style consistency
- Accessibility concerns

**ESLint Configuration**:
- Uses ESLint 9 flat config format
- Extends TypeScript and React recommended rulesets
- Enforces strict rules for React Hooks
- Automatic React version detection

## Project Structure

Understanding the project structure will help you navigate and contribute effectively:

```
pantheon-check-everything/
├── src/                          # Application source code
│   ├── main.tsx                  # Application entry point
│   ├── App.tsx                   # Root React component
│   ├── App.test.tsx              # Smoke test for App component
│   ├── setupTests.ts             # Global test configuration
│   └── index.css                 # Base application styles
├── public/                       # Static assets (served as-is)
├── dist/                         # Production build output (generated)
├── coverage/                     # Test coverage reports (generated)
├── node_modules/                 # Installed dependencies (generated)
├── pantheon-artifacts/           # Project documentation and tickets
│   ├── docs/                     # Documentation files
│   └── tickets/                  # Development tickets
├── package.json                  # Project metadata and dependencies
├── vite.config.ts                # Vite build configuration
├── vitest.config.ts              # Vitest test configuration
├── tsconfig.json                 # TypeScript base configuration
├── tsconfig.app.json             # TypeScript app-specific configuration
├── tsconfig.node.json            # TypeScript Node.js configuration
└── eslint.config.js              # ESLint configuration
```

**Key Directories**:
- **src/**: All application source code goes here. Components, services, and tests should be co-located.
- **pantheon-artifacts/docs/**: Project documentation including architecture guides and diagrams.
- **pantheon-artifacts/tickets/**: Development tickets organized by sprint and assigned agent.

**Configuration Files**:
- **vite.config.ts**: Configures Vite build tool with React plugin
- **vitest.config.ts**: Configures test environment, coverage thresholds, and test setup
- **tsconfig.json**: TypeScript strict mode and module resolution settings
- **eslint.config.js**: Code quality rules and plugin configuration

## Next Steps

Now that you have the development environment set up, you can:

1. **Understand the Architecture**: Read the [Architecture Guide](./architecture-guide/architecture-guide.md) to understand the technology stack, system components, and implementation patterns.

2. **Review System Design**: Examine the [System Component Overview](./system-architecture/component-overview.puml) diagram to understand the high-level component architecture.

3. **Follow TDD Principles**: The project follows strict Test-Driven Development. Always write tests before implementation. See the testing strategy section in the Architecture Guide for details.

4. **Start Development**: Pick up a ticket from the backlog and follow the technical implementation plan provided in each ticket.

5. **Ask Questions**: If you encounter issues or have questions about the architecture, consult the documentation or reach out to the team.

## Common Commands Reference

Quick reference for frequently used commands:

| Command | Description |
|---------|-------------|
| `npm install` | Install all project dependencies |
| `npm run server:dev` | Start backend server on port 3001 |
| `npm run dev` | Start frontend server on port 5273 with HMR |
| `npm run dev:all` | Start both frontend and backend servers (future) |
| `npm test` | Run all tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate test coverage report |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code quality with ESLint |

## Troubleshooting

### General Issues

**Issue**: `npm install` fails with dependency errors
- **Solution**: Ensure you're using Node.js 18.x or higher. Delete `node_modules/` and `package-lock.json`, then run `npm install` again.

**Issue**: Development server won't start
- **Solution**: Check if port 5273 (frontend) or 3001 (backend) is already in use. With `strictPort: true`, Vite will fail instead of trying another port. Kill the process using the port or change the port in vite.config.ts.

**Issue**: Tests fail with import errors
- **Solution**: Ensure all test files are in the `src/` directory and have `.test.tsx` or `.test.ts` extensions.

**Issue**: TypeScript errors in IDE but build succeeds
- **Solution**: Restart your IDE's TypeScript server. In VS Code, use Command Palette > "TypeScript: Restart TS Server".

### Backend Server and CLI Integration Issues

**Issue**: "claude: command not found" error when generating itinerary
- **Root Cause**: Claude CLI is not installed or not in system PATH
- **Solution**:
  1. Verify installation: `claude --version` in terminal
  2. If not installed, follow Claude CLI installation guide
  3. If installed but not in PATH, add Claude CLI binary directory to system PATH
  4. Restart terminal and development server after PATH changes

**Issue**: Itinerary generation times out after 60 seconds
- **Root Cause**: CLI command execution exceeds configured timeout limit
- **Solution**:
  1. Check network connectivity if Claude CLI requires internet
  2. Try simpler prompt with fewer days to test if complexity is the issue
  3. Check backend server terminal logs for Claude CLI execution duration
  4. If consistently timing out, consider increasing timeout in server/services/claudeCliService.js
- **Workaround**: Reduce trip duration in form (try 2-3 days instead of 7+)

**Issue**: Backend server returns errors or malformed responses
- **Root Cause**: Claude CLI returned unexpected output or backend failed to process it
- **Debugging Steps**:
  1. Check backend server terminal logs for error messages
  2. Look for spawn errors, timeout messages, or stderr output from Claude CLI
  3. Verify Claude CLI is authenticated correctly
  4. Test Claude CLI directly: `claude -p "Generate a simple markdown itinerary"`
- **Solution**: Check backend logs for raw output, verify Claude CLI credentials are configured, ensure stdin.end() is being called

**Issue**: Frontend displays "Failed to generate itinerary" error
- **Root Cause**: Backend server is not running or not accessible
- **Debugging Steps**:
  1. Verify backend server is running on port 3001: Check terminal for "Server listening on port 3001"
  2. Check browser DevTools Network tab for failed /api/itinerary requests
  3. Test backend directly: `curl -X POST http://localhost:3001/api/itinerary -H "Content-Type: application/json" -d '{"destination":"Tokyo","partyInfo":"couple","month":"March","days":2}'`
- **Solution**: Ensure both frontend and backend servers are running, check Vite proxy configuration

**Issue**: localStorage quota exceeded errors
- **Root Cause**: Browser localStorage limit reached (typically 5-10MB)
- **Automatic Recovery**: LocalStorageService automatically removes oldest 3 items and retries
- **Manual Solution**:
  1. Open browser DevTools > Application tab > Local Storage
  2. Locate 'itinerary-history' key
  3. Delete to clear history
  4. Or use application's clear history feature if implemented

**Issue**: Seeing "Storage quota exceeded and cannot recover" error
- **Root Cause**: localStorage is full and automatic cleanup couldn't free enough space
- **Solution**:
  1. Clear browser localStorage manually via DevTools
  2. Clear other site data consuming localStorage
  3. Check if single itinerary is extremely large (reduce trip days if so)

### Debugging Tips

**Enable Detailed Logging**:
The backend server logs all operations to the terminal. Check backend server terminal for:
- Incoming API requests with parameters
- Claude CLI spawn commands being executed
- Raw markdown output from Claude
- Spawn errors, timeouts, or stderr messages
- Response times and error context

**Test Backend Server Directly**:
To isolate backend issues from frontend issues, test the API directly:
```bash
curl -X POST http://localhost:3001/api/itinerary \
  -H "Content-Type: application/json" \
  -d '{"destination":"Tokyo","partyInfo":"couple","month":"March","days":2}'
```

**Test Claude CLI Directly**:
To isolate CLI issues from backend issues, test Claude CLI directly:
```bash
claude -p "Generate a 2-day markdown itinerary for Tokyo for a couple traveling in March"
```

Compare CLI output with what the backend receives to identify integration issues.
