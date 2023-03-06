<template>
  <div class="mb-5">
    <span class="menu-link" @click="goToProfile">จัดการบัญชี</span>
    <v-icon>mdi-chevron-right</v-icon>
    <span class="menu-link" @click="goToOrderHistory"
      >ประวัติการสั่งซื้อของฉัน</span
    >
    <v-icon>mdi-chevron-right</v-icon>
    <span class="menu-link-current">รายละเอียดการสั่งซื้อ</span>
  </div>
  <div class="mb-5 d-flex justify-center">
    <h1 class="mt-8">รายละเอียดการสั่งซื้อ</h1>
  </div>
  <v-divider class="mb-6"></v-divider>
  <v-card class="mx-auto mt-5">
    <v-card-title class="headline">ใบเสร็จ</v-card-title>
    <v-card-subtitle class="subtitle-2 text-uppercase"
      >Order #{{ detail._id }}</v-card-subtitle
    >
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <span>วันเวลาที่สั่งซื้อ : </span>
          <span>{{ formatTime(detail.createAt) }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <span>ราคารวม : </span>
          <span> {{ detail.totalCost }} บาท</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <span>จำนวนสินค้า : </span>
          <span> {{ detail.count }} เล่ม</span>
        </v-col>
      </v-row>
      <div v-if="books.length === book.length">
        <v-row
          v-for="(book, index) in books.slice(
            (page - 1) * itemsPerPage,
            page * itemsPerPage
          )"
          :key="index"
        >
          <v-divider class="my-3"></v-divider>
          <v-col cols="4">
            <v-img :src="book.imageBook" aspect-ratio="1"></v-img>
          </v-col>
          <v-col cols="8">
            <h3 class="mb-3">{{ book.name }}</h3>
            <p class="mb-2">โดย {{ book.author }}</p>
            <p class="mb-2">สำนักพิมพ์ {{ book.publisher }}</p>
            <p class="mb-2">หมวดหมู่ {{ book.category }}</p>
            <p class="mb-2">ราคา {{ book.price }} บาท</p>
          </v-col>
          <v-divider class="my-3"></v-divider>
        </v-row>
      </div>
      <div v-if="books.length < book.length">
        <v-row
          v-for="(bookDelete, index) in book.slice(
            (page - 1) * itemsPerPage,
            page * itemsPerPage
          )"
          :key="index"
        >
          <v-divider class="my-3"></v-divider>
          <v-col cols="4">
            <v-img :src="bookDelete.imageBook" aspect-ratio="1"></v-img>
          </v-col>
          <v-col cols="8">
            <h3 class="mb-3">{{ bookDelete.name }}</h3>
            <p class="mb-2">โดย {{ bookDelete.author }}</p>
            <p class="mb-2">สำนักพิมพ์ {{ bookDelete.publisher }}</p>
            <p class="mb-2">หมวดหมู่ {{ bookDelete.category }}</p>
            <p class="mb-2">ราคา {{ bookDelete.price }} บาท</p>
          </v-col>
          <v-divider class="my-3"></v-divider>
        </v-row>
      </div>
      <v-pagination
        v-if="books.length === book.length"
        class="mt-5"
        v-model="page"
        :length="pages"
        circle
      ></v-pagination>
      <v-pagination
        v-if="books.length < book.length"
        class="mt-5"
        v-model="page"
        :length="pages1"
        circle
      ></v-pagination>
    </v-card-text>
  </v-card>
</template>
<script>
import router from "@/router";
import api from "@/services/api";
import moment from "moment";
export default {
  data() {
    return {
      detail: [],
      books: [],
      book: [],
      page: 1,
      itemsPerPage: 2,
    };
  },
  methods: {
    getId() {
      return this.$store.getters["auth/getId"];
    },
    formatTime(item) {
      return moment(item).format("MM/DD/YYYY, h:mm:ss a");
    },
    async getDetailOrder() {
      const res = await api.get(
        "/receiptbook/" + this.$route.params.id + "/" + this.getId()
      );
      this.detail = res.data;
      for (let i = 0; i < res.data.books.length; i++) {
        this.books.push(res.data.books[i]);
      }
      for (let i = 0; i < res.data.book.length; i++) {
        this.book.push(res.data.book[i]);
      }
    },
    goToProfile() {
      router.push("/profile");
    },
    goToOrderHistory() {
      router.push("/orderhistory");
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.books.length / this.itemsPerPage);
    },
    pages1() {
      return Math.ceil(this.book.length / this.itemsPerPage);
    },
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
  mounted() {
    if (this.isLogin) {
      this.getDetailOrder();
    } else {
      router.push("/orderhistory");
    }
  },
};
</script>
<style scoped>
.menu-link {
  color: #5a5a5a;
  font-size: 14px;
  cursor: pointer;
}
.menu-link-current {
  color: #5a5a5a;
  font-size: 14px;
}
.text-noBook {
  font-size: 18px;
  font-weight: bold;
}
</style>
