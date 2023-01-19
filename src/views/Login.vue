<template>
  <AuthLogin>
    <v-form @submit.prevent="login">
      <v-text-field label="Username" v-model="form.username" type="email"/>
      <v-text-field label="Password" v-model="form.password" type="password" />
      <v-btn type="submit" v-if="!this.$store.getters['auth/isLogin']">Log In</v-btn>
    </v-form>
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
      }
    }
  },
  methods: {
    login(){
      this.$store.dispatch("auth/login", this.form);
    }
  }
}
</script>
<style>
  
</style>