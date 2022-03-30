module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#000000',
        'otherBlack': '#121212',
        'primary': '#BB86FC',
      }
    },
  },
  plugins: [require("daisyui")],
}