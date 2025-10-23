export interface Activity {
  attraction: string;
  attraction_description: string;
  what_to_do: string[];
  where_to_eat: string;
}

export interface TimePeriod {
  morning: Activity[] | null;
  afternoon: Activity[] | null;
  evening: Activity[] | null;
  night: Activity[] | null;
  late_night: Activity[] | null;
}

export interface Day extends TimePeriod {
  day: number;
}

export interface ItineraryResponse {
  destination: string;
  party_info: string;
  month: string;
  days: number;
  itinerary: Day[];
}
