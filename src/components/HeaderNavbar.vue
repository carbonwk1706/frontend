<template>
  <v-app-bar class="app_bar" color="primary" dark>
    <v-btn class="header_action" color="white" v-if="!isLogin" @click="goToLogin">
      <v-icon class="mr-2">mdi-login</v-icon>
      LOGIN / REGISTER
    </v-btn>
    <span class="ml-3" v-if="isLogin">LOGIN สำเร็จ</span>
    <v-spacer></v-spacer>
    <v-toolbar-title class="ml-3 text-center">EBOOK</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn class="header_action" color="white" @click="goToWishlist">
      <v-icon class="mr-2">mdi-heart</v-icon>
      Wishlist
    </v-btn>
    <v-btn class="header_action" color="white"  @click="goToCart">
      <v-icon class="mr-2">mdi-cart</v-icon>
      Cart
    </v-btn>
    <v-btn class="header_action" color="white" v-if="isLogin" @click="logout">
      <v-icon class="mr-2">mdi-logout</v-icon>
      Logout
    </v-btn>
  </v-app-bar>
</template>
<script>
import router from "../router";
export default {
  methods: {
    logout(){
      this.$store.dispatch('auth/logout')
    },
    goToLogin(){
      router.push("/login")
    },
    goToWishlist(){
      router.push("/wishlist")
    },
    goToCart(){
      router.push("/cart")
    }
  },
  computed: {
    isLogin(){
      return this.$store.getters['auth/isLogin']
    }
  }
}
</script>
<style scoped>
  
.header_action {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.12);
  margin-right: 1rem;
}
.app_bar {
  background-image: linear-gradient(#00af70, #37c13d);
  color: #ffff;
}
</style>