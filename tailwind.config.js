module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'], // behind the scenes tailwind uses pure css to remove unused css
  darkMode: false, // or 'media' or 'class'
  theme: { // modify colors,font-sizes and other featurs of tailwind
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [], // array of plugins to extend tailwind
};
