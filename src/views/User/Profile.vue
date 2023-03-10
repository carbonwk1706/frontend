<template>
  <Auth v-if="isLogin">
    <v-container fluid>
      <div class="mt-6 mb-5 text-center">
        <h1>จัดการบัญชี</h1>
      </div>
      <div class="mt-5">
        <v-row>
          <v-col>
            <div class="d-flex justify-start">
              <v-avatar size="x-large">
                <v-img :src="user.imageUrl" cover />
              </v-avatar>
              <div>
                <v-card-text class="font-text font-size-content">
                  {{ user.name }}
                </v-card-text>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <v-row>
        <v-col>
          <div class="mt-3">
            <v-btn
              class="font-text"
              rounded="pill"
              color="grey"
              @click="loading = !loading"
            >
              <v-icon class="mr-2">mdi-camera</v-icon>
              เปลี่ยนรูปโปรไฟล์
            </v-btn>
            <v-dialog
              v-model="loading"
              width="600"
              persistent
              style="z-index: 900"
            >
              <v-card>
                <div class="d-flex justify-end pa-1">
                  <v-icon @click="hideModal">mdi-close</v-icon>
                </div>
                <v-card-title class="text-center font-text">
                  อัพโหลดรูป
                  <div class="center">
                    <div class="img-size">
                      <v-img :src="imagePreview" width="200px" />
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
                  <v-btn
                    color="white"
                    class="btn-bg"
                    text
                    @click="handleFileUpload"
                  >
                    อัพโหลด
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-col>
        <v-col>
          <div class="mt-3 d-flex justify-end">
            <div>
              <v-btn
                class="rounded-pill px-8 font-text btn-color"
                @click="toggleModal"
                >แก้ไขข้อมูลส่วนตัว</v-btn
              >
            </div>
          </div>
        </v-col>
      </v-row>

      <v-card class="mt-4 mx-auto card-bg">
        <v-row>
          <v-col class="pa-4">
            <div class="pa-3">
              <v-card-text>
                <v-row class="pa-2">
                  <span class="mr-3 text-width font-text font-size-content"
                    >ID</span
                  >
                  <span class="upperText font-text" style="color: #5a5a5a">{{
                    user._id
                  }}</span>
                </v-row>
              </v-card-text>
              <v-card-text>
                <v-row class="pa-2">
                  <span class="mr-3 text-width font-text font-size-content"
                    >Username</span
                  >
                  <span class="font-text" style="color: #5a5a5a">{{
                    user.username
                  }}</span>
                </v-row>
              </v-card-text>
              <v-card-text>
                <v-row class="pa-2">
                  <span class="mr-3 text-width font-text font-size-content"
                    >Email</span
                  >
                  <span class="font-text" style="color: #5a5a5a">{{
                    user.email
                  }}</span>
                </v-row>
              </v-card-text>
            </div>
          </v-col>
          <v-col class="pa-4">
            <div class="pa-3 div-border">
              <v-card-text>
                <v-row class="pa-2">
                  <span class="font-text mr-3 text-width font-size-content"
                    >Firstname</span
                  >
                  <span class="font-text" style="color: #5a5a5a">{{
                    firstName()
                  }}</span>
                </v-row>
              </v-card-text>
              <v-card-text>
                <v-row class="pa-2">
                  <span class="font-text mr-3 text-width font-size-content"
                    >Lastname</span
                  >
                  <span class="font-text" style="color: #5a5a5a">{{
                    lastName()
                  }}</span>
                </v-row>
              </v-card-text>
              <v-card-text>
                <v-row class="pa-2">
                  <span class="font-text mr-3 text-width font-size-content"
                    >Gender</span
                  >
                  <span class="font-text" style="color: #5a5a5a">{{
                    user.gender
                  }}</span>
                </v-row>
              </v-card-text>
              <v-card-text>
                <v-row class="pa-2">
                  <span class="font-text mr-3 text-width font-size-content"
                    >Phone</span
                  >
                  <span class="font-text" style="color: #5a5a5a">
                    {{ phone() }}</span
                  >
                </v-row>
              </v-card-text>
            </div>
          </v-col>
        </v-row>
      </v-card>

        <v-row align="center" class="mt-6">
          <v-col>
            <v-card @click="goToWishlist" class="cardHover" height="128px">
              <v-card-title class="text-color font-text"
                >รายการที่อยากได้</v-card-title
              >
              <v-card-text style="font-size: 12px" class="font-text">
                รายการหนังสือหรือซีรีย์ที่คุณเคยกดอยากได้
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card @click="goToHistoryBuy" class="cardHover" height="128px">
              <v-card-title class="text-color font-text"
                >ประวัติการสั่งหนังสือ</v-card-title
              >
              <v-card-text style="font-size: 12px" class="font-text">
                รวมรายการสั่งซื้อสินค้าของคุณ และรายละเอียดการชำระเงิน
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card @click="goToBookcase" class="cardHover" height="128px">
              <v-card-title class="text-color font-text"
                >ชั้นหนังสือของฉัน</v-card-title
              >
              <v-card-text style="font-size: 12px" class="font-text"
                >รายการหนังสือทั้งหมดของคุณ</v-card-text
              >
            </v-card>
          </v-col>
        </v-row>

        <ManageUserForm
        :editModal="editModal"
        @update:isVisible="editModal = $event"
        @update:someEvent="callback"
      />
    </v-container>
  </Auth>

  <Auth v-if="!isLogin"></Auth>
</template>
<script>
import api from "@/services/api";
import ManageUserForm from "@/components/ManageUserForm.vue";
import router from "@/router";
import Auth from "@/components/Auth.vue";

export default {
  components: {
    ManageUserForm,
    Auth,
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
    files: null,
    user: [],
    editModal: false,
    imagePreview: "",
  }),
  methods: {
    goToWishlist() {
      router.push("/wishlist").then(() => {
        window.scrollTo(0, 0);
      });
    },
    goToBookcase() {
      router.push("/mybook").then(() => {
        window.scrollTo(0, 0);
      });
    },
    goToHistoryBuy() {
      router.push("/orderhistory").then(() => {
        window.scrollTo(0, 0);
      });
    },
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
          formData.append("username", this.user.username);
          const response = await api.post("/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          this.removeImage();
          this.user = response.data;
          this.loading = false;
          setTimeout(() => {
            this.fetchApi();
            this.$store.dispatch("user/setUpdateUser", true);
          }, 1000);
          this.showAlert();
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
    showAlert() {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#2F58CD",
        customClass: "show-modal",
        text: "เปลี่ยนรูปโปรไฟล์สำเร็จ",
        icon: "success",
        allowOutsideClick: false,
        confirmButtonText: "OK",
      })
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    callback() {
      this.fetchApi();
    },
    async fetchApi() {
      const res = await api.get("/profile/" + this.getId());
      this.user = res.data.user;
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
  mounted() {
    if (this.isLogin) {
      this.editModal = false;
      this.fetchApi();
    }
  },
};
</script>
<style scoped>
.btn-color {
  color: #00af70;
  border: 1px solid #2F58CD;
  box-shadow: none;
}
.btn-color:hover {
  color: #ffff;
  background-color: #2F58CD;
  box-shadow: none;
}
.font-size-content {
  font-size: 16px;
}
.font-text {
  font-family: Prompt, sans-serif;
}
.text-header {
  font-size: 2.5rem;
}
.cardHover:hover {
  border: 1px solid #2F58CD;
  cursor: pointer;
}
.text-color {
  color: #2F58CD;
  font-family: Prompt, sans-serif;
}
.div-border {
  border-left: 1px solid #e6e6e6;
}
.card-bg {
  background-color: #f6f6f6;
}
.text-width {
  width: 20%;
}
.upperText {
  text-transform: uppercase;
}
.img-size {
  width: 200px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-bg {
  background-color: #2F58CD;
}
</style>
