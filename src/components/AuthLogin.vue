<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
  mounted() {
    if (this.isLogin) {
      this.$router.push("/");
    }
  },
};
</script>
<style></style>
