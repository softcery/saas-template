import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  base: '/',
  server: {
    port: 3000,
    host: true,
    open: true,
  },
  build: {
    outDir: '../build',
    rollupOptions: {
      cache: false,
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.name === 'index.css'
            ? `assets/[name].[hash].[ext]`
            : `assets/[name].[ext]`,
      },
    },
  },

  plugins: [
    react({
      include: '**/*.{jsx,tsx}',
      babel: {
        plugins: [],
      },
    }),

  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

})
