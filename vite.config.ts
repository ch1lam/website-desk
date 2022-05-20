/*
 * @Description  : vite config
 * @Author       : ch1lam
 * @Date         : 2022-05-20 15:28:59
 * @LastEditTime : 2022-05-20 17:32:56
 * @LastEditors  : chilam
 * @FilePath     : \website-desk\vite.config.ts
 */
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": "/src/",
    },
  },
});
