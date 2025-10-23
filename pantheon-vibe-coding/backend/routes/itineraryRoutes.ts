import { Router } from 'express';
import { generateItinerary } from '../controllers/itineraryController.js';

const router = Router();

// POST /api/itinerary - Generate travel itinerary
router.post('/api/itinerary', generateItinerary);

export default router;
