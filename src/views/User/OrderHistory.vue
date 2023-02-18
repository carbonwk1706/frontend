<template>
  <Auth v-if="isLogin">
    <div class="mb-5">
      <span class="menu-link" @click="goToProfile">จัดการบัญชี</span>
      <v-icon>mdi-chevron-right</v-icon>
      <span class="menu-link-current">ประวัติการสั่งซื้อของฉัน</span>
    </div>
    <div class="mb-5 d-flex justify-center">
      <h1>ประวัติการสั่งซื้อของฉัน</h1>
    </div>
    <v-divider class="mb-10"></v-divider>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">ลำดับ</th>
          <th class="text-left">วันที่</th>
          <th class="text-left">จำนวน</th>
          <th class="text-left">ราคารวม</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(index, item) in history" :key="index">
          <td>{{ item + 1 }}</td>
          <td>{{ formatTime(history[item].createdAt) }}</td>
          <td>{{ history[item].count }} เล่ม</td>
          <td>{{ history[item].totalCost }} บาท</td>
          <td>
            <v-btn
              variant="flat"
              color="grey"
              class="mr-3"
              @click="showDetail(history[item]._id)"
            >
              ดูรายละเอียด
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </Auth>
  <Auth v-else>
  </Auth>
</template>
<script>
import Auth from "@/components/Auth.vue";
import router from "@/router";
import api from "@/services/api";
import moment from "moment";

export default {
  components:{
    Auth
  },
  data() {
    return {
      history: [],
    };
  },
  methods: {
    getId() {
      return this.$store.getters["auth/getId"];
    },
    showDetail(id) {
      this.$router.push(`/receiptbook/${id}`)
    },
    formatTime(item){
      return moment(item).format('MM/DD/YYYY, h:mm:ss a');
    },
    async fetchApi() {
      const res = await api.get("/receiptbook/" + this.getId());
      this.history = res.data
      console.log(this.history)
    },
    goToProfile() {
      router.push("/profile");
    },
  },
  computed:{
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
  mounted() {
    if(this.isLogin){
      this.fetchApi();
    }
  },
};
</script>
<style scoped>
.menu-link {
  color: #5a5a5a;
  font-size: 14px;
  cursor: pointer;
}
.menu-link-current {
  color: #5a5a5a;
  font-size: 14px;
}
</style>
