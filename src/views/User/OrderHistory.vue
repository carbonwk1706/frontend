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
    <v-table v-if="history.length > 0">
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
        <tr
          v-for="(item, index) in history.slice(
            (page - 1) * itemsPerPage,
            page * itemsPerPage
          )"
          :key="index"
        >
          <td>{{ index+1 }}</td>
          <td>{{ formatTime(item.createdAt) }}</td>
          <td>{{ item.count }} เล่ม</td>
          <td>{{ item.totalCost }} บาท</td>
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
    <div v-if="history.length > 0" class="pt-8 center-pagination">
      <v-pagination
        class="mt-5"
        v-model="page"
        :length="pages"
        circle
      ></v-pagination>
    </div>
    <div v-if="history.length === 0">
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
  <Auth v-else> </Auth>
</template>
<script>
import Auth from "@/components/Auth.vue";
import router from "@/router";
import api from "@/services/api";
import moment from "moment";

export default {
  components: {
    Auth,
  },
  data() {
    return {
      history: [],
      page: 1,
      itemsPerPage: 10
    };
  },
  methods: {
    getId() {
      return this.$store.getters["auth/getId"];
    },
    showDetail(id) {
      router.push(`/receiptbook/${id}`).then(() => {
        window.scrollTo(0, 0);
      });
    },
    formatTime(item) {
      return moment(item).format("MM/DD/YYYY, h:mm:ss a");
    },
    async fetchApi() {
      const res = await api.get("/receiptbook/" + this.getId());
      this.history = res.data;
    },
    goToProfile() {
      router.push("/profile").then(() => {
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
  mounted() {
    if (this.isLogin) {
      this.fetchApi();
    }
  },
};
</script>
<style scoped>
.center-pagination {
  display: flex;
  justify-content: center;
}
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
