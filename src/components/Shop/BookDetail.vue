<template>
  <v-container>
    <div class="herdName">{{ book.name }}</div>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-img :src="book.imageBook" max-height="360" max-width="360" />
      </v-col>
      <v-col class="description">
        <v-col>
          <v-row>โดย {{ book.author }}</v-row>
          <br />
          <v-row>สำนักพิมพ์ {{ book.publisher }}</v-row>
          <br />
          <v-row>หมวดหมู่ {{ book.category }}</v-row>
          <br />
          <v-row>
            <span v-if="book.ratingsCount > 0" class="text-rating-left">
              {{ book.ratingsCount }}
            </span>
            <v-rating
              v-model="book.rating"
              color="#5a5a5a"
              active-color="#e83e8c"
              empty-icon="mdi-cards-heart"
              full-icon="mdi-cards-heart"
              readonly
              hover
              size="26"
            ></v-rating>
            <span class="text-rating-right"> ({{ book.rating }} Rating) </span>
          </v-row>
          <br />
          <div v-if="!checkBook">
            <v-row class="mt-1">
              <v-btn
                class="btn-color"
                rounded
                width="160"
                @click="addProduct(book)"
              >
                ฿ {{ book.price }} บาท
              </v-btn>
            </v-row>
            <br />
            <v-row>
              <v-btn
                class="btn-color"
                rounded
                width="160"
                @click="addWishlist(book)"
              >
                เพิ่มรายการอยากได้
              </v-btn>
            </v-row>
          </div>
          <v-row v-else>
            <v-btn class="btn-color" rounded width="160" @click="readBook(book._id)">
              อ่าน
            </v-btn>
            <iframe
              :src="book.pdf"
              frameBorder="0"
              style="width: 100%; height: 100%"
            ></iframe>
          </v-row>
        </v-col>
      </v-col>
      <v-col class="mt-15 pa-16" cols="12">
        <h3 class="mb-4">เขียนรีวิวและให้เรตติ้ง</h3>
        <v-divider class="mb-4"></v-divider>
        <v-card class="bg-card">
          <v-container>
            <v-row>
              <v-col v-if="isLogin" class="mt-4" cols="12">
                <v-row>
                  <v-avatar class="ml-3" size="x-large">
                    <v-img :src="user.imageUrl" cover></v-img>
                  </v-avatar>
                  <div class="mt-1">
                    <v-col class="pa-0 ml-3" col="12">
                      <span class="text-caption">ชื่อที่แสดงเมื่อคุณรีวิว</span>
                    </v-col>
                    <v-col class="pa-0 ml-3" col="12">
                      <span>{{ user.name }}</span>
                    </v-col>
                  </div>
                </v-row>
              </v-col>
              <v-col v-if="isLogin" cols="12">
                <div class="text-center">
                  <v-rating
                    v-model="rating"
                    color="#00bf6c"
                    active-color="#e83e8c"
                    empty-icon="mdi-heart-outline"
                    full-icon="mdi-cards-heart"
                    hover
                    size="40"
                  ></v-rating>
                  <v-textarea
                    v-model="comment"
                    variant="solo"
                    auto-grow
                    shaped
                    clearable
                  ></v-textarea>
                </div>
              </v-col>
              <v-col v-if="isLogin" cols="12">
                <div class="center-btn">
                  <v-btn
                    class="btn-color"
                    rounded
                    width="200"
                    @click="giveRating"
                  >
                    ส่งรีวิว
                  </v-btn>
                </div>
              </v-col>
              <v-col v-if="!isLogin" cols="12">
                <h3
                  @click="toggleLoginModal()"
                  class="text-center text-login text-login-2"
                >
                  คุณสามารถล็อกอินเพื่อแสดงความคิดเห็นได้จ้า
                </h3>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col v-if="allRating.length > 0" cols="12" class="pa-16">
        <h3 class="mb-4">รีวิวทั้งหมด</h3>
        <v-divider class="mb-4"></v-divider>
        <v-container class="container-border">
          <v-list lines="two">
            <v-list-item
              v-for="item in allRating.slice(
                (page - 1) * itemsPerPage,
                page * itemsPerPage
              )"
              :key="item._id"
              :subtitle="item.comment"
              :title="item.name"
              :prepend-avatar="item.imageUrl"
            >
              <template v-slot:default>
                <v-rating
                  v-model="item.rating"
                  color="#5a5a5a"
                  active-color="#e83e8c"
                  empty-icon="mdi-cards-heart"
                  full-icon="mdi-cards-heart"
                  readonly
                  hover
                  size="22"
                ></v-rating>
                <p class="text-caption">
                  เมื่อ-{{ formatTime(item.createAt) }}
                </p>
              </template>
            </v-list-item>
          </v-list>
        </v-container>
        <v-pagination
          class="mt-5"
          v-model="page"
          :length="pages"
          circle
        ></v-pagination>
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
  <Login
    :visibleModal="visibleModal"
    @update:isVisible="visibleModal = $event"
  />
</template>

<script>
import api from "@/services/api";
import router from "@/router";
import Login from "@/views/User/Login.vue";
import moment from "moment";
import io from "socket.io-client";

export default {
  name: "BookDetail",
  components: {
    Login,
  },
  data() {
    return {
      book: [],
      myRating: [],
      user: [],
      allUser: [],
      allRating: [],
      comment: "",
      showModal: false,
      checkBook: false,
      rating: 0,
      noRating: false,
      page: 1,
      itemsPerPage: 2,
      visibleModal: false,
      isInWishList: false,
      socket: null,
      socketioURL: "http://localhost:3000",
    };
  },
  methods: {
    toggleLoginModal() {
      this.visibleModal = !this.visibleModal;
    },
    goToHome() {
      this.showModal = false;
      router.push("/").then(() => {
        window.scrollTo(0, 0);
      });
    },
    goToCart() {
      this.showModal = false;
      router.push("/cart").then(() => {
        window.scrollTo(0, 0);
      });
    },
    goToCoin() {
      this.showModal = false;
      router.push("/coin").then(() => {
        window.scrollTo(0, 0);
      });
    },
    hideModal() {
      this.showModal = !this.showModal;
    },
    alertWarning(text) {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        text: text,
        icon: "warning",
        button: "OK",
      });
    },
    alertSuccess(text) {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        text: text,
        icon: "success",
        button: "OK",
      });
    },
    async addProduct(item) {
      if (this.isLogin) {
        const res = await api.post(
          "/cart/" + this.getId() + "/books/" + item._id
        );
        if (
          res.status === 200 &&
          res.data.message === "You have this product in your cart"
        ) {
          this.alertWarning("คุณมีหนังสือนี้ในตะกร้าแล้ว");
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
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.value) {
            this.toggleLoginModal();
          }
        });
      }
    },
    async addWishlist(item) {
      if (this.isLogin) {
        try {
          const res = await api.post("/wishlist/addWishList", {
            userId: this.getId(),
            bookId: item._id,
          });
          if (
            res.status === 200 &&
            res.data.message === "Book already exists in wishlist"
          ) {
            this.alertWarning("คุณมีสินค้านี้ในรายการโปรดแล้ว");
          } else {
            this.alertSuccess("เพิ่มสินค้านี้ในรายการโปรดสำเร็จ");
            this.getWishList();
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$swal({
          scrollbarPadding: false,
          confirmButtonColor: "#00af70",
          allowOutsideClick: false,
          width: "500",
          text: "กรุณาเข้าสู่ระบบก่อนนำหนังสือเข้ารายการโปรดด้วยจ้า",
          icon: "warning",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.value) {
            this.toggleLoginModal();
          }
        });
      }
    },
    async IconWishlist() {
      const res = await api.post("/wishlist/addWishList", {
        userId: this.getId(),
        bookId: this.$route.params.id,
      });
      if (
        res.status === 200 &&
        res.data.message === "Book already exists in wishlist"
      ) {
        this.isInWishList = true;
      } else {
        this.isInWishList = false;
      }
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    getBookDetail() {
      api.get("/books/" + this.$route.params.id).then((result) => {
        this.book = result.data;
      });
    },
    async getWishList() {
      const res = await api.get("/wishlist/" + this.getId());
      this.wishList = res.data;
      this.$store.dispatch("wishlist/setWishList", this.wishList);
    },
    getCartList() {
      api.get("/cart/" + this.getId()).then((result) => {
        this.cartList = result.data.items;
        this.$store.dispatch("cartList/setCartList", this.cartList);
      });
    },
    async hasBook() {
      const res = await api.post(
        "/checkBook/" + this.getId() + "/books/" + this.$route.params.id
      );
      if (res.status === 200 && res.data.message === "User has this book") {
        this.checkBook = true;
      } else if (
        res.status === 200 &&
        res.data.message === "User does not have this book"
      ) {
        this.checkBook = false;
      }
    },
    async giveRating() {
      if (!this.noRating) {
        if (this.checkBook) {
          if (this.rating > 0) {
            await api.post("/rating", {
              userId: this.getId(),
              bookId: this.$route.params.id,
              rating: this.rating,
              comment: this.comment,
            });
            this.clearRating();
            this.alertSuccess("ส่งข้อมูลสำเร็จ ขอบคุณสำหรับการรีวิว");
            this.checkRating();
            this.getBookDetail();
            this.getRatingBook();
          } else {
            this.alertWarning("กรุณาระบุ Rate หรือแสดงความเห็นก่อนนะจ๊ะ");
          }
        } else {
          this.alertWarning("คุณยังไม่ได้ซื้อหนังสือเล่มนี้");
          this.clearRating();
        }
      } else {
        this.alertWarning("คุณรีวิวหนังสือเล่มนี้ไปแล้ว");
        this.clearRating();
      }
    },
    clearRating() {
      this.rating = 0;
      this.comment = "";
    },
    async checkRating() {
      const res = await api.get("/ratingUserBooks/" + this.getId());
      this.myRating = res.data.ratedBooks;
      if (this.checkHaveRating) {
        this.noRating = true;
      } else {
        this.noRating = false;
      }
    },
    readBook(item) {
      this.$router.push(`/readbook/${item}`);
    },
    async getProfile() {
      const res = await api.get("/profile/" + this.getId());
      this.user = res.data.user;
    },
    async getRatingBook() {
      const res = await api.get("/ratingBook/" + this.$route.params.id);
      this.allRating = res.data;
    },
    formatTime(item) {
      return moment(item).format("MM/DD/YYYY, h:mm:ss a");
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
    checkHaveRating() {
      return this.myRating.some((book) => book._id === this.$route.params.id);
    },
    pages() {
      return Math.ceil(this.allRating.length / this.itemsPerPage);
    },
  },
  watch: {
    isLogin(newValue) {
      if (newValue) {
        this.hasBook();
        this.checkRating();
        this.getProfile();
        this.getBookDetail();
        this.getRatingBook();
      }
    },
  },
  mounted() {
    this.getBookDetail();
    this.getRatingBook();
    this.visibleModal = false;
    if (this.isLogin) {
      this.visibleModal = false;
      this.hasBook();
      this.checkRating();
      this.getProfile();
    }
  },
  async created() {
    this.socket = io(this.socketioURL, {
      transports: ["websocket", "polling"],
    });
    this.socket.on("new-rating", () => {
      this.getRatingBook();
      this.getBookDetail();
      if (this.isLogin) {
        this.visibleModal = false;
        this.hasBook();
        this.checkRating();
        this.getProfile();
      }
    });
    this.socket.on("product-sell", () => {
      if (this.isLogin) {
        this.visibleModal = false;
        this.hasBook();
        this.checkRating();
        this.getProfile();
      }
    });
    this.socket.on("update-book-edit", () => {
      this.getRatingBook();
      this.getBookDetail();
      if (this.isLogin) {
        this.visibleModal = false;
        this.hasBook();
        this.checkRating();
        this.getProfile();
      }
    });
    this.socket.on("update-book-delete", (data) => {
      if (data.bookDeleted.bookId === this.$route.params.id) {
        router.push("/");
      }
    });
    this.socket.on("upload-image-book", () => {
      this.getRatingBook();
      this.getBookDetail();
      if (this.isLogin) {
        this.visibleModal = false;
        this.hasBook();
        this.checkRating();
        this.getProfile();
      }
    });
    this.socket.on("upload-pdf-book", () => {
      this.getRatingBook();
      this.getBookDetail();
      if (this.isLogin) {
        this.visibleModal = false;
        this.hasBook();
        this.checkRating();
        this.getProfile();
      }
    });
  },
};
</script>

<style scoped>
.div-custom {
  border-radius: 10px;
  border: 1px solid rgb(230, 230, 230);
  padding: 16px;
}
.text-login {
  color: #5a5a5a;
  cursor: pointer;
}
.text-login-2:hover {
  color: #00af70;
  cursor: pointer;
}
.container-border {
  border-radius: 10px;
  border: 1px solid rgb(230, 230, 230);
}
.text-rating-left {
  margin-top: 2px;
  margin-right: 8px;
  color: #e83e8c;
}
.text-rating-right {
  margin-top: 2px;
  margin-left: 8px;
  color: #5a5a5a;
}
.bg-card {
  background-color: #f6f6f6;
}
.btn-color {
  color: #fff;
  background-color: #00af70;
}
.herdName {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  font-size: 36px;
  font-weight: bold;
}
.center-btn {
  display: flex;
  justify-content: center;
}

.description {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 30px;
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
