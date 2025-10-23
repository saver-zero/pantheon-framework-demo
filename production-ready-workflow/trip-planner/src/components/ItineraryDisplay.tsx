import type {
  ItineraryResponse,
  DayItinerary,
  TimePeriod,
  Activity,
} from '../types/itinerary';
import Markdown from 'react-markdown';

interface ItineraryDisplayProps {
  itinerary: ItineraryResponse | null;
}

const TIME_PERIOD_LABELS: Record<string, string> = {
  morning: 'Morning',
  afternoon: 'Afternoon',
  evening: 'Evening',
  night: 'Night',
  late_night: 'Late Night',
};

export function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  if (!itinerary) {
    return null;
  }

  // If we have raw text, display that instead of structured data
  if (itinerary.rawText) {
    return (
      <div className="itinerary-display">
        <div className="itinerary-header">
          <h2>{itinerary.destination}</h2>
          <div className="itinerary-meta">
            <span>
              <strong>Party:</strong> {itinerary.party_info}
            </span>
            <span>
              <strong>Month:</strong> {itinerary.month}
            </span>
            <span>
              <strong>Duration:</strong> {itinerary.days}{' '}
              {itinerary.days === 1 ? 'day' : 'days'}
            </span>
          </div>
        </div>

        <div className="itinerary-text">
          <Markdown>{itinerary.rawText}</Markdown>
        </div>
      </div>
    );
  }

  return (
    <div className="itinerary-display">
      <div className="itinerary-header">
        <h2>{itinerary.destination}</h2>
        <div className="itinerary-meta">
          <span>
            <strong>Party:</strong> {itinerary.party_info}
          </span>
          <span>
            <strong>Month:</strong> {itinerary.month}
          </span>
          <span>
            <strong>Duration:</strong> {itinerary.days}{' '}
            {itinerary.days === 1 ? 'day' : 'days'}
          </span>
        </div>
      </div>

      <div className="itinerary-days">
        {itinerary.itinerary.map((day) => (
          <DaySection key={day.day} day={day} />
        ))}
      </div>
    </div>
  );
}

function DaySection({ day }: { day: DayItinerary }) {
  const timePeriods = ['morning', 'afternoon', 'evening', 'night', 'late_night'];

  return (
    <div className="day-section">
      <h3 className="day-title">Day {day.day}</h3>
      <div className="time-periods">
        {timePeriods.map((period) => {
          const activities = day[period as keyof DayItinerary] as TimePeriod;
          if (!activities || activities.length === 0) {
            return null;
          }

          return (
            <TimePeriodSection
              key={period}
              period={period}
              activities={activities}
            />
          );
        })}
      </div>
    </div>
  );
}

function TimePeriodSection({
  period,
  activities,
}: {
  period: string;
  activities: Activity[];
}) {
  return (
    <div className="time-period">
      <h4 className="time-period-title">{TIME_PERIOD_LABELS[period]}</h4>
      <div className="activities">
        {activities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="activity-card">
      <h5 className="attraction-name">{activity.attraction}</h5>
      <p className="attraction-description">{activity.attraction_description}</p>

      <div className="what-to-do">
        <strong>What to do:</strong>
        <ul>
          {activity.what_to_do.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="where-to-eat">
        <strong>Where to eat:</strong> {activity.where_to_eat}
      </div>
    </div>
  );
}
