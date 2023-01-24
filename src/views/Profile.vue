<template>
  <h1 class="text-center pb-5">จัดการบัญชี</h1>
  <v-card class="mx-auto" width="600">
    <v-row>
      <v-col>
        <v-card-text> {{ getName() }} </v-card-text>
        <v-card-text> Username : {{ getUsername() }} </v-card-text>
        <v-card-text> Email : {{ getEmail() }} </v-card-text>
      </v-col>
      <v-col>
        <div class="pa-2">
          <v-hover>
            <template v-slot:default="{ isHovering, props }">
              <v-btn
                v-bind="props"
                class="rounded-pill"
                color="success"
                :variant="isHovering ? 'elevated' : 'outlined'"
                >แก้ไขข้อมูลส่วนตัว</v-btn
              >
            </template>
          </v-hover>
        </div>
        <v-card-text> ชื่อ : {{ getName() }} </v-card-text>
        <v-card-text> เพศ : {{ getGender() }}</v-card-text>
      </v-col>
    </v-row>

  </v-card>
  <br>
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
</template>
<script>
import axios from "axios";
export default {
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
  }),
  methods: {
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
    getName() {
      return this.$store.getters["auth/getName"];
    },
    getUsername() {
      return this.$store.getters["auth/getUsername"];
    },
    getEmail() {
      return this.$store.getters["auth/getEmail"];
    },
    getGender() {
      return this.$store.getters["auth/getGender"];
    }
  },
};
</script>
<style></style>
