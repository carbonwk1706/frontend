<template>
  <v-footer class="footer-bg d-flex flex-row h-100 px-10 py-5" max-width="auto">
    <v-container class="container-max-width pa-0">
      <v-row class="d-flex">
        <v-col class="align-center text-xs-center py-0" cols="3">
          <div class="text-header">
            <span>เลือกหมวดหมู่</span>
          </div>
          <div class="text-list pt-3 pb-1">
            <span>นิยาย</span>
          </div>
          <div class="text-list pb-1">
            <span>การ์ตูน</span>
          </div>
          <div class="text-list pb-1">
            <span>แม็กกาซีน</span>
          </div>
          <div class="text-list pb-1"> 
            <span>ทั่วไป</span>
          </div>
        </v-col>
        <v-col class="align-center text-xs-center py-0" cols="3">
          <div class="text-header">บริการช่วยเหลือ</div>
          <div class="text-list pt-3 pb-1">
            <span>วิธีการใช้งาน</span>
          </div>
          <div class="text-list pb-1">
            <span>ขายอีบุ๊กกับเรา</span>
          </div>
          <div class="text-list pb-1">
            <span>เงื่อนไขในการใช้บริการ</span>
          </div>
          <div class="text-list pb-1"> 
            <span>นโยบายความเป็นส่วนตัว</span>
          </div>
        </v-col>
        <v-col class="align-center text-xs-center py-0" cols="3">
          <div class="text-header">เกี่ยวกับเรา</div>
          <div class="text-list pt-3 pb-1">
            <span>ข่าวสารและกิจกรรม</span>
          </div>
          <div class="text-list pb-1">
            <span>ติดต่อเรา</span>
          </div>
        </v-col>
        <v-col class="align-center text-xs-center py-0" cols="3">
          <div class="text-header">Social</div>
          <div class="text-list pt-3 pb-2">
            <v-icon>mdi-facebook</v-icon>
          </div>
          <div class="text-list pb-2">
            <v-icon>mdi-twitter</v-icon>
          </div>
          <div class="text-list pb-2">
            <v-icon>mdi-instagram</v-icon>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>
<style scoped>
.footer-bg {
  background-color: #f6f6f6;
}
.container-max-width {
  max-width: 980px;
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
</style>
