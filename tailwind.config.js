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
        primary: "#1E40AF",
        secondary: "#F59E0B",
      },
    },
  },
  plugins: [
  ],
};
