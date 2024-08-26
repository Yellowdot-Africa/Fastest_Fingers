import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy for the first API with base URL at port 2002
      '/api': {
        target: 'http://ydvassdp.com:2002',  // The first API server
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api/DataSync/Subscription'),
      },
      // Proxy for the second API with base URL at port 6002
      '/another-api': {
        target: 'http://ydvassdp.com:6002',  // The second API server
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/another-api/, ''),
      },
    },
  },
});
