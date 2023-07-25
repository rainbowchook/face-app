/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'logo-image': "url('./components/Logo/brain.png')",
      },
    },
  },
  plugins: [],
}
