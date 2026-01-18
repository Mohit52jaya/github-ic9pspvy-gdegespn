import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/aso-publication/",   // keep ONLY if repo name = aso-publication
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
