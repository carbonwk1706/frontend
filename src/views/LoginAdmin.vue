<template>
    <v-card class="mx-auto px-6 py-8">
    <v-container>
      <v-form @submit.prevent="login">
        <v-text-field label="Username" v-model="form.username" type="email" />
        <v-text-field
          label="Password"
          v-model="form.password"
          type="password"
        />
        <div class="center">
              <v-hover>
                <template v-slot:default="{ isHovering, props }">
                  <v-btn
                    v-bind="props"
                    class="rounded-pill"
                    type="submit"
                    color="success"
                    size="large"
                    :variant="isHovering ? 'outlined' : 'elevated'"
                    >ล็อกอินเข้าระบบ</v-btn
                  >
                </template>
              </v-hover>
            </div>
      </v-form>



      <v-dialog v-model="loading" max-width="500">
    <v-card>
      <v-card-title class="center">
        <div class="img-size">
          <v-img
            src="https://media.tenor.com/M00Zqk6Dx7EAAAAi/peachcat-goma.gif"
          >
          </v-img>
        </div>
      </v-card-title>
      <div class="center-loading">
        <v-progress-circular
          v-if="loading"
          :size="50"
          :width="5"
          indeterminate
          color="success"
        ></v-progress-circular>
      </div>
      <v-card-text class="text-center">กำลังเข้าสู่ระบบ</v-card-text>
    </v-card>
  </v-dialog>
    </v-container>
</v-card>
  </template>
  <script>
import router from "../router";
import axios from "axios";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      loading: false,
      error: false,
    };
  },
  methods: {
    async login() {
      try {
        this.loading = true;
        const res = await axios.post("http://localhost:3000/auth/login", {
          username: this.form.username,
          password: this.form.password,
        });
        const user = res.data.user;
        const token = res.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        console.log(res);
        if (res.status !== 404) {
          setTimeout(() => {
            this.$store.dispatch("auth/login", user);
            this.loading = false;
          }, 2000);
          router.push("/admin");
        }
      } catch (e) {
        this.loading = false;
        this.error = true;
      }
    },
    alertLogin() {
      this.$swal({
        confirmButtonColor: "#00af70",
        width: "500",
        text: "Username หรือ Password ไม่ถูกต้อง ! ",
        icon: "error",
        button: "OK",
      });
    },
    showAlert(text) {
      this.$swal({
        confirmButtonColor: "#00af70",
        width: "500",
        text: text,
        icon: "warning",
        button: "OK",
      });
    },
  },
};
</script>
<style scoped>
.center-loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-size {
  width: 100px;
}
</style>