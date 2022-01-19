const path = require("path");
const { resolve } = require('path')
const mode = process.env.NODE_ENV === "production" ? "production" : "development";
// const base = mode === "production" ? "/" + path.basename(process.cwd()) + "/" : "/";   // GitHub
const base = "/"; // Netlify

module.exports = {
  root: "src",
  // nested: "src/nested",
  base, mode, publicDir: "../public",
  build: {
    outDir: "../dist",
    assetsDir: "./",
    rollupOptions: {
      input: {
        main: resolve("src", 'index.html'),
        cookies: resolve("src", 'cookies/cookies.html'),
        privacy: resolve("src", 'privacy/privacy.html')
      }

    }
  }
}
