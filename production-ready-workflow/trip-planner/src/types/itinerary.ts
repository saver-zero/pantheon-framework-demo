export interface Activity {
  attraction: string;
  attraction_description: string;
  what_to_do: string[];
  where_to_eat: string;
}

export type TimePeriod = Activity[] | null;

export interface DayItinerary {
  day: number;
  morning: TimePeriod;
  afternoon: TimePeriod;
  evening: TimePeriod;
  night?: TimePeriod;
  late_night?: TimePeriod;
}

export interface ItineraryResponse {
  destination: string;
  party_info: string;
  month: string;
  days: number;
  itinerary: DayItinerary[];
  rawText?: string;
}

export interface ItineraryRequest {
  destination: string;
  partyInfo: string;
  month: string;
  days: number;
}

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export type Month = typeof MONTHS[number];
