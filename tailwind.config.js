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
      "bg-light":" #f2f2f2",
      "bg-dark": "#0b3762",
      "text-bg-light": "#342618",
      "text-bg-dark": "#ffffff",
      "contrast-bg-light": "#0b4da5",
      "contrast-bg-dark": "#ffa438",
      "links-cta": "#ffa438",
      "links-visited": "#8197ba",
    },
    fontFamily: {
      sans: ["Be Vietnam Pro", "sans-serif"],
      serif: [ "Lobster Two", "cursive"],
    },
    borderRadius: {
      "none": "0",
      "sm": ".125rem",
      DEFAULT: "25px", //He puesto los que tenemos como basico
      "lg": ".5rem",
      "full": "9999px",
    },
  },

  plugins: [],
}
