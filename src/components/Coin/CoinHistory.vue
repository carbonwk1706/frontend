<template>
  <Auth v-if="isLogin">
    <div class="mb-5 pt-15">
      <span class="menu-link" @click="goToCoin">เติม Coin</span>
      <v-icon>mdi-chevron-right</v-icon>
      <span class="menu-link-current">ประวัติการเติม Coin ของฉัน</span>
    </div>
      <div class="mb-5 d-flex justify-center">
        <h1>ประวัติการ Coin ของฉัน</h1>
      </div>
      <v-divider class="mb-10"></v-divider>
      <v-table v-if="coinHistory.length > 0">
        <thead>
          <tr>
            <th class="text-left">ลำดับ</th>
            <th class="text-left">วันที่</th>
            <th class="text-left">สถานะ</th>
            <th class="text-left">จำนวน Coin</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in coinHistory.slice(
              (page - 1) * itemsPerPage,
              page * itemsPerPage
            )"
            :key="index"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ formatTime(item.createdAt) }}</td>
            <td>{{ item.status }} </td>
            <td>{{ item.amount }} Coin</td>
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
      <div v-if="coinHistory.length > 0" class="pt-8 center-pagination">
        <v-pagination
          class="mt-5"
          v-model="page"
          :length="pages"
          circle
        ></v-pagination>
      </div>
      <div v-if="coinHistory.length === 0">
        <div class="d-flex justify-center">
          <img
            src="https://www.mebmarket.com/web/dist/assets/images/imgMebcatMebphone@2x.png"
            alt=""
            width="200"
            height="200"
          />
        </div>
        <h3 class="text-center">ขออภัยด้วยนะครับ</h3>
        <div>
          <p class="text-center" style="color: #5a5a5a">ไม่พบรายการที่คุณค้นหา</p>
        </div>
      </div>
  </Auth>
  <Auth v-else>
    <div></div>
  </Auth>
  
</template>

<script>
import api from "@/services/api";
import moment from "moment";
import router from "@/router";
import Auth from "../Auth.vue";

export default {
  components:{
    Auth
  },
  data() {
    return {
      coinHistory: [],
      page: 1,
      itemsPerPage: 5,
    };
  },
  methods: {
    goToCoin() {
      router.push("/coin");
    },
    getId() {
      return this.$store.getters["auth/getId"];
    },
    showDetail(id) {
      this.$router.push(`/coinhistorydetil/${id}`);
    },
    formatTime(item) {
      return moment(item).format("MM/DD/YYYY, h:mm:ss a");
    },
    async fetchApi() {
      const res = await api.get("/receipt/" + this.getId());
      this.coinHistory = res.data;
    },
  },
  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
    pages() {
      return Math.ceil(this.coinHistory.length / this.itemsPerPage);
    },
  },
  mounted() {
    if (this.isLogin) {
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
}</style>
