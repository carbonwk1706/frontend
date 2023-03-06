<template>
  <AuthSell v-if="isLogin">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2>รายการหนังสือ</h2>
        </v-col>
      </v-row>
    </v-container>
  </AuthSell>
  <AuthSell v-if="!isLogin"> </AuthSell>
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
};
</script>
<style></style>
