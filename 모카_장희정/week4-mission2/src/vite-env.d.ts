/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string; // 너가 로그인 요청할 백엔드 API 주소
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
