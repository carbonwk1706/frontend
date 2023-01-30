import { createStore } from 'vuex'
import auth from './modules/auth'
import authAdmin from './modules/authAdmin'
export default createStore({
  state: {
    cartList: []
  },
  getters: {
  },
  mutations: {
     addItem(state, item){
      state.cartList.push(item)
     }
  },
  actions: {
    addItemToCart(context, item){
      context.commit('addItem', item)
    }
  },
  modules: {
    auth,
    authAdmin
  }
})
