<template>
  <div class="mb-5 d-flex justify-center">
    <h1 class="mt-8">รายละเอียดการเติม</h1>
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
          <span>วันเวลาที่ดำเนินการเติม : </span>
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
      <v-pagination
        class="mt-5"
        v-model="page"
        :length="pages"
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
        "/receipt/" + this.$route.params.id + "/" + this.getId()
      );
      console.log(this.$route.params.id)
      console.log(res)
      this.detail = res.data;
      console.log(this.detail)
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.detail.length / this.itemsPerPage);
    },
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
  mounted() {
    if(this.isLogin){
      this.getDetailOrder();
    }else{
      router.push("/orderhistory")
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
</style>
