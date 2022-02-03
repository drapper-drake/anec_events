import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
//This is magic
export default defineConfig({
  build: {
    outDir: "./dist",
    assetsDir: "./",
    cssCodeSplit: false
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'vuex',
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  plugins: [vue()],
})




/**
 * const { resolve } = require('path')
const mode = process.env.NODE_ENV === "production" ? "production" : "development";
// const base = mode === "production" ? "/" + path.basename(process.cwd()) + "/" : "/";   // GitHub
const base = "/"; // Netlify

module.exports = {
  root: "src",

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
 */
