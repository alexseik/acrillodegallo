/** @type {import('tailwindcss').Config} */
export const darkMode = "class"
export const mode = "jit"
export const content = [
  "./src/pages/**/*.{js,jsx,ts,tsx}",
  "./src/pages/index.js",
  "./src/components/**/*.{js,jsx,ts,tsx}",
  "./src/templates/**/*.{js,jsx,ts,tsx}",
]
export const theme = {
  extend: {
    colors: {
      primary: "var(--wp--preset--color--primary)",
      secondary: "var(--wp--preset--color--secondary)",
      tertiary: "var(--wp--preset--color--tertiary)",
      white: "#FFFFFF",
      contrast: "var(--wp--preset--color--contrast)",
      grey: "#B5BECC",
      lines: "#E3E8EF",
      "black-titles": "var(--wp--preset--color--black-titles)",
      "black-texts": "var(--wp--preset--color--black-texts)",
      "primary-dark": "var(--wp--preset--color--primary-dark)",
      "bg-dark": "var(--wp--preset--color--bg-dark)",
      "bg-light": "var(--wp--preset--color--bg-light)",
      "news-orange": "var(--wp--preset--color--news-orange)",
      "news-blue": "var(--wp--preset--color--news-blue)",
      consumerismo: "var(--wp--preset--color--consumerismo)",
    },
    width: {
      content: "75rem",
      wide: "80rem",
    },
    maxWidth: {
      content: "75rem",
      wide: "80rem",
      "1/2": "50%",
      "1/4": "25%",
      "1/3": "33.33%",
    },
    backgroundImage: {
      "hero-section":
        "linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(../../static/assets/BG.jpg)",
      reclaim:
        "linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(../../static/assets/reclaim.jpg)",
      whowheare:
        "linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(../../static/assets/quienes-somos.png)",
      overlay:
        "linear-gradient(180deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8))",
      "light-overlay":
        "linear-gradient(180deg, transparent 10%, var(--wp--preset--color--bg-light) 50%)",
    },
    borderRadius: {
      large: "30px",
    },
    fontFamily: {
      sans: ["Nunito Sans", "sans-serif"],
      serif: ["Frank Ruhl Libre", "serif"],
      nunito: ["Nunito Sans", "sans-serif"],
      content: ["Inter", "Nunito Sans", "sans-serif"],
    },
    fontSize: {
      "2xs": "10px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    zIndex: {
      60: "60",
      70: "70",
      80: "80",
      90: "90",
      100: "100",
    },
  },
}
export const plugins = []
export const safelist = [
  "border-primary",
  "bg-primary",
  "border-secondary",
  "bg-secondary",
  "border-tertiary",
  "bg-tertiary",
  "order-1",
  "order-2",
  "order-3",
  "order-4",
  "order-5",
  "order-6",
  "order-7",
  "md:order-1",
  "md:order-2",
  "md:order-3",
  "md:order-4",
  "md:order-5",
  "md:order-6",
  "md:order-7",
]
