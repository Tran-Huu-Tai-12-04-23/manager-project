/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        primary: ["Roboto", "sans-serif"],
      },
      backgroundColor: {
        primary: "#0079FF",
        "dark-primary": "#111827",
        "dark-second": "#1f2937",
        "dark-third": "#374151",
        "light-primary": "#f5f3f7",
        "light-second": "#e9e4ed",
        "light-third": "#e9e4ed",

        todo: "rgb(247, 134, 129)",
        process: "rgb(55, 94, 255)",
        review: "rgb(244, 190, 78)",
        done: "rgb(66, 176, 150)",
        other: "rgb(154, 115, 181)",

        ux: "rgba(244, 190, 78, .1)",
        design: "rgba(117, 94, 205, .1)",
        code: "rgba(107, 81, 207, .1)",
        success: "rgba(66, 176, 150, .1)",

        "blur-dark": "rgba(255, 255, 255, .1)",
        "blur-light": "rgba(0, 0, 0, .1)",

        low: "rgba(247, 134, 129, .3)",
        medium: "rgba(55, 94, 255, .3)",
        high: "rgba(66, 176, 150, .3)",
      },
      borderRadius: {
        primary: "1rem",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        primary: "#0079FF",
        "blur-dark": "rgba(255, 255, 255, .1)",
        "blur-light": "rgba(0, 0, 0, .1)",
      },
      width: {
        "30rem": "30rem",
        "25rem": "25rem",
        "20rem": "20rem",
        "24rem": "24rem",
        "15rem": "15rem",
      },
      minWidth: {
        "20rem": "20rem",
        "40rem": "40rem",
      },
      maxWidth: {
        40: "40rem",
      },
      minHeight: { "15rem": "15rem", "10rem": "10rem" },
      colors: {
        primary: "#0079FF",
        "blur-dark": "rgba(255, 255, 255, .3)",
        "blur-light": "rgba(0, 0, 0, .3)",
        todo: "rgb(247, 134, 129)",
        process: "rgb(55, 94, 255)",
        review: "rgb(244, 190, 78)",
        done: "rgb(66, 176, 150)",
        ux: "rgb(244, 190, 78)",
        design: "rgb(117, 94, 205)",
        code: "rgb(107, 81, 207)",
        success: "rgb(66, 176, 150)",
        other: "rgb(154, 115, 181)",

        low: "rgba(247, 134, 129, 1)",
        medium: "rgba(55, 94, 255, 1)",
        high: "rgba(66, 176, 150, 1)",
      },
    },
  },
  plugins: [],
};
