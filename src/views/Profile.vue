<template>
  <div class="text-center mt-6">
    <h1>จัดการบัญชี</h1>
  </div>
  <div class="mt-5" style="width: 100%">
    <v-row>
      <v-col cols="4">
        <div class="d-flex justify-start">
          <v-avatar size="x-large">
            <v-img :src="user.imageUrl" cover />
          </v-avatar>
          <div>
            <v-card-text> {{ user.name }} </v-card-text>
          </div>
        </div>
        <div class="mt-3">
          <v-btn  rounded="pill" color="grey" @click="loading = !loading">
            <v-icon class="mr-2">mdi-camera</v-icon>
            เปลี่ยนรูปโปรไฟล์
          </v-btn>
        </div>

        <v-dialog v-model="loading" max-width="500" persistent>
          <v-card>
            <div class="d-flex justify-end pa-0">
              <v-icon @click="hideModal">mdi-close</v-icon>
            </div>
            <v-card-title class="text-center"> อัพโหลดรูป </v-card-title>
            <div class="pa-3 center-loading">
              <v-file-input
                ref="fileInput"
                :rules="rules"
                variant="solo"
                accept="image/png, image/jpeg, image/bmp"
                prepend-icon="mdi-camera"
                @change="handleFileUpload"
              >
              </v-file-input>
            </div>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col>
        <div class="d-flex justify-end">
          <div>
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <v-btn
                  v-bind="props"
                  class="rounded-pill"
                  color="success"
                  @click="toggleModal"
                  :variant="isHovering ? 'elevated' : 'outlined'"
                  >แก้ไขข้อมูลส่วนตัว</v-btn
                >
              </template>
            </v-hover>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>

  <v-card class="mt-4 mx-auto card-bg">
    <v-row>
      <v-col class="pa-4">
        <div class="pa-3">
          <v-card-text>
            <span class="mr-3"> Username : </span>
            <span> {{ user.username }}</span>
          </v-card-text>
          <v-card-text>
            <span class="mr-3"> Email : </span>
            <span> {{ user.email }}</span>
          </v-card-text>
        </div>
      </v-col>
      <v-col class="pa-4">
        <div class="pa-3 div-border">
          <v-card-text>
            <span class="mr-3"> Firstname : </span>
            <span> {{ firstName() }}</span>
          </v-card-text>
          <v-card-text>
            <span class="mr-3"> Lastname : </span>
            <span> {{ lastName() }}</span>
          </v-card-text>
          <v-card-text>
            <span class="mr-3"> Gender : </span>
            <span> {{ user.gender }}</span>
          </v-card-text>
          <v-card-text>
            <span class="mr-3"> Phone : </span>
            <span> {{ phone() }}</span>
          </v-card-text>
        </div>
      </v-col>
    </v-row>
  </v-card>

  <ManageUserForm
    :editModal="editModal"
    @update:isVisible="editModal = $event"
    @someEvent="callback"
  />
</template>
<script>
import axios from "axios";
import api from "@/services/api";
import ManageUserForm from "@/components/ManageUserForm.vue";

export default {
  components: {
    ManageUserForm,
  },
  data: () => ({
    loading: false,
    rules: [
      (value) => {
        return (
          !value ||
          !value.length ||
          value[0].size < 2000000 ||
          "Avatar size should be less than 2 MB!"
        );
      },
    ],
    file: null,
    user: [],
    editModal: false,
    formData: null,
  }),
  methods: {
    firstName() {
      return this.user.firstName ? this.user.firstName : "ไม่ระบุ";
    },
    lastName() {
      return this.user.lastName ? this.user.lastName : "ไม่ระบุ";
    },
    phone() {
      return this.user.phone ? this.user.phone : "ไม่ระบุ";
    },
    toggleModal() {
      this.editModal = !this.editModal;
    },
    async handleFileUpload(e) {
      try {
        let formData = new FormData();
        formData.append("image", e.target.files[0]);
        formData.append("username", this.user.username);
        const response = await axios.post(
          "http://localhost:3000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.user = response.data;
        this.fetchApi();
        setTimeout(() => {
          this.loading = false;
        }, 300);
        this.showAlert()
      } catch (error) {
        console.log(error);
      }
    },
    hideModal() {
      this.loading = false;
    },
    showAlert() {
      this.$swal({
        confirmButtonColor: '#00af70',
        text: "เปลี่ยนรูปโปรไฟล์สำเร็จ",
        icon: "success",
        button: "OK",
      });
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    callback() {
      this.fetchApi();
    },
    async fetchApi() {
      const res = await api.get(
        "/profile/" + this.$store.getters["auth/getId"]
      );
      this.user = res.data.user;
      localStorage.setItem("user", JSON.stringify(this.user));
      this.$store.dispatch("auth/login", this.user);
    },
  },
  mounted() {
    this.editModal = false;
    this.fetchApi();
  },
};
</script>
<style scoped>
.div-border {
  border-left: 1px solid #e6e6e6;
}
.card-bg {
  background-color: #f6f6f6;
}
</style>
