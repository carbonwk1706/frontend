<template>
  <v-container fluid>
    <v-row class="mb-3 mt-3">
      <v-col cols="12" class="d-flex justify-center">
        <h2>รายละเอียดคำร้อง</h2>
      </v-col>
    </v-row>
    <v-row  class="bg-white my-3 rounded border px-3">
      <v-col cols="12">
        <v-card class="card">
          <v-card-text>
            <v-row class="d-flex justify-center">
              <v-col cols="6" class="d-flex justify-start">
                <span>วันที่</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span>{{ formatTime(request.createdAt) }}</span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>เรื่อง:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ request.request }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>สถานะคำร้อง:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ request.status }} </span>
              </v-col>
              <v-col v-if="request.status !== 'pending'" cols="12">
                <div v-if="request.status === 'approved'">
                  <span>วันเวลาที่อนุมัติ : </span>
                  <span>{{ formatTime(request.approvedAt) }}</span>
                </div>
                <div v-if="request.status === 'rejected'">
                  <span>วันเวลาที่ปฏิเสธ : </span>
                  <span>{{ formatTime(request.approvedAt) }}</span>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="4">
            <v-img :src="request.imageBook" cover></v-img>
          </v-col>
          <v-col cols="8">
            <h3 class="mb-3">ชื่อหนังสือ {{ request.name }}</h3>
            <p class="mb-2">โดย {{ request.author }}</p>
            <p class="mb-2">สำนักพิมพ์ {{ request.publisher }}</p>
            <p class="mb-2">หมวดหมู่ {{ request.category }}</p>
            <p class="mb-2">ราคา {{ request.price }} บาท</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    
  </v-container>
</template>
<script>
import moment from "moment";
import api from "@/services/api";
export default {
  data() {
    return {
      request: [],
    };
  },
  methods:{
    fetchApi(){
      api.get("/requestbook/" + this.$route.params.id).then((result) => {
      this.request = result.data.request;
    });
    },
    formatTime(item) {
      return moment(item).format("MM/DD/YYYY, h:mm:ss a");
    },
  },
  mounted(){
    this.fetchApi()
  }
}
</script>
<style scoped>
.card {
  background-color: #f6f6f6;
}

</style>