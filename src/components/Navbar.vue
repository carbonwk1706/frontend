<template>
  <v-toolbar class="app_bar">
    <v-btn
      class="px-2 mx-2 v-btn--outline header_action"
      color="white"
      v-if="!isLogin"
      @click="toggleLoginModal"
    >
      <v-icon class="font-text mr-2">mdi-login</v-icon>
      ล็อกอินเข้าสู่ระบบ / สมัครสมาชิก
    </v-btn>
    <v-menu v-if="isLogin" offset-y>
      <template v-slot:activator="{ props }">
        <v-btn class="header_action" v-bind="props">
          <v-icon class="mr-2">mdi-account</v-icon>
          <span class="font-text"> สวัสดี ID-{{ getId }}</span>
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-card max-width="auto">
        <v-card-text>
          <v-row class="pa-2">
            <v-avatar size="x-large">
              <v-img :src="getImage" cover></v-img>
            </v-avatar>
            <v-col>
              <h3 class="font-text">{{ getName }}</h3>
              <p style="color: #5a5a5a" class="mt-1 text-upper font-text">
                ID-{{ getId }}
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
          <v-divider class="my-3"></v-divider>
          <v-row>
            <v-col cols="9">
              <div class="px-3 py-2">
                <span style="font-size: 14px" class="mr-2 font-text"
                  >COIN
                </span>
                <span
                  style="font-size: 16px; color: #f58b1b"
                  class="mr-2 font-text"
                  >{{ getCoin }}</span
                >
                <span style="font-size: 14px" class="font-text">เหรียญ</span>
              </div>
            </v-col>
            <v-col cols="3">
              <div class="float-right">
                <v-btn rounded variant="text" @click="goToProfile">
                  <span class="font-text" style="color: #5a5a5a">เติมเงิน</span>
                </v-btn>
              </div></v-col
            >
          </v-row>
          <v-divider class="my-3"></v-divider>
          <v-col class="px-0">
            <v-btn
              style="color: #5a5a5a"
              rounded
              variant="text"
              @click="goToWishlist"
            >
              <span class="font-text"> รายการที่อยากได้ </span>
            </v-btn>
          </v-col>
          <v-col class="px-0">
            <v-btn
              style="color: #5a5a5a"
              rounded
              variant="text"
              @click="goToMyBook"
            >
              <span class="font-text"> ชั้นหนังสือของฉัน</span>
            </v-btn>
          </v-col>
          <v-col class="px-0">
            <v-btn
              style="color: #5a5a5a"
              rounded
              variant="text"
              @click="goToBuyHistory"
            >
              <span class="font-text"> ประวัติการสั่งซื้อของฉัน</span>
            </v-btn>
          </v-col>
          <v-divider class="my-3"></v-divider>
          <v-col class="px-0">
            <v-btn
              style="color: #5a5a5a"
              rounded
              variant="text"
              @click="goToProfile"
            >
              <span class="font-text"> จัดการบัญชี</span>
            </v-btn>
          </v-col>
        </v-card-text>
      </v-card>
    </v-menu>
    <v-btn v-if="isLogin" class="text-none" stacked>
      <v-badge content="2" color="error">
        <v-icon>mdi-bell-outline</v-icon>
      </v-badge>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn @click="goToHome">
      <v-toolbar-title class="text-center font-text">EBOOK</v-toolbar-title>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn
      class="header_action px-2 mx-2 v-btn--outline"
      color="white"
      @click="goToWishlist"
    >
      <v-icon class="mr-2">mdi-heart</v-icon>
      <span class="font-text">รายการโปรด</span>
    </v-btn>
    <v-btn
      class="header_action px-2 mx-2 v-btn--outline"
      color="white"
      @click="goToCart"
    >
      <v-icon class="mr-2">mdi-cart</v-icon>
      <span class="font-text">ตะกร้าสินค้า</span>
    </v-btn>

    <v-card-text>
      <v-text-field
        :loading="loadingSearch"
        density="compact"
        variant="solo"
        label="ค้นหาหนังสือ"
        prepend-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:prepend-inner="onClick"
      ></v-text-field>
    </v-card-text>
  </v-toolbar>
  <v-toolbar
    id="middle-nav"
    v-if="showMiddleNav"
    style="background-color: #f6f6f6"
    class="middle-nav"
    height="50"
  >
    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template  v-slot:activator="{ props }">
        <span class="text-middle" v-bind="props">
          อีบุ๊คทั้งหมด<v-icon>mdi-menu-down</v-icon>
        </span>
      </template>
      <v-card>
        <v-card-text>
          <v-col class="px-0">
            <v-btn
              style="color: #00af70"
              rounded
              variant="text"
              @click="goToWishlist"
            >
              <span class="font-text"> อีบุ๊คทั้งหมด </span>
            </v-btn>
          </v-col>
          <v-divider class="my-3"></v-divider>
          <v-col class="px-0">
            <v-btn
              style="color: #000"
              rounded
              variant="text"
              @click="goToWishlist"
            >
              <span class="font-text"> นิยายทั้งหมด </span>
            </v-btn>
          </v-col>
          <v-col class="px-0">
            <v-btn
              style="color: #000"
              rounded
              variant="text"
              @click="goToMyBook"
            >
              <span class="font-text">การ์ตูนทั้งหมด</span>
            </v-btn>
          </v-col>
          <v-divider class="my-3"></v-divider>
          <v-col class="px-0">
            <v-btn
              style="color: #5a5a5a"
              rounded
              variant="text"
              @click="goToProfile"
            >
              <span class="font-text">หมวดหมู่ทั้งหมด</span>
            </v-btn>
          </v-col>
          <v-col class="px-0">
            <v-btn
              style="color: #5a5a5a"
              rounded
              variant="text"
              @click="goToProfile"
            >
              <span class="font-text">สำนักพิมพ์</span>
            </v-btn>
          </v-col>
        </v-card-text>
      </v-card>
    </v-menu>

    <v-spacer></v-spacer>
  </v-toolbar>
  <v-toolbar
    id="bottom-nav"
    :class="showMiddleNav ? 'bottom-nav' : 'bottom-nav-2'"
    style="background-color: #f6f6f6"
    height="50"
  >
    <v-spacer></v-spacer>
    <span
      :class="home ? 'border-bottom' : 'text-menu'"
      class="font-text mr-3"
      style="color: #5a5a5a"
      @click="goToHome"
      >หน้าแรก</span
    >
    <span
      :class="bestSeller ? 'border-bottom' : 'text-menu'"
      class="text-menu font-text mr-3"
      style="color: #5a5a5a"
      @click="goToBestSeller"
      >ขายดี</span
    >
    <span
      :class="newEntry ? 'border-bottom' : 'text-menu'"
      class="text-menu font-text mr-3"
      style="color: #5a5a5a"
      @click="goToNewEntry"
      >มาใหม่</span
    >
    <span
      :class="recommend ? 'border-bottom' : 'text-menu'"
      class="text-menu font-text"
      style="color: #5a5a5a"
      @click="goToRecommend"
      >แนะนำ</span
    >
    <v-spacer></v-spacer>
  </v-toolbar>

  <Login
    :visibleModal="visibleModal"
    @update:isVisible="visibleModal = $event"
  />

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
          color="success"
        ></v-progress-circular>
      </div>
      <v-card-text class="text-center">กำลังออกจากระบบ</v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import router from "../router";
import Login from "../views/Login.vue";

window.addEventListener("scroll", function () {
  const toolbar2 = document.getElementById("bottom-nav");
  if (window.scrollY > 50) {
    toolbar2.classList.add("hide-nav");
  } else {
    toolbar2.classList.remove("hide-nav");
  }
});

export default {
  components: {
    Login,
  },
  data: () => ({
    loadingSearch: false,
    loading: false,
    visibleModal: false,
  }),
  methods: {
    onClick() {
      this.loadingSearch = true;

      setTimeout(() => {
        this.loadingSearch = false;
      }, 2000);
    },
    logout() {
      this.loading = true;
      setTimeout(() => {
        this.$store.dispatch("auth/logout");
        this.loading = false;
      }, 2000);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
    goToHome() {
      router.push("/");
    },
    toggleLoginModal() {
      this.visibleModal = !this.visibleModal;
    },
    goToWishlist() {
      router.push("/wishlist");
    },
    goToCart() {
      router.push("/cart");
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
    goToBestSeller() {
      router.push("/bestseller");
    },
    goToNewEntry() {
      router.push("/newentry");
    },
    goToRecommend() {
      router.push("/recommend");
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
    getName() {
      return this.$store.getters["auth/getName"];
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    getUsername() {
      return this.$store.getters["auth/getUsername"];
    },
    getImage() {
      return this.$store.getters["auth/getImage"];
    },
    getCoin() {
      return this.$store.getters["auth/getCoin"];
    },
    showMiddleNav() {
      return ["/", "/bestseller", "/newentry", "/recommend"].includes(
        this.$route.path
      );
    },
    home() {
      return ["/"].includes(this.$route.path);
    },
    bestSeller() {
      return ["/bestseller"].includes(this.$route.path);
    },
    newEntry() {
      return ["/newentry"].includes(this.$route.path);
    },
    recommend() {
      return ["/recommend"].includes(this.$route.path);
    },
  },
  mounted() {
    this.visibleModal = false;
  },
};
</script>
<style scoped>
.hide-nav {
  transform: translateY(-100%);
}
.text-middle {
  cursor: pointer;
  font-family: Prompt, sans-serif;
  font-size: 26px;
}
.header_action {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.12);
}
.app_bar {
  background-image: linear-gradient(#00af70, #37c13d);
  color: #ffff;
  position: sticky;
  top: 0;
  z-index: 1;
}
.middle-nav {
  position: sticky;
  top: 64px;
  z-index: 1;
}
.bottom-nav-2 {
  position: sticky;
  top: 64px;
  z-index: 1;
  transition: all 0s;
  transform: translateY(0%);
}
.bottom-nav {
  position: sticky;
  top: 114px;
  z-index: 1;
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
.text-upper {
  text-transform: uppercase;
}
.font-text {
  font-family: Prompt, sans-serif;
}
.text-menu:hover {
  cursor: pointer;
  border-bottom: 3px solid #00af70;
}
.border-bottom {
  cursor: pointer;
  border-bottom: 3px solid #00af70;
}
</style>
