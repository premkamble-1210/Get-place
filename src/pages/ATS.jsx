import React, { useState } from 'react';
import { generateContent } from '../Model'; // Ensure this correctly calls Gemini API
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

function ATS() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [atsScore, setAtsScore] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && (uploadedFile.type === 'image/png' || uploadedFile.type === 'image/jpeg')) {
      setFile(uploadedFile);
      setFileName(uploadedFile.name);
    } else {
      alert('Please upload a valid PNG or JPG resume.');
    }
  };

  const getAtsScore = async () => {
    if (!file) {
      alert('Please upload a resume before scoring.');
      return;
    }

    setLoading(true);
    setAtsScore(null);

    try {
      const prompt = 'Evaluate this resume image and return an ATS score (0-100). Only give a numerical score.';
      const response = await generateContent(prompt, file); // Ensure API supports file input
        console.log("Full API response:",response);
      setAtsScore(response || 'Error calculating score.');
    } catch (error) {
      console.error('Error getting ATS score:', error);
      setAtsScore('Failed to fetch ATS score.');
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition-transform w-64 mx-auto">
        {atsScore === null ? (
          <>
            {/* Upload Section (Hidden when score is generated) */}
            <label htmlFor="resumeUpload" className="cursor-pointer">
              <i className="fa-solid fa-file-upload w-20 mx-auto mb-3 text-4xl"></i>
              <h2 className="text-xl font-semibold text-gray-800">Upload Resume</h2>
              <p className="text-gray-600 text-sm mt-2">Upload your resume in PNG or JPG format.</p>
              {fileName && <p className="text-sm text-blue-500 mt-2">{fileName}</p>}
            </label>
            <input
              type="file"
              id="resumeUpload"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
            {fileName && (
              <button
                onClick={getAtsScore}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer">
                {loading ? 'Calculating...' : 'Get ATS Score'}
              </button>
            )}
          </>
        ) : (
          <>
            {/* Gauge Chart Section (Only visible after score is generated) */}
            <h2 className="text-xl font-semibold text-gray-800 mb-3 text-2xl">ATS Score</h2>
            <Gauge
              value={atsScore}
              startAngle={-110}
              endAngle={110}
              width={200}
              height={200}
              sx={{
                [`& .${gaugeClasses.valueText}`]: {
                  fontSize: 25,
                  color: 'black',
                  fontWeight: '400',
                },
              }}
              text={({ value, valueMax }) => `${value} `}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ATS;
