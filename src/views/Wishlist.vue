<template>
  <AuthWishlist>
    <Wish />
  </AuthWishlist>
</template>
<script>
import AuthWishlist from "../components/AuthWishlist.vue";
import Wish from "@/components/Wish.vue";

export default {
  components: {
    AuthWishlist,
    Wish
  },
};
</script>
<style scoped>



</style>