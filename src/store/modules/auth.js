import { AUTH_LOGIN, AUTH_LOGOUT, NEW_USER, NOT_NEW} from "../mutation-types";

export default {
  namespaced: true,
  state: () => ({
    user:  JSON.parse(localStorage.getItem("user")),
    newUser: false,
    registerModal: false
  }),
  mutations: {
    [AUTH_LOGIN](state, payload) {
      state.user = payload;
    },
    [AUTH_LOGOUT](state) {
      state.user = null;
    },
    [NEW_USER](state) {
      state.newUser = true;
    },
    [NOT_NEW](state) {
      state.newUser = false;
    }
  },
  actions: {
    login({ commit }, payload) {
        const user = payload
        commit(AUTH_LOGIN, user);
    },
    logout({ commit }) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      commit(AUTH_LOGOUT);
    },
    newUser({ commit }){
      commit(NEW_USER)
    },
    noNewUser({ commit }){
      commit(NOT_NEW)
    }
  },
  getters: {
    isLogin(state) {
      return state.user != null;
    },
    getName(state){
      return state.user.name.toString()
    },
    getId(state){
      return state.user._id.toString()
    },
    isNewUser(state){
      return state.newUser
    },
  },
};