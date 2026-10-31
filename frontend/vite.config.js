import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// In development, calls to /api are forwarded to the Spring Boot backend.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Fail loudly instead of silently moving to 5174 when 5173 is already taken
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        // The proxy makes this a same-origin call, so drop the browser's Origin header
        // and the backend never treats it as a cross-origin (CORS) request.
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => proxyReq.removeHeader('origin'));
        },
      },
    },
  },
});
