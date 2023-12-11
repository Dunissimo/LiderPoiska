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
        "2xl": "1536px",
      },
      colors: {
        blue: "#296DC1",
        green: "#00A82D",
      },
    },
  },
  plugins: [],
};
