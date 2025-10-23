import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import itineraryRoutes from './routes/itineraryRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(express.json());
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Backend server is running' });
});

app.use(itineraryRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
