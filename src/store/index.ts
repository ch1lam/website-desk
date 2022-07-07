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
    clearUser() {
      this.$reset();
    },
  },
});
