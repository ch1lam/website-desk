/*
 * @Description  :
 * @Author       : ch1lam
 * @Date         : 2022-05-20 15:28:59
 * @LastEditTime : 2022-05-23 18:57:57
 * @LastEditors  : chilam
 * @FilePath     : \website-desk\src\main.ts
 */
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).use(createPinia()).mount("#app");
