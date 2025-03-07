import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleUserLogin = () => {
    navigate('/home');
  };

  const handleDoctorLogin = () => {
    // Doctor login logic (to be implemented)
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between p-6"
      style={{
        backgroundColor: '#a1ede0',
      }}
    >
      <div className="flex-grow flex items-center justify-center w-full relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-lg transform transition-all hover:scale-105 duration-300 relative">
          {/* Watermark inside the card */}
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
            Welcome Back!
          </h1>
          <p className="text-center text-gray-700 mb-8 text-lg font-medium italic tracking-wide relative z-10">
            Your Health, Simplified.
            <br />
            Your Future, Secured.
          </p>

          <div className="space-y-6 relative z-10">
            <button
              onClick={handleUserLogin}
              className="w-full bg-teal-600 text-white py-4 px-6 rounded-lg hover:bg-teal-700 transition-colors duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-lg font-semibold">User Login</span>
            </button>

            <button
              onClick={handleDoctorLogin}
              className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-lg font-semibold">Doctor Login</span>
            </button>
          </div>

          <div className="my-8 border-t border-gray-200 relative z-10" />
        </div>
      </div>
    </div>
  );
};

export default Login;

const styles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
`;

console.log(styles);