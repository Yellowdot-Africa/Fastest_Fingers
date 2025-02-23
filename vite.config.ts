import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy for the first API with base URL at port 2002
      '/api': {
        target: 'https://ydvassdp.com:2001',  // The first API server
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // Proxy for the second API with base URL at port 6002
      '/another-api': {
        // target: 'https://ydvassdp.com:6001',  // The second API server
        target: 'http://69.197.174.10:8093',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/another-api/, '/api/DataSync/Subscription'),
      },
    },
  },
});
