<template>
  <v-container fluid>
    <v-row class="mb-3 mt-3">
      <v-col cols="12" class="d-flex justify-center">
        <h2>รายละเอียดคำร้อง</h2>
      </v-col>
    </v-row>
    <v-row  class="bg-white my-3 rounded border px-3">
      <v-col cols="12">
        <v-row>
          <v-col cols="4">
            <v-img :src="request.imageBook" cover></v-img>
          </v-col>
          <v-col cols="8">
            <h3 class="mb-3">ชื่อหนังสือ {{ request.name }}</h3>
            <p class="mb-2">โดย {{ request.author }}</p>
            <p class="mb-2">สำนักพิมพ์ {{ request.publisher }}</p>
            <p class="mb-2">หมวดหมู่ {{ request.category }}</p>
            <p class="mb-2">ราคา {{ request.price }} บาท</p>
            <p class="mb-2">ไฟล์ pdf {{ request.pdf }}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    
  </v-container>
</template>
<script>
import api from "@/services/api";
import router from "@/router";
export default {
  data() {
    return {
      request: [],
    };
  },
  methods:{
    fetchApi(){
      api.get("/requestbook/" + this.$route.params.id).then((result) => {
      this.request = result.data.request;
    });
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
  async mounted(){
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
  }
}
</script>
<style scoped>


</style>