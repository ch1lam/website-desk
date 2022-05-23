/*
 * @Description  : 全局 store
 * @Author       : ch1lam
 * @Date         : 2022-05-23 17:21:59
 * @LastEditTime : 2022-05-23 19:01:29
 * @LastEditors  : chilam
 * @FilePath     : \website-desk\src\store\index.ts
 */
import { defineStore } from "pinia";

export const useStore = defineStore("main", {
  state: () => {
    return {
      username: window.sessionStorage.getItem("username"),
      token: window.sessionStorage.getItem("token"),
      avatarUrl: window.sessionStorage.getItem("avatarUrl"),
      role: window.sessionStorage.getItem("role"),
    };
  },

  getters: {},
  actions: {},
});
