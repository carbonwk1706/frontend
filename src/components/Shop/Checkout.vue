<template>
  <h1 class="text-center mt-6 mb-6">ชำระเงิน</h1>
  <v-container>
    <span>สรุปรายการสั่งซื้ออีบุ๊ค {{ cartList.length }} รายการ</span>
    <v-divider class="mt-3 mb-6"></v-divider>

    <v-card class="card px-12 py-6">
      <v-row
        class="d-flex flex-row align-center"
        v-for="(item, index) in cartList"
        :key="index"
      >
        <v-col cols="12" class="d-flex flex-row align-center pa-0 mb-3 mt-3">
          <v-row>
            <v-col cols="6" class="d-flex justify-start"
            ><span>{{ index + 1 }}. {{ item.product.name }}</span></v-col
          >
          <v-col cols="6" class="d-flex justify-end"
            ><span class="text-price">฿ {{ item.product.price }}</span></v-col
          >
          </v-row>
          
        </v-col>
      </v-row>
    </v-card>
  </v-container>
  <p class="back-cart text-center mt-6" @click="goToCartList">
    กลับไปแก้ไขรายการ
  </p>
  <v-card class="mt-6 card">
    <v-container>
      <v-row>
        <v-col>
          <div class="d-flex flex-row align-center justify-center mb-5">
            <span style="font-size: 18px" class="text-total-price mr-2"
              >ยอดชำระ</span
            >
            <span class="text-total-price"> ฿{{ getTotalPrice }} </span>
          </div>
          <div class="d-flex flex-row align-center justify-center">
            <v-btn class="btn-bg" rounded width="200"
              ><span style="font-size: 18px">ชำระเงิน</span></v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import api from "@/services/api";
import router from "@/router";

export default {
  data() {
    return {
      cartList: [],
    };
  },
  methods: {
    async checkout() {
      const res = await api.post("/checkout/", {
        userId: this.getId(),
        items: this.cartList,
      });
      if (res.status === 201 && res.data.message === "not enough money") {
        console.log("เงินไม่พอจ้า");
      } else {
        console.log("ซื้อได้แล้วจ้า");
      }
    },
    goToCartList() {
      router.push("/cart");
    },
    getCartList() {
      api.get("/cart/" + this.getId()).then((result) => {
        this.cartList = result.data.items;
      });
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
  },
  computed: {
    getTotalPrice() {
      return this.cartList.reduce((acc, item) => acc + item.product.price, 0);
    },
  },
  mounted() {
    this.getCartList();
  },
};
</script>
<style scoped>
.text-price {
  color: #5a5a5a;
  font-size: 12px;
}
.text-total-price {
  font-size: 20px;
  font-weight: 700;
  color: crimson;
}
.btn-bg {
  color: white;
  background-color: #00af70;
}
.back-cart {
  font-size: 14px;
  color: #5a5a5a;
  cursor: pointer;
}
.card {
  background-color: #f6f6f6;
}
</style>
