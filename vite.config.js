import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:1337',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // use if sails doesn't need /api
      }
    }
  },
  preview: {
    allowedHosts: true
  }
})