import express from 'express';
import cors from 'cors';
import itineraryRouter from './routes/itinerary.js';
import { logger } from './utils/logger.js';

const app = express();

// Configure server port from environment variable
// Default: 3001 if PORT is not set
// Can be configured via environment: PORT=3001 node server/index.js
const PORT = process.env.PORT || 3001;

// Configure CORS origin from environment variable
// Default: http://localhost:5273 for development
// Production: Set FRONTEND_URL environment variable to your deployed frontend URL
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5273';

app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
  logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/api/itinerary', itineraryRouter);

app.use((err, req, res, next) => {
  logger.error('Request error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.listen(PORT, () => {
  logger.info(`Backend server running on http://localhost:${PORT}`);
});
