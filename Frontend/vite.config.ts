import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Point explicitly to CommonJS PostCSS config (since package.json has type: module)
  css: { postcss: './postcss.config.cjs' },
});
