import React, { useState } from 'react';
import { ChevronLeft, Search, Filter, Activity, Brain, Droplet, ActivitySquare } from 'lucide-react';
import ConditionChart from './ConditionChart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

function PastResults() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

  const conditions = [
    { 
      name: 'Cancer',
      icon: <Activity className="w-6 h-6 text-red-500" />,
      lastResult: '2024-02-01',
      status: 'Not detected ',
      main: true,
      type: 'cancer'
    },
    { 
      name: 'Asthma',
      icon: <Activity className="w-6 h-6 text-blue-500" />,
      lastResult: '2024-01-15',
      status: 'Mild',
      main: true,
      type: 'asthma'
    },
    { 
      name: 'Brain Tumor',
      icon: <Brain className="w-6 h-6 text-purple-500" />,
      lastResult: '2023-12-20',
      status: 'Not detected',
      main: true,
      type: 'brain_tumor'
    },
    { 
      name: 'Diabetes',
      icon: <Droplet className="w-6 h-6 text-green-500" />,
      lastResult: '2024-01-30',
      status: 'High',
      main: true,
      type: 'diabetes'
    },
    { 
      name: 'Alzheimer\'s',
      icon: <ActivitySquare className="w-6 h-6 text-yellow-500" />,
      lastResult: '2023-11-25',
      status: 'Stable',
      main: false,
      type: 'alzheimers'
    }
  ];

  const filteredConditions = conditions.filter(condition =>
    condition.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <span className="text-lg font-bold">View My Past Results</span>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search conditions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#fff8f8] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>
        <button className="p-2 bg-[#fff8f8] rounded-lg hover:bg-[#fffcfc] transition-colors">
          <Filter className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Recent Results */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Recent Results</h2>
        <div className="grid grid-cols-2 gap-3">
          {conditions.slice(0, 4).map((condition, index) => (
            <div key={index} className={`p-3 ${condition.main ? 'bg-[#fff8f8]' : 'bg-[#f3f3f3]'} rounded-lg`}>
              <div className="flex items-center gap-2 mb-2">
                {condition.icon}
                <span className="font-medium">{condition.name}</span>
              </div>
              <div className="text-sm text-gray-500">Last Check: {condition.lastResult}</div>
              <div className="text-sm text-gray-500">Status: {condition.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* All Conditions */}
      <h2 className="text-lg font-semibold mb-3">All Conditions</h2>
      <ul className="space-y-2">
        {filteredConditions.map((condition, index) => (
          <li 
            key={index}
            className={`p-3 ${condition.main ? 'bg-[#fff8f8]' : 'bg-[#f3f3f3]'} rounded-lg flex items-center gap-3 hover:bg-[#fffcfc] transition-colors cursor-pointer`}
            onClick={() => setSelectedCondition(condition.type)}
          >
            {condition.icon}
            <div className="flex-1">
              <div className="font-medium">{condition.name}</div>
              <div className="text-sm text-gray-500">Last Check: {condition.lastResult}</div>
            </div>
            <div className="text-sm text-gray-500">Status: {condition.status}</div>
          </li>
        ))}
      </ul>

      {selectedCondition && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <ConditionChart condition={selectedCondition} />
            <button
              onClick={() => setSelectedCondition(null)}
              className="mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PastResults;