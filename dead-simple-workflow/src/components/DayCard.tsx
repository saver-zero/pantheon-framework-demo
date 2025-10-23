import { Day } from '../types/itinerary';
import TimePeriodCard from './TimePeriodCard';

interface DayCardProps {
  day: Day;
}

const DayCard: React.FC<DayCardProps> = ({ day }) => {
  return (
    <div className="day-card">
      <h2>Day {day.day}</h2>

      <TimePeriodCard label="Morning" activities={day.morning} />
      <TimePeriodCard label="Afternoon" activities={day.afternoon} />
      <TimePeriodCard label="Evening" activities={day.evening} />
      <TimePeriodCard label="Night" activities={day.night} />
      <TimePeriodCard label="Late Night" activities={day.late_night} />
    </div>
  );
};

export default DayCard;
