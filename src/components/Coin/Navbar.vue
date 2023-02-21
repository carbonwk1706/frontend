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
          <v-row class="pa-2">
            <v-avatar size="x-large">
              <v-img :src="user.imageUrl" cover></v-img>
            </v-avatar>
            <v-col>
              <h3 class="font-text">{{ user.name }}</h3>
              <p style="color: #5a5a5a" class="mt-1 text-upper font-text">
                ID-{{ user._id }}
              </p>
              <div class="d-flex flex justify-end mt-2">
                <v-btn
                  class="rounded-pill px-4 py-0"
                  variant="outlined"
                  color="error"
                  @click="logout"
                >
                  <span class="font-text" style="font-size: 12px"
                    >ออกจากระบบ</span
                  >
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <v-divider class="my-1"></v-divider>
          <v-row>
            <v-col cols="9">
              <div class="px-3 py-2">
                <span style="font-size: 14px" class="mr-2 font-text"
                  >COIN
                </span>
                <span
                  style="font-size: 16px; color: #f58b1b"
                  class="mr-2 font-text"
                  >{{ user.coin }}</span
                >
                <span style="font-size: 14px" class="font-text">เหรียญ</span>
              </div>
            </v-col>
            <v-col cols="3">
              <div class="float-right">
                <v-btn rounded variant="text" @click="goToAddCoin">
                  <span class="font-text" style="color: #5a5a5a">เติม Coin</span>
                </v-btn>
              </div></v-col
            >
          </v-row>
          <v-divider class="my-1"></v-divider>
          <v-col class="px-0">
            <v-btn
              style="color: #5a5a5a"
              rounded
              variant="text"
              @click="goToWishlist"
            >
              <span class="font-text">รายการที่อยากได้ </span>
            </v-btn>
          </v-col>
          <v-col class="px-0">
            <v-btn
              style="color: #5a5a5a"
              rounded
              variant="text"
              @click="goToMyBook"
            >
              <span class="font-text">ชั้นหนังสือของฉัน</span>
            </v-btn>
          </v-col>
          <v-col class="px-0">
            <v-btn
              style="color: #5a5a5a"
              rounded
              variant="text"
              @click="goToBuyHistory"
            >
              <span class="font-text">ประวัติการสั่งซื้อของฉัน</span>
            </v-btn>
          </v-col>
          <v-col class="px-0">
            <v-btn
              style="color: #5a5a5a"
              rounded
              variant="text"
              @click="goToCoinHistory"
            >
              <span class="font-text">ประวัติการเติม Coin</span>
            </v-btn>
          </v-col>
          <v-divider class="my-1"></v-divider>
          <v-col class="px-0">
            <v-btn
              style="color: #5a5a5a"
              rounded
              variant="text"
              @click="goToProfile"
            >
              <span class="font-text">จัดการบัญชี</span>
            </v-btn>
          </v-col>
          <v-divider class="my-1"></v-divider>
          <v-col class="px-0">
            <v-btn
              v-if="!hasSellRole"
              style="color: #5a5a5a"
              rounded
              variant="text"
              @click="goToRegisterSell"
            >
              <span class="font-text">สมัครขายอีบุ๊ค</span>
            </v-btn>
            <v-btn
              v-if="hasSellRole"
              style="color: #5a5a5a"
              rounded
              variant="text"
              @click="goToMyShop"
            >
              <span class="font-text">ร้านค้าของฉัน</span>
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
      checkRoles: null,
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
    goToCoinHistory() {
      router.push("/coinhistory");
    },
    goToHome() {
      router.push("/");
    },
    goToProfile() {
      router.push("/profile");
    },
    goToMyBook() {
      router.push("/mybook");
    },
    goToBuyHistory() {
      router.push("/orderhistory");
    },
    goToWishlist() {
      router.push("/wishlist");
    },
    goToRegisterSell() {
      router.push("/registersell");
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
    hasSellRole() {
      return this.user.roles.includes("SELL");
    },
  },
  mounted() {
    if (this.isLogin) {
      this.fetchApi();
    }
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
