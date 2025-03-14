import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Patient login attempt with:', { username, password });
    // Add your authentication logic here
    navigate('/Home'); // Redirect after successful login
  };

  return (
    <div className="h-screen flex flex-col items-center p-6" style={{ backgroundColor: '#a1ede0' }}>
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-lg">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">Patient Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-4 px-6 rounded-lg hover:bg-teal-700 transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientLogin;
