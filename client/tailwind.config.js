/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'ios-kb-background': '#D6D8DD',
        'ios-kb-control': '#B4B8C1'
      },
      fontFamily: {
        baseline: ['Poppins', 'sans-serif'],
        ios: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: [],
}

