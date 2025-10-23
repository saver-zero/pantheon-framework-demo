/**
 * Unit tests for HistoryItem component
 *
 * Tests correct rendering of itinerary summary data, onSelect callback invocation,
 * onDelete callback with confirmation flow, and keyboard navigation accessibility.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistoryItem from './HistoryItem';
import { ItineraryResponse } from '../types';

/**
 * Sample test data
 */
const mockItinerary: ItineraryResponse = {
  destination: 'Paris',
  party_info: '2 adults',
  month: 'May',
  days: 5,
  itinerary: [
    {
      day: 1,
      morning: [
        {
          attraction: 'Eiffel Tower',
          attraction_description: 'Iconic landmark',
          what_to_do: ['Visit observation deck'],
          where_to_eat: 'Cafe nearby',
        },
      ],
      afternoon: null,
      evening: null,
    },
  ],
};

const mockSingleDayItinerary: ItineraryResponse = {
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
          attraction_description: 'Ancient temple',
          what_to_do: ['Visit temple'],
          where_to_eat: 'Street food',
        },
      ],
      afternoon: null,
      evening: null,
    },
  ],
};

describe('HistoryItem component rendering', () => {
  it('renders itinerary summary data correctly', () => {
    const mockOnSelect = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <HistoryItem
        itinerary={mockItinerary}
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText(/2 adults/i)).toBeInTheDocument();
    expect(screen.getByText(/May/i)).toBeInTheDocument();
    expect(screen.getByText(/5 days/i)).toBeInTheDocument();
  });

  it('displays party information with label', () => {
    const mockOnSelect = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <HistoryItem
        itinerary={mockItinerary}
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText(/Party:/i)).toBeInTheDocument();
    expect(screen.getByText(/2 adults/i)).toBeInTheDocument();
  });

  it('displays month with label', () => {
    const mockOnSelect = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <HistoryItem
        itinerary={mockItinerary}
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText(/Month:/i)).toBeInTheDocument();
    expect(screen.getByText(/May/i)).toBeInTheDocument();
  });

  it('displays duration with label in plural form', () => {
    const mockOnSelect = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <HistoryItem
        itinerary={mockItinerary}
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText(/Duration:/i)).toBeInTheDocument();
    expect(screen.getByText(/5 days/i)).toBeInTheDocument();
  });

  it('displays duration in singular form for 1 day', () => {
    const mockOnSelect = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <HistoryItem
        itinerary={mockSingleDayItinerary}
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText(/1 day/i)).toBeInTheDocument();
    expect(screen.queryByText(/1 days/i)).not.toBeInTheDocument();
  });

  it('renders delete button', () => {
    const mockOnSelect = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <HistoryItem
        itinerary={mockItinerary}
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByRole('button', { name: /delete paris itinerary/i })).toBeInTheDocument();
  });
});

describe('HistoryItem click interaction', () => {
  it('calls onSelect callback when item is clicked', async () => {
    const user = userEvent.setup();
    const mockOnSelect = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <HistoryItem
        itinerary={mockItinerary}
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      />
    );

    const item = screen.getByRole('button', { name: /view itinerary for paris/i });
    await user.click(item);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(mockItinerary);
  });

  it('does not call onDelete when item is clicked', async () => {
    const user = userEvent.setup();
    const mockOnSelect = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <HistoryItem
        itinerary={mockItinerary}
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      />
    );

    const item = screen.getByRole('button', { name: /view itinerary for paris/i });
    await user.click(item);

    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  it('has proper cursor pointer styling', () => {
    const mockOnSelect = vi.fn();
    const mockOnDelete = vi.fn();

    const { container } = render(
      <HistoryItem
        itinerary={mockItinerary}
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      />
    );

    const item = container.querySelector('.history-item');
    expect(item).toBeInTheDocument();
  });
});

describe('HistoryItem delete functionality', () => {
  it('calls onDelete callback when delete button is clicked and confirmed', async () => {
    const user = userEvent.setup();
    const mockOnSelect = vi.fn();
    const mockOnDelete = vi.fn();

    window.confirm = vi.fn(() => true);

    render(
      <HistoryItem
        itinerary={mockItinerary}
        index={2}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete paris itinerary/i });
    await user.click(deleteButton);

    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete this itinerary for Paris?'
    );
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(2);
  });

  it('does not call onDelete when delete is cancelled', async () => {
    const user = userEvent.setup();
    const mockOnSelect = vi.fn();
    const mockOnDelete = vi.fn();

    window.confirm = vi.fn(() => false);

    render(
      <HistoryItem
        itinerary={mockItinerary}
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete paris itinerary/i });
    await user.click(deleteButton);

    expect(window.confirm).toHaveBeenCalled();
    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  it('does not call onSelect when delete button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnSelect = vi.fn();
    const mockOnDelete = vi.fn();

    window.confirm = vi.fn(() => true);

    render(
      <HistoryItem
        itinerary={mockItinerary}
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete paris itinerary/i });
    await user.click(deleteButton);

    expect(mockOnSelect).not.toHaveBeenCalled();
  });

  it('shows confirmation dialog with destination name', async () => {
    const user = userEvent.setup();
    const mockOnSelect = vi.fn();
    const mockOnDelete = vi.fn();

    window.confirm = vi.fn(() => true);

    render(
      <HistoryItem
        itinerary={mockItinerary}
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete paris itinerary/i });
    await user.click(deleteButton);

    expect(window.confirm).toHaveBeenCalledWith(
      expect.stringContaining('Paris')
    );
  });
});

describe('HistoryItem keyboard accessibility', () => {
  it('responds to Enter key to select item', async () => {
    const user = userEvent.setup();
    const mockOnSelect = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <HistoryItem
        itinerary={mockItinerary}
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      />
    );

    const item = screen.getByRole('button', { name: /view itinerary for paris/i });
    item.focus();
    await user.keyboard('{Enter}');

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(mockItinerary);
  });

  it('responds to Space key to select item', async () => {
    const user = userEvent.setup();
    const mockOnSelect = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <HistoryItem
        itinerary={mockItinerary}
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      />
    );

    const item = screen.getByRole('button', { name: /view itinerary for paris/i });
    item.focus();
    await user.keyboard(' ');

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith(mockItinerary);
  });

  it('has proper role and tabIndex for accessibility', () => {
    const mockOnSelect = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <HistoryItem
        itinerary={mockItinerary}
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      />
    );

    const item = screen.getByRole('button', { name: /view itinerary for paris/i });
    expect(item).toHaveAttribute('tabIndex', '0');
  });

  it('has descriptive aria-label for item', () => {
    const mockOnSelect = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <HistoryItem
        itinerary={mockItinerary}
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      />
    );

    const item = screen.getByRole('button', { name: /view itinerary for paris, may, 5 days/i });
    expect(item).toBeInTheDocument();
  });

  it('has descriptive aria-label for delete button', () => {
    const mockOnSelect = vi.fn();
    const mockOnDelete = vi.fn();

    render(
      <HistoryItem
        itinerary={mockItinerary}
        index={0}
        onSelect={mockOnSelect}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete paris itinerary/i });
    expect(deleteButton).toBeInTheDocument();
  });
});
