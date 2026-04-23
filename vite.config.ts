import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),   // ✅ enables @use "src/..."
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "src/styles/variables.scss" as *;`  // ✅ correct global path
      }
    }
  }
})