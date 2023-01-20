<template>
  <v-app-bar class="app_bar">
    <v-btn
      class="header_action"
      color="white"
      v-if="!isLogin"
      @click="goToLogin"
    >
      <v-icon class="mr-2">mdi-login</v-icon>
      ล็อกอินเข้าสู่ระบบ / สมัครสมาชิก
    </v-btn>
    <div v-if="isLogin" class="ml-5">
      <v-row>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn class="header_action" v-bind="props">
              <v-icon class="mr-2">mdi-login</v-icon>
              สวัสดี {{ getName() }}
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar color="brown">
                  <span class="text-h5">{{ user.initials }}</span>
                </v-avatar>
                <h3>{{ user.fullName }}</h3>
                <p class="text-caption mt-1">
                  {{ user.email }}
                </p>
                <v-divider class="my-3"></v-divider>
                <v-btn rounded variant="text"> Edit Account </v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn rounded variant="text"> Disconnect </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-row>
    </div>
    <v-spacer></v-spacer>
    <v-toolbar-title class="align-center text-center">EBOOK</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn class="header_action" color="white" @click="goToWishlist">
      <v-icon class="mr-2">mdi-heart</v-icon>
      รายการโปรด
    </v-btn>
    <v-btn class="header_action" color="white" @click="goToCart">
      <v-icon class="mr-2">mdi-cart</v-icon>
      ตะกร้าสินค้า
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
  data: () => ({
    user: {
      initials: "JD",
      fullName: "John Doe",
      email: "john.doe@doe.com",
    },
  }),
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
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
  margin-right: 1rem;
}
.app_bar {
  background-image: linear-gradient(#00af70, #37c13d);
  color: #ffff;
}
</style>
