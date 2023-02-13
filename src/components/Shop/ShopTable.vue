<template>
  <v-container class="grey lighten-5">
    <div class="mb-5 d-flex justify-center">
      <h1>ร้านค้า</h1>
    </div>
    <hr class="mb-6" />
    <v-row>
      <v-col v-for="(item, index) in books" :key="index">
        <v-card class="mx-auto" max-width="180" @click="showDetail(item)">
          <v-img :src="item.imageBook" height="250px"></v-img>
          <v-card-title> {{ item.name }} </v-card-title>
          <v-card-subtitle>
            {{ item.author }}/{{ item.publisher }}
          </v-card-subtitle>
          <v-row class="d-flex justify-end ma-3">
            <v-btn color="success" class="success" @click.stop="addItem(item)">
              ฿ {{ item.price }}
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  name: "ShopTable",
  data() {
    return {
      books: [],
    };
  },
  methods: {
    showDetail(item) {
      this.$router.push(`/book/${item._id}`);
    },
    async addItem(item) {
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
    fetchApi() {
      api.get("/books/").then((result) => {
        this.books = result.data;
      });
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
  mounted() {
    this.fetchApi();
  },
};
</script>

<style scoped>
.v-btn.success:hover {
  background-color: gray !important;
}
</style>
