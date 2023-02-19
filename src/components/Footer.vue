<template>
  <v-footer class="footer-bg py-5 d-flex flex-column align-center" max-width="auto">
    <v-container class="container-max-width">
      <v-row class="d-flex justify-center">
        <v-col class="text-xs-center mb-5" cols="12" md="3">
          <h3 class="text-header mb-3">เลือกหมวดหมู่</h3>
          <div class="text-list mb-3">
            <span class="text-cursor">นิยาย</span>
          </div>
          <div class="text-list mb-3">
            <span class="text-cursor">การ์ตูน</span>
          </div>
        </v-col>
        <v-col class="text-xs-center mb-5" cols="12" md="3">
          <h3 class="text-header mb-3">บริการช่วยเหลือ</h3>
          <div class="text-list mb-3">
            <span class="text-cursor">วิธีการใช้งาน</span>
          </div>
          <div class="text-list mb-3">
            <span class="text-cursor" @click="goToRegisterSell">ขายอีบุ๊กกับเรา</span>
          </div>
          <div class="text-list mb-3">
            <span class="text-cursor">เงื่อนไขในการใช้บริการ</span>
          </div>
          <div class="text-list mb-3">
            <span class="text-cursor">นโยบายความเป็นส่วนตัว</span>
          </div>
        </v-col>
        <v-col class="text-xs-center mb-5" cols="12" md="3">
          <h3 class="text-header mb-3">เกี่ยวกับเรา</h3>
          <div class="text-list mb-3">
            <span class="text-cursor">ข่าวสารและกิจกรรม</span>
          </div>
          <div class="text-list mb-3">
            <span class="text-cursor">ติดต่อเรา</span>
          </div>
        </v-col>
        <v-col class="text-xs-center mb-5" cols="12" md="3">
          <h3 class="text-header mb-3">Social</h3>
          <div class="text-list mb-3">
            <v-icon class="text-cursor">mdi-facebook</v-icon>
          </div>
          <div class="text-list mb-3">
            <v-icon class="text-cursor">mdi-twitter</v-icon>
          </div>
          <div class="text-list mb-3">
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
