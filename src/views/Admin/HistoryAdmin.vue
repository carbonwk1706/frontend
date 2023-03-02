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
            src="https://www.mebmarket.com/web/dist/assets/images/imgMebcatMebphone@2x.png"
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
      selectItem: ["รายการทั้งหมด", "รายการขอขายอีบุ๊ค", "รายการขอเติม Coin"],
      page: 1,
      itemsPerPage: 10,
    };
  },
  methods: {
    showDetail(item) 
    {
      console.log(item.request)
      if(item.request === "คำร้องขอสมัครขายอีบุ๊ค"){
        this.$router.push(`/request/${item._id}`);
      }else if(item.request === "คำร้องขอเพิ่ม Coin"){
        this.$router.push(`/requestcoin/${item._id}`);
      }
    },
    getId() {
      return this.$store.getters["authAdmin/getId"];
    },
    formatTime(item) {
      return moment(item).format("MM/DD/YYYY, h:mm:ss a");
    },
    getHistoryRequest() {
      api.get("/history/request/" + this.getId()).then((result) => {
        this.request = result.data.processedRequests;
      });
    },
    getHistoryReceipts() {
      api.get("/history/receipts/" + this.getId()).then((result) => {
        this.request = result.data.processedReceipts;
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
        } else if (newValue === "รายการขอขายอีบุ๊ค") {
          this.getHistoryRequest();
        } else if (newValue === "รายการขอเติม Coin") {
          this.getHistoryReceipts();
        }
      }
    },
  },
  mounted() {
    if (this.isLogin) {
      this.fetchApi();
    }else{
      router.push("/login")
    }
  },
};
</script>
<style scoped>
.text-color {
  color: #ffff;
}
.select-width {
  width: 200px;
}
.text-noRequest {
  font-size: 18px;
  font-weight: bold;
}
.table {
  background-color: #00af70;
}
</style>
