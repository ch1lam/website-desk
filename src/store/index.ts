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
