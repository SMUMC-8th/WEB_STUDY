/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string; // 로긘 요청할 백엔드 API 주소
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
