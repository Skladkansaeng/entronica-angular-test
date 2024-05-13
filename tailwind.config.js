/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    opacity: ({ after }) => after(['disabled'])
  },
  plugins: [],
}

