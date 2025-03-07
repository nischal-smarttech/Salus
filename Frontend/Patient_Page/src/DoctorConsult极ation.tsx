import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Search, Calendar, Clock, Video, Stethoscope } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  image: string;
  specialty: string;
  rating: number;
  hospital: string;
  fees: string;
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    specialty: 'Cardiologist',
    rating: 4.8,
    hospital: 'New York General Hospital',
    fees: '$150'
  },
  {
    id: 2,
    name: 'Dr. Michael Brown',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    specialty: 'Neurologist',
    rating: 4.7,
    hospital: 'Chicago Medical Center',
    fees: '$200'
  },
  {
    id: 3,
    name: 'Dr. Emily Davis',
    image: 'https://randomuser.me/api/portraits/women/25.jpg',
    specialty: 'Dermatologist',
    rating: 4.9,
    hospital: 'Los Angeles Skin Clinic',
    fees: '$180'
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    specialty: 'Orthopedic Surgeon',
    rating: 4.6,
    hospital: 'Houston Bone & Joint Center',
    fees: '$250'
  },
  {
    id: 5,
    name: 'Dr. Olivia Martinez',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    specialty: 'Pediatrician',
    rating: 4.8,
    hospital: "Phoenix Children's Hospital",
    fees: '$120'
  }
];

const DoctorConsultation = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState<'virtual' | 'in-person' | null>(null);

  // Get unique specialties for the filter dropdown
  const specialties = ['all', ...new Set(doctors.map(doctor => doctor.specialty))];

  // Filter doctors based on search query and selected specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTime && consultationType) {
      alert(`Appointment booked with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime} (${consultationType === 'virtual' ? 'Virtual Meeting' : 'Hospital Visit'})`);
      setSelectedDoctor(null);
      setConsultationType(null);
    } else {
      alert('Please select date, time, and consultation type');
    }
  };

  return (
    <div className="min-h-screen p-4 bg-[#fffcfc]">
      {/* Top Bar with Back Button */}
      <div className="bg-[#f7f7f7] rounded-2xl p-4 mb-6 flex items-center justify-center relative shadow-lg">
        <button 
          className="absolute left-4"
          onClick={() => navigate('/')}
        >
          <ChevronLeft className="w-8 h-8 text-gray-700" />
        </button>
        <span className="text-xl font-semibold text-gray-800">Book Consultation</span>
      </div>

      {/* Search Bar and Filter */}
      <div className="relative flex-1 mb-6">
        <input
          type="text"
          placeholder="Search doctors by name or specialty..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-24 py-3 bg-white rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg shadow-sm"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded-lg bg-gray-200 text-gray-700 focus:outline-none"
        >
          {specialties.map(specialty => (
            <option key={specialty} value={specialty}>
              {specialty === 'all' ? 'All' : specialty}
            </option>
          ))}
        </select>
      </div>

      {/* Doctors List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredDoctors.map(doctor => (
          <div key={doctor.id} className="p-4 bg-[#fff8f8] rounded-2xl shadow-lg transition-all duration-200 hover:shadow-xl">
            <div className="flex items-center space-x-4">
              <img 
                src={doctor.image} 
                alt={doctor.name} 
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{doctor.name}</h2>
                <p className="text-sm text-gray-500">{doctor.specialty}</p>
                <div className="flex items-center space-x-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{doctor.rating}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{doctor.hospital}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{doctor.fees}</p>
                <button
                  onClick={() => setSelectedDoctor(doctor)}
                  className="mt-2 px-4 py-2 bg-[#fff8f8] text-blue-600 rounded-lg hover:bg-[#fffcfc] transition-colors flex items-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-[#fff8f8] rounded-2xl p-6 w-full max-w-lg transition-opacity duration-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Book Appointment with {selectedDoctor.name}</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#fffcfc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#fffcfc] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setConsultationType('virtual')}
                  className={`flex-1 px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    consultationType === 'virtual' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-[#fffcfc] text-blue-600 hover:bg-[#fff8f8]'
                  }`}
                >
                  <Video className="w-5 h-5" />
                  <span>Virtual Meeting</span>
                </button>
                <button
                  onClick={() => setConsultationType('in-person')}
                  className={`flex-1 px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    consultationType === 'in-person' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-[#fffcfc] text-green-600 hover:bg-[#fff8f8]'
                  }`}
                >
                  <Stethoscope className="w-5 h-5" />
                  <span>Hospital Visit</span>
                </button>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    setSelectedDoctor(null);
                    setConsultationType(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookAppointment}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorConsultation;