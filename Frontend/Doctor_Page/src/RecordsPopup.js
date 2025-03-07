import React from 'react';
import './RecordsPopup.css';

function RecordsPopup({ patient, onClose }) {
  const renderTrendIndicator = (trend) => {
    const color = trend === 'Stable' ? '#2ecc71' : trend === 'Slightly Elevated' ? '#e67e22' : '#7f8c8d';
    return <span style={{ color, fontWeight: 500 }}>{trend}</span>;
  };

  return (
    <div className="modal-overlay">
      <div className="records-popup">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="patient-title">{patient.name}</div>
        <div className="summary">
          <p>{patient.healthSummary}</p>
        </div>
        <div className="insights">
          <h3>Health Insights</h3>
          <div className="insight-item">
            <span>Avg BP: {patient.trends.bpAvg} mmHg</span>
            <span>Trend: {renderTrendIndicator(patient.trends.bpTrend)}</span>
          </div>
          <div className="insight-item">
            <span>Avg HR: {patient.trends.hrAvg} bpm</span>
            <span>Trend: {renderTrendIndicator(patient.trends.hrTrend)}</span>
          </div>
        </div>
        <div className="files">
          <h3>Available Reports</h3>
          <ul>
            {patient.files.map((file, index) => (
              <li key={index}>
                <a href="#" onClick={(e) => e.preventDefault()}>{file}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecordsPopup;