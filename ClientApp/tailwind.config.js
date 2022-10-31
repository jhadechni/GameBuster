/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark", {
      custom: {

        "primary": "#be123c",

        "secondary": "#1e3a8a",

        "accent": "#51A800",

        "neutral": "#1B1D1D",

        "base-100": "#212121",

        "info": "#06b6d4",

        "success": "#4ade80",

        "warning": "#fde047",

        "error": "#f87171",
      }
    },"halloween","luxury","night"],
  },
}