<template>
  <h2 class="mb-3">เพิ่มแอดมิน</h2>
  <v-divider class="mb-5"></v-divider>
  <v-card>
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
          Display name <span style="color: red">*</span>
          <span style="color: gray"> 4-32 chars</span>
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
          variant="solo"
        ></v-select>
        <v-card-text class="pa-2"> ROLE </v-card-text>
        <v-select :items="roles" v-model="form.role" variant="solo"></v-select>
      </v-form>
    </v-container>
    <v-divider></v-divider>
    <v-card-actions class="d-flex justify-center">
      <v-btn
        type="submit"
        class="btn-color px-10"
        size="large"
        variant="elevated"
        @click="checkDuplicate"
        >ส่งข้อมูล
      </v-btn>
      <v-btn
        color="error"
        class="px-10"
        size="large"
        variant="elevated"
        @click="goToAdminTable"
        >ยกเลิก
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import router from "@/router";
import api from "@/services/api";

export default {
  data() {
    return {
      visible: false,
      valid: true,
      genders: ["Not specified", "Male", "Female"],
      roles: ["ADMIN", "LOCAL_ADMIN"],
      form: {
        name: "",
        username: "",
        password: "",
        repeatPassword: "",
        email: "",
        gender: "Not specified",
        role: ["ADMIN"],
      },
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
    goToAdminTable() {
      router.push("/admintable");
    },
    async checkDuplicate() {
      const { valid } = await this.$refs.form.validate();

      if (!valid) {
        this.showAlert("กรุณากรอกข้อมูลให้ถูกต้อง");
      } else {
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
              this.addNewAdmin();
              this.$swal({
                scrollbarPadding: false,
                confirmButtonColor: "#00af70",
                allowOutsideClick: false,
                width: "500",
                text: "เพิ่มข้อมูลสำเร็จ",
                icon: "success",
                button: "OK",
              });
              router.push("/admintable");
            }
          }
        } catch (error) {
          this.showAlert("Error");
        }
      }
    },

    resetForm() {
      this.form.name = "";
      this.form.username = "";
      this.form.password = "";
      this.form.repeatPassword = "";
      this.form.email = "";
      this.form.gender = "Not specified";
      this.form.role = ["ADMIN"];
    },
    async addNewAdmin() {
      try {
        await api.post("/users", {
          name: this.form.name,
          username: this.form.username,
          password: this.form.password,
          email: this.form.email,
          gender: this.form.gender,
          roles: this.form.role,
        });
      } catch (error) {
        console.log(error);
      }
    },
    showAlert(text) {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        text: text,
        icon: "warning",
        button: "OK",
      });
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["authAdmin/isLogin"];
    },
  },
  mounted() {
    if(!this.isLogin){
      router.push("/login")
    }
  },
};
</script>
<style scoped>
.btn-color {
  color: #ffff;
  background-color: #00af70;
}
</style>
