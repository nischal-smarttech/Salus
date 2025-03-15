import React from 'react';
import { Home, User, FileText, Stethoscope } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      path: '/home', // Changed from '/' to '/home'
      icon: Home,
      label: 'Home'
    },
    {
      path: '/profile',
      icon: User,
      label: 'Profile'
    },
    {
      path: '/past-results',
      icon: FileText,
      label: 'Records'
    },
    {
      path: '/doctor-consultation',
      icon: Stethoscope,
      label: 'Doctor'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100">
      <div className="flex justify-around p-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'text-pink-600 bg-pink-50'
                : 'text-gray-500 hover:text-pink-600'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Navigation;