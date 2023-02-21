<template>
  <v-toolbar class="app_bar">
    <v-btn icon @click="goToHome">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>

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
  </v-toolbar>

  <v-dialog v-model="loading" max-width="500" persistent>
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
          color="#f58b1b"
        ></v-progress-circular>
      </div>
      <v-card-text class="text-center">กำลังออกจากระบบ</v-card-text>
    </v-card>
  </v-dialog>

</template>

<script>
import api from "@/services/api";
import router from "@/router";

export default {
  name: "CoinNavbar",
  data() {
    return {
      user: [],
      loading: false,
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
      setTimeout(() => {
        router.push("/");
      }, 2000);
    },
    goToAddCoin() {
      router.push("/coin");
    },
    goToHistory() {
      router.push("/coinhistory")
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
}

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-size {
  width: 100px;
}

.font-text {
  font-family: Prompt, sans-serif;
}
.center-loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
