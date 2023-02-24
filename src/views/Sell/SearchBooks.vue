<template>
  <v-container fluid>
    <v-row class="mb-1">
      <v-col cols="6" class="text-start">
        <h3>ค้นหาในร้านหนังสือ</h3>
      </v-col>
      <v-col v-if="books.length > 0" cols="6" class="pa-0 d-flex justify-end">
        <v-pagination
          class="text-pagination"
          v-model="page"
          :length="pages"
          circle
        ></v-pagination>
      </v-col>
    </v-row>
    <v-divider class="mb-6"></v-divider>
    <div class="d-flex justify-center">
      <div class="select-width mr-2">
        <v-select
          density="compact"
          v-model="search"
          :items="searchItem"
          variant="outlined"
        ></v-select>
      </div>
      <div class="search-width">
        <v-text-field
          density="compact"
          variant="outlined"
          v-model="inputSearch"
          single-line
          append-inner-icon="mdi-magnify"
          @click:append-inner="filterSearch"
          @keyup.enter="filterSearch"
        ></v-text-field>
      </div>
    </div>
    <div v-if="loadingSearch" class="d-flex justify-center">
      <v-progress-circular
        :width="4"
        color="green"
        indeterminate
      ></v-progress-circular>
    </div>
    <div v-if="books.length === 0 && !loadingSearch">
      <div class="d-flex justify-center">
        <img
          src="https://www.mebmarket.com/web/dist/assets/images/imgMebcatMebphone@2x.png"
          width="200"
          height="200"
        />
      </div>
      <div class="text-noBook text-center">
        <p>ขออภัยด้วยนะคะ</p>
      </div>
      <div class="text-center mt-3">
        <p class="text-muted">ไม่พบข้อมูลในหัวข้อที่คุณกำลังชมค่ะ</p>
      </div>
    </div>
    <v-row class="mt-10" v-if="books.length > 0">
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

    <v-row v-if="books.length > 0" class="mt-12">
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

  <Login
  :visibleModal="visibleModal"
  @update:isVisible="visibleModal = $event"
/>
</template>

<script>
import router from "@/router";
import api from "@/services/api";
import Login from "@/views/User/Login.vue";

export default {
  name: "search",
  components: {
    Login,
  },
  data() {
    return {
      books: [],
      myBook: [],
      searchItem: [
        "ค้นหาทั้งหมด",
        "ค้นจากชื่อเรื่อง",
        "ค้นจากผู้แต่ง",
        "ค้นจากสำนักพิมพ์",
      ],
      search: "ค้นหาทั้งหมด",
      showModal: false,
      page: 1,
      itemsPerPage: 40,
      inputSearch: "",
      searchTerm: "",
      loadingSearch: false,
      visibleModal: false,
    };
  },
  methods: {
    toggleLoginModal() {
      this.visibleModal = !this.visibleModal;
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
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.value) {
            this.toggleLoginModal();
          }
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
    async fetchApi() {
      this.searchTerm = this.$route.params.searchTerm || "";
      if (!this.searchTerm) {
        this.books = [];
      } else {
        const res = await api.get("/searchbook", {
          params: {
            $or: [
              { name: { $regex: this.searchTerm, $options: "i" } },
              { author: { $regex: this.searchTerm, $options: "i" } },
              { publisher: { $regex: this.searchTerm, $options: "i" } },
            ],
          },
        });
        this.inputSearch = this.searchTerm;
        this.books = res.data.filter(
          (book) =>
            book.name.match(new RegExp(this.searchTerm, "i")) ||
            book.author.match(new RegExp(this.searchTerm, "i")) ||
            book.publisher.match(new RegExp(this.searchTerm, "i"))
        );
      }
    },
    async filterSearch() {
      if (!this.inputSearch) {
        this.alertWarning("กรุณาระบุคำที่ต้องการค้นหาด้วยครับ");
      } else {
        if (this.search === "ค้นหาทั้งหมด") {
          this.loadingSearch = true;
          setTimeout(() => {
            this.loadingSearch = false;
            this.searchAllBooks();
          }, 1000);
        }
        else if (this.search === "ค้นจากชื่อเรื่อง") {
          this.loadingSearch = true;
          setTimeout(() => {
            this.loadingSearch = false;
            this.matchBooks("name/");
          }, 1000);
        }
        else if (this.search === "ค้นจากผู้แต่ง") {
          this.loadingSearch = true;
          setTimeout(() => {
            this.loadingSearch = false;
            this.matchBooks("author/");
          }, 1000);
        }
        else if (this.search === "ค้นจากสำนักพิมพ์") {
          this.loadingSearch = true;
          setTimeout(() => {
            this.loadingSearch = false;
            this.matchBooks("publisher/");
          }, 1000);
        }
      }
    },
    async searchAllBooks() {
      const res = await api.get("/searchbook", {
        params: {
          $or: [
            { name: { $regex: this.inputSearch, $options: "i" } },
            { author: { $regex: this.inputSearch, $options: "i" } },
            { publisher: { $regex: this.inputSearch, $options: "i" } },
          ],
        },
      });
      this.books = res.data.filter(
        (book) =>
          book.name.match(new RegExp(this.inputSearch, "i")) ||
          book.author.match(new RegExp(this.inputSearch, "i")) ||
          book.publisher.match(new RegExp(this.inputSearch, "i"))
      );
    },
    async matchBooks(path) {
      const res = await api.get("/searchbook/" + path, {
        params: {
          searchTerm: this.inputSearch,
        },
      });

      this.books = res.data;
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
    "$route.params.searchTerm"(newValue) {
      if (newValue) {
        this.visibleModal = false;
        this.fetchApi();
      } else if (newValue === "") {
        this.visibleModal = false;
        this.books = [];
      }
    },
  },
  mounted() {
    this.visibleModal = false;
    this.fetchApi();
    if (this.isLogin) {
      this.visibleModal = false;
      this.getMyBook();
    }
  },
};
</script>

<style scoped>
.search-width {
  width: 400px;
}
.select-width {
  width: 190px;
}
.text-noBook {
  font-size: 18px;
  font-weight: bold;
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
