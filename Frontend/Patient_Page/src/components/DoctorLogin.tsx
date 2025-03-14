import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {

    e.preventDefault();
    // TODO: Implement login logic
    navigate('/doctor-dashboard');
  };

  const handleSignup = () => {
    navigate('/doctor-signup');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between p-6"
      style={{ backgroundColor: '#a1ede0' }}
    >
      <div className="flex-grow flex items-center justify-center w-full relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-lg transform transition-all hover:scale-105 duration-300 relative">
          <div 
            className="absolute inset-0 opacity-35 pointer-events-none"
            style={{
              backgroundImage: `url('https://i.postimg.cc/4dWX12FV/image.png')`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '150% auto',
              backgroundPosition: 'center',
            }}
          ></div>

          <div className="flex justify-center mb-6 relative z-10">
            <img
              src="https://i.postimg.cc/05hqXXbB/Salas-removebg-preview.png"
              alt="Logo"
              className="w-40 transition-transform duration-300 hover:scale-110"
            />
          </div>

          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2 animate-fade-in relative z-10">
            Doctor Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
            >
              <span className="text-lg font-semibold">Login</span>
            </button>
          </form>

          <div className="mt-6 text-center relative z-10">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={handleSignup}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorLogin;
