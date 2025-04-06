import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss()],
 
    build: {
      minify: false, // Disable minification
      assetsDir: '', // Place assets directly in the output directory
      rollupOptions: {
        output: {
          assetFileNames: '[name][extname]', // Keep asset file names unchanged
          entryFileNames: '[name].js', // Keep entry files at root
          chunkFileNames: '[name].js', // Keep chunk files at root
        },
      },
    },

})
