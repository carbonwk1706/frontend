<template>
  <v-toolbar class="app_bar">
    <v-row>
      <v-col cols="6" class="d-flex justify-start">
        <v-icon class="ml-2" @click="goToHome">mdi-chevron-left</v-icon>

        <v-toolbar-title class="font-text">EBOOK-COIN</v-toolbar-title>
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props">
              <v-icon class="mr-2">mdi-account</v-icon>
              <span class="font-text hide-on-mobile" v-if="screenWidth > 480">
                {{ user.username }}</span
              >
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
                    <span style="font-size: 14px" class="font-text"
                      >เหรียญ</span
                    >
                  </div>
                </v-col>
                <v-col cols="3">
                  <div class="float-right">
                    <v-btn rounded variant="text" @click="goToAddCoin">
                      <span class="font-text" style="color: #5a5a5a"
                        >เติม Coin</span
                      >
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
                  @click="goToBuyHistory"
                >
                  <span class="font-text">ประวัติการสั่งซื้อของฉัน</span>
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
      </v-col>
    </v-row>
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
          color="#00af70"
        ></v-progress-circular>
      </div>
      <v-card-text class="text-center">กำลังออกจากระบบ</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/api";
import router from "@/router";
import io from "socket.io-client";

export default {
  name: "CoinNavbar",
  data() {
    return {
      user: [],
      checkRoles: null,
      loading: false,
      socket: null,
      screenWidth: 0,
      socketioURL: "http://localhost:3000",
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
    this.screenWidth = window.innerWidth;
    window.addEventListener("resize", this.handleResize);
    if (this.isLogin) {
      this.fetchApi();
    }
  },
  async created() {
    this.socket = io(this.socketioURL, {
      transports: ["websocket", "polling"],
    });
    this.socket.on("receipt-approved", () => {
      this.fetchApi();
    });
  },
};
</script>

<style scoped>
.app_bar {
  background-color: #00af70;
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
.text-upper {
  text-transform: uppercase;
}
.font-text {
  font-family: Prompt, sans-serif;
  font-size: 16px;
}
.center-loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (max-width: 600px) {
  .hide-on-mobile {
    display: none;
  }
}
</style>
