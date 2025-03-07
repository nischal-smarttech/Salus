import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './PatientList.css';
import RequestForm from './RequestForm';
import RecordsPopup from './RecordsPopup';

const patientsData = [
  { id: 1, name: 'John Doe', age: 45, gender: 'M', lastVisit: '2023-07-15', healthSummary: 'Stable BP at 120/80 mmHg, HR 72 bpm. Mild fatigue reported last visit.', trends: { bpAvg: 120, hrAvg: 72, bpTrend: 'Stable', hrTrend: 'Normal' }, files: ['CBC_2023-07-15.pdf', 'Lipid_Panel_2023-07-10.pdf', 'ECG_2023-07-15.pdf'] },
  { id: 2, name: 'Jane Smith', age: 32, gender: 'F', lastVisit: 'First Visit', healthSummary: 'Headaches and fatigue reported. Initial BP 130/85 mmHg, HR 78 bpm.', trends: { bpAvg: 130, hrAvg: 78, bpTrend: 'N/A', hrTrend: 'N/A' }, files: ['Initial_Assessment_2023-08-01.pdf'] },
  { id: 3, name: 'Michael Johnson', age: 58, gender: 'M', lastVisit: '2023-06-20', healthSummary: 'Hypertension managed with Lisinopril. BP 140/90 mmHg, HR 65 bpm.', trends: { bpAvg: 139, hrAvg: 65, bpTrend: 'Slightly Elevated', hrTrend: 'Stable' }, files: ['BP_Log_2023-06-20.pdf', 'Liver_Test_2023-06-15.pdf', 'Thyroid_2023-06-20.pdf'] },
  { id: 4, name: 'Emily Davis', age: 29, gender: 'F', lastVisit: '2023-08-10', healthSummary: 'Gestational diabetes, monitoring glucose levels. BP 115/75 mmHg, HR 80 bpm.', trends: { bpAvg: 115, hrAvg: 80, bpTrend: 'Stable', hrTrend: 'Normal' }, files: ['Glucose_Log_2023-08-10.pdf', 'Ultrasound_2023-08-05.pdf'] },
  { id: 5, name: 'Robert Brown', age: 63, gender: 'M', lastVisit: '2023-05-25', healthSummary: 'COPD, on inhalers. BP 135/85 mmHg, HR 70 bpm.', trends: { bpAvg: 134, hrAvg: 70, bpTrend: 'Stable', hrTrend: 'Normal' }, files: ['PFT_2023-05-25.pdf', 'Chest_Xray_2023-05-20.pdf'] },
  { id: 6, name: 'Sarah Wilson', age: 37, gender: 'F', lastVisit: '2023-09-01', healthSummary: 'Anemia, low Hb. BP 110/70 mmHg, HR 82 bpm.', trends: { bpAvg: 110, hrAvg: 82, bpTrend: 'Low', hrTrend: 'Elevated' }, files: ['CBC_2023-09-01.pdf', 'Iron_Study_2023-08-28.pdf'] },
  { id: 7, name: 'David Lee', age: 51, gender: 'M', lastVisit: '2023-07-30', healthSummary: 'Hyperlipidemia, on statins. BP 128/82 mmHg, HR 68 bpm.', trends: { bpAvg: 128, hrAvg: 68, bpTrend: 'Stable', hrTrend: 'Normal' }, files: ['Lipid_Panel_2023-07-30.pdf', 'ECG_2023-07-25.pdf'] },
  { id: 8, name: 'Lisa Chen', age: 44, gender: 'F', lastVisit: '2023-06-15', healthSummary: 'Thyroid disorder, on levothyroxine. BP 122/78 mmHg, HR 75 bpm.', trends: { bpAvg: 122, hrAvg: 75, bpTrend: 'Stable', hrTrend: 'Normal' }, files: ['TSH_2023-06-15.pdf', 'CBC_2023-06-10.pdf'] },
  { id: 9, name: 'Thomas Patel', age: 55, gender: 'M', lastVisit: '2023-08-20', healthSummary: 'Type 2 Diabetes, on metformin. BP 138/88 mmHg, HR 73 bpm.', trends: { bpAvg: 137, hrAvg: 73, bpTrend: 'Slightly Elevated', hrTrend: 'Normal' }, files: ['A1C_2023-08-20.pdf', 'Glucose_Log_2023-08-15.pdf'] },
  { id: 10, name: 'Aisha Khan', age: 39, gender: 'F', lastVisit: '2023-07-05', healthSummary: 'Asthma, using albuterol. BP 118/76 mmHg, HR 79 bpm.', trends: { bpAvg: 118, hrAvg: 79, bpTrend: 'Stable', hrTrend: 'Normal' }, files: ['PFT_2023-07-05.pdf', 'Allergy_Test_2023-07-01.pdf'] }
];

function PatientList({ onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showRequestForm, setShowRequestForm] = useState(null);
  const [showRecordsPopup, setShowRecordsPopup] = useState(null);

  const filteredPatients = patientsData.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="patient-list">
      <h1>Patient Records</h1>
      <button className="close-btn" onClick={onClose}>
        <FaTimes />
      </button>
      <div className="search-bar">
        <input
          type="text"
          placeholder={`Search ${patientsData.length} patients...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul>
        {filteredPatients.map(patient => (
          <li key={patient.id}>
            <div className="patient-info">
              <span className="patient-name">{patient.name}</span>
              <span className="patient-details">{patient.age} • {patient.gender} • Last: {patient.lastVisit}</span>
            </div>
            <div className="patient-actions">
              <button onClick={() => setShowRequestForm(patient.id)}>Request</button>
              <button onClick={() => setShowRecordsPopup(patient.id)}>View</button>
            </div>
          </li>
        ))}
      </ul>
      {showRequestForm && (
        <RequestForm 
          patient={patientsData.find(p => p.id === showRequestForm)} 
          onClose={() => setShowRequestForm(null)} 
        />
      )}
      {showRecordsPopup && (
        <RecordsPopup 
          patient={patientsData.find(p => p.id === showRecordsPopup)} 
          onClose={() => setShowRecordsPopup(null)} 
        />
      )}
    </div>
  );
}

export default PatientList;