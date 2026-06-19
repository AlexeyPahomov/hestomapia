import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { buildWikimapiaUpstreamSearchParams } from './lib/wikimapia/upstream-url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const wikimapiaApiKey = env.WIKIMAPIA_API_KEY || env.VITE_WIKIMAPIA_API_KEY;

  const wikimapiaProxy = {
    '/api/wikimapia': {
      target: 'http://api.wikimapia.org',
      changeOrigin: true,
      rewrite: (requestPath: string) => {
        const queryIndex = requestPath.indexOf('?');
        const query = queryIndex >= 0 ? requestPath.slice(queryIndex + 1) : '';
        const params = wikimapiaApiKey
          ? buildWikimapiaUpstreamSearchParams(new URLSearchParams(query), wikimapiaApiKey)
          : new URLSearchParams(query);

        return `/?${params.toString()}`;
      },
    },
  } as const;

  return {
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
  };
});
