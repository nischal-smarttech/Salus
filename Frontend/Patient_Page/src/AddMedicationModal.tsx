// components/AddMedicationModal.tsx
import React, { useState } from 'react';
import { Plus, X , Pill} from 'lucide-react';

interface Medication {
  name: string;
  frequency: string;
  dosage: string;
  type: string;
  times: string[]; // Array of times
  taken: boolean;
}

interface AddMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMedication: (medication: Medication) => void;
}

const AddMedicationModal: React.FC<AddMedicationModalProps> = ({ isOpen, onClose, onAddMedication }) => {
  const [formData, setFormData] = useState({
    name: '',
    frequency: 'Daily',
    dosage: '',
    type: 'Tablet',
    times: [''],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'frequency') {
      const timeCount = value === 'Daily' ? 1 : value === 'Twice Daily' ? 2 : value === 'Thrice Daily' ? 3 : 1;
      setFormData((prev) => ({
        ...prev,
        frequency: value,
        times: Array(timeCount).fill('').map((_, i) => prev.times[i] || ''),
      }));
    } else if (name.startsWith('time-')) {
      const index = parseInt(name.split('-')[1], 10);
      setFormData((prev) => ({
        ...prev,
        times: prev.times.map((t, i) => (i === index ? value : t)),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMedication: Medication = {
      name: formData.name,
      frequency: formData.frequency,
      dosage: formData.dosage,
      type: formData.type,
      times: formData.times,
      taken: false,
    };
    onAddMedication(newMedication);
    setFormData({ name: '', frequency: 'Daily', dosage: '', type: 'Tablet', times: [''] });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 w-full max-w-lg shadow-2xl transform transition-all duration-300 scale-100 hover:scale-105 relative border border-gray-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <Pill className="w-6 h-6 text-blue-600" />
          Add New Medication
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name of Medicine <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Ibuprofen"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition-all duration-200"
              required
            />
          </div>

          {/* Frequency */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Frequency <span className="text-red-500">*</span></label>
            <select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition-all duration-200"
              required
            >
              <option value="Daily">Daily</option>
              <option value="Twice Daily">Twice Daily</option>
              <option value="Thrice Daily">Thrice Daily</option>
              <option value="Every 8 Hours">Every 8 Hours</option>
              <option value="Weekly">Weekly</option>
              <option value="As Needed">As Needed</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity/Dosage <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="dosage"
              value={formData.dosage}
              onChange={handleChange}
              placeholder="e.g., 500mg"
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition-all duration-200"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Type <span className="text-red-500">*</span></label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition-all duration-200"
              required
            >
              <option value="Tablet">Tablet</option>
              <option value="Capsule">Capsule</option>
              <option value="Drink">Drink</option>
              <option value="Injection">Injection</option>
            </select>
          </div>

          {/* Times */}
          {formData.times.map((time, index) => (
            <div key={index}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {formData.times.length > 1 ? `Dose ${index + 1} Time` : 'Time'} <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name={`time-${index}`}
                value={time}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md transition-all duration-200"
                required
              />
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Add Medication</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicationModal;