import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: 3000,
    proxy: {
      // with options
      "/api": {
        target: "http://localhost:5555",
        changeOrigin: true,
        secure: false,
      },
      "/socket.io/": {
        ws: true,
        target: "http://localhost:5555",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
