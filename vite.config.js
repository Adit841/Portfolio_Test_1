import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import glsl from 'vite-plugin-glsl'

// GitHub Pages returns 404.html for unknown paths. Copying the SPA
// index lets /about and other client routes reload without a blank page.
function githubPagesSpaFallback() {
  return {
    name: 'github-pages-spa-fallback',
    apply: 'build',
    writeBundle() {
      const indexHtml = resolve(process.cwd(), 'dist/index.html')
      const fallbackHtml = resolve(process.cwd(), 'dist/404.html')
      if (existsSync(indexHtml)) {
        copyFileSync(indexHtml, fallbackHtml)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [react(),tailwindcss(), glsl(), ],
  base: '/Portfolio_Test_1/',
=======
  base: '/Portfolio_Test_1/',
  plugins: [react(),tailwindcss(), glsl(), githubPagesSpaFallback()],
>>>>>>> 3d0babf (living at github)
})
