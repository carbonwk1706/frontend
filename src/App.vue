<template>
  <v-app>
    <Navbar v-if="showNavbar && !this.isNotFoundRoute" />
    <CoinNavbar
      v-if="
        (showNavbarCoin && !this.isNotFoundRoute && this.isLogin) ||
        (showNavCoinDetail && !hideNavbar)
      "
    />
    <Sidebar v-if="showSidebar && !this.isNotFoundRoute" />
    <SidebarSell v-if="showSidebarsell && !this.isNotFoundRoute" />
    <v-carousel
      class="mg-carousel"
      v-if="isRootRoute"
      hide-delimiter-background
      :show-arrows="false"
      color="#2F58CD"
      style="height: 300"
      cycle
    >
      <v-carousel-item v-for="(item, index) in items" :key="index">
        <v-img :src="item.imageURL" cover height="300"></v-img>
      </v-carousel-item>
    </v-carousel>
    <v-main
      :class="{
        'padding-main': !showNavbarCoin && !showNavCoinDetail && !routerLogin,
        'padding-main-root': isRootRoute,
      }"
    >
      <v-container class="container-size">
        <router-view />
      </v-container>
    </v-main>
    <Footer v-if="showFooter && !this.isNotFoundRoute" />
    <FooterCoin
      v-if="
        (showFooterCoin && !this.isNotFoundRoute && this.isLogin) ||
        (showFooterCoinDetail && !hideFooter)
      "
    />
  </v-app>
</template>

<script>
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import CoinNavbar from "./components/Coin/Navbar.vue";
import FooterCoin from "./components/Coin/Footer.vue";
import SidebarSell from "./components/SidebarSell.vue";
import api from "@/services/api";
import io from "socket.io-client";
export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
    SidebarSell,
    Footer,
    CoinNavbar,
    FooterCoin,
  },

  async created() {
    window.addEventListener("storage", this.handleStorageChange);
    this.socket = io(this.socketioURL, {
      transports: ["websocket", "polling"],
    });
    this.socket.on("upload-image-carousel", () => {
      this.getCarousel();
    });
    this.socket.on("delete-image-carousel", () => {
      this.getCarousel();
    });
    this.socket.on("edit-image-carousel", () => {
      this.getCarousel();
    });
    this.getCarousel();
  },
  data() {
    return {
      items: [],
      socket: null,
      socketioURL: "http://localhost:3000",
    };
  },
  methods: {
    async getCarousel() {
      const res = await api.get("/carousel/");
      this.items = res.data.carousels;
    },
    handleStorageChange(event) {
      if (this.isLogin) {
        if (
          event.key === "user" ||
          (event.key === "token" && !event.newValue)
        ) {
          this.$store.dispatch("auth/logout");
          this.$router.push("/");
          this.showAlert();
        }
      } else if (this.isLoginAdmin) {
        if (
          event.key === "admin" ||
          (event.key === "tokenAdmin" && !event.newValue)
        ) {
          this.$store.dispatch("authAdmin/logout");
          this.$router.push("/login");
          this.showAlert();
        }
      }
    },
    showAlert() {
      this.$swal({
        scrollbarPadding: false,
        allowOutsideClick: false,
        confirmButtonColor: "#2F58CD",
        text: "Token ของคุณหมดอายุโปรดเข้าสู่ระบบอีกครั้ง",
        icon: "warning",
        confirmButtonText: "OK",
      });
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
    isLoginAdmin() {
      return this.$store.getters["authAdmin/isLogin"];
    },
    isNotFoundRoute() {
      return this.$route.matched.some(
        (record) => record.path === "/:pathMatch(.*)*"
      );
    },
    showNavbar() {
      const currenRoute = this.$route;
      if (currenRoute.meta.hideNavbar) {
        return false;
      } else {
        if (!this.isLogin) {
          return ![
            "/wishlist",
            "/profile",
            "/registersell",
            "/coin",
            "/checkoutcoin/qrcode",
            "/mybook",
            "/profile",
            "/coinhistory",
            "/login",
            "/admin",
            "/usertable",
            "/admintable",
            "/approvetable",
            "/historyadmin",
            "/orderhistory",
            "/bookadmin",
            "/newadmintable",
            "/newusertable",
            "/newbookadmin",
            "/userhistoryadmin",
            "/historybookcrud",
            "/newbook",
            "/historybookusercrud",
            "/carousel",
          ].includes(this.$route.path);
        } else {
          return ![
            "/login",
            "/admin",
            "/usertable",
            "/approvetable",
            "/admintable",
            "/approvetable",
            "/historyadmin",
            "/checkoutcoin/qrcode",
            "/coin",
            "/bookadmin",
            "/checkoutcoin",
            "/coinhistory",
            "/newadmintable",
            "/newusertable",
            "/newbookadmin",
            "/userhistoryadmin",
            "/historybookcrud",
            "/booktable",
            "/bookqueue",
            "/payment",
            "/paymenthistory",
            "/newbook",
            "/historybookusercrud",
            "/carousel",
          ].includes(this.$route.path);
        }
      }
    },
    showFooter() {
      const currenRoute = this.$route;
      if (currenRoute.meta.hideFooter) {
        return false;
      } else {
        if (!this.isLogin) {
          return ![
            "/wishlist",
            "/profile",
            "/registersell",
            "/checkoutcoin/qrcode",
            "/coin",
            "/mybook",
            "/wishlist",
            "/profile",
            "/orderhistory",
            "/coinhistory",
            "/login",
            "/admin",
            "/usertable",
            "/admintable",
            "/approvetable",
            "/historyadmin",
            "/bookadmin",
            "/newadmintable",
            "/newusertable",
            "/newbookadmin",
            "/userhistoryadmin",
            "/historybookcrud",
            "/allreview",
            "/newbook",
            "/historybookusercrud",
            "/carousel",
          ].includes(this.$route.path);
        } else {
          return ![
            "/login",
            "/admin",
            "/usertable",
            "/admintable",
            "/approvetable",
            "/historyadmin",
            "/checkoutcoin/qrcode",
            "/coin",
            "/bookadmin",
            "/checkoutcoin",
            "/coinhistory",
            "/newadmintable",
            "/newusertable",
            "/newbookadmin",
            "/userhistoryadmin",
            "/historybookcrud",
            "/booktable",
            "/bookqueue",
            "/payment",
            "/paymenthistory",
            "/allreview",
            "/newbook",
            "/historybookusercrud",
            "/carousel",
          ].includes(this.$route.path);
        }
      }
    },
    showSidebar() {
      const currenRoute = this.$route;
      if (
        currenRoute.meta.hideNavbar &&
        !currenRoute.meta.hideSidebar &&
        !currenRoute.meta.showNavCoin
      ) {
        return true;
      }
      {
        return [
          "/admin",
          "/usertable",
          "/admintable",
          "/approvetable",
          "/historyadmin",
          "/bookadmin",
          "/newadmintable",
          "/newusertable",
          "/newbookadmin",
          "/userhistoryadmin",
          "/historybookcrud",
          "/carousel",
        ].includes(this.$route.path);
      }
    },
    showSidebarsell() {
      const currenRoute = this.$route;
      if (currenRoute.meta.hideSidebar && !currenRoute.meta.showNavCoin) {
        return true;
      }
      {
        return [
          "/booktable",
          "/bookqueue",
          "/payment",
          "/paymenthistory",
          "/newbook",
          "/historybookusercrud",
        ].includes(this.$route.path);
      }
    },
    showNavbarCoin() {
      return [
        "/coin",
        "/checkoutcoin",
        "/coinhistory",
        "/checkoutcoin/qrcode",
      ].includes(this.$route.path);
    },
    routerLogin() {
      return ["/login"].includes(this.$route.path);
    },
    showFooterCoin() {
      return [
        "/coin",
        "/checkoutcoin",
        "/coinhistory",
        "/checkoutcoin/qrcode",
      ].includes(this.$route.path);
    },
    showNavCoinDetail() {
      const currenRoute = this.$route;
      if (currenRoute.meta.hideNavbar) {
        return true;
      }
      return false;
    },
    hideNavbar() {
      const currenRoute = this.$route;
      if (currenRoute.meta.hideNavbarCoin) {
        return true;
      }
      return false;
    },
    showFooterCoinDetail() {
      const currenRoute = this.$route;
      if (currenRoute.meta.hideFooter) {
        return true;
      }
      return false;
    },
    hideFooter() {
      const currenRoute = this.$route;
      if (currenRoute.meta.hideFooterCoin) {
        return true;
      }
      return false;
    },
    isRootRoute() {
      return this.$route.path === "/";
    },
  },
};
</script>
<style>
.container-size {
  max-width: 1200px;
}
:root {
  --v-scrollbar-offset: 0px !important;
}
.padding-main {
  padding-top: 164px;
}
.padding-main-root {
  padding-top: 60px;
}
.no-padding {
  padding: 0px;
}
.mg-carousel {
  margin-top: 164px;
}
</style>
