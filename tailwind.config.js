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
      hm: "660px", //Breakpoint especial para el cambio de encabezado
    },
    colors: {
      "purple": "#3f3cbb",
      "light":" #f2f2f2",
      "dark": "#0b3762",
      "bg-light": "#342618",
      "white": "#ffffff",
      "bg-dark": "#ffffff",
      "contrast-bg-light": "#0b4da5",
      "contrast-bg-dark": "#ffa438",
      "links-cta": "#ffa438",
      "links-visited": "#8197ba",
    },
    fontFamily: {
      sans: ["Be Vietnam Pro", "sans-serif"],
      serif: [ "Lobster Two", "cursive"],
    },
  },

  plugins: [],
}
