<template>
  <v-footer class="footer-bg d-flex flex-row pa-10 mt-12" max-width="auto">
    <v-container class="container-max-width">
      <v-row class="d-flex">
        <v-col  cols="3">
          <div class="text-header">
            <span>เลือกหมวดหมู่</span>
          </div>
          <div class="text-list pt-3 pb-1">
            <span class="text-cursor">นิยาย</span>
          </div>
          <div class="text-list pb-1">
            <span class="text-cursor">การ์ตูน</span>
          </div>
        </v-col>
        <v-col class="align-center text-xs-center" cols="3">
          <div class="text-header">บริการช่วยเหลือ</div>
          <div class="text-list pt-3 pb-1">
            <span class="text-cursor">วิธีการใช้งาน</span>
          </div>
          <div class="text-list pb-1">
            <span class="text-cursor" @click="goToRegisterSell">ขายอีบุ๊กกับเรา</span>
          </div>
          <div class="text-list pb-1">
            <span class="text-cursor">เงื่อนไขในการใช้บริการ</span>
          </div>
          <div class="text-list pb-1"> 
            <span class="text-cursor">นโยบายความเป็นส่วนตัว</span>
          </div>
        </v-col>
        <v-col  class="align-center text-xs-center" cols="3">
          <div class="text-header">เกี่ยวกับเรา</div>
          <div class="text-list pt-3 pb-1">
            <span class="text-cursor">ข่าวสารและกิจกรรม</span>
          </div>
          <div class="text-list pb-1">
            <span class="text-cursor">ติดต่อเรา</span>
          </div>
        </v-col>
        <v-col class="align-center text-xs-center" cols="3">
          <div class="text-header">Social</div>
          <div class="text-list pt-3 pb-2">
            <v-icon class="text-cursor">mdi-facebook</v-icon>
          </div>
          <div class="text-list pb-2">
            <v-icon class="text-cursor">mdi-twitter</v-icon>
          </div>
          <div class="text-list pb-2">
            <v-icon class="text-cursor">mdi-instagram</v-icon>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<script>
import router from '@/router';

export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
  methods:{
    goToRegisterSell(){
      router.push("/registersell")
    }
  }
};
</script>
<style scoped>
.footer-bg {
  background-color: #f6f6f6;
}
.container-max-width {
  max-width: 1140px;
}
.text-header{
  font-size: 16px;
  font-family: Prompt, sans-serif;
  font-weight: 600;
}
.text-list{
  font-size: 14px;
  font-family: Prompt, sans-serif;
  font-weight: 400;
  color: #5a5a5a;
}
.text-cursor{
  cursor: pointer;
}
</style>
