import { SET_SELECTED_ITEMS } from "../mutation-types";

export default{
  namespaced: true,
  state:{
    selectedItems: []
  },
  mutations: {
    [SET_SELECTED_ITEMS] (state, payload) {
      state.selectedItems = payload
    }
  },
  actions: {
    setSelectedItems ({ commit }, payload) {
      commit('SET_SELECTED_ITEMS', payload)
    }
  },
  getters: {
    selectedItem(state) {
      return state.selectedItems
    }
  },
}