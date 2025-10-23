/**
 * App Container Component
 *
 * Root component that provides the application shell with global state management,
 * error boundaries, and routing configuration.
 *
 * Component Hierarchy:
 * - ErrorBoundary: Catches and handles React component errors
 * - ItineraryProvider: Provides global context for itinerary state and API interactions
 * - BrowserRouter: Enables client-side routing
 * - Routes: Defines application routes and their corresponding page components
 *
 * The ErrorBoundary is the outermost component to catch any errors from child components.
 * The ItineraryProvider initializes the API client and manages global state.
 * All routes have access to the itinerary context through the useItinerary hook.
 */

import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import FormPage from './pages/FormPage';
import ItineraryPage from './pages/ItineraryPage';
import HistoryPage from './pages/HistoryPage';
import ItineraryTestPage from './pages/ItineraryTestPage';
import ErrorBoundary from './components/ErrorBoundary';
import { ItineraryProvider } from './context/ItineraryContext';
import './App.css';

/**
 * Navigation component with responsive menu
 */
function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="app-nav" aria-label="Main navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
          <h1 className="nav-title">Trip Planner</h1>
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <ul className={`nav-menu ${mobileMenuOpen ? 'nav-menu-open' : ''}`}>
          <li>
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'nav-link-active' : ''}`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/generate"
              className={`nav-link ${isActive('/generate') ? 'nav-link-active' : ''}`}
              onClick={closeMobileMenu}
            >
              Generate
            </Link>
          </li>
          <li>
            <Link
              to="/history"
              className={`nav-link ${isActive('/history') ? 'nav-link-active' : ''}`}
              onClick={closeMobileMenu}
            >
              History
            </Link>
          </li>
        </ul>
      </div>

      {mobileMenuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={closeMobileMenu}
          aria-hidden="true"
        ></div>
      )}
    </nav>
  );
}

/**
 * Main application component
 * @returns {JSX.Element} The root application component tree
 */
function App() {
  return (
    <ErrorBoundary>
      <ItineraryProvider>
        <BrowserRouter>
          <a href="#main-content" className="skip-to-main">
            Skip to main content
          </a>
          <div data-testid="app-container" className="app-shell">
            <Navigation />
            <main id="main-content" className="main-content">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/generate" element={<FormPage />} />
                <Route path="/itinerary" element={<ItineraryPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/test-itinerary" element={<ItineraryTestPage />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </ItineraryProvider>
    </ErrorBoundary>
  );
}

export default App;
