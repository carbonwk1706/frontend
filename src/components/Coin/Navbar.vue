<template>
  <v-toolbar class="app_bar">
    <v-btn icon @click="goToHome">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-spacer></v-spacer>

    <v-toolbar-title class="text-start font-text">EBOOK-COIN</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props">
          <v-icon class="mr-2">mdi-account</v-icon>
          <span class="font-text"> {{ user._id }}</span>
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-card max-width="auto">
        <v-card-text>
          <v-col class="px-0">
            <v-btn
              style="color: #5a5a5a"
              rounded
              variant="text"
              @click="goToAddCoin"
            >
              <span class="font-text">เติม coin</span>
            </v-btn>
          </v-col>
          <v-col class="px-0">
            <v-btn
              style="color: #5a5a5a"
              rounded
              variant="text"
              @click="goToHistory"
            >
              <span class="font-text">ประวัติการสั่งซื้อ</span>
            </v-btn>
          </v-col>
          <v-col class="px-0">
            <v-btn
              style="color: #5a5a5a"
              rounded
              variant="text"
              @click="logout"
            >
              <span class="font-text">ออกจากระบบ</span>
            </v-btn>
          </v-col>
        </v-card-text>
      </v-card>
    </v-menu>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>

<script>
import api from "@/services/api";
import router from "@/router";

export default {
  name: "CoinNavbar",
  data() {
    return {
      user: [],
    };
  },
  methods: {
    async fetchApi() {
      const res = await api.get("/profile/" + this.getId());
      this.user = res.data.user;
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    logout() {
      this.loading = true;
      setTimeout(() => {
        this.$store.dispatch("auth/logout");
        this.loading = false;
      }, 2000);
      router.push("/");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    goToAddCoin() {
      router.push("/coin");
    },
    goToHistory() {
      console.log("history");
    },
    goToHome() {
      router.push("/");
    },
  },
  mounted() {
    this.fetchApi();
  },
};
</script>

<style scoped>
.app_bar {
  background-color: #f58b1b;
  color: #ffff;
  top: 0;
  z-index: 1;
}

</style>
