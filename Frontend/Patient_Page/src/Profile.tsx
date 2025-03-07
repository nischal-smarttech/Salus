import React, { useState } from 'react';
import { Copy, ChevronLeft, Calendar, Edit, Check, X } from 'lucide-react';

function Profile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    age: 32,
    gender: 'Male',
    insuranceNumber: 'INS123456789',
    nextAppointment: '2024-03-15',
    profilePic: 'https://i.postimg.cc/1zS7H1n7/download.png',
    bloodType: 'O+',
    primaryDoctor: 'Dr. Sarah Johnson',
    lastVisit: '2024-01-10'
  });

  const [doctor] = useState({
    name: 'Dr. Sarah Johnson',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    specialty: 'Oncologist'
  });

  const [healthRecords] = useState([
    'Tumor Marker Test - Jan 2024',
    'Chemotherapy Report - Dec 2023',
    'PET Scan Results - Nov 2023',
    'Biopsy Report - Oct 2023'
  ]);

  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isCustomizingRequest, setIsCustomizingRequest] = useState(false);
  const [shareDuration, setShareDuration] = useState(7); // Duration in days
  const [isAccessGranted, setIsAccessGranted] = useState(false); // Track access status
  const [remainingDays, setRemainingDays] = useState<number | null>(null); // Track remaining days

  const genders = ['Male', 'Female', 'Non-binary', 'Other'];
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleCopyInsurance = () => {
    navigator.clipboard.writeText(user.insuranceNumber);
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  const handleCustomizeRequest = () => {
    setIsCustomizingRequest(true);
  };

  const handleSaveRequest = () => {
    setIsCustomizingRequest(false);
  };

  const handleCancelRequest = () => {
    setIsCustomizingRequest(false);
    setSelectedFiles([]);
    setShareDuration(7);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: e.target.value
    }));
  };

  const handleFileSelection = (file: string) => {
    if (selectedFiles.includes(file)) {
      setSelectedFiles(selectedFiles.filter(f => f !== file));
    } else {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  const handleAccept = () => {
    if (selectedFiles.length > 0) {
      setIsAccessGranted(true);
      setRemainingDays(shareDuration); // Set remaining days to the selected share duration
      setIsCustomizingRequest(false); // Exit customize mode
    }
  };

  const handleDeny = () => {
    setIsAccessGranted(false);
    setRemainingDays(null); // Reset remaining days
  };

  return (
    <div className="min-h-screen bg-[#fffcfc] p-4">
      {/* Top Bar */}
      <div className="bg-[#f7f7f7] rounded-xl p-3 mb-5 flex items-center justify-center relative shadow-md">
        <button 
          className="absolute left-3"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="w-7 h-7 text-gray-700" />
        </button>
        <span className="text-lg font-bold">My Profile</span>
        {isEditingProfile ? (
          <>
            <button
              className="absolute right-14 p-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors shadow-sm"
              onClick={handleSaveProfile}
            >
              <Check className="w-5 h-5 text-white" />
            </button>
            <button
              className="absolute right-3 p-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors shadow-sm"
              onClick={handleCancelEdit}
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </>
        ) : (
          <button
            className="absolute right-3 p-2 bg-[#fff8f8] rounded-lg hover:bg-[#fffcfc] transition-colors shadow-sm"
            onClick={handleEditProfile}
          >
            <Edit className="w-5 h-5 text-gray-700" />
          </button>
        )}
      </div>

      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <img
          src={user.profilePic}
          alt="Profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-[#fff8f8] shadow-lg mb-4"
        />
        {isEditingProfile ? (
          <input 
            type="text" 
            value={user.name} 
            onChange={(e) => handleChange(e, 'name')}
            className="text-2xl font-bold text-gray-800 bg-[#fff8f8] p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
        ) : (
          <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
        )}
        <p className="text-sm text-gray-500">Patient ID: {user.insuranceNumber}</p>
      </div>

      {/* User Info */}
      <div className="space-y-6">
        {/* Personal Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">About Me</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-1/3 text-sm text-gray-500">Age</div>
              {isEditingProfile ? (
                <input 
                  type="number" 
                  value={user.age} 
                  onChange={(e) => handleChange(e, 'age')}
                  className="w-16 bg-[#fff8f8] p-1 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              ) : (
                <div className="text-gray-700">{user.age}</div>
              )}
            </div>
            <div className="flex items-center">
              <div className="w-1/3 text-sm text-gray-500">Gender</div>
              {isEditingProfile ? (
                <select 
                  value={user.gender} 
                  onChange={(e) => handleChange(e, 'gender')}
                  className="w-32 bg-[#fff8f8] p-1 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
                >
                  {genders.map((gender, index) => (
                    <option key={index} value={gender}>{gender}</option>
                  ))}
                </select>
              ) : (
                <div className="text-gray-700">{user.gender}</div>
              )}
            </div>
            <div className="flex items-center">
              <div className="w-1/3 text-sm text-gray-500">Blood Type</div>
              {isEditingProfile ? (
                <select 
                  value={user.bloodType} 
                  onChange={(e) => handleChange(e, 'bloodType')}
                  className="w-16 bg-[#fff8f8] p-1 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
                >
                  {bloodTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              ) : (
                <div className="text-gray-700">{user.bloodType}</div>
              )}
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Medical Details</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-1/3 text-sm text-gray-500">Primary Doctor</div>
              {isEditingProfile ? (
                <input 
                  type="text" 
                  value={user.primaryDoctor} 
                  onChange={(e) => handleChange(e, 'primaryDoctor')}
                  className="w-48 bg-[#fff8f8] p-1 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              ) : (
                <div className="text-gray-700">{user.primaryDoctor}</div>
              )}
            </div>
            <div className="flex items-center">
              <div className="w-1/3 text-sm text-gray-500">Last Visit</div>
              <div className="text-gray-700">{user.lastVisit}</div>
            </div>
            <div className="flex items-center">
              <div className="w-1/3 text-sm text-gray-500">Next Appointment</div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">{user.nextAppointment}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Data Requests Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Data Requests</h2>
          <div className="p-4 bg-[#fff8f8] rounded-lg mb-4 relative">
            {isAccessGranted && (
              <div className="absolute top-2 left-2 bg-green-500 rounded-full p-1">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white"
              />
              <div>
                <h3 className="font-medium text-gray-800">{doctor.name}</h3>
                <p className="text-sm text-gray-500">{doctor.specialty}</p>
                {isAccessGranted ? (
                  <p className="text-sm text-gray-600">Access granted - {remainingDays} days remaining</p>
                ) : (
                  <p className="text-sm text-gray-600">Requesting access to medical records</p>
                )}
              </div>
            </div>

            {/* Health Records (Shown only when not granted) */}
            {!isAccessGranted && (
              <>
                <div className="space-y-2 mb-4">
                  {healthRecords.map((record, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-white rounded-lg">
                      {isCustomizingRequest && (
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(record)}
                          onChange={() => handleFileSelection(record)}
                          className="w-4 h-4"
                        />
                      )}
                      <p className="text-gray-700 flex-1">{record}</p>
                    </div>
                  ))}
                </div>

                {/* Share Duration Slider */}
                {isCustomizingRequest && (
                  <div className="mb-4">
                    <label className="text-sm text-gray-600 block mb-2">
                      Share Duration: {shareDuration} days
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={shareDuration}
                      onChange={(e) => setShareDuration(Number(e.target.value))}
                      className="w-full accent-teal-500"
                    />
                  </div>
                )}
              </>
            )}

            {/* Customize Buttons (Shown only when not granted) */}
            {!isAccessGranted && isCustomizingRequest ? (
              <div className="flex gap-2">
                <button
                  className="flex-1 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  onClick={handleSaveRequest}
                >
                  Save
                </button>
                <button
                  className="flex-1 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  onClick={handleCancelRequest}
                >
                  Cancel
                </button>
              </div>
            ) : !isAccessGranted ? (
              <button
                className="absolute top-4 right-4 p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                onClick={handleCustomizeRequest}
              >
                Customize
              </button>
            ) : null}
          </div>

          {/* Action Buttons (Shown only when access is not granted) */}
          {!isAccessGranted && (
            <div className="flex gap-2">
              <button
                className="flex-1 p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300"
                onClick={handleDeny}
              >
                Deny
              </button>
              <button
                className={`flex-1 p-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300 ${
                  selectedFiles.length > 0 && !isAccessGranted ? 'animate-pulse' : ''
                }`}
                onClick={handleAccept}
              >
                Accept
              </button>
            </div>
          )}
        </div>

        {/* Insurance Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Insurance Details</h2>
          <div className="flex items-center justify-between p-4 bg-[#fff8f8] rounded-lg">
            <div>
              <div className="text-sm text-gray-500">Insurance Number</div>
              <div className="text-gray-700">{user.insuranceNumber}</div>
            </div>
            <button 
              onClick={handleCopyInsurance}
              className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
            >
              <Copy className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;