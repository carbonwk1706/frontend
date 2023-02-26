<template>
  <v-toolbar class="app_bar">
    <v-row>
      <v-col cols="4" class="d-flex justify-start align-center">
        <v-btn
          class="px-2 mx-2 v-btn--outline header_action"
          color="white"
          v-if="!isLogin"
          @click="toggleLoginModal"
        >
          <v-icon class="font-text mr-2">mdi-login</v-icon>
          <span v-if="screenWidth > 900">ล็อกอินเข้าสู่ระบบ / สมัครสมาชิก</span>
        </v-btn>
        <v-menu v-if="isLogin" offset-y>
          <template v-slot:activator="{ props }">
            <v-btn class="header_action" v-bind="props">
              <v-icon class="mr-2">mdi-account</v-icon>
              <span class="font-text" v-if="screenWidth > 1050">
                สวัสดี {{ user.username }}</span
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
        <v-btn v-if="isLogin" class="text-none" stacked>
          <v-menu offset-y max-width="500">
            <template v-slot:activator="{ props }">
              <v-badge
                v-if="notification.length > 0"
                :content="notification.length"
                color="error"
                v-bind="props"
              >
                <v-icon>mdi-bell-outline</v-icon>
              </v-badge>
              <v-icon v-else v-bind="props">mdi-bell-outline</v-icon>
            </template>
            <v-card width="400px">
              <v-card-text>
                <v-row class="pa-2">
                  <v-col cols="6" class="d-flex justify-start"
                    ><h3>แจ้งเตือน</h3></v-col
                  >
                  <v-col cols="6" class="d-flex justify-end"
                    ><v-icon @click="clearNotifications"
                      >mdi-trash-can</v-icon
                    ></v-col
                  >
                </v-row>
                <v-divider class="my-2"></v-divider>
                <v-row v-if="notification.length > 0" class="pa-2">
                  <v-col
                    v-for="(item, index) in reversedNotifications"
                    :key="index"
                    class="pa-2"
                    cols="12"
                  >
                    <v-card class="px-3 py-2">
                      <h4>{{ item.type }}</h4>
                      <p>{{ item.message }}</p>
                      <p>เวลา {{ item.createdAt }}</p>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row v-else class="pa-2">
                  <v-col cols="12" class="pa-2">
                    <p class="text-center">ไม่มีข้อมูลการแจ้งเตือน</p>
                  </v-col>
                </v-row>
                <v-divider
                  v-if="notification.length > 0"
                  class="my-2"
                ></v-divider>
              </v-card-text>
            </v-card>
          </v-menu>
        </v-btn>
      </v-col>
      <v-col cols="4" class="d-flex justify-center align-center">
        <v-btn @click="goToHome">
          <v-toolbar-title class="text-center font-text">EBOOK</v-toolbar-title>
        </v-btn>
      </v-col>
      <v-col cols="4" class="d-flex justify-end align-center">
        <div v-if="screenWidth > 900">
          <v-btn
            class="header_action px-2 mx-2 v-btn--outline"
            color="white"
            @click="goToWishlist"
            v-if="getWishListCount === 0 || !isLogin"
          >
            <v-icon>mdi-heart</v-icon>
            <span class="font-text">รายการโปรด</span>
          </v-btn>

          <v-badge v-else :content="getWishListCount" color="error">
            <v-btn
              class="header_action px-2 mx-2 v-btn--outline"
              color="white"
              @click="goToWishlist"
            >
              <v-icon>mdi-heart</v-icon>
              <span class="font-text" v-if="screenWidth > 900">รายการโปรด</span>
            </v-btn>
          </v-badge>
        </div>
        <div class="mr-4" v-else>
          <v-icon
            v-if="getWishListCount === 0 || !isLogin"
            @click="goToWishlist"
            >mdi-heart</v-icon
          >
          <v-badge v-else :content="getWishListCount" color="error">
            <v-icon @click="goToWishlist">mdi-heart</v-icon>
          </v-badge>
        </div>

        <div v-if="screenWidth > 900">
          <v-btn
            class="header_action px-2 mx-2 v-btn--outline"
            color="white"
            @click="goToCart"
            v-if="getCartListCount === 0 || !isLogin"
          >
            <v-icon>mdi-cart</v-icon>
            <span class="font-text" v-if="screenWidth > 900">ตะกร้าสินค้า</span>
          </v-btn>
          <v-badge v-else :content="getCartListCount" color="error">
            <v-btn
              class="header_action px-2 mx-2 v-btn--outline"
              color="white"
              @click="goToCart"
            >
              <v-icon>mdi-cart</v-icon>

              <span class="font-text" v-if="screenWidth > 900"
                >ตะกร้าสินค้า</span
              >
            </v-btn>
          </v-badge>
        </div>
        <div class="mr-4" v-else>
          <v-icon v-if="getCartListCount === 0 || !isLogin" @click="goToCart"
            >mdi-cart</v-icon
          >
          <v-badge v-else :content="getWishListCount" color="error">
            <v-icon @click="goToCart">mdi-cart</v-icon>
          </v-badge>
        </div>

        <v-card-text v-if="screenWidth > 1200">
          <v-text-field
            :loading="loadingSearch"
            density="compact"
            variant="solo"
            label="ค้นหาหนังสือ"
            v-model="searchTerm"
            prepend-inner-icon="mdi-magnify"
            single-line
            hide-details
            @click:prepend-inner="handleSearch"
            @keyup.enter="handleSearch"
          ></v-text-field>
        </v-card-text>
        <v-icon v-else class="mr-3" @click="handleSearch">mdi-magnify</v-icon>
      </v-col>
    </v-row>
  </v-toolbar>
  <v-toolbar
    id="middle-nav"
    v-if="showMiddleNav"
    style="background-color: #f6f6f6"
    class="middle-nav"
    :class="screenWidth <= 990 ? 'pl-4' : ''"
    height="50"
  >
    <v-spacer v-if="screenWidth > 990"></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
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
              @click="goToAllBooks"
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
              @click="goToAllNovel"
            >
              <span class="font-text"> นิยายทั้งหมด </span>
            </v-btn>
          </v-col>
          <v-col class="px-0">
            <v-btn
              style="color: #000"
              rounded
              variant="text"
              @click="goToAllCartoon"
            >
              <span class="font-text">การ์ตูนทั้งหมด</span>
            </v-btn>
          </v-col>
        </v-card-text>
      </v-card>
    </v-menu>

    <v-spacer v-if="screenWidth > 990"></v-spacer>
  </v-toolbar>
  <v-toolbar
    id="bottom-nav"
    :class="[
      showMiddleNav ? 'bottom-nav' : 'bottom-nav-2',
      screenWidth <= 990 ? 'pl-4' : '',
    ]"
    style="background-color: #f6f6f6"
    height="50"
  >
    <v-spacer v-if="screenWidth > 990"></v-spacer>
    <v-menu offset-y v-if="!showMiddleNav">
      <template v-slot:activator="{ props }">
        <span class="font-text text-cursor mr-3" v-bind="props">
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
              @click="goToAllBooks"
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
              @click="goToAllNovel"
            >
              <span class="font-text"> นิยายทั้งหมด </span>
            </v-btn>
          </v-col>
          <v-col class="px-0">
            <v-btn
              style="color: #000"
              rounded
              variant="text"
              @click="goToAllCartoon"
            >
              <span class="font-text">การ์ตูนทั้งหมด</span>
            </v-btn>
          </v-col>
        </v-card-text>
      </v-card>
    </v-menu>
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
      :class="halloffame ? 'border-bottom' : 'text-menu'"
      class="text-menu font-text mr-3"
      style="color: #5a5a5a"
      @click="goToHalloffame"
      >ฮิตขึ้นหิ้ง</span
    >
    <span
      :class="recommend ? 'border-bottom' : 'text-menu'"
      class="text-menu font-text"
      style="color: #5a5a5a"
      @click="goToRecommend"
      >แนะนำ</span
    >
    <v-spacer v-if="screenWidth > 990"></v-spacer>
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
import api from "@/services/api";
import router from "../router";
import Login from "../views/User/Login.vue";
import io from "socket.io-client";
export default {
  components: {
    Login,
  },
  data: () => ({
    checkRoles: null,
    loadingSearch: false,
    loading: false,
    visibleModal: false,
    searchTerm: "",
    screenWidth: 0,
    user: [],
    notification: [],
    socket: null,
    socketioURL: "http://localhost:3000",
  }),
  methods: {
    handleSearch() {
      this.loadingSearch = true;
      setTimeout(() => {
        if (this.searchTerm) {
          this.loadingSearch = false;
          router.push({
            name: "search",
            params: {
              searchTerm: this.searchTerm,
            },
          });
          this.searchTerm = "";
        } else {
          this.loadingSearch = false;
          router.push({
            name: "search",
            params: {
              searchTerm: "",
            },
          });
        }
      }, 1000);
    },
    logout() {
      this.loading = true;
      router.push("/");
      setTimeout(() => {
        this.$store.dispatch("auth/logout");
        this.loading = false;
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
    goToAllBooks() {
      router.push("/books/all");
    },
    goToAllCartoon() {
      router.push("/books/cartoon/all");
    },
    goToAllNovel() {
      router.push("/books/novel/all");
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
    goToCoinHistory() {
      router.push("/coinhistory");
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
    goToMyShop() {
      router.push("/");
    },
    goToRegisterSell() {
      router.push("/registersell");
    },
    goToHalloffame() {
      router.push("/halloffame");
    },
    async fetchApi() {
      const res = await api.get("/profile/" + this.getId());
      this.user = res.data.user;
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    goToAddCoin() {
      router.push("/coin");
    },
    async getWishList() {
      const res = await api.get("/wishlist/" + this.getId());
      this.wishList = res.data;
      this.$store.dispatch("wishlist/setWishList", this.wishList);
    },
    getCartList() {
      api.get("/cart/" + this.getId()).then((result) => {
        if (result.data !== null) {
          this.cartList = result.data.items;
          this.$store.dispatch("cartList/setCartList", this.cartList);
        }
      });
    },
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
    async clearNotifications() {
      if (this.notification.length > 0) {
        this.$swal({
          scrollbarPadding: false,
          confirmButtonColor: "#00af70",
          cancelButtonColor: "#999999",
          showCancelButton: true,
          allowOutsideClick: false,
          width: "500",
          text: "คุณต้องการที่จะล้างข้อมูลการแจ้งเตือนทั้งหมดใช่หรือไม่?",
          icon: "warning",
          confirmButtonText: "ใช่ฉันต้องการลบ",
          cancelButtonText: "เอาไว้ก่อน",
        }).then((result) => {
          if (result.value) {
            api.delete("/notifications/" + this.getId()).then(() => {
              this.getNotification();
              this.$swal({
                scrollbarPadding: false,
                allowOutsideClick: false,
                confirmButtonColor: "#00af70",
                text: "ล้างข้อมูลการแจ้งเตือนเรียบร้อยแล้ว",
                icon: "success",
                confirmButtonText: "OK",
              });
            });
          }
        });
      } else {
        this.$swal({
          scrollbarPadding: false,
          confirmButtonColor: "#00af70",
          allowOutsideClick: false,
          width: "500",
          text: "คุณล้างข้อมูลการแจ้งหมดแล้ว",
          icon: "warning",
          confirmButtonText: "OK",
        });
      }
    },
    async getNotification() {
      const res = await api.get("/notifications/" + this.getId());
      if (res.data.notifications.length === 0) {
        this.notification = [];
      } else {
        this.notification = res.data.notifications.map((item) =>
          JSON.parse(item)
        );
      }
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
    reversedNotifications() {
      return this.notification.slice().reverse();
    },
    showMiddleNav() {
      return [
        "/",
        "/bestseller",
        "/newentry",
        "/halloffame",
        "/recommend",
      ].includes(this.$route.path);
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
    halloffame() {
      return ["/halloffame"].includes(this.$route.path);
    },
    hasSellRole() {
      return this.user.roles.includes("SELL");
    },
    getWishListCount() {
      return this.$store.getters["wishlist/wishListCount"];
    },
    getCartListCount() {
      return this.$store.getters["cartList/cartListCount"];
    },
    getUser() {
      return this.$store.getters["user/fetchApi"];
    },
  },
  watch: {
    isLogin(newValue) {
      if (newValue) {
        this.fetchApi();
        this.getWishList();
        this.getCartList();
        this.getNotification();
      }else{
        this.$store.dispatch("wishlist/setWishList", []);
        this.$store.dispatch("cartList/setCartList", []);
      }
    },
    loading(newValue) {
      if (newValue) {
        document.body.classList.add("dialog-open");
      } else {
        document.body.classList.remove("dialog-open");
      }
    },
    getUser(newValue){
      if(newValue){
        this.fetchApi();
        this.$store.dispatch("user/setUpdateUser", false);
      }
    }
  },
  mounted() {
    this.visibleModal = false;
    this.screenWidth = window.innerWidth;
    window.addEventListener("resize", this.handleResize);
    if (this.isLogin) {
      this.fetchApi();
      this.getWishList();
      this.getCartList();
      this.getNotification();
    }

    window.addEventListener("scroll", function () {
      const toolbar2 = document.getElementById("bottom-nav");
      const isDialogOpen = document.body.classList.contains("dialog-open");
      if (toolbar2) {
        if (isDialogOpen) {
          toolbar2.classList.add("hide-nav");
        } else if (window.scrollY > 50) {
          toolbar2.classList.add("hide-nav");
        } else {
          toolbar2.classList.remove("hide-nav");
        }
      }
    });
  },
  async created() {
    this.socket = io(this.socketioURL, {
      transports: ["websocket", "polling"],
    });
    this.socket.on("receipt-rejected", () => {
      this.getNotification();
      this.fetchApi();
    });
    this.socket.on("receipt-approved", () => {
      this.getNotification();
      this.fetchApi();
    });
    this.socket.on("request-rejected", () => {
      this.getNotification();
    });
    this.socket.on("request-approved", () => {
      this.getNotification();
      this.fetchApi();
    });
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
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 2;
}
.middle-nav {
  position: fixed;
  top: 64px;
  width: 100%;
  z-index: 2;
}
.bottom-nav-2 {
  position: fixed;
  top: 64px;
  width: 100%;
  transition: all 0s;
  transform: translateY(0%);
  z-index: 2;
}
.bottom-nav {
  position: fixed;
  top: 114px;
  width: 100%;
  z-index: 2;
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
.text-cursor {
  cursor: pointer;
}
</style>
