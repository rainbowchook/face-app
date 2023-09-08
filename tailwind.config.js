/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'logo-image': "url('./components/Logo/brain.png')",
      },
      opacity: {
        85: '.85',
      },
      colors: {
        neutral: '#334155', //slate-700
        happiness: '#0369a1', //sky-700
        'sadness-contempt': '#6d28d9', //violet-700
        fear: '#eab308', //yellow-500
        surprise: '#c2410c', //orange-700
        anger: '#b91c1c', //rose-700
        disgust: '#047857', //emerald-700
      },
      // fontFamily: {
      //   ysabeau: ['Ysabeau SC', 'sans-serif'],
      // },
    },
  },
  plugins: [],
}
