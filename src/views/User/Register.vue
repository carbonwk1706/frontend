<template>
  <v-dialog
    transition="dialog-top-transition"
    v-model="isVisible"
    style="z-index: 900"
    max-width="500px"
    persistent
  >
    <v-card class="pa-4">
      <div class="d-flex justify-end pa-0">
        <v-icon @click="hideModal">mdi-close</v-icon>
      </div>

      <v-divider></v-divider>
      <v-card-text class="text-center font-color pa-2">
        กรุณาใส่ข้อมูลที่มีเครื่อง <span style="color: red">*</span> ให้ครบถ้วน
      </v-card-text>
      <v-container class="pa-2">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="checkDuplicate"
        >
          <v-card-text class="pa-2">
            Username <span style="color: red">*</span>
            <span style="color: gray"> 4-32 chars [A-z, 0-9, _-@.]</span>
          </v-card-text>
          <v-text-field
            v-model="form.username"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
            required
            placeholder="Username"
            :rules="usernameRule"
          ></v-text-field>
          <v-card-text class="pa-2">
            Password <span style="color: red">*</span>
            <span style="color: gray"> ระบุอย่างน้อย 8 ตัว</span>
          </v-card-text>
          <v-text-field
            v-model="form.password"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="visible = !visible"
            :type="visible ? 'text' : 'password'"
            variant="outlined"
            required
            placeholder="Password"
            :rules="passwordRule"
          ></v-text-field>
          <v-card-text class="pa-2">
            Repeat Password <span style="color: red">*</span>
          </v-card-text>
          <v-text-field
            v-model="form.repeatPassword"
            prepend-inner-icon="mdi-repeat"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="visible = !visible"
            :type="visible ? 'text' : 'password'"
            variant="outlined"
            required
            placeholder="Repeat Password"
            :rules="[
              (v) => !!v || 'Please repeat your password',
              checkPasswordMatch,
            ]"
          ></v-text-field>
          <v-card-text class="pa-2">
            Email <span style="color: red">*</span>
          </v-card-text>
          <v-text-field
            v-model="form.email"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            required
            placeholder="Email"
            :rules="emailRule"
          ></v-text-field>
          <v-card-text class="pa-2">
            Display name <span style="color: red">*</span> <span style="color: gray"> 4-32 chars</span>
          </v-card-text>
          <v-text-field
            v-model="form.name"
            variant="outlined"
            required
            placeholder="Name"
            :rules="nameRule"
          ></v-text-field>
          <v-card-text class="pa-2"> Gender </v-card-text>
          <v-select
            :items="genders"
            v-model="form.gender"
            variant="outlined"
          ></v-select>

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
          class="btn-color"
          size="large"
          variant="elevated"
          @click="checkDuplicate"
          >ส่งข้อมูล
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="loading" max-width="500" persistent>
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
            color="#2F58CD"
          ></v-progress-circular>
        </div>
        <v-card-text class="text-center">กำลังสมัครสมาชิก</v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="loginModal" max-width="500" persistent>
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
            color="#2F58CD"
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
import api from "@/services/api";

export default {
  props: {
    registerModal: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    registerModal() {
      this.isVisible = this.$props.registerModal;
    },
    loading(newValue) {
      if (newValue) {
        document.body.classList.add("dialog-open");
      } else {
        document.body.classList.remove("dialog-open");
      }
    },
    isVisible(newValue) {
      if (newValue) {
        document.body.classList.add("dialog-open");
      } else {
        document.body.classList.remove("dialog-open");
      }
    },
    dialog(newValue) {
      if (newValue) {
        document.body.classList.add("dialog-open");
      } else {
        document.body.classList.remove("dialog-open");
      }
    },
    loginModal(newValue) {
      if (newValue) {
        document.body.classList.add("dialog-open");
      } else {
        document.body.classList.remove("dialog-open");
      }
    },
  },
  data() {
    return {
      isVisible: false,
      visible: false,
      valid: true,
      genders: ["Not specified", "Male", "Female"],
      form: {
        name: "",
        username: "",
        password: "",
        repeatPassword: "",
        email: "",
        gender: "Not specified",
        roles: ["USER"],
      },
      loading: false,
      dialog: false,
      loginModal: false,
      terms: false,
      usernameRule: [
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) => !!v || "กรุณากรอก username",
        (v) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@-_])/.test(v) ||
          "มีสัญลักษณ์พิเศษและตัวอักษรตัวใหญ่และเลข 0-9",
        (v) =>
          (v && v.length >= 4 && v.length <= 32) ||
          "ระบุอย่างน้อย 4 ตัวอักษร และ น้อยกว่า 32 ตัวอักษร",
      ],
      emailRule: [
        (v) => !!v || "กรุณากรอก Email",
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      nameRule: [
        (v) => !!v || "กรุณากรอกชื่อเล่น",
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) =>
          /^[a-zA-Z0-9]+$|^[ก-๛0-9]+$/.test(v) ||
          "ชื่อต้องเป็นภาษาอังกฤษหรือภาษาไทยเท่านั้น และ ห้ามภาษาอังกฤษผสมภาษาไทย",
        (v) =>
          (v && v.length >= 4 && v.length <= 32) ||
          "ระบุอย่างน้อย 4 ตัวอักษร และน้อยกว่า 15 ตัวอักษร",
      ],
      passwordRule: [
        (v) => !!v || "กรุณากรอก Password",
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) => (v && v.length >= 8) || "ระบุอย่างน้อย 8 ตัว",
      ],
    };
  },
  methods: {
    checkPasswordMatch(v) {
      return v === this.form.password || "รหัสผ่านไม่ตรงกัน";
    },
    async checkDuplicate() {
      const { valid } = await this.$refs.form.validate();

      if (!valid) {
        this.showAlert("กรุณากรอกข้อมูลให้ถูกต้อง");
      } else if (this.terms) {
        try {
          const res = await api.post("/auth/duplicate", {
            username: this.form.username,
            email: this.form.email,
          });
          if (
            res.status === 200 &&
            res.data.message === "Username and Email already exists"
          ) {
            this.showAlert("Username และ Email นี้ถูกใช้ไปแล้ว");
          } else {
            if (
              res.status === 201 &&
              res.data.message === "Username and Email already"
            ) {
              this.loading = true;
              setTimeout(() => {
                this.loading = false;
              }, 2000);
            }
            setTimeout(() => {
              this.dialog = true;
            }, 2000);
          }
        } catch (error) {
          this.showAlert("Error");
        }
      }
    },

    async login() {
      try {
        const res = await api.post("/auth/login", {
          username: this.form.username,
          password: this.form.password,
        });
        if (res.status === 200) {
          const user = res.data.user;
          const token = res.data.token;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          setTimeout(() => {
            this.loginModal = false;
            this.$store.dispatch("auth/login", user);
            this.$store.dispatch("auth/newUser");
            this.hideModal();
          }, 2000);
        }
      } catch (e) {
        alert(e);
      }
    },

    disagree() {
      this.dialog = false;
      this.hideModal();
    },
    hideModal() {
      this.$emit("update:isVisible", false);
      this.resetForm();
      router.push("/");
    },
    async register() {
      try {
        this.dialog = false;
        const res = await api.post("/auth/register", {
          name: this.form.name,
          username: this.form.username,
          password: this.form.password,
          email: this.form.email,
          gender: this.form.gender,
          roles: this.form.roles,
        });
        if (res.status === 201) {
          this.loginModal = true;
          this.login();
        }
      } catch (error) {
        alert(error);
      }
    },
    showAlert(text) {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#2F58CD",
        allowOutsideClick: false,
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
      this.form.repeatPassword = "";
      this.form.email = "";
      this.terms = false;
      this.form.gender = "Not specified";
    },
  },
  mounted() {
    this.$emit("update:isVisible", false);
  }
};
</script>
<style scoped>
.btn-color {
  color: #ffff;
  background-color: #2F58CD;
}
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
  background-color: #2F58CD;
}
.font-color {
  color: #2F58CD;
  font-size: 16px;
}
</style>
