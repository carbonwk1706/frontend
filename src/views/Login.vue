<template>
  <AuthLogin>
    <v-sheet>
      <v-card class="mx-auto px-6 py-8" max-width="450">
        <v-form @submit.prevent="login">
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
            <v-btn
              type="submit"
              block
              color="success"
              size="large"
              variant="elevated"
              >ล็อกอินเข้าระบบ</v-btn
            >
          </v-container>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="goToRegister">
              สมัครสมาชิก
              <v-icon icon="mdi-chevron-right" end></v-icon>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-sheet>

    <v-dialog v-model="loading" max-width="350">
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
  </AuthLogin>
</template>
<script>
import router from "../router";
import AuthLogin from "../components/AuthLogin.vue";
import axios from "axios";
export default {
  components: {
    AuthLogin,
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
              this.loading = false;
            }, 2000);
          }
        } catch (e) {
          this.alertLogin();
        }
      }
    },
    goToRegister() {
      router.push("/register");
    },
    alertLogin() {
      this.$swal({
        confirmButtonColor: "#00af70",
        text: "Username หรือ Password ไม่ถูกต้อง ! ",
        icon: "error",
        button: "OK",
      });
    },
    showAlert(text) {
      this.$swal({
        confirmButtonColor: "#00af70",
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
