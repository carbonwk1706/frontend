<template>
  <div>
    <slot></slot>

    <v-dialog v-model="showModal" max-width="500" persistent>
      <v-card>
        <v-card-title class="center">
          <div class="img-size">
            <v-img
            src="https://media.tenor.com/mvTL8ggxk2kAAAAC/chibicat-chibicatt.gif"
            
            >
            </v-img>
          </div>
        </v-card-title>
        <v-card-text class="text-center">Token ของคุณหมดอายุ กรุณาเข้าสู่ระบบใหม่อีกครั้งด้วยค่ะ</v-card-text>
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
    goToLoginAndClose() {
      this.$router.push("/").then(() => {
        window.scrollTo(0, 0);
      });
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
.img-size{
  width: 100px;
}

</style>
