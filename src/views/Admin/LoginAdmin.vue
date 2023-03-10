<template>
  <NoAuth>
    <v-container
      fluid
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      "
    >
      <v-row class="justify-center align-center">
        <v-col cols="4" sm="8" md="6">
          <v-card class="mx-auto">
            <v-container>
              <v-toolbar class="bg-color">
                <v-toolbar-title>ADMIN E-BOOK</v-toolbar-title>
              </v-toolbar>
              <v-form @submit.prevent="login">
                <v-text-field
                  label="Username"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                  v-model="form.username"
                  class="mt-3"
                />
                <v-text-field
                  :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="visible = !visible"
                  label="Password"
                  prepend-inner-icon="mdi-lock-outline"
                  variant="outlined"
                  v-model="form.password"
                  :type="visible ? 'text' : 'password'"
                />
                <div class="center">
                  <v-btn
                    class="rounded-pill btn-color"
                    type="submit"
                    size="large"
                    >ล็อกอินเข้าระบบ</v-btn
                  >
                </div>
              </v-form>

              <v-dialog v-model="loading" max-width="300">
                <v-card>
                  <div class="center-loading mt-3">
                    <v-progress-circular
                      v-if="loading"
                      :size="50"
                      :width="5"
                      indeterminate
                      color="success"
                    ></v-progress-circular>
                  </div>
                  <v-card-text class="text-center"
                    >กำลังเข้าสู่ระบบ</v-card-text
                  >
                </v-card>
              </v-dialog>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </NoAuth>
</template>
<script>
import api from "@/services/api";
import router from "../../router";
import NoAuth from "@/components/NoAuth.vue";

export default {
  components: {
    NoAuth,
  },
  data() {
    return {
      isRoles: [],
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
        this.showAlert("กรุณากรอก Username และ Password ด้วยจ้า");
      } else if (!this.form.username) {
        this.showAlert("กรุณากรอก Username ด้วยจ้า");
      } else if (!this.form.password) {
        this.showAlert("กรุณากรอก Password ด้วยจ้า");
      } else {
        try {
          const res = await api.post("/auth/loginadmin", {
            username: this.form.username,
            password: this.form.password,
          });
          if (
            res.status === 200 &&
            res.data.message !== "Invalid username or password"
          ) {
            const admin = res.data.user;
            const tokenadmin = res.data.token;
            const roles = admin.roles;
            let checkRole = "";
            for (let i = 0; i < roles.length; i++) {
              if (
                admin.roles[i] === "ADMIN" ||
                admin.roles[i] === "LOCAL_ADMIN"
              ) {
                checkRole = admin.roles[i];
              }
            }
            if (checkRole === "ADMIN" || checkRole === "LOCAL_ADMIN") {
              this.loading = true;
              localStorage.setItem("tokenAdmin", tokenadmin);
              localStorage.setItem("admin", JSON.stringify(admin));
              setTimeout(() => {
                this.$store.dispatch("authAdmin/login", admin);
                this.loading = false;
                this.hideLogin();
                if (checkRole === "LOCAL_ADMIN") {
                  router.push("/admin").then(() => {
                    window.scrollTo(0, 0);
                  });
                } else if (checkRole === "ADMIN") {
                  router.push("/admintable").then(() => {
                    window.scrollTo(0, 0);
                  });
                }
              }, 2000);
            } else {
              this.alertLoginAdmin();
            }
          } else {
            this.alertLogin();
          }
        } catch (error) {
          console.log(error);
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
      setTimeout(() => {
        this.resetForm();
      }, 500);
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
.btn-color {
  color: #0008c1;
  border: 1px solid #0008c1;
  box-shadow: none;
}
.btn-color:hover {
  color: #ffff;
  background-color: #0008c1;
  box-shadow: none;
}
.bg-color {
  color: #ffff;
  background-color: #0008c1;
}
.bg-image {
  background-image: url(https://wallpaperaccess.com/full/537653.jpg);
  background-size: cover;
  background-position: center;
}
</style>
