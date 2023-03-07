<template>
  <h1 class="text-center mt-6 mb-6">ชำระเงิน</h1>
  <v-container>
    <span>สรุปรายการสั่งซื้ออีบุ๊ค {{ selectedItems.length }} รายการ</span>
    <v-divider class="mt-3 mb-6"></v-divider>

    <v-card class="card px-12 py-6">
      <v-row
        class="d-flex flex-row align-center"
        v-for="(item, index) in selectedItems"
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
  <p class="back-cart text-center mt-3" @click="goToCartList">
    กลับไปแก้ไขรายการ
  </p>
  <v-container class="mt-3">
    <v-card class="card pa-10">
      <v-row>
        <v-col>
          <div class="d-flex flex-row align-center justify-center mb-5">
            <span style="font-size: 18px" class="text-total-price mr-2"
              >ยอดชำระ</span
            >
            <span class="text-total-price"> ฿{{ getTotalPrice }} </span>
          </div>
          <div class="d-flex flex-row align-center justify-center">
            <v-btn class="btn-bg" rounded width="200" @click="checkout"
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
          color="success"
        ></v-progress-circular>
      </div>
      <v-card-text class="text-center">กำลังทำการสั่งซื้อ</v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/api";
import router from "@/router";

export default {
  data() {
    return {
      loading: false,
      cartList: []
    };
  },
  methods: {
    async checkout() {
      const res = await api.post("/checkout/", {
        userId: this.getId(),
        selectedItems: this.selectedItems,
      });
      if (res.status === 201 && res.data.message === "not enough money") {
        this.alertWarning();
      } else {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.$store.dispatch("selectItem/setSelectedItems", []);
          this.getCartList()
          router.push("/mybook");
          this.alertSuccess();
        }, 2000);
      }
    },
    getCartList() {
      api.get("/cart/" + this.getId()).then((result) => {
        this.cartList = result.data?.items ?? [];
        this.$store.dispatch("cartList/setCartList", this.cartList);
      });
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
      })
    },
    alertWarning() {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        cancelButtonColor: "#999999",
        showCancelButton: true,
        allowOutsideClick: false,
        width: "500",
        text: "จำนวน coin ของคุณไม่พอสำหรับชำระสินค้า",
        icon: "warning",
        confirmButtonText: "เติม COIN",
        cancelButtonText: "ปิด",
      }).then((result) => {
        if (result.value) {
          router.push("/coin");
        }
      });
    },
    goToCartList() {
      router.push("/cart");
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
  },
  computed: {
    getTotalPrice() {
      return this.selectedItems.reduce(
        (acc, item) => acc + item.product.price,
        0
      );
    },
    selectedItems() {
      return this.$store.getters["selectItem/selectedItem"];
    },
  },
  mounted() {
    if (this.selectedItems.length === 0 || this.selectedItems === null) {
      router.push("/cart");
    }
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
.center-loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-size {
  width: 100px;
}
</style>
