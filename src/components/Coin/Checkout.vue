<template>
  <h1 class="text-center mt-6 mb-6">รายละเอียดการแจ้งชำระเงิน</h1>
  <v-container>
    <span>สรุปการเติม Coin</span>
    <v-divider class="mt-3 mb-6"></v-divider>
    <v-card class="card px-12 py-6">
      <v-row>
        <v-col cols="12" class="d-flex flex-row align-center pa-0 mb-3 mt-3">
          <v-row>
            <v-col cols="6" class="d-flex justify-start"
              ><span>Username: </span></v-col
            >
            <v-col cols="6" class="d-flex justify-end"
              ><span>{{ user.username }} </span></v-col
            >
            <v-col cols="6" class="d-flex justify-start"
              ><span>จำนวน Coin ที่เติม: </span></v-col
            >
            <v-col cols="6" class="d-flex justify-end"
              ><span>{{ receipt.coin }} Coin</span></v-col
            >
            <v-col cols="6" class="d-flex justify-start"
              ><span>ช่องทางการชำระ: </span></v-col
            >
            <v-col cols="6" class="d-flex justify-end"
              ><span>{{ receipt.bankAccount }}</span></v-col
            >
            <v-col cols="6" class="d-flex justify-start">
              <v-avatar color="info">
                <v-img
                  :src="'http://localhost:3000/uploads/kbank.png'"
                  cover
                ></v-img>
              </v-avatar>
              <h4 class="ml-3">ธนาคาร กสิรกร เลขบัญชี 058-1502-710</h4></v-col
            >
            <v-col cols="6" class="d-flex justify-end"
              ><h4>ชื่อบัญชี นาย วุฒิวัฒน์ เพิ่มศิริกวินกุล</h4></v-col
            >
            <v-col cols="12" class="d-flex justify-start"
              ><span>แจ้งวันเวลาที่โอน<span style="color: red">*</span></span>
            </v-col>
            <v-col cols="6" class="d-flex justify-start"
              ><v-text-field
                v-model="formattedDate"
                :model-value="formattedDate"
                variant="solo"
                type="date"
            /></v-col>
            <v-col cols="6" class="d-flex justify-start"
              ><v-text-field
                v-model="currentTime"
                :model-value="currentTime"
                variant="solo"
                type="time"
            /></v-col>
            <v-col cols="12" class="d-flex justify-start"
              ><span>หลักฐานการโอนเงิน<span style="color: red">*</span></span>
            </v-col>
            <v-col cols="12">
              <v-file-input
                v-if="files === null"
                :rules="rules"
                label="อัพโหลดไฟล์ที่นี่"
                variant="solo"
                accept="image/png, image/jpeg, image/bmp"
                prepend-icon="mdi-camera"
                @change="onFileChange"
              >
              </v-file-input>
              <p v-else>
                {{ files[0].name }}
                <v-icon class="ml-1" @click="removeImage">mdi-close-box</v-icon>
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  <p class="back-add-coin text-center mt-3" @click="goToAddCoin">
    กลับไปแก้ไขช่องทางการชำระเงินหรือจำนวนเงิน
  </p>
  <v-container class="mt-3 mb-10">
    <v-card class="card py-6">
      <v-row>
        <v-col>
          <div class="d-flex flex-row align-center justify-center mb-5">
            <span style="font-size: 18px" class="text-total-price mr-2"
              >ยอดชำระ
            </span>
            <span class="text-total-price"> {{ receipt.coin }} </span>
          </div>
          <div class="d-flex flex-row align-center justify-center">
            <v-btn class="btn-bg" rounded width="200" @click="sendRequest"
              ><span style="font-size: 18px">แจ้งชำระเงิน</span></v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>

  <v-dialog v-model="loading" max-width="500" persistent>
    <v-card>
      <v-card-title class="center">
        <div class="img-size">
          <v-img src="https://media.tenor.com/9XCr9dBEygwAAAAi/peach-cat.gif">
          </v-img>
        </div>
      </v-card-title>
      <div class="center-loading">
        <v-progress-circular
          v-if="loading"
          :size="50"
          :width="5"
          indeterminate
          color="#2F58CD"
        ></v-progress-circular>
      </div>
      <v-card-text class="text-center">กำลังทำการแจ้งชำระเงิน</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import router from "@/router";
import api from "@/services/api";

export default {
  data() {
    return {
      date: new Date(),
      formattedDate: "",
      currentTime: "",
      receipt: [],
      user: [],
      loading: false,
      files: null,
      rules: [
        (value) => {
          return (
            !value ||
            !value.length ||
            value[0].size < 2000000 ||
            "Image size should be less than 2 MB!"
          );
        },
      ],
      imagePreview: "",
    };
  },
  methods: {
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
      this.files = null;
      this.imagePreview = "";
    },
    setReceipt() {
      this.receipt = this.$store.getters["checkoutCoin/getReceipt"];
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    goToAddCoin() {
      router.push("/coin").then(() => {
        window.scrollTo(0, 0);
      });
    },
    async fetchApi() {
      const res = await api.get("/profile/" + this.getId());
      this.user = res.data.user;
    },
    alertSuccess() {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#2F58CD",
        allowOutsideClick: false,
        width: "500",
        text: "แจ้งชำระเงินสำเร็จ",
        icon: "success",
        confirmButtonText: "ยืนยัน",
      });
    },
    async sendRequest() {
      if (this.imagePreview) {
        this.loading = true;
        const res = await api.post("/receipt", {
          request: "คำร้องขอเพิ่ม Coin",
          slipDate: this.formattedDate,
          slipTime: this.currentTime,
          user: this.getId(),
          username: this.user.username,
          amount: this.receipt.coin,
          method: this.receipt.bankAccount,
        });
        if (res.status === 201) {
          const receiptId = res.data.newReceipt._id;
          this.handleFileUpload(receiptId);
          setTimeout(() => {
            this.loading = false;
            this.$store.dispatch("checkoutCoin/setReceipt", null);
            router.push("/coin").then(() => {
              window.scrollTo(0, 0);
            });
            this.alertSuccess();
          }, 2000);
        }
      } else {
        this.$swal({
          scrollbarPadding: false,
          width: "500",
          confirmButtonColor: "#2F58CD",
          text: "กรุณาอัพโหลดรูปภาพ",
          icon: "warning",
          button: "OK",
          allowOutsideClick: false,
        });
      }
    },

    async handleFileUpload(receiptId) {
      try {
        let formData = new FormData();
        formData.append("image", this.files[0]);
        await api.post(`/upload/slip/${receiptId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.removeImage();
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    getReceipt() {
      return this.$store.getters["checkoutCoin/getReceipt"];
    },
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
  mounted() {
    if (this.getReceipt === null) {
      router.push("/coin");
    } else {
      if (this.isLogin) {
        this.setReceipt();
        this.fetchApi();
        this.currentTime = new Date().toLocaleTimeString().slice(0, 5);
        this.formattedDate = this.date.toISOString().split("T")[0];
      } else {
        router.push("/");
      }
    }
  },
};
</script>

<style scoped>
.card {
  background-color: #f6f6f6;
}
.back-add-coin {
  font-size: 14px;
  color: #5a5a5a;
  cursor: pointer;
}
.btn-bg {
  color: white;
  background-color: #2F58CD;
}
.img-size {
  width: 100px;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.center-loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
