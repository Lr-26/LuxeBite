import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VERCEL ? '/' : '/luxe-bite/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5001'
    }
  }
})
