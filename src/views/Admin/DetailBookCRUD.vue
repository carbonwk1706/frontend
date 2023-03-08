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
              <v-col cols="6" class="d-flex justify-start">
                <span>ID</span>
              </v-col>
              <v-col cols="6" class="d-flex justify-end">
                <span v-if="detail.action === 'delete'" class="text-uppercase">{{ book.bookId }}</span>
                <span v-if="detail.action === 'add'" class="text-uppercase">{{ book._id }}</span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>ชื่อหนังสือ</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ book.name }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>ผู้แต่ง</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ book.author }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>สำนักพิมพ์</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ book.publisher }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>หมวดหมู่</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ book.category }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>ราคา</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ book.price }} บาท</span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>วันที่สร้าง</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ formatTime(book.createdAt) }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>เรตติ้ง</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ book.rating }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>ยอดขาย</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ book.sold }} เล่ม</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="detail.action === 'delete' || detail.action === 'add'">
        <v-card class="card" height="412">
          <h3 class=" text-center">รูปภาพหนังสือ</h3>
          <v-img :src="book.imageBook"></v-img>
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
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>ชื่อหนังสือ</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ oldData.name }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>ผู้แต่ง</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ oldData.author }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>สำนักพิมพ์</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ oldData.publisher }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>หมวดหมู่</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ oldData.category }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>ราคา</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ oldData.price }} บาท</span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>วันที่สร้าง</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ formatTime(oldData.createdAt) }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>เรตติ้ง</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ oldData.rating }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>ยอดขาย</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ oldData.sold }} เล่ม</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="detail.action === 'update'" cols="12" sm="6">
        <v-card class="card" height="458">
          <h3 class=" text-center">รูปภาพหนังสือ</h3>
          <v-img :src="oldData.imageBook"></v-img>
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
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>ชื่อหนังสือ</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ newData.name }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>ผู้แต่ง</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ newData.author }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>สำนักพิมพ์</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ newData.publisher }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>หมวดหมู่</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ newData.category }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>ราคา</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ newData.price }} บาท</span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>วันที่สร้าง</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ formatTime(newData.createdAt) }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>เรตติ้ง</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ newData.rating }} </span>
              </v-col>
              <v-divider></v-divider>
              <v-col cols="3" class="d-flex justify-start">
                <span>ยอดขาย</span>
              </v-col>
              <v-col cols="9" class="d-flex justify-end">
                <span> {{ newData.sold }} เล่ม</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-if="detail.action === 'update'" cols="12" sm="6">
        <v-card class="card" height="458">
          <h3 class=" text-center">รูปภาพหนังสือ</h3>
          <v-img :src="newData.imageBook"></v-img>
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
      book: [],
      detail: [],
      oldData: [],
      newData: []

    };
  },
  methods: {
    async fetchApi() {
      const res = await api.get("/historycrudbook/detail/" + this.$route.params.id)
      this.detail = res.data
        if(res.data.action === "update"){
          this.oldData = res.data.oldData
          this.newData = res.data.newData
        }
        api.get("/books/" + res.data.bookId).then((result) => {
        if (result.data.message === "Book not found!!") {
          api.get("/bookdelete/" + res.data.bookId).then((res) => {
            this.book = res.data;
          });
        } else {
          this.book = result.data;
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
      router.push("/login");
    } else if(this.isLogin){
      const res = await api.get("/checkRoles/" + this.getId());
      if(!res.data.user.roles.includes("LOCAL_ADMIN")){
        router.push("/login")
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
