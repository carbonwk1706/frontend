import { SET_RECEIPT } from "../mutation-types"

export default{
  namespaced: true,
  state:{
    receipt: null
  },
  mutations:{
    [SET_RECEIPT] (state, payload){
      state.receipt = payload
    }
  },
  actions: {
    setReceipt ({ commit }, payload) {
      commit('SET_RECEIPT', payload)
    }
  },
  getters:{
    getReceipt(state) {
      return state.receipt
    }
  }
}