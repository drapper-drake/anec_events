module.exports = {
	plugins: {
    "autoprefixer":true,
		"postcss-nesting": true,
    "postcss-mixins": true,
	},
  //Carpeta donde esta nuestro CSS
  "input": './src/css/styles.css',
  //Carpeta donde alojamos nuestro CSS
  "output": "dist/css/styles.css"
};
