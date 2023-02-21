<template>
  <v-container fluid>
    <v-row class="mb-1">
      <v-col cols="6" class="text-start">
        <div class="select-width">
          <v-select
            density="compact"
            v-model="select"
            :items="selectItem"
            variant="outlined"
          ></v-select>
        </div>
      </v-col>
      <v-col cols="6" class="pa-0 d-flex justify-end">
        <v-pagination
          class="text-pagination"
          v-model="page"
          :length="pages"
          circle
        ></v-pagination>
      </v-col>
    </v-row>
    <v-divider class="mb-6"></v-divider>
    <v-row>
      <v-col
        v-for="(item, index) in books.slice(
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
      <v-col cols="12" class="pa-0 d-flex justify-center">
        <v-pagination
          class="text-pagination"
          v-model="page"
          :length="pages"
          circle
        ></v-pagination>
      </v-col>
    </v-row>

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
  </v-container>
</template>
<script>
import router from "@/router";
import api from "@/services/api";
export default {
  data() {
    return {
      books: [],
      cartoon: [],
      novel: [],
      myBook: [],
      showModal: false,
      page: 1,
      itemsPerPage: 40,
      select: "มาใหม่ทั้งหมด",
      selectItem: [
        "มาใหม่ทั้งหมด",
        "มาใหม่การ์ตูน",
        "มาใหม่นิยาย",
      ],
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
      api.get("/newentry/").then((result) => {
        this.books = result.data;
      });
    },
    fetchApiCartoon() {
      api.get("/newentry/cartoon").then((result) => {
        this.books = result.data;
      });
    },
    fetchApiNovel() {
      api.get("/newentry/novel").then((result) => {
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
    pages() {
      return Math.ceil(this.books.length / this.itemsPerPage);
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
        this.fetchApi();
      } else {
        this.fetchApi();
        this.getMyBook();
      }
    },
    select(newValue) {
      if (newValue) {
        if (newValue === "มาใหม่ทั้งหมด") {
          this.fetchApi();
        } else if (newValue === "มาใหม่การ์ตูน") {
          this.fetchApiCartoon();
        } else if (newValue === "มาใหม่นิยาย") {
          this.fetchApiNovel();
        }
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
.select-width {
  width: 200px;
}
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
