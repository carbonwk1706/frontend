<template>
  <Auth v-if="isLogin">
    <Wish />
  </Auth>

  <Auth v-if="!isLogin">
  </Auth>
</template>
<script>
import Auth from "../../components/Auth.vue";
import Wish from "@/components/Wish.vue";

export default {
  components: {
    Auth,
    Wish
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