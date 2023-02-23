<template>
  <div class="mb-6 pt-16">
    <span class="menu-link" @click="goToCoin">เติม Coin</span>
    <v-icon>mdi-chevron-right</v-icon>
    <span class="menu-link" @click="goToCoinHistory"
      >ประวัติการเติม Coin ของฉัน</span
    >
    <v-icon>mdi-chevron-right</v-icon>
    <span class="menu-link-current">รายละเอียดการเติม Coin</span>
  </div>
  <div class="mb-5 d-flex justify-center">
    <h1 class="mt-8">รายละเอียดการเติม Coin</h1>
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
      <v-row v-if="detail.status !== 'pending'">
        <v-col cols="12">
          <div v-if="detail.approvedAt">
            <span>วันเวลาที่อนุมัติ : </span>
            <span>{{ formatTime(detail.approvedAt) }}</span>
          </div>
          <div v-else-if="detail.rejectedAt">
            <span>วันเวลาที่ปฏิเสธ : </span>
            <span>{{ formatTime(detail.rejectedAt) }}</span>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <span>ผู้ใช้งาน : </span>
          <span> {{ detail.username }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <span>จำนวนที่เติม : </span>
          <span> {{ detail.amount }} Coin</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <span>ช่องทางการชำระ : </span>
          <span> {{ detail.method }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <span>สถานะ : </span>
          <span> {{ detail.status }}</span>
        </v-col>
      </v-row>
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
    goToCoin() {
      router.push("/coin");
    },
    goToCoinHistory() {
      router.push("/coinhistory");
    },
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
      console.log(this.$route.params.id);
      console.log(res);
      this.detail = res.data;
      console.log(this.detail);
    },
  },
  computed: {
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
</style>
