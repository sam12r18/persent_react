import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./app.css";
import { registerSW } from "virtual:pwa-register";

// رجیستر کردن سرویس‌ورکر PWA
const updateSW = registerSW({
    onNeedRefresh() {
        if (confirm("نسخه جدیدی از اپ در دسترس است. بروزرسانی انجام شود؟")) {
            updateSW(true);
        }
    },
    onOfflineReady() {
        console.log("اپلیکیشن آماده استفاده آفلاین است ✅");
    },
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
);
