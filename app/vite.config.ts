import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      host: '0.0.0.0', // This makes the server accessible to other devices on the network
      port: 3000,
    },
    build: {
      sourcemap: process.env.NODE_ENV === 'development',
      outDir: '../server/public/',
      rollupOptions: {
        output: {
          entryFileNames: 'index.js', // Set the name for the JS entry file
          chunkFileNames: '[name]-[hash].js', // Names for dynamic imports
          assetFileNames: ({ name }) => {
            if (name?.endsWith('.css')) {
              return 'index.css';
            }
            return '[name]-[hash].[ext]';
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@api': resolve(__dirname, './src/api'),
        '@state': resolve(__dirname, './src/state'),
        '@components': resolve(__dirname, './src/components'),
      },
    },
  };
});
