import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  site: 'https://reflux-studio.github.io',
  base: '/cloak',
  output: 'static',
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../desktop/src'),
      },
    },
  },
})
