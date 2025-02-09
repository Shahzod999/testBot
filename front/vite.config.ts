import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "My Custom PWA",
        short_name: "MyApp",
        start_url:
          "https://t.me/TrueGis_Bot/start?startapp=673a89577d6d20cabf0ad3cb", // 🔗 Custom URL
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  // server: {
  //   host: true, // Включает доступ по сети
  //   port: 5173,
  //   strictPort: true,
  //   cors: true,
  // },
});
