<template>
  <v-container fluid>
    <div class="d-flex align-center">
      <span class="menu-link" @click="goToProfile">จัดการบัญชี</span>
      <v-icon>mdi-chevron-right</v-icon>
      <span class="menu-link-current">รายการที่อยากได้</span>
    </div>
    <div class="mt-6 mb-5 text-center">
      <h1>รายการที่อยากได้</h1>
    </div>
    <template v-if="wishList.length === 0 || wishList === null">
      <div class="d-flex justify-center">
        <img
          src="https://www.mebmarket.com/web/dist/assets/images/imgMebcatMebphone@2x.png"
          width="200"
          height="200"
        />
      </div>
      <div class="text-noWish text-center">
        <p>ยังไม่มีรายการที่อยากได้</p>
      </div>
      <div class="text-center mt-3">
        <p class="text-muted">
          คุณสามารถบันทึกหนังสือเล่มที่อยากได้แต่ยังไม่พร้อมซื้อ โดยกดปุ่ม
          “อยากได้” ในหน้าดูรายละเอียดหนังสือ
        </p>
      </div>
    </template>
    <template v-else>
      <v-row class="mb-1">
        <v-col cols="12" class="text-start">
          <h2 class="font-weight-bold">รายการที่อยากได้</h2>
        </v-col>
      </v-row>
      <v-divider class="mb-6"></v-divider>
      <v-row>
        <v-col
          v-for="(item, index) in wishList.slice(
            (page - 1) * itemsPerPage,
            page * itemsPerPage
          )"
          :key="index"
          md="3"
          sm="4"
          xs="6"
        >
          <v-card
            max-width="200"
            class="mx-auto cardHover"
            @click="showDetail(item)"
          >
            <v-img :src="item.imageBook" height="280px" cover>
              <v-icon
                size="40"
                @click.stop="delWish(item)"
                class="ml-auto mt-auto close-button"
                >mdi-close-circle</v-icon
              >
            </v-img>
            <v-card-title class="text-center pb-0" style="font-size: 15px">{{
              item.name
            }}</v-card-title>
            <v-card-subtitle
              class="text-center grey--text"
              style="font-size: 12px"
            >
              {{ item.author }} / {{ item.publisher }}
            </v-card-subtitle>
            <v-card-text class="text-center pb-0 pt-0" style="font-size: 13px">
              <div style="display: inline-block; vertical-align: middle">
                <v-rating
                  v-model="item.rating"
                  color="#5a5a5a"
                  active-color="#e83e8c"
                  empty-icon="mdi-cards-heart"
                  full-icon="mdi-cards-heart"
                  readonly
                  hover
                  size="16"
                />
              </div>
              <span
                class="ml-2 text-grey-lighten-1 text-caption"
                style="display: inline-block; vertical-align: middle"
              >
                ({{ item.ratingsCount }} Rating)
              </span>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                v-if="!checkHaveBook(item)"
                class="btn-color success"
                @click.stop="addItem(item)"
              >
                ฿ {{ item.price }}
              </v-btn>
              <v-btn v-else disabled class="btn-color">มีแล้ว</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-12">
        <v-col cols="12" class="pa-0">
          <v-pagination
            class="text-pagination"
            v-model="page"
            :length="pages"
            circle
          ></v-pagination>
        </v-col>
      </v-row>
    </template>

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
  </v-container>
</template>

<script>
import api from "@/services/api";
import router from "@/router";
import io from "socket.io-client";

export default {
  name: "Wish",
  data() {
    return {
      wishList: [],
      myBook: [],
      showModal: false,
      page: 1,
      itemsPerPage: 40,
      socket: null,
      socketioURL: "http://localhost:3000",
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
    pages() {
      return Math.ceil(this.wishList.length / this.itemsPerPage);
    },
  },
  watch: {
    isLogin(newValue) {
      if (!newValue) {
        this.$store.dispatch("wishlist/setWishList", []);
      }
    },
  },
  mounted() {
    if (this.isLogin) {
      this.getWishList();
      this.getMyBook();
    }
  },
  async created() {
    this.socket = io(this.socketioURL, {
      transports: ["websocket", "polling"],
    });
    this.socket.on("new-rating", () => {
      if (this.isLogin) {
        this.getWishList();
        this.getMyBook();
      }
    });
  },
};
</script>

<style scoped>
.btn-color {
  color: #fff;
  background-color: #00af70;
}
.cardHover:hover {
  border: 1px solid #00af70;
  cursor: pointer;
}
.text-noWish {
  font-size: 18px;
  font-weight: bold;
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
.btn-color:hover {
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
