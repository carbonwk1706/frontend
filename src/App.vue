<template>
  <v-app>
    <Navbar v-if="showNavbar" />
    <Sidebar v-if="showSidebar" />
    <v-main>
      <v-container class="container-size">
        <router-view />
      </v-container>
    </v-main>
    <Footer v-if="showFooter" />
  </v-app>
</template>

<script>
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
    Footer,
  },
  created() {
    window.addEventListener("storage", this.handleStorageChange);
  },
  methods: {
    handleStorageChange(event) {
      if (event.key === "user" && !event.newValue) {
        this.$store.dispatch("auth/logout");
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
  watch: {
    "$store.state.auth.user": {
      handler(newValue) {
        if (!newValue) {
          this.$store.dispatch("auth/logout");
          this.$router.push("/");
          this.showAlert();
        }
      },
      deep: true,
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
    showNavbar() {
      if (!this.isLogin) {
        return ![
          "/login",
          "/register",
          "/login",
          "/admin",
          "/usertable",
          "/wishlist",
          "/profile",
          "/registersell",
        ].includes(this.$route.path);
      } else {
        return ![
          "/login",
          "/register",
          "/login",
          "/admin",
          "/usertable",
        ].includes(this.$route.path);
      }
    },
    showFooter() {
      if (!this.isLogin) {
        return ![
          "/login",
          "/register",
          "/login",
          "/admin",
          "/usertable",
          "/wishlist",
          "/profile",
          "/registersell",
        ].includes(this.$route.path);
      } else {
        return ![
          "/login",
          "/register",
          "/login",
          "/admin",
          "/usertable",
        ].includes(this.$route.path);
      }
    },
    showSidebar() {
      return ["/admin", "/usertable", "/admintable"].includes(this.$route.path);
    },
  },
};
</script>
<style scoped>
.container-size {
  max-width: 1100px;
}
</style>
