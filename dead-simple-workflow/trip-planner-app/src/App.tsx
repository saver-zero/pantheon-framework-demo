import { useState } from 'react';
import './App.css';
import ItineraryForm from './components/ItineraryForm';
import MarkdownItineraryDisplay from './components/MarkdownItineraryDisplay';
import HistoryView from './components/HistoryView';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { CLIApiClient } from './services/api/CLIApiClient';

type View = 'form' | 'history' | 'result';

function App() {
  const [currentView, setCurrentView] = useState<View>('form');
  const [currentMarkdown, setCurrentMarkdown] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiClient = new CLIApiClient();

  const handleFormSubmit = async (
    destination: string,
    partyInfo: string,
    month: string,
    days: number
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const itinerary = await apiClient.generateItinerary(destination, partyInfo, month, days);
      setCurrentMarkdown(itinerary.markdown);
      setCurrentView('result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating the itinerary');
    } finally {
      setIsLoading(false);
    }
  };

  const renderNavigation = () => (
    <nav className="navigation">
      <button
        onClick={() => setCurrentView('form')}
        className={currentView === 'form' ? 'active' : ''}
      >
        New Itinerary
      </button>
      <button
        onClick={() => setCurrentView('history')}
        className={currentView === 'history' ? 'active' : ''}
      >
        History
      </button>
    </nav>
  );

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return (
        <ErrorMessage
          message={error}
          onRetry={() => {
            setError(null);
            setCurrentView('form');
          }}
        />
      );
    }

    switch (currentView) {
      case 'form':
        return <ItineraryForm onSubmit={handleFormSubmit} isLoading={isLoading} />;
      case 'history':
        return <HistoryView apiClient={apiClient} />;
      case 'result':
        return currentMarkdown ? <MarkdownItineraryDisplay markdown={currentMarkdown} /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Travel Itinerary Generator</h1>
        {renderNavigation()}
      </header>

      <main>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
