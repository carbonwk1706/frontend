<template>
  <v-toolbar class="app_bar">
    <v-btn
      class="px-2 mx-2 v-btn--outline header_action"
      color="white"
      v-if="!isLogin"
      @click="goToLogin"
    >
      <v-icon class="mr-2">mdi-login</v-icon>
      ล็อกอินเข้าสู่ระบบ / สมัครสมาชิก
    </v-btn>
    <v-menu v-if="isLogin" offset-y>
      <template v-slot:activator="{ props }">
        <v-btn class="header_action" v-bind="props" @click="toggleMenu">
          <v-icon class="mr-2">mdi-account</v-icon>
          <span> สวัสดี {{ getName() }}</span>
          <v-icon v-if="!toggle">mdi-menu-down</v-icon>
          <v-icon v-else>mdi-menu-up</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <v-avatar color="brown">
              <span class="text-h5">{{ user.initials }}</span>
            </v-avatar>
            <h3>{{ getName() }}</h3>
            <p class="text-caption mt-1">
              {{ getUsername() }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn rounded variant="text"> แก้ไขโปรไฟล์ </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn rounded variant="text"> Disconnect </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
    <v-spacer></v-spacer>
    <v-btn @click="goToHome">
      <v-toolbar-title class="text-center">EBOOK</v-toolbar-title>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn
      class="header_action px-2 mx-2 v-btn--outline"
      color="white"
      @click="goToWishlist"
    >
      <v-icon class="mr-2">mdi-heart</v-icon>
      รายการโปรด
    </v-btn>
    <v-btn
      class="header_action px-2 mx-2 v-btn--outline"
      color="white"
      @click="goToCart"
    >
      <v-icon class="mr-2">mdi-cart</v-icon>
      ตะกร้าสินค้า
    </v-btn>
    <v-btn
      class="header_action px-2 mx-2 v-btn--outline"
      color="white"
      v-if="isLogin"
      @click="logout"
    >
      <v-icon class="mr-2">mdi-logout</v-icon>
      Logout
    </v-btn>
  </v-toolbar>
</template>
<script>
import router from "../router";
export default {
  data: () => ({
    user: {
      initials: "JD",
      fullName: "John Doe",
      email: "john.doe@doe.com",
    },
    toggle: false
  }),
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    },
    goToHome(){
      router.push("/")
    },
    goToLogin() {
      router.push("/login");
    },
    goToWishlist() {
      router.push("/wishlist");
    },
    goToCart() {
      router.push("/cart");
    },
    getName() {
      return this.$store.getters["auth/getName"];
    },
    getUsername(){
      return this.$store.getters["auth/getUsername"];
    },
    toggleMenu(){
      this.toggle = !this.toggle
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
};
</script>
<style scoped>
.header_action {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.12);
}
.app_bar {
  background-image: linear-gradient(#00af70, #37c13d);
  color: #ffff;
}
</style>
