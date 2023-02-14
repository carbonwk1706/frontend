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
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  name: "BookDetail",
  data() {
    return {
      book: [],
      wishStutas: true,
    };
  },
  methods: {
    wishProcess() {
      this.wishStutas = !this.wishStutas;
    },
    async addProduct(item) {
      if(this.isLogin){
        const res = await api.post("/cart/" + this.getId() + "/books/" + item._id);
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
        this.$swal({
          scrollbarPadding: false,
          confirmButtonColor: "#00af70",
          allowOutsideClick: false,
          width: "500",
          text: "เพิ่มสินค้านี้ในตะกร้าสำเร็จ",
          icon: "success",
          button: "OK",
        });
        this.getCartList()
      }
    } else{
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
      }else{
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
        this.cartList = result.data.items
        this.$store.dispatch("cartList/setCartList", this.cartList);
      });
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
  mounted() {
    this.getBookDetail();
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
</style>
