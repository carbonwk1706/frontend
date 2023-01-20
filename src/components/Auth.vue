<template>
  <div>
    <slot></slot>

    <v-dialog v-model="showModal" max-width="350" persistent>
      <v-card>
        <v-card-text class="text-center">กรุณาล๊อคอินก่อนเข้าใช้หน้านี้</v-card-text>
        <v-card-actions class="center">
          <v-btn color="white" class="btn-bg" text @click="goToLoginAndClose"> OK </v-btn>
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
<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-bg {
  background-color: #00af70;
}

</style>
