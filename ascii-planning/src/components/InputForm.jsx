import { useState, useEffect } from 'react';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function InputForm({ onSubmit, isLoading, initialValues = {} }) {
  const [formData, setFormData] = useState({
    destination: initialValues.destination || '',
    partyInfo: initialValues.partyInfo || '',
    travelMonth: initialValues.travelMonth || '',
    days: initialValues.days || ''
  });

  const [touched, setTouched] = useState({
    destination: false,
    partyInfo: false,
    travelMonth: false,
    days: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};

    if (touched.destination && formData.destination.trim().length < 3) {
      newErrors.destination = 'Destination must be at least 3 characters';
    }

    if (touched.partyInfo && formData.partyInfo.trim().length === 0) {
      newErrors.partyInfo = 'Party information is required';
    }

    if (touched.travelMonth && !formData.travelMonth) {
      newErrors.travelMonth = 'Please select a travel month';
    }

    if (touched.days) {
      const daysNum = parseFloat(formData.days);
      if (formData.days === '' || isNaN(daysNum)) {
        newErrors.days = 'Number of days is required';
      } else if (daysNum !== parseInt(formData.days) || daysNum < 1 || daysNum > 7) {
        newErrors.days = 'Days must be an integer between 1 and 7';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return (
      formData.destination.trim().length >= 3 &&
      formData.partyInfo.trim().length > 0 &&
      formData.travelMonth !== '' &&
      formData.days !== '' &&
      !isNaN(parseFloat(formData.days)) &&
      parseFloat(formData.days) === parseInt(formData.days) &&
      parseInt(formData.days) >= 1 &&
      parseInt(formData.days) <= 7
    );
  };

  const handleChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const handleBlur = (field) => () => {
    setTouched({
      ...touched,
      [field]: true
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      destination: true,
      partyInfo: true,
      travelMonth: true,
      days: true
    });

    if (isFormValid()) {
      onSubmit({
        ...formData,
        days: parseInt(formData.days)
      });
    }
  };

  return (
    <div className="input-form-container">
      <form onSubmit={handleSubmit} className="input-form">
        <div className="form-field">
          <label htmlFor="destination">Destination</label>
          <input
            id="destination"
            type="text"
            value={formData.destination}
            onChange={handleChange('destination')}
            onBlur={handleBlur('destination')}
            placeholder="e.g., Paris, France"
            disabled={isLoading}
            className={errors.destination ? 'error' : ''}
          />
          {errors.destination && (
            <div className="error-message">{errors.destination}</div>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="partyInfo">Party Info</label>
          <textarea
            id="partyInfo"
            value={formData.partyInfo}
            onChange={handleChange('partyInfo')}
            onBlur={handleBlur('partyInfo')}
            placeholder="e.g., late 20s Gen Z couple"
            rows={3}
            disabled={isLoading}
            className={errors.partyInfo ? 'error' : ''}
          />
          {errors.partyInfo && (
            <div className="error-message">{errors.partyInfo}</div>
          )}
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="travelMonth">Travel Month</label>
            <select
              id="travelMonth"
              value={formData.travelMonth}
              onChange={handleChange('travelMonth')}
              onBlur={handleBlur('travelMonth')}
              disabled={isLoading}
              className={errors.travelMonth ? 'error' : ''}
            >
              <option value="">Select month...</option>
              {MONTHS.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            {errors.travelMonth && (
              <div className="error-message">{errors.travelMonth}</div>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="days">Days</label>
            <input
              id="days"
              type="number"
              min="1"
              max="7"
              step="1"
              value={formData.days}
              onChange={handleChange('days')}
              onBlur={handleBlur('days')}
              placeholder="1-7"
              disabled={isLoading}
              className={errors.days ? 'error' : ''}
            />
            {errors.days && (
              <div className="error-message">{errors.days}</div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="generate-button"
          disabled={!isFormValid() || isLoading}
        >
          Generate Itinerary
        </button>
      </form>
    </div>
  );
}
