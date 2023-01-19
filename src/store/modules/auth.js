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
    login({ commit }, payload) {
        const user = payload
        commit(AUTH_LOGIN, user);
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
    getName(state){
      return state.user.name.toString()
    }
  },
};