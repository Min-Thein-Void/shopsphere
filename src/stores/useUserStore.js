import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("auth_token") || null,
    isAuthenticated:
      !!localStorage.getItem("auth_token") && !!localStorage.getItem("user"),
  }),
  getters: {
    getUser: (state) => state.user,
    getUserName: (state) => (state.user ? state.user.name : ""),
    getUserId: (state) => state.user?.id,
  },
  actions: {
    setUser(userData) {
      this.user = userData;
      this.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(userData));
    },
    setToken(token) {
      this.token = token;
      this.isAuthenticated = true;
      localStorage.setItem("auth_token", token);
    },
    clearUser() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("auth_token");
    },
  },
});
