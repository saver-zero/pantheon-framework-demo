import './LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Generating your personalized itinerary...</p>
    </div>
  );
};

export default LoadingSpinner;
