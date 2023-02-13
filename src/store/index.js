import { createStore } from "vuex";
import auth from "./modules/auth";
import authAdmin from "./modules/authAdmin";
import wishlist from "./modules/wishlist";
import cartList from "./modules/cartList";
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    authAdmin,
    wishlist,
    cartList
  },
});
