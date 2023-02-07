<template>
  <Auth v-if="isLogin">
    <h1>Wishlist</h1>
  </Auth>

  <Auth v-if="!isLogin">
  </Auth>
</template>
<script>
import Auth from "../components/Auth.vue";

export default {
  components: {
    Auth,
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
};
</script>
<style scoped>



</style>