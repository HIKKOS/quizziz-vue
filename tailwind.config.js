/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#6ee7b7',
      secondary: {
        100: '#E2E2D5',
        200: '#888883'
      }
    },
    extend: {
      colors: {
        primary: '#6ee7b7',
        secondary: {
          100: '#E2E2D5',
          200: '#888883'
        }
      }
    }
  },
  plugins: []
}
