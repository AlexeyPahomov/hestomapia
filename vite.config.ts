import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

const wikimapiaProxy = {
  '/api/wikimapia': {
    target: 'http://api.wikimapia.org',
    changeOrigin: true,
    rewrite: (requestPath: string) => requestPath.replace(/^\/api\/wikimapia/, ''),
  },
} as const;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { proxy: wikimapiaProxy },
  preview: { proxy: wikimapiaProxy },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@shared': path.resolve(__dirname, 'src/shared'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          maplibre: ['maplibre-gl'],
        },
      },
    },
  },
});
