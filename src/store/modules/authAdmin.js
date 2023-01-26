import router from "../../router";
import { AUTH_LOGIN, AUTH_LOGOUT} from "../mutation-types";

export default {
  namespaced: true,
  state: () => ({
    admin:  JSON.parse(localStorage.getItem("admin")),
  }),
  mutations: {
    [AUTH_LOGIN](state, payload) {
      state.admin = payload;
    },
    [AUTH_LOGOUT](state) {
      state.admin = null;
    },
  },
  actions: {
    login({ commit }, payload) {
        const admin = payload
        commit(AUTH_LOGIN, admin);
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      router.push('/')
      commit(AUTH_LOGOUT);
    }
  },
  getters: {
    isLogin(state) {
      return state.admin != null;
    },
  }
};