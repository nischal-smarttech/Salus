/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // Blue
        secondary: '#6b7280', // Gray
        accent: '#10b981', // Green
        background: '#f8fafc', // Light background
        card: '#ffffff', // White for cards
        text: {
          primary: '#1e293b', // Dark text
          secondary: '#64748b' // Light text
        }
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.12)',
        button: '0 2px 4px rgba(0,0,0,0.15)'
      }
    },
  },
  plugins: [],
}
