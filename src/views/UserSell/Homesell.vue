<template>
  <AuthSell v-if="isLogin">
  <div>
    
  </div>
</AuthSell>

<AuthSell v-if="!isLogin">
</AuthSell>
</template>
<script>
import AuthSell from "@/components/AuthSell.vue";
export default {
  components: {
    AuthSell,
  },

  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
}
</script>
<style>
  
</style>