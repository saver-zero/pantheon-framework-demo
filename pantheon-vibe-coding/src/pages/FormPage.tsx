import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ItineraryForm } from '../components/ItineraryForm';
import { useItinerary } from '../context/ItineraryContext';
import './FormPage.css';

const FormPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentItinerary, isLoading } = useItinerary();
  const previousItineraryRef = useRef(currentItinerary);

  // Clear the fromItineraryPage flag after a new itinerary is generated (T015, refined by T016)
  // T016 Resolution: The original T015 implementation cleared the flag immediately when detected,
  // which created a race condition with T013's navigation guard. Both useEffects depended on the
  // same state value, causing unpredictable execution order. By triggering the clearing logic
  // only when currentItinerary changes to a NEW value (not just when it exists), we ensure the flag
  // persists during initial navigation (preserving T013's behavior) but is cleared after a new
  // generation to enable auto-navigation for subsequent generations (preserving T015's behavior).
  useEffect(() => {
    // Only clear the flag if currentItinerary changed to a new value (not just because it exists)
    if (currentItinerary && currentItinerary !== previousItineraryRef.current && location.state?.fromItineraryPage) {
      navigate(location.pathname, { replace: true, state: {} });
    }
    previousItineraryRef.current = currentItinerary;
  }, [currentItinerary, navigate, location.pathname, location.state?.fromItineraryPage]);

  // Navigate to itinerary page after successful generation, but not when user
  // explicitly navigated back from the itinerary page via the 'Back to Form' button.
  // This prevents the form from immediately disappearing when users want to create a new itinerary.
  useEffect(() => {
    if (currentItinerary && !isLoading && !location.state?.fromItineraryPage) {
      navigate('/itinerary');
    }
  }, [currentItinerary, isLoading, navigate, location.state]);

  return (
    <div className="form-page">
      <div className="form-page-header">
        <h1 className="form-page-title">Plan Your Perfect Trip</h1>
        <p className="form-page-description">
          Tell us about your travel plans and we'll create a personalized day-by-day itinerary
        </p>
      </div>

      <div className="progress-indicator">Step 1 of 2: Enter Trip Details</div>

      <div className="form-container">
        <ItineraryForm />
      </div>
    </div>
  );
};

export default FormPage;
