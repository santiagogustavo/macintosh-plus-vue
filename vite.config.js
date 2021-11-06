import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  base: './',
  plugins: [vue()],
  assetsInclude: ['**/*.fbx'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
