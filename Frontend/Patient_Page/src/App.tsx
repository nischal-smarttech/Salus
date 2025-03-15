import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import Login from './components/Login';
import Signup from './components/Signup';
import DoctorDashboard from './components/DoctorDashboard';
import Profile from './Profile';
import PastResults from './PastResults';
import DoctorConsultation from './DoctorConsultation';
import Appointments from './Appointments';
import Upload from './Upload';
import HealthInsights from './HealthInsights';
import Navigation from './components/Navigation';

// A wrapper component to conditionally render Navigation
const NavigationWrapper = () => {
  const location = useLocation();
  const hideNavPaths = ['/', '/signup']; // Paths where navigation should be hidden

  return !hideNavPaths.includes(location.pathname) ? <Navigation /> : null;
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/past-results" element={<PastResults />} />
          <Route path="/doctor-consultation" element={<DoctorConsultation />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/health-insights" element={<HealthInsights />} />
        </Routes>
        <NavigationWrapper />
      </div>
    </Router>
  );
};

export default App;