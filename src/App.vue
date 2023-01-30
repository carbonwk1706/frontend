<template>
  <v-app>
    <Navbar v-if="showNavbar" />
    <Sidebar v-if="showSidebar" />
    <v-main>
      <v-container class="container-size">
        <router-view />
      </v-container>
    </v-main>
    <Footer />
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
    Footer
  },
  computed: {
    showNavbar() {
      return ![
        "/login",
        "/register",
        "/login",
        "/admin",
        "/usertable",
      ].includes(this.$route.path);
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
