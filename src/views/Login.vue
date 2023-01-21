<template>
  <AuthLogin>
    <div>
      <v-form @submit.prevent="login" lazy-validation>
        <v-text-field
          label="Username"
          v-model="form.username"
          :rules="usernameRules"
          outlined
          required
        />
        <v-text-field
          label="Password"
          v-model="form.password"
          :rules="passwordRules"
          outlined
          type="password"
          required
        />
        <v-btn type="submit">Log In</v-btn>
      </v-form>

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
    </div>
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
      usernameRules: [
        (v) => !!v || "กรุณากรอก Username",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [(v) => !!v || "กรุณากรอก Password"],
    };
  },
  methods: {
    async login() {
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
        this.loading = false;
        this.showAlert();
      }
    },
    showAlert() {
      this.$swal({
        title: "Oops...",
        confirmButtonColor: "#00af70",
        text: "Username หรือ Password ไม่ถูกต้อง ! ",
        icon: "error",
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
