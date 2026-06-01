/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a', // slate-900
        surface: '#1e293b', // slate-800
        primary: '#38bdf8', // sky-400
      },
      boxShadow: {
        'book': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'page': 'inset 0 0 20px rgba(0,0,0,0.5)',
      }
    },
  },
  plugins: [],
}
