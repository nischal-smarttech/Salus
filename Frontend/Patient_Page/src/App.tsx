import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './components/Login';
import Profile from './Profile';
import PastResults from './PastResults';
import DoctorConsultation from './DoctorConsultation';
import Appointments from './Appointments';
import Upload from './Upload';
import HealthInsights from './HealthInsights';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/past-results" element={<PastResults />} />
          <Route path="/doctor-consultation" element={<DoctorConsultation />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/health-insights" element={<HealthInsights />} />
        </Routes>
      </div>
      <Routes>
        <Route path="/*" element={<Navigation />} />
      </Routes>
    </Router>
  );
};

export default App;
