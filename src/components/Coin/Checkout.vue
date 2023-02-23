<template>
  <h1 class="text-center mt-6 mb-6">รายละเอียดการชำระ</h1>
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
              ><span class="text-price">{{ user.username }} </span></v-col
            >
            <v-col cols="6" class="d-flex justify-start"
              ><span>จำนวน Coin ที่เติม: </span></v-col
            >
            <v-col cols="6" class="d-flex justify-end"
              ><span class="text-price">{{ receipt.coin }}</span></v-col
            >
            <v-col cols="6" class="d-flex justify-start"
              ><span>ช่องทางการชำระ: </span></v-col
            >
            <v-col cols="6" class="d-flex justify-end"
              ><span class="text-price">{{ receipt.bankAccount }}</span></v-col
            >
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  <p class="back-add-coin text-center mt-3" @click="goToAddCoin">
    กลับไปแก้ไขธนาคารหรือจำนวนเงิน
  </p>
  <v-container class="mt-3">
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
              ><span style="font-size: 18px">ชำระเงิน</span></v-btn
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
          color="#00af70"
        ></v-progress-circular>
      </div>
      <v-card-text class="text-center">กำลังทำการชำระเงิน</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import router from "@/router";
import api from "@/services/api";

export default {
  data() {
    return {
      receipt: [],
      user: [],
      loading: false,
    };
  },
  methods: {
    setReceipt() {
      this.receipt = this.$store.getters["checkoutCoin/getReceipt"];
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    goToAddCoin() {
      router.push("/coin");
    },
    async fetchApi() {
      const res = await api.get("/profile/" + this.getId());
      this.user = res.data.user;
    },
    alertSuccess() {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        text: "ซื้อสินค้าสำเร็จ",
        icon: "success",
        confirmButtonText: "ยืนยัน",
      });
    },
    async sendRequest() {
      this.loading = true;
      const res = await api.post("/receipt", {
        request: "คำร้องขอเพิ่ม Coin",
        user: this.getId(),
        username: this.user.username,
        amount: this.receipt.coin,
        method: this.receipt.bankAccount,
      });
      if (res.status === 201) {
        setTimeout(() => {
          this.loading = false;
          this.$store.dispatch("checkoutCoin/setReceipt", null);
          router.push("/coin");
          this.alertSuccess();
        }, 2000);
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
