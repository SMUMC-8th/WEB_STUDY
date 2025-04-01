/// <reference types="vite/client" />
interface ImportMetaenv {
  readonly VITE_TMDB_TOKEN;
}

interface ImportMeta {
  readonly env: ImportMetaenv;
}
