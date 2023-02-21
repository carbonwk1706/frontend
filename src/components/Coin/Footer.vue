<template>
  <v-footer class="footer-bg d-flex flex-row"  :style="{ height: '50px', position: 'fixed', bottom: 0 }">
    <v-container class="container-max-width pa-0">
      <div class="center">Copyright 2023 Ebook coin . All rights reserved.</div>
    </v-container>
  </v-footer>
</template>
<script>

export default {
  name: 'FooterCoin'
};
</script>
<style scoped>
.footer-bg {
  background-color: #ccc;
  color: #fff;
  width: 100%;
  max-width: auto;
}
.container-max-width {
  max-width: 1140px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

