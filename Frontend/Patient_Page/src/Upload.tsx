import React, { useState } from 'react';
import { Upload, Folder, FileText, UploadCloud } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      
      setTimeout(() => {
        // Randomly decide between normal navigation and CT scan result
        const showCTResult = Math.random() > 0.5;
        
        if (showCTResult) {
          setUploadResult({
            type: 'ct_scan',
            message: 'Analysis of uploaded CT scan indicates potential lung cancer detection.',
            details: 'The scan shows abnormal masses in the right lung lobe that require immediate medical attention.',
            disclaimer: 'This is an automated preliminary analysis. Please consult a qualified medical professional for an accurate diagnosis and treatment plan.'
          });
        } else {
          navigate('/health-insights');
        }
        
        setIsUploading(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffcfc] p-4 flex items-center justify-center">
      <div className="bg-[#fff8f8] p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Upload Section */}
        <div className="text-center mb-8">
          <Upload className="w-16 h-16 text-blue-600 mb-4 mx-auto" />
          <h1 className="text-2xl font-bold mb-4">Upload Your Medical Files</h1>
          <p className="text-gray-600 mb-6">Please upload your medical documents for assessment.</p>
          
          {!uploadResult && (
            <div className="relative mb-6">
              <label 
                htmlFor="file-upload"
                className="group flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-blue-200 rounded-lg cursor-pointer hover:border-blue-400 transition-colors bg-[#f7f7f7]"
              >
                <UploadCloud className="w-12 h-12 text-blue-500 mb-3 group-hover:text-blue-600 transition-colors" />
                <p className="text-gray-600 mb-1">Drag & drop files or</p>
                <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                  Browse your device
                </span>
                <input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          )}

          {/* Result Display */}
          {uploadResult && (
            <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Analysis Result</h3>
              <p className="text-gray-700 mb-2">{uploadResult.message}</p>
              <p className="text-gray-600 mb-3">{uploadResult.details}</p>
              <div className="p-3 bg-yellow-50 rounded-md">
                <p className="text-sm text-yellow-800 font-medium">{uploadResult.disclaimer}</p>
              </div>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                onClick={() => setUploadResult(null)}
              >
                Upload Another File
              </button>
            </div>
          )}

          {!uploadResult && (
            <button 
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all w-full font-medium text-lg shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Files'}
            </button>
          )}
        </div>

        {/* Additional Options */}
        {!uploadResult && (
          <div className="space-y-4">
            <button 
              className="w-full p-6 bg-[#fff8f8] rounded-xl hover:bg-[#f3f3f3] transition-all flex items-center gap-4 border border-[#f7f7f7] hover:border-[#eaeaea] shadow-sm hover:shadow-md active:scale-[0.98]"
              onClick={() => { /* TODO: Implement upload from past reports */ }}
            >
              <div className="p-3 bg-blue-50 rounded-lg">
                <Folder className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-left">
                <p className="font-medium text-gray-800">Upload from Past Reports</p>
                <p className="text-sm text-gray-500">Select files from your previous reports</p>
              </span>
            </button>

            <button 
              className="w-full p-6 bg-[#fff8f8] rounded-xl hover:bg-[#f3f3f3] transition-all flex items-center gap-4 border border-[#f7f7f7] hover:border-[#eaeaea] shadow-sm hover:shadow-md active:scale-[0.98]"
              onClick={() => navigate('/past-results')}
            >
              <div className="p-3 bg-blue-50 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-left">
                <p className="font-medium text-gray-800">View Past Reports</p>
                <p className="text-sm text-gray-500">Access your previously uploaded reports</p>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;