<template>
  <v-form>
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
export default {
  data(){
    return {
      from: {
        name: "",
        username: "",
        password: "",
        roles: "User"
      }
    }
  }
};
</script>
<style></style>
