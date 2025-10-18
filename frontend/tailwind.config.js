/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-blue': '#3B82F6',
        'light-gray': '#F8FAFC',
        'medium-gray': '#64748B',
      }
    },
  },
  plugins: [],
}