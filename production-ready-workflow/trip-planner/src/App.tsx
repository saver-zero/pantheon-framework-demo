import { useState, useEffect } from 'react';
import { ItineraryForm } from './components/ItineraryForm';
import { ItineraryDisplay } from './components/ItineraryDisplay';
import { HistoryView } from './components/HistoryView';
import { CLIApiClient } from './services/CLIApiClient';
import type { ItineraryResponse } from './types/itinerary';
import './App.css';

const apiClient = new CLIApiClient();

function App() {
  const [currentItinerary, setCurrentItinerary] =
    useState<ItineraryResponse | null>(null);
  const [history, setHistory] = useState<ItineraryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const loadedHistory = apiClient.getHistory();
    setHistory(loadedHistory);
  };

  const handleGenerateItinerary = async (
    destination: string,
    partyInfo: string,
    month: string,
    days: number
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const itinerary = await apiClient.generateItinerary(
        destination,
        partyInfo,
        month,
        days
      );
      setCurrentItinerary(itinerary);
      loadHistory();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to generate itinerary'
      );
      console.error('Error generating itinerary:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistoryItem = (itinerary: ItineraryResponse) => {
    setCurrentItinerary(itinerary);
    setError(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Travel Itinerary Generator</h1>
        <p className="app-subtitle">
          Create personalized day-by-day travel plans in seconds
        </p>
      </header>

      <main className="app-main">
        <section className="form-section">
          <ItineraryForm
            onSubmit={handleGenerateItinerary}
            isLoading={isLoading}
          />

          {error && (
            <div className="error-banner">
              <strong>Error:</strong> {error}
              <button
                className="error-dismiss"
                onClick={() => setError(null)}
                aria-label="Dismiss error"
              >
                &times;
              </button>
            </div>
          )}

          {isLoading && (
            <div className="loading-banner">
              <div className="loading-spinner"></div>
              <p>Generating your personalized itinerary...</p>
              <p className="loading-subtext">This may take up to 30 seconds</p>
            </div>
          )}
        </section>

        <section className="results-section">
          <ItineraryDisplay itinerary={currentItinerary} />
        </section>

        <aside className="history-section">
          <HistoryView
            history={history}
            onSelectItinerary={handleSelectHistoryItem}
          />
        </aside>
      </main>

      <footer className="app-footer">
        <p>Powered by Claude AI</p>
      </footer>
    </div>
  );
}

export default App;
