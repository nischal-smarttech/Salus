import React from 'react';

function Assessment() {
  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">New Assessment</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Start a New Health Assessment</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">General Health Check</h3>
            <p className="text-sm text-gray-500">Complete a general health questionnaire</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">Mental Health Assessment</h3>
            <p className="text-sm text-gray-500">Evaluate your mental health status</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium">Lifestyle Evaluation</h3>
            <p className="text-sm text-gray-500">Assess your daily habits and lifestyle</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assessment;
