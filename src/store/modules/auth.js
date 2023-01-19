import api from "../../services/api";
import router from "../../router";
import { AUTH_LOGIN, AUTH_LOGOUT } from "../mutation-types";

export default {
  namespaced: true,
  state: () => ({
    user:  JSON.parse(localStorage.getItem("user"))
  }),
  mutations: {
    [AUTH_LOGIN](state, payload) {
      state.user = payload;
    },
    [AUTH_LOGOUT](state) {
      state.user = null;
    },
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const res = await api.post("/auth/login", {
          username: payload.username,
          password: payload.password,
        });
        const user = res.data.user;
        const token = res.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user",JSON.stringify(user));
        router.push("/");
        commit(AUTH_LOGIN, user);
      } catch (e) {
        console.log('Error')
      }
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push('/')
      commit(AUTH_LOGOUT);
    },
  },
  getters: {
    isLogin(state) {
      return state.user != null;
    },
  },
};