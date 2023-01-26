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
      isVisible: false,
      visible: false,
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
          const res = await axios.post("http://localhost:3000/auth/login", {
            username: this.form.username,
            password: this.form.password,
          });
          this.loading = true;
          const user = res.data.user;
          const token = res.data.token;
          const roles = user.roles;
          let checkrole = "" ;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          console.log(res);

          for (let i = 0; i < roles.length; i++) {
              if(user.roles[i] ==="ADMIN"){
                checkrole = user.roles[i]
              }

          }
            if (checkrole === "ADMIN" && res.status !== 403  ) {
              setTimeout(() => {
                  this.$store.dispatch("auth/login", user);
                  this.loading = false;
                  this.hideLogin();
                }, 2000);
                router.push("/admin");

            }else{

              this.alertLoginAdmin()
              this.loading = false;
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
    hideLogin() {
      this.$emit("update:isVisible", false);
      setTimeout(()=>{
        this.resetForm();
      },500)
    },
    resetForm() {
      this.form.username = "";
      this.form.password = "";
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