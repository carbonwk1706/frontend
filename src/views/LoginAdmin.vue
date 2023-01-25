<template>
  <v-row class="justify-center">
    <v-card style="width: 400px">
      <v-container>
        <v-toolbar dark color="green lighten-1">
          <v-toolbar-title>ADMIN E-BOOK</v-toolbar-title>
        </v-toolbar>
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
  </v-row>
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
      if (!this.form.username && !this.form.password) {
        this.showAlert("กรุณากรอก Username และ Password ");
      } else if (!this.form.username) {
        this.showAlert("กรุณากรอก Username ");
      } else if (!this.form.password) {
        this.showAlert("กรุณากรอก Password ");
      } else {
        try {
          this.loading = true;
          const res = await axios.post("http://localhost:3000/auth/login", {
            username: this.form.username,
            password: this.form.password,
          });
          const user = res.data.user;
          const token = res.data.token;
          const roles = user.roles;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          console.log(res);

          for (let i = 0; i < roles.length; i++) {
            console.log("Role:", user.roles[i]);
            if (user.roles[i] == "ADMIN" && user.roles[i+1] == "USER"|| user.roles[i] == "LOCAL_ADMIN" && user.roles[i+1] == "USER") {
              if (res.status !== 404) {

                setTimeout(() => {
                  this.$store.dispatch("auth/login", user);
                  this.loading = false;
                }, 2000);
                router.push("/admin");
                break;
              }
            } else {

              this.alertLoginAdmin()
              this.loading = false;
            }
          }
        } catch (error) {
          if (error.response.data.message === "Invalid username or password") {
            this.alertLogin()
          }
        }
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
    alertLoginAdmin() {
      this.$swal({
        confirmButtonColor: "#00af70",
        width: "500",
        text: "You are not Admin ",
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
</style>