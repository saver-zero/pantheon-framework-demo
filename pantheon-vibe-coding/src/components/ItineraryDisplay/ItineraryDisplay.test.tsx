/**
 * Unit tests for ItineraryDisplay component
 *
 * Tests component rendering with complete itinerary data, handling of null/optional
 * time periods, verification that all activity details render correctly, and responsive
 * layout behavior.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ItineraryDisplay from './ItineraryDisplay';
import { ItineraryResponse } from '../../types';

/**
 * Sample test data with complete itinerary
 */
const mockCompleteItinerary: ItineraryResponse = {
  destination: 'Paris',
  party_info: '2 adults',
  month: 'May',
  days: 2,
  itinerary: [
    {
      day: 1,
      morning: [
        {
          attraction: 'Eiffel Tower',
          attraction_description: 'Iconic iron lattice tower on the Champ de Mars',
          what_to_do: ['Visit observation deck', 'Take photos', 'Learn about the history'],
          where_to_eat: 'Cafe de l\'Homme with Eiffel Tower views',
        },
      ],
      afternoon: [
        {
          attraction: 'Louvre Museum',
          attraction_description: 'World\'s largest art museum and historic monument',
          what_to_do: ['See the Mona Lisa', 'Explore Egyptian antiquities', 'Admire Renaissance art'],
          where_to_eat: 'Cafe Mollien inside the museum',
        },
      ],
      evening: [
        {
          attraction: 'Seine River Cruise',
          attraction_description: 'Scenic river cruise through the heart of Paris',
          what_to_do: ['Enjoy dinner cruise', 'See illuminated monuments', 'Relax on deck'],
          where_to_eat: 'Dinner served on cruise',
        },
      ],
      night: [
        {
          attraction: 'Montmartre',
          attraction_description: 'Historic hilltop neighborhood with artistic heritage',
          what_to_do: ['Visit Sacre-Coeur Basilica', 'Explore artist squares', 'Enjoy night views'],
          where_to_eat: 'La Maison Rose restaurant',
        },
      ],
      late_night: [
        {
          attraction: 'Moulin Rouge',
          attraction_description: 'World-famous cabaret in the Pigalle district',
          what_to_do: ['Watch the show', 'Enjoy champagne', 'Experience Parisian nightlife'],
          where_to_eat: 'Champagne and snacks at the venue',
        },
      ],
    },
    {
      day: 2,
      morning: [
        {
          attraction: 'Notre-Dame Cathedral',
          attraction_description: 'Medieval Catholic cathedral known for French Gothic architecture',
          what_to_do: ['View the facade', 'Explore the island', 'Visit nearby bookshops'],
          where_to_eat: 'Shakespeare and Company Cafe',
        },
      ],
      afternoon: null,
      evening: null,
    },
  ],
};

/**
 * Sample test data with minimal itinerary (null time periods)
 */
const mockMinimalItinerary: ItineraryResponse = {
  destination: 'Tokyo',
  party_info: '1 solo traveler',
  month: 'March',
  days: 1,
  itinerary: [
    {
      day: 1,
      morning: [
        {
          attraction: 'Senso-ji Temple',
          attraction_description: 'Ancient Buddhist temple in Asakusa',
          what_to_do: ['Visit the temple', 'Shop at Nakamise Street'],
          where_to_eat: 'Local street food stalls',
        },
      ],
      afternoon: null,
      evening: null,
    },
  ],
};

describe('ItineraryDisplay component rendering', () => {
  it('renders with complete itinerary data', () => {
    render(<ItineraryDisplay itinerary={mockCompleteItinerary} />);

    // Check metadata is rendered
    expect(screen.getByText('Destination')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Party')).toBeInTheDocument();
    expect(screen.getByText('2 adults')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('May')).toBeInTheDocument();
    expect(screen.getByText('Duration')).toBeInTheDocument();
    expect(screen.getByText('2 days')).toBeInTheDocument();

    // Check day headers are rendered
    expect(screen.getByText('Day 1')).toBeInTheDocument();
    expect(screen.getByText('Day 2')).toBeInTheDocument();
  });

  it('renders all time periods when present', () => {
    render(<ItineraryDisplay itinerary={mockCompleteItinerary} />);

    // Check all time periods are rendered (using getAllByText since Morning appears twice)
    const morningElements = screen.getAllByText('Morning');
    expect(morningElements.length).toBeGreaterThan(0);
    expect(screen.getByText('Afternoon')).toBeInTheDocument();
    expect(screen.getByText('Evening')).toBeInTheDocument();
    expect(screen.getByText('Night')).toBeInTheDocument();
    expect(screen.getByText('Late Night')).toBeInTheDocument();
  });

  it('renders attraction names correctly', () => {
    render(<ItineraryDisplay itinerary={mockCompleteItinerary} />);

    // Check attraction names are rendered
    expect(screen.getByText('Eiffel Tower')).toBeInTheDocument();
    expect(screen.getByText('Louvre Museum')).toBeInTheDocument();
    expect(screen.getByText('Seine River Cruise')).toBeInTheDocument();
    expect(screen.getByText('Montmartre')).toBeInTheDocument();
    expect(screen.getByText('Moulin Rouge')).toBeInTheDocument();
  });

  it('renders attraction descriptions correctly', () => {
    render(<ItineraryDisplay itinerary={mockCompleteItinerary} />);

    // Check attraction descriptions are rendered
    expect(screen.getByText('Iconic iron lattice tower on the Champ de Mars')).toBeInTheDocument();
    expect(screen.getByText('World\'s largest art museum and historic monument')).toBeInTheDocument();
  });

  it('renders what_to_do items as bulleted list', () => {
    render(<ItineraryDisplay itinerary={mockCompleteItinerary} />);

    // Check what_to_do items are rendered
    expect(screen.getByText('Visit observation deck')).toBeInTheDocument();
    expect(screen.getByText('Take photos')).toBeInTheDocument();
    expect(screen.getByText('Learn about the history')).toBeInTheDocument();
    expect(screen.getByText('See the Mona Lisa')).toBeInTheDocument();
  });

  it('renders where_to_eat information', () => {
    render(<ItineraryDisplay itinerary={mockCompleteItinerary} />);

    // Check where_to_eat is rendered with proper label
    expect(screen.getByText(/Cafe de l'Homme with Eiffel Tower views/i)).toBeInTheDocument();
    expect(screen.getByText(/Cafe Mollien inside the museum/i)).toBeInTheDocument();
  });

  it('uses semantic HTML structure', () => {
    const { container } = render(<ItineraryDisplay itinerary={mockCompleteItinerary} />);

    // Check for semantic HTML elements
    expect(container.querySelector('section.itinerary-display')).toBeInTheDocument();
    expect(container.querySelector('header.itinerary-display__metadata')).toBeInTheDocument();
    expect(container.querySelector('main.itinerary-display__days')).toBeInTheDocument();
  });
});

describe('Handling null/optional time periods', () => {
  it('handles null time periods gracefully', () => {
    render(<ItineraryDisplay itinerary={mockMinimalItinerary} />);

    // Morning should be rendered
    expect(screen.getByText('Morning')).toBeInTheDocument();
    expect(screen.getByText('Senso-ji Temple')).toBeInTheDocument();

    // Afternoon, evening, night, late_night should not be rendered
    expect(screen.queryByText('Afternoon')).not.toBeInTheDocument();
    expect(screen.queryByText('Evening')).not.toBeInTheDocument();
    expect(screen.queryByText('Night')).not.toBeInTheDocument();
    expect(screen.queryByText('Late Night')).not.toBeInTheDocument();
  });

  it('renders only non-null time periods for Day 2', () => {
    render(<ItineraryDisplay itinerary={mockCompleteItinerary} />);

    // Day 2 should have only morning (based on mockCompleteItinerary)
    const day2Section = screen.getByText('Day 2').parentElement;
    expect(day2Section).toBeInTheDocument();

    // Check that Notre-Dame is rendered (from Day 2 morning)
    expect(screen.getByText('Notre-Dame Cathedral')).toBeInTheDocument();
  });

  it('does not render empty time period sections', () => {
    const { container } = render(<ItineraryDisplay itinerary={mockMinimalItinerary} />);

    // Count time-period-display elements (should be 1 for morning only)
    const timePeriodSections = container.querySelectorAll('.time-period-display');
    expect(timePeriodSections).toHaveLength(1);
  });
});

describe('Activity details rendering', () => {
  it('renders all activities for a time period with multiple activities', () => {
    const multiActivityItinerary: ItineraryResponse = {
      destination: 'London',
      party_info: 'Family of 4',
      month: 'July',
      days: 1,
      itinerary: [
        {
          day: 1,
          morning: [
            {
              attraction: 'Tower of London',
              attraction_description: 'Historic castle on the Thames',
              what_to_do: ['See the Crown Jewels', 'Explore the towers'],
              where_to_eat: 'Tower Cafe',
            },
            {
              attraction: 'Tower Bridge',
              attraction_description: 'Iconic Victorian bridge',
              what_to_do: ['Walk across the bridge', 'Visit the exhibition'],
              where_to_eat: 'Bridge Restaurant',
            },
          ],
          afternoon: null,
          evening: null,
        },
      ],
    };

    render(<ItineraryDisplay itinerary={multiActivityItinerary} />);

    // Check both activities are rendered
    expect(screen.getByText('Tower of London')).toBeInTheDocument();
    expect(screen.getByText('Tower Bridge')).toBeInTheDocument();
    expect(screen.getByText('See the Crown Jewels')).toBeInTheDocument();
    expect(screen.getByText('Walk across the bridge')).toBeInTheDocument();
  });

  it('renders correct number of what_to_do items', () => {
    render(<ItineraryDisplay itinerary={mockCompleteItinerary} />);

    // Eiffel Tower has 3 what_to_do items
    expect(screen.getByText('Visit observation deck')).toBeInTheDocument();
    expect(screen.getByText('Take photos')).toBeInTheDocument();
    expect(screen.getByText('Learn about the history')).toBeInTheDocument();
  });

  it('displays day count correctly for single day', () => {
    render(<ItineraryDisplay itinerary={mockMinimalItinerary} />);

    // Should show "1 day" (singular)
    expect(screen.getByText('1 day')).toBeInTheDocument();
  });

  it('displays day count correctly for multiple days', () => {
    render(<ItineraryDisplay itinerary={mockCompleteItinerary} />);

    // Should show "2 days" (plural)
    expect(screen.getByText('2 days')).toBeInTheDocument();
  });
});

describe('Responsive layout and accessibility', () => {
  it('applies correct CSS classes for styling', () => {
    const { container } = render(<ItineraryDisplay itinerary={mockCompleteItinerary} />);

    // Check for main container classes
    expect(container.querySelector('.itinerary-display')).toBeInTheDocument();
    expect(container.querySelector('.itinerary-display__metadata')).toBeInTheDocument();
    expect(container.querySelector('.itinerary-display__days')).toBeInTheDocument();

    // Check for day display classes
    expect(container.querySelector('.day-display')).toBeInTheDocument();
    expect(container.querySelector('.day-display__header')).toBeInTheDocument();

    // Check for time period classes
    expect(container.querySelector('.time-period-display')).toBeInTheDocument();
    expect(container.querySelector('.time-period-display__header')).toBeInTheDocument();

    // Check for activity classes
    expect(container.querySelector('.activity-display')).toBeInTheDocument();
    expect(container.querySelector('.activity-display__attraction-name')).toBeInTheDocument();
  });

  it('renders with proper heading hierarchy', () => {
    const { container } = render(<ItineraryDisplay itinerary={mockCompleteItinerary} />);

    // Check heading hierarchy: h2 for days, h3 for time periods, h4 for attractions
    const h2Elements = container.querySelectorAll('h2');
    const h3Elements = container.querySelectorAll('h3');
    const h4Elements = container.querySelectorAll('h4');

    expect(h2Elements.length).toBeGreaterThan(0); // Day headers
    expect(h3Elements.length).toBeGreaterThan(0); // Time period headers
    expect(h4Elements.length).toBeGreaterThan(0); // Attraction names
  });

  it('uses list elements for what_to_do items', () => {
    const { container } = render(<ItineraryDisplay itinerary={mockCompleteItinerary} />);

    // Check for unordered list structure
    const lists = container.querySelectorAll('.activity-display__activities-list');
    expect(lists.length).toBeGreaterThan(0);

    // Check for list items
    const listItems = container.querySelectorAll('.activity-display__activity-item');
    expect(listItems.length).toBeGreaterThan(0);
  });

  it('maintains proper structure for screen readers', () => {
    const { container } = render(<ItineraryDisplay itinerary={mockCompleteItinerary} />);

    // Check for semantic elements
    expect(container.querySelector('section')).toBeInTheDocument();
    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('main')).toBeInTheDocument();
  });
});
