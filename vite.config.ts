import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 8080,
    cors: true,
    allowedHosts: [
      "1f573f58-f805-45f8-a71b-982241cdd714.lovableproject.com",
      "c98ea1c8-6224-4b26-9bec-8e2bcb0806a5-00-228frgd5ni25g.janeway.replit.dev",
    ],
    hmr: {
      clientPort: 443,
      host: "curly-chainsaw-w6jv9rv9wr6cvg7v-8080.app.github.dev",
      protocol: "wss",
    },
    proxy: {
      "/supabase-proxy": {
        target: "https://lhmicelinsyzjhjiznqn.supabase.co",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/supabase-proxy/, ""),
        configure: (proxy, _options) => {
          proxy.on("error", (err, _req, _res) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            console.log("Sending Request to the Target:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req, _res) => {
            console.log(
              "Received Response from the Target:",
              proxyRes.statusCode,
              req.url,
            );
          });
        },
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
