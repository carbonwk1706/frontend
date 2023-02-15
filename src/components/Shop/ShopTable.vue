<template>
  <v-container class="grey lighten-5">
    <div class="mb-5 d-flex justify-center">
      <h1>ร้านค้า</h1>
    </div>
    <v-divider class="mb-6"></v-divider>
    <v-row>
      <v-col v-for="(item, index) in books" :key="index">
        <v-card
          class="mx-auto cardHover"
          max-width="180"
          @click="showDetail(item)"
        >
          <v-img :src="item.imageBook" height="250px"></v-img>
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
            <v-btn
              v-else
              disabled
              color="success"
              class="success"
              @click.stop="addItem(item)"
            >
              มีแล้ว
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
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
import router from "@/router";
import api from "@/services/api";

export default {
  name: "ShopTable",
  data() {
    return {
      books: [],
      myBook: [],
      showModal: false,
    };
  },
  methods: {
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
    showDetail(item) {
      this.$router.push(`/book/${item._id}`);
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
      } else {
        this.$swal({
          scrollbarPadding: false,
          confirmButtonColor: "#00af70",
          allowOutsideClick: false,
          width: "500",
          text: "กรุณาเข้าสู่ระบบก่อนนำหนังสือเข้าตะกร้าด้วยจ้า",
          icon: "warning",
          button: "OK",
        });
      }
    },
    fetchApi() {
      api.get("/books/").then((result) => {
        this.books = result.data;
      });
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
    async getMyBook() {
      const res = await api.get("/inventory/" + this.getId());
      this.myBook = res.data;
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
  watch: {
    showModal(newValue) {
      if (newValue) {
        document.body.classList.add('dialog-open');
      } else {
        document.body.classList.remove('dialog-open');
      }
    },
  },
  mounted() {
    this.fetchApi();
    if (this.isLogin) {
      this.getMyBook();
    }
  },
};
</script>

<style scoped>
.v-btn.success:hover {
  background-color: gray !important;
}
.cardHover:hover {
  border: 1px solid #00af70;
  cursor: pointer;
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
