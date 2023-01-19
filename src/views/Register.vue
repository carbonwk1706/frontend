<template>
  <v-form @submit.prevent="register">
    <v-text-field v-model="form.name" label="Name"></v-text-field>
    <v-text-field
      v-model="form.username"
      label="Username"
      type="email"
    ></v-text-field>
    <v-text-field
      v-model="form.password"
      label="Password"
      type="password"
    ></v-text-field>
    <v-btn type="submit">Register</v-btn>
  </v-form>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return {
      form: {
        name: "",
        username: "",
        password: "",
        roles: "User"
      }
    }
  },
  methods: {
    async register(){
      try{
        this.isLoading = true
        const res = await axios.post('http://localhost:3000/auth/register', {
          name: this.form.name,
          username: this.form.username,
          password: this.form.password,
          roles: this.form.roles
        })
        console.log("User Registered Successfully")
        console.log(this.form)
        console.log(res)
         if(res.status === 201){
           this.$store.dispatch("auth/login", this.form);
         }
      }catch(e){
        console.log(e)
      } 
    }
  }
};
</script>
<style></style>
