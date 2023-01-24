<template>
  <v-container>
    
    <v-row item="item">
      <div class="herdName">{{ item.name }}</div>
      <v-col class="d-flex justify-end">
        <v-img
          :src="item.imageBook"
          max-height="500"
          max-width="500"
        />
      </v-col>
      <v-col>
        <v-col>
          <v-row>โดย {{ item.auther }}</v-row>
          <v-row>สำนักพิมพ์ {{ item.publissher }}</v-row>
          <v-row>หมวดหมู่ {{ item.category }}</v-row>
          <v-row>
            <v-btn color="success" rounded> ฿ {{ item.peice }} </v-btn>
          </v-row>
          <v-row>
            <v-btn icon color="pink" @click="disabled">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '@/services/api';

export default {
  name: "BookDetail",
  data() {
    return {
      book: {
        name: "",
        auther: "",
        publisher: "",
        catagory: "",
        price: "",
        imgaeBook: null

      }
    }
  },
  async mounted() {
    let result = await api.getBookId(this.$route.params.id);
    this.book = result.data;
  }
};
</script>

<style scoped>
.herdName {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  font-size: 36px;
  font-weight: bold;
}
</style>
