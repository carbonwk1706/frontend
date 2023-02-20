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
  <v-card class="mt-6 mb-6 card">
    <v-container>
      <v-row>
        <v-col>
          <div class="d-flex flex-row align-center justify-center mb-5">
            <span style="font-size: 18px" class="text-total-price mr-2"
              >ยอดชำระ </span
            >
            <span class="text-total-price"> {{ receipt.coin }} </span>
          </div>
          <div class="d-flex flex-row align-center justify-center">
            <v-btn class="btn-bg" rounded width="200" @click="sendRequest"
              ><span style="font-size: 18px">ชำระเงิน</span></v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import router from "@/router";
import api from "@/services/api";

export default {
  data() {
    return {
      receipt: [],
      user: [],
    };
  },
  methods: {
    setReceipt() {
      this.receipt = this.$store.getters["checkoutCoin/getReceipt"];
      console.log(typeof this.receipt);
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    async fetchApi() {
      const res = await api.get("/profile/" + this.getId());
      this.user = res.data.user;
    },
    async sendRequest() {
      await api.post("/receipt", {
        request: "คำร้องขอเพิ่ม Coin",
        user: this.getId(),
        username: this.user.username,
        amount: this.receipt.coin,
        method: this.receipt.bankAccount,
      });
      this.$store.dispatch("checkoutCoin/setReceipt", null);
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
.btn-bg {
  color: white;
  background-color: #f0a04b;
}
</style>
