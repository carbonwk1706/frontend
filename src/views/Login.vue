<template>
  <AuthLogin>
    <div>
      <v-form @submit.prevent="login">
        <v-text-field label="Username" v-model="form.username" type="email"/>
        <v-text-field label="Password" v-model="form.password" type="password" />
        <v-btn type="submit" v-if="!this.$store.getters['auth/isLogin']">Log In</v-btn>
      </v-form>

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
import AuthLogin from '../components/AuthLogin.vue';
export default {
  components: {
    AuthLogin
  },
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      loading: false,
      error: false
    }
  },
  methods: {
    async login(){
      try {
        const res = await api.post("/auth/login", {
          username: this.form.username,
          password: this.form.password,
        });
        const user = res.data.user;
        const token = res.data.token;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        this.$store.dispatch('auth/logout',user)
        router.push("/");
      } catch (e) {
        this.error = true;
      }
    }
  }
}
</script>
<style scoped>

</style>