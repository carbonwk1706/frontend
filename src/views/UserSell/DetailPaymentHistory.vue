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
                <span>เรื่อง:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ detail.request }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>สถานะคำร้อง:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ detail.status }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>Username:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span>{{ detail.username }}</span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>ชื่อ:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span>{{ detail.firstName }}</span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>นามสกุล:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span>{{ detail.lastName }}</span>
              </v-col>
              <v-divider></v-divider>
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
                <span>{{ formatTime(detail.createdAt) }}</span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>จำนวนเงิน:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ detail.amount }} บาท</span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>ธนาคาร:</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ detail.bankAccount }}</span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>เลขบัญชี</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ detail.idAccount }}</span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="6" class="d-flex justify-start">
                <span>เบอร์โทรศัพท์</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span> {{ detail.phone }}</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import router from "@/router";
import api from "@/services/api";
import moment from "moment";
import io from "socket.io-client";
export default {
  data() {
    return {
      detail: [],
      socket: null,
    socketioURL: "http://localhost:3000",
    };
  },
  methods: {
    formatTime(item) {
      return moment(item).format("DD/MM/YYYY, HH:mm:ss");
    },
    async fetchApi() {
      const res = await api.get("/requestpayment/" + this.$route.params.id + "/" + this.getId()); 
      this.detail = res.data
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
  async mounted() {
    if (!this.isLogin) {
      router.push("/").then(() => {
        window.scrollTo(0, 0);
      });
    } else if (this.isLogin) {
      const res = await api.get("/checkRoles/" + this.getId());
      if (!res.data.user.roles.includes("SELL")) {
        router.push("/").then(() => {
          window.scrollTo(0, 0);
        });
      }else{
        this.fetchApi()
      }
    }
  },
  async created() {
    this.socket = io(this.socketioURL, {
      transports: ["websocket", "polling"],
    });

    this.socket.on("requestpayment-rejected", () => {
      if (this.isLogin) {
        this.fetchApi();
      }
    });
    this.socket.on("requestpayment-approved", () => {
      if (this.isLogin) {
        this.fetchApi();
      }
    });
  }
};
</script>
<style scoped>
</style>
