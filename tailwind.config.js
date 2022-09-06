module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['ClashDisplay'],
    },
    extend: {
      colors: {
        'background': '#000000',
        'otherBlack': '#121212',
        'primary': '#BB86FC',
        'yellowBackground' :'#FDFAE2',
        'greenFont' : '#2B361C',
        'greenBackground': '#677C55',
        'redFont': '#FF5555',
        'yellowFont': '#FDFAE2',
        'whiteBackground': '#FDFDFD',
        'grayBackground': '#ECF0EC',
      }
    },
  },
  plugins: [require("daisyui")],
}