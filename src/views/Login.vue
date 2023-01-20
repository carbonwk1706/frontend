<template>
  <AuthLogin>
    <div>
      <v-form @submit.prevent="login">
        <v-text-field label="Username" v-model="form.username" type="email" />
        <v-text-field
          label="Password"
          v-model="form.password"
          type="password"
        />
        <v-btn type="submit"
          >Log In</v-btn
        >
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
          <v-card-text class="text-center">กำลังเข้าสู่ระบบ</v-card-text>
          <v-card class="center-loading">
            <v-progress-circular
              v-if="loading"
              :size="50"
              :width="5"
              indeterminate
              color="success"
              class="my-4"
            ></v-progress-circular>
          </v-card>
        </v-card>
      </v-dialog>

      <v-dialog v-model="error" max-width="350">
        <v-card>
          <v-card-title class="headline center">
            <v-icon class="font-size" color="#D10000"
              >mdi-close-circle-outline</v-icon
            >
          </v-card-title>
          <v-card-text class="text-center"
            >Username หรือ Password ไม่ถูกต้อง</v-card-text
          >
          <v-card-actions class="center">
            <v-btn color="white" class="btn-bg" text @click="error = false">
              OK
            </v-btn>
          </v-card-actions>
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
        this.$store.dispatch("auth/login", user);
        if (res.status !== 404) {
          setTimeout(() => {
            router.push("/");
            this.loading = false;
          }, 2000);
        }
      } catch (e) {
        this.loading = false;
        this.error = true;
      }
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
.btn-bg {
  background-color: #00af70;
}
.font-size {
  font-size: 5rem;
}
.img-size{
  width: 100px;
}
</style>
