<template >
    <div>
      <slot></slot>
    </div>
  </template>
  <script>
  export default {
    computed: {
      isLogin () {
        return this.$store.getters['authAdmin/isLogin']
      }
    },
    watch: {
      isLogin (newValue) {
        if (!newValue) {
          this.$router.push('/admin').then(() => {
        window.scrollTo(0, 0);
      });
        }
      }
    },
    mounted () {
      if (this.isLogin) {
        this.$router.push('/admin').then(() => {
        window.scrollTo(0, 0);
      });
      }
    }
  }
  </script>
  <style></style>
