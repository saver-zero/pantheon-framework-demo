import { useState, useEffect } from 'react';
import { InputForm } from './components/InputForm';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { GeneratedItinerary } from './components/GeneratedItinerary';
import { HistorySidebar } from './components/HistorySidebar';
import { CLIApiClient } from './services/cliApiClient';
import { LocalStorageService } from './services/localStorage';
import './App.css';

const AppState = {
  INPUT: 'INPUT',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

function App() {
  const [appState, setAppState] = useState(AppState.INPUT);
  const [formData, setFormData] = useState({});
  const [currentItinerary, setCurrentItinerary] = useState(null);
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const itineraries = LocalStorageService.getAllItineraries();
    setHistory(itineraries);
  };

  const handleFormSubmit = async (data) => {
    setFormData(data);
    setAppState(AppState.LOADING);
    setError(null);
    setSelectedHistoryId(null);

    try {
      const result = await CLIApiClient.generateItinerary(data);

      const itinerary = LocalStorageService.saveItinerary({
        destination: data.destination,
        partyInfo: data.partyInfo,
        travelMonth: data.travelMonth,
        days: data.days,
        generationDuration: result.generationDuration,
        itineraryMarkdown: result.itineraryMarkdown
      });

      setCurrentItinerary(itinerary);
      setAppState(AppState.SUCCESS);
      loadHistory();

    } catch (err) {
      setError(err);
      setAppState(AppState.ERROR);
    }
  };

  const handleRetry = () => {
    setAppState(AppState.INPUT);
    setError(null);
  };

  const handleNewItinerary = () => {
    setAppState(AppState.INPUT);
    setSelectedHistoryId(null);
  };

  const handleSelectItinerary = (itinerary) => {
    setCurrentItinerary(itinerary);
    setSelectedHistoryId(itinerary.id);
    setAppState(AppState.SUCCESS);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>TRIP ITINERARY GENERATOR</h1>
      </header>

      <div className="app-container">
        <HistorySidebar
          history={history}
          selectedId={selectedHistoryId}
          onSelectItinerary={handleSelectItinerary}
        />

        <main className="main-content">
          {appState === AppState.INPUT && (
            <InputForm
              onSubmit={handleFormSubmit}
              isLoading={false}
              initialValues={formData}
            />
          )}

          {appState === AppState.LOADING && (
            <>
              <InputForm
                onSubmit={handleFormSubmit}
                isLoading={true}
                initialValues={formData}
              />
              <LoadingState />
            </>
          )}

          {appState === AppState.ERROR && (
            <ErrorState error={error} onRetry={handleRetry} />
          )}

          {appState === AppState.SUCCESS && currentItinerary && (
            <GeneratedItinerary
              itinerary={currentItinerary}
              onNewItinerary={handleNewItinerary}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
