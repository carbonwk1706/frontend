<template>
  <AuthSell v-if="isLogin">
    <v-container fluid>
      <v-row>
        <v-col cols="12 ">
          <h2 class="mb-3">รายการหนังสือ</h2>
        </v-col>
      </v-row>
      <v-table v-if="history.length > 0" dense class="elevation-1">
        <thead class="table">
          <tr>
            <th class="text-left"><span class="text-color">ลำดับ</span></th>
            <th class="text-left">
              <span class="text-color">วันที่ทำรายการ</span>
            </th>
            <th class="text-left">
              <span class="text-color">รายการที่ทำ</span>
            </th>
            <th class="text-left"><span class="text-color">สถานะ</span></th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in history.slice(
              (page - 1) * itemsPerPage,
              page * itemsPerPage
            )"
            :key="index"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ formatTime(item.createdAt) }}</td>
            <td>{{ item.request }}</td>
            <td>{{ item.status }}</td>
            <td>
              <v-btn  @click="showDetail(item)" variant="flat" color="grey" class="mr-3">
                ดูรายละเอียด
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      <v-row v-else>
        <v-divider class="mt-3 mb-6"></v-divider>
        <v-col cols="12">
          <div class="d-flex justify-center">
            <img
              src="https://www.mebmarket.com/web/dist/assets/images/imgMebcatMebphone@2x.png"
              width="200"
              height="200"
            />
          </div>
          <div class="text-noBook text-center">
            <p>ขออภัยด้วยนะครับ</p>
          </div>
          <div class="text-center mt-3">
            <p class="text-muted">ไม่พบข้อมูลในหัวข้อที่คุณกำลังชมค่ะ</p>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="history.length > 0" class="mt-12">
        <v-col cols="12" class="pa-0">
          <v-pagination
            class="text-pagination"
            v-model="page"
            :length="pages"
            circle
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </AuthSell>
  <AuthSell v-if="!isLogin"> </AuthSell>
</template>
<script>
import AuthSell from "@/components/AuthSell.vue";
import io from "socket.io-client";
import api from "@/services/api";
import moment from "moment";
import router from "@/router";
export default {
  components: {
    AuthSell,
  },
  data() {
    return {
      history: [],
      page: 1,
      itemsPerPage: 10,
      socket: null,
    socketioURL: "http://localhost:3000",
    };
  },
  methods: {
    formatTime(item) {
      return moment(item).format("MM/DD/YYYY, h:mm:ss a");
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    async fetchApi() {
      const res = await api.get("/requestbook/history/" + this.getId());
      this.history = res.data;
    },
    showDetail(item) {
      router.push(`/historyrequestbook/${item._id}`).then(() => {
        window.scrollTo(0, 0);
      });
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
    pages() {
      return Math.ceil(this.history.length / this.itemsPerPage);
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
  async created(){
    this.socket = io(this.socketioURL, {
      transports: ["websocket", "polling"],
    });
    this.socket.on("requestbook-rejected", () => {
      if (this.isLogin) {
        this.fetchApi();
      }
    });
    this.socket.on("requestbook-approved", () => {
      if (this.isLogin) {
        this.fetchApi();
      }
    });
  }
};
</script>
<style>
.table {
  background-color: #0008c1;
}
.text-color {
  color: #ffff;
}
</style>
