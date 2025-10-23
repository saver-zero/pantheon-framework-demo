import React, { useState } from 'react';
import ItineraryDisplay from '../components/ItineraryDisplay/ItineraryDisplay';
import ErrorBoundary from '../components/ErrorBoundary';
import { testScenarios } from '../test-data/itinerary-test-data';
import { ItineraryResponse } from '../types';

/**
 * Test page for ItineraryDisplay component
 * Allows testing different scenarios and responsive layouts
 */
const ItineraryTestPage: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<keyof typeof testScenarios>('complete');
  const [currentItinerary, setCurrentItinerary] = useState<ItineraryResponse>(testScenarios.complete);

  const handleScenarioChange = (scenario: keyof typeof testScenarios) => {
    setSelectedScenario(scenario);
    setCurrentItinerary(testScenarios[scenario]);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: 'rgba(100, 108, 255, 0.1)',
        borderRadius: '8px'
      }}>
        <h1 style={{ marginBottom: '1rem' }}>ItineraryDisplay Component Test Page</h1>

        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Test Scenario:</h2>
          <select
            value={selectedScenario}
            onChange={(e) => handleScenarioChange(e.target.value as keyof typeof testScenarios)}
            style={{
              padding: '0.5rem',
              fontSize: '1rem',
              borderRadius: '4px',
              border: '1px solid rgba(100, 108, 255, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'inherit',
              cursor: 'pointer',
              minWidth: '250px'
            }}
          >
            <option value="complete">Complete Itinerary (All Time Periods)</option>
            <option value="minimal">Minimal Itinerary (Many Null Periods)</option>
            <option value="edgeCase">Edge Case (Very Long Text)</option>
            <option value="familyDayTrip">Family Day Trip (Selective Periods)</option>
          </select>
        </div>

        <div style={{
          padding: '0.75rem',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '4px',
          fontSize: '0.9rem'
        }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Testing Instructions:</h3>
          <ul style={{ marginLeft: '1.5rem', lineHeight: '1.6' }}>
            <li>Test responsive layouts by resizing browser window</li>
            <li>Mobile: 320px - 480px width</li>
            <li>Tablet: 481px - 768px width</li>
            <li>Desktop: 769px+ width</li>
            <li>Verify no horizontal scrolling occurs</li>
            <li>Check that null time periods don't display</li>
            <li>Ensure text remains readable at all sizes</li>
            <li>Verify touch targets are adequate on mobile (44px minimum)</li>
          </ul>
        </div>
      </div>

      <ErrorBoundary>
        <ItineraryDisplay itinerary={currentItinerary} />
      </ErrorBoundary>
    </div>
  );
};

export default ItineraryTestPage;
