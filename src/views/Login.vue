<template>
    <v-dialog v-model="loginModal" class="pa-0" width="500px" persistent>
      <v-sheet>
        <v-card class="mx-auto px-6 py-8">
          <v-form @submit.prevent="login">
            <div class="d-flex justify-end pa-0">
              <v-btn icon @click="hideLogin">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
            <v-card-title primary-title class="text-center">
              ล็อกอินเข้าระบบ
            </v-card-title>
            <v-divider></v-divider>
            <v-container>
              <v-text-field
                label="Username"
                variant="outlined"
                class="mb-2"
                required
                v-model="form.username"
                :rules="usernameRules"
              ></v-text-field>
              <v-text-field
                label="Password"
                variant="outlined"
                class="mb-2"
                type="password"
                required
                v-model="form.password"
                :rules="passwordRules"
              ></v-text-field>
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
            </v-container>
            <v-card-actions class="center">
              <span class="mr-2">หากยังไม่สมัครบัญชีโปรด</span>
              <v-btn
                class="rounded-pill"
                variant="outlined"
                color="grey"
                @click="goToRegister"
              >
                <span style="color: black"> สมัครสมาชิก</span>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-sheet>
    </v-dialog>


  <Register />

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
</template>
<script>
import router from "../router";
import axios from "axios";
import Register from "./Register.vue";
export default {
  components: {
    Register,
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      loading: false,
      usernameRules: [(v) => !!v || "กรุณากรอก Username"],
      passwordRules: [(v) => !!v || "กรุณากรอก Password"],
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
          const res = await axios.post("http://localhost:3000/auth/login", {
            username: this.form.username,
            password: this.form.password,
          });
          this.loading = true;
          const user = res.data.user;
          const token = res.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          this.$store.dispatch("auth/login", user);
          if (res.status !== 404) {
            setTimeout(() => {
              router.push("/");
              this.hideLogin();
              this.loading = false;
            }, 2000);
          }
        } catch (e) {
          this.alertLogin();
        }
      }
    },
    goToRegister() {
      this.hideLogin();
      this.$store.dispatch("auth/showRegister");
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
    hideLogin() {
      this.resetForm();
      this.$store.dispatch("auth/hideLogin");
    },
    resetForm() {
      this.form.username = "";
      this.form.password = "";
    },
  },
  computed: {
    loginModal() {
      return this.$store.getters["auth/loginModal"];
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
