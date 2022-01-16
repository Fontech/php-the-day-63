module.exports = {
  // content: Add the paths to all of your template files in your tailwind.config.js file.
  content: ['./components/**/*.vue', './layouts/**/*.vue', './pages/**/*.vue'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
      },
    },
    extend: {
      colors: {
        fontech: '#f9df25',
      },
    },
  },
  plugins: [],
}
