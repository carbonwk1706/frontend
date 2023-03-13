<template>
  <v-row>
    <v-col cols="12">
      <h2 class="mb-5">ประวัติการทำรายการของฉัน</h2>
    </v-col>
  </v-row>
  <v-row> </v-row>
  <v-table v-if="history.length > 0" class="elevation-1">
    <thead class="table">
      <tr>
        <th class="text-left"><span class="text-color">ลำดับ</span></th>
        <th class="text-left">
          <span class="text-color">วันที่ทำรายการ</span>
        </th>
        <th class="text-left"><span class="text-color">รายการที่ทำ</span></th>
        <th class="text-left">
          <span class="text-color">สถานะ</span>
        </th>
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
        <td>
          <span class="text-uppercase">{{ item.request }}</span>
        </td>
        <td>{{ item.status }}</td>
        <td>
          <v-btn
            variant="flat"
            color="grey"
            class="mr-3"
            @click="showDetail(item._id)"
          >
            ดูรายละเอียด
          </v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
  <v-row v-else>
    <v-divider class="mb-6"></v-divider>
    <v-col cols="12">
      <div class="d-flex justify-center">
        <img
          :src="'http://localhost:3000/uploads/notfoundicon.png'"
          width="200"
          height="200"
        />
      </div>
      <div class="text-noRequest text-center">
        <p>ขออภัยด้วยนะครับ</p>
      </div>
      <div class="text-center mt-3">
        <p class="text-muted">ไม่พบข้อมูลในหัวข้อที่คุณกำลังชมค่ะ</p>
      </div>
    </v-col>
  </v-row>

  <v-row v-if="history.length > 0" class="mt-12">
    <v-col cols="12" class="pa-0">
      <v-pagination v-model="page" :length="pages" circle></v-pagination>
    </v-col>
  </v-row>
  <div></div>
</template>
<script>
import api from "@/services/api";
import moment from "moment";
import router from "@/router";
import io from "socket.io-client";

export default {
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
    showDetail(item) {
      router.push(`/detailpaymenthistory/${item}`).then(() => {
        window.scrollTo(0, 0);
      });
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    formatTime(item) {
      return moment(item).format("DD/MM/YYYY, HH:mm:ss");
    },
    fetchApi() {
      api.get("/requestpayment/request/" + this.getId()).then((result) => {
        this.history = result.data;
      });
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.history.length / this.itemsPerPage);
    },
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
      } else {
        this.fetchApi();
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
  },
};
</script>
<style scoped>
.text-color {
  color: #ffff;
}
.select-width {
  width: 220px;
}
.text-noRequest {
  font-size: 18px;
  font-weight: bold;
}
.table {
  background-color: #0008c1;
}
</style>
