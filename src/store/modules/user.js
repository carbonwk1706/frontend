import { FETCH_API } from "../mutation-types";

export default{
  namespaced: true,
  state:{
    updateUser: false
  },
  mutations: {
    [FETCH_API](state, payload){
      state.updateUser = payload
    }
  },
  actions: {
    setUpdateUser({commit}, payload){
      const user = payload
      commit(FETCH_API, user)
    }
  },getters: {
    fetchApi(state) {
      return state.updateUser
    }
  },
}