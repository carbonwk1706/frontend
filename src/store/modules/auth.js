import router from "../../router";
import { AUTH_LOGIN, AUTH_LOGOUT, NEW_USER, NOT_NEW, SHOW_LOGIN, HIDE_LOGIN } from "../mutation-types";

export default {
  namespaced: true,
  state: () => ({
    user:  JSON.parse(localStorage.getItem("user")),
    newUser: false,
    showModal: false
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
    },
    [SHOW_LOGIN](state){
      state.showModal = true
    },
    [HIDE_LOGIN](state){
      state.showModal = false
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
      router.push('/')
      commit(AUTH_LOGOUT);
    },
    newUser({ commit }){
      commit(NEW_USER)
    },
    noNewUser({ commit }){
      commit(NOT_NEW)
    },
    showModal({ commit }){
      commit(SHOW_LOGIN)
    },
    hideModal({ commit }){
      commit(HIDE_LOGIN)
    }
  },
  getters: {
    isLogin(state) {
      return state.user != null;
    },
    getName(state){
      return state.user.name.toString()
    },
    getUsername(state){
      return state.user.username.toString()
    },
    getId(state){
      return state.user._id.toString()
    },
    isNewUser(state){
      return state.newUser
    },
    showModal(state){
      return state.showModal
    }
  },
};