import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    css: true,
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, './lib'),
      '@components': resolve(__dirname, './lib/components'),
      '@tokens': resolve(__dirname, './lib/tokens'),
      '@hooks': resolve(__dirname, './lib/hooks'),
      '@utils': resolve(__dirname, './lib/utils'),
    },
  },
});
