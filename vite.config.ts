import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // GitHub Pages serves project sites below the repository name.
  base: process.env.GITHUB_ACTIONS ? '/A-web-based-Hanok-simulator-game/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
