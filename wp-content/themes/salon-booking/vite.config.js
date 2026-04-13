import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,

    rollupOptions: {
      input: {
        app: path.resolve(__dirname, 'assets/js/main.js'),
        style: path.resolve(__dirname, 'assets/css/input.css'),
      },
      output: {
        entryFileNames: 'js/[name].js', 
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'css/main.css';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
});