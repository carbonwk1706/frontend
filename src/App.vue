<template>
  <v-app>
    <v-app-bar class="app_bar" color="primary" dark>
      <v-btn class="header_action" color="white" @click="goToLogin">
        <v-icon class="mr-2">mdi-login</v-icon>
        LOGIN / REGISTER
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title class="ml-3 text-center">EBOOK</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="header_action" color="white" @click="goToWishlist">
        <v-icon class="mr-2">mdi-heart</v-icon>
        Wishlist
      </v-btn>
      <v-btn class="header_action" color="white" @click="goToCart">
        <v-icon class="mr-2">mdi-cart</v-icon>
        Cart
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-row>
          <router-view />
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
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
