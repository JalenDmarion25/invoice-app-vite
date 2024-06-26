import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/invoice-app-vite/', // Set the base path
  server: {
    historyApiFallback: true, // Enable history API fallback
  },
});
