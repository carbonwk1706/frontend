<template>
  <v-table>
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
        <td>{{ index+1 }}</td>
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
</template>
<script>
import api from "@/services/api";
import moment from "moment";

export default {
  data() {
    return {
      request: [],
    };
  },
  methods: {
    getId() {
      return this.$store.getters["authAdmin/getId"];
    },
    formatTime(item) {
      return moment(item).format("MM/DD/YYYY, h:mm:ss a");
    },
    getHistoryRequest(){
      api.get("/history/request/" + this.getId()).then((result) => {
      this.request = result.data.processedRequests;
    });
    },
    getHistoryReceipts(){
      api.get("/history/receipts/" + this.getId()).then((result) => {
      this.receipts = result.data.processedReceipts;
    });
    },
    fetchApi(){
      api.get("/history/all/" + this.getId()).then((result) => {
      console.log(result)
    });
    }
  },
  mounted() {
    this.getHistoryRequest()
    this.getHistoryReceipts()
    this.fetchApi()
  },
};
</script>
<style></style>
