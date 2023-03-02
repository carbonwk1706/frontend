<template>
  <v-container fluid>
    <h2 class="mb-3 text-uppercase">แก้ไข USER ID-{{ user._id }}</h2>
    <v-divider class="mb-5"></v-divider>
    <v-card>
      <v-row>
        <v-col cols="12" class="my-5">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-container>
              <v-row>
                <v-col>
                  <v-card-text class="pa-2">
                    Display name <span style="color: red">*</span>
                    <span style="color: gray"> 4-32 chars</span>
                  </v-card-text>
                  <v-text-field
                    variant="outlined"
                    required
                    placeholder="Name"
                    v-model="user.name"
                    :rules="nameRule"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card-text class="pa-2">
                    Username <span style="color: red">*</span>
                    <span style="color: gray"> 4-32 chars [A-z, 0-9, _-@.]</span>
                  </v-card-text>
                  <v-text-field
                    prepend-inner-icon="mdi-account-outline"
                    variant="outlined"
                    required
                    placeholder="Username"
                    v-model="user.username"
                    :rules="usernameRule"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card-text class="pa-2">
                    Email <span style="color: red">*</span>
                  </v-card-text>
                  <v-text-field
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                    required
                    placeholder="Email"
                    v-model="user.email"
                    :rules="emailRule"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card-text class="pa-2">
                    Password <span style="color: red">*</span>
                    <span style="color: gray"> ระบุอย่างน้อย 8 ตัว</span>
                  </v-card-text>
                  <v-text-field
                    prepend-inner-icon="mdi-lock-outline"
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="visible = !visible"
                    :type="visible ? 'text' : 'password'"
                    variant="outlined"
                    required
                    placeholder="แก้ไขรหัสผ่าน"
                    v-model="password"
                    :rules="passwordRule"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-card-text class="pa-2"> Gender </v-card-text>
                  <v-select
                    variant="solo"
                    v-model="user.gender"
                    :items="genderItem"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col class="text-center">
                  <v-btn
                    class="btn-success"
                    rounded
                    @click="showConfirmDialog = true"
                    >ยืนยัน</v-btn
                  >
                </v-col>
                <v-col class="text-center">
                  <v-btn color="error" rounded @click="goToUserTable">ยกเลิก</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  <v-dialog
    v-model="showConfirmDialog"
    persistent
    :center="true"
    max-width="500"
    :padding="20"
  >
    <v-card>
      <v-card-title class="headline text-center">ยืนยันการแก้ไข</v-card-title>
      <v-card-text class="text-center"
        >ต้องการยืนยันการแก้ไขหรือไม่</v-card-text
      >
      <v-card-actions class="text-center">
        <v-btn @click="checkDuplicate" class="mr-3 btn-success">ยืนยัน</v-btn>
        <v-btn class="btn-cancel" @click="showConfirmDialog = false"
          >ยกเลิก</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import api from "@/services/api";
import router from "@/router";

export default {
  name: "EditUser",
  data() {
    return {
      showConfirmDialog: false,
      valid: false,
      visible: false,
      lazy: false,
      user: [],
      currentUsername: "",
      currentEmail: "",
      password: "",
      genderItem: ["Not specified", "Male", "Female"],
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
      emailRule: [
        (v) => !!v || "กรุณากรอก Email",
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRule: [
        (v) => !!v || "กรุณากรอก Password",
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) => (v && v.length >= 8) || "ระบุอย่างน้อย 8 ตัว",
      ],
    };
  },
  methods: {
    goToUserTable(){
      router.push("/usertable")
    },
    async checkDuplicate() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        this.showAlert("กรุณากรอกข้อมูลให้ถูกต้อง");
      } else {
        if (
          this.user.username === this.currentUsername &&
          this.user.email === this.currentEmail
        ) {
          try {
            this.submit();
          } catch (error) {
            console.log(error);
          }
        } else {
          if (
            this.user.username !== this.currentUsername &&
            this.user.email !== this.currentEmail
          ) {
            try {
              const res = await api.post("/checkDuplicateUser/", {
                username: this.user.username,
                email: this.user.email,
              });
              if (
                res.status === 200 &&
                res.data.message === "Username and Email already exist"
              ) {
                this.showAlert("Username and Email already exists");
              } else {
                this.submit();
              }
            } catch (error) {
              console.log(error);
            }
          } else if (
            this.user.username === this.currentUsername &&
            this.user.email !== this.currentEmail
          ) {
            try {
              const res = await api.post("/checkDuplicateUser/", {
                email: this.user.email,
              });
              if (
                res.status === 200 &&
                res.data.message === "Email already exists"
              ) {
                this.showAlert("Email already exists");
              } else {
                this.submit();
              }
            } catch (error) {
              console.log(error);
            }
          } else if (
            this.user.username !== this.currentUsername &&
            this.user.email === this.currentEmail
          ) {
            try {
              const res = await api.post("/checkDuplicateUser/", {
                username: this.user.username,
              });

              if (
                res.status === 200 &&
                res.data.message === "Username already exists"
              ) {
                this.showAlert("Username already exists");
              } else {
                this.submit();
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
    },
    changeStatus() {
      this.status = !this.status;
      alert(this.status);
    },
    getId() {
      return this.$store.getters["authAdmin/getId"];
    },
    submit() {
      api
        .put("/users/" + this.$route.params.id,  {
          name: this.user.name,
          username: this.user.username,
          password: this.password,
          email: this.user.email,
          gender: this.user.gender,
          roles: this.user.roles,
          adminId: this.getId()
        })
        .then(() => {
          this.$swal({
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        text: "แก้ไขข้อมูลสำเร็จ",
        icon: "success",
        button: "OK",
      });
          this.$router.push("/usertable");
        });
    },
    showAlert(text) {
      this.showConfirmDialog = false;
      this.$swal({
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        text: text,
        icon: "warning",
        button: "OK",
      });
    },
    showAlertSucsess(text) {
      this.showConfirmDialog = false;
      this.$swal({
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        icon: "success",
        text: text,
        button: "OK",
      });
    },
    resetForm() {
      (this.formEdit.username = ""), (this.formEdit.email = "");
    },
    hideDialog() {
      this.resetForm();
      this.$emit("update:showConfirmDialog", false);
    },
    resetFormApi() {
      this.fetchApi();
    },
    async fetchApi() {
      try {
        const result = await api.get("/users/" + this.$route.params.id);
        this.user = result.data;
        this.currentUsername = this.user.username;
        this.currentEmail = this.user.email;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["authAdmin/isLogin"];
    },
  },
  mounted() {
    if (this.isLogin) {
      this.fetchApi();
    } else {
      router.push("/login");
    }
  },
};
</script>

<style scoped>
.btn-success {
  color: #ffff;
  background-color: #00af70;
}
.btn-cancel {
  color: #ffff;
  background-color: #b00020;
}
.headerName {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  font-size: 36px;
  font-weight: bold;
}
.text-center {
  display: flex;
  justify-content: center;
}
.description {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 30px;
}
</style>
