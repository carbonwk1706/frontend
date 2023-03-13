<template>
  <v-row>
    <v-col cols="12">
      <h2 class="mb-5 text-center">รูปภาพที่แสดง</h2>
    </v-col>
  </v-row>
  <v-col cols="12" v-if="items.length <= 0">
    <v-divider class="mt-3 mb-6"></v-divider>
    <div class="d-flex justify-center">
      <img
        :src="'http://localhost:3000/uploads/notfoundicon.png'"
        width="200"
        height="200"
      />
    </div>
    <div class="text-noBook text-center">
      <p>ยังไม่มีภาพ Carousel ที่แสดง</p>
    </div>
    <div class="text-center mt-3">
      <p class="text-muted">คุณสามารถอัพโหลดรูปภาพ</p>
    </div>
    <div class="d-flex flex justify-center mt-3">
      <v-btn class="btn-bg" text @click="showDialog"> อัพโหลดรูปภาพ </v-btn>
    </div>
  </v-col>
  <v-carousel
    hide-delimiter-background
    :show-arrows="false"
    color="#2F58CD"
    style="height: 100"
    cycle
  >
    <v-carousel-item
      v-for="(item, index) in items"
      :key="index"
    >
      <v-img :src="item.imageURL" cover height="300"></v-img>
    </v-carousel-item>
  </v-carousel>
  <v-table dense class="elevation-1" v-if="items.length > 0">
    <thead class="table">
      <tr>
        <th class="text-left"><span class="text-color">รูปภาพ</span></th>
        <th class="text-center">
          <v-btn class="btn-bg" text @click="showDialog"> อัพโหลดรูปภาพ </v-btn>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
      )" :key="index">
        <td>{{ item.imageURL }}</td>
        <td class="d-flex justify-center mt-2">
          <v-btn
            variant="flat"
            class="mr-3 btn-success"
            @click="showEdit(item._id)"
            >แก้ไข</v-btn
          >
          <v-btn
            variant="flat"
            color="error"
            class="mr-3"
            @click="deleteImage(item._id)"
            >ลบ</v-btn
          >
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-row v-if="items.length > 0" class="mt-12">
    <v-col cols="12" class="pa-0">
      <v-pagination
        class="text-pagination"
        v-model="page"
        :length="pages"
        circle
      ></v-pagination>
    </v-col>
  </v-row>

  <v-dialog v-model="loading" width="600" persistent style="z-index: 900">
    <v-card>
      <div class="d-flex justify-end pa-1">
        <v-icon @click="hideModal">mdi-close</v-icon>
      </div>
      <v-card-title class="text-center font-text">
        อัพโหลดรูป
        <div class="center">
          <div class="img-size">
            <v-img :src="imagePreview" width="400px" />
          </div>
        </div>
      </v-card-title>
      <div class="pa-3 center-loading">
        <v-file-input
          :rules="rules"
          label="อัพโหลดไฟล์ที่นี่"
          variant="solo"
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon="mdi-camera"
          @change="onFileChange"
        >
        </v-file-input>
      </div>
      <v-card-actions class="center">
        <v-btn color="white" class="btn-bg" text @click="handleFileUpload">
          อัพโหลด
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="edit" width="600" persistent style="z-index: 900">
    <v-card>
      <div class="d-flex justify-end pa-1">
        <v-icon @click="hideModalEdit">mdi-close</v-icon>
      </div>
      <v-card-title class="text-center font-text">
        อัพโหลดรูป
        <div class="center">
          <div class="img-size">
            <v-img :src="imagePreview" width="400px" />
          </div>
        </div>
      </v-card-title>
      <div class="pa-3 center-loading">
        <v-file-input
          :rules="rules"
          label="อัพโหลดไฟล์ที่นี่"
          variant="solo"
          accept="image/png, image/jpeg, image/bmp"
          prepend-icon="mdi-camera"
          @change="onFileChange"
        >
        </v-file-input>
      </div>
      <v-card-actions class="center">
        <v-btn color="white" class="btn-bg" text @click="handleFileUploadEdit">
          อัพโหลด
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import api from "@/services/api";
import router from "@/router";

export default {
  data() {
    return {
      items: [],
      loading: false,
      edit: false,
      imagePreview: "",
      idImage: "",
      files: null,
      page: 1,
      itemsPerPage: 5,
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
    };
  },
  methods: {
    getId() {
      return this.$store.getters["authAdmin/getId"];
    },
    async deleteImage(item) {
      await api.delete("/carousel/" + item);
      this.$swal({
        scrollbarPadding: false,
        width: "500",
        confirmButtonColor: "#2F58CD",
        text: "อัพโหลดรูปภาพสำเร็จ",
        icon: "success",
        button: "OK",
        allowOutsideClick: false,
      });
      this.getCarousel();
    },
    onFileChange(e) {
      this.files = e.target.files;
      if (!this.files.length) return;

      this.createImage(this.files[0]);
    },
    createImage(files) {
      let reader = new FileReader();
      reader.onload = (event) => {
        this.imagePreview = event.target.result;
      };
      reader.readAsDataURL(files);
    },
    removeImage() {
      this.imagePreview = "";
    },
    async handleFileUpload() {
      if (this.imagePreview) {
        try {
          let formData = new FormData();
          formData.append("image", this.files[0]);
          await api.post("/upload/carousel/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          this.removeImage();
          this.loading = false;
          this.$swal({
            scrollbarPadding: false,
            width: "500",
            confirmButtonColor: "#2F58CD",
            text: "อัพโหลดรูปภาพสำเร็จ",
            icon: "success",
            button: "OK",
            allowOutsideClick: false,
          });
          this.getCarousel();
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$swal({
          scrollbarPadding: false,
          width: "500",
          confirmButtonColor: "#2F58CD",
          text: "กรุณาอัพโหลดรูปภาพ",
          icon: "error",
          button: "OK",
          allowOutsideClick: false,
        });
      }
    },
    async handleFileUploadEdit() {
      if (this.imagePreview) {
        try {
          let formData = new FormData();
          formData.append("image", this.files[0]);
          await api.post("/upload/carousel/" + this.idImage, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          this.removeImage();
          this.edit = false;
          this.$swal({
            scrollbarPadding: false,
            width: "500",
            confirmButtonColor: "#2F58CD",
            text: "อัพโหลดรูปภาพสำเร็จ",
            icon: "success",
            button: "OK",
            allowOutsideClick: false,
          });
          this.getCarousel();
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$swal({
          scrollbarPadding: false,
          width: "500",
          confirmButtonColor: "#2F58CD",
          text: "กรุณาอัพโหลดรูปภาพ",
          icon: "error",
          button: "OK",
          allowOutsideClick: false,
        });
      }
    },
    hideModal() {
      this.loading = false;
      this.removeImage();
    },
    hideModalEdit() {
      this.edit = false;
      this.removeImage();
    },
    showDialog() {
      this.loading = true;
    },
    showEdit(item) {
      this.idImage = item;
      this.edit = true;
    },
    async getCarousel() {
      const res = await api.get("/carousel/");
      this.items = res.data.carousels;
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    isLogin() {
      return this.$store.getters["authAdmin/isLogin"];
    },
  },
  async created() {
    if (!this.isLogin) {
      router.push("/login").then(() => {
        window.scrollTo(0, 0);
      });
    } else if (this.isLogin) {
      const res = await api.get("/checkRoles/" + this.getId());
      if (!res.data.user.roles.includes("LOCAL_ADMIN")) {
        router.push("/login").then(() => {
          window.scrollTo(0, 0);
        });
      } else {
        this.getCarousel();
      }
    }
  },
};
</script>
<style scoped>
.btn-success {
  color: #ffff;
  background-color: #00af70;
}

.text-color {
  color: #ffff;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.table {
  background-color: #0008c1;
}
.btn-bg {
  color: white;
  background-color: #2f58cd;
}
</style>
