// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
// import dotenv from "dotenv";


// dotenv.config();

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173, // 기본 포트
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';
import tailwindcss from '@tailwindcss/vite';

// 환경 변수 불러오기
dotenv.config();

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
});
