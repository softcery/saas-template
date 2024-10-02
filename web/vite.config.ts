import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import EnvironmentPlugin from 'vite-plugin-environment'

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
    EnvironmentPlugin({
      API_BASE_URL: 'http://localhost:8080',
    }),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
