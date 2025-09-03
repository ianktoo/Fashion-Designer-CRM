// FIX: Added a triple-slash directive to include Vitest's type definitions. This makes TypeScript aware of the `test` property in the Vite config, which is needed for Vitest.
/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});