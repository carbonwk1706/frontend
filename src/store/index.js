import { createStore } from "vuex";
import auth from "./modules/auth";
import authAdmin from "./modules/authAdmin";
import wishlist from "./modules/wishlist";
import cartList from "./modules/cartList";
import selectItem from "./modules/selectItem";
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    authAdmin,
    wishlist,
    cartList,
    selectItem
  },
});
