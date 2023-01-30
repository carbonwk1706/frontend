import { createStore } from 'vuex'
import auth from './modules/auth'
import authAdmin from './modules/authAdmin'
export default createStore({
  state: {
    cartList: []
  },
  getters: {
    cartListCount(state){
      return state.cartList.length;
    }
  },
  mutations: {
     addItem(state, item){
      state.cartList.push(item)
     },
     delItem(state, product){
      var index = state.cartList.findIndex(productIndex => productIndex.id == product)
      state.cartList.splice(index, 1)
    }
  },
  actions: {
    addItemToCart(context, item){
      context.commit('addItem', item)
    },
    delItemCart(context, product){
      context.commit('delItem', product)
    }
  },
  modules: {
    auth,
    authAdmin
  }
})
