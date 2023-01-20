<template>
  <div>
    <slot></slot>

    <v-dialog v-model="showModal" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">Error</v-card-title>
        <v-card-text>กรุณาเข้าสู่ระบบ</v-card-text>
        <v-card-actions>
          <v-btn color="green" text @click="goToLoginAndClose"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    goToLogin() {
      this.$router.push("/");
    },
    goToLoginAndClose() {
      this.goToLogin();
      this.showModal = false;
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
  watch: {
    isLogin(newValue) {
      if (!newValue) {
        this.showModal = true;
      }
    },
  },
  mounted() {
    if (!this.isLogin) {
      this.showModal = true;
    }
  },
};
</script>
<style></style>
