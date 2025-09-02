import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(),tailwindcss()],  server: {
    host: true,
    port: 5175,
    strictPort: true,
    hmr: {
      port: 5175,
    },
    allowedHosts: [
      '5175-iw19po179o2v8lx1jm6ts-6d1f8b07.manusvm.computer'
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
