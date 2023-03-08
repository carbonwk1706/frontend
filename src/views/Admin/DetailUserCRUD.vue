<template>
  <v-container fluid>
    <v-row class="mb-3 mt-3">
      <v-col cols="12" class="d-flex justify-center">
        <h2 class="text-uppercase">รายการที่ทำ {{ detail.action }}</h2>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <h2 class="text-uppercase">ID ที่ทำรายการ {{ detail.adminId }}</h2>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <h2 class="text-uppercase">วันเวลาที่ทำ {{ formatTime(detail.createdAt) }}</h2>
      </v-col>
    </v-row>
    <v-row class="bg-white my-3 rounded border px-3">
      <v-col v-if="detail.action === 'delete' || detail.action === 'add'">
        <v-card class="card">
          <v-card-text>
            <v-row class="d-flex justify-center">
              <v-col cols="3" class="d-flex justify-start">
                <span>ID</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span v-if="detail.action === 'delete'" class="text-uppercase">{{ user.userId }}</span>
                <span v-if="detail.action === 'add'" class="text-uppercase">{{ user._id }}</span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>username</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ user.username }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>ชื่อ</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ user.name }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>อีเมล</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ user.email }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="5" class="d-flex justify-start">
                <span>วันที่ลงทะเบียน</span>
              </v-col>
              <v-col cols="7" class="d-flex justify-end">
                <span> {{ formatTime(user.createdAt) }} </span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="detail.action === 'update'" cols="12" sm="6">
        <v-card class="card">
          <v-card-text>
            <v-row class="d-flex justify-center">
              <v-col cols="12" class="d-flex justify-center">
                <span>ข้อมูลที่เก่า</span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>ID</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span class="text-uppercase">{{ oldData._id }}</span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>username</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ oldData.username }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>ชื่อ</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ oldData.name }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>อีเมล</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ oldData.email }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="5" class="d-flex justify-start">
                <span>วันที่ลงทะเบียน</span>
              </v-col>
              <v-col cols="7" class="d-flex justify-end">
                <span> {{ formatTime(oldData.createdAt) }} </span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="detail.action === 'update'" cols="12" sm="6">
        <v-card class="card">
          <v-card-text>
            <v-row class="d-flex justify-center">
              <v-col cols="12" class="d-flex justify-center">
                <span>ข้อมูลที่ UPDATE</span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>ID</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span class="text-uppercase">{{ newData._id }}</span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>username</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ newData.username }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>ชื่อ</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ newData.name }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>อีเมล</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ newData.email }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="5" class="d-flex justify-start">
                <span>วันที่ลงทะเบียน</span>
              </v-col>
              <v-col cols="7" class="d-flex justify-end">
                <span> {{ formatTime(newData.createdAt) }} </span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import api from "@/services/api";
import router from "@/router";
import moment from "moment";
export default {
  data() {
    return {
      user: [],
      detail: [],
      oldData: [],
      newData: []

    };
  },
  methods: {
    async fetchApi() {
      const res = await api.get("/historycrud/detail/" + this.$route.params.id)
        this.detail = res.data
        if(res.data.action === "update"){
          this.oldData = res.data.oldData
          this.newData = res.data.newData
        }
        api.get("/users/" + res.data.userId).then((result) => {
        if (result.data.message === "User not found!!") {
          api.get("/userdelete/" + res.data.userId).then((res) => {
            this.user = res.data;
          });
        } else {
          this.user = result.data;
        }
      });


    },
    formatTime(item) {
      return moment(item).format("DD/MM/YYYY, HH:mm:ss");
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
.card {
  background-color: #f6f6f6;
}

.preview-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  object-fit: contain;
  cursor: pointer;
}
</style>
