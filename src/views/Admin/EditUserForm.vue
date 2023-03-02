<template>
  <v-container fluid>
    <v-card>
      <v-row>
        <v-col cols="12" class="my-5">
          <v-form ref="form" v-model="valid" :lazy-validation="lazy">
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Name"
                    v-model="user.name"
                    :rules="nameRule"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Username"
                    v-model="user.username"
                    :rules="usernameRule"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Email"
                    v-model="user.email"
                    :rules="emailRule"
                  />
                </v-col>
              </v-row>
              <!-- <v-row>
          <v-col>
            <v-text-field
              label="Password"
              v-model="user.password"
              :rules="[(v) => !!v || 'Password is required']"
            />
          </v-col>
        </v-row> -->
              <v-row>
                <v-col>
                  <v-select
                    label="Gender"
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
                  <v-btn color="error" rounded @click="submit">ยกเลิก</v-btn>
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
        <v-btn  @click="checkDuplicate" class="mr-3 btn-success"
          >ยืนยัน</v-btn
        >
        <v-btn class="btn-cancel" @click="showConfirmDialog = false"
          >ยกเลิก</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import api from "@/services/api";

export default {
  name: "EditUser",
  data() {
    return {
      showConfirmDialog: false,
      valid: false,
      lazy: false,
      user: [],
      currentUsername: "",
      currentEmail: "",
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
    };
  },
  methods: {
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
              }else{
                this.submit()
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
              }else{
                this.submit()
              }
            } catch (error) {
              console.log(error);
            }
          }
          else if (
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
              }else{
                this.submit()
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
    submit() {
      api.put("/users/" + this.$route.params.id, this.user).then(() => {
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
  mounted() {
    this.fetchApi();
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
  background-color: #B00020;
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
