/* eslint-disable no-undef */
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.replicate.com',  // Proxy to the base URL (no need for full endpoint here)
        changeOrigin: true,  // Ensures the CORS headers are correctly set
        rewrite: (path) => path.replace(/^\/api/, ''),  // Removes "/api" prefix when forwarding the request
      },
    },
  },
});
