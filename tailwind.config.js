/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "580px",
        md: "750px",
        lg: "1024px",
        xl: "1200px",
        xxl: "1300px",
        xxxl: "1400px",
      },
      colors: {
        blue: "#296DC1",
        green: "#00A82D",
      },
      gridTemplateColumns: {
        one: "repeat(1, 270px)",
        three: "repeat(3, 270px)",
        four: "repeat(4, 270px)",
      },
    },
  },
  plugins: [],
};
