<template>
  <v-container class="grey lighten-5">
    <div class="mb-5 d-flex justify-center">
      <h1>ขายดี</h1>
    </div>
    <v-divider class="mb-6"></v-divider>
    <v-row v-if="books.length > 0">
      <v-col v-for="(item, index) in books" :key="index">
        <v-card
          class="mx-auto cardHover"
          max-width="200"
          @click="showDetail(item.product)"
        >
          <v-img :src="item.product.imageBook" cover></v-img>
          <v-card-title> {{ item.product.name }} </v-card-title>
          <v-card-subtitle>
            {{ item.product.author }}/{{ item.product.publisher }}
          </v-card-subtitle>
          <v-row class="d-flex ma-3">
            <v-col cols="12">
              <v-row>
                <v-col class="pa-1" cols="7">
                  <v-rating
                    v-model="item.product.rating"
                    color="#5a5a5a"
                    active-color="#e83e8c"
                    empty-icon="mdi-cards-heart"
                    full-icon="mdi-cards-heart"
                    readonly
                    hover
                    size="20"
                  ></v-rating>
                  <span class="text-grey-lighten-1 text-caption">
                    ({{ item.product.ratingsCount }} Rating)
                  </span>
                </v-col>
                <v-col cols="5">
                  <v-btn
                    v-if="!checkHaveBook(item.product)"
                    class="success btn-color"
                    @click.stop="addItem(item.product)"
                  >
                    ฿ {{ item.product.price }}
                  </v-btn>
                  <v-btn v-else disabled class="btn-color">
                    มีแล้ว
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col v-for="(item, index) in allBooks" :key="index">
        <v-card
          class="mx-auto cardHover"
          max-width="200"
          @click="showDetail(item)"
        >
          <v-img :src="item.imageBook" cover></v-img>
          <v-card-title> {{ item.name }} </v-card-title>
          <v-card-subtitle>
            {{ item.author }}/{{ item.publisher }}
          </v-card-subtitle>
          <v-row class="d-flex ma-3">
            <v-col cols="12">
              <v-row>
                <v-col class="pa-1" cols="7">
                  <v-rating
                    v-model="item.rating"
                    color="#5a5a5a"
                    active-color="#e83e8c"
                    empty-icon="mdi-cards-heart"
                    full-icon="mdi-cards-heart"
                    readonly
                    hover
                    size="20"
                  ></v-rating>
                  <span class="text-grey-lighten-1 text-caption">
                    ({{ item.ratingsCount }} Rating)
                  </span>
                </v-col>
                <v-col cols="5">
                  <v-btn
                    v-if="!checkHaveBook(item)"
                    class="success btn-color"
                    @click.stop="addItem(item)"
                  >
                    ฿ {{ item.price }}
                  </v-btn>
                  <v-btn v-else disabled class="btn-color">
                    มีแล้ว
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
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
      allBooks: [],
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
    getAllBook() {
      api.get("/books/").then((result) => {
        this.allBooks = result.data;
      });
    },
    fetchApi() {
      api
        .get("/bestseller/")
        .then(async (result) => {
          for (const bestseller of result.data) {
            const product = await api.get(`/books/${bestseller.product}`);
            bestseller.product = product.data;
          }
          this.books = result.data;
        })
        .catch((error) => {
          console.log(error);
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
        document.body.classList.add("dialog-open");
      } else {
        document.body.classList.remove("dialog-open");
      }
    },
  },
  mounted() {
    if (this.isLogin) {
      this.getMyBook();
    }
    this.fetchApi();
    this.getAllBook();
  },
};
</script>

<style scoped>
.btn-color {
  color: #fff;
  background-color: #00af70;
}
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
