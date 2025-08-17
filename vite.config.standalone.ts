import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Standalone Vite configuration for deployment outside Replit
export default defineConfig({
  plugins: [
    react(),
    // Optional: Add error overlay for development
    ...(process.env.NODE_ENV === "development" 
      ? [] // Add any development-specific plugins here
      : [])
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Optimize for production
    target: 'es2020',
    sourcemap: process.env.NODE_ENV === 'development',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        }
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  }
});