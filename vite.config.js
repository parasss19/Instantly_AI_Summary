import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),       // main entry (could be popup)
        options: resolve(__dirname, 'options.html')   // options page
      }
    },
    outDir: 'dist',      // default is dist, can be changed if needed
    emptyOutDir: true    // clean output dir before each build
  }
})
