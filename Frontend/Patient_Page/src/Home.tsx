import React, { useState } from 'react';
import { Clock, Pill, Plus, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [medications, setMedications] = useState([
    { 
      name: 'Metformin', 
      time: '08:00', 
      dosage: '500mg',
      type: 'Tablet',
      frequency: 'Daily',
      taken: true
    },
    { 
      name: 'Lisinopril', 
      time: '12:00', 
      dosage: '10mg',
      type: 'Capsule',
      frequency: 'Daily',
      taken: false
    },
    { 
      name: 'Atorvastatin', 
      time: '20:00', 
      dosage: '20mg',
      type: 'Tablet',
      frequency: 'Daily',
      taken: false
    }
  ]);

  return (
    <div className="min-h-screen bg-[#fffcfc] p-4 pb-20 relative">

      {/* Watermark Background */}
      <div className="absolute inset-0 opacity-10 bg-[url('/medical-pattern.png')] bg-repeat" style={{ zIndex: 0 }}></div>

      {/* Header */}
      <div className="bg-[#f7f7f7] rounded-xl p-3 mb-5 flex items-center justify-center relative shadow-md" style={{ zIndex: 1 }}>
        <h1 className="text-lg font-bold">Home</h1>
      </div>

      {/* Diagnose Button */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6 relative" style={{ zIndex: 1 }}>
        <button 
          className="w-full p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex flex-col items-center gap-2"
          onClick={() => navigate('/upload')}
        >
          <img 
            src="https://i.postimg.cc/rm9Fzk1b/Screenshot-2025-02-08-165019.png" 
            alt="Diagnose" 
            className="w-18 h-16 rounded-xl"
          />
          <span className="text-xl font-bold">Start a Diagnose</span> 
          <span className="text-sm text-green-100">Upload and view medical files</span>
        </button>
      </div>

      {/* Enhanced Medication Scheduler */}
      <div className="bg-[#fff8f8] p-6 rounded-lg shadow-sm mb-6 relative" style={{ zIndex: 1 }}>
        <h2 className="text-xl font-semibold mb-4">Medication Schedule</h2>
        <div className="space-y-3">
          {medications.map((med, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg flex items-center gap-4 transition-all ${
                med.taken ? 'bg-green-50' : 'bg-[#fffcfc] hover:bg-[#fff8f8]'
              }`}
            >
              <div className={`p-3 rounded-full ${
                med.taken ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                <Pill className={`w-6 h-6 ${
                  med.taken ? 'text-green-600' : 'text-blue-600'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{med.name}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{med.dosage} ({med.type})</p>
                  <p>Frequency: {med.frequency}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="font-medium">{med.time}</span>
              </div>
              {med.taken && (
                <CheckCircle className="w-6 h-6 text-green-600" />
              )}
            </div>
          ))}
        </div>
        
        <button 
          className="mt-4 w-full p-3 bg-[#fff8f8] text-blue-600 rounded-lg hover:bg-[#fffcfc] transition-colors flex items-center justify-center gap-2"
          onClick={() => {
            // Add medication logic here
          }}
        >
          <Plus className="w-5 h-5" />
          <span>Add Medication</span>
        </button>
      </div>

      {/* Other Home Page Content */}
      <div className="bg-white p-6 rounded-lg shadow-sm relative mb-6" style={{ zIndex: 1 }}>
        <h2 className="text-xl font-semibold mb-4">Health Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div 
            className="p-4 bg-[#fff8f8] rounded-lg hover:bg-[#fffcfc] cursor-pointer"
            onClick={() => navigate('/past-results')}
          >
            <h3 className="font-medium">Recent Results</h3>
            <p className="text-sm text-gray-500">View your latest health metrics</p>
          </div>
          <div 
            className="p-4 bg-[#fff8f8] rounded-lg hover:bg-[#fffcfc] cursor-pointer"
            onClick={() => navigate('/appointments')}
          >
            <h3 className="font-medium">Upcoming Appointments</h3>
            <p className="text-sm text-gray-500">Check your scheduled visits</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;