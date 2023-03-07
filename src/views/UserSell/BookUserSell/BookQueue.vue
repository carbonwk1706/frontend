<template>
  <AuthSell v-if="isLogin">
    <v-container fluid>
      <v-row>
        <v-col cols="12 ">
          <h2>รายการหนังสือ</h2>
        </v-col>
      </v-row>
      <v-divider class="mb-10"></v-divider>
      <v-table  class="elevation-1">
        <thead class="table">
          <tr>
            <th class="text-left"><span class="text-color">ลำดับ</span></th>
            <th class="text-left"><span class="text-color">วันที่ทำรายการ</span></th> 
            <th class="text-left"><span class="text-color">ไอดีหนังสือ</span></th>       
            <th class="text-left"><span class="text-color">สถานะ</span></th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <v-btn variant="flat" color="grey" class="mr-3">
                ดูรายละเอียด
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-container>
  </AuthSell>
  <AuthSell v-if="!isLogin"> </AuthSell>
</template>
<script>
import AuthSell from "@/components/AuthSell.vue";
export default {
  components: {
    AuthSell,
  },

  computed: {
    isLogin() {
      return this.$store.getters["auth/isLogin"];
    },
  },
};
</script>
<style>
.table {
  background-color: #0008C1;
}
.text-color {
  color: #ffff;
}

</style>
