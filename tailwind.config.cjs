/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffa6d2',
        secondary: '#ffe0f0',
        accent: '#ecbbc7',
        text: '#000000',
        background: '#ffffff'
      },
    },
  },
  plugins: [],
}
