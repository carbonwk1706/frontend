<template>
  <v-container fluid>
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
      <v-col v-if="request.method !== 'สแกน QR พร้อมเพย์'" cols="12">
        <v-card class="card">
          <v-card-text>
            <v-col cols="6">
              <p>หลักฐานการโอนเงิน:</p>
            </v-col>
              <v-col cols="6" class="d-flex justify-start">
                <v-img
                max-width="350"
                cover
                :src="request.imageSlip"
              ></v-img>
              </v-col>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import router from "@/router";
import api from "@/services/api";
export default {
  data() {
    return {
      request: [],
    };
  },
  methods:{
    fetchApi(){
      api.get("/requestcoin/" + this.$route.params.id).then((result) => {
      this.request = result.data.request;
    });
    },
    getId() {
      return this.$store.getters["authAdmin/getId"];
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["authAdmin/isLogin"];
    },
  },
  async mounted() {
    if (!this.isLogin) {
      router.push("/login");
    } else if(this.isLogin){
      const res = await api.get("/checkRoles/" + this.getId());
      if(!res.data.user.roles.includes("LOCAL_ADMIN")){
        router.push("/login")
      }else{
        this.fetchApi();
      }
    }
  },
};
</script>
<style scoped>
.card {
  background-color: #f6f6f6;
}
</style>
