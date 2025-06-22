/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",         // todas las pantallas y layouts de expo-router
    "./src/**/*.{js,jsx,ts,tsx}",         // cualquier otro código de tu Clean Architecture
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#038C25",
        secondary: "#F59E0B",
        rojo: "#CA3433",
        rojoAlerte: "#5F2120",
        gray_1: "#8B7F7F",
        black_1: "#2D2D2D",
        white_1: "#EDEDED",
      },
    },
  },
  plugins: [
  ],
};
