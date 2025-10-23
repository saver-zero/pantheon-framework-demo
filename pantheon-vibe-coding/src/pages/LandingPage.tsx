import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/generate');
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Plan Your Perfect Trip in Minutes</h1>
          <p className="hero-subtitle">
            Generate personalized travel itineraries powered by AI. Simply tell us your
            destination, dates, and preferences, and we'll create a detailed day-by-day plan
            for your adventure.
          </p>
          <button className="cta-button" onClick={handleGetStarted}>
            Generate Your Itinerary
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-title">Why Use Our Trip Planner?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon" aria-hidden="true">⚡</div>
            <h3 className="feature-heading">Fast & Simple</h3>
            <p className="feature-description">
              Get a complete itinerary in seconds. No complex forms or lengthy questionnaires
              - just the essentials to create your perfect trip.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" aria-hidden="true">🎯</div>
            <h3 className="feature-heading">Personalized</h3>
            <p className="feature-description">
              Tailored recommendations based on your travel style, pace, and interests. Every
              itinerary is unique to your preferences.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" aria-hidden="true">📅</div>
            <h3 className="feature-heading">Day-by-Day Plans</h3>
            <p className="feature-description">
              Detailed daily schedules with activities, attractions, and timing suggestions.
              Know exactly what to do each day of your trip.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon" aria-hidden="true">💾</div>
            <h3 className="feature-heading">Save & Access</h3>
            <p className="feature-description">
              Your itineraries are saved locally for easy access. Review past trips and
              regenerate variations whenever you need them.
            </p>
          </div>
        </div>
      </section>

      {/* Example Preview Section */}
      <section className="preview-section">
        <h2 className="preview-title">See What You'll Get</h2>
        <div className="preview-card">
          <div className="preview-header">
            <h3>Sample Itinerary: Paris Adventure</h3>
            <p className="preview-meta">3 days • Moderate pace • Cultural focus</p>
          </div>
          <div className="preview-content">
            <div className="preview-day">
              <h4>Day 1: Iconic Landmarks</h4>
              <p>
                Start your Parisian adventure with visits to the Eiffel Tower, Trocadéro
                Gardens, and a Seine River cruise. End the day exploring the charming streets
                of Montmartre.
              </p>
            </div>
            <div className="preview-day">
              <h4>Day 2: Art & Culture</h4>
              <p>
                Immerse yourself in world-class art at the Louvre Museum, stroll through the
                Tuileries Garden, and experience the vibrant atmosphere of the Latin Quarter.
              </p>
            </div>
            <p className="preview-more">...and detailed plans for each day of your trip!</p>
          </div>
        </div>

        <button className="cta-button cta-button-secondary" onClick={handleGetStarted}>
          Create Your Own Itinerary
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
