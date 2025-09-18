/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",   // src folder
    "./pages/**/*.{js,ts,jsx,tsx}", // next.js pages
    "./components/**/*.{js,ts,jsx,tsx}" // components
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite', // 20 sec per rotation
        'spin-slower': 'spin 40s linear infinite', // optional slower
      },
    },
  },
  plugins: [],
};
