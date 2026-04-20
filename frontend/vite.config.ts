import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Forzamos la base a '/' para que funcione correctamente tanto en Vercel como en Localhost sin subcarpetas.
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 5050,
    proxy: {
      '/api': 'http://localhost:5001'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
