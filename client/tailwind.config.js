/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: {
          light: '#0099ff', // Light shade
          DEFAULT: '#103796', // Default shade
          dark: '#03045e', // Dark shade
        },
        secondary: {
          light: '#fcd34d',
          DEFAULT: '#f59e0b',
          dark: '#b45309',
        },
        accent: {
          light: '#f9a8d4',
          DEFAULT: '#ec4899',
          dark: '#9d174d',
        },
      }
    },
  },
  plugins: [],
}