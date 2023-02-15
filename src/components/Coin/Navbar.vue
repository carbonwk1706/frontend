<template>
  <v-toolbar class="app_bar">

    <v-btn icon @click="$router.go(-1)">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    
    <v-toolbar-title class="text-start font-text">EBOOK-COIN</v-toolbar-title>
    <v-spacer></v-spacer>

    <span class="font-text ma-5"> 
      <v-icon>mdi-account</v-icon>
      สวัสดี {{ user.username }}
    </span>
  </v-toolbar>
</template>

<script>
import api from "@/services/api";

export default {
  name: "CoinNavbar",
  data() {
    return {
      user: [],
    };
  },
  methods: {
    async fetchApi() {
      const res = await api.get("/profile/" + this.getId());
      this.user = res.data.user;
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
  },
  mounted() {
    this.fetchApi();
  },
};
</script>

<style scoped>
.app_bar {
  background-image: linear-gradient(#00af70, #37c13d);
  color: #ffff;
  top: 0;
  z-index: 1;
}
</style>
