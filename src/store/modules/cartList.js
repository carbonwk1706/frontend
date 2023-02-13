import { SET_CARTLIST } from "../mutation-types";

export default{
  namespaced: true,
  state:{
    cartList: []
  },
  mutations: {
    [SET_CARTLIST](state, payload){
      state.cartList = payload
    }
  },
  actions: {
    setCartList({commit}, payload){
      const cartListCount = payload
      commit(SET_CARTLIST, cartListCount)
    }
  },getters: {
    cartListCount(state) {
      return state.cartList.length;
    }
  },
}