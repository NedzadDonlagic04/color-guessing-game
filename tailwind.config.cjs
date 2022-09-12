/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './main.js'
  ],
  theme: {
    extend: {
        colors: {
            'top-color': 'hsl(180, 80%, 40%)',
            'bottom-color': 'hsl(176, 80%, 50%)',
            'overlay': 'hsla(0, 100%, 0%, .6)'
        }
    }
  },
  plugins: [],
}
