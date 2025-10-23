/**
 * TimePeriodDisplay Component
 *
 * Renders activities within a specific time period with period label.
 */

import React from 'react';
import { TimePeriod } from '../../types';
import ActivityDisplay from './ActivityDisplay';

/**
 * Props interface for TimePeriodDisplay component
 */
interface TimePeriodDisplayProps {
  periodName: string;
  timePeriod: TimePeriod;
}

/**
 * TimePeriodDisplay component renders activities for a single time period
 */
const TimePeriodDisplay: React.FC<TimePeriodDisplayProps> = ({ periodName, timePeriod }) => {
  if (!timePeriod || timePeriod.length === 0) {
    return null;
  }

  return (
    <div className="time-period-display">
      <h3 className="time-period-display__header">{periodName}</h3>
      <div className="time-period-display__activities">
        {timePeriod.map((activity, index) => (
          <ActivityDisplay key={`${periodName}-activity-${index}`} activity={activity} />
        ))}
      </div>
    </div>
  );
};

export default TimePeriodDisplay;
