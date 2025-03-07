import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ConditionChart = ({ condition }) => {
  const [selectedParameter, setSelectedParameter] = useState('all');
  const [selectedTimeline, setSelectedTimeline] = useState('all');

  // Expanded data for each condition with more parameters and entries
  const data = {
    diabetes: [
      { date: '2024-01-01', sugarLevel: 120, insulinLevel: 15, hba1c: 6.5 },
      { date: '2024-01-15', sugarLevel: 110, insulinLevel: 14, hba1c: 6.3 },
      { date: '2024-01-30', sugarLevel: 95, insulinLevel: 12, hba1c: 6.0 },
      { date: '2024-02-15', sugarLevel: 105, insulinLevel: 13, hba1c: 6.2 },
      { date: '2024-03-01', sugarLevel: 100, insulinLevel: 12, hba1c: 6.1 },
      { date: '2024-03-15', sugarLevel: 98, insulinLevel: 11, hba1c: 5.9 },
      { date: '2024-04-01', sugarLevel: 102, insulinLevel: 12, hba1c: 6.0 },
    ],
    asthma: [
      { date: '2024-01-01', peakFlow: 400, oxygenLevel: 95, symptoms: 2 },
      { date: '2024-01-15', peakFlow: 380, oxygenLevel: 94, symptoms: 3 },
      { date: '2024-01-30', peakFlow: 420, oxygenLevel: 96, symptoms: 1 },
      { date: '2024-02-15', peakFlow: 390, oxygenLevel: 95, symptoms: 2 },
      { date: '2024-03-01', peakFlow: 410, oxygenLevel: 97, symptoms: 1 },
      { date: '2024-03-15', peakFlow: 405, oxygenLevel: 96, symptoms: 2 },
      { date: '2024-04-01', peakFlow: 415, oxygenLevel: 98, symptoms: 1 },
    ],
    cancer: [
      { date: '2024-01-01', tumorSize: 2.5, whiteBloodCells: 5000, plateletCount: 200000 },
      { date: '2024-01-15', tumorSize: 2.3, whiteBloodCells: 4800, plateletCount: 210000 },
      { date: '2024-01-30', tumorSize: 2.1, whiteBloodCells: 5200, plateletCount: 220000 },
      { date: '2024-02-15', tumorSize: 2.0, whiteBloodCells: 5100, plateletCount: 215000 },
      { date: '2024-03-01', tumorSize: 1.9, whiteBloodCells: 5300, plateletCount: 225000 },
      { date: '2024-03-15', tumorSize: 1.8, whiteBloodCells: 5400, plateletCount: 230000 },
      { date: '2024-04-01', tumorSize: 1.7, whiteBloodCells: 5500, plateletCount: 235000 },
    ],
    brain_tumor: [
      { date: '2024-01-01', tumorSize: 1.8, cognitiveScore: 75, headacheFrequency: 3 },
      { date: '2024-01-15', tumorSize: 1.7, cognitiveScore: 72, headacheFrequency: 4 },
      { date: '2024-01-30', tumorSize: 1.6, cognitiveScore: 70, headacheFrequency: 2 },
      { date: '2024-02-15', tumorSize: 1.5, cognitiveScore: 68, headacheFrequency: 3 },
      { date: '2024-03-01', tumorSize: 1.4, cognitiveScore: 69, headacheFrequency: 2 },
      { date: '2024-03-15', tumorSize: 1.3, cognitiveScore: 70, headacheFrequency: 1 },
      { date: '2024-04-01', tumorSize: 1.2, cognitiveScore: 71, headacheFrequency: 1 },
    ],
    alzheimers: [
      { date: '2024-01-01', cognitiveScore: 75, memoryTest: 70, dailyFunction: 65 },
      { date: '2024-01-15', cognitiveScore: 72, memoryTest: 68, dailyFunction: 63 },
      { date: '2024-01-30', cognitiveScore: 70, memoryTest: 65, dailyFunction: 60 },
      { date: '2024-02-15', cognitiveScore: 68, memoryTest: 63, dailyFunction: 58 },
      { date: '2024-03-01', cognitiveScore: 69, memoryTest: 64, dailyFunction: 59 },
      { date: '2024-03-15', cognitiveScore: 70, memoryTest: 65, dailyFunction: 60 },
      { date: '2024-04-01', cognitiveScore: 71, memoryTest: 66, dailyFunction: 61 },
    ],
  };

  // Safe lines for specific parameters
  const safeLines = {
    diabetes: { sugarLevel: 100, insulinLevel: 10, hba1c: 6.0 },
    asthma: { peakFlow: 400, oxygenLevel: 95, symptoms: 1 },
    cancer: { tumorSize: 2.0, whiteBloodCells: 5000, plateletCount: 200000 },
    brain_tumor: { tumorSize: 1.5, cognitiveScore: 70, headacheFrequency: 2 },
    alzheimers: { cognitiveScore: 70, memoryTest: 65, dailyFunction: 60 },
  };

  // Timeline options
  const timelineOptions = [
    { label: 'All', value: 'all' },
    { label: 'Last 3 Months', value: '3m' },
    { label: 'Last 6 Months', value: '6m' },
    { label: 'Last Year', value: '1y' },
  ];

  // Filter data based on selected timeline
  const filterDataByTimeline = (data) => {
    const currentDate = new Date();
    switch (selectedTimeline) {
      case '3m':
        return data.filter((entry) => new Date(entry.date) >= new Date(currentDate.setMonth(currentDate.getMonth() - 3)));
      case '6m':
        return data.filter((entry) => new Date(entry.date) >= new Date(currentDate.setMonth(currentDate.getMonth() - 6)));
      case '1y':
        return data.filter((entry) => new Date(entry.date) >= new Date(currentDate.setFullYear(currentDate.getFullYear() - 1)));
      default:
        return data;
    }
  };

  const filteredData = filterDataByTimeline(data[condition]);

  // Parameters for each condition
  const parameters = {
    diabetes: ['sugarLevel', 'insulinLevel', 'hba1c'],
    asthma: ['peakFlow', 'oxygenLevel', 'symptoms'],
    cancer: ['tumorSize', 'whiteBloodCells', 'plateletCount'],
    brain_tumor: ['tumorSize', 'cognitiveScore', 'headacheFrequency'],
    alzheimers: ['cognitiveScore', 'memoryTest', 'dailyFunction'],
  };

  // Render the chart based on selected parameter
  const renderChart = () => {
    const chartData = selectedParameter === 'all' ? filteredData : filteredData.map((entry) => ({
      date: entry.date,
      value: entry[selectedParameter],
    }));

    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedParameter === 'all' ? (
            parameters[condition].map((param, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={param}
                stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color
              />
            ))
          ) : (
            <>
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
              <Line
                type="monotone"
                dataKey={() => safeLines[condition][selectedParameter]}
                stroke="#ff7300"
                strokeDasharray="5 5"
                name="Safe Line"
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{condition.toUpperCase()} Progress</h2>
      <div className="flex gap-4 mb-6">
        <select
          value={selectedTimeline}
          onChange={(e) => setSelectedTimeline(e.target.value)}
          className="p-2 border rounded-lg"
        >
          {timelineOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          value={selectedParameter}
          onChange={(e) => setSelectedParameter(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="all">All Parameters</option>
          {parameters[condition].map((param) => (
            <option key={param} value={param}>
              {param}
            </option>
          ))}
        </select>
      </div>
      {renderChart()}
    </div>
  );
};

export default ConditionChart;