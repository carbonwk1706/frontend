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
      color="success"
      style="height: 300"
    >
      <v-carousel-item v-for="(item, i) in items" :key="i">
        <v-img :src="item.src" cover height="300"></v-img>
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

  created() {
    window.addEventListener("storage", this.handleStorageChange);
  },
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },
  methods: {
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
        confirmButtonColor: "#00af70",
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
            "/bookusersell",
            "/booktable",
            "/bookqueue",
            "/payment",
            "/newbook",
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
            "/bookusersell",
            "/booktable",
            "/bookqueue",
            "/payment",
            "/allreview",
            "/newbook",
          ].includes(this.$route.path);
        }
      }
    },
    showSidebar() {
      const currenRoute = this.$route;
      if (currenRoute.meta.hideNavbar && !currenRoute.meta.hideSidebar) {
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
        ].includes(this.$route.path);
      }
    },
    showSidebarsell() {
      const currenRoute = this.$route;
      if (currenRoute.meta.hideSidebar) {
        return true;
      }
      {
        return [
          "/bookusersell",
          "/booktable",
          "/bookqueue",
          "/payment",
          "/newbook",
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
