<template>
  <v-container class="grey lighten-5">
    <div>
      <span class="menu-link" @click="goToProfile">จัดการบัญชี</span>
      <v-icon>mdi-chevron-right</v-icon>
      <span class="menu-link-current">รายการที่อยากได้</span>
    </div>
    <div class="mb-5 d-flex justify-center">
      <h1>รายการที่อยากได้</h1>
    </div>
    <div v-if="wishList.length === 0 || wishList === null">
      <div class="d-flex justify-center">
        <img
          src="https://www.mebmarket.com/web/dist/assets/images/imgMebcatMebphone@2x.png"
          alt=""
          width="200"
          height="200"
        />
      </div>
      <div class="noWish">
        <p>ยังไม่มีรายการที่อยากได้</p>
      </div>
      <div>
        <p class="text-center" style="color: #5a5a5a">
          คุณสามารถบันทึกหนังสือเล่มที่อยากได้แต่ยังไม่พร้อมซื้อ โดยกดปุ่ม
          “อยากได้” ในหน้าดูรายละเอียดหนังสือ
        </p>
      </div>
    </div>
    <div v-else>
      <div class="mb-5 d-flex justify-start">
        <h3>รายการที่อยากได้</h3>
      </div>
      <hr class="mb-5" />
      <v-row>
        <v-col v-for="(item, index) in wishList" :key="index">
          <v-card
            class="mx-auto cardHover"
            max-width="180"
            @click="showDetail(item)"
          >
            <v-img :src="item.imageBook" height="250px"
              ><v-icon
                size="40"
                @click.stop="delWish(item)"
                class="ml-auto mt-auto close-button"
                >mdi-close-circle</v-icon
              ></v-img
            >
            <v-card-title> {{ item.name }} </v-card-title>
            <v-card-subtitle>
              {{ item.author }}/{{ item.publisher }}
            </v-card-subtitle>
            <v-row class="d-flex justify-end ma-3">
              <v-btn
                v-if="!checkHaveBook(item)"
                color="success"
                class="success"
                @click.stop="addItem(item)"
              >
                ฿ {{ item.price }}
              </v-btn>
              <v-btn v-else color="success" class="success" disabled>
                มีแล้ว
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>

  <v-dialog v-model="showModal" max-width="500px">
    <v-card max-width="400px" class="pa-4">
      <div class="d-flex justify-end pa-0">
        <v-icon @click="hideModal">mdi-close</v-icon>
      </div>
      <v-card-title primary-title class="text-center pa-1">
        เพิ่มหนังสือลงตะกร้าแล้ว
      </v-card-title>
      <v-divider></v-divider>
      <v-container class="pa-2">
        <v-card-actions>
          <v-btn
            class="btn-bg"
            color="success"
            type="submit"
            block
            variant="outlined"
            @click="goToHome"
            >เลือกซื้อหนังสือเล่มอื่นต่อ
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn
            class="btn-bg1"
            type="submit"
            block
            variant="elevated"
            @click="goToCart"
            >ชำระเงิน
          </v-btn>
        </v-card-actions>
      </v-container>
      <v-divider></v-divider>
      <v-container class="pa-2">
        <v-card-actions>
          <v-btn
            class="btn-bg2"
            type="submit"
            block
            variant="elevated"
            @click="goToCoin"
            >เติม COIN
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import api from "@/services/api";
import router from "@/router";

export default {
  name: "Wish",
  data() {
    return {
      wishList: [],
      myBook: [],
      showModal: false,
    };
  },
  methods: {
    goToProfile() {
      router.push("/profile");
    },
    goToHome() {
      this.showModal = false;
      router.push("/");
    },
    goToCart() {
      this.showModal = false;
      router.push("/cart");
    },
    goToCoin() {
      this.showModal = false;
      router.push("/coin");
    },
    hideModal() {
      this.showModal = !this.showModal;
    },
    async getWishList() {
      const res = await api.get("/wishlist/" + this.getId());
      this.wishList = res.data;
      this.$store.dispatch("wishlist/setWishList", this.wishList);
    },
    async delWish(item) {
      await api.post("/wishlist/deleteWishList", {
        userId: this.getId(),
        bookId: item._id,
      });
      this.getWishList();
    },
    async addItem(item) {
      if (this.isLogin) {
        const res = await api.post(
          "/cart/" + this.getId() + "/books/" + item._id
        );
        if (
          res.status === 200 &&
          res.data.message === "You have this product in your cart"
        ) {
          this.$swal({
            scrollbarPadding: false,
            confirmButtonColor: "#00af70",
            allowOutsideClick: false,
            width: "500",
            text: "คุณมีหนังสือนี้ในตะกร้าแล้ว",
            icon: "warning",
            button: "OK",
          });
        } else {
          this.showModal = true;
          this.getCartList();
        }
      }
    },
    async getMyBook() {
      const res = await api.get("/inventory/" + this.getId());
      this.myBook = res.data;
    },
    showDetail(item) {
      this.$router.push(`/book/${item._id}`);
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    getCartList() {
      api.get("/cart/" + this.getId()).then((result) => {
        this.cartList = result.data.items;
        this.$store.dispatch("cartList/setCartList", this.cartList);
      });
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
    checkHaveBook() {
    return (item) => {
      return this.myBook.some((book) => book._id === item._id);
    };
  },
  },
  mounted() {
    if (this.isLogin) {
      this.getWishList();
      this.getMyBook();
    }
  },
};
</script>

<style scoped>
.cardHover:hover {
  border: 1px solid #00af70;
  cursor: pointer;
}
.noWish {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 20px;
}
.close-button {
  display: flex;
  color: gray;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  top: 0px;
}
.v-btn.success:hover {
  background-color: gray !important;
}
.menu-link {
  color: #5a5a5a;
  font-size: 14px;
  cursor: pointer;
}
.menu-link-current {
  color: #5a5a5a;
  font-size: 14px;
}
.btn-bg {
  border-radius: 40px;
  font-size: 16px;
}
.btn-bg1 {
  color: #fff;
  background-color: #00af70;
  border-radius: 40px;
  font-size: 16px;
}
.btn-bg2 {
  color: #fff;
  background-color: #f58b1b;
  border-radius: 40px;
  font-size: 16px;
}
</style>
