/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F196EE',
        primaryLight: '#FBEAFF',
        primaryDark: '#FF69B4',
        secondary: '#f50057',
      },
    },
  },
  plugins: [],
}
