/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cartoon: ['"Fredoka One"', "cursive"],
        bubble: ['"Bubblegum Sans"', "cursive"],
        body: ["Nunito", "sans-serif"],
      },
      colors: {
        panda: {
          yellow: "#FFD700",
          blue: "#0039ff",
          green: "#00C853",
          pink: "#FF4081",
          purple: "#7C4DFF",
          cyan: "#00E5FF",
          orange: "#FF6D00",
        },
      },
      screens: {
        sm0: "450px",
        sm: "640px",
        sm2: "710px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      animation: {
        "bounce-slow": "bounce 3s infinite",
      },
    },
  },
  plugins: [],
};
