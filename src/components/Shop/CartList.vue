<template>
  <div class="herdName mt-6">
    <span>ตะกร้า</span>
  </div>
  <div>
    <p class="text-center mb-6">เลือกหนังสือที่ต้องการชำระเงิน</p>
  </div>

  <div v-if="cartList.length == 0 || cartList === null">
    <v-divider></v-divider>
    <div class="noBook" v-if="cartList.length == 0 || cartList === null">
      ไม่พบสิ้นค้าในตะกร้า
    </div>
  </div>
  <div v-else>
    <v-container>
      <v-row
        class="d-flex flex-row align-center"
        v-for="(item, index) in cartList"
        :key="index"
      >
        <v-divider v-if="index === 0"></v-divider>
        <v-col cols="12" class="d-flex flex-row align-center pa-0 mb-3 mt-3">
          <v-img
            :src="item.product.imageBook"
            max-height="100"
            max-width="100"
          ></v-img>
          <div>
            <p>{{ item.product.name }}</p>
            <p class="text-price">฿ {{ item.product.price }}</p>
          </div>

          <v-spacer></v-spacer>
          <v-btn @click="delProduct(item.product._id)" color="error">
            <v-icon>mdi-trash-can</v-icon>
            <span class="ml-1">ลบ</span>
          </v-btn>
        </v-col>
        <v-divider></v-divider>
      </v-row>
    </v-container>
    <p class="choose-book text-center mt-6" @click="goToHome">
      เลือกซื้อหนังสือเล่มอื่นต่อ
    </p>
    <v-card class="mt-6 card-bg">
      <v-container>
        <v-row>
          <v-col>
            <div class="d-flex flex-row align-center justify-center mb-5">
              <span style="font-size: 18px;" class="mr-2">ยอดชำระ</span>
              <span class="text-total-price">
                ฿{{ getTotalPrice }}
              </span>
            </div>
            <div class="d-flex flex-row align-center justify-center">
              <v-btn class="btn-bg" rounded width="200" @click="goToCheckout"
                ><span style="font-size: 18px;">ไปหน้าชำระเงิน</span></v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import api from "@/services/api";
import router from "@/router";
export default {
  name: "cartList",
  data() {
    return {
      cartList: [],
    };
  },
  methods: {
    goToCheckout(){
      router.push("/checkout")
    },
    getCartList() {
      api.get("/cart/" + this.getId()).then((result) => {
        this.cartList = result.data.items;
        this.$store.dispatch("cartList/setCartList", this.cartList);
      });
    },
    async delProduct(item) {
      try {
        await api.delete("/cart/" + this.getId() + "/books/" + item);
        this.getCartList();
      } catch (error) {
        console.log(error);
      }
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    goToHome() {
      router.push("/");
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
    getTotalPrice() {
      return this.cartList.reduce((acc, item) => acc + item.product.price, 0);
    },
  },
  mounted() {
    if (this.isLogin) {
      this.getCartList();
    }
  },
};
</script>

<style scoped>
.herdName {
  display: flex;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
}
.noBook {
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 18px;
  margin-top: 24px;
}
.choose-book {
  font-size: 14px;
  color: #00bf6c;
  cursor: pointer;
}
.text-price{
  color: #5a5a5a;
  font-size: 12px;
}
.text-total-price{
  font-size: 20px;
  font-weight: 700;
}
.card-bg {
  background-color: #f6f6f6;
}
.btn-bg {
  color: white;
  background-color: #00af70;
}
</style>
