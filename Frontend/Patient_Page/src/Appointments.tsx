import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Appointments() {
  const navigate = useNavigate();
  const [expandedAppointment, setExpandedAppointment] = useState<number | null>(null);

  const appointments = [
    {
      id: 1,
      date: '2024-03-15',
      time: '10:00 AM',
      doctor: 'Dr. Sarah Johnson',
      location: 'New York Medical Center',
      duration: '30 minutes',
      notes: 'Follow-up for blood pressure management',
      specialty: 'Cardiologist',
      phone: '+1 212-555-1234'
    },
    {
      id: 2,
      date: '2024-03-20',
      time: '02:30 PM',
      doctor: 'Dr. Michael Brown',
      location: 'City Health Clinic',
      duration: '45 minutes',
      notes: 'New treatment plan discussion',
      specialty: 'Neurologist',
      phone: '+1 212-555-5678'
    }
  ];

  return (
    <div className="min-h-screen p-4 bg-[#fffcfc]">
      {/* Header */}
      <div className="bg-[#f7f7f7] rounded-xl p-3 mb-5 flex items-center justify-center relative shadow-md">
        <h1 className="text-lg font-bold">Appointments</h1>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-pink-800">Upcoming Appointments</h2>
          <button 
            className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors flex items-center gap-2"
            onClick={() => navigate('/consult-doctor')}
          >
            <span>+ New Appointment</span>
          </button>
        </div>

        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div 
              key={appointment.id}
              className={`p-4 rounded-lg transition-all ${
                expandedAppointment === appointment.id 
                  ? 'bg-pink-50 border border-pink-200' 
                  : 'bg-gray-50'
              } hover:bg-pink-50 cursor-pointer`}
              onClick={() => setExpandedAppointment(
                expandedAppointment === appointment.id ? null : appointment.id
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-medium text-pink-800">{appointment.doctor}</p>
                    <p className="text-sm text-pink-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {appointment.date} at {appointment.time}
                    </p>
                  </div>
                </div>
                <button className="text-pink-600 hover:text-pink-800">
                  {expandedAppointment === appointment.id ? <ChevronUp /> : <ChevronDown />}
                </button>
              </div>

              {expandedAppointment === appointment.id && (
                <div className="mt-4 pl-14 space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2 text-sm text-pink-700">
                    <MapPin className="w-4 h-4" />
                    <span>{appointment.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-pink-700">
                    <Clock className="w-4 h-4" />
                    <span>Duration: {appointment.duration}</span>
                  </div>
                  <div className="text-sm text-pink-600">
                    <p className="font-medium">Specialty:</p>
                    <p>{appointment.specialty}</p>
                  </div>
                  <div className="text-sm text-pink-600">
                    <p className="font-medium">Notes:</p>
                    <p>{appointment.notes}</p>
                  </div>
                  <div className="text-sm text-pink-600">
                    <p className="font-medium">Contact:</p>
                    <p>{appointment.phone}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Appointments;
