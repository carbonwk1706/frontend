<template>
  <div>
    <slot></slot>
    <v-dialog class="pa-0" v-model="showModal" max-width="500" persistent>
      <v-card>
        <v-card-title class="center">
          <div class="img-size">
            <v-img
            src="https://media.tenor.com/mvTL8ggxk2kAAAAC/chibicat-chibicatt.gif"
            
            >
            </v-img>
          </div>
        </v-card-title>
        <v-card-text class="text-center">กรุณา Log in ก่อนใช้งานหน้านี้ค่ะ</v-card-text>
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
      this.$router.push("/");
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
        setTimeout(()=>{
          this.goToLoginAndClose()
        },2000)
      }
    },
  },
  mounted() {
    if (!this.isLogin) {
      this.showModal = true;
      setTimeout(()=>{
          this.goToLoginAndClose()
        },2000)
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
.img-size{
  width: 100px;
}



</style>
