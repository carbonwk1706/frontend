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
      <v-btn type="submit">Register</v-btn>
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

    <v-dialog v-model="loading" max-width="350">
      <v-card>
        <v-card-title class="center">
          <div class="img-size">
            <v-img
            src="https://media.tenor.com/YQ2q2NtGs0UAAAAM/kitty-cat.gif"
            
            >
            </v-img>
          </div>
        </v-card-title>
        <v-card-text class="text-center">สมัครสมาชิกสำเร็จ</v-card-text>
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
        roles: ["USER"],
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
        if (res.status === 201) {
          this.loading = true;
          this.login();
        }
      } catch (error) {
        if (error.response.status === 409) {
          console.log(error);
          this.showModal = true;
        }
      }
    },

    async login() {
      try {
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
            this.loading = false;
            router.push("/");
          }, 2000);
        }
      } catch (e) {
        console.log(e);
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

.img-size{
  width: 100px;
}
</style>
