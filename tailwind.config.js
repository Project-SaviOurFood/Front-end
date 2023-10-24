/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'vermelho': '#FF5757',
        'marsala': '#D62D2D',
        'amarelo': '#FFF480',
        'marromEstranho': '#CEC24A',
        'cinza': '#918989',
        'gelo': '#F8F8F8'
      },
      container: {
        center: true,
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
    },
  },
  plugins: [],
}