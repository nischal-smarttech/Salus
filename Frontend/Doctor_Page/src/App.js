import React, { useState } from 'react';
import { FaHome, FaUserMd, FaUsers, FaUserCircle } from 'react-icons/fa';
import { MdNewReleases } from 'react-icons/md';
import './App.css';
import PatientList from './PatientList';
import AssistantView from './AssistantView';

const patientsData = [
  {
    id: 1,
    name: 'John Doe',
    time: '10:00 AM',
    isNew: true,
    lastNotes: 'Follow up on medication adjustment',
    problems: '',
    age: 45,
    gender: 'Male',
    lastVisit: '2023-07-15',
    symptoms: 'None reported',
    duration: 'N/A',
    medications: 'Amlodipine 5mg',
    history: 'Hypertension diagnosed 2019'
  },
  {
    id: 2,
    name: 'Jane Smith',
    time: '11:00 AM',
    isNew: false,
    lastNotes: 'New patient presenting with chronic fatigue and sleep disturbances. Reports difficulty falling asleep and waking up frequently. Initial assessment suggests possible sleep apnea. Ordered sleep study for confirmation.',
    problems: 'Chronic Fatigue, Sleep Disturbances',
    age: 32,
    gender: 'Female',
    lastVisit: 'First Visit',
    symptoms: 'Fatigue, Insomnia, Daytime Sleepiness',
    duration: '6 months',
    medications: 'None prescribed yet',
    history: 'Reports occasional snoring'
  },
  {
    id: 3,
    name: 'Michael Johnson',
    time: '1:30 PM',
    isNew: false,
    lastNotes: 'Monitor blood pressure regularly',
    problems: '',
    age: 58,
    gender: 'Male',
    lastVisit: '2023-06-20',
    symptoms: 'Mild headaches',
    duration: '3 months',
    medications: 'Lisinopril 10mg',
    history: 'Hypertension since 2015'
  }
];

function AppointmentItem({ patient, isOpen, onClick }) {
  return (
    <div className={`appointment-item ${isOpen ? 'open' : ''}`} onClick={onClick}>
      <div className="appointment-summary">
        <div className="patient-info">
          <span className="patient-name">
            {patient.name}
            {patient.isNew && <MdNewReleases className="new-patient-icon" />}
          </span>
          <span className="patient-details">
            {patient.age} | {patient.gender} | Last Visit: {patient.lastVisit}
          </span>
        </div>
        <span className="appointment-time">{patient.time}</span>
      </div>
      {isOpen && (
        <div className="appointment-details">
          <h4>{patient.isNew ? 'New Patient Summary' : 'Patient Details'}</h4>
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Symptoms:</span>
              <span>{patient.symptoms || 'None reported'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Duration:</span>
              <span>{patient.duration || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Problems:</span>
              <span>{patient.problems || 'None noted'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Medications:</span>
              <span>{patient.medications || 'None prescribed'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">History:</span>
              <span>{patient.history || 'No significant history'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Last Notes:</span>
              <span>{patient.lastNotes || 'No notes available'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Footer({ onPatientsClick, onAssistantClick }) {
  return (
    <footer className="app-footer">
      <nav>
        <div className="footer-item" onClick={() => window.location.reload()}>
          <FaHome className="footer-icon" />
          <span>Home</span>
        </div>
        <div className="footer-item" onClick={onAssistantClick}>
          <FaUserMd className="footer-icon" />
          <span>AI Bot</span>
        </div>
        <div className="footer-item" onClick={onPatientsClick}>
          <FaUsers className="footer-icon" />
          <span>Patients</span>
        </div>
        <div className="footer-item" onClick={() => alert('Profile functionality coming soon')}>
          <FaUserCircle className="footer-icon" />
          <span>Profile</span>
        </div>
      </nav>
    </footer>
  );
}

function App() {
  const [openAppointment, setOpenAppointment] = useState(null);
  const [showPatientList, setShowPatientList] = useState(false);
  const [showAssistantView, setShowAssistantView] = useState(false);

  const handleAppointmentClick = (id) => {
    setOpenAppointment(openAppointment === id ? null : id);
  };

  const handlePatientsClick = () => {
    setShowPatientList(true);
    setShowAssistantView(false);
  };

  const handleAssistantClick = () => {
    setShowAssistantView(true);
    setShowPatientList(false);
  };

  const handleClosePatientList = () => {
    setShowPatientList(false);
  };

  const handleCloseAssistantView = () => {
    setShowAssistantView(false);
  };

  return (
    <div className="app-container">
      {showPatientList ? (
        <PatientList onClose={handleClosePatientList} />
      ) : showAssistantView ? (
        <AssistantView onClose={handleCloseAssistantView} />
      ) : (
        <>
          <h1>Appointments</h1>
          <div className="appointments-list">
            {patientsData.map(patient => (
              <AppointmentItem
                key={patient.id}
                patient={patient}
                isOpen={openAppointment === patient.id}
                onClick={() => handleAppointmentClick(patient.id)}
              />
            ))}
          </div>
        </>
      )}
      <Footer 
        onPatientsClick={handlePatientsClick}
        onAssistantClick={handleAssistantClick}
      />
    </div>
  );
}

export default App;