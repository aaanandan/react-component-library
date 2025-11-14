import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// Config for building the library
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['lib'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
      rollupTypes: false,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './lib'),
      '@components': resolve(__dirname, './lib/components'),
      '@tokens': resolve(__dirname, './lib/tokens'),
      '@hooks': resolve(__dirname, './lib/hooks'),
      '@utils': resolve(__dirname, './lib/utils'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'ReactComponentLibrary',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names && assetInfo.names[0];
            // Rename CSS to styles.css for cleaner import
          if (name && name.endsWith('.css')) {
            return 'styles.css';
          }
          return name || 'assets/[name][extname]';
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    commonjsOptions: {
      esmExternals: true,
    },
  },
});
