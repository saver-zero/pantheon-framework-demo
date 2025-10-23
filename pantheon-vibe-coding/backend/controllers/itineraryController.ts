import { Request, Response } from 'express';
import { ClaudeCliService } from '../services/claudeCliService.js';
import type { ItineraryRequest } from '../types/types.js';

export async function generateItinerary(req: Request, res: Response): Promise<void> {
  try {
    // Extract request body fields
    const { destination, partyInfo, month, days } = req.body;

    // Validate all required fields are present
    if (!destination || !partyInfo || !month || !days) {
      res.status(400).json({
        message: 'Missing required fields. Please provide destination, partyInfo, month, and days.'
      });
      return;
    }

    // Validate data types
    if (typeof destination !== 'string' || typeof partyInfo !== 'string' || typeof month !== 'string') {
      res.status(400).json({
        message: 'Invalid field types. Destination, partyInfo, and month must be strings.'
      });
      return;
    }

    if (typeof days !== 'number' || days < 1 || days > 14) {
      res.status(400).json({
        message: 'Invalid days value. Days must be a number between 1 and 14.'
      });
      return;
    }

    // Construct request object
    const itineraryRequest: ItineraryRequest = {
      destination,
      partyInfo,
      month,
      days
    };

    // Execute Claude CLI command
    const markdownResponse: string = await ClaudeCliService.executeCliCommand(itineraryRequest);

    // Basic validation: ensure response is non-empty string
    if (!markdownResponse || typeof markdownResponse !== 'string' || markdownResponse.trim().length === 0) {
      throw new Error('Received empty or invalid response from CLI');
    }

    // Return markdown response wrapped in JSON for consistent API contract
    res.status(200).json({
      itinerary: markdownResponse
    });

  } catch (error: any) {
    // Log error for backend debugging
    console.error('Error generating itinerary:', error);

    // Translate errors to appropriate HTTP status codes
    const errorMessage = error.message || 'An unexpected error occurred';

    // Check for timeout errors
    if (errorMessage.includes('timeout') || errorMessage.includes('timed out')) {
      res.status(504).json({
        message: 'The request timed out. Please try again with a simpler request or check your Claude CLI configuration.'
      });
      return;
    }

    // Check for command not found errors
    if (errorMessage.includes('command not found') || errorMessage.includes('not installed')) {
      res.status(503).json({
        message: 'Claude CLI is not available. Please ensure Claude CLI is installed and accessible in your PATH.'
      });
      return;
    }

    // Check for empty response errors
    if (errorMessage.includes('empty') || errorMessage.includes('invalid response')) {
      res.status(502).json({
        message: 'The AI response was empty or invalid. Please try again.'
      });
      return;
    }

    // Default to internal server error
    res.status(500).json({
      message: `Server error: ${errorMessage}`
    });
  }
}
