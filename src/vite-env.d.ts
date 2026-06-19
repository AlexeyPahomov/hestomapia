/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WIKIMAPIA_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
