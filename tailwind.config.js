/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx}'],
  theme: {
    extend: {},
  },

  plugins: [require('@tailwindcss/typography'), require('daisyui')],

  daisyui: {
    styled: true,
    themes: ['dark'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
};
