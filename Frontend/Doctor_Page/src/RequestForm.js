import React, { useState } from 'react';
import './RequestForm.css';

const testOptions = [
  { id: 1, name: 'Complete Blood Count (CBC)' },
  { id: 2, name: 'Tumor Marker Test' },
  { id: 3, name: 'PET Scan Resultst' },
  { id: 4, name: 'Chemotherapy Report ' },
  { id: 5, name: 'Hemoglobin A1C' },
  { id: 6, name: 'Kidney Function Test' },
  { id: 7, name: 'Electrolyte Panel' },
  { id: 8, name: 'Chest X-Ray' },
  { id: 9, name: 'ECG' },
  { id: 10, name: 'Biopsy Report' }
];

function RequestForm({ patient, onClose }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTests, setSelectedTests] = useState([]);

  const handleCheckboxChange = (testId) => {
    setSelectedTests((prev) =>
      prev.includes(testId) ? prev.filter(id => id !== testId) : [...prev, testId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Silently handle form submission (e.g., send to backend in a real app)
    // For now, it just closes the form
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="request-form">
        <h2>Request Records for {patient.name}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            From:
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </label>
          <label>
            To:
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </label>
          <h3>Select Tests:</h3>
          <div className="test-options">
            {testOptions.map(test => (
              <label key={test.id}>
                <input
                  type="checkbox"
                  checked={selectedTests.includes(test.id)}
                  onChange={() => handleCheckboxChange(test.id)}
                />
                {test.name}
              </label>
            ))}
          </div>
          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestForm;