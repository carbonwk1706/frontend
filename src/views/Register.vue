<template>
  <div>
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
      <v-btn v-if="!this.$store.getters['auth/isLogin']" type="submit"
        >Register</v-btn
      >
    </v-form>

    <v-dialog v-model="showModal" max-width="350">
      <v-card>
        <v-card-title class="headline center">
          <v-icon class="font-size" color="#F8BB86"
            >mdi-alert-circle-outline</v-icon
          >
        </v-card-title>
        <v-card-text class="text-center"
          >Username is already taken.</v-card-text
        >
        <v-card-actions class="center">
          <v-btn color="white" class="btn-bg" text @click="showModal = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
</template>
<script>
import router from "@/router";
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: "",
        username: "",
        password: "",
        roles: "User",
      },
      showModal: false,
      loading: false,
    };
  },
  methods: {
    async register() {
      try {
        const res = await axios.post("http://localhost:3000/auth/register", {
          name: this.form.name,
          username: this.form.username,
          password: this.form.password,
          roles: this.form.roles,
        });
        console.log("User Registered Successfully");
        console.log(this.form);
        console.log(res);
        if (res.status === 201) {
          this.loading = true;
          this.$store.dispatch("auth/login", this.form);
          setTimeout(() => {
            this.loading = false;
            router.push("/");
          }, 2000);
        }
      } catch (error) {
        if (error.response.status === 409) {
          this.showModal = true;
        }
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
</style>
