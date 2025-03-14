import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Search, Video, Stethoscope } from 'lucide-react';

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
    specialty: 'Oncologist',
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
  },
  {
    id: 6,
    name: 'Dr. Ethan Smith',
    image: 'https://randomuser.me/api/portraits/men/30.jpg',
    specialty: 'Oncologist',
    rating: 3.7,
    hospital: 'Cleveland Clinic',
    fees: '$85'
  },
  {
    id: 7,
    name: 'Dr. Isabella Jones',
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
    specialty: 'Oncologist',
    rating: 4.5,
    hospital: 'Mayo Clinic',
    fees: '$95'
  },
  {
    id: 8,
    name: 'Dr. Liam Brown',
    image: 'https://randomuser.me/api/portraits/men/64.jpg',
    specialty: 'Oncologist',
    rating: 3.9,
    hospital: 'Johns Hopkins Hospital',
    fees: '$80'
  },
  {
    id: 9,
    name: 'Dr. Olivia Martinez',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    specialty: 'Oncologist',
    rating: 3.8,
    hospital: "Phoenix Children's Hospital",
    fees: '$90'
  },
  {
    id: 10,
    name: 'Dr. Ava Garcia',
    image: 'https://randomuser.me/api/portraits/women/21.jpg',
    specialty: 'Oncologist',
    rating: 4.0,
    hospital: 'Massachusetts General Hospital',
    fees: '$110'
  },
  {
    id: 11,
    name: 'Dr. Emily Wilson',
    image: 'https://randomuser.me/api/portraits/women/55.jpg',
    specialty: 'Oncologist',
    rating: 4.3,
    hospital: 'Stanford Health Care',
    fees: '$105'
  },            
  {
    id: 12,
    name: 'Dr. Olivia Martinez',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    specialty: 'Oncologist',
    rating: 3.8,
    hospital: "Phoenix Children's Hospital",
    fees: '$90'
  },
  {
    id: 13,
    name: 'Dr. Sophia Patel',
    image: 'https://randomuser.me/api/portraits/women/85.jpg',
    specialty: 'Oncologist',
    rating: 4.2,
    hospital: 'Mount Sinai Hospital',
    fees: '$100'
  }
];

// Define unique time slots per doctor and day (using day index modulo 7 for variety)
const getDoctorTimeSlots = (doctorId: number, consultationType: 'virtual' | 'in-person', dayIndex: number) => {
  const allSlots = {
    virtual: [
      ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM'],
      ['10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM', '5:00 PM'],
      ['9:30 AM', '11:00 AM', '1:30 PM', '3:00 PM', '4:30 PM'],
      ['8:00 AM', '9:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'],
      ['10:00 AM', '12:00 PM', '1:00 PM', '3:00 PM', '5:00 PM'],
      ['9:00 AM', '10:30 AM', '2:30 PM', '4:00 PM'],
      ['8:30 AM', '11:00 AM', '1:00 PM', '3:30 PM'],
    ],
    'in-person': [
      ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'],
      ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
      ['8:30 AM', '10:30 AM', '12:30 PM', '2:30 PM'],
      ['9:30 AM', '11:30 AM', '1:30 PM', '3:30 PM', '4:30 PM'],
      ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'],
      ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM'],
      ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM'],
    ]
  };

  // Use doctorId to shift the starting index, and dayIndex % 7 to cycle through the week
  const typeSlots = allSlots[consultationType];
  const slotIndex = (doctorId + (dayIndex % 7)) % typeSlots.length;
  return typeSlots[slotIndex] || [];
};

const DoctorConsultation = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState<'virtual' | 'in-person' | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  // Generate next 28 days (7 columns x 4 rows)
  const days = Array.from({ length: 28 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const specialties = ['all', ...new Set(doctors.map(doctor => doctor.specialty))];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTime && consultationType) {
      alert(`Appointment booked with ${selectedDoctor.name} on ${selectedDate.toDateString()} at ${selectedTime} (${consultationType === 'virtual' ? 'Virtual Meeting' : 'Hospital Visit'})`);
      setSelectedDoctor(null);
      setConsultationType(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setAvailableSlots([]);
    } else {
      alert('Please select date, time, and consultation type');
    }
  };

  const handleConsultationTypeChange = (type: 'virtual' | 'in-person') => {
    setConsultationType(type);
    setSelectedDate(null);
    setSelectedTime(null);
    setAvailableSlots([]);
  };

  const handleDateClick = (date: Date, index: number) => {
    setSelectedDate(date);
    if (selectedDoctor && consultationType) {
      const slots = getDoctorTimeSlots(selectedDoctor.id, consultationType, index);
      setAvailableSlots(slots);
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
          <div className="bg-[#fff8f8] rounded-2xl p-6 w-full max-w-4xl transition-opacity duration-300">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Book Appointment with {selectedDoctor.name}</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <button
                  onClick={() => handleConsultationTypeChange('virtual')}
                  className={`flex-1 px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    consultationType === 'virtual' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-[#fffcfc] text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  <Video className="w-5 h-5" />
                  <span>Virtual Meeting</span>
                </button>
                <button
                  onClick={() => handleConsultationTypeChange('in-person')}
                  className={`flex-1 px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                    consultationType === 'in-person' 
                      ? 'bg-green-600 text-white' 
                      : 'bg-[#fffcfc] text-green-600 hover:bg-green-100'
                  }`}
                >
                  <Stethoscope className="w-5 h-5" />
                  <span>Hospital Visit</span>
                </button>
              </div>

              {consultationType && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Select Date</label>
                  {/* Day Headers - Full Week */}
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {dayNames.map((dayName) => (
                      <div key={dayName} className="text-center font-semibold text-gray-700">
                        {dayName}
                      </div>
                    ))}
                  </div>
                  {/* Date Blocks - 7x4 Grid */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {days.map((day, index) => (
                      <div
                        key={day.toDateString()}
                        className={`p-2 border rounded-lg cursor-pointer text-center transition-all ${
                          selectedDate && selectedDate.toDateString() === day.toDateString()
                            ? 'bg-blue-200 border-blue-500'
                            : 'bg-white border-gray-300 hover:bg-gray-100'
                        }`}
                        onClick={() => handleDateClick(day, index)}
                      >
                        <p className="text-sm font-medium whitespace-pre">
                          {day.toLocaleDateString('en-US', { day: 'numeric' }) + '\n' + 
                           day.toLocaleDateString('en-US', { month: 'short' })}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Available Slots Section */}
                  {selectedDate && (
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700">
                        Available Slots for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </label>
                      {availableSlots.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                          {availableSlots.map((slot) => (
                            <button
                              key={slot}
                              onClick={() => setSelectedTime(slot)}
                              className={`px-4 py-2 rounded-lg transition-colors ${
                                selectedTime === slot
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-[#fffcfc] text-blue-600 hover:bg-[#fff8f8]'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">No slots available</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => {
                    setSelectedDoctor(null);
                    setConsultationType(null);
                    setSelectedDate(null);
                    setSelectedTime(null);
                    setAvailableSlots([]);
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