<template>
  <AuthLogin>
    <div>
      <v-form @submit.prevent="checkDuplicate">
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

      <v-dialog v-model="loading" max-width="350">
        <v-card>
          <v-card-title class="center">
            <div class="img-size">
              <v-img
                src="https://media.tenor.com/ItVLtljJHLoAAAAM/sweet-dreams.gif"
              >
              </v-img>
            </div>
          </v-card-title>
          <v-card-content class="center-loading">
            <v-progress-circular
              v-if="loading"
              :size="50"
              :width="5"
              indeterminate
              color="success"
            ></v-progress-circular>
          </v-card-content>
          <v-card-text class="text-center">กำลังสมัครสมาชิก</v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="loginModal" max-width="350">
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
              v-if="loginModal"
              :size="50"
              :width="5"
              indeterminate
              color="success"
            ></v-progress-circular>
          </div>
          <v-card-text class="text-center">กำลังเข้าสู่ระบบ</v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog" width="600px" persistent>
        <v-card>
          <v-card-title class="text-center">
            <span class="text-h5">ข้อตกลงในการให้บริการ</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text
            >Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are
            running.</v-card-text
          >
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="disagree">
              ยกเลิก
            </v-btn>
            <v-btn class="btn-agree" color="white" text @click="register">
              <span> ยอมรับและสมัครสมาชิก</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </AuthLogin>
</template>
<script>
import router from "@/router";
import axios from "axios";
import AuthLogin from "@/components/AuthLogin.vue";

export default {
  components: {
    AuthLogin,
  },
  data() {
    return {
      form: {
        name: "",
        username: "",
        password: "",
        roles: ["USER"],
      },
      loading: false,
      dialog: false,
      loginModal: false,
    };
  },
  methods: {
    async checkDuplicate() {
      try {
        const res = await axios.post("http://localhost:3000/auth/duplicate", {
          name: this.form.name,
          username: this.form.username,
          password: this.form.password,
          roles: this.form.roles,
        });
        if (res.status === 201) {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
          }, 2000);
        }
        setTimeout(() => {
          this.dialog = true;
        }, 2000);
      } catch (error) {
        if (error.response.status === 409) {
          this.showAlert()
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
            this.loginModal = false;
            router.push("/");
            this.$store.dispatch("auth/newUser");
          }, 2000);
        }
      } catch (e) {
        console.log(e);
      }
    },

    disagree() {
      this.dialog = false;
      router.push("/");
    },
    async register() {
      try {
        this.dialog = false;
        const res = await axios.post("http://localhost:3000/auth/register", {
          name: this.form.name,
          username: this.form.username,
          password: this.form.password,
          roles: this.form.roles,
        });
        if (res.status === 201) {
          this.loginModal = true;
          this.login();
        }
      } catch (error) {
        if (error.response.status === 409) {
          this.showAlert()
        }
      }
    },
    showAlert() {
      this.$swal({
        title: "ลองใหม่อีกครั้ง",
        confirmButtonColor: '#00af70',
        text: "Username นี้ถูกใช้ไปแล้ว",
        icon: "warning",
        button: "OK",
      });
    }
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
  border-radius: 10px;
}
.font-size {
  font-size: 5rem;
}

.img-size {
  width: 100px;
}
.btn-agree {
  border-radius: 10px;
  background-color: #00af70;
}
</style>
