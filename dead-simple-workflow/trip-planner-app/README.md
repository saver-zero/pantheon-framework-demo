# Trip Planner App

A React + TypeScript + Vite application that generates travel itineraries using Claude CLI.

## Architecture

This application consists of two components:

1. **Frontend (React + Vite)**: Runs on port 3200
2. **Backend (Express API)**: Runs on port 3201

The backend server acts as a proxy to execute Claude CLI commands and return the results to the frontend.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Claude CLI installed and configured

### Installation

```bash
npm install
```

### Running the Application

You need to run both the backend server and the frontend client:

#### 1. Start the Backend Server

In one terminal:

```bash
npm run server
```

The backend server will start on http://localhost:3201

#### 2. Start the Frontend Client

In another terminal:

```bash
npm run dev
```

The frontend will start on http://localhost:3200

### Available Scripts

- `npm run dev` - Start the Vite development server (frontend)
- `npm run server` - Start the Express backend server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
