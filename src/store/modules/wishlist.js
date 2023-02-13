import { SET_WISHLIST } from "../mutation-types";

export default{
  namespaced: true,
  state:{
    wishList: []
  },
  mutations: {
    [SET_WISHLIST](state, payload){
      state.wishList = payload
    }
  },
  actions: {
    setWishList({commit}, payload){
      const wishListCount = payload
      commit(SET_WISHLIST, wishListCount)
    }
  },getters: {
    wishListCount(state) {
      return state.wishList.length;
    }
  },
}