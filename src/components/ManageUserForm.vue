<template>
  <v-dialog
    transition="dialog-top-transition"
    v-model="isVisible"
    style="z-index: 900"
    class="pa-0"
    max-width="500px"
    persistent
  >
    <v-card class="pa-4">
      <div class="d-flex justify-end pa-0">
        <v-icon @click="hideModal">mdi-close</v-icon>
      </div>
      <v-card-title primary-title class="text-center pa-1">
        แก้ไขข้อมูลส่วนตัว
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="text-center font-color pa-3">
        Username : {{ user.username }}
      </v-card-text>
      <v-container class="pa-2">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            label="Firstname"
            variant="outlined"
            required
            placeholder="Name"
            v-model="user.firstName"
            :rules="firstNameRule"
            class="mb-3"
          ></v-text-field>
          <v-text-field
            label="Lastname"
            variant="outlined"
            required
            placeholder="Name"
            v-model="user.lastName"
            :rules="lastNameRule"
            class="mb-3"
          ></v-text-field>
          <v-text-field
            label="Display Name"
            variant="outlined"
            required
            placeholder="Name"
            v-model="user.name"
            :rules="nameRule"
            class="mb-3"
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-phone"
            label="Phone"
            variant="outlined"
            required
            placeholder="Name"
            v-model="user.phone"
            counter="10"
            :rules="phoneRule"
          ></v-text-field>
          <v-card-text class="pa-2"> Gender </v-card-text>
          <v-select
            variant="solo"
            :items="genders"
            v-model="user.gender"
          ></v-select>
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
          @click="showModalConfirm"
          >ส่งข้อมูล
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    class="pa-0"
    v-model="showConfirm"
    max-width="500"
    persistent
    style="z-index: 900"
  >
    <v-card>
      <div class="d-flex justify-end pa-1">
        <v-icon @click="toggleShowModalConfirm">mdi-close</v-icon>
      </div>
      <v-card-title class="text-center font-text">
        ยืนยันรหัสผ่าน
      </v-card-title>
      <div class="pa-3 center-loading">
        <v-text-field
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="visible = !visible"
          label="Password"
          v-model="password"
          variant="outlined"
          :type="visible ? 'text' : 'password'"
        ></v-text-field>
      </div>
      <v-card-actions class="center">
        <v-btn color="white" class="btn-bg" text @click="confirmPassword">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import api from "@/services/api";

export default {
  props: {
    editModal: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    editModal() {
      this.isVisible = this.$props.editModal;
    },
  },
  data() {
    return {
      visible: false,
      showConfirm: false,
      isVisible: false,
      password: "",
      genders: ["Not specified", "Male", "Female"],
      form: {
        name: "",
        username: "",
        password: "",
        repeatPassword: "",
        email: "",
        gender: "Not specified",
      },
      user: [],
      valid: true,
    };
  },
  computed: {
    firstNameRule() {
      return [
        (v) => !v || !!v,
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) =>
          !v ||
          /^[a-zA-Z]+$|^[ก-๛]+$/.test(v) ||
          "ชื่อต้องเป็นภาษาอังกฤษหรือภาษาไทยเท่านั้น และ ห้ามภาษาอังกฤษผสมภาษาไทย",
      ];
    },
    lastNameRule() {
      return [
        (v) => !v || !!v,
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) =>
          !v ||
          /^[a-zA-Z]+$|^[ก-๛]+$/.test(v) ||
          "ชื่อต้องเป็นภาษาอังกฤษหรือภาษาไทยเท่านั้น และ ห้ามภาษาอังกฤษผสมภาษาไทย",
      ];
    },
    nameRule() {
      return [
        (v) => !!v || "กรุณากรอกชื่อเล่น",
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) =>
          /^[a-zA-Z0-9]+$|^[ก-๛0-9]+$/.test(v) ||
          "ชื่อต้องเป็นภาษาอังกฤษหรือภาษาไทยเท่านั้น และ ห้ามภาษาอังกฤษผสมภาษาไทย",
        (v) =>
          (v && v.length >= 4 && v.length <= 32) ||
          "ระบุอย่างน้อย 4 ตัวอักษร และน้อยกว่า 15 ตัวอักษร",
      ];
    },
    phoneRule() {
      return [
        (v) => !!v || "กรุณากรอกเบอร์โทรศัพท์",
        (v) => !/[ ]/.test(v) || "ห้ามเว้นวรรค",
        (v) => /^0\d+$/.test(v) || "เบอร์โทรศัพท์ขึ้นต้นด้วย 0 ตามด้วยตัวเลข",
        (v) => (v && v.length === 10) || "ระบุอย่างน้อย 10 ตัว",
      ];
    },
  },
  methods: {
    async showModalConfirm() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        this.alertError("ระบุข้อมูลให้ถูกต้อง");
      } else {
        this.showConfirm = true;
      }
    },
    toggleShowModalConfirm() {
      this.showConfirm = !this.showConfirm;
      this.password = "";
    },
    async confirmPassword() {
      try {
        const response = await api.post("/confirmPassword", {
          id: this.getId(),
          password: this.password,
        });
        if (response.data.message === "Correct password") {
          this.editUser();
          this.password = "";
          this.showConfirm = false;
        } else {
          this.alertError("รหัสผ่านไม่ถูกต้อง");
        }
      } catch (error) {
        console.log(error);
      }
    },
    hideModal() {
      this.resetForm();
      this.$emit("update:isVisible", false);
    },
    async resetForm() {
      this.fetchApi();
    },
    showAlert(text) {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        text: text,
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.value) {
          window.location.reload();
        }
      });
    },
    alertError(text) {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        text: text,
        icon: "error",
        button: "OK",
      });
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },

    async editUser() {
      await api.put("/profile/" + this.getId(), this.user);
      this.hideModal();
      console.log("edit");
      this.$emit("update:someEvent");
      this.showAlert("บันทึกข้อมูลสำเร็จ");
    },
    async fetchApi() {
      const res = await api.get("/profile/" + this.getId());
      this.user = res.data.user;
    },
  },
  mounted() {
    this.hideModal();
    this.fetchApi();
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
.font-color {
  font-size: 18px;
}
.btn-bg {
  background-color: #00af70;
}
</style>
