const c = require('tailwindcss/colors');
module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: { colors: { ...c } },
  plugins: [],
};
