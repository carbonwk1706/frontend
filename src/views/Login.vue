<template>
  <AuthLogin>
    <div>
      <v-form @submit.prevent="login">
        <v-text-field label="Username" v-model="form.username" type="email"/>
        <v-text-field label="Password" v-model="form.password" type="password" />
        <v-btn type="submit" v-if="!this.$store.getters['auth/isLogin']">Log In</v-btn>
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
    </div>
  </AuthLogin>
</template>
<script>
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
      loading: false
    }
  },
  methods: {
    login(){
      this.loading = true
      setTimeout(() => {
            this.$store.dispatch("auth/login", this.form);
            setTimeout(() => {
              this.loading = false;
            }, 2000);
          }, 2000);
    }
  }
}
</script>
<style scoped>
.center-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>