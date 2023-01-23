import router from "../../router";
import { AUTH_LOGIN, AUTH_LOGOUT, NEW_USER, NOT_NEW, SHOW_LOGIN, HIDE_LOGIN, SHOW_REGISTER, HIDE_REGISTER } from "../mutation-types";

export default {
  namespaced: true,
  state: () => ({
    user:  JSON.parse(localStorage.getItem("user")),
    newUser: false,
    loginModal: false,
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
    },
    [SHOW_LOGIN](state){
      state.loginModal = true
    },
    [HIDE_LOGIN](state){
      state.loginModal = false
    },
    [SHOW_REGISTER](state){
      state.registerModal = true
    },
    [HIDE_REGISTER](state){
      state.registerModal = false
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
    showLogin({ commit }){
      commit(SHOW_LOGIN)
    },
    hideLogin({ commit }){
      commit(HIDE_LOGIN)
    },
    showRegister({ commit }){
      commit(SHOW_REGISTER)
    },
    hideRegister({ commit }){
      commit(HIDE_REGISTER)
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
    loginModal(state){
      return state.loginModal
    },
    registerModal(state){
      return state.registerModal
    }
  },
};