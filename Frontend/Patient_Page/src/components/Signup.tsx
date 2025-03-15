import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('patient');
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    pronouns: '',
    age: '',
    gender: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Patient-specific fields
    addressLine1: '',
    addressLine2: '',
    pincode: '',
    insuranceNumber: '',
    insuranceProof: null,
    photoIdProof: null,
    patientPhoto: null,
    usePhotoIdForPatient: false,
    emergencyContactName: '',
    emergencyContactNumber: '',
    // Doctor-specific fields
    specialty: '',
    yearsOfExperience: '',
    hospitalName: '',
    hospitalIdCard: null,
    licenseNumber: '',
    licenseCard: null,
    doctorPhoto: null,
    useHospitalIdForDoctor: false,
    education: '',
    boardCertification: '',
    professionalAffiliations: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const file = (e.target as HTMLInputElement).files?.[0];
      setFormData({ ...formData, [name]: file || null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add signup logic here
    navigate('/home');
  };

  const toggleUserType = (type: 'patient' | 'doctor') => {
    setUserType(type);
    setFormData({
      firstName: '',
      middleName: '',
      lastName: '',
      pronouns: '',
      age: '',
      gender: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      addressLine1: '',
      addressLine2: '',
      pincode: '',
      insuranceNumber: '',
      insuranceProof: null,
      photoIdProof: null,
      patientPhoto: null,
      usePhotoIdForPatient: false,
      emergencyContactName: '',
      emergencyContactNumber: '',
      specialty: '',
      yearsOfExperience: '',
      hospitalName: '',
      hospitalIdCard: null,
      licenseNumber: '',
      licenseCard: null,
      doctorPhoto: null,
      useHospitalIdForDoctor: false,
      education: '',
      boardCertification: '',
      professionalAffiliations: '',
    });
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-500 ${
        userType === 'patient' ? 'bg-[#a1ede0]' : 'bg-[#d1c4e9]'
      }`}
    >
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-6">
          <img
            src="https://i.postimg.cc/05hqXXbB/Salas-removebg-preview.png"
            alt="Logo"
            className="w-40 transition-transform duration-300 hover:scale-110"
          />
        </div>

        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2 animate-fade-in">
          Create an Account
        </h1>
        <p className="text-center text-gray-700 mb-4 text-lg font-medium italic tracking-wide">
          Join us to simplify your health journey.
        </p>

        {/* Toggle Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => toggleUserType('patient')}
            className={`px-6 py-2 rounded-l-xl font-semibold transition-all duration-300 shadow-md ${
              userType === 'patient'
                ? 'bg-teal-600 text-white'
                : 'bg-white text-teal-600 hover:bg-teal-50'
            }`}
          >
            Patient
          </button>
          <button
            onClick={() => toggleUserType('doctor')}
            className={`px-6 py-2 rounded-r-xl font-semibold transition-all duration-300 shadow-md ${
              userType === 'doctor'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-indigo-600 hover:bg-indigo-50'
            }`}
          >
            Doctor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Common Fields */}
          <input
            type="text"
            name="firstName"
            placeholder="First Name *"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm hover:shadow-md transition-all duration-200"
            required
          />
          <input
            type="text"
            name="middleName"
            placeholder="Middle Name (Optional)"
            value={formData.middleName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm hover:shadow-md transition-all duration-200"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name *"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm hover:shadow-md transition-all duration-200"
            required
          />
          <input
            type="text"
            name="pronouns"
            placeholder="Pronouns (e.g., she/her, he/him, they/them)"
            value={formData.pronouns}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm hover:shadow-md transition-all duration-200"
          />
          <input
            type="number"
            name="age"
            placeholder="Age *"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm hover:shadow-md transition-all duration-200"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm hover:shadow-md transition-all duration-200"
            required
          >
            <option value="">Select Gender *</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-Binary</option>
            <option value="transgender">Transgender</option>
            <option value="genderqueer">Genderqueer</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer Not to Say</option>
          </select>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number (e.g., 123-456-7890) *"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm hover:shadow-md transition-all duration-200"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm hover:shadow-md transition-all duration-200"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password *"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm hover:shadow-md transition-all duration-200"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password *"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm hover:shadow-md transition-all duration-200"
            required
          />

          {/* Patient-Specific Fields */}
          {userType === 'patient' && (
            <>
              <input
                type="text"
                name="addressLine1"
                placeholder="Street Address *"
                value={formData.addressLine1}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm hover:shadow-md transition-all duration-200"
                required
              />
              <input
                type="text"
                name="addressLine2"
                placeholder="City, State, ZIP *"
                value={formData.addressLine2}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm hover:shadow-md transition-all duration-200"
                required
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode/ZIP Code *"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm hover:shadow-md transition-all duration-200"
                required
              />
              <input
                type="text"
                name="insuranceNumber"
                placeholder="Insurance Number"
                value={formData.insuranceNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm hover:shadow-md transition-all duration-200"
              />
              <label className="block">
                <span className="text-gray-700 font-medium mb-2 block">Insurance Proof (Optional)</span>
                <input
                  type="file"
                  name="insuranceProof"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-teal-50 border border-teal-300 text-teal-700 file:bg-teal-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer hover:file:bg-teal-700 transition-all duration-200"
                  accept="image/*"
                />
                <p className="text-sm text-gray-600 mt-1">Upload document in image format (e.g., JPG, PNG)</p>
              </label>
              <label className="block">
                <span className="text-gray-700 font-medium mb-2 block">Photo ID Proof *</span>
                <input
                  type="file"
                  name="photoIdProof"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-teal-50 border border-teal-300 text-teal-700 file:bg-teal-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer hover:file:bg-teal-700 transition-all duration-200"
                  accept="image/*"
                  required
                />
                <p className="text-sm text-gray-600 mt-1">Upload document in image format (e.g., JPG, PNG)</p>
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="usePhotoIdForPatient"
                  checked={formData.usePhotoIdForPatient}
                  onChange={handleCheckboxChange}
                  className="h-5 w-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label className="text-gray-700 font-medium">Use Photo ID for Patient Photo</label>
              </div>
              {!formData.usePhotoIdForPatient && (
                <label className="block">
                  <span className="text-gray-700 font-medium mb-2 block">Patient Photo *</span>
                  <input
                    type="file"
                    name="patientPhoto"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-teal-50 border border-teal-300 text-teal-700 file:bg-teal-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer hover:file:bg-teal-700 transition-all duration-200"
                    accept="image/*"
                    required
                  />
                  <p className="text-sm text-gray-600 mt-1">Upload document in image format (e.g., JPG, PNG)</p>
                </label>
              )}
              <input
                type="text"
                name="emergencyContactName"
                placeholder="Emergency Contact Name *"
                value={formData.emergencyContactName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm hover:shadow-md transition-all duration-200"
                required
              />
              <input
                type="tel"
                name="emergencyContactNumber"
                placeholder="Emergency Contact Number (e.g., 123-456-7890) *"
                value={formData.emergencyContactNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm hover:shadow-md transition-all duration-200"
                required
              />
            </>
          )}

          {/* Doctor-Specific Fields */}
          {userType === 'doctor' && (
            <>
              <input
                type="text"
                name="specialty"
                placeholder="Specialty *"
                value={formData.specialty}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm hover:shadow-md transition-all duration-200"
                required
              />
              <input
                type="number"
                name="yearsOfExperience"
                placeholder="Years of Experience *"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm hover:shadow-md transition-all duration-200"
                required
              />
              <input
                type="text"
                name="hospitalName"
                placeholder="Hospital Name *"
                value={formData.hospitalName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm hover:shadow-md transition-all duration-200"
                required
              />
              <label className="block">
                <span className="text-gray-700 font-medium mb-2 block">Hospital ID Card *</span>
                <input
                  type="file"
                  name="hospitalIdCard"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-indigo-50 border border-indigo-300 text-indigo-700 file:bg-indigo-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer hover:file:bg-indigo-700 transition-all duration-200"
                  accept="image/*"
                  required
                />
                <p className="text-sm text-gray-600 mt-1">Upload document in image format (e.g., JPG, PNG)</p>
              </label>
              <input
                type="text"
                name="licenseNumber"
                placeholder="Doctor's License Number *"
                value={formData.licenseNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm hover:shadow-md transition-all duration-200"
                required
              />
              <label className="block">
                <span className="text-gray-700 font-medium mb-2 block">Doctor's License Card *</span>
                <input
                  type="file"
                  name="licenseCard"
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-indigo-50 border border-indigo-300 text-indigo-700 file:bg-indigo-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer hover:file:bg-indigo-700 transition-all duration-200"
                  accept="image/*"
                  required
                />
                <p className="text-sm text-gray-600 mt-1">Upload document in image format (e.g., JPG, PNG)</p>
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="useHospitalIdForDoctor"
                  checked={formData.useHospitalIdForDoctor}
                  onChange={handleCheckboxChange}
                  className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label className="text-gray-700 font-medium">Use Hospital ID for Doctor Photo</label>
              </div>
              {!formData.useHospitalIdForDoctor && (
                <label className="block">
                  <span className="text-gray-700 font-medium mb-2 block">Doctor Photo *</span>
                  <input
                    type="file"
                    name="doctorPhoto"
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-indigo-50 border border-indigo-300 text-indigo-700 file:bg-indigo-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer hover:file:bg-indigo-700 transition-all duration-200"
                    accept="image/*"
                    required
                  />
                  <p className="text-sm text-gray-600 mt-1">Upload document in image format (e.g., JPG, PNG)</p>
                </label>
              )}
              <textarea
                name="education"
                placeholder="Education (e.g., University, Degree) *"
                value={formData.education}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm hover:shadow-md transition-all duration-200"
                rows={3}
                required
              />
              <input
                type="text"
                name="boardCertification"
                placeholder="Board Certification (e.g., ABIM)"
                value={formData.boardCertification}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm hover:shadow-md transition-all duration-200"
              />
              <textarea
                name="professionalAffiliations"
                placeholder="Professional Affiliations (e.g., AMA, AHA)"
                value={formData.professionalAffiliations}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm hover:shadow-md transition-all duration-200"
                rows={3}
              />
            </>
          )}

          <button
            type="submit"
            className={`w-full py-4 px-6 rounded-lg text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
              userType === 'patient' ? 'bg-teal-600 hover:bg-teal-700' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};