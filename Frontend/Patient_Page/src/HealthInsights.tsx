import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface TestResult {
  name: string;
  value: string;
  status: 'normal' | 'high' | 'low';
  range: string;
}

const HealthInsights = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const testResults: TestResult[] = [
    {
      name: 'Hemoglobin',
      value: '14.2 g/dL',
      status: 'normal',
      range: '12.0 - 15.5 g/dL'
    },
    {
      name: 'Cholesterol',
      value: '220 mg/dL',
      status: 'high',
      range: '< 200 mg/dL'
    },
    {
      name: 'White Blood Cells',
      value: '6.5 x10³/μL',
      status: 'normal',
      range: '4.0 - 11.0 x10³/μL'
    },
    {
      name: 'Platelets',
      value: '150 x10³/μL',
      status: 'low',
      range: '150 - 450 x10³/μL'
    },
    {
      name: 'Blood Sugar (Fasting)',
      value: '95 mg/dL',
      status: 'normal',
      range: '70 - 100 mg/dL'
    },
    {
      name: 'Vitamin D',
      value: '28 ng/mL',
      status: 'low',
      range: '30 - 100 ng/mL'
    },
    {
      name: 'Iron',
      value: '120 µg/dL',
      status: 'normal',
      range: '60 - 170 µg/dL'
    },
    {
      name: 'Thyroid (TSH)',
      value: '2.5 mIU/L',
      status: 'normal',
      range: '0.4 - 4.0 mIU/L'
    }
  ];

  const getStatusColor = (status: 'normal' | 'high' | 'low') => {
    switch (status) {
      case 'normal':
        return 'text-green-600';
      case 'high':
        return 'text-red-600';
      case 'low':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: 'normal' | 'high' | 'low') => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'high':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'low':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fffcfc] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Analyzing your blood test results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffcfc] p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-8">Blood Test Report Insights</h1>
        
        <div className="space-y-6">
          {testResults.map((test, index) => (
            <div key={index} className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-gray-800">{test.name}</h3>
                <div className={`flex items-center gap-2 ${getStatusColor(test.status)}`}>
                  {getStatusIcon(test.status)}
                  <span className="font-medium">{test.value}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Normal Range: {test.range}</span>
                <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      test.status === 'normal' ? 'bg-green-400' :
                      test.status === 'high' ? 'bg-red-400' :
                      'bg-orange-400'
                    }`}
                    style={{ width: `${Math.min(100, (parseFloat(test.value) / 300) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Summary</h2>
          <p className="text-gray-700">
            Your blood test results show mostly normal values with a few areas to monitor. 
            Cholesterol levels are slightly elevated - consider dietary changes and regular exercise. 
            Platelet count is at the lower end of normal - maintain a balanced diet rich in iron.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HealthInsights;
