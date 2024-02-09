/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f53850",
        secondary: "#f76E80",
        tertiary: "#FF385C"
      },

    },
  },
  plugins: [],
}

