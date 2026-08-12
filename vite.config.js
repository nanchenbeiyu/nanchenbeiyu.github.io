import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// 黑白童话个人网站 · Vite 配置
// - React 插件：支持 JSX / Fast Refresh，可从任意页面渐进式迁移到 React
// - 多页应用：build 时显式声明四个入口页面
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                portfolio: resolve(__dirname, "portfolio.html"),
                path: resolve(__dirname, "path.html"),
                contact: resolve(__dirname, "contact.html")
            }
        }
    }
});
