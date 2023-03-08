<template>
  <v-container class="mt-15">
    <v-card class="mx-auto" max-width="400">
      <v-img
        :src="'http://localhost:3000/uploads/thai_qr_payment.png'"
        cover
        height="200"
      >
      </v-img>
      <v-col cols="12" class="d-flex justify-center pa-0">
        <v-img :src="imageQRCode" width="300px" height="300px" />
      </v-col>

      <v-card-actions class="d-flex justify-center mb-3">
        <div>
          <v-btn
            @click="payment"
            class="btn-color mr-3"
            size="large"
            variant="elevated"
            >ยืนยันการชำระเงิน</v-btn
          >
        </div>
        <div>
          <v-btn
            @click="cancelPayment"
            color="error"
            size="large"
            variant="elevated"
            >ยกเลิก</v-btn
          >
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
  <h2 class="text-center mt-5">ชำระภายในเวลาที่กำหนด : {{ countdown }}</h2>
  <h2 class="text-center mt-5">ยอดชำระ : {{ receipt.coin }} บาท</h2>

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
          color="#00af70"
        ></v-progress-circular>
      </div>
      <v-card-text class="text-center">กำลังทำการแจ้งชำระเงิน</v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import api from "@/services/api";
import router from "@/router";
export default {
  data: () => ({
    date: new Date(),
    formattedDate: "",
    currentTime: "",
    imageQRCode: "",
    countdown: "15:00",
    timer: null,
    receipt: [],
    loading: false,
    user: [],
  }),
  methods: {
    async fetchApi() {
      const res = await api.get("/profile/" + this.getId());
      this.user = res.data.user;
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    async getQRCode() {
      const res = await api.post("/generateQR", {
        amount: this.receipt.coin,
      });
      this.imageQRCode = res.data.Result;
    },
    setReceipt() {
      this.receipt = this.$store.getters["checkoutCoin/getReceipt"];
    },
    startCountdown() {
      let time = 900;
      this.timer = setInterval(() => {
        if (time === 0) {
          clearInterval(this.timer);
          this.$router.push("/coin");
          this.$swal({
            scrollbarPadding: false,
            width: "500",
            confirmButtonColor: "#00af70",
            text: "กรุณาทำการชำระเงินใหม่อีกครั้ง",
            icon: "error",
            button: "OK",
            allowOutsideClick: false,
          });
        } else {
          let minutes = Math.floor(time / 60);
          let seconds = time % 60;
          this.countdown = `${minutes}:${
            seconds < 10 ? "0" + seconds : seconds
          }`;
          time--;
        }
      }, 1000);
    },
    async sendRequest() {
      await api.post("/receipt", {
        request: "คำร้องขอเพิ่ม Coin",
        slipDate: this.formattedDate,
        slipTime: this.currentTime,
        user: this.getId(),
        username: this.user.username,
        amount: this.receipt.coin,
        method: this.receipt.bankAccount,
      });
    },
    payment() {
      this.loading = true;
      this.sendRequest()
      setTimeout(() => {
        this.loading = false;
        this.$store.dispatch("checkoutCoin/setReceipt", null);
        router.push("/coin");
        this.$swal({
          scrollbarPadding: false,
          width: "500",
          confirmButtonColor: "#00af70",
          text: "ชำระเงินสำเร็จ",
          icon: "success",
          button: "OK",
          allowOutsideClick: false,
        });
      }, 2000);
    },
    cancelPayment() {
      this.$store.dispatch("checkoutCoin/setReceipt", null);
      router.push("/coin").then(() => {
        window.scrollTo(0, 0);
      });
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
      router.push("/coin").then(() => {
        window.scrollTo(0, 0);
      });
    } else {
      if (this.isLogin) {
        this.setReceipt();
        this.getQRCode();
        this.startCountdown();
        this.fetchApi();
        this.currentTime = new Date().toLocaleTimeString().slice(0, 5);
        this.formattedDate = this.date.toISOString().split("T")[0];
      } else {
        router.push("/").then(() => {
        window.scrollTo(0, 0);
      });
      }
    }
  },
};
</script>
<style scoped>
.btn-color {
  color: #ffff;
  background-color: #00af70;
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
