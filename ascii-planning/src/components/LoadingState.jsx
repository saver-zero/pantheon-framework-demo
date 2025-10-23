import { useState, useEffect } from 'react';

export function LoadingState() {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="spinner"></div>
      <div className="loading-text">
        Generating your itinerary...
      </div>
      <div className="elapsed-time">
        {elapsedSeconds}s elapsed
      </div>
    </div>
  );
}
