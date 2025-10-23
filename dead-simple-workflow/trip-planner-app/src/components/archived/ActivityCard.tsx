import type { Activity } from '../types/itinerary';
import './ActivityCard.css';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <div className="activity-card">
      <h4>{activity.attraction}</h4>
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
};

export default ActivityCard;
