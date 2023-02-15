<template>
  <v-card>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              label="Name"
              v-model="userItems.name"
              :rules="nameRule"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Username"
              v-model="userItems.username"
              :rules="usernameRule"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Email"
              v-model="userItems.email"
              :rules="emailRule"
            />
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col>
            <v-text-field
              label="Password"
              v-model="userItems.password"
              :rules="[(v) => !!v || 'Password is required']"
            />
          </v-col>
        </v-row> -->
        <v-row>
          <v-col>
            <v-select
              label="Gender"
              v-model="userItems.gender"
              :items="genderItem"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <v-btn color="success" rounded @click="showConfirmDialog = true"
              >Accept</v-btn
            >
          </v-col>
          <v-col class="text-center">
            <v-btn color="Grey" rounded @click="submit">Back</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>

  <v-dialog
    v-model="showConfirmDialog"
    persistent
    style="z-index: 900"
    :center="true"
    max-width="500"
    :padding="20"
  >
    <v-card>
      <v-card-title class="headline">ยืนยันการแก้ไข</v-card-title>
      <v-card-text class="text-center"
        >ต้องการยืนยันการแก้ไขหรือไม่</v-card-text
      >
      <v-card-actions class="text-center">
        <v-btn color="success" @click="changeDuplicate">OK</v-btn>
        <v-btn color="Grey" text @click="showConfirmDialog = false"
          >Cancel</v-btn
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
      form: { username: "", email: "", },
      lazy: false,
      userItems: [],

      usernameRule: [
        (v) => !!v || "กรุณากรอก username",
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) =>
          /^[a-zA-Z0-9]+$|^[ก-๛0-9]+$/.test(v) ||
          "ชื่อต้องเป็นภาษาอังกฤษหรือภาษาไทยเท่านั้น และ ห้ามภาษาอังกฤษผสมภาษาไทย",
        (v) =>
          (v && v.length >= 4 && v.length <= 32) ||
          "ระบุอย่างน้อย 4 ตัวอักษร และน้อยกว่า 15 ตัวอักษร",
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
      genderItem: ["Male", "Female", "Other"],
      emailRule: [
        (v) => !!v || "กรุณากรอก Email",
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    async changeDuplicate() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        this.showAlert("กรุณากรอกข้อมูลให้ถูกต้อง");
      } else {
        try {
          const res = await api.post(
            "/checkDuplicateUser/" + this.$route.params.id,
            {
              username: this.userItems.username,
              email: this.userItems.email,
            }
          );
          if (
            res.status === 200 &&
            res.data.message === "Username and Email already exists"
          ) {

            this.showAlert("Username and Email already exists");
          } else if (
            res.status === 200 &&
            res.data.message === "Username already exists"
          ) {
            this.showAlert("Username already exists");
          } else if (
            res.status === 200 &&
            res.data.message === "Email already exists"
          ) {
            this.showAlert("Email already exists");
          } else if (
            res.status === 201 &&
            res.data.message === "Username and Email already"
          ) {
            this.showAlertSucsess("แก้ไขสำเร็จ");
            this.submit();
          }
        } catch (error) {
          console.log("ERROR");
        }
      }
    },
    changeStatus() {
      this.status = !this.status;
      alert(this.status);
    },
    alertvalidate() {},
    submit() {
      api.put("/users/" + this.$route.params.id, this.userItems).then(() => {
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
        icon: "error",
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
    resetForm(){
      this.formEdit.username = "",
      this.formEdit.email= ""

    },
    // alertUsername() {
    //   this.showConfirmDialog =false ;
    //   this.$swal({
    //     confirmButtonColor: "#00af70",
    //     allowOutsideClick: false,
    //     width: "500",
    //     text: "Username and Email already exists ",
    //     icon: "error",
    //     button: "OK",
    //   }
    //   );
    // },
    // alertEmail() {
    //   this.showConfirmDialog =false ;
    //   this.$swal({
    //     confirmButtonColor: "#00af70",
    //     allowOutsideClick: false,
    //     width: "500",
    //     text: "Username and Email already exists ",
    //     icon: "error",
    //     button: "OK",
    //   }
    //   );
    // },
    hideDialog() {
      this.resetForm();
      this.$emit("update:showConfirmDialog", false);
    },
    resetFormApi() {
      this.fetchApi();
    },
    fetchApi() {
      api.get("/users/" + this.$route.params.id).then((result) => {
        this.userItems = result.data;
      });
    },
  },
  mounted() {
    this.fetchApi();
  },
};
</script>

  <style scoped>
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