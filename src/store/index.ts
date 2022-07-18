import { defineStore } from "pinia";
import { getToken } from "../utils/auth";

interface State {
  username: string;
  token: string;
  avatarUrl: string;
  role: string;
}

export const useStore = defineStore("main", {
  state: (): State => ({
    username: "",
    token: getToken() ?? "",
    avatarUrl: "",
    role: "",
  }),

  getters: {},
  actions: {
    setUsername(username: string) {
      this.username = username;
    },
    setToken(token: string) {
      this.token = token;
    },
    setAvatarUrl(avatarUrl: string) {
      this.avatarUrl = avatarUrl;
    },
    setRole(role: string) {
      this.role = role;
    },
    clearUser() {
      this.$reset();
    },
  },
});
