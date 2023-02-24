<template>
  <v-row>
    <v-col cols="12">
      <h2>ประวัติการทำรายการของฉัน</h2>
    </v-col>
  </v-row>
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
    <v-col  cols="6" class="pa-0 d-flex justify-end">
      <v-pagination
        class="text-pagination"
        v-model="page"
        :length="pages"
        circle
      ></v-pagination>
    </v-col>
  </v-row>
  <v-table class="mt-5">
    <thead>
      <tr>
        <th class="text-left">ลำดับ</th>
        <th class="text-left">วันที่ทำรายการ</th>
        <th class="text-left">รายการที่ทำ</th>
        <th class="text-left">สถานะ</th>
        <th class="text-left"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in request" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ formatTime(item.approvedAt) }}</td>
        <td>{{ item.request }}</td>
        <td>{{ item.status }}</td>
        <td>
          <v-btn
            variant="flat"
            color="grey"
            class="mr-3"
            @click="showDetail(item._id)"
          >
            รายละเอียด
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>

  
  <v-row  class="mt-12">
    <v-col cols="12" class="pa-0 d-flex justify-center">
      <v-pagination
        class="text-pagination"
        v-model="page"
        :length="pages"
        circle
      ></v-pagination>
    </v-col>
  </v-row>
</template>
<script>
import api from "@/services/api";
import moment from "moment";

export default {
  data() {
    return {
      request: [],
      select: "รายการทั้งหมด",
      selectItem: ["รายการทั้งหมด", "รายการขอขายอีบุ๊ค", "รายการขอเติมCoin"],
      page: 1,
      itemsPerPage: 40,
    };
  },
  methods: {
    getId() {
      return this.$store.getters["authAdmin/getId"];
    },
    formatTime(item) {
      return moment(item).format("MM/DD/YYYY, h:mm:ss a");
    },
    getHistoryRequest() {
      api.get("/history/request/" + this.getId()).then((result) => {
        this.request = result.data.processedRequests;
      });
    },
    getHistoryReceipts() {
      api.get("/history/receipts/" + this.getId()).then((result) => {
        this.request = result.data.processedReceipts;
      });
    },
    fetchApi() {
      api.get("/history/all/" + this.getId()).then((result) => {
        this.request = result.data.combinedData;
      });
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.request.length / this.itemsPerPage);
    },
  },
  watch: {
    select(newValue) {
      if (newValue) {
        if (newValue === "รายการทั้งหมด") {
          this.fetchApi();
        } else if (newValue === "รายการขอขายอีบุ๊ค") {
          this.getHistoryRequest();
        } else if (newValue === "รายการขอเติมCoin") {
          this.getHistoryReceipts();
        }
      }
    },
  },
  mounted() {
    this.fetchApi();
  },
};
</script>
<style scoped>
.select-width {
  width: 200px;
}
</style>
