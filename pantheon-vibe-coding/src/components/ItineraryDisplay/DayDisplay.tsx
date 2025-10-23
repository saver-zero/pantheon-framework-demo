/**
 * DayDisplay Component
 *
 * Renders a single day's itinerary including day number and all time periods.
 * Handles nullable time periods (night, late_night) gracefully.
 */

import React from 'react';
import { Day } from '../../types';
import TimePeriodDisplay from './TimePeriodDisplay';

/**
 * Props interface for DayDisplay component
 */
interface DayDisplayProps {
  day: Day;
}

/**
 * DayDisplay component renders a single day with all time periods
 */
const DayDisplay: React.FC<DayDisplayProps> = ({ day }) => {
  const { day: dayNumber, morning, afternoon, evening, night, late_night } = day;

  return (
    <div className="day-display">
      <h2 className="day-display__header">Day {dayNumber}</h2>
      <div className="day-display__time-periods">
        {morning && <TimePeriodDisplay periodName="Morning" timePeriod={morning} />}
        {afternoon && <TimePeriodDisplay periodName="Afternoon" timePeriod={afternoon} />}
        {evening && <TimePeriodDisplay periodName="Evening" timePeriod={evening} />}
        {night && <TimePeriodDisplay periodName="Night" timePeriod={night} />}
        {late_night && <TimePeriodDisplay periodName="Late Night" timePeriod={late_night} />}
      </div>
    </div>
  );
};

export default DayDisplay;
