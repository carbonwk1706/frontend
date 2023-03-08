<template>
  <AuthAdmin v-if="isLogin"
    ><v-row>
      <v-col cols="12">
        <h2>ประวัติการทำรายการของฉัน</h2>
      </v-col>
    </v-row>
    <v-row>
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
    <v-table v-if="history.length > 0" class="elevation-1">
      <thead class="table">
        <tr>
          <th class="text-left"><span class="text-color">ลำดับ</span></th>
          <th class="text-left">
            <span class="text-color">วันที่ทำรายการ</span>
          </th>
          <th class="text-left">
            <span class="text-color">ID ที่ทำรายการ</span>
          </th>
          <th class="text-left"><span class="text-color">รายการที่ทำ</span></th>
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
            <span class="text-uppercase">{{ item.userId }}</span>
          </td>
          <td>{{ item.action }}</td>
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

    <v-row v-if="history.length > 0" class="mt-12">
      <v-col cols="12" class="pa-0">
        <v-pagination v-model="page" :length="pages" circle></v-pagination>
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
      history: [],
      page: 1,
      itemsPerPage: 10,
      select: "การทำรายการทั้งหมด",
      selectItem: ["การทำรายการทั้งหมด","การทำรายการเพิ่ม", "การทำรายการแก้ไข", "การทำรายการลบ"],
    };
  },
  methods: {
    showDetail(item)
    {
      router.push(`/detailusercrud/${item}`).then(() => {
        window.scrollTo(0, 0);
      });
    },
    getId() {
      return this.$store.getters["authAdmin/getId"];
    },
    formatTime(item) {
      return moment(item).format("DD/MM/YYYY, HH:mm:ss");
    },
    fetchApi() {
      api.get("/historycrud/all/" + this.getId()).then((result) => {
        this.history = result.data.AdminHistoryCRUD;
      });
    },
    historyCreate() {
      api.get("/historycrud/create/" + this.getId()).then((result) => {
        this.history = result.data.AdminHistoryCRUD;
      });
    },
    historyUpdate() {
      api.get("/historycrud/update/" + this.getId()).then((result) => {
        this.history = result.data.AdminHistoryCRUD;
      });
    },
    historyDelete() {
      api.get("/historycrud/delete/" + this.getId()).then((result) => {
        this.history = result.data.AdminHistoryCRUD;
      });
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.history.length / this.itemsPerPage);
    },
    isLogin() {
      return this.$store.getters["authAdmin/isLogin"];
    },
  },
  watch: {
    select(newValue) {
      if (newValue) {
        if (newValue === "การทำรายการทั้งหมด") {
          this.fetchApi();
        } else if (newValue === "การทำรายการเพิ่ม") {
          this.historyCreate()
        } else if (newValue === "การทำรายการแก้ไข") {
          this.historyUpdate()
        }
        else if (newValue === "การทำรายการลบ") {
          this.historyDelete()
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
      if(!res.data.user.roles.includes("ADMIN")){
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
