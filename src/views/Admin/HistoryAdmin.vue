<template>
  <AuthAdmin v-if="isLogin"
    ><v-row>
      <v-col cols="12">
        <h2>ประวัติการทำรายการของฉัน</h2>
      </v-col>
    </v-row>
    <v-row class="mb-1">
      <v-col cols="12" class="text-start">
        <div class="select-width">
          <v-select
            density="compact"
            v-model="select"
            :items="selectItem"
            variant="outlined"
          ></v-select>
        </div>
      </v-col>
    </v-row>
    <v-table v-if="request.length > 0" class="elevation-1">
      <thead class="table">
        <tr>
          <th class="text-left"><span class="text-color">ลำดับ</span></th>
          <th class="text-left"><span class="text-color">วันที่ทำรายการ</span></th>
          <th class="text-left"><span class="text-color">รายการที่ทำ</span></th>
          <th class="text-left"><span class="text-color">สถานะ</span> </th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in request.slice(
          (page - 1) * itemsPerPage,
          page * itemsPerPage
        )" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ formatTime(item.approvedAt) }}</td>
          <td>{{ item.request }}</td>
          <td>{{ item.status }}</td>
          <td>
            <v-btn
              variant="flat"
              color="grey"
              class="mr-3"
              @click="showDetail(item)"
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

    <v-row v-if="request.length > 0" class="mt-12">
      <v-col cols="12" class="pa-0">
        <v-pagination
          v-model="page"
          :length="pages"
          circle
        ></v-pagination>
      </v-col>
    </v-row>

  </AuthAdmin>
  <AuthAdmin v-else></AuthAdmin>
</template>
<script>
import api from "@/services/api";
import AuthAdmin from "../../components/AuthAdmin.vue";
import moment from "moment";
import router from "@/router";

export default {
  components: {
    AuthAdmin,
  },
  data() {
    return {
      request: [],
      select: "รายการทั้งหมด",
      selectItem: ["รายการทั้งหมด", "คำร้องขอสมัครขายอีบุ๊ค", "คำร้องขอเติม Coin","คำร้องขอขายหนังสือ","คำร้องแจ้งขอถอนเงิน"],
      page: 1,
      itemsPerPage: 10,
    };
  },
  methods: {
    showDetail(item) 
    {
      if(item.request === "คำร้องขอสมัครขายอีบุ๊ค"){
        router.push(`/request/${item._id}`).then(() => {
        window.scrollTo(0, 0);
      });
      }else if(item.request === "คำร้องขอเพิ่ม Coin"){
        router.push(`/requestcoin/${item._id}`).then(() => {
        window.scrollTo(0, 0);
      });
      }
      else if (item.request === "คำร้องขอขายหนังสือ") {
        router.push(`/detailrequestbook/${item._id}`).then(() => {
        window.scrollTo(0, 0);
      });
      }
      else if (item.request === "คำร้องแจ้งขอถอนเงิน") {
        router.push(`/detailrequestpayment/${item._id}`).then(() => {
        window.scrollTo(0, 0);
      });
      }
    },
    getId() {
      return this.$store.getters["authAdmin/getId"];
    },
    formatTime(item) {
      return moment(item).format("DD/MM/YYYY, HH:mm:ss");
    },
    getHistoryRequest() {
      api.get("/history/request/" + this.getId()).then((result) => {
        this.request = result.data.processedRequests;
      });
    },
    getHistoryRequestBook() {
      api.get("/history/requestbook/" + this.getId()).then((result) => {
        this.request = result.data.processedRequestsBook;
      });
    },
    getHistoryReceipts() {
      api.get("/history/receipts/" + this.getId()).then((result) => {
        this.request = result.data.processedReceipts;
      });
    },
    getHistoryRequestPayment() {
      api.get("/history/requestpayment/" + this.getId()).then((result) => {
        this.request = result.data.processedRequestsPayment;
      });
    },
    fetchApi() {
      api.get("/history/all/" + this.getId()).then((result) => {
        this.request = result.data.combinedData;
      });
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.request.length / this.itemsPerPage);
    },
    isLogin() {
      return this.$store.getters["authAdmin/isLogin"];
    },
  },
  watch: {
    select(newValue) {
      if (newValue) {
        if (newValue === "รายการทั้งหมด") {
          this.fetchApi();
        } else if (newValue === "คำร้องขอสมัครขายอีบุ๊ค") {
          this.getHistoryRequest();
        } else if (newValue === "คำร้องขอเติม Coin") {
          this.getHistoryReceipts();
        }
        else if (newValue === "คำร้องขอขายหนังสือ") {
          this.getHistoryRequestBook()
        }
        else if (newValue === "คำร้องแจ้งขอถอนเงิน") {
          this.getHistoryRequestPayment()
        }
      }
    },
  },
  async mounted() {
    if (!this.isLogin) {
      router.push("/login").then(() => {
        window.scrollTo(0, 0);
      });
    } else if(this.isLogin){
      const res = await api.get("/checkRoles/" + this.getId());
      if(!res.data.user.roles.includes("LOCAL_ADMIN")){
        router.push("/login").then(() => {
        window.scrollTo(0, 0);
      });
      }else{
        this.fetchApi();
      }
    }
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
  background-color: #0008C1;
}
</style>
