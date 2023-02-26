<template>
  <v-container fluid>
    <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-row class="mb-3 mt-3">
      <v-col cols="12" class="d-flex justify-center">
        <h2>รายละเอียดคำร้อง</h2>
      </v-col>
    </v-row>
    <v-row  class="bg-white my-3 rounded border px-3">
      <v-col cols="12" sm="6">
        <v-card class="card">
          <v-card-text>
            <v-row class="d-flex justify-center">
              <v-col cols="6" class="d-flex justify-start">
                <span>Username:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span>{{ request.username }}</span>
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
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card class="card">
          <v-card-text>
            <v-row class="d-flex justify-center">
              <v-col cols="6" class="d-flex justify-start">
                <span>วันที่</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span>{{ request.createdAt }}</span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>จำนวนเงิน:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ request.amount }} บาท</span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="4" class="d-flex justify-start">
                <span>ธนาคาร:</span>
              </v-col>
              <v-col cols="8" class="d-flex justify-end">
                <span> {{ request.method }} </span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class="card">
          <v-card-text>
            <v-row class="d-flex justify-center">
              <v-col cols="6" class="d-flex justify-start">
                <span>รูปภาพใบเสร็จ:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <v-img
                  :width="348"
                  aspect-ratio="16/9"
                  cover
                  src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                ></v-img>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import api from "@/services/api";
export default {
  data() {
    return {
      request: [],
    };
  },
  methods: {
    goBack(){
      this.$router.push("/approvetable");
    }
  },
  mounted() {
    api.get("/requestcoin/" + this.$route.params.id).then((result) => {
      this.request = result.data.request;
      console.log(this.request);
    });
  },
};
</script>
<style scoped>
.card {
  background-color: #f6f6f6;
}
</style>
