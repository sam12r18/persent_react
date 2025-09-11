import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["vite.svg"],
            manifest: {
                name: "رایا حضور",
                short_name: "رایا",
                description: "مدیریت حضور و غیاب آنلاین",
                theme_color: "#ec723e",
                background_color: "#ffffff",
                display: "standalone",
                orientation: "portrait",
                start_url: "/",
                icons: [
                    {
                        src: "/icons/icon-192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "/icons/icon-512.png",
                        sizes: "512x512",
                        type: "image/png"
                    }
                ]
            }
        })
    ],
    server: {
        host: true, // دسترسی شبکه
        port: 3000,
    },
});
