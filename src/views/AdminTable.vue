<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">ลำดับ</th>
        <th class="text-left">วันที่</th>
        <th class="text-left">คำร้อง</th>
        <th class="text-left">สถานะ</th>
        <th class="text-left"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(index, item) in requestStatus" :key="index">
        <td>{{ item + 1 }}</td>
        <td>{{ formatTime(requestStatus[item].createdAt) }}</td>
        <td>{{ requestStatus[item].request }}</td>
        <td>{{ requestStatus[item].status }}</td>
        <td>
          <v-btn
            variant="flat"
            color="grey"
            class="mr-3"
            @click="showDetail(requestStatus[item]._id)"
          >
            ดูรายละเอียด
          </v-btn>
          <v-btn
            variant="flat"
            color="success"
            class="mr-3"
            @click="approveRequest(requestStatus[item]._id)"
          >
            อนุมัติ
          </v-btn>
          <v-btn variant="flat" color="error" @click="rejectsRequest(requestStatus[item]._id)"> ยกเลิก </v-btn>
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
      requestStatus: [],
    };
  },
  methods: {
    showDetail(id) {
      this.$router.push(`/request/${id}`);
    },
    formatTime(item){
      return moment(item).format('MM/DD/YYYY, h:mm:ss a');
    },
    async approveRequest(id) {
      try {
        await api.patch(`/request/${id}/approve`);
        this.fetchApi()
      } catch (error) {
        console.log(error);
      }
    },
    async rejectsRequest(id) {
      try {
        await api.patch(`/request/${id}/reject`);
        this.fetchApi()
      } catch (error) {
        console.log(error);
      }
    },
    async fetchApi() {
      try {
        const res = await api.get("/request");
        this.requestStatus = res.data.requests;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.fetchApi();
  },
};
</script>
<style></style>
