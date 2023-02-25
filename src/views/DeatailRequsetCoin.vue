<template>
  <div class="d-flex justify-center">รายละเอียดคำร้อง</div>
  <v-container>
    <v-row>
      <v-col cols="6" sm="6">
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
      <v-col cols="6" sm="6">
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

      <v-col>
        <v-card class="card">
          <v-card-text>
            <v-row class="d-flex justify-center">
              <v-col cols="6" class="d-flex justify-start">
                <span>รูปภาพ</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span>{{ request.createdAt }}</span>
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
