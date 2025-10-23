import express from 'express';
import { generateItinerary } from '../services/claudeCliService.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { destination, partyInfo, month, days } = req.body;

    if (!destination || !destination.trim()) {
      return res.status(400).json({ error: 'Destination is required' });
    }

    if (!partyInfo || !partyInfo.trim()) {
      return res.status(400).json({ error: 'Party information is required' });
    }

    if (!month || !month.trim()) {
      return res.status(400).json({ error: 'Month is required' });
    }

    if (!days || days <= 0) {
      return res.status(400).json({ error: 'Number of days must be greater than 0' });
    }

    logger.info('Itinerary request:', { destination, partyInfo, month, days });

    const markdown = await generateItinerary({
      destination,
      partyInfo,
      month,
      days: parseInt(days, 10)
    });

    logger.info(`Itinerary generated: ${markdown.length} characters`);

    res.json({ markdown });
  } catch (error) {
    next(error);
  }
});

export default router;
