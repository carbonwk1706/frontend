<template>
  <div class="mb-5 d-flex justify-center">
    <h1>ประวัติการสั่งซื้อของฉัน</h1>
  </div>
  <v-divider class="mb-6"></v-divider>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">ลำดับ</th>
        <th class="text-left">วันที่</th>
        <th class="text-left">จำนวน</th>
        <th class="text-left">ราคารวม</th>
        <th class="text-left"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(index, item) in history" :key="index">
        <td>{{ item + 1 }}</td>
        <td>{{ formatTime(history[item].createdAt) }}</td>
        <td>{{ history[item].count }} เล่ม</td>
        <td>{{ history[item].totalCost }} บาท</td>
        <td>
          <v-btn
            variant="flat"
            color="grey"
            class="mr-3"
            @click="showDetail(history[item]._id)"
          >
            ดูรายละเอียด
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <div></div>
</template>
<script>
import api from "@/services/api";
import moment from "moment";

export default {
  data() {
    return {
      history: [],
    };
  },
  methods: {
    getId() {
      return this.$store.getters["auth/getId"];
    },
    showDetail(id) {
      this.$router.push(`/receiptbook/${id}`)
    },
    formatTime(item){
      return moment(item).format('MM/DD/YYYY, h:mm:ss a');
    },
    async fetchApi() {
      const res = await api.get("/receiptbook/" + this.getId());
      this.history = res.data
      console.log(this.history)
    },
  },
  mounted() {
    this.fetchApi();
  },
};
</script>
<style></style>
