import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// Config for building the library
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
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
          if (name === 'style.css') return 'styles/index.css';
          return name || 'assets/[name][extname]';
        },
      },
    },
    cssCodeSplit: true,
    sourcemap: true,
    commonjsOptions: {
      esmExternals: true,
    },
  },
});
