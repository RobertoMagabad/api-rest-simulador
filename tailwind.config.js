/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 👈 importante
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
