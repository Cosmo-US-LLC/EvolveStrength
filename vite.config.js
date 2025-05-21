import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/",
  server: {
    host: "0.0.0.0", // Allow external network access, use localhost for local access only
    port: 4173, // Ensure it matches the port where the app is running
    allowedHosts: ["subscription.evolvestrength.ca"]
  },
  preview: {
    allowedHosts: ["subscription.evolvestrength.ca"], // Add your custom domain here
  },
});