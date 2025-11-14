import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Simple config for dev server
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './lib'),
      '@components': resolve(__dirname, './lib/components'),
      '@tokens': resolve(__dirname, './lib/tokens'),
      '@hooks': resolve(__dirname, './lib/hooks'),
      '@utils': resolve(__dirname, './lib/utils'),
    },
  },
  server: {
    port: 5173,
  },
});
