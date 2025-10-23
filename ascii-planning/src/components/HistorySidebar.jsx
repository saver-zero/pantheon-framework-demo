import { useState, useEffect } from 'react';

function HistoryItem({ itinerary, isSelected, onClick }) {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div
      className={`history-item ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <div className="history-item-destination">{itinerary.destination}, {itinerary.days}d</div>
      <div className="history-item-date">{formatDate(itinerary.generatedAt)}</div>
    </div>
  );
}

export function HistorySidebar({ history, selectedId, onSelectItinerary }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectItinerary = (itinerary) => {
    onSelectItinerary(itinerary);
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleWashClick = () => {
    setIsOpen(false);
  };

  const sidebarContent = (
    <div className="history-sidebar-content">
      <h3>Recent ({history.length})</h3>
      <div className="history-divider"></div>
      {history.length === 0 ? (
        <div className="history-empty">No itineraries yet</div>
      ) : (
        <div className="history-list">
          {history.map((itinerary) => (
            <HistoryItem
              key={itinerary.id}
              itinerary={itinerary}
              isSelected={selectedId === itinerary.id}
              onClick={() => handleSelectItinerary(itinerary)}
            />
          ))}
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <>
        <button
          className="hamburger-button"
          onClick={toggleDrawer}
          aria-label="Toggle history"
        >
          ☰
        </button>

        {isOpen && (
          <>
            <div className="drawer-wash" onClick={handleWashClick}></div>
            <div className={`history-sidebar mobile ${isOpen ? 'open' : ''}`}>
              {sidebarContent}
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <div className="history-sidebar desktop">
      {sidebarContent}
    </div>
  );
}
