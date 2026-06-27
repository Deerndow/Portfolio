import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Portfolio/",
  plugins: [react()],
  server: { port: 5173 },
  build: {
    rollupOptions: {
      input: "app.html",
      output: {
        entryFileNames: "assets/index.js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: (assetInfo) =>
          assetInfo.name?.endsWith(".css")
            ? "assets/index.css"
            : "assets/[name][extname]",
      },
    },
  },
});
