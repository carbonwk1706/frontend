<template>
  <v-app>
    <Navbar v-if="showNavbar" />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
  computed: {
    showNavbar() {
      return !["/login", "/register","/loginAdmin"].includes(this.$route.path);
    },
  }
};
</script>
<style></style>
