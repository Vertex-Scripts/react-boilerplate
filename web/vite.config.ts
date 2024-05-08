import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import RemixRouter from "vite-plugin-remix-router";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), RemixRouter()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  base: "./",
  build: {
    outDir: "dist",
  },
});
