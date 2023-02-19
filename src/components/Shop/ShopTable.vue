<template>
  <v-container fluid>
    <div id="newentry">
      <v-row class="mb-1">
        <v-col class="text-start">
          <h2 class="display-1 font-weight-bold">มาใหม่</h2>
        </v-col>
        <v-col class="text-end mt-3">
          <h4 class="display-1 text-go">ดูทั้งหมด</h4>
        </v-col>
      </v-row>
      <v-divider class="mb-6"></v-divider>
      <v-row>
        <v-col
          v-for="(item, index) in filteredNewEntry"
          :key="index"
          class="mb-5"
          md="3"
          sm="4"
          xs="6"
        >
          <v-card
            max-width="200"
            class="mx-auto cardHover"
            @click="showDetail(item)"
          >
            <v-img :src="item.imageBook" height="280px" cover />
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
                class="btn-color"
                @click.stop="addItem(item)"
              >
                ฿ {{ item.price }}
              </v-btn>
              <v-btn v-else disabled class="btn-color">มีแล้ว</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div id="bestseller">
      <v-row class="mb-1">
        <v-col class="text-start">
          <h2 class="display-1 font-weight-bold">ขายดี</h2>
        </v-col>
        <v-col class="text-end mt-3">
          <h4 class="display-1 text-go">ดูทั้งหมด</h4>
        </v-col>
      </v-row>
      <v-divider class="mb-6"></v-divider>
      <v-row>
        <v-col
          v-for="(item, index) in filteredBestSell"
          :key="index"
          class="mb-5"
          md="3"
          sm="4"
          xs="6"
        >
          <v-card
            max-width="200"
            class="mx-auto cardHover"
            @click="showDetail(item)"
          >
            <v-img :src="item.imageBook" height="280px" cover />
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
                class="btn-color"
                @click.stop="addItem(item)"
              >
                ฿ {{ item.price }}
              </v-btn>
              <v-btn v-else disabled class="btn-color">มีแล้ว</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div id="recommend">
      <v-row class="mb-1">
        <v-col class="text-start">
          <h2 class="display-1 font-weight-bold">แนะนำ</h2>
        </v-col>
        <v-col class="text-end mt-3">
          <h4 class="display-1 text-go" @click="goToRecommend">ดูทั้งหมด</h4>
        </v-col>
      </v-row>
      <v-divider class="mb-6"></v-divider>
      <v-row justify="start" align="start">
        <v-col
          v-for="(item, index) in filteredRecommend"
          :key="index"
          class="mb-5"
          md="3"
          sm="4"
          xs="6"
        >
          <v-card
            max-width="200"
            class="mx-auto cardHover"
            @click="showDetail(item)"
          >
            <v-img :src="item.imageBook" height="280px" cover />
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
                class="btn-color"
                @click.stop="addItem(item)"
              >
                ฿ {{ item.price }}
              </v-btn>
              <v-btn v-else disabled class="btn-color">มีแล้ว</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

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
import router from "@/router";
import api from "@/services/api";

export default {
  name: "ShopTable",
  data() {
    return {
      bestseller: [],
      newentry: [],
      recommend: [],
      myBook: [],
      showModal: false,
      screenWidth: 0,
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
    goToRecommend(){
      router.push("/recommend")
    },
    hideModal() {
      this.showModal = !this.showModal;
    },
    showDetail(item) {
      this.$router.push(`/book/${item._id}`);
    },
    alertWarning() {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        text: "กรุณาเข้าสู่ระบบก่อนนำหนังสือเข้าตะกร้าด้วยจ้า",
        icon: "warning",
        button: "OK",
      });
    },
    alertSuccess() {
      this.$swal({
        scrollbarPadding: false,
        confirmButtonColor: "#00af70",
        allowOutsideClick: false,
        width: "500",
        text: "คุณมีหนังสือนี้ในตะกร้าแล้ว",
        icon: "warning",
        button: "OK",
      });
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
          this.alertSuccess();
        } else {
          this.showModal = true;
          this.getCartList();
        }
      } else {
        this.alertWarning();
      }
    },
    getNewEntry() {
      api.get("/newentry/").then((result) => {
        this.newentry = result.data;
      });
    },
    getBestseller() {
      api.get("/bestseller/").then((result) => {
        this.bestseller = result.data;
      });
    },
    getRecommend() {
      api.get("/recommended/").then((result) => {
        this.recommend = result.data;
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
    handleResize() {
      this.screenWidth = window.innerWidth;
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
    filteredNewEntry() {
      if (this.screenWidth > 960) {
        return this.newentry.slice(0, 4);
      } else if (this.screenWidth > 600) {
        return this.newentry.slice(0, 3);
      } else if (this.screenWidth < 600) {
        return this.newentry.slice(0, 2);
      } else {
        return this.newentry.slice(0, 2);
      }
    },
    filteredBestSell() {
      if (this.screenWidth > 960) {
        return this.bestseller.slice(0, 4);
      } else if (this.screenWidth > 600) {
        return this.bestseller.slice(0, 3);
      } else if (this.screenWidth < 600) {
        return this.bestseller.slice(0, 2);
      } else {
        return this.bestseller.slice(0, 2);
      }
    },
    filteredRecommend() {
      if (this.screenWidth > 960) {
        return this.recommend.slice(0, 4);
      } else if (this.screenWidth > 600) {
        return this.recommend.slice(0, 3);
      } else if (this.screenWidth < 600) {
        return this.recommend.slice(0, 2);
      } else {
        return this.recommend.slice(0, 2);
      }
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
    isLogin(newValue) {
      if (!newValue) {
        this.myBook = [];
        this.getBestseller();
        this.getNewEntry();
        this.getRecommend();
      } else {
        this.getBestseller();
        this.getNewEntry();
        this.getRecommend();
        this.getMyBook();
      }
    },
  },
  mounted() {
    this.screenWidth = window.innerWidth;
    window.addEventListener("resize", this.handleResize);
    this.getBestseller();
    this.getNewEntry();
    this.getRecommend();
    if (this.isLogin) {
      this.getMyBook();
    }
  },
};
</script>

<style scoped>
.text-go{
  cursor: pointer;
  color: #00af70;
}
.btn-color {
  color: #fff;
  background-color: #00af70;
}
.btn-color:hover {
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
