<template>
  <v-footer class="footer-bg d-flex flex-row pa-10 mt-12" max-width="auto">
    <v-container class="container-max-width">
      <div class="center">Copyright 2023 Ebook coin . All rights reserved.</div>
    </v-container>
  </v-footer>
</template>
<script>

export default {
  name: 'FooterVoin'
};
</script>
<style scoped>
.footer-bg {
  background-color: #ccc;
  color: #fff;
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
