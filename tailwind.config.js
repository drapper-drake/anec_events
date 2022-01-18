module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    //He puesto la primera config de screens
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      "purple": "#3f3cbb",
      "light":" #f2f2f2",
      "dark": "#0b3762",
      "bg-light": "#342618",
      "bg-dark-80": "#0b3662e0",
      "white": "#ffffff",
      "black": "#000000",
      "bg-dark": "#ffffff",
      "contrast-bg-light": "#0b4da5",
      "contrast-bg-dark": "#ffa438",
      "links-cta": "#ffa438",
      "links-visited": "#8197ba",
      "pink": "#ffc0cb",
      "neutral": {
        100: "#f5f5f5",
        200: "#e5e5e5",
        300: "#d4d4d4",
        400: "#e3e3e3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
      },
    },
    fontFamily: {
      sans: ["Be Vietnam Pro", "sans-serif"],
      serif: ["Merriweather", "serif"],
      cursive: ["Lobster", "cursive"],
    },
  },

  plugins: [],
}
