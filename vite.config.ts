import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Assuming API requests are prefixed with '/api'
      '/api': {
        target: 'https://ydvassdp.com:2001',  // Target API server
        changeOrigin: true,  // This sets the host header of the request to the target URL
        rewrite: (path) => path.replace(/^\/api/, ''),  // Remove the /api prefix
        secure: false,  // If your local dev is not using https, but the target does
      }
    }
  }
});
