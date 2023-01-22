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
          <span> สวัสดี ID-{{ getId() }}</span>
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
            <v-btn rounded variant="text">
              แก้ไขโปรไฟล์
            </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn rounded variant="text" @click="logout"> ออกจากระบบ </v-btn>
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
  </v-toolbar>

  <Login  />

  <v-dialog v-model="loading" max-width="500">
    <v-card>
      <v-card-title class="center">
        <div class="img-size">
          <v-img src="https://media.tenor.com/oGpz_hpmmTQAAAAi/cute.gif">
          </v-img>
        </div>
      </v-card-title>
      <div class="center-loading">
        <v-progress-circular
          v-if="loading"
          :size="50"
          :width="5"
          indeterminate
          color="success"
        ></v-progress-circular>
      </div>
      <v-card-text class="text-center">กำลังออกจากระบบ</v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import router from "../router";
import Login from "../views/Login.vue"

export default {
  components:{
    Login
  },
  data: () => ({
    user: {
      initials: "JD",
      fullName: "John Doe",
      email: "john.doe@doe.com",
    },
    toggle: false,
    loading: false,
  }),
  methods: {
    logout() {
      this.loading = true;
      setTimeout(() => {
        this.$store.dispatch("auth/logout");
        this.loading = false;
      }, 2000);
    },
    goToHome() {
      router.push("/");
    },
    goToLogin() {
      this.$store.dispatch("auth/showLogin");
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
    getUsername() {
      return this.$store.getters["auth/getUsername"];
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    toggleMenu() {
      this.toggle = !this.toggle;
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
}
.app_bar {
  background-image: linear-gradient(#00af70, #37c13d);
  color: #ffff;
}
.center-loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-size {
  width: 100px;
}
</style>
