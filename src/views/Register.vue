<template>
  <v-dialog
    transition="dialog-top-transition"
    v-model="registerModal"
    style='z-index:900;'
    class="pa-0"
    width="500px"
    persistent
  >
    <v-card>
      <div class="d-flex justify-end pa-0">
        <v-btn icon @click="hideModal">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <v-card-title primary-title class="text-center">
        สมัครสมาชิก
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="text-center font-color">
        กรุณาใส่ข้อมูลที่มีเครื่อง <span style="color: red">*</span> ให้ครบถ้วน
      </v-card-text>
      <v-container>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="checkDuplicate"
        >
          <v-card-text class="pa-2">
            Name <span style="color: red">*</span>
          </v-card-text>
          <v-text-field
            v-model="form.name"
            variant="outlined"
            required
            placeholder="Name"
            :rules="nameRules"
          ></v-text-field>
          <v-card-text class="pa-2">
            Username <span style="color: red">*</span>
            <span style="color: gray"> 4-32 chars [A-z, 0-9, _-@.]</span>
          </v-card-text>
          <v-text-field
            v-model="form.username"
            variant="outlined"
            required
            placeholder="Username"
            :rules="usernameRules"
          ></v-text-field>
          <v-card-text class="pa-2">
            Password <span style="color: red">*</span>
            <span style="color: gray"> ระบุอย่างน้อย 8 ตัว</span>
          </v-card-text>
          <v-text-field
            v-model="form.password"
            variant="outlined"
            type="password"
            required
            placeholder="Password"
            :rules="passwordRules"
          ></v-text-field>

          <v-checkbox
            v-model="terms"
            color="success"
            label="ฉันยอมรับข้อตกลงและเงื่อนไข"
            :rules="[(v) => !!v || 'กรุณากดตกลกเพื่อส่งข้อมูลสมัครสมาชิก!']"
          ></v-checkbox>
        </v-form>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          type="submit"
          block
          color="success"
          size="large"
          variant="elevated"
          @click="checkDuplicate"
          >ส่งข้อมูล
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="loading" max-width="500">
      <v-card>
        <v-card-title class="center">
          <div class="img-size">
            <v-img
              src="https://media.tenor.com/ItVLtljJHLoAAAAM/sweet-dreams.gif"
            >
            </v-img>
          </div>
        </v-card-title>
        <div class="center-loading">
          <v-progress-circular
            v-if="loading"
            :size="50"
            :width="5"
            indeterminate
            color="success"
          ></v-progress-circular>
        </div>
        <v-card-text class="text-center">กำลังสมัครสมาชิก</v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="loginModal" max-width="500">
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

    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-title class="text-center">
          <span class="text-h5">ข้อตกลงในการให้บริการ</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text
          >Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.</v-card-text
        >
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="disagree"> ยกเลิก </v-btn>
          <v-btn class="btn-agree" color="white" text @click="register">
            <span> ยอมรับและสมัครสมาชิก</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>
<script>
import router from "@/router";
import axios from "axios";

export default {
  data() {
    return {
      valid: true,
      form: {
        name: "",
        username: "",
        password: "",
        roles: ["USER"],
      },
      loading: false,
      dialog: false,
      loginModal: false,
      terms: false,
      nameRules: [(v) => !!v || "กรุณากรอกชื่อผู้ใช้"],
      usernameRules: [
        (v) => !!v || "กรุณากรอก Username",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "กรุณากรอก Password",
        (v) => (v && v.length >= 8) || "ระบุอย่างน้อย 8 ตัว",
      ],
    };
  },
  methods: {
    async checkDuplicate() {
      const { valid } = await this.$refs.form.validate();

      if (!valid) {
        this.showAlert("กรุณากรอกข้อมูลให้ถูกต้อง");
      } else if (this.terms) {
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
            this.showAlert("Username นี้ถูกใช้ไปแล้ว");
          }
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
        if (res.status !== 404) {
          setTimeout(() => {
            this.loginModal = false;
            this.hideModal();
            this.$store.dispatch("auth/login", user);
            this.$store.dispatch("auth/newUser");
          }, 2000);
        }
      } catch (e) {
        console.log(e);
      }
    },

    disagree() {
      this.dialog = false;
      this.hideModal();
    },
    hideModal() {
      this.$store.dispatch("auth/hideRegister");
      this.resetForm();
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
          this.showAlert("Username นี้ถูกใช้ไปแล้ว");
        }
      }
    },
    showAlert(text) {
      this.$swal({
        confirmButtonColor: "#00af70",
        width: "500",
        text: text,
        icon: "warning",
        button: "OK",
      });
    },
    resetForm() {
      this.form.name = "";
      this.form.username = "";
      this.form.password = "";
    },
  },
  computed: {
    registerModal() {
      return this.$store.getters["auth/registerModal"];
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
.img-size {
  width: 100px;
}
.btn-agree {
  border-radius: 10px;
  background-color: #00af70;
}
.font-color {
  color: #00af70;
  font-size: 16px;
}
</style>
