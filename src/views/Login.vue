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
        <v-btn type="submit" v-if="!this.$store.getters['auth/isLogin']"
          >Log In</v-btn
        >
      </v-form>

      <div class="center-loading">
        <v-progress-circular
          v-if="loading"
          :size="70"
          :width="7"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>

      <v-dialog v-model="error" max-width="290">
        <v-card>
          <v-card-title class="headline">Error</v-card-title>
          <v-card-text>Invalid username or password</v-card-text>
          <v-card-actions>
            <v-btn color="green" text @click="error = false"> Close </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </AuthLogin>
</template>
<script>
import api from "../services/api";
import router from "../router";
import AuthLogin from "../components/AuthLogin.vue";
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
        const res = await api.post("/auth/login", {
          username: this.form.username,
          password: this.form.password,
        });
        const user = res.data.user;
        const token = res.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        this.$store.dispatch("auth/login", user);
        if(res.status !== 404){
          setTimeout(() => {
          router.push("/");
          this.loading = false
        },2000)
        }
      } catch (e) {
        this.loading = false
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
  height: 100%;
}
</style>
