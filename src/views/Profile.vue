<template>
  <h1 class="text-center pb-5">จัดการบัญชี</h1>
  <v-card class="mx-auto" width="600">
    <v-row>
      <v-col>
        <div class="d-flex align-center justify-start pa-6">
          <v-avatar size="x-large">
            <v-img :src="user.imageUrl"></v-img>
          </v-avatar>
        </div>
        <v-card-text> Username : {{ user.username }} </v-card-text>
        <v-card-text> Email : {{ user.email }} </v-card-text>
        <v-card-text> Phone : {{ phone() }} </v-card-text>
      </v-col>
      <v-col>
        <div class="pa-2">
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
        <v-card-text> ชื่อ : {{ firstName() }} </v-card-text>
        <v-card-text> นามสกุล : {{ lastName() }} </v-card-text>
        <v-card-text> ชื่อเล่น : {{ user.name }} </v-card-text>
        <v-card-text> เพศ : {{ user.gender }}</v-card-text>
      </v-col>
    </v-row>
  </v-card>
  <br />

  <v-file-input
    :rules="rules"
    ref="fileInput"
    v-model="file"
    accept="image/jpeg, image/png"
    placeholder="Pick an avatar"
    prepend-icon="mdi-camera"
    label="Upload Image"
    outlined
    @change="handleFileChange"
  ></v-file-input>
  <v-btn>Upload</v-btn>

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
  }),
  methods: {
    firstName(){
      return this.user.firstName ? this.user.firstName : 'ไม่ระบุ'
    },
    lastName(){
      return this.user.lastName ? this.user.lastName : 'ไม่ระบุ'
    },
    phone(){
      return this.user.phone ? this.user.phone : 'ไม่ระบุ'
    },
    toggleModal() {
      this.editModal = !this.editModal;
    },
    async handleUpload() {
      const formData = new FormData();
      formData.append("image", this.file);

      try {
        const { data } = await axios.post("/upload", formData);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    callback() {
      this.fetchApi();
    },
    async fetchApi() {
      const res = await api.get("/profile/" + this.$store.getters["auth/getId"]);
      this.user = res.data.user;
    },
  },
  mounted() {
    this.editModal = false;
    this.fetchApi();
  },
};
</script>
<style></style>
