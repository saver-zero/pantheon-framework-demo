/**
 * ActivityDisplay Component
 *
 * Renders individual activity details including attraction, description,
 * activities list, and dining information.
 */

import React from 'react';
import { TimePeriodActivity } from '../../types';

/**
 * Props interface for ActivityDisplay component
 */
interface ActivityDisplayProps {
  activity: TimePeriodActivity;
}

/**
 * ActivityDisplay component renders a single activity with all details
 */
const ActivityDisplay: React.FC<ActivityDisplayProps> = ({ activity }) => {
  const { attraction, attraction_description, what_to_do, where_to_eat } = activity;

  return (
    <div className="activity-display">
      <h4 className="activity-display__attraction-name">{attraction}</h4>
      <p className="activity-display__description">{attraction_description}</p>
      <div className="activity-display__section-title">What to Do</div>
      <ul className="activity-display__activities-list">
        {what_to_do.map((item, index) => (
          <li className="activity-display__activity-item" key={`activity-${index}`}>{item}</li>
        ))}
      </ul>
      <div className="activity-display__dining">
        <strong>Where to eat:</strong> {where_to_eat}
      </div>
    </div>
  );
};

export default ActivityDisplay;
