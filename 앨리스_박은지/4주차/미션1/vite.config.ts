import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    port: 5173,
    proxy: {
      "/movie": {
        target: "http://localhost:5173",
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
});
