/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inria: ["Inria Sans", "sans-serif"],

      },
      colors: {
        ffgray: "#484848",
        teal:"#007880",
        ffgreen: "#009A49",
        neon: "#00F0FF"


      },
      boxShadow: {
        custom: "0 2px 8px 0px rgba(0, 0, 0, 0.3)",
        dark: "0 1px 4px 0px rgba(0, 0, 0, 1)"
      }
    },
  },
  plugins: [],
}

