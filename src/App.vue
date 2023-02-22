<template>
  <v-app>
    <Navbar v-if="showNavbar && !this.isNotFoundRoute" />
    <CoinNavbar
      v-if="
        (showNavbarCoin && !this.isNotFoundRoute && this.isLogin) ||
        showNavCoinDetail
      "
    />
    <Sidebar v-if="showSidebar && !this.isNotFoundRoute" />
    <v-carousel
      v-if="isRootRoute"
      hide-delimiter-background
      :show-arrows="false"
      :cycle="3000"
      color="success"
    >
    <v-carousel-item v-for="(group, index) in groups" :key="index">
      <v-row>
        <v-col v-for="(item, i) in group" :key="i" cols="4">
          <v-card>
            <v-img :src="item.image" aspect-ratio="1"></v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-carousel-item>
    </v-carousel>
    <v-main
      :class="{
        'padding-main': !showNavbarCoin && !showNavCoinDetail,
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
        showFooterCoinDetail
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
export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
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
          id: 1,
          image: "https://picsum.photos/200/200?random=1",
        },
        {
          id: 2,
          image: "https://picsum.photos/200/200?random=2",
        },
        {
          id: 3,
          image: "https://picsum.photos/200/200?random=3",
        },
        {
          id: 4,
          image: "https://picsum.photos/200/200?random=4",
        },
        {
          id: 5,
          image: "https://picsum.photos/200/200?random=5",
        },
        {
          id: 6,
          image: "https://picsum.photos/200/200?random=6",
        },
        {
          id: 7,
          image: "https://picsum.photos/200/200?random=7",
        },
        {
          id: 8,
          image: "https://picsum.photos/200/200?random=8",
        },
        {
          id: 9,
          image: "https://picsum.photos/200/200?random=9",
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
      }).then((result) => {
        if (result.value) {
          window.location.reload();
        }
      });
    },
  },
  computed: {
    groups() {
      let groups = [];

      for (let i = 0; i < this.items.length; i += 3) {
        groups.push(this.items.slice(i, i + 3));
      }

      return groups;
    },
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
            "/coin",
            "/bookadmin",
            "/checkoutcoin",
            "/coinhistory",
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
          ].includes(this.$route.path);
        } else {
          return ![
            "/login",
            "/admin",
            "/usertable",
            "/admintable",
            "/approvetable",
            "/historyadmin",
            "/coin",
            "/bookadmin",
            "/checkoutcoin",
            "/coinhistory",
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
        "/bookadmin",
      ].includes(this.$route.path);
    },
    showNavbarCoin() {
      return ["/coin", "/checkoutcoin", "/coinhistory"].includes(
        this.$route.path
      );
    },
    showFooterCoin() {
      return ["/coin", "/checkoutcoin", "/coinhistory"].includes(
        this.$route.path
      );
    },
    showNavCoinDetail() {
      const currenRoute = this.$route;
      if (currenRoute.meta.hideNavbar) {
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
</style>
