<template>
  <v-container>
    <div class="herdName">{{ book.name }}</div>
    <v-row v-if="checkBook">
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
            <v-btn
              color="success"
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
              color="success"
              rounded
              width="160"
              @click="addWishlist(book)"
            >
              เพิ่มรายการอยากได้
            </v-btn>
          </v-row>
        </v-col>
      </v-col>
    </v-row>

    <v-row v-else>
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
            <v-btn
              color="success"
              rounded
              width="160"
              @click="readBook"
            >
              อ่าน
            </v-btn>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="showModal" class="pa-0" max-width="500px">
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
  name: "BookDetail",
  data() {
    return {
      book: [],
      wishStutas: true,
      showModal: false,
      checkBook: true
    };
  },
  methods: {
    goToHome(){
      this.showModal = false
      router.push("/")
    },
    goToCart(){
      this.showModal = false
      router.push("/cart")
    },
    goToCoin(){
      this.showModal = false
      router.push("/coin")
    },
    hideModal(){
      this.showModal = !this.showModal
    },
    wishProcess() {
      this.wishStutas = !this.wishStutas;
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
          this.$swal({
            scrollbarPadding: false,
            confirmButtonColor: "#00af70",
            allowOutsideClick: false,
            width: "500",
            text: "คุณมีสินค้านี้ในตะกร้าแล้ว",
            icon: "warning",
            button: "OK",
          });
        } else {
          this.showModal = true
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
            this.$swal({
              scrollbarPadding: false,
              confirmButtonColor: "#00af70",
              allowOutsideClick: false,
              width: "500",
              text: "คุณมีสินค้านี้ในรายการโปรดแล้ว",
              icon: "warning",
              button: "OK",
            });
          } else {
            this.$swal({
              scrollbarPadding: false,
              confirmButtonColor: "#00af70",
              allowOutsideClick: false,
              width: "500",
              text: "เพิ่มสินค้านี้ในรายการโปรดสำเร็จ",
              icon: "success",
              button: "OK",
            });
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
          button: "OK",
        });
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
    async hasBook(){
      const res = await api.post("/checkBook/" + this.getId() + "/books/" + this.$route.params.id) 
      if(res.status === 200 && res.data.message === "User has this book"){
        this.checkBook = false
      }else if(res.status === 200 && res.data.message === "User does not have this book"){
        this.checkBook = true
      }
    },
    readBook(){
      alert("อ่านหนังสือ")
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
  mounted() {
    this.getBookDetail();
    if(this.isLogin){
      this.hasBook();
    }
  },
};
</script>

<style scoped>
.herdName {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  font-size: 36px;
  font-weight: bold;
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
