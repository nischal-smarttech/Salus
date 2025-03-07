import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  saveDiagnosis: async (userId: string, reportData: any) => {
    const response = await axios.post(`${API_URL}/api/diagnoses`, {
      userId,
      reportData
    });
    return response.data;
  },

  getDiagnoses: async (userId: string) => {
    const response = await axios.get(`${API_URL}/api/diagnoses/${userId}`);
    return response.data;
  }
};