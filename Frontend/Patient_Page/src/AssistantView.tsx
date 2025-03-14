import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import './AssistantView.css';

// Mock patient data (assuming a larger list from PatientList.js)
const patientsData = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Michael Johnson' },
  { id: 4, name: 'Emily Davis' },
  { id: 5, name: 'Robert Brown' },
  { id: 6, name: 'Sarah Wilson' },
  { id: 7, name: 'David Lee' },
  { id: 8, name: 'Lisa Chen' },
  { id: 9, name: 'Thomas Patel' },
  { id: 10, name: 'Aisha Khan' },
];

const reportOptions = [
  { id: 1, name: 'CT Scan Report' },
  { id: 2, name: 'X-Ray Report' },
  { id: 3, name: 'MRI Report' },
  { id: 4, name: 'Blood Test Report' },
  { id: 5, name: 'Ultrasound Report' },
];

function AssistantView({ onClose }) {
  const [selectedReports, setSelectedReports] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [useCurrentPatient, setUseCurrentPatient] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleCheckboxChange = (reportId) => {
    setSelectedReports((prev) =>
      prev.includes(reportId) ? prev.filter(id => id !== reportId) : [...prev, reportId]
    );
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((!useCurrentPatient && !selectedPatient) || !file) return; // Validation
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowResult(true);
    }, 2000); // Simulate processing delay
  };

  const resetForm = () => {
    setSelectedReports([]);
    setFile(null);
    setSelectedPatient('');
    setSearchTerm('');
    setUseCurrentPatient(false);
    setShowResult(false);
  };

  const filteredPatients = patientsData.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isSubmitting) {
    return (
      <div className="assistant-view loading">
        <div className="spinner"></div>
        <p>Analyzing records...</p>
      </div>
    );
  }

  if (showResult) {
    const patient = useCurrentPatient
      ? { id: 0, name: 'Today\'s Patient' } // Mock current patient
      : patientsData.find(p => p.id === parseInt(selectedPatient));
    return (
      <div className="assistant-view result">
        <button className="back-btn" onClick={resetForm}>
          <FaArrowLeft />
        </button>
        <h2>Analysis Result for {patient.name}</h2>
        <div className="diagnosis">
          <h3>Potential Alzheimer’s Risk</h3>
          <p>
            Based on the uploaded {file.name} and selected reports, our AI analysis suggests a potential risk of Alzheimer’s disease. This condition is characterized by memory loss, cognitive decline, and behavioral changes. The analysis indicates irregularities in {reportOptions.find(r => r.id === selectedReports[0])?.name || 'report data'}, which may correlate with early markers such as amyloid plaque buildup or tau protein levels. Immediate consultation with a neurologist is recommended for further evaluation, including cognitive testing (e.g., MMSE) and imaging (e.g., PET scan).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="assistant-view">
      <button className="back-btn" onClick={onClose}>
        <FaArrowLeft />
      </button>
      <h2>AI Assistant</h2>
      <form onSubmit={handleSubmit}>
        <div className="patient-search">
          <label>
            Select Patient:
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={useCurrentPatient}
            />
            {!useCurrentPatient && (
              <select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                required={!useCurrentPatient}
              >
                <option value="">Choose a patient</option>
                {filteredPatients.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.name}</option>
                ))}
              </select>
            )}
          </label>
          <label className="current-patient-checkbox">
            <input
              type="checkbox"
              checked={useCurrentPatient}
              onChange={(e) => setUseCurrentPatient(e.target.checked)}
            />
            Current Appointment Patient
          </label>
        </div>
        <h3>Reports Needed:</h3>
        <div className="report-options">
          {reportOptions.map(report => (
            <label key={report.id}>
              <input
                type="checkbox"
                checked={selectedReports.includes(report.id)}
                onChange={() => handleCheckboxChange(report.id)}
              />
              {report.name}
            </label>
          ))}
        </div>
        <h3>Upload File:</h3>
        <div className="file-upload">
          <input type="file" onChange={handleFileChange} required id="file-input" />
          <label htmlFor="file-input">
            {file ? file.name : 'Drag or click to upload'}
          </label>
        </div>
        <div className="button-group">
          <button type="submit">Analyze</button>
        </div>
      </form>
    </div>
  );
}

export default AssistantView;