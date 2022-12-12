/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/web-oscilloscope/',
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src')
    },
  },
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
