import { createStore } from "vuex";
import auth from "./modules/auth";
import authAdmin from "./modules/authAdmin";
export default createStore({
  state: {
    cartList: [],
    wishList: []
  },
  getters: {
    cartListCount(state) {
      return state.cartList.length;
    },
    getTotalPrice(state) {
      var total = 0;

      state.cartList.forEach((product) => {
        total += parseInt(product.price);
      });

      return total;
    },
  },
  mutations: {
    addItemCart(state, product) {
      let duplicaProduct = state.cartList.find((item) => {
        return item._id === product._id;
      });
      if (!duplicaProduct) {
        state.cartList.push(product);
      }
    },
    delItemCart(state, product) {
      var index = state.cartList.findIndex(
        (productIndex) => productIndex._id == product
      );
      state.cartList.splice(index, 1);
    },
    addItemWish(state, product) {
      let duplicaProduct = state.wishList.find((item) => {
        return item._id === product._id;
      });
      if (!duplicaProduct) {
        state.wishList.push(product);
      }
    },
    delItemWish(state, product) {
      var index = state.wishList.findIndex(
        (productIndex) => productIndex._id == product
      );
      state.wishList.splice(index, 1);
    },
  },
  actions: {
    addItemToCart(context, product) {
      context.commit("addItemCart", product);
    },
    delItemCart(context, product) {
      context.commit("delItemCart", product);
    },
    addItemToWish(context, product) {
      context.commit("addItemWish", product);
    },
    delItemWish(context, product) {
      context.commit("delItemWish", product);
    },
  },
  modules: {
    auth,
    authAdmin,
  },
});
