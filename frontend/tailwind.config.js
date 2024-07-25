// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        indigo: {
          600: '#6366F1',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
