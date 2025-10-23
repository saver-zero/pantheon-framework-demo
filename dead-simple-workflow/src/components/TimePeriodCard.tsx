import { Activity } from '../types/itinerary';
import ActivityCard from './ActivityCard';

interface TimePeriodCardProps {
  label: string;
  activities: Activity[] | null;
}

const TimePeriodCard: React.FC<TimePeriodCardProps> = ({ label, activities }) => {
  if (!activities || activities.length === 0) {
    return null;
  }

  return (
    <div className="time-period-card">
      <h3 className="time-period-label">{label}</h3>
      <div className="activities">
        {activities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default TimePeriodCard;
