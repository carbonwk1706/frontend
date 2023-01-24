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
      <v-card-text class="text-center font-color pa-2">
        Username : {{ user.username }}
      </v-card-text>
      <v-container class="pa-2">
        <v-form ref="form">
          <v-text-field
            label="Firstname"
            variant="outlined"
            required
            placeholder="Name"
            v-model="user.firstName"
          ></v-text-field>
          <v-text-field
            label="Lastname"
            variant="outlined"
            required
            placeholder="Name"
            v-model="user.lastName"
          ></v-text-field>
          <v-text-field
            label="Display Name"
            variant="outlined"
            required
            placeholder="Name"
            v-model="user.name"
          ></v-text-field>
          <v-text-field
            label="Phone"
            variant="outlined"
            required
            placeholder="Name"
            v-model="user.phone"
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
          @click="editUser"
          >ส่งข้อมูล
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import router from "@/router";
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
      isVisible: false,
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
      user: [],
    };
  },
  methods: {
    hideModal() {
      this.$emit("update:isVisible", false);
    },

    showAlert(text) {
      this.$swal({
        confirmButtonColor: "#00af70",
        width: "500",
        text: text,
        icon: "success",
        button: "OK",
      });
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },

    async editUser() {
      await api.put("/profile/" + this.$store.getters["auth/getId"], this.user);
      localStorage.setItem("user", JSON.stringify(this.user));
      this.$store.dispatch("auth/login", this.user);
      this.hideModal();
      router.push("/profile");
      this.$emit("someEvent");
      this.showAlert("บันทึกข้อมูลสำเร็จ");
    },
  },
  async mounted() {
    this.hideModal();
    const res = await api.get("/profile/" + this.$store.getters["auth/getId"]);
    this.user = res.data.user;
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
.font-color {
  font-size: 18px;
}
</style>
