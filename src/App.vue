<template>
  <v-app>
    <v-app-bar :height="navHeight" elevation="0" v-if="showNavbar && !this.isNotFoundRoute" style="z-index: 1;">
      <Navbar />
    </v-app-bar>
    <CoinNavbar v-if="showNavbarCoin && !this.isNotFoundRoute" />
    <Sidebar v-if="showSidebar && !this.isNotFoundRoute" />
    <v-main>
      <v-container class="container-size">
        <router-view />
      </v-container>
    </v-main>
    <Footer v-if="showFooter && !this.isNotFoundRoute" />
    <FooterCoin v-if="showFooterCoin && !this.isNotFoundRoute" />
  </v-app>
</template>

<script>
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import CoinNavbar from "./components/Coin/Navbar.vue";
import FooterCoin from "./components/Coin/Footer.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
    Footer,
    CoinNavbar,
    FooterCoin,
  },
  data() {
    return {
      navHeight: 164,
    };
  },
  created() {
    window.addEventListener("storage", this.handleStorageChange);
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.navHeight = window.scrollY > 50 ? 114 : 164;
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
        confirmButtonColor: "#00af70",
        text: "Token ของคุณหมดอายุโปรดเข้าสู่ระบบอีกครั้ง",
        icon: "warning",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.value) {
          window.location.reload();
        }
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
      if (!this.isLogin) {
        return ![
          "/wishlist",
          "/profile",
          "/registersell",
          "/coin",
          "/login",
          "/register",
          "/login",
          "/admin",
          "/usertable",
          "/wishlist",
          "/profile",
          "/registersell",
          "/admintable",
          "/approvetable",
          "/historyadmin",
        ].includes(this.$route.path);
      } else {
        return ![
          "/login",
          "/register",
          "/login",
          "/admin",
          "/usertable",
          "/approvetable",
          "/admintable",
          "/approvetable",
          "/historyadmin",
          "/coin",
        ].includes(this.$route.path);
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
            "/coin",
            "/login",
            "/register",
            "/login",
            "/admin",
            "/usertable",
            "/wishlist",
            "/profile",
            "/registersell",
            "/admintable",
            "/approvetable",
            "/historyadmin",
          ].includes(this.$route.path);
        } else {
          return ![
            "/login",
            "/register",
            "/login",
            "/admin",
            "/usertable",
            "/admintable",
            "/approvetable",
            "/historyadmin",
            "/coin",
          ].includes(this.$route.path);
        }
      }
    },
    showSidebar() {
      return [
        "/admin",
        "/usertable",
        "/admintable",
        "/approvetable",
        "/historyadmin",
      ].includes(this.$route.path);
    },
    showNavbarCoin() {
      return ["/coin"].includes(this.$route.path);
    },
    showFooterCoin() {
      return ["/coin"].includes(this.$route.path);
    },
  },
};
</script>
<style>
.container-size {
  max-width: 1100px;
}
:root {
  --v-scrollbar-offset: 0px !important;
}
</style>
