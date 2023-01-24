<template>
  <v-app>
    <Navbar v-if="showNavbar" />
    <Sidebar v-if="showSidebar" />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    showNavbar() {
      return !["/login", "/register","/loginAdmin","/admin"].includes(this.$route.path);
    },
    showSidebar() {
      return ["/admin"].includes(this.$route.path);
    },
  }
};
</script>
<style></style>
