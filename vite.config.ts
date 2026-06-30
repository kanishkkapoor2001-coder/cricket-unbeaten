import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages serves this project from /cricket-unbeaten/
  base: command === 'build' ? '/cricket-unbeaten/' : '/',
  server: { port: Number(process.env.PORT) || 5183 },
}))
